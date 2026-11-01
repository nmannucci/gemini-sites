import { AGE_MAX, AGE_MIN, BENEFITS, ELIGIBLE_ZIPS, OUT_OF_AREA_MESSAGE, TWICE_WEEKLY } from '../data/giveaway';
import type { MetaContext } from './meta-conversions';

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
