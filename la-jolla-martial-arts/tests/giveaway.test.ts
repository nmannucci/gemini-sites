import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizePhone, splitName, validateGiveawayEntry } from '../src/lib/giveaway-api';
import { OUT_OF_AREA_MESSAGE } from '../src/data/giveaway';

const validInput = () => ({
  parentName: 'Maria de la Cruz', phone: '(858) 555-0123', email: ' Parent@Example.com ',
  childFirstName: 'Leo', childAge: '7', zip: '92037', benefits: ['Confidence', 'Focus'],
  benefitOther: '', twiceWeekly: 'Yes', smsConsent: true,
});

test('normalizePhone accepts US formats and rejects the rest', () => {
  for (const raw of ['8585550123', '+1 (858) 555-0123', '858.555.0123', '1-858-555-0123'])
    assert.equal(normalizePhone(raw), '+18585550123');
  assert.equal(normalizePhone('2858555012'), '+12858555012');
  assert.equal(normalizePhone('28585550123'), null);
  assert.equal(normalizePhone('555-0123'), null);
});

test('splitName separates the first word from the rest', () => {
  assert.deepEqual(splitName('  Maria  de la Cruz '), { firstName: 'Maria', lastName: 'de la Cruz' });
  assert.deepEqual(splitName('Cher'), { firstName: 'Cher', lastName: '' });
});

test('validateGiveawayEntry normalizes a complete eligible entry', () => {
  const result = validateGiveawayEntry(validInput());
  assert.ok('entry' in result);
  assert.equal(result.entry.email, 'parent@example.com');
  assert.equal(result.entry.phone, '+18585550123');
  assert.equal(result.entry.parentFirstName, 'Maria');
  assert.equal(result.entry.parentLastName, 'de la Cruz');
  assert.equal(result.entry.childAge, 7);
  assert.deepEqual(result.entry.benefits, ['Confidence', 'Focus']);
});

test('validateGiveawayEntry rejects ineligible or incomplete entries', () => {
  const errorsFor = (patch: object) => {
    const result = validateGiveawayEntry({ ...validInput(), ...patch });
    assert.ok('errors' in result, `expected errors for ${JSON.stringify(patch)}`);
    return result.errors;
  };
  assert.equal(errorsFor({ zip: '92101' }).zip, OUT_OF_AREA_MESSAGE);
  assert.ok(errorsFor({ zip: '9203' }).zip);
  assert.ok(errorsFor({ childAge: 2 }).childAge);
  assert.ok(errorsFor({ childAge: '13' }).childAge);
  assert.ok(errorsFor({ smsConsent: false }).smsConsent);
  assert.ok(errorsFor({ benefits: [] }).benefits);
  assert.ok(errorsFor({ benefits: ['Karate'] }).benefits);
  assert.ok(errorsFor({ twiceWeekly: 'Maybe' }).twiceWeekly);
  assert.ok(errorsFor({ email: 'no-at-sign' }).email);
  assert.ok(errorsFor({ phone: '555-0123' }).phone);
  assert.ok(errorsFor({ parentName: '   ' }).parentName);
  assert.ok(errorsFor({ childFirstName: 'x'.repeat(101) }).childFirstName);
  assert.ok('errors' in validateGiveawayEntry(null));
});

// ---- Worker: /api/giveaway-entry ----
import { createHarness } from './zumba-harness';
import { SMS_CONSENT_TEXT } from '../src/data/giveaway';

const settle = () => new Promise((resolve) => setTimeout(resolve, 150));
type Saved = { ok: boolean; entryId: string; updated: boolean };

