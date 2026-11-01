import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash, randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { createHarness } from './zumba-harness';
import { runInNewContext } from 'node:vm';
import { META_PIXEL_ID } from '../.wrangler/meta-pixel';

const sha = (s: string) => createHash('sha256').update(s).digest('hex');

test('saved leads share an event ID with the browser and hash matching data', async (t) => {
  const h = await createHarness(undefined, true, 'test-only');
  t.after(() => h.mf.dispose());
  const body = { firstName: ' Alex ', lastName: ' Example ', email: 'ALEX@example.com', phone: '(858) 555-0123',
    message: 'Private message must stay out of Meta', metaFbp: 'fb.1.1790000000000.123456', metaFbc: 'fb.1.1790000000000.real-click-id',
    metaEventSourceUrl: 'http://localhost/contact?email=private@example.com' };
  const response = await h.mf.dispatchFetch('http://localhost/api/lead', {
    method: 'POST', headers: { 'content-type': 'application/json', origin: 'http://localhost', 'user-agent': 'test-browser', 'cf-connecting-ip': '192.0.2.1' }, body: JSON.stringify(body),
  });
  const result = await response.json() as { ok: boolean; metaEventId: string };
  assert.equal(response.status, 200);
  await h.mf.getD1Database('DB'); // Allow waitUntil delivery to complete.
  for (let i = 0; i < 100 && !h.metaEvents.length; i++) await new Promise((resolve) => setTimeout(resolve, 20));
  assert.equal(h.metaEvents.length, 1);
  assert.equal(h.metaRequestUrls[0], `https://graph.facebook.com/v25.0/${META_PIXEL_ID}/events`);
  const event = h.metaEvents[0].data[0];
  assert.equal(event.event_name, 'Lead');
  assert.equal(event.event_id, result.metaEventId);
  assert.equal(event.event_source_url, 'http://localhost/contact');
  assert.deepEqual(event.user_data.em, [sha('alex@example.com')]);
  assert.deepEqual(event.user_data.ph, [sha('18585550123')]);
  assert.deepEqual(event.user_data.fn, [sha('alex')]);
  assert.equal(event.user_data.fbp, body.metaFbp);
  assert.equal(event.user_data.fbc, body.metaFbc);
  assert.ok(!JSON.stringify(event).includes('Private message'));
  assert.ok(!JSON.stringify(event).includes('ALEX@example.com'));
  const before = h.metaEvents.length;
  const invalid = await h.mf.dispatchFetch('http://localhost/api/lead', { method: 'POST', body: JSON.stringify({ firstName: 'Missing fields' }) });
  assert.equal(invalid.status, 400);
  assert.equal(h.metaEvents.length, before);
  const optedOut = await h.mf.dispatchFetch('http://localhost/api/lead', { method: 'POST', headers: { 'sec-gpc': '1' }, body: JSON.stringify(body) });
  assert.equal(optedOut.status, 200);
  assert.equal(h.metaEvents.length, before);
});

test('PageView validates origin and IDs, honors opt-out, and uses browser event ID', async (t) => {
  const h = await createHarness(undefined, true, 'test-only');
  t.after(() => h.mf.dispose());
  const post = (body: unknown, origin = 'http://localhost', extra = {}) => h.mf.dispatchFetch('http://localhost/api/meta/pageview', {
    method: 'POST', headers: { origin, 'content-type': 'application/json', ...extra }, body: JSON.stringify(body),
  });
  const eventId = randomUUID();
  assert.equal((await post({ eventId }, 'https://attacker.test')).status, 403);
  assert.equal((await post({ eventId: 'invalid' })).status, 400);
  assert.equal((await post({ eventId, metaOptOut: '1' })).status, 204);
  assert.equal((await post({ eventId }, 'http://localhost', { 'sec-gpc': '1' })).status, 204);
  assert.equal(h.metaEvents.length, 0);
  assert.equal((await post({ eventId, metaEventSourceUrl: 'https://attacker.test/private', metaTestEventCode: 'TEST56495' })).status, 202);
  for (let i = 0; i < 100 && !h.metaEvents.length; i++) await new Promise((resolve) => setTimeout(resolve, 20));
  assert.equal(h.metaEvents.length, 1);
  assert.equal(h.metaEvents[0].data[0].event_id, eventId);
  assert.equal(h.metaEvents[0].data[0].event_name, 'PageView');
  assert.equal(h.metaEvents[0].data[0].event_source_url, 'http://localhost/');
  assert.equal(h.metaEvents[0].test_event_code, 'TEST56495');
});

