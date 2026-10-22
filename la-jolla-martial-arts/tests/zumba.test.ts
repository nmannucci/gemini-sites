import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import { createHarness } from './zumba-harness';
import { WAIVER_VERSION, WAIVER_TEXT, participantAge, validateWaiver } from '../src/data/zumba-waiver';

const signature = [[[.1, .6], [.2, .2], [.3, .7], [.4, .3], [.5, .6], [.8, .4]]];
const payload = () => ({ requestId: randomUUID(), fullName: 'Alex Example', phone: '619-555-0123', email: 'alex@example.com', dateOfBirth: '1990-05-06', emergencyName: 'Jordan Example', emergencyPhone: '619-555-0456', militaryVeteran: 'Yes', photoOptOut: true, agreed: true, signature, signatureAspectRatio: 2, guardianName: '', guardianSignature: null, guardianSignatureAspectRatio: null, waiverVersion: WAIVER_VERSION });

test('age, calendar and signature validation', () => {
  assert.equal(participantAge('2008-10-20', '2026-10-20'), 18);
  assert.equal(participantAge('2008-10-21', '2026-10-20'), 17);
  assert.equal(participantAge('2010-10-20', '2026-10-20'), 16);
  assert.equal(participantAge('2026-02-30', '2026-10-20'), null);
  assert.ok('error' in validateWaiver({ ...payload(), signature: [] }));
  assert.ok('error' in validateWaiver({ ...payload(), signature: [[[.5, .5], [.5, .5]]] }));
  assert.ok('error' in validateWaiver({ ...payload(), signature: [[[0, 0], [2, 2]]] }));
  assert.ok('error' in validateWaiver({ ...payload(), dateOfBirth: '2012-01-01' }));
});

test('Worker stores signed records, hands private PDF links to GHL, prevents duplicates and retries failures', async (t) => {
  const h = await createHarness(); t.after(() => h.mf.dispose());
  const adult = payload();
  const res = await h.post(adult); assert.equal(res.status, 200, await res.clone().text());
  const receipt = await res.clone().json() as { confirmationUrl: string };
  await h.waitForDelivery(adult.requestId);
  const row = await h.db.prepare('SELECT * FROM zumba_waivers WHERE id = ?').bind(adult.requestId).first();
  assert.equal(row.email_status, 'sent');
  const saved = JSON.parse(row.record_json as string);
  assert.equal(saved.waiverText, WAIVER_TEXT); assert.equal(saved.photoOptOut, true); assert.deepEqual(saved.signature, signature);
  const confirmation = await h.mf.dispatchFetch('http://localhost' + receipt.confirmationUrl);
  assert.equal(confirmation.status, 200);
  assert.equal(confirmation.headers.get('cache-control'), 'private, no-store');
  const confirmationHtml = await confirmation.text();
  assert.ok(confirmationHtml.includes('Your waiver has been submitted.'));
  assert.ok(!confirmationHtml.includes(adult.requestId));
  assert.ok(!confirmationHtml.includes(adult.dateOfBirth));
  assert.equal((await h.mf.dispatchFetch('http://localhost/zumba/waiver/confirmation')).status, 404);
  const falseReceipt = new URL('http://localhost' + receipt.confirmationUrl); falseReceipt.searchParams.set('token', '0'.repeat(64));
  assert.equal((await h.mf.dispatchFetch(falseReceipt)).status, 404);
  assert.equal(h.emails.length, 1);
  const handoff = h.emails[0].body;
  assert.equal(handoff.event, 'waiver_signed'); assert.equal(handoff.full_name, adult.fullName);
  assert.equal(handoff.signing_date, saved.signingDate);
  const copy = await h.mf.dispatchFetch(handoff.signed_pdf_url);
  assert.equal(copy.status, 200); assert.equal(copy.headers.get('cache-control'), 'private, no-store');
  const pdf = Buffer.from(await copy.arrayBuffer());
  assert.deepEqual(await (await h.mf.dispatchFetch(handoff.record_url)).json(), saved);
  assert.equal((await h.mf.dispatchFetch(handoff.signed_pdf_url.split('?')[0])).status, 404);
  const tampered = new URL(handoff.signed_pdf_url); tampered.searchParams.set('token', '0'.repeat(64));
  assert.equal((await h.mf.dispatchFetch(tampered)).status, 404);
  const wrongRecord = handoff.signed_pdf_url.replace(adult.requestId, randomUUID());
  assert.equal((await h.mf.dispatchFetch(wrongRecord)).status, 404);
  assert.equal((await h.mf.dispatchFetch(handoff.signed_pdf_url, {method:'DELETE'})).status, 405);
  assert.ok(!(await res.clone().text()).includes('/api/zumba-waiver/copy/'));
  const receiptTokenAsCopy = new URL(handoff.signed_pdf_url);
  receiptTokenAsCopy.searchParams.set('token', new URL('http://localhost' + receipt.confirmationUrl).searchParams.get('token')!);
  assert.equal((await h.mf.dispatchFetch(receiptTokenAsCopy)).status, 404);
  assert.equal(pdf.subarray(0, 4).toString(), '%PDF');
  await writeFile('output/playwright/sample-signed-waiver.pdf', pdf);
  const retry = await h.post(adult); assert.equal(retry.status, 200); assert.equal(h.emails.length, 1);
  const changed = await h.post({ ...adult, fullName: 'Different person' }); assert.equal(changed.status, 409);
  const minor = { ...payload(), dateOfBirth: '2009-01-01' };
  assert.equal((await h.post(minor)).status, 400);
  assert.equal((await h.post({ ...minor, guardianName: 'Pat Example', guardianSignature: signature, guardianSignatureAspectRatio: 2 })).status, 200);
  await h.waitForDelivery(minor.requestId);
  await writeFile('output/playwright/sample-guardian-waiver.pdf', Buffer.from(await (await h.mf.dispatchFetch(h.emails[1].body.signed_pdf_url)).arrayBuffer()));
  assert.equal((await h.post({ ...payload(), agreed: false })).status, 400);
  assert.equal((await h.post({ ...payload(), waiverVersion: 'old' })).status, 400);
  assert.equal((await h.post(payload(), { headers: { 'content-type': 'application/json', origin: 'https://other.test' } })).status, 403);
  assert.equal((await h.post(payload(), { body: 'invalid json' })).status, 400);
  assert.equal((await h.post(payload(), { body: 'x'.repeat(250001) })).status, 413);
  assert.equal((await h.mf.dispatchFetch('http://localhost/api/zumba-waiver')).status, 405);
  h.setEmailFails(true); const pending = payload(); assert.equal((await h.post(pending)).status, 200);
  await h.waitForDelivery(pending.requestId, 'pending');
  const queued = await h.db.prepare('SELECT email_status, email_attempts FROM zumba_waivers WHERE id = ?').bind(pending.requestId).first();
  assert.equal(queued.email_status, 'pending'); assert.equal(queued.email_attempts, 1);
  await h.db.prepare("UPDATE zumba_waivers SET next_attempt_at = '2000-01-01' WHERE id = ?").bind(pending.requestId).run();
  h.setEmailFails(false);
  const worker = await h.mf.getWorker(); await worker.scheduled();
  const delivered = await h.db.prepare('SELECT email_status, email_attempts FROM zumba_waivers WHERE id = ?').bind(pending.requestId).first();
  assert.equal(delivered.email_status, 'sent'); assert.equal(delivered.email_attempts, 2);
  assert.equal(h.emails.at(-1)!.key, h.emails.at(-2)!.key);
  assert.equal(h.emails.at(-1)!.body.signed_pdf_url, h.emails.at(-2)!.body.signed_pdf_url);
  const lead = await h.mf.dispatchFetch('http://localhost/api/lead', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ firstName: 'Alex', lastName: 'Example', phone: '6195550123', email: 'alex@example.com', program: 'zumba', source: 'zumba-page', interest: 'Free First Week', classDate: 'Mon, Nov 2, 2026 · 9:00 AM', saturdayInterest: 'Yes', message: 'Interested in Saturday: Yes' }) });
  assert.equal(lead.status, 200);
  // Reading the next request flushes the previous request's waitUntil webhook.
  await new Promise((resolve) => setTimeout(resolve, 100));
  assert.equal(h.leads[0].saturday_interest, 'Yes');
  assert.equal(h.leads[0].waiver_url, undefined);
  const signup = await h.db.prepare('SELECT signup_for, class_date, saturday_interest FROM leads ORDER BY id DESC LIMIT 1').first();
  assert.equal(signup.signup_for, 'Free First Week');
  assert.equal(signup.class_date, 'Mon, Nov 2, 2026 · 9:00 AM');
  assert.equal(signup.saturday_interest, 'Yes');
  const tooYoung = { ...payload(), dateOfBirth: '2012-01-01' };
  const rejected = await h.post(tooYoung); assert.equal(rejected.status, 400);
  assert.match((await rejected.json() as {error:string}).error, /has not been submitted.*16 or older/);
  assert.equal(await h.db.prepare('SELECT id FROM zumba_waivers WHERE id = ?').bind(tooYoung.requestId).first(), null);
});

