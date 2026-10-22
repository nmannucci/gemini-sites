import { pacificDate, validateWaiver, WAIVER_TEXT, type SignedWaiver } from '../data/zumba-waiver';
import { createWaiverPdf } from './waiver-pdf';
import { waiverConfirmationPage } from './waiver-confirmation';

const MAX_BODY_BYTES = 250_000;
const headers = { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' };
const response = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers });
interface StoredWaiver { id: string; payload_hash: string; record_json: string; email_status: string; email_attempts: number; next_attempt_at: string; }

export async function handleWaiver(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: { ...headers, allow: 'POST' } });
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return response({ error: 'Please submit the waiver from this website.' }, 403);
  if (!request.headers.get('content-type')?.startsWith('application/json')) return response({ error: 'Expected JSON.' }, 415);
  if (!env.GHL_WAIVER_WEBHOOK_URL || !env.WAIVER_LINK_KEY) return response({ error: 'Online waivers are temporarily unavailable. Please text Lavel at 619-722-0725 to complete your waiver before class.' }, 503);
  // Bound the actual streamed body, including requests without Content-Length.
  const reader = request.body?.getReader();
  if (!reader) return response({ error: 'Missing form data.' }, 400);
  let size = 0; const chunks: Uint8Array[] = [];
  while (true) {
    const { value, done } = await reader.read(); if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) { await reader.cancel(); return response({ error: 'Your signature is too large. Clear it and sign again.' }, 413); }
    chunks.push(value);
  }
  let parsed: unknown;
  try { const bytes = new Uint8Array(size); let offset = 0; for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; } parsed = JSON.parse(new TextDecoder().decode(bytes)); }
  catch { return response({ error: 'Invalid form data.' }, 400); }
  const validated = validateWaiver(parsed);
  if ('error' in validated) return response(validated, 400);
  const { fields, requestId } = validated;
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(fields)));
  const payloadHash = Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
  const signedAt = new Date().toISOString();
  const record: SignedWaiver = { ...fields, id: requestId, signedAt, signingDate: pacificDate(new Date(signedAt)), waiverText: WAIVER_TEXT };
  try {
    await env.DB.prepare(`INSERT INTO zumba_waivers (id, payload_hash, record_json, created_at, next_attempt_at) VALUES (?, ?, ?, ?, ?) ON CONFLICT(id) DO NOTHING`)
      .bind(requestId, payloadHash, JSON.stringify(record), signedAt, signedAt).run();
    const row = await env.DB.prepare('SELECT * FROM zumba_waivers WHERE id = ?').bind(requestId).first<StoredWaiver>();
    if (!row) throw new Error('Missing saved waiver');
    if (row.payload_hash !== payloadHash) return response({ error: 'This submission was already saved with different details. Reload to sign a new waiver.' }, 409);
    // Confirm the durable save immediately; a slow email provider must not hold up the visitor.
    if (row.email_status !== 'sent' && row.next_attempt_at <= signedAt) ctx.waitUntil(deliverWaiver(env, row));
    const token = await waiverToken(env.WAIVER_LINK_KEY, row.id, 'receipt');
    return response({ ok: true, id: row.id, signingDate: JSON.parse(row.record_json).signingDate, confirmationUrl: `/zumba/waiver/confirmation?ref=${row.id}&token=${token}` });
  } catch {
    console.error(JSON.stringify({ message: 'Waiver save or delivery bookkeeping failed', waiverId: requestId }));
    return response({ error: 'We could not confirm your waiver. Please try again; retrying will not create a duplicate.' }, 500);
  }
}

async function linkKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

async function waiverToken(secret: string, id: string, purpose: 'copy' | 'receipt' = 'copy'): Promise<string> {
  const signature = await crypto.subtle.sign('HMAC', await linkKey(secret), new TextEncoder().encode(`lavel-waiver-${purpose}:${id}`));
  return Array.from(new Uint8Array(signature), (b) => b.toString(16).padStart(2, '0')).join('');
}

export async function handleWaiverConfirmation(request: Request, env: Env): Promise<Response> {
  const privateHeaders = { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'private, no-store', 'referrer-policy': 'no-referrer', 'x-content-type-options': 'nosniff', 'x-robots-tag': 'noindex, nofollow, noarchive', 'content-security-policy': "default-src 'none'; style-src 'unsafe-inline'; img-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'" };
  const page = (receipt: { id: string; signingDate: string } | null, status = 200) => new Response(request.method === 'HEAD' ? null : waiverConfirmationPage(receipt), { status, headers: privateHeaders });
  if (!['GET', 'HEAD'].includes(request.method)) return new Response('Method not allowed', { status: 405, headers: { ...privateHeaders, allow: 'GET, HEAD' } });
  const url = new URL(request.url), id = url.searchParams.get('ref') || '', token = url.searchParams.get('token') || '';
  if (!env.WAIVER_LINK_KEY || !/^[a-f0-9-]{36}$/.test(id) || !/^[a-f0-9]{64}$/.test(token)) return page(null, 404);
  const signature = Uint8Array.from(token.match(/../g)!, (pair) => parseInt(pair, 16));
  const valid = await crypto.subtle.verify('HMAC', await linkKey(env.WAIVER_LINK_KEY), signature, new TextEncoder().encode(`lavel-waiver-receipt:${id}`));
  if (!valid) return page(null, 404);
  try {
    const row = await env.DB.prepare('SELECT record_json FROM zumba_waivers WHERE id = ?').bind(id).first<{ record_json: string }>();
    if (!row) return page(null, 404);
    return page({ id, signingDate: (JSON.parse(row.record_json) as SignedWaiver).signingDate });
  } catch {
    console.error(JSON.stringify({ message: 'Waiver confirmation lookup failed', waiverId: id }));
    return page(null, 503);
  }
}

