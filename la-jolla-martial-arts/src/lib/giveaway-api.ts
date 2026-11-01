import { AGE_MAX, AGE_MIN, BENEFITS, ELIGIBLE_ZIPS, OUT_OF_AREA_MESSAGE, SMS_CONSENT_TEXT, TWICE_WEEKLY } from '../data/giveaway';
import { sendMetaEvent, type MetaContext } from './meta-conversions';

type UtmKey = 'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_content' | 'fbclid';
const UTM_KEYS: UtmKey[] = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'fbclid'];

export interface GiveawayEntryInput extends MetaContext {
  parentName?: string;
  phone?: string;
  email?: string;
  childFirstName?: string;
  childAge?: string | number;
  zip?: string;
  benefits?: string[];
  benefitOther?: string;
  twiceWeekly?: string;
  smsConsent?: boolean;
  turnstileToken?: string;
  website?: string; // honeypot
  utm?: Partial<Record<UtmKey, string>>;
}

export interface ValidEntry {
  parentFirstName: string;
  parentLastName: string;
  phone: string;
  email: string;
  childFirstName: string;
  childAge: number;
  zip: string;
  benefits: string[];
  benefitOther: string;
  twiceWeekly: string;
  utm: Partial<Record<UtmKey, string>>;
}

/** US numbers only, returned as +1XXXXXXXXXX. */
export function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return null;
}

export function splitName(full: string): { firstName: string; lastName: string } {
  const [firstName = '', ...rest] = full.trim().split(/\s+/);
  return { firstName, lastName: rest.join(' ') };
}

const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

export function validateGiveawayEntry(input: unknown): { entry: ValidEntry } | { errors: Record<string, string> } {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { errors: { form: 'Invalid entry.' } };
  const raw = input as GiveawayEntryInput;
  const errors: Record<string, string> = {};

  const parentName = text(raw.parentName);
  if (!parentName) errors.parentName = 'Please enter your name.';
  else if (parentName.length > 100) errors.parentName = 'Please shorten your name to 100 characters.';

  const phone = normalizePhone(text(raw.phone));
  if (!phone) errors.phone = 'Please enter a 10-digit US phone number.';

  const email = text(raw.email).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address.';
  else if (email.length > 200) errors.email = 'Please use an email address under 200 characters.';

  const childFirstName = text(raw.childFirstName);
  if (!childFirstName) errors.childFirstName = 'Please enter your child’s first name.';
  else if (childFirstName.length > 100) errors.childFirstName = 'Please shorten the name to 100 characters.';

  const ageText = typeof raw.childAge === 'number' ? String(raw.childAge) : text(raw.childAge);
  const childAge = /^\d{1,2}$/.test(ageText) ? Number(ageText) : NaN;
  if (!(childAge >= AGE_MIN && childAge <= AGE_MAX)) errors.childAge = `This giveaway is for ages ${AGE_MIN}–${AGE_MAX}.`;

  const zip = text(raw.zip);
  if (!/^\d{5}$/.test(zip)) errors.zip = 'Please enter a five-digit ZIP code.';
  else if (!(ELIGIBLE_ZIPS as readonly string[]).includes(zip)) errors.zip = OUT_OF_AREA_MESSAGE;

  const benefits = Array.isArray(raw.benefits) ? raw.benefits : [];
  if (!benefits.length || !benefits.every((b) => (BENEFITS as readonly unknown[]).includes(b))) {
    errors.benefits = 'Please choose at least one benefit.';
  }
  const benefitOther = text(raw.benefitOther);
  if (benefitOther.length > 200) errors.benefitOther = 'Please shorten this to 200 characters.';

  const twiceWeekly = text(raw.twiceWeekly);
  if (!(TWICE_WEEKLY as readonly string[]).includes(twiceWeekly)) errors.twiceWeekly = 'Please choose an answer.';

  if (raw.smsConsent !== true) errors.smsConsent = 'Please check the box to agree to giveaway texts.';

  if (Object.keys(errors).length) return { errors };

  const utm: Partial<Record<UtmKey, string>> = {};
  for (const key of UTM_KEYS) {
    const value = text(raw.utm?.[key]).slice(0, 500);
    if (value) utm[key] = value;
  }

  const { firstName, lastName } = splitName(parentName);
  return {
    entry: {
      parentFirstName: firstName, parentLastName: lastName, phone: phone!, email, childFirstName, childAge, zip,
      benefits: [...new Set(benefits)], benefitOther, twiceWeekly, utm,
    },
  };
}

