import { META_PIXEL_ID } from '../../.wrangler/meta-pixel';

export interface MetaContext {
  metaEventSourceUrl?: string;
  metaFbp?: string;
  metaFbc?: string;
  metaOptOut?: string;
  metaTestEventCode?: string;
}

interface LeadIdentity {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  // Optional extra match keys (giveaway entries know these); omitted when unknown.
  zip?: string;
  city?: string;
  state?: string;
  country?: string;
  externalId?: string;
}

export function metaOptedOut(request: Request, context: MetaContext): boolean {
  return request.headers.get('sec-gpc') === '1' || context.metaOptOut === '1';
}

export function eventSource(request: Request, context: MetaContext): string {
  try {
    const url = new URL(context.metaEventSourceUrl || request.headers.get('referer') || request.url);
    if (url.origin === new URL(request.url).origin) return url.origin + url.pathname;
  } catch { /* Ignore malformed or external source URLs. */ }
  return new URL(request.url).origin + '/';
}

function cookieValue(request: Request, name: string): string | undefined {
  return request.headers.get('cookie')?.split(';').map((part) => part.trim())
    .find((part) => part.startsWith(name + '='))?.slice(name.length + 1);
}

function validMetaCookie(value?: string): string | undefined {
  return value && value.length <= 500 && /^fb\.\d+\.\d+\.[A-Za-z0-9_.-]+$/.test(value) ? value : undefined;
}

async function hash(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

/** Only called for PageView or after a lead has been saved. Never forwards messages or waiver data. */
export async function sendMetaEvent(
  env: Env, request: Request, eventName: 'PageView' | 'Lead', eventId: string,
  context: MetaContext, identity?: LeadIdentity, customData?: Record<string, string>,
): Promise<boolean> {
  if (!META_PIXEL_ID || !env.META_CAPI_ACCESS_TOKEN || metaOptedOut(request, context)) return false;
  const userData: Record<string, string | string[]> = {
    client_user_agent: request.headers.get('user-agent') || '',
  };
  const ip = request.headers.get('cf-connecting-ip');
  if (ip) userData.client_ip_address = ip;
  const fbp = validMetaCookie(context.metaFbp || cookieValue(request, '_fbp'));
  const fbc = validMetaCookie(context.metaFbc || cookieValue(request, '_fbc'));
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;
  if (identity) {
    userData.em = [await hash(identity.email.trim().toLowerCase())];
    // Local phone inputs are US numbers. Meta expects country code + digits.
    let phone = identity.phone.replace(/\D/g, '');
    if (phone.length === 10) phone = '1' + phone;
    if (phone.length >= 11 && phone.length <= 15) userData.ph = [await hash(phone)];
    // Meta's normalization: lowercase; city without spaces or punctuation; 5-digit US ZIP.
    // A hashed empty string is an invalid match key, so blanks are left out.
    const keys: Array<[string, string | undefined]> = [
      ['fn', identity.firstName.trim().toLowerCase()],
      ['ln', identity.lastName.trim().toLowerCase()],
      ['zp', identity.zip?.replace(/\D/g, '').slice(0, 5)],
      ['ct', identity.city?.toLowerCase().replace(/[^a-z]/g, '')],
      ['st', identity.state?.trim().toLowerCase()],
      ['country', identity.country?.trim().toLowerCase()],
      ['external_id', identity.externalId?.trim()],
    ];
    for (const [key, value] of keys) if (value) userData[key] = [await hash(value)];
  }
  const body = {
    // Opt-in only for a tester's request; ordinary visitors continue sending live events.
    test_event_code: /^TEST\d{1,20}$/.test(context.metaTestEventCode || '') ? context.metaTestEventCode : undefined,
    data: [{ event_name: eventName, event_time: Math.floor(Date.now() / 1000),
      event_id: eventId, action_source: 'website', event_source_url: eventSource(request, context), user_data: userData,
      custom_data: customData }],
  };
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch(`https://graph.facebook.com/v25.0/${META_PIXEL_ID}/events`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${env.META_CAPI_ACCESS_TOKEN}` },
        body: JSON.stringify(body), signal: AbortSignal.timeout(8000),
      });
      const result = await response.json() as { events_received?: number; error?: { code?: number } };
      if (response.ok && result.events_received === 1) {
        console.log(JSON.stringify({ message: 'Meta event accepted', eventName, eventId }));
        return true;
      }
      console.error(JSON.stringify({ message: 'Meta event rejected', eventName, eventId, status: response.status, code: result.error?.code }));
      if (response.status < 500 && response.status !== 429) return false;
    } catch {
      // Do not log request/response bodies, identifiers, or access tokens.
      console.error(JSON.stringify({ message: 'Meta event delivery failed', eventName, eventId, attempt }));
    }
  }
  return false;
}

export async function handleMetaPageView(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const headers = { 'content-type': 'application/json', 'cache-control': 'no-store' };
  if (request.method !== 'POST') return new Response(null, { status: 405, headers: { ...headers, allow: 'POST' } });
  const origin = new URL(request.url).origin;
  if (request.headers.get('origin') !== origin || request.headers.get('sec-fetch-site') === 'cross-site') {
    return new Response(null, { status: 403, headers });
  }
  if (Number(request.headers.get('content-length')) > 4096) return new Response(null, { status: 413, headers });
  let value: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 4096) return new Response(null, { status: 413, headers });
    value = JSON.parse(raw);
  } catch { return new Response(null, { status: 400, headers }); }
  if (!value || typeof value !== 'object' || Array.isArray(value)) return new Response(null, { status: 400, headers });
  const payload = value as Record<string, unknown>;
  if (typeof payload.eventId !== 'string' || !/^[0-9a-f-]{36}$/.test(payload.eventId)
    || ['metaEventSourceUrl', 'metaFbp', 'metaFbc', 'metaOptOut', 'metaTestEventCode'].some((key) => payload[key] !== undefined && (typeof payload[key] !== 'string' || (payload[key] as string).length > 1000))) {
    return new Response(null, { status: 400, headers });
  }
  const context = payload as MetaContext;
  if (metaOptedOut(request, context)) return new Response(null, { status: 204, headers });
  ctx.waitUntil(sendMetaEvent(env, request, 'PageView', payload.eventId, context));
  return new Response(null, { status: 202, headers });
}
