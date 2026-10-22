// Owner-supplied text. Keep this version immutable once signed records exist.
export const WAIVER_VERSION = '2026-10-20';
export const WAIVER_TITLE = 'LAVEL FITNESS PARTICIPANT WAIVER & RELEASE OF LIABILITY';
export const WAIVER_PARAGRAPHS = [
  'Please read before signing. By signing below, I agree to the following.',
  'ASSUMPTION OF RISK: I am voluntarily taking part in a Zumba / group fitness class led by Lavel Bryant (LAVEL Fitness). I understand that exercise involves risks, including strains, sprains, falls, heart problems and, in rare cases, serious injury or death, and I voluntarily assume all of these risks.',
  "HEALTH: I am physically able to participate and know of no medical condition that keeps me from exercising safely, or I have my doctor's approval. I will exercise at my own pace and stop if I feel pain, dizziness or shortness of breath.",
  'RELEASE: To the fullest extent allowed by law, I release, waive and agree not to sue Lavel Bryant, LAVEL Fitness, La Jolla Martial Arts, and their owners, instructors, staff and agents (the "Released Parties") for any injury, illness, loss or damage arising from my participation or my use of the facility, INCLUDING CLAIMS CAUSED BY THE NEGLIGENCE OF THE RELEASED PARTIES. This release binds me, my heirs and my estate.',
  'MEDICAL: In an emergency, I authorize first aid and emergency medical treatment at my own expense.',
  'OTHER: The Released Parties are not responsible for lost or stolen belongings. Photos or video taken in class may be used by LAVEL Fitness for promotion (check the box above if you prefer not to be shown). LAVEL Fitness may contact me by text or email about classes; I can opt out anytime. If any part of this waiver is found invalid, the rest stays in effect.',
  'I HAVE READ THIS WAIVER, UNDERSTAND IT, AND SIGN IT VOLUNTARILY. Under 18: a parent or guardian must sign for the participant and print their own name.',
] as const;
export const WAIVER_TEXT = [WAIVER_TITLE, ...WAIVER_PARAGRAPHS].join('\n');

export function pacificDate(now = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now);
  const value = (type: string) => parts.find((p) => p.type === type)!.value;
  return `${value('year')}-${value('month')}-${value('day')}`;
}

export function participantAge(dob: string, today: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return null;
  const parsed = new Date(`${dob}T12:00:00Z`);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== dob || dob > today) return null;
  const [year, month, day] = dob.split('-').map(Number);
  const [currentYear, currentMonth, currentDay] = today.split('-').map(Number);
  const age = currentYear - year - (currentMonth < month || (currentMonth === month && currentDay < day) ? 1 : 0);
  return age > 120 ? null : age;
}

export type Signature = Array<Array<[number, number]>>;
export interface WaiverFields {
  fullName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  emergencyName: string;
  emergencyPhone: string;
  militaryVeteran: 'Yes' | 'No';
  photoOptOut: boolean;
  agreed: true;
  signature: Signature;
  signatureAspectRatio: number;
  guardianName: string;
  guardianSignature: Signature | null;
  guardianSignatureAspectRatio: number | null;
  waiverVersion: string;
}
export interface SignedWaiver extends WaiverFields {
  id: string;
  signedAt: string;
  signingDate: string;
  waiverText: string;
}

export function validSignature(value: unknown): value is Signature {
  if (!Array.isArray(value) || !value.length || value.length > 200) return false;
  let points = 0;
  let length = 0;
  for (const stroke of value) {
    if (!Array.isArray(stroke) || stroke.length < 2 || stroke.length > 6000) return false;
    points += stroke.length;
    if (points > 12000) return false;
    for (let i = 0; i < stroke.length; i++) {
      const point = stroke[i];
      if (!Array.isArray(point) || point.length !== 2 || point.some((v) => typeof v !== 'number' || !Number.isFinite(v) || v < 0 || v > 1)) return false;
      if (i) length += Math.hypot(point[0] - stroke[i - 1][0], point[1] - stroke[i - 1][1]);
    }
  }
  return length >= 0.08;
}

export function validateWaiver(value: unknown, today = pacificDate()): { fields: WaiverFields; requestId: string } | { error: string } {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { error: 'Invalid form data.' };
  const p = value as Record<string, unknown>;
  const text = (key: string) => typeof p[key] === 'string' ? (p[key] as string).trim() : '';
  const fullName = text('fullName'), phone = text('phone'), email = text('email');
  const dateOfBirth = text('dateOfBirth'), emergencyName = text('emergencyName'), emergencyPhone = text('emergencyPhone');
  if (!fullName || !phone || !email || !dateOfBirth || !emergencyName || !emergencyPhone) return { error: 'Please complete all required fields.' };
  if ([fullName, emergencyName].some((s) => s.length > 150 || /[\x00-\x1f]/.test(s)) || email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Please check your name and email.' };
  if ([phone, emergencyPhone].some((s) => s.length > 40 || !/^[+()\d\s.\-]+$/.test(s) || s.replace(/\D/g, '').length < 10)) return { error: 'Please enter valid phone numbers.' };
  const age = participantAge(dateOfBirth, today);
  if (age === null) return { error: 'Please enter a valid date of birth.' };
  if (age < 16) return { error: 'Your waiver has not been submitted. Participants must be 16 or older to join the Zumba classes.' };
  if (p.militaryVeteran !== 'Yes' && p.militaryVeteran !== 'No') return { error: 'Please select Yes or No for military/veteran status.' };
  if (typeof p.photoOptOut !== 'boolean' || p.agreed !== true) return { error: 'Please read and agree to the waiver.' };
  if (p.waiverVersion !== WAIVER_VERSION) return { error: 'The waiver has changed. Please reload and review it before signing.' };
  if (!validSignature(p.signature)) return { error: 'Please draw your signature in the signature box.' };
  const ratioValid = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v) && v >= 1 && v <= 8;
  if (!ratioValid(p.signatureAspectRatio)) return { error: 'Please reload and sign again.' };
  const guardianName = text('guardianName');
  if (age < 18 && (!guardianName || guardianName.length > 150 || /[\x00-\x1f]/.test(guardianName) || !validSignature(p.guardianSignature) || !ratioValid(p.guardianSignatureAspectRatio))) return { error: 'A parent or guardian must print their name and sign for participants under 18.' };
  const requestId = text('requestId');
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId)) return { error: 'Please reload the form and try again.' };
  return { requestId, fields: { fullName, phone, email, dateOfBirth, emergencyName, emergencyPhone, militaryVeteran: p.militaryVeteran, photoOptOut: p.photoOptOut, agreed: true, signature: p.signature, signatureAspectRatio: p.signatureAspectRatio, guardianName: age < 18 ? guardianName : '', guardianSignature: age < 18 ? p.guardianSignature as Signature : null, guardianSignatureAspectRatio: age < 18 ? p.guardianSignatureAspectRatio as number : null, waiverVersion: WAIVER_VERSION } };
}
