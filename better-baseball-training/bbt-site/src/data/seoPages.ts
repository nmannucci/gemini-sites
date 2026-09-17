// In WordPress, meta_title appended `. get_bloginfo('name')` (the site name).
// The site name is "Better Baseball Training".
const SITE_NAME = 'Better Baseball Training';

export interface SeoFaqItem {
  question: string;
  answer: string;
}

export interface SeoDetailCard {
  label: string;
  title: string;
  copy: string;
}

export interface SeoPage {
  slug: string;
  label: string;
  title: string;
  meta_title: string;
  meta_description: string;
  kicker: string;
  headline: string;
  subheadline: string;
  meta_items: string[];
  image: string;
  image_alt: string;
  intro_label: string;
  intro_title: string;
  intro_copy: string;
  focus_items: string[];
  detail_cards: SeoDetailCard[];
  faq_items: SeoFaqItem[];
  service_type: string;
  schema_locations: string[];
  related_links: string[];
  cta_label: string;
  // Location pages only. Address string for the Google Maps embed — no API key needed,
  // and it resolves from the real address rather than hardcoded coordinates we don't have.
  map_query?: string;
  map_caption?: string;
}

export const seoPages: SeoPage[] = [
  {
    slug: 'baseball-lessons-rocklin',
    label: 'Baseball Lessons Rocklin',
    title: 'Baseball Lessons in Rocklin',
    meta_title: `Baseball Lessons Rocklin | Youth Baseball Training | ${SITE_NAME}`,
    meta_description:
      'Baseball lessons in Rocklin at Better Baseball Training. Private and group youth baseball training for ages 8-14U at 4283 Duluth Ave.',
    kicker: 'Rocklin Baseball Lessons',
    headline: 'Baseball Lessons in Rocklin for Youth Players',
    subheadline:
      'Private lessons, group training, academy classes, and player development for Rocklin, Roseville, Granite Bay, and nearby baseball families.',
    meta_items: ['4283 Duluth Ave', 'Ages 8-14U', 'Private + Group'],
    image: '/assets/images/facility-img-1.jpg',
    image_alt: 'Rocklin batting cages and training space at Better Baseball Training',
    intro_label: 'Rocklin Training Hub',
    intro_title: 'A Better First Step for Baseball Training in Rocklin',
    intro_copy:
      'BBT Rocklin gives youth players a place to work on hitting, pitching, infield/outfield, catching, baseball IQ, baserunning, and confidence with coaches who can build a clear development plan.',
    focus_items: [
      'Private baseball lessons for targeted skill work',
      'Academy membership options for consistent weekly development',
      'Indoor turf, batting cages, and training spaces built for year-round reps',
      'A path from individual instruction into group training and team development',
    ],
    detail_cards: [
      {
        label: 'Location',
        title: 'Rocklin Basecamp',
        copy: 'Training is available at 4283 Duluth Ave in Rocklin, close to Roseville, Granite Bay, Loomis, and nearby Placer County communities.',
      },
      {
        label: 'Lesson Focus',
        title: 'Hitting, Pitching, Defense, Catching, Baseball IQ',
        copy: 'Families can start with one skill focus or ask the BBT staff to recommend the best path based on age, goals, and schedule.',
      },
      {
        label: 'Best Fit',
        title: 'Players Ages 8-14U',
        copy: 'The core BBT lesson and academy model is built for youth players who need better reps, better instruction, and more confidence in games.',
      },
    ],
    faq_items: [
      {
        question: 'Where are baseball lessons in Rocklin offered?',
        answer:
          'BBT offers baseball lessons in Rocklin at 4283 Duluth Ave, with private and group options for youth players.',
      },
      {
        question: 'What can players work on in Rocklin lessons?',
        answer:
          'Players can work on hitting, pitching, infield/outfield, catching, baseball IQ, baserunning, and basestealing.',
      },
      {
        question: 'Are Rocklin lessons private or group training?',
        answer:
          "BBT offers both private lessons and group academy training, depending on the player's goals and the family's schedule.",
      },
      {
        question: 'How much is academy membership at BBT Rocklin?',
        answer:
          'Academy membership at the Rocklin facility is $250 per month, which gives players recurring access to structured group training rather than one-off lessons.',
      },
      {
        question: 'What ages train at the Rocklin facility?',
        answer:
          'The core lesson and academy model at Rocklin is built for youth players ages 8-14U. Families outside that range can call 916-465-5551 to ask what makes sense for their athlete.',
      },
      {
        question: 'Which communities does the Rocklin facility serve?',
        answer:
          'The Duluth Ave facility mainly serves families from Rocklin, Roseville, Granite Bay, and Loomis, along with other nearby Placer County communities.',
      },
      {
        question: 'Does the Rocklin location have batting cages?',
        answer:
          'Yes. The Rocklin facility includes indoor batting cages and turf training space, used for both private lessons and academy reps rather than rented by the hour on their own.',
      },
      {
        question: 'Who runs the Rocklin facility?',
        answer:
          'Cesar Tamayo is the general manager at BBT Rocklin and can help families choose the right coach and training path.',
      },
    ],
    service_type: 'Youth baseball lessons',
    schema_locations: ['rocklin'],
    related_links: ['hitting', 'pitching', 'baseball-academy', 'travel-baseball', 'book-now'],
    cta_label: 'Book Rocklin Baseball Lessons',
    map_query: '4283 Duluth Ave, Rocklin, CA 95765',
    map_caption: 'BBT Rocklin — 4283 Duluth Ave, Rocklin, CA 95765',
  },
  {
    slug: 'baseball-lessons-el-dorado-hills',
    label: 'Baseball Lessons El Dorado Hills',
    title: 'Baseball Lessons in El Dorado Hills',
    meta_title: `Baseball Lessons El Dorado Hills | Youth Training | ${SITE_NAME}`,
    meta_description:
      'Baseball lessons in El Dorado Hills at Better Baseball Training. Youth hitting, pitching, catching, defense, and academy training near Folsom.',
    kicker: 'El Dorado Hills Baseball Lessons',
    headline: 'Baseball Lessons in El Dorado Hills for Ages 8-14U',
    subheadline:
      'Structured youth baseball instruction for EDH and Folsom families who want more than disconnected reps or one-off cage time.',
    meta_items: ['4990 Hillsdale Cir', 'Near Folsom', 'Academy + Lessons'],
    image: '/assets/images/IMG_0607.jpg',
    image_alt: 'El Dorado Hills indoor baseball training facility at Better Baseball Training',
    intro_label: 'EDH Development Facility',
    intro_title: 'A Complete Training Option for El Dorado Hills Families',
    intro_copy:
      'The El Dorado Hills facility gives players access to private lessons, academy programming, pitching instruction, and position-specific development close to home.',
    focus_items: [
      'Private baseball lessons for specific skill needs',
      'Academy training for players who need recurring structure',
      'Pitching instruction with former professional experience available on staff',
      'A clear development path for EDH, Folsom, and surrounding families',
    ],
    detail_cards: [
      {
        label: 'Location',
        title: 'El Dorado Hills Facility',
        copy: 'Training is available at 4990 Hillsdale Cir, Suite 400 in El Dorado Hills for families around EDH, Folsom, Cameron Park, and nearby areas.',
      },
      {
        label: 'Program Fit',
        title: 'Lessons, Academy, and Player Development',
        copy: 'BBT helps families choose between skill-specific private lessons and recurring academy training based on where the athlete is now.',
      },
      {
        label: 'Coaching Depth',
        title: 'Former Pro and College Backgrounds',
        copy: 'The staff includes coaches with professional, college, academy, and travel baseball experience across multiple player-development needs.',
      },
      {
        label: 'Indoor Facility',
        title: 'Turf and Netted Training Space',
        copy: 'EDH is an indoor gym at 4990 Hillsdale Cir, Suite 400 with turf and netted training space for lessons and academy reps. Facility questions for this location stay on this hub. Families who want the dedicated Rocklin cage facility should use the Rocklin batting cages page.',
      },
    ],
    faq_items: [
      {
        question: 'Where is BBT in El Dorado Hills?',
        answer:
          'The El Dorado Hills facility is at 4990 Hillsdale Cir, Suite 400, El Dorado Hills, CA 95762.',
      },
      {
        question: 'Do EDH lessons include pitching and hitting?',
        answer:
          'Yes. BBT offers hitting, pitching, catching, infield/outfield, baseball IQ, and related youth baseball training.',
      },
      {
        question: 'Is the EDH academy different from private lessons?',
        answer:
          'Private lessons focus on targeted skill work, while academy membership gives players recurring access to structured group training.',
      },
      {
        question: 'How much is academy membership in El Dorado Hills?',
        answer:
          'Academy membership at the El Dorado Hills facility is $299 per month. It covers recurring group training across hitting, pitching, defense, catching, and baseball IQ.',
      },
      {
        question: 'Which communities does the El Dorado Hills facility serve?',
        answer:
          'The Hillsdale Cir facility mainly serves families from El Dorado Hills, Folsom, Cameron Park, and Shingle Springs.',
      },
      {
        question: 'Who runs the El Dorado Hills facility?',
        answer:
          'Trey Furrey is the general manager at BBT El Dorado Hills and can help families pick the right coach and starting point.',
      },
      {
        question: 'Does BBT El Dorado Hills help players prepare for travel baseball?',
        answer:
          'Yes. Travel baseball development is part of what BBT offers, and the EDH staff can advise on when a player is ready for team-based play versus more individual skill work.',
      },
      {
        question: 'Is the El Dorado Hills facility indoors?',
        answer:
          'Yes. EDH is an indoor training facility with turf and netted training space, so training is not dependent on field availability.',
      },
    ],
    service_type: 'Youth baseball lessons',
    schema_locations: ['el-dorado-hills'],
    related_links: ['pitching', 'hitting', 'baseball-academy', 'travel-baseball', 'book-now', 'schedule'],
    cta_label: 'Book EDH Baseball Lessons',
    map_query: '4990 Hillsdale Cir Suite 400, El Dorado Hills, CA 95762',
    map_caption: 'BBT El Dorado Hills — 4990 Hillsdale Cir, Suite 400, El Dorado Hills, CA 95762',
  },
  {
    slug: 'baseball-academy',
    label: 'Baseball Academy',
    title: 'Youth Baseball Academy',
    // Location-neutral: this is a service pillar, so naming cities here competes with the
    // two location pages for the same queries. The academy's cities live on those pages.
    meta_title: `Youth Baseball Academy Memberships | ${SITE_NAME}`,
    // The cities stay out of the description too — naming them here was the same
    // location-targeting the meta_title deliberately avoids. Per-facility pricing and
    // catchment still live in the body copy and FAQs, which is where the skill puts them.
    meta_description:
      'Youth baseball academy memberships for ages 8-14U. Unlimited access training and recurring group instruction from Better Baseball Training.',
    kicker: 'Youth Baseball Academy',
    headline: 'Baseball Academy Memberships for Consistent Player Development',
    subheadline:
      'Unlimited academy access for youth players who need recurring instruction, better structure, and a development path that goes beyond one lesson.',
    meta_items: ['Rocklin $250/mo', 'EDH $299/mo', 'Ages 8-14U'],
    image: '/assets/images/hero-slideshow-4.PNG',
    image_alt: 'Youth baseball player training inside Better Baseball Training academy',
    intro_label: 'Academy Membership',
    intro_title: 'Built for Players Who Need More Than Occasional Lessons',
    intro_copy:
      'Academy membership gives dedicated youth players consistent access to skill development across hitting, pitching, catching, defense, baseball IQ, and game-readiness.',
    focus_items: [
      'Rocklin academy membership at $250/month',
      'El Dorado Hills academy membership at $299/month',
      'Recurring training for players ages 8-14U',
      'A bridge between private lessons, team goals, and long-term development',
    ],
    detail_cards: [
      {
        label: 'Rocklin',
        title: '$250/month',
        copy: 'Rocklin academy access gives families a recurring training option at the Duluth Ave facility.',
      },
      {
        label: 'El Dorado Hills',
        title: '$299/month',
        copy: 'EDH academy access gives families structured training at the Hillsdale Cir facility near Folsom.',
      },
      {
        label: 'Development Path',
        title: 'Lessons + Academy + Teams',
        copy: 'BBT can help families decide when a player should use private lessons, academy classes, or team-based development.',
      },
    ],
    faq_items: [
      {
        question: 'How much is BBT academy membership?',
        answer:
          'Rocklin academy membership is $250 per month and El Dorado Hills academy membership is $299 per month.',
      },
      {
        question: 'Who is academy membership for?',
        answer:
          'Academy membership is built for youth players ages 8-14U who need consistent reps and structured development.',
      },
      {
        question: 'What skills does the academy cover?',
        answer:
          'Academy training can support hitting, pitching, infield/outfield, catching, baseball IQ, and broader player development.',
      },
      {
        question: 'Why does El Dorado Hills cost more than Rocklin?',
        answer:
          'The two facilities are priced separately at $250 and $299 per month. Families choose the location that works for their commute rather than paying one blended rate across both.',
      },
      {
        question: 'Is academy membership better value than private lessons?',
        answer:
          'They solve different problems. Private lessons are targeted work on one skill, while academy membership is recurring structured training. Players who need volume and consistency usually get more out of membership; players fixing one specific thing often start with lessons.',
      },
      {
        question: 'Can a player do private lessons and academy membership at the same time?',
        answer:
          'Yes. Many families use lessons for focused skill work and academy training for consistent reps between them. Call 916-465-5551 and the staff can suggest the right mix.',
      },
      {
        question: 'Which location should we choose for academy membership?',
        answer:
          'Choose on commute first. Rocklin is at 4283 Duluth Ave and serves Rocklin, Roseville, Granite Bay, and Loomis. El Dorado Hills is at 4990 Hillsdale Cir, Suite 400 and serves EDH, Folsom, Cameron Park, and Shingle Springs.',
      },
      {
        question: 'Does academy membership lead into travel baseball?',
        answer:
          'It can. BBT runs travel baseball development alongside the academy, and the staff can advise when a player is ready for team-based play rather than continuing with individual and group training alone.',
      },
    ],
    service_type: 'Youth baseball academy membership',
    schema_locations: ['rocklin', 'el-dorado-hills'],
    related_links: [
      'baseball-lessons-rocklin',
      'baseball-lessons-el-dorado-hills',
      'hitting',
      'pitching',
      'book-now',
    ],
    cta_label: 'Ask About Academy Membership',
  },
  {
    slug: 'travel-baseball',
    label: 'Travel Baseball',
    title: 'Travel Baseball Development',
    // Location-neutral for the same reason as the academy pillar.
    meta_title: `Travel Baseball Development for Youth Players | ${SITE_NAME}`,
    meta_description:
      'Travel baseball development in the Sacramento area for youth players ages 8-14U. Better Baseball Training helps players prepare for team competition.',
    kicker: 'Travel Baseball Development',
    headline: 'Travel Baseball Development for Sacramento-Area Youth Players',
    subheadline:
      'Training, academy structure, and team-based development for players who are ready to grow toward more competitive baseball.',
    meta_items: ['Ages 8-14U', 'Sacramento Area', 'Development First'],
    image: '/assets/images/hero-slideshow-2.PNG',
    image_alt: 'Better Baseball Training travel baseball team celebrating after a tournament',
    intro_label: 'Team Readiness',
    intro_title: 'Prepare for Travel Baseball Without Skipping Development',
    intro_copy:
      'BBT focuses on the development work that helps youth players become better prepared for team competition: skill execution, baseball IQ, confidence, and consistent training habits.',
    focus_items: [
      'Player development for ages 8-14U',
      'Training support for families exploring travel baseball teams near Sacramento',
      'A path that connects private lessons, academy work, and team expectations',
      'Guidance for players who need more confidence before higher-commitment competition',
    ],
    detail_cards: [
      {
        label: 'Development',
        title: 'Skill Work Before Team Pressure',
        copy: 'Players can build hitting, pitching, defense, catching, and baseball IQ before or during a travel baseball season.',
      },
      {
        label: 'Readiness',
        title: 'Know the Next Step',
        copy: 'Families can use BBT to understand whether a player needs private lessons, academy reps, or a team-development conversation.',
      },
      {
        label: 'Local Fit',
        title: 'Rocklin + El Dorado Hills',
        copy: 'Two facilities give Sacramento-area families a local training base for development around team schedules.',
      },
    ],
    faq_items: [
      {
        question: 'Does BBT support travel baseball development?',
        answer:
          'Yes. BBT supports youth players with lessons, academy training, and player development that can prepare athletes for travel baseball.',
      },
      {
        question: 'What age group is this built around?',
        answer:
          'BBT core programming is built around ages 8-14U. Call 916-465-5551 or book a lesson to ask about current team or development options.',
      },
      {
        question: 'Is this a tournament directory?',
        answer:
          'No. This page is focused on player development and readiness, not listing Sacramento travel baseball tournaments.',
      },
      {
        question: 'How do we know if our player is ready for travel baseball?',
        answer:
          'Readiness is usually about whether a player can execute skills consistently and handle a bigger workload, not just whether they are one of the better players on their current team. BBT staff can give an honest read after seeing an athlete train.',
      },
      {
        question: 'Should a player do travel ball or keep working on skills first?',
        answer:
          'Both paths are legitimate, and the wrong order is common. A player who joins a team before their skills hold up often gets reps without development. BBT is set up so families can build skills first and move to team play when it actually helps.',
      },
      {
        question: 'Does BBT run its own travel teams?',
        answer:
          'Travel baseball development is part of what BBT offers alongside lessons and academy membership. Call 916-465-5551 for what is currently running and which age groups have openings.',
      },
      {
        question: 'What ages does travel baseball development cover?',
        answer:
          'The BBT development model is built around players ages 8-14U, which is the window where most families are first deciding whether to move into travel baseball.',
      },
      {
        question: 'Can a player train for travel baseball at either location?',
        answer:
          'Yes. Both the Rocklin and El Dorado Hills facilities support the same development work, so families can train at whichever location is a better commute.',
      },
    ],
    service_type: 'Travel baseball development',
    schema_locations: ['rocklin', 'el-dorado-hills'],
    related_links: [
      'baseball-academy',
      'baseball-lessons-rocklin',
      'baseball-lessons-el-dorado-hills',
      'baseball-iq',
      'book-now',
    ],
    cta_label: 'Ask About Travel Baseball Development',
  },
  {
    slug: 'batting-cages-rocklin',
    label: 'Rocklin Batting Cages',
    title: 'Rocklin Batting Cages',
    meta_title: 'Rocklin Batting Cages | Indoor Youth Training',
    meta_description:
      'Indoor batting cages in Rocklin at 4283 Duluth Ave. Training-first cage and turf space for youth lessons and academy reps — not a drop-in rental shop.',
    kicker: 'Rocklin Batting Cages',
    headline: 'Rocklin Batting Cages for Structured Baseball Training',
    subheadline:
      'Indoor cage and turf space at 4283 Duluth Ave for coached hitting work, academy reps, and youth player development — not a public hourly cage shop.',
    meta_items: ['4283 Duluth Ave', 'Training-First Cages', 'Ages 8-14U'],
    image: '/assets/images/facility-img-1.jpg',
    image_alt: 'Indoor batting cages at Better Baseball Training Rocklin on Duluth Ave',
    intro_label: 'Facility + Training',
    intro_title: 'Cage Space Built Around Coaching, Not a Timer',
    intro_copy:
      'The Rocklin facility at 4283 Duluth Ave includes indoor batting cages and turf used as part of Better Baseball Training programming. Families searching for Rocklin batting cages will find a training-first environment: coaches watch the reps, correct the work, and connect cage time to hitting, pitching, defense, catching, and baseball IQ. Call 916-465-5551 for current availability rather than expecting a walk-up hourly rental counter.',
    focus_items: [
      'Indoor batting cages in the same building as turf training space',
      'Cage time tied to hitting lessons and academy reps, not random buckets',
      'Year-round indoor work for Rocklin, Roseville, Granite Bay, and Loomis families',
      'A clear next step into private lessons, academy membership, or a location plan',
    ],
    detail_cards: [
      {
        label: 'Important',
        title: 'Training-First Facility',
        copy: 'This page does not promise generic drop-in cage rental or a public lane-by-the-hour product. The Duluth Ave cages exist to support structured lessons and academy training. Call 916-465-5551 to ask what is currently available for your athlete.',
      },
      {
        label: 'Best Use',
        title: 'Hitting Lessons, Not Open Cage Time',
        copy: 'Open cage time is reps without feedback. Hitting lessons at this facility are coached sessions that use the same lanes. If the search was for hitting instruction, start with Rocklin hitting lessons rather than treating this page as the lesson page.',
      },
      {
        label: 'Location',
        title: '4283 Duluth Ave',
        copy: 'BBT Rocklin sits at 4283 Duluth Ave, Rocklin, CA 95765 and serves families from Rocklin, Roseville, Granite Bay, and Loomis. Cesar Tamayo is the Rocklin GM and can help match a player to a coach and training path.',
      },
      {
        label: 'Next Step',
        title: 'Book or Call Before You Drive',
        copy: 'Use the form on this page or call 916-465-5551. Tell the team the athlete\'s age, the skill they need, and whether Rocklin is the right commute. The staff will point you to a lesson, academy conversation, or current facility option.',
      },
    ],
    faq_items: [
      {
        question: 'Does BBT have batting cages in Rocklin?',
        answer:
          'Yes. The Rocklin facility at 4283 Duluth Ave, Rocklin, CA 95765 includes indoor batting cage space and turf used for youth baseball training, private lessons, and academy reps.',
      },
      {
        question: 'Can I rent a Rocklin batting cage for drop-in use?',
        answer:
          'The facility is positioned around structured lessons, academy reps, and youth baseball training — not as a public drop-in rental shop. Call 916-465-5551 and ask what is currently available. Do not assume a walk-up hourly lane.',
      },
      {
        question: 'Are Rocklin batting cages the same thing as hitting lessons?',
        answer:
          'No. This page is about the indoor cage and turf facility. Hitting lessons are coached sessions that often use those cages. Families looking for swing instruction should use the Rocklin hitting lessons page or the main hitting lessons page.',
      },
      {
        question: 'What training happens in the Rocklin cages besides hitting?',
        answer:
          'The Duluth Ave building supports the same youth programs BBT runs in Rocklin: hitting, pitching, catching, infield/outfield, and baseball IQ, plus academy membership. Cage lanes are the hitting-specific part of that indoor environment.',
      },
      {
        question: 'What ages use the Rocklin batting cages?',
        answer:
          'The core lesson and academy model is built for players ages 8-14U. Families outside that range can call 916-465-5551 to ask what makes sense for their athlete.',
      },
      {
        question: 'Which cities are closest to the Rocklin cages?',
        answer:
          'The Duluth Ave facility mainly serves Rocklin, Roseville, Granite Bay, and Loomis. El Dorado Hills families should use the Hillsdale Cir facility unless the Rocklin commute is easier on a given day.',
      },
      {
        question: 'Who should we talk to about training at the Rocklin cages?',
        answer:
          'Cesar Tamayo is the general manager at BBT Rocklin and can help families choose a coach, a lesson focus, or academy membership. Call 916-465-5551 or use the form on this page.',
      },
      {
        question: 'How much does it cost to train in the Rocklin cages?',
        answer:
          'Private lessons are priced per session. Rocklin academy membership is $250 per month for recurring group training, including hitting work in the facility. Call 916-465-5551 for current lesson pricing. This page does not list an hourly public cage-rental rate because that is not the product BBT publishes here.',
      },
      {
        question: 'How do we get a player into the Rocklin facility?',
        answer:
          'Fill out the player interest form or call 916-465-5551. The staff follows up to match age, goals, and schedule. The live academy calendar lives on the schedule page if you want to see class times first.',
      },
    ],
    service_type: 'Indoor batting cage training',
    schema_locations: ['rocklin'],
    related_links: [
      'rocklin:hitting',
      'rocklin:pitching',
      'rocklin:catching',
      'rocklin:infield-outfield',
      'rocklin:baseball-iq',
      'hitting',
      'baseball-lessons-rocklin',
      'baseball-academy',
      'book-now',
    ],
    cta_label: 'Ask About Rocklin Cage Training',
    map_query: '4283 Duluth Ave, Rocklin, CA 95765',
    map_caption: 'BBT Rocklin batting cages — 4283 Duluth Ave, Rocklin, CA 95765',
  },
];
