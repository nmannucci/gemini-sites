export interface Lesson {
  slug: string;
  label: string;
  headline: string;
  subheadline: string;
  overview: string;
  section_title: string;
  focus_items: string[];
  form_copy: string;
  image: string;
  image_alt: string;
  image_widths: number[];
  meta_description: string;
}

export const lessons: Lesson[] = [
  {
    slug: 'hitting',
    label: 'Hitting',
    headline: 'Hitting Lessons in Rocklin & El Dorado Hills',
    subheadline:
      'Whether your athlete needs cleaner mechanics, better timing, or more confidence in the box, Better Baseball Training gives Sacramento-area players focused instruction and a clear plan for better at-bats.',
    overview:
      'Our hitting lessons in Rocklin and El Dorado Hills are built for players who need more than random reps. We help athletes build swings they can trust, develop a stronger approach at the plate, and carry more confidence into games.',
    section_title: 'What This Lesson Helps Build',
    focus_items: [
      'More consistent contact and better quality at-bats',
      'A swing players can repeat under game pressure',
      'Better timing, plate discipline, and approach',
      'More confidence stepping into the box',
    ],
    form_copy:
      'Tell us a little about your athlete and our team will help you find the right hitting lesson, coach, and next step.',
    image: '/assets/images/service-hitting-1.PNG',
    image_alt: 'Hitting lesson at Better Baseball Training',
    image_widths: [640, 960],
    meta_description:
      'Hitting lessons in Rocklin and El Dorado Hills for youth baseball players. Build a more confident swing, better timing, and stronger at-bats at BBT.',
  },
  {
    slug: 'pitching',
    label: 'Pitching',
    headline: 'Pitching Lessons in Rocklin & El Dorado Hills',
    subheadline:
      'If your athlete needs better mechanics, more command, or a clearer plan on the mound, BBT provides Sacramento-area pitching coaching that supports both performance and long-term development.',
    overview:
      'Our pitching lessons in Rocklin and El Dorado Hills help players throw with more intent, better control, and greater confidence under pressure. We focus on building healthy, repeatable movement patterns so athletes can compete now and keep improving over time.',
    section_title: 'What This Lesson Helps Build',
    focus_items: [
      'More repeatable mechanics and better command',
      'Healthier arm care habits and stronger movement quality',
      'A clearer plan for velocity and overall development',
      'More confidence, poise, and trust on the mound',
    ],
    form_copy:
      'Share a few details about your athlete and we will help you find the right pitching lesson, coach, and next step.',
    image: '/assets/images/service-pitching-2.PNG',
    image_alt: 'Pitching lesson at Better Baseball Training',
    image_widths: [640, 960],
    meta_description:
      'Pitching lessons in Rocklin and El Dorado Hills for youth players. Improve command, mechanics, arm care, and mound confidence at Better Baseball Training.',
  },
  {
    slug: 'infield-outfield',
    label: 'Infield / Outfield',
    headline: 'Infield & Outfield Lessons in Rocklin & El Dorado Hills',
    subheadline:
      'For Sacramento-area players who need better footwork, cleaner reads, and more confidence on defense, BBT delivers instruction that helps the game slow down and performance speed up.',
    overview:
      'Our infield and outfield lessons in Rocklin and El Dorado Hills help athletes become more dependable defenders. Players learn how to move with purpose, react faster, and make better decisions so they can play with more confidence when the ball is hit their way.',
    section_title: 'What This Lesson Helps Build',
    focus_items: [
      'Cleaner footwork and faster first-step reactions',
      'Better reads, routes, glove work, and throwing decisions',
      'Stronger positioning and defensive awareness',
      'More confidence making plays in game-speed moments',
    ],
    form_copy:
      'Tell us about your athlete and our staff will help you choose the right defensive lesson and next step for infield or outfield development.',
    image: '/assets/images/service-inf.ouf-3.PNG',
    image_alt: 'Infield and outfield lesson at Better Baseball Training',
    image_widths: [640, 960],
    meta_description:
      'Infield and outfield lessons in Rocklin and El Dorado Hills. Help your youth baseball player improve footwork, reads, positioning, and defensive confidence.',
  },
  {
    slug: 'catching',
    label: 'Catching',
    headline: 'Catching Lessons in Rocklin & El Dorado Hills',
    subheadline:
      'If your athlete wants to become more reliable, more confident, and more complete as a catcher, BBT offers Sacramento-area position-specific coaching built around real game demands.',
    overview:
      'Our catching lessons in Rocklin and El Dorado Hills help players grow into stronger leaders behind the plate. Athletes work on the technical details of the position while building the confidence, communication, and consistency that coaches and parents want to see in games.',
    section_title: 'What This Lesson Helps Build',
    focus_items: [
      'More reliable receiving, blocking, and recovery',
      'Cleaner footwork and quicker, more confident transfers',
      'Better communication and control behind the plate',
      'A catcher who can lead the game with confidence',
    ],
    form_copy:
      'Share a few details about your athlete and we will help you find the right catching lesson, coach, and next step.',
    image: '/assets/images/service-catching-4.PNG',
    image_alt: 'Catching lesson at Better Baseball Training',
    image_widths: [640, 960],
    meta_description:
      'Catching lessons in Rocklin and El Dorado Hills for youth baseball players. Improve receiving, blocking, footwork, and leadership behind the plate.',
  },
  {
    slug: 'baseball-iq',
    label: 'Baseball IQ',
    headline: 'Baseball IQ Training in Rocklin & El Dorado Hills',
    subheadline:
      'For Sacramento-area athletes who need the game to slow down, BBT teaches the awareness, preparation, and decision-making that turn raw ability into smarter play.',
    overview:
      'Our baseball IQ lessons in Rocklin and El Dorado Hills help players become more prepared, more confident, and more dependable in real game situations. Athletes learn how to recognize what is happening faster and make better decisions when it matters most.',
    section_title: 'What This Lesson Helps Build',
    focus_items: [
      'Stronger situational awareness and preparation habits',
      'Better offensive and defensive decision-making',
      'A clearer understanding of responsibilities in game moments',
      'More confidence when the pressure is on',
    ],
    form_copy:
      'Tell us about your athlete and our team will help you find the right next step for baseball IQ training and overall development.',
    image: '/assets/images/service-baseball.iq-5.PNG',
    image_alt: 'Baseball IQ lesson at Better Baseball Training',
    image_widths: [640, 960],
    meta_description:
      'Baseball IQ training in Rocklin and El Dorado Hills for youth players. Improve game awareness, decision-making, and confidence in live situations.',
  },
];