test('a database-backed confirmation is available while GHL delivery is still waiting', {timeout: 5000}, async (t) => {
  const h = await createHarness(); t.after(() => h.mf.dispose());
  h.holdEmail();
  try {
    const adult = payload();
    const res = await h.post(adult);
    const receipt = await res.json() as {confirmationUrl:string};
    assert.equal(res.status, 200);
    assert.equal((await h.mf.dispatchFetch('http://localhost' + receipt.confirmationUrl)).status, 200);
    const saved = await h.db.prepare('SELECT email_status FROM zumba_waivers WHERE id = ?').bind(adult.requestId).first();
    assert.equal(saved.email_status, 'pending');
    h.resumeEmail(); await h.waitForDelivery(adult.requestId);
  } finally { h.resumeEmail(); }
});


test('unconfigured email delivery cannot silently accept a waiver', async (t) => {
  const h = await createHarness(undefined, false); t.after(() => h.mf.dispose());
  const res = await h.post(payload()); assert.equal(res.status, 503);
  const count = await h.db.prepare('SELECT COUNT(*) AS count FROM zumba_waivers').first();
  assert.equal(count.count, 0); assert.equal(h.emails.length, 0);
});

test('long participant and guardian details remain printable', async () => {
  const { createWaiverPdf } = await import('../src/lib/waiver-pdf');
  const { PDFDocument } = await import('pdf-lib');
  const pdf = await createWaiverPdf({ ...payload(), id: randomUUID(), fullName: 'W'.repeat(150), emergencyName: 'W'.repeat(150), email: 'W'.repeat(185) + '@example.com', militaryVeteran: 'Yes', agreed: true, dateOfBirth: '2009-01-01', guardianName: 'W'.repeat(150), guardianSignature: signature, guardianSignatureAspectRatio: 2, signedAt: '2026-10-21T04:00:00Z', signingDate: '2026-10-20', waiverText: WAIVER_TEXT });
  assert.ok((await PDFDocument.load(pdf)).getPageCount() >= 2);
  await writeFile('output/playwright/sample-long-waiver.pdf', pdf);
});
