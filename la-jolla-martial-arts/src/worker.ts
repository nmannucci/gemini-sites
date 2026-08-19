interface LeadPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  program?: string;
  message?: string;
  source?: string;
}

interface NormalizedLead {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  program: string;
  message: string;
  source: string;
}

const GONE_PATHS = new Set(['/fitness-kickboxing']);

const SECURITY_HEADERS = {
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'SAMEORIGIN',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy': 'camera=(), microphone=(), geolocation=()',
  'strict-transport-security': 'max-age=31536000',
} as const;

const PROGRAM_LABELS: Record<string, string> = {
  'little-ninjas': 'Little Ninjas (Ages 3–6)',
  kids: 'Kids Martial Arts (Ages 7–12)',
  'teen-adult': 'Teen & Adult (Ages 13+)',
  birthday: 'Birthday Party',
  general: 'General Question',
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const normalizedPath = url.pathname.replace(/\/+$/, '') || '/';

    if (GONE_PATHS.has(normalizedPath)) {
      return gone();
    }

    if (url.pathname === '/api/lead') {
      if (request.method !== 'POST') {
        return json({ error: 'Method not allowed' }, 405, { allow: 'POST' });
      }

      return handleLead(request, env, ctx);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;

async function handleLead(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  let parsed: unknown;
  try {
    parsed = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  if (!isLeadPayload(parsed)) {
    return json({ error: 'Invalid request fields' }, 400);
  }

  const payload = parsed;

  const firstName = (payload.firstName ?? '').trim();
  const lastName = (payload.lastName ?? '').trim();
  const email = (payload.email ?? '').trim();
  const phone = (payload.phone ?? '').trim();
  const program = (payload.program ?? '').trim();
  const message = (payload.message ?? '').trim();
  const source = (payload.source ?? '').trim();

  if (!firstName || !lastName || !email) {
    return json({ error: 'Missing required fields' }, 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Invalid email' }, 400);
  }

  if (firstName.length > 100 || lastName.length > 100 || email.length > 200 || message.length > 5000 || source.length > 100) {
    return json({ error: 'Field too long' }, 400);
  }

  const userAgent = request.headers.get('user-agent') ?? '';
  const ip = request.headers.get('cf-connecting-ip') ?? '';

  try {
    await env.DB.prepare(
      `INSERT INTO leads (first_name, last_name, email, phone, program, message, source, user_agent, ip)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(firstName, lastName, email, phone || null, program || null, message, source || null, userAgent, ip)
      .run();
  } catch (err) {
    console.error(JSON.stringify({
      message: 'D1 insert failed',
      error: err instanceof Error ? err.message : String(err),
      source,
    }));
    return json({ error: 'Could not save your message. Please try again.' }, 500);
  }

  const lead = { firstName, lastName, email, phone, program, message, source };
  ctx.waitUntil(sendToGoHighLevel(env, lead));

  return json({ ok: true });
}

async function sendToGoHighLevel(env: Env, lead: NormalizedLead): Promise<void> {
  if (!env.GHL_WEBHOOK_URL) {
    console.warn(JSON.stringify({ message: 'GHL_WEBHOOK_URL not set; skipping GoHighLevel' }));
    return;
  }

  const programLabel = lead.program ? PROGRAM_LABELS[lead.program] ?? lead.program : '';

  // Map to GoHighLevel's native contact fields; program/message/source land as
  // custom fields you can reference in the workflow.
  const body = {
    first_name: lead.firstName,
    last_name: lead.lastName,
    full_name: `${lead.firstName} ${lead.lastName}`.trim(),
    email: lead.email,
    phone: lead.phone || undefined,
    source: lead.source || 'lajollatkd.com',
    program: programLabel || undefined,
    message: lead.message || undefined,
  };

  try {
    const res = await fetch(env.GHL_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error(JSON.stringify({
        message: 'GoHighLevel webhook failed',
        status: res.status,
        statusText: res.statusText,
        source: lead.source,
      }));
    }
  } catch (err) {
    console.error(JSON.stringify({
      message: 'GoHighLevel webhook error',
      error: err instanceof Error ? err.message : String(err),
      source: lead.source,
    }));
  }
}

function isLeadPayload(value: unknown): value is LeadPayload {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;

  const record = value as Record<string, unknown>;
  const allowedFields: Array<keyof LeadPayload> = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'program',
    'message',
    'source',
  ];

  return allowedFields.every((field) =>
    record[field] === undefined || typeof record[field] === 'string'
  );
}

function json(body: unknown, status = 200, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...SECURITY_HEADERS,
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      ...extraHeaders,
    },
  });
}

function gone(): Response {
  return new Response(
    '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Program No Longer Offered | La Jolla Martial Arts</title></head><body><main><h1>This program is no longer offered</h1><p>Explore our current <a href="/adult-martial-arts">adult martial arts classes</a> or <a href="/contact">contact La Jolla Martial Arts</a>.</p></main></body></html>',
    {
      status: 410,
      headers: {
        ...SECURITY_HEADERS,
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=3600',
        'x-robots-tag': 'noindex, follow',
      },
    }
  );
}
