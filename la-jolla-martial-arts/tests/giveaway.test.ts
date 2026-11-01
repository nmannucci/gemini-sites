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
