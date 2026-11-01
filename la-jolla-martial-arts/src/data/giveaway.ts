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
  entryOpen: 'To be announced',
  entryClose: 'To be announced',
  drawing: 'To be announced',
  announcement: 'To be announced',
  announcementIso: null,
};
