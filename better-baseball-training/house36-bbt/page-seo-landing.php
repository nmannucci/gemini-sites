<?php
if (! defined('ABSPATH')) {
    exit;
}

$page = house36_bbt_get_current_seo_page();

if (! is_array($page)) {
    status_header(404);
    nocache_headers();
    include get_404_template();
    return;
}

$image_widths = $page['image_widths'] ?? array(640, 960);
$image_src = house36_bbt_asset_variant_url($page['image'], $image_widths[0]) ?: house36_bbt_asset($page['image']);
$image_srcset = house36_bbt_asset_srcset($page['image'], $image_widths);
$image_dimensions = house36_bbt_asset_dimensions($page['image']);
$related_links = house36_bbt_related_link_items($page['related_links'] ?? array());
$locations = house36_bbt_locations_data();
$schema_location_ids = array(
    'rocklin'          => home_url('/#rocklin-location'),
    'el-dorado-hills' => home_url('/#edh-location'),
);

$faq_items = array_map(
    static function ($item) {
        return array(
            'question' => $item['question'] ?? '',
            'answer'   => $item['answer'] ?? '',
        );
    },
    is_array($page['faq_items'] ?? null) ? $page['faq_items'] : array()
);

$faq_schema = null;

if (! empty($faq_items)) {
    $faq_schema = array(
        '@context'   => 'https://schema.org',
        '@type'      => 'FAQPage',
        'mainEntity' => array_map(
            static function ($item) {
                return array(
                    '@type'          => 'Question',
                    'name'           => $item['question'],
                    'acceptedAnswer' => array(
                        '@type' => 'Answer',
                        'text'  => $item['answer'],
                    ),
                );
            },
            $faq_items
        ),
    );
}

$schema_locations = array();
$area_served = array();

foreach ((array) ($page['schema_locations'] ?? array()) as $location_key) {
    if (isset($schema_location_ids[$location_key])) {
        $schema_locations[] = array(
            '@id' => $schema_location_ids[$location_key],
        );
    }

    if (isset($locations[$location_key])) {
        $area_served[] = array(
            '@type' => 'City',
            'name'  => $locations[$location_key]['name'],
        );
    }
}

$service_schema = array(
    '@context'            => 'https://schema.org',
    '@type'               => $page['schema_type'] ?? 'Service',
    '@id'                 => untrailingslashit($page['url']) . '#service',
    'name'                => $page['title'],
    'serviceType'         => $page['service_type'] ?? $page['title'],
    'description'         => $page['meta_description'],
    'url'                 => $page['url'],
    'provider'            => array(
        '@id' => home_url('/#organization'),
    ),
    'audience'            => array(
        '@type'           => 'PeopleAudience',
        'suggestedMinAge' => 8,
        'suggestedMaxAge' => 14,
    ),
);

if (! empty($area_served)) {
    $service_schema['areaServed'] = $area_served;
}

if (! empty($schema_locations)) {
    $service_schema['availableAtOrFrom'] = $schema_locations;
}

$story_page_slugs = array('baseball-lessons-rocklin', 'baseball-lessons-el-dorado-hills', 'baseball-academy', 'travel-baseball');
$is_story_page = in_array($page['slug'] ?? '', $story_page_slugs, true);