// ---- Worker endpoint and GHL hand-off (one send per entry, no retries) ----

interface GiveawayRow {
  id: string; version: number; created_at: string; parent_first_name: string; parent_last_name: string; phone: string; email: string;
  child_first_name: string; child_age: number; zip: string; benefits: string; benefit_other: string | null; twice_weekly: string;
  sms_consent_text: string; sms_consent_at: string; utm_source: string | null; utm_medium: string | null; utm_campaign: string | null;
  utm_content: string | null; fbclid: string | null; ghl_status: string; ghl_attempts: number; ghl_next_attempt_at: string; ghl_first_sent_at: string | null; ghl_lease_until: string | null;
}

const RATE_LIMIT_PER_HOUR = 10;
const ID_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
// GHL answers draft-workflow test hooks too; only this status means a published workflow ran.
const GHL_ACCEPTED = 'Success: request sent to trigger execution server';

const respond = (body: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff', ...extra },
  });

function newEntryId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return 'GA-' + Array.from(bytes, (b) => ID_ALPHABET[b % ID_ALPHABET.length]).join('');
}

async function turnstilePasses(env: Env, token: string, ip: string): Promise<boolean> {
  if (!env.TURNSTILE_SECRET_KEY) {
    console.warn(JSON.stringify({ message: 'TURNSTILE_SECRET_KEY not set; skipping bot check' }));
    return true;
  }
  if (!token) return false;
  try {
    const form = new FormData();
    form.append('secret', env.TURNSTILE_SECRET_KEY);
    form.append('response', token);
    if (ip) form.append('remoteip', ip);
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form, signal: AbortSignal.timeout(8000) });
    return Boolean(((await res.json()) as { success?: boolean }).success);
  } catch {
    return false;
  }
}

