// Service-area pages: one {lesson} × {location} combination each.
//
// These are the layer the local-SEO playbook calls "service-area pages". Each one has two
// parents in the link graph — its core service (/lessons/{slug}) and its core location
// (/baseball-lessons-{location}) — and both parents link back to it.
//
// URLs nest under the *existing* location hub (/baseball-lessons-rocklin/hitting) rather
// than the playbook's /locations/{loc}/{service}. The hub already lives at the flat URL and
// is the recorded landing page for its city queries; nesting under a /locations/ prefix
// would have created a parent path that 404s and a breadcrumb pointing at nothing.
//
// Only hitting and pitching are built, at both locations. The other three lessons keep
// linking to their generic pages until these four earn impressions — see
// LOCAL_SEO_BUILD_ORDER.md. Every field below has to be true for that specific facility;
// a page that reads like another page with the city swapped is the failure mode this layer
// is supposed to avoid.

export interface ServiceAreaFaq {
  question: string;
  answer: string;
}

export interface ServiceArea {
  locationKey: 'rocklin' | 'el-dorado-hills';
  lessonSlug: 'hitting' | 'pitching';
  /** Final path segment. Full URL is built in urls.ts from the location hub slug. */
  slug: string;
  meta_title: string;
  meta_description: string;
  kicker: string;
  headline: string;
  subheadline: string;
  meta_items: string[];
  image: string;
  image_alt: string;
  intro_title: string;
  intro_copy: string;
  /** What makes training this skill at THIS facility different. Not interchangeable copy. */
  local_title: string;
  local_copy: string;
  focus_items: string[];
  faq_items: ServiceAreaFaq[];
  cta_label: string;
}

const SITE_NAME = 'Better Baseball Training';

