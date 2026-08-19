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
// All five lessons are built at both locations, so every lesson page links one-to-one to its
// own variant. Every field below has to be true for that specific facility; a page that reads
// like another page with the city swapped is the failure mode this layer is supposed to avoid.
//
// What genuinely differs between the two, and therefore carries the copy:
//   Rocklin  4283 Duluth Ave · GM Cesar Tamayo · academy $250/mo · cages AND turf in one
//            building · Rocklin, Roseville, Granite Bay, Loomis
//   EDH      4990 Hillsdale Cir Ste 400 · GM Trey Furrey · academy $299/mo · fully indoor
//            turf and netting · El Dorado Hills, Folsom, Cameron Park, Shingle Springs
// Coach rosters are derived per page in the template, not written here.

export interface ServiceAreaFaq {
  question: string;
  answer: string;
}

export interface ServiceArea {
  locationKey: 'rocklin' | 'el-dorado-hills';
  lessonSlug: 'hitting' | 'pitching' | 'infield-outfield' | 'catching' | 'baseball-iq';
  /** Final path segment. Full URL is built in urls.ts from the location hub slug. */
  slug: string;
  meta_title: string;
  meta_description: string;
  kicker: string;
  headline: string;
  subheadline: string;
  meta_items: string[];
  image: string;
  /** Optimized webp variants — the originals run up to 3.6 MB. */
  image_srcset: string;
  image_alt: string;
  /** One line for the facility lesson cards on the location hubs. Kept short and specific
   *  to this page — the cards sit five-across, so a shared sentence would read as filler. */
  card_copy: string;
  /** Card-only image override. Three of the EDH pages lead with a lounge/waiting-room photo
   *  of the real facility, which works as a page hero but reads as a mistake on a 222px card
   *  captioned "Catching in El Dorado Hills". The hero stays; the card shows training space. */
  card_image?: string;
  card_image_srcset?: string;
  card_image_alt?: string;
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
    image: '/assets/optimized/service-hitting-1-960.webp',
    image_srcset:
      '/assets/optimized/service-hitting-1-640.webp 640w, /assets/optimized/service-hitting-1-960.webp 960w',
    image_alt: 'Hitting lesson in the batting cages at Better Baseball Training Rocklin',
    card_copy:
      'Coached cage work on swing path, timing, and approach — not a bucket of balls and a timer.',
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
    image: '/assets/optimized/service-pitching-2-960.webp',
    image_srcset:
      '/assets/optimized/service-pitching-2-640.webp 640w, /assets/optimized/service-pitching-2-960.webp 960w',
    image_alt: 'Pitching instruction at Better Baseball Training Rocklin',
    card_copy:
      'A delivery the player can repeat, with bullpens on indoor turf that run through the winter.',
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
          'Yes. The El Dorado Hills facility at 4990 Hillsdale Cir, Suite 400 runs pitching lessons and is the closer option for Folsom, Cameron Park, and Shingle Springs families.',
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
      'Youth hitting lessons in El Dorado Hills at 4990 Hillsdale Cir, Suite 400. Indoor swing work and academy reps for players ages 8-14U near Folsom.',
    kicker: 'Hitting Lessons · El Dorado Hills',
    headline: 'Hitting Lessons in El Dorado Hills',
    subheadline:
      'Coached swing work indoors for players ages 8-14U from El Dorado Hills, Folsom, Cameron Park, and Shingle Springs.',
    meta_items: ['4990 Hillsdale Cir', 'Near Folsom', 'Ages 8-14U'],
    image: '/assets/optimized/IMG_0607-960.webp',
    image_srcset:
      '/assets/optimized/IMG_0607-320.webp 320w, /assets/optimized/IMG_0607-960.webp 960w',
    image_alt: 'Indoor hitting training at Better Baseball Training El Dorado Hills',
    card_copy:
      'Swing path, timing, and approach coached indoors, with the plan carrying into academy reps.',
    intro_title: 'A Swing Built Indoors, Tested in Games',
    intro_copy:
      'Hitting lessons at BBT El Dorado Hills work on swing path, timing, plate discipline, and approach — the difference between a player who looks good in a cage and one who produces at-bats. Every rep is coached, and the plan carries into academy training.',
    local_title: 'Why El Dorado Hills for Hitting',
    local_copy:
      'The Hillsdale Cir facility is fully indoor with turf and netted training space, so hitting is never on hold for weather or field access. Trey Furrey, the EDH GM, brings All-America playing experience and helps families pick the right hitting coach and starting point.',
    focus_items: [
      'Coached work on swing path, timing, plate discipline, and approach',
      'Indoor turf and netting at 4990 Hillsdale Cir, Suite 400',
      'A path from private hitting lessons into academy membership at $299/month',
      'The closer facility for El Dorado Hills, Folsom, Cameron Park, and Shingle Springs',
    ],
    faq_items: [
      {
        question: 'Where do El Dorado Hills hitting lessons take place?',
        answer:
          'At 4990 Hillsdale Cir, Suite 400, El Dorado Hills, CA 95762. The facility is indoors with turf and netted training space, so lessons run year-round.',
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
          'Yes. Folsom, Cameron Park, and Shingle Springs families are closer to Hillsdale Cir than to the Rocklin facility. Rocklin is the better fit for Roseville, Granite Bay, and Loomis.',
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
    meta_items: ['4990 Hillsdale Cir', 'Former MLB Staff', 'Ages 8-14U'],
    image: '/assets/optimized/jean-machi-768.webp',
    image_srcset:
      '/assets/optimized/jean-machi-480.webp 480w, /assets/optimized/jean-machi-768.webp 768w',
    image_alt: 'Pitching coach Jean Machi at Better Baseball Training El Dorado Hills',
    card_copy:
      'Command and workload before velocity, including instruction from former MLB pitcher Jean Machi.',
    intro_title: 'Professional Instruction, Youth-Appropriate Workload',
    intro_copy:
      'Pitching lessons at BBT El Dorado Hills work on a delivery a player can repeat, command they can trust, and a workload appropriate for a developing arm. Mechanics come before velocity, and the plan is built around the athlete in front of the coach.',
    local_title: 'Why El Dorado Hills for Pitching',
    local_copy:
      'El Dorado Hills is where Jean Machi coaches — a former MLB pitcher and 2014 World Series champion who gives pitching lessons at this facility. Gabe Emmett, a former Dodgers draft pick focused on velocity development, also works here. The facility is fully indoor, so bullpens are not weather-dependent.',
    focus_items: [
      'Instruction from a former MLB pitcher and a former Dodgers draft pick',
      'Indoor turf and netted throwing space at 4990 Hillsdale Cir, Suite 400',
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
          'At 4990 Hillsdale Cir, Suite 400, El Dorado Hills, CA 95762 — indoors, on turf with netted throwing space, so bullpens run year-round.',
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
  {
    locationKey: 'rocklin',
    lessonSlug: 'infield-outfield',
    slug: 'infield-outfield',
    meta_title: `Infield & Outfield Lessons in Rocklin | ${SITE_NAME}`,
    meta_description:
      'Youth infield and outfield lessons in Rocklin at 4283 Duluth Ave. Indoor turf work on footwork, glove work, and throwing for ages 8-14U.',
    kicker: 'Infield / Outfield · Rocklin',
    headline: 'Infield & Outfield Lessons in Rocklin',
    subheadline:
      'Indoor turf work on footwork, glove work, and accurate throws for players ages 8-14U from Rocklin, Roseville, Granite Bay, and Loomis.',
    meta_items: ['4283 Duluth Ave', 'Indoor Turf', 'Ages 8-14U'],
    image: '/assets/optimized/service-inf.ouf-3-960.webp',
    image_srcset:
      '/assets/optimized/service-inf.ouf-3-640.webp 640w, /assets/optimized/service-inf.ouf-3-960.webp 960w',
    image_alt: 'Infield and outfield defensive training at Better Baseball Training Rocklin',
    card_copy:
      'Footwork, funnel, and exchange on indoor turf, so defensive reps never wait on a dry field.',
    intro_title: 'Defense Is Footwork Before It Is Hands',
    intro_copy:
      'Most missed ground balls are a footwork problem, not a glove problem. Rocklin defensive lessons work on the approach to the ball, the first step, the funnel, and the exchange — then the throw, so the whole play holds up at game speed instead of only in warm-ups.',
    local_title: 'Why Rocklin for Defense',
    local_copy:
      'The Duluth Ave building has turf and cage lanes under one roof, so a defensive lesson can move from short-hop work on turf to live reps without waiting on a field or a dry afternoon. That matters most from November through March, when outdoor infields around Placer County are unusable for weeks at a time.',
    focus_items: [
      'First-step reads, footwork, and the funnel into the exchange',
      'Short hops and in-between hops on indoor turf at 4283 Duluth Ave',
      'Throwing accuracy and arm slot from the positions players actually field',
      'Convenient for Rocklin, Roseville, Granite Bay, and Loomis families',
    ],
    faq_items: [
      {
        question: 'Where do Rocklin infield and outfield lessons take place?',
        answer:
          'On the indoor turf at 4283 Duluth Ave, Rocklin, CA 95765. Defensive work does not depend on field availability or the weather, which is the main reason families train through the winter here.',
      },
      {
        question: 'My player boots routine ground balls. What actually fixes that?',
        answer:
          'Usually the feet, not the glove. If the first step is late or the approach leaves a player fielding off the back foot, even a clean glove ends up rushed. Lessons rebuild the approach and the footwork first, then the exchange and throw on top of it.',
      },
      {
        question: 'Do you coach outfield separately from infield?',
        answer:
          'The reads are different — first step, routes, and playing through the ball on a throw — so sessions are built around the positions the athlete actually plays. Call 916-465-5551 and mention where the player is on the field.',
      },
      {
        question: 'Can you train defense indoors properly?',
        answer:
          'For footwork, hands, exchanges, and throwing mechanics, yes — those are the pieces that break down under pressure and they are best trained with high reps and immediate feedback. Full-depth outfield reads need space a batting facility cannot give, and BBT will say so rather than sell a session that cannot deliver it.',
      },
      {
        question: 'Who should we talk to about defensive lessons at Rocklin?',
        answer:
          'Cesar Tamayo is the Rocklin GM and can match a player to the right defensive coach based on position and age. He brings collegiate playing experience and a kinesiology background.',
      },
    ],
    cta_label: 'Book a Rocklin Defense Lesson',
  },
  {
    locationKey: 'el-dorado-hills',
    lessonSlug: 'infield-outfield',
    slug: 'infield-outfield',
    meta_title: `Infield & Outfield Lessons in El Dorado Hills | ${SITE_NAME}`,
    meta_description:
      'Youth infield and outfield lessons in El Dorado Hills at 4990 Hillsdale Cir. Indoor defensive training for ages 8-14U near Folsom.',
    kicker: 'Infield / Outfield · El Dorado Hills',
    headline: 'Infield & Outfield Lessons in El Dorado Hills',
    subheadline:
      'Indoor defensive training for players ages 8-14U from El Dorado Hills, Folsom, Cameron Park, and Shingle Springs.',
    meta_items: ['4990 Hillsdale Cir', 'Near Folsom', 'Ages 8-14U'],
    image: '/assets/optimized/IMG_0604-960.webp',
    image_srcset:
      '/assets/optimized/IMG_0604-320.webp 320w, /assets/optimized/IMG_0604-960.webp 960w',
    image_alt: 'Indoor turf training space at Better Baseball Training El Dorado Hills',
    card_image: '/assets/optimized/IMG_0609-960.webp',
    card_image_srcset:
      '/assets/optimized/IMG_0609-320.webp 320w, /assets/optimized/IMG_0609-960.webp 960w',
    card_image_alt: 'Indoor turf and netting used for defensive work at Better Baseball Training El Dorado Hills',
    card_copy:
      'The rep volume defense actually needs, indoors on turf and netting when fields go unplayable.',
    intro_title: 'Reps That Do Not Wait for a Dry Field',
    intro_copy:
      'Defensive skill is built on volume — the same read, the same footwork, the same exchange, enough times that it holds under pressure. EDH lessons work on approach, glove work, and throwing accuracy indoors, so the rep count does not collapse every time a field goes unplayable.',
    local_title: 'Why El Dorado Hills for Defense',
    local_copy:
      'The Hillsdale Cir facility is fully indoor turf and netting, which makes it a practical midweek option for EDH and Folsom families who would otherwise lose a session to a wet field or an early sunset. Trey Furrey, the EDH GM, brings All-America playing experience and helps families match a player to the right defensive coach.',
    focus_items: [
      'Approach, first step, and footwork into a clean exchange',
      'Indoor turf and netting at 4990 Hillsdale Cir, Suite 400',
      'Throwing accuracy from the positions the athlete actually plays',
      'The closer facility for El Dorado Hills, Folsom, Cameron Park, and Shingle Springs',
    ],
    faq_items: [
      {
        question: 'Where do EDH infield and outfield lessons take place?',
        answer:
          'At 4990 Hillsdale Cir, Suite 400, El Dorado Hills, CA 95762, on indoor turf with netted training space. Sessions run year-round regardless of field conditions.',
      },
      {
        question: 'We are in Folsom — is this the closer facility?',
        answer:
          'Yes. Folsom, Cameron Park, and Shingle Springs families are closer to Hillsdale Cir than to the Rocklin facility on Duluth Ave. BBT runs the same defensive work at both.',
      },
      {
        question: 'My player has the arm but the throws sail. Is that fixable?',
        answer:
          'Usually. Sailing throws are often a footwork and exchange problem showing up at the end of the play — a rushed transfer moves the release point. Sessions work the whole sequence rather than treating it as an arm issue.',
      },
      {
        question: 'Is defensive training useful in the offseason, or should we wait for spring?',
        answer:
          'The offseason is when it is most useful. Footwork changes need repetition before they survive a game, and doing that work in January means it is automatic by the time the season starts rather than being introduced mid-season.',
      },
      {
        question: 'How much does defensive training cost in El Dorado Hills?',
        answer:
          'Private lessons are priced per session. Academy membership at El Dorado Hills is $299 per month and includes recurring group work across defense and the other disciplines. Rocklin academy is priced separately at $250 per month.',
      },
    ],
    cta_label: 'Book an EDH Defense Lesson',
  },
  {
    locationKey: 'rocklin',
    lessonSlug: 'catching',
    slug: 'catching',
    meta_title: `Catching Lessons in Rocklin | Youth Baseball | ${SITE_NAME}`,
    meta_description:
      'Youth catching lessons in Rocklin at 4283 Duluth Ave. Receiving, blocking, and throwing to second for players ages 8-14U.',
    kicker: 'Catching · Rocklin',
    headline: 'Catching Lessons in Rocklin',
    subheadline:
      'Receiving, blocking, and throwing work for players ages 8-14U from Rocklin, Roseville, Granite Bay, and Loomis.',
    meta_items: ['4283 Duluth Ave', 'Indoor Facility', 'Ages 8-14U'],
    image: '/assets/optimized/service-catching-4-960.webp',
    image_srcset:
      '/assets/optimized/service-catching-4-640.webp 640w, /assets/optimized/service-catching-4-960.webp 960w',
    image_alt: 'Catching instruction at Better Baseball Training Rocklin',
    card_copy:
      'Receiving, blocking, and the throw to second, coached as a position instead of a volunteer job.',
    intro_title: 'The Position That Touches Every Pitch',
    intro_copy:
      'Catching is the one spot on the field involved in every single pitch, and it is usually the least coached. Rocklin catching lessons work on stance and receiving, blocking, footwork on the throw to second, and the game-management habits that make a young catcher easier for a pitcher to trust.',
    local_title: 'Why Rocklin for Catching',
    local_copy:
      'The Duluth Ave facility runs catching work indoors on turf, with the cage lanes in the same building — so a catcher can take receiving and blocking reps in a controlled space rather than borrowing time at the end of a team practice. Catching is also the position most often learned by whoever volunteers; BBT treats it as a skill set with its own coaching.',
    focus_items: [
      'Stance, glove position, and receiving that holds borderline strikes',
      'Blocking technique and recovery, trained indoors year-round',
      'Footwork and exchange on the throw to second',
      'Convenient for Rocklin, Roseville, Granite Bay, and Loomis families',
    ],
    faq_items: [
      {
        question: 'Where do Rocklin catching lessons take place?',
        answer:
          'At 4283 Duluth Ave, Rocklin, CA 95765, indoors on turf. Receiving and blocking work does not depend on field access or the weather.',
      },
      {
        question: 'My kid got put behind the plate and nobody has taught him anything. Is that normal?',
        answer:
          'Very. At 8-14U the catcher is often whoever was willing, and the position gets almost no dedicated instruction. That is exactly the gap these lessons fill — stance, receiving, and blocking taught properly rather than picked up by trial and error.',
      },
      {
        question: 'Does my player need their own gear for a lesson?',
        answer:
          'Call 916-465-5551 before the first session and the staff will tell you what to bring. Do not buy a full set of gear on the assumption it is required.',
      },
      {
        question: 'Is catching bad for a young player’s knees?',
        answer:
          'Workload and technique both matter. A catcher in a poor stance for a full season takes more of a toll than one taught to set up properly and rotate positions through a game. Coaching the stance is part of protecting the athlete, not just improving the receiving.',
      },
      {
        question: 'Can a catcher train here and still take hitting lessons?',
        answer:
          'Yes, and many do. The Rocklin building has both the turf and the cage lanes, so families often pair catching work with hitting reps, or move into academy membership at $250 per month for recurring access to both.',
      },
    ],
    cta_label: 'Book a Rocklin Catching Lesson',
  },
  {
    locationKey: 'el-dorado-hills',
    lessonSlug: 'catching',
    slug: 'catching',
    meta_title: `Catching Lessons in El Dorado Hills | ${SITE_NAME}`,
    meta_description:
      'Youth catching lessons in El Dorado Hills at 4990 Hillsdale Cir. Receiving, blocking, and throwing for ages 8-14U near Folsom.',
    kicker: 'Catching · El Dorado Hills',
    headline: 'Catching Lessons in El Dorado Hills',
    subheadline:
      'Receiving, blocking, and throwing work for players ages 8-14U from El Dorado Hills, Folsom, Cameron Park, and Shingle Springs.',
    meta_items: ['4990 Hillsdale Cir', 'Near Folsom', 'Ages 8-14U'],
    image: '/assets/optimized/IMG_0605-960.webp',
    image_srcset:
      '/assets/optimized/IMG_0605-320.webp 320w, /assets/optimized/IMG_0605-960.webp 960w',
    image_alt: 'Indoor training space at Better Baseball Training El Dorado Hills',
    card_image: '/assets/optimized/facility-edh-7-548.webp',
    card_image_srcset:
      '/assets/optimized/facility-edh-7-320.webp 320w, /assets/optimized/facility-edh-7-548.webp 548w',
    card_image_alt: 'Netted indoor training cages at Better Baseball Training El Dorado Hills',
    card_copy:
      'Receiving that holds a strike and blocking that keeps the ball in front, on a controlled surface.',
    intro_title: 'Coaching for the Position Nobody Coaches',
    intro_copy:
      'Catchers are usually taught by inheritance — the gear gets handed over and the technique is guessed at. EDH catching lessons treat it as its own skill: receiving that holds a strike, blocking that keeps the ball in front, a repeatable transfer, and the awareness to run an inning rather than just survive it.',
    local_title: 'Why El Dorado Hills for Catching',
    local_copy:
      'Hillsdale Cir is fully indoor, which makes catching one of the more practical things to train there — receiving and blocking need volume and a controlled surface far more than they need open field space. For Folsom and Cameron Park families it is the shorter drive, and Trey Furrey, the EDH GM, can point you to the right coach for the athlete.',
    focus_items: [
      'Receiving and presentation that holds borderline pitches',
      'Blocking and recovery on indoor turf at 4990 Hillsdale Cir, Suite 400',
      'Transfer and footwork on the throw to second',
      'The closer facility for El Dorado Hills, Folsom, Cameron Park, and Shingle Springs',
    ],
    faq_items: [
      {
        question: 'Where do EDH catching lessons take place?',
        answer:
          'At 4990 Hillsdale Cir, Suite 400, El Dorado Hills, CA 95762 — indoors, on turf with netted space, so sessions run through the winter.',
      },
      {
        question: 'What does a catching lesson actually cover?',
        answer:
          'Stance and receiving, blocking technique and recovery, the transfer and footwork on throws, and the game-awareness pieces — counts, situations, and working with a pitcher. Which of those gets the time depends on where the athlete is.',
      },
      {
        question: 'How does catching work fit with pitching lessons at the same facility?',
        answer:
          'They pair naturally, and El Dorado Hills is where BBT’s pitching staff includes a former MLB pitcher. Families with a catcher and a pitcher in the same household often schedule at the same facility.',
      },
      {
        question: 'What age should a player start catching lessons?',
        answer:
          'BBT’s programming is built around ages 8-14U. The earlier a catcher learns a sound stance the better, mostly because bad habits in the stance are the hardest to undo later and the hardest on the body.',
      },
      {
        question: 'Do you have catching gear at the facility?',
        answer:
          'Call 916-465-5551 before the first lesson and the staff will confirm what to bring rather than have you buy a set you may not need.',
      },
    ],
    cta_label: 'Book an EDH Catching Lesson',
  },
  {
    locationKey: 'rocklin',
    lessonSlug: 'baseball-iq',
    slug: 'baseball-iq',
    meta_title: `Baseball IQ Training in Rocklin | Youth Baseball | ${SITE_NAME}`,
    meta_description:
      'Baseball IQ training in Rocklin at 4283 Duluth Ave. Situations, baserunning, and decision-making for youth players ages 8-14U.',
    kicker: 'Baseball IQ · Rocklin',
    headline: 'Baseball IQ Training in Rocklin',
    subheadline:
      'Situational reads, baserunning, and decision-making for players ages 8-14U from Rocklin, Roseville, Granite Bay, and Loomis.',
    meta_items: ['4283 Duluth Ave', 'Situations + Baserunning', 'Ages 8-14U'],
    image: '/assets/optimized/service-baseball.iq-5-960.webp',
    image_srcset:
      '/assets/optimized/service-baseball.iq-5-640.webp 640w, /assets/optimized/service-baseball.iq-5-960.webp 960w',
    image_alt: 'Youth baseball player training inside Better Baseball Training Rocklin',
    card_copy:
      'Situational reads and baserunning walked through in the session, not just explained on a board.',
    intro_title: 'The Player Who Always Seems to Know Where to Throw',
    intro_copy:
      'Two players with the same swing and the same arm can be worth very different amounts to a team, and the gap is usually decision-making. Rocklin baseball IQ work covers where the ball goes before it is hit to you, when to take an extra base, how counts change an at-bat, and how to read a pitcher from first.',
    local_title: 'Why Rocklin for Baseball IQ',
    local_copy:
      'The Rocklin facility runs baserunning and basestealing work alongside situational instruction, so the reads are practised rather than only explained — a player can walk through a lead, a secondary, and a first-step read in the same session they learn why it matters. It is also the skill families most often add once a player has the physical tools but is still guessing in games.',
    focus_items: [
      'Situations: where the ball goes, cutoffs, and who covers what',
      'Baserunning and basestealing reads, trained at 4283 Duluth Ave',
      'Count awareness and how it changes an at-bat',
      'Convenient for Rocklin, Roseville, Granite Bay, and Loomis families',
    ],
    faq_items: [
      {
        question: 'What is baseball IQ training, concretely?',
        answer:
          'Coached work on the decisions rather than the mechanics: pre-pitch positioning, where the throw goes, cutoffs and backups, baserunning reads, count awareness, and situational hitting. It is the part of the game most youth practices run out of time for.',
      },
      {
        question: 'Where does Rocklin baseball IQ training take place?',
        answer:
          'At 4283 Duluth Ave, Rocklin, CA 95765. Sessions combine instruction with reps indoors, including baserunning and basestealing work.',
      },
      {
        question: 'My player has the tools but freezes in games. Is this the right thing?',
        answer:
          'Often, yes. Freezing is usually uncertainty rather than nerves — a player who has not rehearsed the decision has to work it out while the play is happening. Rehearsing the reads is what makes the reaction automatic.',
      },
      {
        question: 'Is this just a classroom session?',
        answer:
          'No. The reads are practised on the turf, not lectured. A player who can recite where the ball goes but has never done it at speed still hesitates in a game.',
      },
      {
        question: 'Who coaches baseball IQ at Rocklin?',
        answer:
          'Jon Peters, the BBT owner, oversees player-development programming across both facilities, with Kris Krise and Justin Watari also working with Rocklin players. Cesar Tamayo, the Rocklin GM, can help pick the right fit.',
      },
    ],
    cta_label: 'Book Rocklin Baseball IQ Training',
  },
  {
    locationKey: 'el-dorado-hills',
    lessonSlug: 'baseball-iq',
    slug: 'baseball-iq',
    meta_title: `Baseball IQ Training in El Dorado Hills | ${SITE_NAME}`,
    meta_description:
      'Baseball IQ training in El Dorado Hills at 4990 Hillsdale Cir. Situational reads and decision-making for ages 8-14U near Folsom.',
    kicker: 'Baseball IQ · El Dorado Hills',
    headline: 'Baseball IQ Training in El Dorado Hills',
    subheadline:
      'Situational reads and better decisions for players ages 8-14U from El Dorado Hills, Folsom, Cameron Park, and Shingle Springs.',
    meta_items: ['4990 Hillsdale Cir', 'Near Folsom', 'Ages 8-14U'],
    image: '/assets/optimized/IMG_0609-960.webp',
    image_srcset:
      '/assets/optimized/IMG_0609-320.webp 320w, /assets/optimized/IMG_0609-960.webp 960w',
    image_alt: 'Player development training at Better Baseball Training El Dorado Hills',
    card_image: '/assets/optimized/facility-edh-3-359.webp',
    card_image_alt: 'Coach-led group training session on the turf at Better Baseball Training El Dorado Hills',
    card_copy:
      'Pre-pitch thinking and an honest readiness read from EDH GM Trey Furrey before the next roster.',
    intro_title: 'Where Travel-Ball Readiness Actually Gets Decided',
    intro_copy:
      'When families ask whether a player is ready for a more competitive team, the honest answer usually turns on decision-making rather than tools. EDH baseball IQ work covers pre-pitch thinking, situational responsibility, count awareness, and the habits that separate a player who can be trusted in a close inning from one who cannot.',
    local_title: 'Why El Dorado Hills for Baseball IQ',
    local_copy:
      'Trey Furrey, the EDH GM, runs programming at Hillsdale Cir and brings All-America playing experience to the readiness conversation — useful for families weighing travel baseball, since the honest read on an athlete usually comes from watching them train rather than from a tryout. The facility is fully indoor, so this work carries through the offseason when the decisions are actually being made.',
    focus_items: [
      'Pre-pitch positioning, cutoffs, and situational responsibility',
      'Count awareness and approach at the plate',
      'Indoor sessions at 4990 Hillsdale Cir, Suite 400, year-round',
      'The closer facility for El Dorado Hills, Folsom, Cameron Park, and Shingle Springs',
    ],
    faq_items: [
      {
        question: 'Where does EDH baseball IQ training take place?',
        answer:
          'At 4990 Hillsdale Cir, Suite 400, El Dorado Hills, CA 95762, indoors on turf, so the work continues through the offseason.',
      },
      {
        question: 'Does this help decide whether our player is ready for travel ball?',
        answer:
          'It is one of the better ways to find out. Readiness is mostly about executing consistently and handling a bigger workload, not about being among the better players on a current team. Staff can give an honest read after seeing an athlete train.',
      },
      {
        question: 'Our player is smart but slow to react on the field. Same problem?',
        answer:
          'Usually a different one. Understanding a situation and having rehearsed it are not the same thing — reaction time comes from having made the decision before, not from knowing the rule. The sessions target the rehearsal.',
      },
      {
        question: 'How does this fit with academy membership?',
        answer:
          'El Dorado Hills academy membership is $299 per month and covers recurring group training including baseball IQ work. Families often use private sessions for a specific gap and the academy for consistent reps between them.',
      },
      {
        question: 'Who coaches baseball IQ in El Dorado Hills?',
        answer:
          'Trey Furrey, the EDH GM, along with Jon Peters, Kris Krise, and Justin Watari across the player-development staff. Call 916-465-5551 to check current availability.',
      },
    ],
    cta_label: 'Book EDH Baseball IQ Training',
  },
];

export function serviceAreasForLocation(locationKey: string): ServiceArea[] {
  return serviceAreas.filter((a) => a.locationKey === locationKey);
}

export function serviceAreasForLesson(lessonSlug: string): ServiceArea[] {
  return serviceAreas.filter((a) => a.lessonSlug === lessonSlug);
}
