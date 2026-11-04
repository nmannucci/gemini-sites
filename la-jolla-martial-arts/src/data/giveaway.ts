// Campaign settings shared by the giveaway page, the rules page and the Worker.
// Change dates here once they are chosen; every page and the confirmation card read them.

export const ELIGIBLE_ZIPS = ['92037', '92117', '92109', '92122'] as const;
export const AGE_MIN = 3;
export const AGE_MAX = 12;

export const BENEFITS = ['Confidence', 'Self-defense', 'Focus', 'Discipline', 'Something else'] as const;
export const TWICE_WEEKLY = ['Yes', 'Not sure', 'No'] as const;

export const SMS_CONSENT_TEXT =
  'I agree to receive text messages from La Jolla Martial Arts about this giveaway, including my entry confirmation, announcement reminders and offers. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help.';

export const FULL_NAME_MESSAGE = 'Please enter your first and last name.';

export const OUT_OF_AREA_MESSAGE = 'This giveaway is open to families in 92037, 92117, 92109 and 92122.';

// Display strings in Pacific Time. announcementIso feeds the confirmation card's <time datetime>.
export const GIVEAWAY_DATES: {
  entryOpen: string;
  entryClose: string;
  drawing: string;
  announcement: string;
  announcementIso: string | null;
} = {
  entryOpen: 'Thursday, November 5, 2026 at 12:00 a.m.',
  entryClose: 'Thursday, November 12, 2026 at 11:59 p.m.',
  drawing: 'Friday, November 13, 2026',
  announcement: 'Friday, November 13, 2026',
  announcementIso: '2026-11-13',
};
