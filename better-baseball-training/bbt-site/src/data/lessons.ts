export interface LessonFaq {
  question: string;
  answer: string;
}

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
  // Per-lesson questions, merged with the shared structural ones in lessons/[slug].astro.
  // These must stay genuinely different between lessons — five pages sharing one FAQ block
  // with the service name swapped is the duplicate pattern that gets pages deindexed.
  // Phrased as problems and scenarios, since that is how families actually search.
  faq_items: LessonFaq[];
  // Variant names and related terms people use for this service, so the page can catch
  // the range of phrasings. Rendered as a plain line of copy, not a keyword dump.
  also_called: string[];
}

export const lessons: Lesson[] = [
  {
    slug: 'hitting',
    label: 'Hitting',
    headline: 'Youth Hitting Lessons Near You',
    subheadline:
      'Whether your athlete needs cleaner mechanics, better timing, or more confidence in the box, Better Baseball Training gives players focused instruction and a clear plan for better at-bats.',
    overview:
      'Our hitting lessons are built for players who need more than random reps. We help athletes build swings they can trust, develop a stronger approach at the plate, and carry more confidence into games.',
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
      'Hitting lessons for youth baseball players. Build a more confident swing, better timing, and stronger at-bats at Better Baseball Training.',
    also_called: ['batting lessons', 'swing lessons', 'hitting coach', 'batting instruction', 'swing mechanics training'],
    faq_items: [
      {
        question: 'My player keeps making weak contact. Can hitting lessons help?',
        answer:
          'Yes. Weak contact usually traces back to swing path, timing, or approach rather than effort. Hitting lessons at BBT work on building a repeatable swing and a better plan at the plate so contact quality improves instead of staying random.',
      },
      {
        question: 'What is the difference between a hitting lesson and open cage time?',
        answer:
          'Cage time is reps without feedback. A hitting lesson is coached work where someone is watching the swing, correcting it, and building a plan. BBT uses its cages as part of structured lessons and academy training rather than as drop-in rental.',
      },
      {
        question: 'My player hits well in practice but not in games. What causes that?',
        answer:
          'That gap is usually timing and approach under pressure rather than mechanics. BBT works on building a swing a player can repeat in game situations, along with plate discipline and a clearer approach at the plate.',
      },
      {
        question: 'Do hitting lessons cover bat speed and timing, or only swing mechanics?',
        answer:
          'Both. Sessions cover swing mechanics, timing, plate discipline, and overall approach, because a mechanically clean swing on the wrong pitch still produces a poor at-bat.',
      },
      {
        question: 'Should we start hitting lessons in the offseason or during the season?',
        answer:
          'Either works. BBT trains indoors year-round, so families start at different points depending on the athlete. Call 916-465-5551 and the staff can recommend a starting point based on your schedule.',
      },
    ],
  },
  {
    slug: 'pitching',
    label: 'Pitching',
    headline: 'Youth Pitching Lessons Near You',
    subheadline:
      'If your athlete needs better mechanics, more command, or a clearer plan on the mound, BBT provides pitching coaching that supports both performance and long-term development.',
    overview:
      'Our pitching lessons help players throw with more intent, better control, and greater confidence under pressure. We focus on building healthy, repeatable movement patterns so athletes can compete now and keep improving over time.',
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
      'Pitching lessons for youth baseball players. Improve command, mechanics, arm care, and mound confidence at Better Baseball Training.',
    also_called: ['pitching coach', 'throwing lessons', 'mound work', 'pitching mechanics training', 'arm care training'],
    faq_items: [
      {
        question: 'My pitcher throws strikes in practice but loses command in games. Can lessons help?',
        answer:
          'Yes. That pattern usually means the delivery is not yet repeatable under pressure. BBT pitching lessons focus on mechanics a player can repeat, along with the poise and routine that hold up in a game rather than only in a bullpen.',
      },
      {
        question: 'Do pitching lessons cover arm care, or only mechanics and velocity?',
        answer:
          'Arm care is part of the work. Sessions cover healthy, repeatable movement patterns and arm care habits alongside command and velocity, so a player can compete now without trading away later development.',
      },
      {
        question: 'Do you work on adding velocity?',
        answer:
          'Yes, as part of a broader plan rather than in isolation. BBT works toward velocity through movement quality and mechanics, which is what makes added velocity repeatable instead of a one-off jump.',
      },
      {
        question: 'Who coaches pitching at BBT?',
        answer:
          'The pitching staff includes coaches with professional playing backgrounds, among them Jean Machi, a former Major League pitcher, and Gabe Emmett, a pro alumni pitching coach.',
      },
      {
        question: 'What age should a player start pitching lessons?',
        answer:
          'The core BBT pitching model is built for players ages 8-14U. Families with a player outside that range can call 916-465-5551 to ask what makes sense.',
      },
    ],
  },
  {
    slug: 'infield-outfield',
    label: 'Infield / Outfield',
    headline: 'Youth Infield & Outfield Lessons Near You',
    subheadline:
      'For players who need better footwork, cleaner reads, and more confidence on defense, BBT delivers instruction that helps the game slow down and performance speed up.',
    overview:
      'Our infield and outfield lessons help athletes become more dependable defenders. Players learn how to move with purpose, react faster, and make better decisions so they can play with more confidence when the ball is hit their way.',
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
      'Infield and outfield lessons for youth baseball players. Improve footwork, reads, positioning, and defensive confidence at Better Baseball Training.',
    also_called: ['fielding lessons', 'defense training', 'ground ball work', 'outfield reads', 'glove work'],
    faq_items: [
      {
        question: 'My player freezes on ground balls. What does infield training work on?',
        answer:
          'Freezing is usually a first-step and footwork problem rather than a fear problem. Infield work at BBT builds cleaner footwork, faster first-step reactions, and the glove work and throwing decisions that follow the initial read.',
      },
      {
        question: 'Do you coach infield and outfield separately?',
        answer:
          'This lesson covers both. The underlying skills overlap heavily, and BBT tailors the session to the positions the player actually plays rather than splitting it artificially.',
      },
      {
        question: 'What do "reads and routes" mean in outfield training?',
        answer:
          'A read is the judgment a fielder makes off the bat, and the route is the path they take to the ball. Both are trainable, and they are usually the difference between an outfielder who arrives in time and one who does not.',
      },
      {
        question: 'Does defensive training include throwing and glove work?',
        answer:
          'Yes. Sessions cover glove work, throwing decisions, positioning, and defensive awareness, not just the initial fielding action.',
      },
      {
        question: 'Can a player work on defense and hitting in the same plan?',
        answer:
          'Yes. BBT builds development plans across skills, so families can combine defensive work with hitting, pitching, or catching depending on what the athlete needs most.',
      },
    ],
  },
  {
    slug: 'catching',
    label: 'Catching',
    headline: 'Youth Catching Lessons Near You',
    subheadline:
      'If your athlete wants to become more reliable, more confident, and more complete as a catcher, BBT offers position-specific coaching built around real game demands.',
    overview:
      'Our catching lessons help players grow into stronger leaders behind the plate. Athletes work on the technical details of the position while building the confidence, communication, and consistency that coaches and parents want to see in games.',
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
      'Catching lessons for youth baseball players. Improve receiving, blocking, footwork, and leadership behind the plate at Better Baseball Training.',
    also_called: ['catcher training', 'receiving and framing', 'blocking drills', 'pop time training', 'catcher footwork'],
    faq_items: [
      {
        question: 'Is catching training different from general defensive lessons?',
        answer:
          'Yes. Catching is a position with its own mechanics and its own game responsibilities, so BBT trains it as position-specific work rather than folding it into general infield or outfield instruction.',
      },
      {
        question: 'What does catching training actually cover?',
        answer:
          'Receiving, blocking, recovery, footwork, and transfers, plus the communication and control that a catcher is responsible for during a game.',
      },
      {
        question: 'My catcher is slow on throws to second. Is transfer work covered?',
        answer:
          'Yes. Cleaner footwork and quicker, more confident transfers are a core part of the lesson, since most throwing-time problems come from the exchange rather than arm strength.',
      },
      {
        question: 'Do catching lessons cover the leadership side of the position?',
        answer:
          'Yes. Communication, control behind the plate, and leading the game are trained alongside the technical skills, because a catcher who cannot direct a defense is only doing half the job.',
      },
      {
        question: 'What age can a player start catching lessons?',
        answer:
          'The BBT catching model is built for players ages 8-14U. Call 916-465-5551 if your athlete falls outside that range and you want a recommendation.',
      },
    ],
  },
  {
    slug: 'baseball-iq',
    label: 'Baseball IQ',
    headline: 'Youth Baseball IQ Training Near You',
    subheadline:
      'For athletes who need the game to slow down, BBT teaches the awareness, preparation, and decision-making that turn raw ability into smarter play.',
    overview:
      'Our baseball IQ lessons help players become more prepared, more confident, and more dependable in real game situations. Athletes learn how to recognize what is happening faster and make better decisions when it matters most.',
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
      'Baseball IQ training for youth baseball players. Improve game awareness, decision-making, and confidence in live situations at Better Baseball Training.',
    also_called: ['game awareness training', 'baseball smarts', 'situational baseball', 'baserunning and basestealing', 'mental side of baseball'],
    faq_items: [
      {
        question: 'What is baseball IQ training?',
        answer:
          'Baseball IQ training is coaching the decision-making side of the game: recognizing situations faster, knowing your responsibility before the pitch, and choosing the right play. It is the part of baseball that does not show up in a swing or a throw.',
      },
      {
        question: 'My player has the tools but makes mental mistakes. Does this help?',
        answer:
          'That is exactly what this is for. Physical ability and game awareness are separate skills, and a player can be athletic and still be a step late because they are reacting instead of anticipating.',
      },
      {
        question: 'Does baseball IQ training include baserunning and basestealing?',
        answer:
          'Yes. Baserunning and basestealing are decision-heavy skills, and BBT includes them alongside offensive and defensive situational work.',
      },
      {
        question: 'How is this different from a hitting or pitching lesson?',
        answer:
          'A hitting or pitching lesson trains skill execution. Baseball IQ training trains the read and the decision that happen before the skill is used. Most players need both, in different proportions.',
      },
      {
        question: 'What ages benefit most from baseball IQ training?',
        answer:
          'The BBT model is built for players ages 8-14U, which is when players start being asked to make their own reads rather than being positioned by a coach on every pitch.',
      },
    ],
  },
];