// Capability links are shared only with the owner's dedicated GHL workflow.
// Knowing a submission ID does not grant access, and signing responses never expose the token.
export async function handleWaiverCopy(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const match = /^\/api\/zumba-waiver\/copy\/([a-f0-9-]{36})\.(pdf|json)$/.exec(url.pathname);
  const token = url.searchParams.get('token') || '';
  const privateHeaders = { 'cache-control': 'private, no-store', 'referrer-policy': 'no-referrer', 'x-content-type-options': 'nosniff', 'x-robots-tag': 'noindex, nofollow, noarchive', 'content-security-policy': "default-src 'none'; frame-ancestors 'none'; sandbox" };
  const missing = () => new Response('Not found', { status: 404, headers: privateHeaders });
  if (!match || !env.WAIVER_LINK_KEY || !/^[a-f0-9]{64}$/.test(token)) return missing();
  if (!['GET', 'HEAD'].includes(request.method)) return new Response('Method not allowed', { status: 405, headers: { ...privateHeaders, allow: 'GET, HEAD' } });
  const signature = Uint8Array.from(token.match(/../g)!, (pair) => parseInt(pair, 16));
  const valid = await crypto.subtle.verify('HMAC', await linkKey(env.WAIVER_LINK_KEY), signature, new TextEncoder().encode(`lavel-waiver-copy:${match[1]}`));
  if (!valid) return missing();
  const row = await env.DB.prepare('SELECT record_json FROM zumba_waivers WHERE id = ?').bind(match[1]).first<{ record_json: string }>();
  if (!row) return missing();
  const isPdf = match[2] === 'pdf';
  const content = request.method === 'HEAD' ? null : isPdf ? new Uint8Array(await createWaiverPdf(JSON.parse(row.record_json))).buffer : row.record_json;
  return new Response(content, { headers: { ...privateHeaders, 'content-type': isPdf ? 'application/pdf' : 'application/json; charset=utf-8', 'content-disposition': `attachment; filename="lavel-waiver-${match[1]}.${match[2]}"` } });
}

async function deliverWaiver(env: Env, row: StoredWaiver): Promise<void> {
  if (!env.GHL_WAIVER_WEBHOOK_URL || !env.WAIVER_LINK_KEY) return;
  // Claim the delivery before sending, so concurrent requests and cron runs cannot both send.
  const now = new Date();
  const attempts = row.email_attempts + 1;
  const retryAt = new Date(now.getTime() + Math.min(86_400_000, 600_000 * 2 ** Math.min(attempts - 1, 8))).toISOString();
  const claim = await env.DB.prepare(`UPDATE zumba_waivers SET email_attempts = ?, next_attempt_at = ? WHERE id = ? AND email_status = 'pending' AND next_attempt_at <= ? AND email_attempts = ?`)
    .bind(attempts, retryAt, row.id, now.toISOString(), row.email_attempts).run();
  if (!claim.meta.changes) return;
  try {
    const record: SignedWaiver = JSON.parse(row.record_json);
    const token = await waiverToken(env.WAIVER_LINK_KEY, row.id);
    const copyUrl = `https://lajollatkd.com/api/zumba-waiver/copy/${row.id}`;
    const res = await fetch(env.GHL_WAIVER_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'Idempotency-Key': `lavel-waiver/${row.id}` },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        event: 'waiver_signed', waiver_id: row.id, full_name: record.fullName,
        email: record.email, phone: record.phone, signing_date: record.signingDate, signed_at: record.signedAt,
        military_veteran: record.militaryVeteran, photo_opt_out: record.photoOptOut ? 'Yes' : 'No', guardian_name: record.guardianName || 'Not required (18+)',
        signed_pdf_url: `${copyUrl}.pdf?token=${token}`,
        record_url: `${copyUrl}.json?token=${token}`,
      }),
    });
    if (!res.ok) { console.error(JSON.stringify({ message: 'Waiver webhook rejected; retry scheduled', waiverId: row.id, status: res.status })); await res.body?.cancel(); return; }
    const receipt = await res.json() as { status?: string; id?: string };
    // Draft hooks accept test samples too; those must never count as a live handoff.
    if (receipt.status !== 'Success: request sent to trigger execution server' || !receipt.id) throw new Error('Workflow did not accept a live execution');
    // "sent" means handed to the published GHL workflow, not confirmed inbox delivery.
    await env.DB.prepare(`UPDATE zumba_waivers SET email_status = 'sent', email_sent_at = ?, email_id = ? WHERE id = ?`).bind(new Date().toISOString(), `ghl:${receipt.id}`, row.id).run();
  } catch {
    console.error(JSON.stringify({ message: 'Waiver GHL handoff failed; retry scheduled', waiverId: row.id }));
  }
}

export async function retryWaiverEmails(env: Env): Promise<void> {
  if (!env.GHL_WAIVER_WEBHOOK_URL || !env.WAIVER_LINK_KEY) return;
  const pending = await env.DB.prepare(`SELECT * FROM zumba_waivers WHERE email_status = 'pending' AND next_attempt_at <= ? ORDER BY next_attempt_at LIMIT 10`).bind(new Date().toISOString()).all<StoredWaiver>();
  for (const row of pending.results) await deliverWaiver(env, row);
}
