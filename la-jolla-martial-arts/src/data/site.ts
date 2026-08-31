/**
 * Single NAP source for visible copy, footer, and LocalBusiness JSON-LD.
 *
 * Door hours are a superset of published class times on /schedule so no listed
 * class sits outside posted hours:
 * - Mon–Thu Little Ninjas starts 3:30pm (schedule page); BUSINESS_INFO door
 *   window is 3:00pm–6:30pm (Teen & Adult ends 6:15pm).
 * - Friday Zumba 10:30am–11:15am (Aug 25 client update; Friday is not closed).
 * - Saturday combo class 9:00am–9:45am, then Zumba 10:30am–11:15am;
 *   BUSINESS_INFO Saturday close is 1:00pm.
 * Class grids on /schedule stay as class times, not a second hours list.
 */
export const SITE_URL = 'https://lajollatkd.com';

export const site = {
  brand: 'La Jolla Martial Arts',
  legalName: 'La Jolla Martial Arts LLC',
  streetAddress: '7680 Girard Ave, Basement',
  addressLocality: 'La Jolla',
  addressRegion: 'CA',
  postalCode: '92037',
  addressCountry: 'US',
  address: '7680 Girard Ave, Basement, La Jolla, CA 92037',
  phoneDisplay: '(858) 361-0961',
  phoneTel: '8583610961',
  telephone: '+1-858-361-0961',
  email: 'LJBULLYPROOF@GMAIL.COM',
  hoursOneLine:
    'Mon–Thu: 3:00pm–6:30pm · Fri: 10:30am–11:15am · Sat: 9:00am–1:00pm · Sun: Closed',
} as const;

export const openingHoursSpecification = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    opens: '15:00',
    closes: '18:30',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: 'Friday',
    opens: '10:30',
    closes: '11:15',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: 'Saturday',
    opens: '09:00',
    closes: '13:00',
  },
] as const;

export const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'MartialArtsSchool',
  '@id': `${SITE_URL}/#business`,
  name: site.brand,
  legalName: site.legalName,
  description:
    'La Jolla Martial Arts offers world-class Taekwondo training for all ages. Build discipline, confidence, and self-defense skills at our family-owned dojo with 40+ years of teaching experience.',
  url: `${SITE_URL}/`,
  telephone: site.telephone,
  image: `${SITE_URL}/assets/EMA%20-%20Post.jpg`,
  logo: `${SITE_URL}/assets/LJ-martial-arts-logo.PNG`,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.streetAddress,
    addressLocality: site.addressLocality,
    addressRegion: site.addressRegion,
    postalCode: site.postalCode,
    addressCountry: site.addressCountry,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 32.8442,
    longitude: -117.274,
  },
  areaServed: [
    { '@type': 'City', name: 'La Jolla' },
    { '@type': 'City', name: 'San Diego' },
  ],
  founder: { '@type': 'Person', name: 'Master Sam' },
  openingHoursSpecification,
};
