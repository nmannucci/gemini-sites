// Pages Function — replaces src/worker.ts handleLead.
// Pages routes file path → URL: functions/api/lead.ts serves POST /api/lead.

interface Env {
  DB: D1Database;
  RESEND_API_KEY: string;
  LEAD_NOTIFY_TO: string;
  LEAD_NOTIFY_FROM: string;
}

interface LeadPayload {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  program?: string;
  message?: string;
  source?: string;
  playerName?: string;
  playerDob?: string;
  areaFocus?: string;
  interest?: string;
  location?: string;
}

const PROGRAM_LABELS: Record<string, string> = {
  hitting: 'Hitting Lessons',
  pitching: 'Pitching Lessons',
  'infield-outfield': 'Infield / Outfield Lessons',
  catching: 'Catching Lessons',
  'baseball-iq': 'Baseball IQ Training',
  academy: 'Academy Training',
  travel: 'Competitive Teams',
  general: 'General Question',
};

const INTEREST_LABELS: Record<string, string> = {
  'competitive-teams': 'Competitive Teams',
  'academy-training': 'Academy Training',
  'private-lessons': 'Private Lessons',
  'not-sure': 'Not Sure Yet',
};

const LOCATION_LABELS: Record<string, string> = {
  rocklin: 'Rocklin',
  'el-dorado-hills': 'El Dorado Hills',
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  let payload: LeadPayload;
  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const fullName = (payload.fullName ?? '').trim();
  const fallbackName = splitFullName(fullName);
  const firstName = (payload.firstName ?? fallbackName.firstName).trim();
  const lastName = (payload.lastName ?? fallbackName.lastName).trim();
  const email = (payload.email ?? '').trim();
  const phone = (payload.phone ?? '').trim();
  const playerName = (payload.playerName ?? '').trim();
  const playerDob = (payload.playerDob ?? '').trim();
  const areaFocus = (payload.areaFocus ?? payload.program ?? '').trim();
  const interest = (payload.interest ?? '').trim();
  const location = (payload.location ?? '').trim();
  const message = buildLeadMessage({
    playerName,
    playerDob,
    areaFocus,
    interest,
    location,
    message: (payload.message ?? '').trim(),
  });
  const source = (payload.source ?? '').trim();

  if (!firstName || !lastName || !email || !phone || !playerName || !playerDob || !areaFocus || !interest || !location) {
    return json({ error: 'Missing required fields' }, 400);
  }

  if (!(areaFocus in PROGRAM_LABELS) || !(interest in INTEREST_LABELS) || !(location in LOCATION_LABELS)) {
    return json({ error: 'Invalid form selection' }, 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Invalid email' }, 400);
  }

  if (firstName.length > 100 || lastName.length > 100 || email.length > 200 || phone.length > 100 || playerName.length > 160 || playerDob.length > 40 || areaFocus.length > 100 || interest.length > 100 || location.length > 100 || message.length > 5000 || source.length > 100) {
    return json({ error: 'Field too long' }, 400);
  }

  const userAgent = request.headers.get('user-agent') ?? '';
  const ip = request.headers.get('cf-connecting-ip') ?? '';

  try {
    await env.DB.prepare(
      `INSERT INTO leads (first_name, last_name, email, phone, program, message, source, user_agent, ip)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(firstName, lastName, email, phone, areaFocus, message, source || null, userAgent, ip)
      .run();
  } catch (err) {
    console.error('D1 insert failed', err);
    return json({ error: 'Could not save your message. Please try again.' }, 500);
  }

  context.waitUntil(
    sendNotificationEmail(env, { firstName, lastName, email, phone, program: areaFocus, message, source, playerName, playerDob, areaFocus, interest, location })
  );

  return json({ ok: true });
};

async function sendNotificationEmail(env: Env, lead: Required<Omit<LeadPayload, 'fullName'>>): Promise<void> {
  if (!env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set; skipping email');
    return;
  }

  const programLabel = lead.program ? PROGRAM_LABELS[lead.program] ?? lead.program : '—';
  const interestLabel = lead.interest ? INTEREST_LABELS[lead.interest] ?? lead.interest : '—';
  const locationLabel = lead.location ? LOCATION_LABELS[lead.location] ?? lead.location : '—';
  const subject = `New lead: ${lead.firstName} ${lead.lastName}${lead.program ? ` (${programLabel})` : ''}`;

  const sourceRow = lead.source
    ? `<tr><td style="padding:8px 12px;background:#f5f5f0"><strong>Source</strong></td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#5A5A5A;font-size:13px">${escapeHtml(lead.source)}</td></tr>`
    : '';

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
      <h2 style="margin:0 0 16px;font-size:20px">New lead from betterbaseballtraining.com</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:8px 12px;background:#f5f5f0;width:140px"><strong>Name</strong></td><td style="padding:8px 12px;border-bottom:1px solid #eee">${escapeHtml(lead.firstName)} ${escapeHtml(lead.lastName)}</td></tr>
        <tr><td style="padding:8px 12px;background:#f5f5f0"><strong>Player</strong></td><td style="padding:8px 12px;border-bottom:1px solid #eee">${escapeHtml(lead.playerName)}</td></tr>
        <tr><td style="padding:8px 12px;background:#f5f5f0"><strong>DOB</strong></td><td style="padding:8px 12px;border-bottom:1px solid #eee">${escapeHtml(lead.playerDob)}</td></tr>
        <tr><td style="padding:8px 12px;background:#f5f5f0"><strong>Email</strong></td><td style="padding:8px 12px;border-bottom:1px solid #eee"><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></td></tr>
        <tr><td style="padding:8px 12px;background:#f5f5f0"><strong>Phone</strong></td><td style="padding:8px 12px;border-bottom:1px solid #eee">${lead.phone ? `<a href="tel:${escapeHtml(lead.phone)}">${escapeHtml(lead.phone)}</a>` : '—'}</td></tr>
        <tr><td style="padding:8px 12px;background:#f5f5f0"><strong>Area of Focus</strong></td><td style="padding:8px 12px;border-bottom:1px solid #eee">${escapeHtml(programLabel)}</td></tr>
        <tr><td style="padding:8px 12px;background:#f5f5f0"><strong>Interest</strong></td><td style="padding:8px 12px;border-bottom:1px solid #eee">${escapeHtml(interestLabel)}</td></tr>
        <tr><td style="padding:8px 12px;background:#f5f5f0"><strong>Location</strong></td><td style="padding:8px 12px;border-bottom:1px solid #eee">${escapeHtml(locationLabel)}</td></tr>
        ${sourceRow}
      </table>
    </div>
  `;

  const text = [
    `New lead from betterbaseballtraining.com`,
    ``,
    `Name: ${lead.firstName} ${lead.lastName}`,
    `Player: ${lead.playerName}`,
    `DOB: ${lead.playerDob}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || '—'}`,
    `Area of Focus: ${programLabel}`,
    `Interest: ${interestLabel}`,
    `Location: ${locationLabel}`,
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

function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length < 2) {
    return { firstName: parts[0] ?? '', lastName: '' };
  }
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  };
}

function buildLeadMessage(input: {
  playerName: string;
  playerDob: string;
  areaFocus: string;
  interest: string;
  location: string;
  message: string;
}): string {
  const rows = [
    `Player Name: ${input.playerName}`,
    `Player DOB: ${input.playerDob}`,
    `Area of Focus: ${PROGRAM_LABELS[input.areaFocus] ?? input.areaFocus}`,
    `Interest: ${INTEREST_LABELS[input.interest] ?? input.interest}`,
    `Location: ${LOCATION_LABELS[input.location] ?? input.location}`,
  ];
  if (input.message) rows.push('', input.message);
  return rows.join('\n');
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