export const serviceAreas: ServiceArea[] = [
  {
    locationKey: 'rocklin',
    lessonSlug: 'hitting',
    slug: 'hitting',
    meta_title: `Hitting Lessons in Rocklin | Youth Baseball | ${SITE_NAME}`,
    meta_description:
      'Youth hitting lessons in Rocklin at 4283 Duluth Ave. Indoor batting cages, coached swing work, and academy reps for players ages 8-14U.',
    kicker: 'Hitting Lessons · Rocklin',
    headline: 'Hitting Lessons in Rocklin',
    subheadline:
      'Coached swing work in the Duluth Ave cages for players ages 8-14U from Rocklin, Roseville, Granite Bay, and Loomis.',
    meta_items: ['4283 Duluth Ave', 'Indoor Cages', 'Ages 8-14U'],
    image: '/assets/images/service-hitting-1.PNG',
    image_alt: 'Hitting lesson in the batting cages at Better Baseball Training Rocklin',
    intro_title: 'Swing Work That Uses the Cage Instead of Just Renting It',
    intro_copy:
      'A hitting lesson at BBT Rocklin is coached time in the cage, not a bucket of balls and a timer. Sessions work on swing path, timing, plate discipline, and approach, with someone watching every rep and building a plan the player can repeat.',
    local_title: 'Why Rocklin for Hitting',
    local_copy:
      'Rocklin is the facility with the batting cages. Indoor cage lanes and turf sit in the same building, so swing work happens year-round and does not depend on field or weather. The same space runs private hitting lessons and academy hitting reps, which is why families here often move between the two rather than choosing one.',
    focus_items: [
      'Coached cage work on swing path, timing, and contact quality',
      'Indoor lanes at 4283 Duluth Ave, so winter and rain do not stop reps',
      'A path from a private hitting lesson into academy membership at $250/month',
      'Convenient for families in Rocklin, Roseville, Granite Bay, and Loomis',
    ],
    faq_items: [
      {
        question: 'Where do Rocklin hitting lessons take place?',
        answer:
          'In the indoor cages at 4283 Duluth Ave, Rocklin, CA 95765. The cage lanes and turf are in the same facility, so a lesson can move between tee work, front toss, and live reps without changing locations.',
      },
      {
        question: 'Can we just rent a cage in Rocklin instead?',
        answer:
          'The Rocklin cages are built around coached lessons and academy reps rather than hourly drop-in rental. Call 916-465-5551 to ask what is currently available — uncoached cage time builds reps, but it does not fix a swing.',
      },
      {
        question: 'How much does hitting cost at the Rocklin facility?',
        answer:
          'Private hitting lessons are priced per session; academy membership at Rocklin is $250 per month and covers recurring group training including hitting. Call 916-465-5551 for current lesson pricing and to decide which fits.',
      },
      {
        question: 'Who should we talk to about hitting at Rocklin?',
        answer:
          'Cesar Tamayo is the Rocklin GM and can match a player to the right hitting coach based on age and goals. He leads Rocklin programming and brings collegiate playing experience and a kinesiology background.',
      },
      {
        question: 'We are in Roseville — is Rocklin the closer facility?',
        answer:
          'Yes. Roseville, Granite Bay, and Loomis families are closer to the Duluth Ave facility than to El Dorado Hills. BBT also runs hitting lessons in El Dorado Hills if that commute works better on a given day.',
      },
    ],
    cta_label: 'Book a Rocklin Hitting Lesson',
  },
  {
    locationKey: 'rocklin',
    lessonSlug: 'pitching',
    slug: 'pitching',
    meta_title: `Pitching Lessons in Rocklin | Youth Baseball | ${SITE_NAME}`,
    meta_description:
      'Youth pitching lessons in Rocklin at 4283 Duluth Ave. Mechanics, velocity development, and strike-throwing for players ages 8-14U.',
    kicker: 'Pitching Lessons · Rocklin',
    headline: 'Pitching Lessons in Rocklin',
    subheadline:
      'Indoor mound work on mechanics, control, and velocity for players ages 8-14U across Rocklin, Roseville, Granite Bay, and Loomis.',
    meta_items: ['4283 Duluth Ave', 'Indoor Turf', 'Ages 8-14U'],
    image: '/assets/images/service-pitching-2.PNG',
    image_alt: 'Pitching instruction at Better Baseball Training Rocklin',
    intro_title: 'Repeatable Mechanics Before Radar Numbers',
    intro_copy:
      'Pitching lessons at BBT Rocklin work on a delivery a player can repeat under game pressure — arm path, lower half, balance, and the ability to throw a strike when it matters. Velocity follows mechanics; chasing it first is how young arms get hurt.',
    local_title: 'Why Rocklin for Pitching',
    local_copy:
      'The Duluth Ave facility has indoor turf and netted throwing space, so bullpens run through the winter and through Sacramento-valley rain without waiting on a field. Gabe Emmett, a former Dodgers draft pick who works on velocity development, coaches pitching at Rocklin.',
    focus_items: [
      'Mechanics work on arm path, lower half, and a repeatable delivery',
      'Indoor throwing space at 4283 Duluth Ave for year-round bullpens',
      'Velocity development built on top of mechanics, not instead of them',
      'Convenient for families in Rocklin, Roseville, Granite Bay, and Loomis',
    ],
    faq_items: [
      {
        question: 'Where do Rocklin pitching lessons take place?',
        answer:
          'At 4283 Duluth Ave, Rocklin, CA 95765, on indoor turf with netted throwing space. Bullpens do not depend on field availability or weather.',
      },
      {
        question: 'Who coaches pitching at the Rocklin facility?',
        answer:
          'Gabe Emmett, a former Los Angeles Dodgers draft pick who focuses on pitching and velocity development, coaches at Rocklin. Jon Peters, the BBT owner, also works on pitching across both facilities. Call 916-465-5551 to confirm current availability.',
      },
      {
        question: 'My player throws hard but cannot find the zone. Can lessons help?',
        answer:
          'That is usually a repeatability problem, not an arm-strength problem. When a delivery changes slightly every pitch, the release point moves with it. Lessons work on making the mechanics consistent so strikes stop being accidental.',
      },
      {
        question: 'Is it too early for a young player to work on velocity?',
        answer:
          'For most 8-14U players, mechanics and durability come first, and velocity follows. BBT builds the delivery before pushing output. Call 916-465-5551 and the staff will give an honest read on where a specific athlete should start.',
      },
      {
        question: 'Does BBT offer pitching lessons closer to Folsom?',
        answer:
          'Yes. The El Dorado Hills facility at 4990 Hillsdale Dr, Suite 400 runs pitching lessons and is the closer option for Folsom, Cameron Park, and Shingle Springs families.',
      },
    ],
    cta_label: 'Book a Rocklin Pitching Lesson',
  },
  {
    locationKey: 'el-dorado-hills',
    lessonSlug: 'hitting',
    slug: 'hitting',
    meta_title: `Hitting Lessons in El Dorado Hills | Youth Baseball | ${SITE_NAME}`,
    meta_description:
      'Youth hitting lessons in El Dorado Hills at 4990 Hillsdale Dr, Suite 400. Indoor swing work and academy reps for players ages 8-14U near Folsom.',
    kicker: 'Hitting Lessons · El Dorado Hills',
    headline: 'Hitting Lessons in El Dorado Hills',
    subheadline:
      'Coached swing work indoors for players ages 8-14U from El Dorado Hills, Folsom, Cameron Park, and Shingle Springs.',
    meta_items: ['4990 Hillsdale Dr', 'Near Folsom', 'Ages 8-14U'],
    image: '/assets/images/IMG_0607.jpg',
    image_alt: 'Indoor hitting training at Better Baseball Training El Dorado Hills',
    intro_title: 'A Swing Built Indoors, Tested in Games',
    intro_copy:
      'Hitting lessons at BBT El Dorado Hills work on swing path, timing, plate discipline, and approach — the difference between a player who looks good in a cage and one who produces at-bats. Every rep is coached, and the plan carries into academy training.',
    local_title: 'Why El Dorado Hills for Hitting',
    local_copy:
      'The Hillsdale Dr facility is fully indoor with turf and netted training space, so hitting is never on hold for weather or field access. Trey Furrey, the EDH GM, brings All-America playing experience and helps families pick the right hitting coach and starting point.',
    focus_items: [
      'Coached work on swing path, timing, plate discipline, and approach',
      'Indoor turf and netting at 4990 Hillsdale Dr, Suite 400',
      'A path from private hitting lessons into academy membership at $299/month',
      'The closer facility for El Dorado Hills, Folsom, Cameron Park, and Shingle Springs',
    ],
    faq_items: [
      {
        question: 'Where do El Dorado Hills hitting lessons take place?',
        answer:
          'At 4990 Hillsdale Dr, Suite 400, El Dorado Hills, CA 95762. The facility is indoors with turf and netted training space, so lessons run year-round.',
      },
      {
        question: 'How much does hitting cost in El Dorado Hills?',
        answer:
          'Private hitting lessons are priced per session; academy membership at El Dorado Hills is $299 per month and includes recurring group hitting work. The two facilities are priced separately — Rocklin academy is $250 per month.',
      },
      {
        question: 'Who should we talk to about hitting at EDH?',
        answer:
          'Trey Furrey is the El Dorado Hills GM. He leads BBT programming at the facility and brings All-America playing experience to academy and team development.',
      },
      {
        question: 'We are in Folsom — is EDH the closer facility?',
        answer:
          'Yes. Folsom, Cameron Park, and Shingle Springs families are closer to Hillsdale Dr than to the Rocklin facility. Rocklin is the better fit for Roseville, Granite Bay, and Loomis.',
      },
      {
        question: 'Does EDH have batting cages like Rocklin?',
        answer:
          'El Dorado Hills is an indoor facility with turf and netted training space used for hitting work. The dedicated batting cage lanes are at the Rocklin facility on Duluth Ave.',
      },
    ],
    cta_label: 'Book an EDH Hitting Lesson',
  },
  {
    locationKey: 'el-dorado-hills',
    lessonSlug: 'pitching',
    slug: 'pitching',
    meta_title: `Pitching Lessons in El Dorado Hills | Youth Baseball | ${SITE_NAME}`,
    meta_description:
      'Youth pitching lessons in El Dorado Hills with former MLB pitcher Jean Machi. Mechanics, control, and velocity for ages 8-14U near Folsom.',
    kicker: 'Pitching Lessons · El Dorado Hills',
    headline: 'Pitching Lessons in El Dorado Hills',
    subheadline:
      'Indoor mound work for players ages 8-14U from EDH, Folsom, Cameron Park, and Shingle Springs — including instruction from a former MLB pitcher.',
    meta_items: ['4990 Hillsdale Dr', 'Former MLB Staff', 'Ages 8-14U'],
    image: '/assets/images/jean-machi.jpeg',
    image_alt: 'Pitching coach Jean Machi at Better Baseball Training El Dorado Hills',
    intro_title: 'Professional Instruction, Youth-Appropriate Workload',
    intro_copy:
      'Pitching lessons at BBT El Dorado Hills work on a delivery a player can repeat, command they can trust, and a workload appropriate for a developing arm. Mechanics come before velocity, and the plan is built around the athlete in front of the coach.',
    local_title: 'Why El Dorado Hills for Pitching',
    local_copy:
      'El Dorado Hills is where Jean Machi coaches — a former MLB pitcher and 2014 World Series champion who gives pitching lessons at this facility. Gabe Emmett, a former Dodgers draft pick focused on velocity development, also works here. The facility is fully indoor, so bullpens are not weather-dependent.',
    focus_items: [
      'Instruction from a former MLB pitcher and a former Dodgers draft pick',
      'Indoor turf and netted throwing space at 4990 Hillsdale Dr, Suite 400',
      'Command and repeatable mechanics before velocity chasing',
      'The closer facility for El Dorado Hills, Folsom, Cameron Park, and Shingle Springs',
    ],
    faq_items: [
      {
        question: 'Who coaches pitching in El Dorado Hills?',
        answer:
          'Jean Machi, a former MLB pitcher and 2014 World Series champion, gives pitching lessons at the El Dorado Hills facility. Gabe Emmett, a former Los Angeles Dodgers draft pick who focuses on velocity development, also coaches pitching here. Call 916-465-5551 to check current availability.',
      },
      {
        question: 'Where do EDH pitching lessons take place?',
        answer:
          'At 4990 Hillsdale Dr, Suite 400, El Dorado Hills, CA 95762 — indoors, on turf with netted throwing space, so bullpens run year-round.',
      },
      {
        question: 'Is a former pro coach appropriate for a 10-year-old?',
        answer:
          'Yes, when the instruction is scaled to the athlete. The value of a professional background is knowing what actually matters at each stage and what can wait. BBT builds around players ages 8-14U, not around pro workloads.',
      },
      {
        question: 'How much are pitching lessons in El Dorado Hills?',
        answer:
          'Private lessons are priced per session. Academy membership at El Dorado Hills is $299 per month and covers recurring group training including pitching. Call 916-465-5551 for current lesson pricing.',
      },
      {
        question: 'Is Rocklin or El Dorado Hills better for pitching?',
        answer:
          'Both run pitching lessons on indoor turf. Choose on commute: EDH is closer for Folsom, Cameron Park, and Shingle Springs; Rocklin is closer for Roseville, Granite Bay, and Loomis. Jean Machi coaches at the EDH facility specifically.',
      },
    ],
    cta_label: 'Book an EDH Pitching Lesson',
  },
];

export function serviceAreasForLocation(locationKey: string): ServiceArea[] {
  return serviceAreas.filter((a) => a.locationKey === locationKey);
}

export function serviceAreasForLesson(lessonSlug: string): ServiceArea[] {
  return serviceAreas.filter((a) => a.lessonSlug === lessonSlug);
}