$story_gallery_map = array(
    'baseball-lessons-rocklin' => array(
        array('image' => 'images/facility-img-1.jpg', 'alt' => 'Rocklin batting cages and training space at Better Baseball Training', 'label' => 'Rocklin Facility'),
        array('image' => 'images/service-hitting-1.PNG', 'alt' => 'Hitting lesson reps at Better Baseball Training Rocklin', 'label' => 'Hitting Lessons'),
        array('image' => 'images/service-pitching-2.PNG', 'alt' => 'Pitching instruction at Better Baseball Training Rocklin', 'label' => 'Pitching Work'),
        array('image' => 'images/team-photo-1.jpg', 'alt' => 'Better Baseball Training youth baseball team in Rocklin', 'label' => 'Game Confidence'),
    ),
    'baseball-lessons-el-dorado-hills' => array(
        array('image' => 'images/IMG_0607.jpg', 'alt' => 'El Dorado Hills indoor baseball training facility at Better Baseball Training', 'label' => 'EDH Facility'),
        array('image' => 'images/service-pitching-2.PNG', 'alt' => 'Pitching lesson work at Better Baseball Training El Dorado Hills', 'label' => 'Pitching Lessons'),
        array('image' => 'images/service-catching-4.PNG', 'alt' => 'Catching instruction at Better Baseball Training El Dorado Hills', 'label' => 'Catching Development'),
        array('image' => 'images/hero-slideshow-4.PNG', 'alt' => 'Youth baseball player training at Better Baseball Training', 'label' => 'Player Development'),
    ),
    'baseball-academy' => array(
        array('image' => 'images/hero-slideshow-4.PNG', 'alt' => 'Youth baseball academy training at Better Baseball Training', 'label' => 'Academy Reps'),
        array('image' => 'images/service-hitting-1.PNG', 'alt' => 'Hitting development inside Better Baseball Training academy', 'label' => 'Hitting Development'),
        array('image' => 'images/service-pitching-2.PNG', 'alt' => 'Pitching work at Better Baseball Training academy', 'label' => 'Pitching Work'),
        array('image' => 'images/IMG_0607.jpg', 'alt' => 'El Dorado Hills training facility at Better Baseball Training', 'label' => 'EDH Facility'),
    ),
    'travel-baseball'  => array(
        array('image' => 'images/hero-slideshow-2.PNG', 'alt' => 'Better Baseball Training youth players preparing for competitive baseball', 'label' => 'Team Development'),
        array('image' => 'images/team-photo-1.jpg', 'alt' => 'Better Baseball Training youth baseball team photo', 'label' => 'Tournament Confidence'),
        array('image' => 'images/hero-slideshow-3.PNG', 'alt' => 'Better Baseball Training players after competition', 'label' => 'Competitive Moments'),
        array('image' => 'images/team-photo-4.jpg', 'alt' => 'Better Baseball Training players and coaches during travel baseball development', 'label' => 'Player Growth'),
    ),
);

$story_snapshots_map = array(
    'baseball-lessons-rocklin' => array(
        array('label' => 'Location', 'value' => 'Rocklin'),
        array('label' => 'Address', 'value' => '4283 Duluth Ave'),
        array('label' => 'Best Fit', 'value' => 'Ages 8-14U'),
        array('label' => 'Format', 'value' => 'Private + Group'),
    ),
    'baseball-lessons-el-dorado-hills' => array(
        array('label' => 'Location', 'value' => 'El Dorado Hills'),
        array('label' => 'Address', 'value' => '4990 Hillsdale Dr'),
        array('label' => 'Best Fit', 'value' => 'Ages 8-14U'),
        array('label' => 'Format', 'value' => 'Academy + Lessons'),
    ),
    'baseball-academy' => array(
        array('label' => 'Rocklin', 'value' => '$250/mo'),
        array('label' => 'EDH', 'value' => '$299/mo'),
        array('label' => 'Best Fit', 'value' => 'Ages 8-14U'),
        array('label' => 'Format', 'value' => 'Unlimited Access'),
    ),
    'travel-baseball'  => array(
        array('label' => 'Best Fit', 'value' => 'Ages 8-14U'),
        array('label' => 'Area', 'value' => 'Sacramento'),
        array('label' => 'Focus', 'value' => 'Development First'),
        array('label' => 'Path', 'value' => 'Lessons + Academy'),
    ),
);