async function saveEntry(env: Env, entry: ValidEntry, ip: string, userAgent: string): Promise<{ id: string; updated: boolean }> {
  const now = new Date().toISOString();
  const fields = [
    entry.parentFirstName, entry.parentLastName, entry.phone, entry.email, entry.childFirstName, entry.childAge, entry.zip,
    JSON.stringify(entry.benefits), entry.benefitOther || null, entry.twiceWeekly, SMS_CONSENT_TEXT, now, ip || null, userAgent || null,
    entry.utm.utm_source ?? null, entry.utm.utm_medium ?? null, entry.utm.utm_campaign ?? null, entry.utm.utm_content ?? null, entry.utm.fbclid ?? null,
  ];
  for (let attempt = 0; attempt < 2; attempt++) {
    const existing = await env.DB.prepare('SELECT id FROM giveaway_entries WHERE phone = ?').bind(entry.phone).first<{ id: string }>()
      ?? await env.DB.prepare('SELECT id FROM giveaway_entries WHERE email = ? ORDER BY created_at LIMIT 1').bind(entry.email).first<{ id: string }>();
    if (existing) {
      await env.DB.prepare(
        `UPDATE giveaway_entries SET parent_first_name = ?, parent_last_name = ?, phone = ?, email = ?, child_first_name = ?, child_age = ?, zip = ?,
           benefits = ?, benefit_other = ?, twice_weekly = ?, sms_consent_text = ?, sms_consent_at = ?, ip = ?, user_agent = ?,
           utm_source = ?, utm_medium = ?, utm_campaign = ?, utm_content = ?, fbclid = ?,
           updated_at = ?, version = version + 1, ghl_status = 'pending', ghl_attempts = 0, ghl_next_attempt_at = ?, ghl_error = NULL
         WHERE id = ?`
      ).bind(...fields, now, now, existing.id).run();
      return { id: existing.id, updated: true };
    }
    const id = newEntryId();
    try {
      await env.DB.prepare(
        `INSERT INTO giveaway_entries (parent_first_name, parent_last_name, phone, email, child_first_name, child_age, zip,
           benefits, benefit_other, twice_weekly, sms_consent_text, sms_consent_at, ip, user_agent,
           utm_source, utm_medium, utm_campaign, utm_content, fbclid, id, created_at, updated_at, ghl_next_attempt_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(...fields, id, now, now, now).run();
      return { id, updated: false };
    } catch (err) {
      // A simultaneous submission for the same phone won the insert; update that row instead.
      if (attempt === 0 && /UNIQUE/i.test(String(err))) continue;
      throw err;
    }
  }
  throw new Error('Could not save giveaway entry');
}

function ghlBody(row: GiveawayRow) {
  return {
    first_name: row.parent_first_name,
    last_name: row.parent_last_name,
    full_name: `${row.parent_first_name} ${row.parent_last_name}`.trim(),
    email: row.email,
    phone: row.phone,
    postal_code: row.zip,
    child_first_name: row.child_first_name,
    child_age: row.child_age,
    giveaway_benefits: (JSON.parse(row.benefits) as string[]).join(', '),
    giveaway_benefit_other: row.benefit_other || undefined,
    twice_weekly: row.twice_weekly,
    giveaway_entry_id: row.id,
    // GHL has already received this family once: update the contact, skip the receipt text.
    entry_update: row.ghl_first_sent_at ? 'yes' : 'no',
    sms_consent: 'yes',
    sms_consent_text: row.sms_consent_text,
    sms_consent_at: row.sms_consent_at,
    source: 'lajollatkd.com/giveaway',
    utm_source: row.utm_source || undefined,
    utm_medium: row.utm_medium || undefined,
    utm_campaign: row.utm_campaign || undefined,
    utm_content: row.utm_content || undefined,
    fbclid: row.fbclid || undefined,
  };
}

async function deliverGiveawayEntry(env: Env, id: string, depth = 0): Promise<void> {
  const row = await env.DB.prepare('SELECT * FROM giveaway_entries WHERE id = ?').bind(id).first<GiveawayRow>();
  const now = new Date();
  if (!row || row.ghl_status !== 'pending' || row.ghl_next_attempt_at > now.toISOString()) return;
  if (!env.GHL_GIVEAWAY_WEBHOOK_URL) {
    console.warn(JSON.stringify({ message: 'GHL_GIVEAWAY_WEBHOOK_URL not set; giveaway entry left pending', entryId: id }));
    return;
  }
  // Claim a short lease before sending: only one send per entry is ever in flight, so a family
  // re-entering mid-send can't trigger a second "new entry" (and a second receipt text).
  const leaseUntil = new Date(now.getTime() + 60_000).toISOString();
  const claim = await env.DB.prepare(
    `UPDATE giveaway_entries SET ghl_attempts = ghl_attempts + 1, ghl_lease_until = ?
     WHERE id = ? AND ghl_status = 'pending' AND ghl_attempts = ? AND version = ? AND ghl_next_attempt_at <= ?
       AND (ghl_lease_until IS NULL OR ghl_lease_until <= ?)`
  ).bind(leaseUntil, id, row.ghl_attempts, row.version, now.toISOString(), now.toISOString()).run();
  if (!claim.meta.changes) return;

  let error: string | null = null;
  try {
    const res = await fetch(env.GHL_GIVEAWAY_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'Idempotency-Key': `ljma-giveaway/${id}/${row.version}` },
      body: JSON.stringify(ghlBody(row)),
      signal: AbortSignal.timeout(8000),
    });
    const receipt = (await res.json().catch(() => ({}))) as { status?: string };
    if (!res.ok) error = `HTTP ${res.status}`;
    else if (receipt.status !== GHL_ACCEPTED) error = 'Workflow did not accept a live execution';
  } catch (err) {
    error = String(err instanceof Error ? err.message : err).slice(0, 300);
  }

  if (error) {
    // No automatic retry (Nico, November 1): GHL may have run the workflow anyway, and a resend
    // could text the family a second receipt. The entry stays saved in D1, marked failed.
    console.error(JSON.stringify({ message: 'Giveaway GHL handoff failed; not retried', entryId: id, error }));
    await env.DB.prepare(`UPDATE giveaway_entries SET ghl_status = 'failed', ghl_error = ?, ghl_lease_until = NULL WHERE id = ? AND version = ?`)
      .bind(error, id, row.version).run();
    return;
  }
  const sentAt = new Date().toISOString();
  // If the family re-entered while we were sending, GHL still needs the newer answers: stay pending.
  const done = await env.DB.prepare(
    `UPDATE giveaway_entries SET ghl_status = 'sent', ghl_error = NULL, ghl_lease_until = NULL, ghl_first_sent_at = COALESCE(ghl_first_sent_at, ?)
     WHERE id = ? AND version = ?`
  ).bind(sentAt, id, row.version).run();
  if (!done.meta.changes) {
    await env.DB.prepare('UPDATE giveaway_entries SET ghl_first_sent_at = COALESCE(ghl_first_sent_at, ?), ghl_attempts = 0, ghl_next_attempt_at = ?, ghl_lease_until = NULL WHERE id = ?')
      .bind(sentAt, sentAt, id).run();
    if (depth < 2) await deliverGiveawayEntry(env, id, depth + 1);
  }
}

export async function handleGiveawayEntry(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  if (request.method !== 'POST') return respond({ error: 'Method not allowed' }, 405, { allow: 'POST' });
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return respond({ error: 'Forbidden' }, 403);

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return respond({ error: 'Invalid JSON' }, 400);
  }
  const input = (payload && typeof payload === 'object' ? payload : {}) as GiveawayEntryInput;
  if (text(input.website)) return respond({ ok: true }); // honeypot: bots fill hidden fields

  const result = validateGiveawayEntry(payload);
  if ('errors' in result) return respond({ error: 'Validation failed', errors: result.errors }, 400);

  const ip = request.headers.get('cf-connecting-ip') ?? '';
  // Rate limit first: a Turnstile token verifies only once, so don't spend it on a request we'll refuse.
  if (ip) {
    const since = new Date(Date.now() - 3_600_000).toISOString();
    const recent = await env.DB.prepare('SELECT COUNT(*) AS n FROM giveaway_entries WHERE ip = ? AND updated_at >= ?').bind(ip, since).first<{ n: number }>();
    if ((recent?.n ?? 0) >= RATE_LIMIT_PER_HOUR) return respond({ error: 'Too many entries' }, 429);
  }
  if (!(await turnstilePasses(env, text(input.turnstileToken), ip))) return respond({ error: 'Verification failed' }, 403);

  let saved: { id: string; updated: boolean };
  try {
    saved = await saveEntry(env, result.entry, ip, request.headers.get('user-agent') ?? '');
  } catch (err) {
    console.error(JSON.stringify({ message: 'Giveaway D1 save failed', error: err instanceof Error ? err.message : String(err) }));
    return respond({ error: 'Could not save your entry. Please try again.' }, 500);
  }

  ctx.waitUntil(deliverGiveawayEntry(env, saved.id));
  if (!saved.updated) {
    const { email, phone, zip, parentFirstName: firstName, parentLastName: lastName } = result.entry;
    // All eligible ZIPs are in the city of San Diego, CA.
    ctx.waitUntil(sendMetaEvent(env, request, 'Lead', saved.id, input,
      { email, phone, firstName, lastName, zip, city: 'San Diego', state: 'CA', country: 'US', externalId: saved.id },
      { content_name: 'LJMA giveaway entry' }));
  }
  return respond({ ok: true, entryId: saved.id, updated: saved.updated });
}
