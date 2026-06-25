interface Env {
  DB: D1Database;
  RESEND_API_KEY: string;
  LEAD_NOTIFY_TO: string;
  LEAD_NOTIFY_FROM: string;
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
  ctx.waitUntil(sendNotificationEmail(env, lead));
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

async function sendNotificationEmail(env: Env, lead: Required<LeadPayload>): Promise<void> {
  if (!env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set; skipping email');
    return;
  }

  const programLabel = lead.program ? PROGRAM_LABELS[lead.program] ?? lead.program : '—';
  const subject = `New lead: ${lead.firstName} ${lead.lastName}${lead.program ? ` (${programLabel})` : ''}`;

  const messageRow = lead.message
    ? `<tr><td style="padding:8px 12px;background:#f5f5f0;vertical-align:top"><strong>Message</strong></td><td style="padding:8px 12px;border-bottom:1px solid #eee;white-space:pre-wrap">${escapeHtml(lead.message)}</td></tr>`
    : '';
  const sourceRow = lead.source
    ? `<tr><td style="padding:8px 12px;background:#f5f5f0"><strong>Source</strong></td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#5A5A5A;font-size:13px">${escapeHtml(lead.source)}</td></tr>`
    : '';

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
      <h2 style="margin:0 0 16px;font-size:20px">New lead from lajollatkd.com</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:8px 12px;background:#f5f5f0;width:140px"><strong>Name</strong></td><td style="padding:8px 12px;border-bottom:1px solid #eee">${escapeHtml(lead.firstName)} ${escapeHtml(lead.lastName)}</td></tr>
        <tr><td style="padding:8px 12px;background:#f5f5f0"><strong>Email</strong></td><td style="padding:8px 12px;border-bottom:1px solid #eee"><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></td></tr>
        <tr><td style="padding:8px 12px;background:#f5f5f0"><strong>Phone</strong></td><td style="padding:8px 12px;border-bottom:1px solid #eee">${lead.phone ? `<a href="tel:${escapeHtml(lead.phone)}">${escapeHtml(lead.phone)}</a>` : '—'}</td></tr>
        <tr><td style="padding:8px 12px;background:#f5f5f0"><strong>Program</strong></td><td style="padding:8px 12px;border-bottom:1px solid #eee">${escapeHtml(programLabel)}</td></tr>
        ${messageRow}
        ${sourceRow}
      </table>
    </div>
  `;

  const text = [
    `New lead from lajollatkd.com`,
    ``,
    `Name: ${lead.firstName} ${lead.lastName}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || '—'}`,
    `Program: ${programLabel}`,
    lead.message ? `\nMessage:\n${lead.message}` : '',
    lead.source ? `\nSource: ${lead.source}` : '',
  ].join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.LEAD_NOTIFY_FROM,
      to: env.LEAD_NOTIFY_TO.split(',').map((s) => s.trim()).filter(Boolean),
      reply_to: lead.email,
      subject,
      html,
      text,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error('Resend send failed', res.status, body);
  }
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