$story_steps_map = array(
    'baseball-lessons-rocklin' => array(
        array('label' => 'Assess', 'title' => 'Start With the Player', 'copy' => 'Coaches look at age, goals, confidence, and current skill needs before recommending the right first lesson.'),
        array('label' => 'Focus', 'title' => 'Pick the Skill Path', 'copy' => 'Families can begin with hitting, pitching, catching, defense, baseball IQ, or a broader player-development plan.'),
        array('label' => 'Train', 'title' => 'Use the Facility for Real Reps', 'copy' => 'Rocklin gives players indoor space for cage work, turf work, and guided reps that can stay consistent year-round.'),
        array('label' => 'Plan', 'title' => 'Choose the Next Step', 'copy' => 'BBT helps families decide whether the next move is another lesson, academy training, or a team-development path.'),
    ),
    'baseball-lessons-el-dorado-hills' => array(
        array('label' => 'Assess', 'title' => 'Start With the Player', 'copy' => 'BBT starts by understanding what the athlete needs now, from mechanics and confidence to game awareness.'),
        array('label' => 'Match', 'title' => 'Choose the Right Coach', 'copy' => 'Families can connect with coaches across hitting, pitching, catching, defense, baseball IQ, and player development.'),
        array('label' => 'Develop', 'title' => 'Build a Training Rhythm', 'copy' => 'EDH lessons can stand alone or connect into academy training for players who need more consistent structure.'),
        array('label' => 'Grow', 'title' => 'Keep the Path Clear', 'copy' => 'The goal is simple: give families a stronger read on what the player should work on next and why it matters.'),
    ),
    'baseball-academy' => array(
        array('label' => 'Assess', 'title' => 'Start With the Player', 'copy' => 'Coaches look at age, skill level, confidence, and goals before recommending the right academy rhythm.'),
        array('label' => 'Rhythm', 'title' => 'Build Weekly Reps', 'copy' => 'Membership gives players a consistent place to train instead of waiting for occasional private lessons to create progress.'),
        array('label' => 'Develop', 'title' => 'Stack Skill Work', 'copy' => 'Players rotate through hitting, pitching, catching, defense, and baseball IQ work based on what they need next.'),
        array('label' => 'Review', 'title' => 'Choose the Next Step', 'copy' => 'Families get clearer direction on when to add lessons, team development, or a more competitive baseball path.'),
    ),
    'travel-baseball'  => array(
        array('label' => 'Build', 'title' => 'Clean Up the Base', 'copy' => 'Players need reliable skills first, so BBT starts with the swing, arm, glove, and decision-making habits that travel baseball exposes.'),
        array('label' => 'Speed', 'title' => 'Train Closer to Game Pace', 'copy' => 'Coaches connect mechanics to timing, pressure, communication, and the faster decisions players face against stronger competition.'),
        array('label' => 'Role', 'title' => 'Find the Player Fit', 'copy' => 'Training helps families understand where the athlete can contribute now and what has to improve for the next roster.'),
        array('label' => 'Path', 'title' => 'Plan the Next Move', 'copy' => 'The goal is readiness, not a vague tournament promise, with lessons and academy work supporting long-term player growth.'),
    ),
);

$story_note_map = array(
    'baseball-lessons-rocklin'          => 'A local training base for private lessons, group reps, and a clearer development plan.',
    'baseball-lessons-el-dorado-hills' => 'A complete EDH training option for lessons, academy work, and position-specific development.',
    'baseball-academy'                 => 'Consistent reps that turn occasional progress into a real training rhythm.',
    'travel-baseball'                  => 'Training that prepares players for the speed of stronger baseball.',
);

$story_process_heading_map = array(
    'baseball-lessons-rocklin'          => 'A Clear Path From First Lesson to Better Game Reps',
    'baseball-lessons-el-dorado-hills' => 'A Lesson Path Built Around the Player',
    'baseball-academy'                 => 'A Weekly System for Player Development',
    'travel-baseball'                  => 'A Clearer Path Toward Competitive Baseball',
);

$story_process_copy_map = array(
    'baseball-lessons-rocklin'          => 'Rocklin lessons are built to help families move from scattered reps to a plan the athlete can actually follow.',
    'baseball-lessons-el-dorado-hills' => 'EDH lessons give families a nearby training option with enough structure to connect skill work to long-term growth.',
    'baseball-academy'                 => 'Academy membership works best when players need frequent, guided reps and families want a clearer development plan.',
    'travel-baseball'                  => 'The page is built around readiness: what a player needs to handle tougher competition, communicate better, and keep developing.',
);

$story_location_heading_map = array(
    'baseball-lessons-rocklin'          => 'Rocklin Training With a Full BBT Path Behind It',
    'baseball-lessons-el-dorado-hills' => 'EDH Lessons Connected to the Bigger Training System',
    'baseball-academy'                 => 'Two Facilities, One Development Standard',
    'travel-baseball'                  => 'Built Around the Player Before the Roster',
);

