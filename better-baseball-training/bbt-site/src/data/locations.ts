import { seoPageUrl } from './urls';

export interface Location {
  key: string;
  name: string;
  full_name: string;
  address_line: string;
  city_state_zip: string;
  location_url: string;
  summary: string;
}

export const locations: Location[] = [
  {
    key: 'rocklin',
    name: 'Rocklin',
    full_name: 'Better Baseball Training - Rocklin',
    address_line: '4283 Duluth Ave',
    city_state_zip: 'Rocklin, CA 95765',
    location_url: seoPageUrl('baseball-lessons-rocklin'),
    summary:
      'Rocklin serves families looking for private lessons, academy training, and travel baseball development in Placer County.',
  },
  {
    key: 'el-dorado-hills',
    name: 'El Dorado Hills',
    full_name: 'Better Baseball Training - El Dorado Hills',
    address_line: '4990 Hillsdale Dr, Suite 400',
    city_state_zip: 'El Dorado Hills, CA 95762',
    location_url: seoPageUrl('baseball-lessons-el-dorado-hills'),
    summary:
      'El Dorado Hills offers indoor baseball lessons, academy classes, and player development for families across EDH, Folsom, and surrounding communities.',
  },
];
