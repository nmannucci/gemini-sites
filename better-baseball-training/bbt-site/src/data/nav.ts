// Primary menu, ported 1:1 from house36_bbt_primary_menu_fallback()
// + house36_bbt_lessons_menu_items() in functions.php.
import { homeSectionUrl, seoPageUrl, scheduleUrl, coachesUrl, bookingUrl, lessonUrl } from './urls';

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

export const primaryMenu: NavItem[] = [
  { title: 'Home', url: homeSectionUrl('hero') },
  { title: 'Lessons', url: homeSectionUrl('lessons'), children: lessonsSubmenu },
  { title: 'Academy', url: seoPageUrl('baseball-academy') },
  { title: 'Travel Baseball', url: seoPageUrl('travel-baseball') },
  { title: 'Schedule', url: scheduleUrl() },
  { title: 'Coaches', url: coachesUrl() },
  { title: 'Facilities', url: homeSectionUrl('facilities') },
  { title: 'Book Now', url: bookingUrl() },
];
