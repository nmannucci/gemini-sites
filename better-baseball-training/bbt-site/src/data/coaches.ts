export interface CoachAlumni {
  '@type': string;
  name: string;
  url?: string;
}

export interface Coach {
  key: string;
  anchor: string;
  name: string;
  job_title: string;
  description: string;
  locations: string[];
  specialties: string[];
  image: string;
  alumniOf: CoachAlumni[];
}

export const coaches: Coach[] = [
  {
    key: 'jon-peters',
    anchor: 'jon-peters',
    name: 'Jon Peters',
    job_title: 'Owner / Player Development',
    description:
      'Oversees player development programming across both BBT facilities, with experience in youth, collegiate, and summer-ball coaching.',
    locations: ['Rocklin', 'El Dorado Hills'],
    specialties: ['Player development', 'Hitting', 'Pitching', 'Academy programming'],
    image: '/assets/images/coach-jon-peters.jpg',
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Chico State',
        url: 'https://en.wikipedia.org/wiki/California_State_University,_Chico',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Folsom Lake College',
        url: 'https://en.wikipedia.org/wiki/Folsom_Lake_College',
      },
    ],
  },
  {
    key: 'cesar-tamayo',
    anchor: 'cesar-tamayo',
    name: 'Cesar Tamayo',
    job_title: 'Rocklin GM',
    description:
      'Leads Rocklin programming and supports player development with collegiate experience and a kinesiology background.',
    locations: ['Rocklin'],
    specialties: ['Player development', 'Academy programming', 'Travel baseball'],
    image: '/assets/images/cesar-tamayo.jpeg',
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Jessup University',
        url: 'https://en.wikipedia.org/wiki/Jessup_University',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Marymount University',
        url: 'https://en.wikipedia.org/wiki/Marymount_University',
      },
    ],
  },
  {
    key: 'trey-furrey',
    anchor: 'trey-furrey',
    name: 'Trey Furrey',
    job_title: 'El Dorado Hills GM',
    description:
      'Leads BBT programming in El Dorado Hills and brings All-America playing experience to academy and team development.',
    locations: ['El Dorado Hills'],
    specialties: ['Player development', 'Academy programming', 'Travel baseball'],
    image: '/assets/images/trey-furrey.jpeg',
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Jessup University',
        url: 'https://en.wikipedia.org/wiki/Jessup_University',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Oklahoma Baptist University',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Folsom Lake College',
      },
    ],
  },
  {
    key: 'bruce-carmichael',
    anchor: 'bruce-carmichael',
    name: 'Bruce Carmichael',
    job_title: '13U Gray Head Coach',
    description:
      'Former Chicago Cubs draft pick and longtime coach with experience across college and high school baseball.',
    locations: ['Rocklin', 'El Dorado Hills'],
    specialties: ['Player development', 'Travel baseball', 'Defense'],
    image: '/assets/images/bruce-carmichael.PNG',
    alumniOf: [
      {
        '@type': 'SportsOrganization',
        name: 'Chicago Cubs',
        url: 'https://en.wikipedia.org/wiki/Chicago_Cubs',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Santa Clara University',
        url: 'https://en.wikipedia.org/wiki/Santa_Clara_University',
      },
    ],
  },
  {
    key: 'jean-machi',
    anchor: 'jean-machi',
    name: 'Jean Machi',
    job_title: 'Pitching Coach',
    description:
      'Former MLB pitcher and 2014 World Series Champion offering pitching lessons in El Dorado Hills.',
    locations: ['El Dorado Hills'],
    specialties: ['Pitching', 'Private lessons', 'Professional experience'],
    image: '/assets/images/jean-machi.jpeg',
    alumniOf: [
      {
        '@type': 'SportsOrganization',
        name: 'San Francisco Giants',
        url: 'https://en.wikipedia.org/wiki/San_Francisco_Giants',
      },
    ],
  },
  {
    key: 'gabe-emmett',
    anchor: 'gabe-emmett',
    name: 'Gabe Emmett',
    job_title: 'Pitching Coach',
    description:
      'Former Dodgers draft pick providing pitching instruction with recent professional development experience.',
    locations: ['Rocklin', 'El Dorado Hills'],
    specialties: ['Pitching', 'Velocity development', 'Private lessons'],
    image: '/assets/images/gabe-emmett.jpeg',
    alumniOf: [
      {
        '@type': 'SportsOrganization',
        name: 'Los Angeles Dodgers',
        url: 'https://en.wikipedia.org/wiki/Los_Angeles_Dodgers',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Folsom Lake College',
        url: 'https://en.wikipedia.org/wiki/Folsom_Lake_College',
      },
    ],
  },
  {
    key: 'kris-krise',
    anchor: 'kris-krise',
    name: 'Kris Krise',
    job_title: '12U Black Head Coach',
    description:
      'Former Dodgers draft pick with collegiate experience at UC Irvine, COC, and Chico State.',
    locations: ['Rocklin', 'El Dorado Hills'],
    specialties: ['Player development', 'Travel baseball', 'Hitting'],
    image: '/assets/images/kris-krise.jpeg',
    alumniOf: [
      {
        '@type': 'SportsOrganization',
        name: 'Los Angeles Dodgers',
        url: 'https://en.wikipedia.org/wiki/Los_Angeles_Dodgers',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Chico State',
        url: 'https://en.wikipedia.org/wiki/California_State_University,_Chico',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'UC Irvine',
        url: 'https://en.wikipedia.org/wiki/University_of_California,_Irvine',
      },
    ],
  },
  {
    key: 'logan-coe',
    anchor: 'logan-coe',
    name: 'Logan Coe',
    job_title: 'Coach',
    description: 'College alumnus focused on energetic instruction and player development.',
    locations: ['Rocklin', 'El Dorado Hills'],
    specialties: ['Player development', 'Defense', 'Academy classes'],
    image: '/assets/images/logan-coe.PNG',
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Jessup University',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Oklahoma Baptist University',
      },
    ],
  },
  {
    key: 'nolan-theibay',
    anchor: 'nolan-theibay',
    name: 'Nolan Theibay',
    job_title: 'Coach',
    description: 'Jessup University alumnus supporting player development at BBT.',
    locations: ['Rocklin', 'El Dorado Hills'],
    specialties: ['Player development', 'Academy classes'],
    image: '/assets/images/nolan-theibay.jpeg',
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Jessup University',
      },
    ],
  },
  {
    key: 'quintan-hall',
    anchor: 'quintan-hall',
    name: 'Quintan Hall',
    job_title: 'Coach',
    description:
      'College coach with experience at Johnson County Community College, Central Missouri, and Jessup University.',
    locations: ['Rocklin', 'El Dorado Hills'],
    specialties: ['Player development', 'Defense', 'Academy classes'],
    image: '/assets/images/quinten-hall.jpeg',
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Jessup University',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'University of Central Missouri',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Johnson County Community College',
      },
    ],
  },
  {
    key: 'jackson-doherty',
    anchor: 'jackson-doherty',
    name: 'Jackson Doherty',
    job_title: 'Coach',
    description: 'Former collegiate player and Louisville Slugger Innovations R&D testing engineer.',
    locations: ['Rocklin', 'El Dorado Hills'],
    specialties: ['Player development', 'Hitting', 'Bat technology'],
    image: '/assets/images/jackson-doherty.PNG',
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Benedictine College',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Coffeyville Community College',
      },
    ],
  },
  {
    key: 'bryce-petrilla',
    anchor: 'bryce-petrilla',
    name: 'Bryce Petrilla',
    job_title: 'Coach',
    description:
      'Rocklin-area college alumnus with playing experience at Folsom Lake College, Oregon Tech, and Jessup University.',
    locations: ['Rocklin', 'El Dorado Hills'],
    specialties: ['Player development', 'Defense', 'Academy classes'],
    image: '/assets/images/bryce-pertrilla.PNG',
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Jessup University',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Oregon Tech',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Folsom Lake College',
      },
    ],
  },
  {
    key: 'justin-watari',
    anchor: 'justin-watari',
    name: 'Justin Watari',
    job_title: 'Coach',
    description:
      'University of New Mexico alumnus helping athletes develop physically and mentally for the next level.',
    locations: ['Rocklin', 'El Dorado Hills'],
    specialties: ['Player development', 'Academy classes'],
    image: '/assets/images/justin-watari.PNG',
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'University of New Mexico',
      },
    ],
  },
  {
    key: 'mike-quintal',
    anchor: 'mike-quintal',
    name: 'Mike Quintal',
    job_title: 'Coach',
    description:
      'Former collegiate player with experience at Santa Clara, San Jose City College, and Cal Poly Pomona.',
    locations: ['Rocklin', 'El Dorado Hills'],
    specialties: ['Player development', 'Academy classes'],
    image: '/assets/images/logo-american-b-black-yellow.png',
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Cal Poly Pomona',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Santa Clara University',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'San Jose City College',
      },
    ],
  },
];