test('build includes one pixel per public page and excludes private waiver pages', async () => {
  for (const page of ['index', 'contact', 'lp/kids-martial-arts', 'thank-you']) {
    const html = await readFile(`dist/${page}.html`, 'utf8');
    assert.equal(html.split('https://connect.facebook.net/en_US/fbevents.js').length - 1, 1);
    assert.ok(META_PIXEL_ID && html.includes(JSON.stringify(META_PIXEL_ID)));
  }
  for (const page of ['zumba/waiver', 'zumba/waiver/print']) {
    assert.ok(!(await readFile(`dist/${page}.html`, 'utf8')).includes('fbevents.js'));
  }
  const thankYou = await readFile('dist/thank-you.html', 'utf8');
  assert.ok(thankYou.includes("sessionStorage.removeItem('ljma_meta_lead')"));
});

test('browser queues matching IDs, prevents duplicate initialization, and consumes thank-you leads once', async () => {
  const html = await readFile('dist/thank-you.html', 'utf8');
  const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((match) => match[1]);
  const pixel = scripts.find((s) => s.includes('fbevents.js'))!;
  const confirmation = scripts.find((s) => s.includes("var metaLeadId = sessionStorage.getItem"))!;
  const makeBrowser = (optOut = false) => {
    const requests: Array<{ eventId: string }> = [];
    const storage = new Map<string, string>();
    const sandbox: Record<string, any> = {
      location: new URL('https://lajollatkd.com/thank-you'), navigator: { globalPrivacyControl: optOut },
      crypto: { randomUUID }, URLSearchParams,
      document: { cookie: '', createElement: () => ({}), getElementsByTagName: () => [{ parentNode: { insertBefore() {} } }] },
      fetch: async (_: string, options: { body: string }) => { requests.push(JSON.parse(options.body)); },
      sessionStorage: { getItem: (key: string) => storage.get(key), removeItem: (key: string) => storage.delete(key) },
    };
    sandbox.window = sandbox;
    return { sandbox, requests, storage };
  };
  const normal = makeBrowser();
  // A standalone page can load the base component without emitting a Lead.
  normal.sandbox.location = new URL('https://lajollatkd.com/giveaway');
  runInNewContext(pixel, normal.sandbox);
  runInNewContext(pixel, normal.sandbox);
  assert.equal(normal.requests.length, 1);
  const pageview = normal.sandbox.fbq.queue.find((args: IArguments) => args[2] === 'PageView');
  assert.equal(pageview[4].eventID, normal.requests[0].eventId);
  assert.equal(pageview[1], META_PIXEL_ID);
  assert.equal(normal.sandbox.fbq.queue.filter((args: IArguments) => args[2] === 'Lead').length, 0);
  runInNewContext(confirmation, normal.sandbox);
  assert.equal(normal.sandbox.fbq.queue.filter((args: IArguments) => args[2] === 'Lead').length, 0);
  const leadId = randomUUID();
  normal.storage.set('ljma_meta_lead', leadId);
  runInNewContext(confirmation, normal.sandbox);
  runInNewContext(confirmation, normal.sandbox);
  const leads = normal.sandbox.fbq.queue.filter((args: IArguments) => args[2] === 'Lead');
  assert.equal(leads.length, 1);
  assert.equal(leads[0][4].eventID, leadId);
  const optedOut = makeBrowser(true);
  runInNewContext(pixel, optedOut.sandbox);
  optedOut.sandbox.ljmaMeta.lead(leadId);
  assert.equal(optedOut.requests.length, 0);
  assert.equal(optedOut.sandbox.fbq, undefined);
});