$story_location_copy_map = array(
    'baseball-lessons-rocklin'          => 'The Rocklin facility gives players a consistent place for lesson work while still connecting families to academy training, coaches, and team-development options when the athlete is ready.',
    'baseball-lessons-el-dorado-hills' => 'The El Dorado Hills facility gives families a local place to start with lessons, then build toward academy training, coach matching, or more competitive baseball when it fits.',
    'baseball-academy'                 => 'Families can train in Rocklin or El Dorado Hills while keeping the same development philosophy: consistent reps, specific feedback, and a next step that fits the athlete.',
    'travel-baseball'                  => 'BBT uses lessons, academy training, and coach feedback to help players understand what competitive baseball asks of them before families chase the next team label.',
);

$story_gallery = $story_gallery_map[$page['slug']] ?? array(
    array('image' => $page['image'], 'alt' => $page['image_alt'], 'label' => $page['title']),
    array('image' => 'images/facility-img-1.jpg', 'alt' => 'Better Baseball Training indoor facility', 'label' => 'Facility'),
    array('image' => 'images/hero-slideshow-4.PNG', 'alt' => 'Youth baseball training inside Better Baseball Training', 'label' => 'Training'),
    array('image' => 'images/team-photo-1.jpg', 'alt' => 'Better Baseball Training youth team', 'label' => 'Team'),
);
$story_snapshots = $story_snapshots_map[$page['slug']] ?? array();
$story_steps = $story_steps_map[$page['slug']] ?? array();
$story_note = $story_note_map[$page['slug']] ?? 'Focused reps, coach feedback, and a clear next step for players who want training to show up in games.';
$story_process_heading = $story_process_heading_map[$page['slug']] ?? 'A Clear Path From First Rep to Game Rep';
$story_process_copy = $story_process_copy_map[$page['slug']] ?? 'Each training path is designed to give families more clarity, not just more swings, throws, or drills.';
$story_location_heading = $story_location_heading_map[$page['slug']] ?? 'Matched to the Player, Not a Generic Training Slot';
$story_location_copy = $story_location_copy_map[$page['slug']] ?? 'BBT uses the player inquiry form to understand the athlete first, then helps families choose the right coach, location, and training rhythm.';
$story_hero_background = house36_bbt_asset_variant_url($story_gallery[0]['image'] ?? $page['image'], 960) ?: house36_bbt_asset($story_gallery[0]['image'] ?? $page['image']);

if (! function_exists('house36_bbt_seo_gallery_image')) {
    function house36_bbt_seo_gallery_image($item, $class = '', $loading = 'lazy') {
        $image = $item['image'] ?? '';
        $alt = $item['alt'] ?? '';
        $src = house36_bbt_asset_variant_url($image, 640) ?: house36_bbt_asset($image);
        $srcset = house36_bbt_asset_srcset($image, array(320, 640, 960));
        $dimensions = house36_bbt_asset_dimensions($image);

        return sprintf(
            '<img src="%1$s"%2$s sizes="(max-width: 768px) 100vw, 42vw" alt="%3$s" class="%4$s" loading="%5$s" decoding="async"%6$s />',
            esc_url($src),
            $srcset ? sprintf(' srcset="%s"', esc_attr($srcset)) : '',
            esc_attr($alt),
            esc_attr($class),
            esc_attr($loading),
            $dimensions ? sprintf(' width="%d" height="%d"', absint($dimensions[0]), absint($dimensions[1])) : ''
        );
    }
}