test('saves an entry and forwards it to GHL once', async (t) => {
  const h = await createHarness(); t.after(() => h.mf.dispose());
  const res = await h.postGiveaway(validInput());
  assert.equal(res.status, 200, await res.clone().text());
  const saved = await res.json() as Saved;
  assert.match(saved.entryId, /^GA-[A-HJ-NP-Z2-9]{8}$/);
  assert.equal(saved.updated, false);
  await h.waitForGiveaway(saved.entryId); await settle();
  const row = await h.db.prepare('SELECT * FROM giveaway_entries WHERE id = ?').bind(saved.entryId).first();
  assert.equal(row.ghl_status, 'sent');
  assert.equal(row.sms_consent_text, SMS_CONSENT_TEXT);
  assert.deepEqual(JSON.parse(row.benefits as string), ['Confidence', 'Focus']);
  assert.equal(h.giveaways.length, 1);
  const body = h.giveaways[0].body;
  assert.equal(body.entry_update, 'no');
  assert.equal(body.phone, '+18585550123');
  assert.equal(body.first_name, 'Maria');
  assert.equal(body.last_name, 'de la Cruz');
  assert.equal(body.postal_code, '92037');
  assert.equal(body.child_first_name, 'Leo');
  assert.equal(body.giveaway_benefits, 'Confidence, Focus');
  assert.equal(body.giveaway_entry_id, saved.entryId);
  assert.equal(body.sms_consent, 'yes');
  assert.equal(body.sms_consent_text, SMS_CONSENT_TEXT);
  assert.equal(body.source, 'lajollatkd.com/giveaway');
});

test('double submit keeps one row and sends one receipt-triggering forward', async (t) => {
  const h = await createHarness(); t.after(() => h.mf.dispose());
  const [a, b] = await Promise.all([h.postGiveaway(validInput()), h.postGiveaway(validInput())]);
  const [sa, sb] = [await a.json() as Saved, await b.json() as Saved];
  assert.equal(a.status, 200); assert.equal(b.status, 200);
  assert.equal(sa.entryId, sb.entryId);
  await h.waitForGiveaway(sa.entryId); await settle();
  const count = await h.db.prepare('SELECT COUNT(*) AS n FROM giveaway_entries').first();
  assert.equal(count.n, 1);
  const flags = h.giveaways.map((g) => g.body.entry_update);
  assert.equal(flags[0], 'no');
  assert.equal(flags.filter((f) => f === 'no').length, 1);
});

test('same family by email replaces the child and is flagged as an update', async (t) => {
  const h = await createHarness(); t.after(() => h.mf.dispose());
  const first = await (await h.postGiveaway({ ...validInput(), email: 'parent@example.com' })).json() as Saved;
  await h.waitForGiveaway(first.entryId); await settle();
  const res = await h.postGiveaway({ ...validInput(), phone: '619-555-0199', email: ' Parent@Example.COM ', childFirstName: 'Sam' });
  const second = await res.json() as Saved;
  assert.equal(second.entryId, first.entryId);
  assert.equal(second.updated, true);
  await h.waitForGiveaway(first.entryId); await settle();
  const rows = await h.db.prepare('SELECT child_first_name, phone FROM giveaway_entries').all();
  assert.equal(rows.results.length, 1);
  assert.equal(rows.results[0].child_first_name, 'Sam');
  assert.equal(rows.results[0].phone, '+16195550199');
  assert.deepEqual(h.giveaways.map((g) => g.body.entry_update), ['no', 'yes']);
});

test('rejects out-of-area ZIPs and missing consent without saving', async (t) => {
  const h = await createHarness(); t.after(() => h.mf.dispose());
  const zip = await h.postGiveaway({ ...validInput(), zip: '92101' });
  assert.equal(zip.status, 400);
  assert.equal(((await zip.json()) as any).errors.zip, OUT_OF_AREA_MESSAGE);
  assert.equal((await h.postGiveaway({ ...validInput(), smsConsent: false })).status, 400);
  await settle();
  assert.equal((await h.db.prepare('SELECT COUNT(*) AS n FROM giveaway_entries').first()).n, 0);
  assert.equal(h.giveaways.length, 0);
});

test('honeypot submissions look successful but are dropped', async (t) => {
  const h = await createHarness(); t.after(() => h.mf.dispose());
  const res = await h.postGiveaway({ ...validInput(), website: 'http://spam.example' });
  assert.equal(res.status, 200);
  await settle();
  assert.equal((await h.db.prepare('SELECT COUNT(*) AS n FROM giveaway_entries').first()).n, 0);
  assert.equal(h.giveaways.length, 0);
});

