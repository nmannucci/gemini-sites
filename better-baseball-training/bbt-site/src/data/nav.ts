// Primary menu, ported 1:1 from house36_bbt_primary_menu_fallback()
// + house36_bbt_lessons_menu_items() in functions.php.
import { homeSectionUrl, seoPageUrl, scheduleUrl, coachesUrl, lessonUrl } from './urls';

export interface NavChild {
  title: string;
  url: string;
}
export interface NavItem {
  title: string;
  url: string;
  children?: NavChild[];
}

const lessonsSubmenu: NavChild[] = [
  { title: 'Hitting', url: lessonUrl('hitting') },
  { title: 'Pitching', url: lessonUrl('pitching') },
  { title: 'Infield / Outfield', url: lessonUrl('infield-outfield') },
  { title: 'Catching', url: lessonUrl('catching') },
  { title: 'Baseball IQ', url: lessonUrl('baseball-iq') },
];

// The two service pillars. Grouped rather than sitting at top level — "Travel Baseball" is
// the longest label in the bar and cost more width than it earned. Both stay one click away
// and stay crawlable, since the submenu is real markup, not JS-injected.
const programsSubmenu: NavChild[] = [
  { title: 'Baseball Academy', url: seoPageUrl('baseball-academy') },
  { title: 'Travel Baseball', url: seoPageUrl('travel-baseball') },
];

// The two location pages are the site's local-SEO hubs — the nav is the strongest internal
// linking surface, so they point at the real pages rather than a homepage anchor.
const locationsSubmenu: NavChild[] = [
  { title: 'Rocklin', url: seoPageUrl('baseball-lessons-rocklin') },
  { title: 'El Dorado Hills', url: seoPageUrl('baseball-lessons-el-dorado-hills') },
  { title: 'Rocklin Batting Cages', url: seoPageUrl('batting-cages-rocklin') },
];

// Five items. "Home" is dropped — the logo already links home with rel="home". "Book Now" is
// dropped too: it is rendered separately as the CTA button in Nav.astro's .nav-actions, so
// having it here as well was a duplicate link to the same URL in the same bar.
export const primaryMenu: NavItem[] = [
  { title: 'Lessons', url: homeSectionUrl('lessons'), children: lessonsSubmenu },
  { title: 'Programs', url: seoPageUrl('baseball-academy'), children: programsSubmenu },
  { title: 'Locations', url: seoPageUrl('baseball-lessons-rocklin'), children: locationsSubmenu },
  { title: 'Schedule', url: scheduleUrl() },
  { title: 'Coaches', url: coachesUrl() },
];
