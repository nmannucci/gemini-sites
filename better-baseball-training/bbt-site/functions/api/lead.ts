// Pages Function — replaces src/worker.ts handleLead.
// Pages routes file path → URL: functions/api/lead.ts serves POST /api/lead.

interface Env {
  DB: D1Database;
  // GoHighLevel inbound-webhook URL. GHL handles the lead notification email +
  // contact creation. (Replaces the old Resend send — Wix DNS can't host the
  // SPF/DKIM records a verified Resend sending domain would need.)
  GHL_WEBHOOK_URL: string;
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
  hitting: 'Hitting',
  pitching: 'Pitching',
  catching: 'Catching',
  fielding: 'Fielding',
};

const INTEREST_LABELS: Record<string, string> = {
  'competitive-teams': 'Competitive Teams',
  'academy-training': 'Academy Training',
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
    sendToGHL(env, { firstName, lastName, email, phone, message, source, playerName, playerDob, areaFocus, interest, location })
  );

  return json({ ok: true });
};

// Forward the lead to the GoHighLevel inbound webhook. Flat JSON keys match the
// sample mapped in the GHL workflow; area/interest/location are sent as
// human-readable labels (plus program as the raw slug) to match that mapping.
async function sendToGHL(
  env: Env,
  lead: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
    source: string;
    playerName: string;
    playerDob: string;
    areaFocus: string;
    interest: string;
    location: string;
  }
): Promise<void> {
  if (!env.GHL_WEBHOOK_URL) {
    console.warn('GHL_WEBHOOK_URL not set; skipping lead forward');
    return;
  }

  const areaFocusLabel = PROGRAM_LABELS[lead.areaFocus] ?? lead.areaFocus;
  const interestLabel = INTEREST_LABELS[lead.interest] ?? lead.interest;
  const locationLabel = LOCATION_LABELS[lead.location] ?? lead.location;

  const body = {
    firstName: lead.firstName,
    lastName: lead.lastName,
    fullName: `${lead.firstName} ${lead.lastName}`,
    email: lead.email,
    phone: lead.phone,
    playerName: lead.playerName,
    playerDob: lead.playerDob,
    areaFocus: areaFocusLabel,
    program: lead.areaFocus,
    interest: interestLabel,
    location: locationLabel,
    source: lead.source,
    message: lead.message,
    submittedAt: new Date().toISOString(),
  };

  const res = await fetch(env.GHL_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('GHL webhook failed', res.status, text);
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
