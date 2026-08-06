// Root-relative URL helpers ported from functions.php.
// PHP produced trailing-slash paths (e.g. /lessons/hitting/); normalized here
// to NO trailing slash because the Astro site uses trailingSlash: 'never'.
import { lessons } from './lessons';
import { seoPages } from './seoPages';

const LESSONS_BASE_SLUG = 'lessons'; // house36_bbt_lessons_base_slug()
const BOOKING_SLUG = 'book-now'; // house36_bbt_booking_slug()
const PRIVACY_POLICY_SLUG = 'privacy-policy'; // house36_bbt_privacy_policy_slug()

const lessonSlugs = new Set(lessons.map((l) => l.slug));
const seoPageSlugs = new Set(seoPages.map((p) => p.slug));

// house36_bbt_lesson_url($slug): /lessons/<slug>/ -> /lessons/<slug>
// Returns home ('/') if the slug is not a known lesson.
export function lessonUrl(slug: string): string {
  if (!lessonSlugs.has(slug)) {
    return '/';
  }
  return `/${LESSONS_BASE_SLUG}/${slug}`;
}

// house36_bbt_seo_page_url($slug): /<slug>/ -> /<slug>
// Returns home ('/') if the slug is not a known SEO page.
export function seoPageUrl(slug: string): string {
  if (!seoPageSlugs.has(slug)) {
    return '/';
  }
  return `/${slug}`;
}

// Service-area pages nest under their core location hub:
//   /baseball-lessons-rocklin/hitting
// The hub slug comes from locationHubSlug() so the two never drift apart.
const LOCATION_HUB_SLUGS: Record<string, string> = {
  rocklin: 'baseball-lessons-rocklin',
  'el-dorado-hills': 'baseball-lessons-el-dorado-hills',
};

export function locationHubSlug(locationKey: string): string | undefined {
  return LOCATION_HUB_SLUGS[locationKey];
}

export function locationHubUrl(locationKey: string): string {
  const slug = LOCATION_HUB_SLUGS[locationKey];
  return slug ? `/${slug}` : '/';
}

export function serviceAreaUrl(locationKey: string, serviceSlug: string): string {
  const slug = LOCATION_HUB_SLUGS[locationKey];
  return slug ? `/${slug}/${serviceSlug}` : '/';
}

// house36_bbt_booking_url(): /book-now/ -> /book-now
export function bookingUrl(): string {
  return `/${BOOKING_SLUG}`;
}

// house36_bbt_schedule_url(): /schedule/ -> /schedule
export function scheduleUrl(): string {
  return '/schedule';
}

// house36_bbt_coaches_url(): /coaches/ -> /coaches
export function coachesUrl(): string {
  return '/coaches';
}

// house36_bbt_privacy_policy_url(): /privacy-policy/ -> /privacy-policy
export function privacyPolicyUrl(): string {
  return `/${PRIVACY_POLICY_SLUG}`;
}

// house36_bbt_home_section_url($section): home_url('/#section') or home_url('/')
// Leading '#' is stripped from the section, matching ltrim($section, '#').
export function homeSectionUrl(section = ''): string {
  const cleaned = String(section).replace(/^#+/, '');
  return cleaned ? `/#${cleaned}` : '/';
}

// house36_bbt_lesson_related_coach_keys($slug): lesson slug -> coach keys.
export const lessonRelatedCoachKeys: Record<string, string[]> = {
  hitting: ['jon-peters', 'kris-krise', 'cesar-tamayo', 'trey-furrey'],
  pitching: ['jean-machi', 'gabe-emmett', 'jon-peters', 'bruce-carmichael'],
  'infield-outfield': ['cesar-tamayo', 'trey-furrey', 'logan-coe', 'bryce-petrilla'],
  catching: ['jon-peters', 'bruce-carmichael', 'quintan-hall', 'logan-coe'],
  'baseball-iq': ['jon-peters', 'trey-furrey', 'justin-watari', 'kris-krise'],
};

export function lessonRelatedCoachKeysFor(slug: string): string[] {
  return lessonRelatedCoachKeys[slug] ?? [];
}