get_header();
?>
<?php if ($is_story_page) : ?>
<main id="main-content" class="seo-landing-page seo-story-page ls-page">
  <section
    class="ls-picture-hero seo-picture-hero reveal"
    style="--lesson-hero-bg: url('<?php echo esc_url($story_hero_background); ?>');"
  >
    <div class="ls-picture-hero__inner">
      <div class="ls-picture-hero__copy">
        <div class="ls-hero__kicker"><?php echo esc_html($page['kicker']); ?></div>
        <h1 class="ls-hero__title"><?php echo esc_html($page['headline']); ?></h1>
        <p class="ls-hero__copy"><?php echo esc_html($page['subheadline']); ?></p>
        <?php if (! empty($page['meta_items']) && is_array($page['meta_items'])) : ?>
          <div class="ls-hero__meta" aria-label="<?php esc_attr_e('Program details', 'house36-bbt'); ?>">
            <?php foreach ($page['meta_items'] as $item) : ?>
              <span><?php echo esc_html($item); ?></span>
            <?php endforeach; ?>
          </div>
        <?php endif; ?>
        <div class="ls-hero__actions">
          <a href="#seo-story-form" class="membership-cta">Start the Player Form</a>
          <a href="<?php echo esc_url(house36_bbt_schedule_url()); ?>" class="cta-box-secondary-link">View Schedule</a>
        </div>
      </div>
      <div class="ls-picture-hero__panel" aria-label="<?php esc_attr_e('Program quick facts', 'house36-bbt'); ?>">
        <span><?php echo esc_html($story_gallery[0]['label'] ?? $page['title']); ?></span>
        <strong><?php echo esc_html($page['title']); ?></strong>
        <p><?php echo esc_html($page['intro_copy']); ?></p>
      </div>
    </div>
  </section>

  <?php if (! empty($story_snapshots)) : ?>
    <section class="ls-snapshot reveal" aria-label="<?php esc_attr_e('Program snapshot', 'house36-bbt'); ?>">
      <?php foreach ($story_snapshots as $snapshot) : ?>
        <div class="ls-snapshot__item">
          <span><?php echo esc_html($snapshot['label']); ?></span>
          <strong><?php echo esc_html($snapshot['value']); ?></strong>
        </div>
      <?php endforeach; ?>
    </section>
  <?php endif; ?>

  <section class="ls-overview ls-overview--story">
    <div class="ls-overview__inner reveal">
      <div class="ls-overview__content">
        <div class="ls-section-label"><?php echo esc_html($page['intro_label']); ?></div>
        <h2 class="ls-section-title"><?php echo esc_html($page['intro_title']); ?></h2>
        <p class="ls-overview__text"><?php echo esc_html($page['intro_copy']); ?></p>

        <?php if (! empty($page['focus_items']) && is_array($page['focus_items'])) : ?>
          <ul class="ls-focus-list">
            <?php foreach ($page['focus_items'] as $item) : ?>
              <li><?php echo esc_html($item); ?></li>
            <?php endforeach; ?>
          </ul>
        <?php endif; ?>
      </div>

      <div class="ls-photo-panel">
        <figure>
          <?php echo house36_bbt_seo_gallery_image($story_gallery[3] ?? $story_gallery[0], 'ls-photo-panel__img'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
          <figcaption><?php echo esc_html($story_gallery[3]['label'] ?? $story_gallery[0]['label'] ?? $page['title']); ?></figcaption>
        </figure>
        <div class="ls-photo-panel__note">
          <span>BBT Flow</span>
          <strong><?php echo esc_html($story_note); ?></strong>
        </div>
      </div>
    </div>
  </section>

  <?php if (! empty($story_steps)) : ?>
    <section class="ls-process reveal" aria-labelledby="seo-story-process-heading">
      <div class="ls-process__header">
        <div class="ls-section-label">Training Flow</div>
        <h2 id="seo-story-process-heading" class="ls-section-title"><?php echo esc_html($story_process_heading); ?></h2>
        <p><?php echo esc_html($story_process_copy); ?></p>
      </div>
      <div class="ls-process__grid">
        <?php foreach ($story_steps as $index => $step) : ?>
          <article class="ls-process-card">
            <span class="ls-process-card__number"><?php echo esc_html(str_pad((string) ($index + 1), 2, '0', STR_PAD_LEFT)); ?></span>
            <div class="ls-process-card__label"><?php echo esc_html($step['label']); ?></div>
            <h3><?php echo esc_html($step['title']); ?></h3>
            <p><?php echo esc_html($step['copy']); ?></p>
          </article>
        <?php endforeach; ?>
      </div>
    </section>
  <?php endif; ?>

  <section class="ls-photo-strip reveal" aria-label="<?php esc_attr_e('Program photo gallery', 'house36-bbt'); ?>">
    <?php foreach ($story_gallery as $index => $gallery_item) : ?>
      <figure class="ls-photo-strip__item <?php echo 0 === $index ? 'ls-photo-strip__item--wide' : ''; ?>">
        <?php echo house36_bbt_seo_gallery_image($gallery_item, 'ls-photo-strip__img'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
        <figcaption><?php echo esc_html($gallery_item['label']); ?></figcaption>
      </figure>
    <?php endforeach; ?>
  </section>

  <?php if (! empty($page['detail_cards']) && is_array($page['detail_cards'])) : ?>
    <section class="seo-detail-section ls-cards reveal" aria-labelledby="seo-detail-heading">
      <div class="seo-section-heading">
        <div class="ls-section-label">Program Details</div>
        <h2 id="seo-detail-heading" class="ls-section-title">What Families Should Know</h2>
      </div>
      <div class="ls-cards__inner seo-detail-grid">
        <?php foreach ($page['detail_cards'] as $card) : ?>
          <article class="bk-card">
            <div class="bk-card__eyebrow"><?php echo esc_html($card['label'] ?? 'Detail'); ?></div>
            <h3 class="bk-card__title"><?php echo esc_html($card['title'] ?? ''); ?></h3>
            <p class="bk-card__copy"><?php echo esc_html($card['copy'] ?? ''); ?></p>
          </article>
        <?php endforeach; ?>
      </div>
    </section>
  <?php endif; ?>

  <section class="ls-coach-location reveal" aria-labelledby="seo-story-location-heading">
    <div class="ls-coach-location__content">
      <div class="ls-section-label">Coach + Facility Fit</div>
      <h2 id="seo-story-location-heading" class="ls-section-title"><?php echo esc_html($story_location_heading); ?></h2>
      <p><?php echo esc_html($story_location_copy); ?></p>
      <div class="ls-coach-pills" aria-label="<?php esc_attr_e('Related training paths', 'house36-bbt'); ?>">
        <a href="<?php echo esc_url(house36_bbt_lesson_url('hitting')); ?>">Hitting Lessons</a>
        <a href="<?php echo esc_url(house36_bbt_lesson_url('pitching')); ?>">Pitching Lessons</a>
        <a href="<?php echo esc_url(house36_bbt_lesson_url('baseball-iq')); ?>">Baseball IQ</a>
        <a href="<?php echo esc_url(house36_bbt_coaches_url()); ?>">Meet the Coaches</a>
      </div>
    </div>
    <div class="ls-location-cards">
      <article>
        <span>Rocklin</span>
        <strong>4283 Duluth Ave</strong>
        <a href="<?php echo esc_url(house36_bbt_seo_page_url('baseball-lessons-rocklin')); ?>">View Rocklin lessons</a>
      </article>
      <article>
        <span>El Dorado Hills</span>
        <strong>4990 Hillsdale Dr, Suite 400</strong>
        <a href="<?php echo esc_url(house36_bbt_seo_page_url('baseball-lessons-el-dorado-hills')); ?>">View EDH lessons</a>
      </article>
    </div>
  </section>

  <section id="seo-story-form" class="ls-form-section">
    <div class="ls-form-section__inner reveal">
      <div class="cta-box forminator-cta-box ls-form-card">
        <div class="cta-box-topline">
          <div class="cta-box-eyebrow">Parent Inquiry Form</div>
          <div class="cta-box-badge">Ages 8-14U</div>
        </div>
        <h2 class="cta-box-headline"><?php echo esc_html($page['cta_label']); ?></h2>
        <p class="ls-form-copy">Tell us about your athlete and the BBT team will help you choose the right lesson, academy, facility, or development next step.</p>
        <div class="forminator-shell">
          <?php echo house36_bbt_render_training_form(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
        </div>
      </div>
    </div>
  </section>

  <?php if (! empty($faq_items)) : ?>
    <section class="ls-answer-strip reveal" aria-labelledby="seo-faq-heading">
      <div class="ls-answer-strip__inner">
        <div class="ls-section-label">Parents Ask</div>
        <h2 id="seo-faq-heading" class="ls-section-title">Answers About <?php echo esc_html($page['title']); ?></h2>
        <div class="ls-answer-grid">
          <?php foreach ($faq_items as $item) : ?>
            <article class="ls-answer-card">
              <h3><?php echo esc_html($item['question']); ?></h3>
              <p><?php echo esc_html($item['answer']); ?></p>
            </article>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
  <?php endif; ?>

  <section class="ls-cards seo-related-section reveal" aria-labelledby="seo-related-heading">
    <div class="seo-section-heading">
      <div class="ls-section-label">Next Steps</div>
      <h2 id="seo-related-heading" class="ls-section-title">Explore Related Training</h2>
    </div>
    <div class="ls-cards__inner">
      <?php foreach ($related_links as $link) : ?>
        <article class="bk-card">
          <div class="bk-card__eyebrow">Related Page</div>
          <h3 class="bk-card__title"><?php echo esc_html($link['label']); ?></h3>
          <a href="<?php echo esc_url($link['url']); ?>" class="bk-card__inline-link">View <?php echo esc_html($link['label']); ?></a>
        </article>
      <?php endforeach; ?>

      <article class="bk-card">
        <div class="bk-card__eyebrow">Contact Better Baseball Training</div>
        <h3 class="bk-card__title">Talk With Our Team</h3>
        <p class="bk-card__copy">Reach out if you want help choosing the best coach, location, or training path for your ballplayer.</p>
        <div class="bk-card__links">
          <div class="bk-card__contact-row">
            <span class="bk-card__contact-label">Phone</span>
            <a href="<?php echo esc_url(house36_bbt_contact_phone_href()); ?>"><?php echo esc_html(house36_bbt_contact_phone()); ?></a>
          </div>
          <div class="bk-card__contact-row">
            <span class="bk-card__contact-label">Email</span>
            <a href="<?php echo esc_url(house36_bbt_contact_email_href()); ?>"><?php echo esc_html(house36_bbt_contact_email()); ?></a>
          </div>
        </div>
      </article>
    </div>
  </section>
</main>
<?php else : ?>
<main id="main-content" class="seo-landing-page ls-page">
  <section class="ls-hero reveal">
    <div class="ls-hero__inner">
      <div class="ls-hero__kicker"><?php echo esc_html($page['kicker']); ?></div>
      <h1 class="ls-hero__title"><?php echo esc_html($page['headline']); ?></h1>
      <p class="ls-hero__copy"><?php echo esc_html($page['subheadline']); ?></p>
      <?php if (! empty($page['meta_items']) && is_array($page['meta_items'])) : ?>
        <div class="ls-hero__meta" aria-label="<?php esc_attr_e('Page details', 'house36-bbt'); ?>">
          <?php foreach ($page['meta_items'] as $item) : ?>
            <span><?php echo esc_html($item); ?></span>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
    </div>
  </section>

  <section class="ls-overview">
    <div class="ls-overview__inner reveal">
      <div class="ls-overview__media">
        <img
          src="<?php echo esc_url($image_src); ?>"
          <?php if ($image_srcset) : ?>
            srcset="<?php echo esc_attr($image_srcset); ?>"
          <?php endif; ?>
          sizes="(max-width: 768px) 100vw, (max-width: 1180px) 50vw, 540px"
          alt="<?php echo esc_attr($page['image_alt']); ?>"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          <?php if ($image_dimensions) : ?>
            width="<?php echo esc_attr((string) $image_dimensions[0]); ?>"
            height="<?php echo esc_attr((string) $image_dimensions[1]); ?>"
          <?php endif; ?>
        />
      </div>

      <div class="ls-overview__content">
        <div class="ls-section-label"><?php echo esc_html($page['intro_label']); ?></div>
        <h2 class="ls-section-title"><?php echo esc_html($page['intro_title']); ?></h2>
        <p class="ls-overview__text"><?php echo esc_html($page['intro_copy']); ?></p>

        <?php if (! empty($page['focus_items']) && is_array($page['focus_items'])) : ?>
          <ul class="ls-focus-list">
            <?php foreach ($page['focus_items'] as $item) : ?>
              <li><?php echo esc_html($item); ?></li>
            <?php endforeach; ?>
          </ul>
        <?php endif; ?>
      </div>
    </div>
  </section>

  <?php if (! empty($page['detail_cards']) && is_array($page['detail_cards'])) : ?>
    <section class="seo-detail-section ls-cards reveal" aria-labelledby="seo-detail-heading">
      <div class="seo-section-heading">
        <div class="ls-section-label">Program Details</div>
        <h2 id="seo-detail-heading" class="ls-section-title">What Families Should Know</h2>
      </div>
      <div class="ls-cards__inner seo-detail-grid">
        <?php foreach ($page['detail_cards'] as $card) : ?>
          <article class="bk-card">
            <div class="bk-card__eyebrow"><?php echo esc_html($card['label'] ?? 'Detail'); ?></div>
            <h3 class="bk-card__title"><?php echo esc_html($card['title'] ?? ''); ?></h3>
            <p class="bk-card__copy"><?php echo esc_html($card['copy'] ?? ''); ?></p>
          </article>
        <?php endforeach; ?>
      </div>
    </section>
  <?php endif; ?>

  <?php if (! empty($faq_items)) : ?>
    <section class="ls-answer-strip reveal" aria-labelledby="seo-faq-heading">
      <div class="ls-answer-strip__inner">
        <div class="ls-section-label">Parents Ask</div>
        <h2 id="seo-faq-heading" class="ls-section-title">Answers About <?php echo esc_html($page['title']); ?></h2>
        <div class="ls-answer-grid">
          <?php foreach ($faq_items as $item) : ?>
            <article class="ls-answer-card">
              <h3><?php echo esc_html($item['question']); ?></h3>
              <p><?php echo esc_html($item['answer']); ?></p>
            </article>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
  <?php endif; ?>

  <section class="ls-form-section">
    <div class="ls-form-section__inner reveal">
      <div class="cta-box forminator-cta-box ls-form-card">
        <div class="cta-box-topline">
          <div class="cta-box-eyebrow">Parent Inquiry Form</div>
          <div class="cta-box-badge">Ages 8-14U</div>
        </div>
        <h2 class="cta-box-headline"><?php echo esc_html($page['cta_label']); ?></h2>
        <p class="ls-form-copy">Tell us about your athlete and the BBT team will help you choose the right lesson, academy, facility, or development next step.</p>
        <div class="forminator-shell">
          <?php echo house36_bbt_render_training_form(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
        </div>
      </div>
    </div>
  </section>

  <section class="ls-cards seo-related-section reveal" aria-labelledby="seo-related-heading">
    <div class="seo-section-heading">
      <div class="ls-section-label">Next Steps</div>
      <h2 id="seo-related-heading" class="ls-section-title">Explore Related Training</h2>
    </div>
    <div class="ls-cards__inner">
      <?php foreach ($related_links as $link) : ?>
        <article class="bk-card">
          <div class="bk-card__eyebrow">Related Page</div>
          <h3 class="bk-card__title"><?php echo esc_html($link['label']); ?></h3>
          <a href="<?php echo esc_url($link['url']); ?>" class="bk-card__inline-link">View <?php echo esc_html($link['label']); ?></a>
        </article>
      <?php endforeach; ?>

      <article class="bk-card">
        <div class="bk-card__eyebrow">Contact Better Baseball Training</div>
        <h3 class="bk-card__title">Talk With Our Team</h3>
        <p class="bk-card__copy">Reach out if you want help choosing the best coach, location, or training path for your ballplayer.</p>
        <div class="bk-card__links">
          <div class="bk-card__contact-row">
            <span class="bk-card__contact-label">Phone</span>
            <a href="<?php echo esc_url(house36_bbt_contact_phone_href()); ?>"><?php echo esc_html(house36_bbt_contact_phone()); ?></a>
          </div>
          <div class="bk-card__contact-row">
            <span class="bk-card__contact-label">Email</span>
            <a href="<?php echo esc_url(house36_bbt_contact_email_href()); ?>"><?php echo esc_html(house36_bbt_contact_email()); ?></a>
          </div>
        </div>
      </article>
    </div>
  </section>
</main>
<?php endif; ?>
<script type="application/ld+json">
<?php echo wp_json_encode($service_schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT); ?>
</script>
<?php if ($faq_schema) : ?>
  <script type="application/ld+json">
  <?php echo wp_json_encode($faq_schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT); ?>
  </script>
<?php endif; ?>
<?php
get_footer();
