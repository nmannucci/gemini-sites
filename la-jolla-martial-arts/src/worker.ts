interface Env {
  DB: D1Database;
  GHL_WEBHOOK_URL: string;
  ASSETS: Fetcher;
}

interface LeadPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  program?: string;
  message?: string;
  source?: string;
}

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

    if (url.pathname === '/api/lead' && request.method === 'POST') {
      return handleLead(request, env, ctx);
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleLead(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  let payload: LeadPayload;
  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

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
    console.error('D1 insert failed', err);
    return json({ error: 'Could not save your message. Please try again.' }, 500);
  }

  const lead = { firstName, lastName, email, phone, program, message, source };
  ctx.waitUntil(sendToGoHighLevel(env, lead));

  return json({ ok: true });
}

async function sendToGoHighLevel(env: Env, lead: Required<LeadPayload>): Promise<void> {
  if (!env.GHL_WEBHOOK_URL) {
    console.warn('GHL_WEBHOOK_URL not set; skipping GoHighLevel');
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
      const text = await res.text();
      console.error('GoHighLevel webhook failed', res.status, text);
    }
  } catch (err) {
    console.error('GoHighLevel webhook error', err);
  }
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