test('rejects cross-origin posts', async (t) => {
  const h = await createHarness(); t.after(() => h.mf.dispose());
  assert.equal((await h.postGiveaway(validInput(), { origin: 'https://evil.example' })).status, 403);
});

test('limits one connection to 10 entries an hour', async (t) => {
  const h = await createHarness(); t.after(() => h.mf.dispose());
  const ip = { 'cf-connecting-ip': '203.0.113.9' };
  for (let i = 0; i < 10; i++) {
    const res = await h.postGiveaway({ ...validInput(), phone: `858555${String(1000 + i)}`, email: `p${i}@example.com` }, ip);
    assert.equal(res.status, 200, `entry ${i}`);
  }
  assert.equal((await h.postGiveaway({ ...validInput(), phone: '8585559999', email: 'p99@example.com' }, ip)).status, 429);
});

test('GHL outage: entry saved, retried by cron, delivered once', async (t) => {
  const h = await createHarness(); t.after(() => h.mf.dispose());
  h.setGiveawayFails(true);
  const saved = await (await h.postGiveaway(validInput())).json() as Saved;
  assert.equal(saved.ok, true);
  await h.waitForGiveaway(saved.entryId, 'pending'); await settle();
  let row = await h.db.prepare('SELECT ghl_status, ghl_attempts, ghl_error FROM giveaway_entries WHERE id = ?').bind(saved.entryId).first();
  assert.equal(row.ghl_status, 'pending'); assert.equal(row.ghl_attempts, 1); assert.ok(row.ghl_error);
  h.setGiveawayFails(false);
  await h.db.prepare("UPDATE giveaway_entries SET ghl_next_attempt_at = '2000-01-01T00:00:00.000Z'").run();
  await h.runScheduled();
  row = await h.db.prepare('SELECT ghl_status, ghl_error FROM giveaway_entries WHERE id = ?').bind(saved.entryId).first();
  assert.equal(row.ghl_status, 'sent'); assert.equal(row.ghl_error, null);
  await h.runScheduled();
  assert.equal(h.giveaways.length, 1);
  assert.equal(h.giveaways[0].body.entry_update, 'no');
});

test('Turnstile: enforced only when a secret is configured', async (t) => {
  const blocked = await createHarness(undefined, true, '', { turnstileSecret: 'test', turnstileOk: false });
  t.after(() => blocked.mf.dispose());
  assert.equal((await blocked.postGiveaway({ ...validInput(), turnstileToken: 'x' })).status, 403);
  const allowed = await createHarness(undefined, true, '', { turnstileSecret: 'test', turnstileOk: true });
  t.after(() => allowed.mf.dispose());
  assert.equal((await allowed.postGiveaway({ ...validInput(), turnstileToken: 'x' })).status, 200);
});

test('Meta Lead is sent for new entries only, keyed by the entry ID', async (t) => {
  const h = await createHarness(undefined, true, 'test-only'); t.after(() => h.mf.dispose());
  const saved = await (await h.postGiveaway(validInput())).json() as Saved;
  await h.waitForGiveaway(saved.entryId); await settle();
  const leads = () => h.metaEvents.flatMap((e) => e.data).filter((d: any) => d.event_name === 'Lead');
  assert.equal(leads().length, 1);
  assert.equal(leads()[0].event_id, saved.entryId);
  await h.postGiveaway({ ...validInput(), childFirstName: 'Sam' }); await settle();
  assert.equal(leads().length, 1);
});

test('existing /api/lead still works', async (t) => {
  const h = await createHarness(); t.after(() => h.mf.dispose());
  const res = await h.mf.dispatchFetch('http://localhost/api/lead', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ firstName: 'A', lastName: 'B', email: 'a@example.com', message: 'hi' }) });
  assert.equal(res.status, 200);
});
