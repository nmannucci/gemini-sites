<?php
if (! defined('ABSPATH')) {
    exit;
}

$lesson = house36_bbt_get_current_lesson();

if (! is_array($lesson)) {
    status_header(404);
    nocache_headers();
    include get_404_template();
    return;
}

$image_widths = $lesson['image_widths'] ?? array(640, 960);
$image_src = house36_bbt_asset_variant_url($lesson['image'], $image_widths[0]) ?: house36_bbt_asset($lesson['image']);
$image_srcset = house36_bbt_asset_srcset($lesson['image'], $image_widths);
$image_dimensions = house36_bbt_asset_dimensions($lesson['image']);
$related_coaches = house36_bbt_lesson_related_coaches($lesson['slug']);
$lesson_label = $lesson['title'] . ' lessons';
$related_coach_names = array_values(
    array_map(
        static function ($coach) {
            return $coach['name'];
        },
        $related_coaches
    )
);
$lesson_faq_items = array(
    array(
        'question'    => 'Where are these lessons offered?',
        'answer_html' => sprintf('%s are available in <strong>Rocklin and El Dorado Hills</strong> so families can choose the location and schedule that works best.', esc_html($lesson_label)),
        'answer_text' => sprintf('%s are available in Rocklin and El Dorado Hills so families can choose the location and schedule that works best.', $lesson_label),
        'link_url'    => house36_bbt_home_section_url('facilities'),
        'link_label'  => 'See both training locations',
    ),
    array(
        'question'    => 'Who is this training built for?',
        'answer_html' => 'BBT builds these sessions for <strong>players ages 8-14U</strong> who need better skill execution, more confidence, and a clearer development plan.',
        'answer_text' => 'BBT builds these sessions for players ages 8-14U who need better skill execution, more confidence, and a clearer development plan.',
        'link_url'    => house36_bbt_booking_url(),
        'link_label'  => 'Start with the player form',
    ),
    array(
        'question'    => 'Who can teach this lesson?',
        'answer_html' => sprintf('BBT matches families with the right coach based on age, goals, and location. Common fits for <strong>%s</strong> include %s.', esc_html(strtolower($lesson_label)), esc_html(implode(', ', $related_coach_names))),
        'answer_text' => sprintf('BBT matches families with the right coach based on age, goals, and location. Common fits for %s include %s.', strtolower($lesson_label), implode(', ', $related_coach_names)),
        'coach_links' => $related_coaches,
    ),
    array(
        'question'    => 'What should we do next?',
        'answer_html' => 'Check the current training schedule, then submit the form so BBT can recommend the right lesson, coach, and next step for your athlete.',
        'answer_text' => 'Check the current training schedule, then submit the form so BBT can recommend the right lesson, coach, and next step for your athlete.',
        'link_url'    => house36_bbt_schedule_url(),
        'link_label'  => 'View the training schedule',
    ),
);

$lesson_gallery_map = array(
    'hitting' => array(
        array('image' => 'images/service-hitting-1.PNG', 'alt' => 'Hitting lesson reps at Better Baseball Training', 'label' => 'Swing Work'),
        array('image' => 'images/facility-img-1.jpg', 'alt' => 'Rocklin batting cage lane at Better Baseball Training', 'label' => 'Cage Reps'),
        array('image' => 'images/hero-slideshow-4.PNG', 'alt' => 'Youth baseball player training inside Better Baseball Training', 'label' => 'Player Development'),
        array('image' => 'images/team-photo-1.jpg', 'alt' => 'Better Baseball Training youth team photo', 'label' => 'Game Confidence'),
    ),
    'pitching' => array(
        array('image' => 'images/service-pitching-2.PNG', 'alt' => 'Pitching instruction at Better Baseball Training', 'label' => 'Mechanics'),
        array('image' => 'images/gabe-emmett.jpeg', 'alt' => 'Pitching coach Gabe Emmett at Better Baseball Training', 'label' => 'Pitching Staff'),
        array('image' => 'images/jean-machi.jpeg', 'alt' => 'Pitching coach Jean Machi at Better Baseball Training', 'label' => 'Pro Experience'),
        array('image' => 'images/IMG_0609.jpg', 'alt' => 'Indoor baseball facility for pitching development', 'label' => 'Indoor Space'),
    ),
    'infield-outfield' => array(
        array('image' => 'images/service-inf.ouf-3.PNG', 'alt' => 'Infield and outfield training at Better Baseball Training', 'label' => 'Defense Reps'),
        array('image' => 'images/hero-slideshow-2.PNG', 'alt' => 'Youth baseball players training together at Better Baseball Training', 'label' => 'Game Speed'),
        array('image' => 'images/facility-img-3.jpg', 'alt' => 'Rocklin training equipment and turf area', 'label' => 'Footwork'),
        array('image' => 'images/team-photo-2.jpg', 'alt' => 'Better Baseball Training players after competition', 'label' => 'Team Fit'),
    ),
    'catching' => array(
        array('image' => 'images/service-catching-4.PNG', 'alt' => 'Catching instruction at Better Baseball Training', 'label' => 'Receiving'),
        array('image' => 'images/facility-img-4.jpg', 'alt' => 'Catching gear and training area at Better Baseball Training', 'label' => 'Blocking'),
        array('image' => 'images/bruce-carmichael.PNG', 'alt' => 'Better Baseball Training catching and defense coach Bruce Carmichael', 'label' => 'Coach Eyes'),
        array('image' => 'images/hero-slideshow-5.PNG', 'alt' => 'Better Baseball Training player showing a championship ring', 'label' => 'Leadership'),
    ),
    'baseball-iq' => array(
        array('image' => 'images/service-baseball.iq-5.PNG', 'alt' => 'Baseball IQ training at Better Baseball Training', 'label' => 'Situations'),
        array('image' => 'images/hero-slideshow-3.PNG', 'alt' => 'Better Baseball Training players with medals after a tournament', 'label' => 'Game Context'),
        array('image' => 'images/team-photo-3.jpg', 'alt' => 'Better Baseball Training youth players and coaches', 'label' => 'Team Awareness'),
        array('image' => 'images/IMG_0607.jpg', 'alt' => 'El Dorado Hills training facility at Better Baseball Training', 'label' => 'Classroom to Turf'),
    ),
);

$lesson_gallery = $lesson_gallery_map[$lesson['slug']] ?? array(
    array('image' => $lesson['image'], 'alt' => $lesson['image_alt'], 'label' => $lesson['title']),
    array('image' => 'images/facility-img-1.jpg', 'alt' => 'Better Baseball Training indoor facility', 'label' => 'Facility'),
    array('image' => 'images/hero-slideshow-4.PNG', 'alt' => 'Youth baseball lesson inside Better Baseball Training', 'label' => 'Training'),
    array('image' => 'images/team-photo-1.jpg', 'alt' => 'Better Baseball Training youth team', 'label' => 'Team'),
);

$lesson_hero_background = house36_bbt_asset_variant_url($lesson_gallery[0]['image'], 960) ?: house36_bbt_asset($lesson_gallery[0]['image']);

$lesson_steps = array(
    array('label' => 'Assess', 'title' => 'Start With the Player', 'copy' => 'Coaches look at age, current skill level, goals, confidence, and the situations that show up most often in games.'),
    array('label' => 'Build', 'title' => 'Clean Up the Skill', 'copy' => 'Training breaks the skill into clear, repeatable pieces so the athlete knows what to feel and what to fix.'),
    array('label' => 'Apply', 'title' => 'Move Toward Game Speed', 'copy' => 'Players work through reps that connect mechanics, decisions, timing, and pressure instead of staying stuck in drills.'),
    array('label' => 'Plan', 'title' => 'Choose the Next Rep', 'copy' => 'Families leave with a better sense of whether the next step is another lesson, academy training, or team development.'),
);

if (! function_exists('house36_bbt_lesson_gallery_image')) {
    function house36_bbt_lesson_gallery_image($item, $class = '', $loading = 'lazy') {
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

$lesson_faq_schema = array(
    '@context'   => 'https://schema.org',
    '@type'      => 'FAQPage',
    'mainEntity' => array_map(
        static function ($item) {
            return array(
                '@type'          => 'Question',
                'name'           => $item['question'],
                'acceptedAnswer' => array(
                    '@type' => 'Answer',
                    'text'  => $item['answer_text'],
                ),
            );
        },
        $lesson_faq_items
    ),
);

get_header();
?>
<main id="main-content" class="lesson-page ls-page">
  <section
    class="ls-picture-hero reveal"
    style="--lesson-hero-bg: url('<?php echo esc_url($lesson_hero_background); ?>');"
  >
    <div class="ls-picture-hero__inner">
      <div class="ls-picture-hero__copy">
        <div class="ls-hero__kicker">Better Baseball Training</div>
        <h1 class="ls-hero__title"><?php echo esc_html($lesson['headline']); ?></h1>
        <p class="ls-hero__copy"><?php echo esc_html($lesson['subheadline']); ?></p>
        <div class="ls-hero__meta" aria-label="<?php esc_attr_e('Lesson details', 'house36-bbt'); ?>">
          <span>Private + Group</span>
          <span>Ages 8-14U</span>
          <span>Rocklin + EDH</span>
        </div>
        <div class="ls-hero__actions">
          <a href="#lesson-form" class="membership-cta">Start the Player Form</a>
          <a href="<?php echo esc_url(house36_bbt_schedule_url()); ?>" class="cta-box-secondary-link">View Schedule</a>
        </div>
      </div>
      <div class="ls-picture-hero__panel" aria-label="<?php esc_attr_e('Lesson quick facts', 'house36-bbt'); ?>">
        <span><?php echo esc_html($lesson_gallery[0]['label']); ?></span>
        <strong><?php echo esc_html($lesson['title']); ?> Development</strong>
        <p>Focused reps, coach feedback, and a clear next step for players who want their training to show up in games.</p>
      </div>
    </div>
  </section>

  <section class="ls-snapshot reveal" aria-label="<?php esc_attr_e('Lesson snapshot', 'house36-bbt'); ?>">
    <div class="ls-snapshot__item">
      <span>Best Fit</span>
      <strong>Ages 8-14U</strong>
    </div>
    <div class="ls-snapshot__item">
      <span>Format</span>
      <strong>Private + Group</strong>
    </div>
    <div class="ls-snapshot__item">
      <span>Locations</span>
      <strong>Rocklin + EDH</strong>
    </div>
    <div class="ls-snapshot__item">
      <span>Next Step</span>
      <strong>Coach Match</strong>
    </div>
  </section>

  <section class="ls-overview ls-overview--story">
    <div class="ls-overview__inner reveal">
      <div class="ls-overview__content">
        <div class="ls-section-label">How It Helps</div>
        <h2 class="ls-section-title"><?php echo esc_html($lesson['section_title'] ?? 'What This Lesson Helps Build'); ?></h2>
        <p class="ls-overview__text"><?php echo esc_html($lesson['overview']); ?></p>

        <?php if (! empty($lesson['focus_items']) && is_array($lesson['focus_items'])) : ?>
          <ul class="ls-focus-list">
            <?php foreach ($lesson['focus_items'] as $item) : ?>
              <li><?php echo esc_html($item); ?></li>
            <?php endforeach; ?>
          </ul>
        <?php endif; ?>
      </div>

      <div class="ls-photo-panel">
        <figure>
          <?php echo house36_bbt_lesson_gallery_image($lesson_gallery[3], 'ls-photo-panel__img'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
          <figcaption><?php echo esc_html($lesson_gallery[3]['label']); ?></figcaption>
        </figure>
        <div class="ls-photo-panel__note">
          <span>BBT Flow</span>
          <strong>Skill work that connects to confidence in games.</strong>
        </div>
      </div>
    </div>
  </section>

  <section class="ls-process reveal" aria-labelledby="ls-process-heading">
    <div class="ls-process__header">
      <div class="ls-section-label">Training Flow</div>
      <h2 id="ls-process-heading" class="ls-section-title">A Clear Path From First Rep to Game Rep</h2>
      <p>Each lesson is designed to give families more clarity, not just more swings, throws, or drills.</p>
    </div>
    <div class="ls-process__grid">
      <?php foreach ($lesson_steps as $index => $step) : ?>
        <article class="ls-process-card">
          <span class="ls-process-card__number"><?php echo esc_html(str_pad((string) ($index + 1), 2, '0', STR_PAD_LEFT)); ?></span>
          <div class="ls-process-card__label"><?php echo esc_html($step['label']); ?></div>
          <h3><?php echo esc_html($step['title']); ?></h3>
          <p><?php echo esc_html($step['copy']); ?></p>
        </article>
      <?php endforeach; ?>
    </div>
  </section>

  <section class="ls-photo-strip reveal" aria-label="<?php esc_attr_e('Training photo gallery', 'house36-bbt'); ?>">
    <?php foreach ($lesson_gallery as $index => $gallery_item) : ?>
      <figure class="ls-photo-strip__item <?php echo 0 === $index ? 'ls-photo-strip__item--wide' : ''; ?>">
        <?php echo house36_bbt_lesson_gallery_image($gallery_item, 'ls-photo-strip__img'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
        <figcaption><?php echo esc_html($gallery_item['label']); ?></figcaption>
      </figure>
    <?php endforeach; ?>
  </section>

  <section class="ls-coach-location reveal" aria-labelledby="ls-coach-location-heading">
    <div class="ls-coach-location__content">
      <div class="ls-section-label">Coach + Location Fit</div>
      <h2 id="ls-coach-location-heading" class="ls-section-title">Matched to the Player, Not a Generic Lesson Slot</h2>
      <p>BBT uses the player inquiry form to understand the athlete first, then helps families choose the right coach, location, and training rhythm.</p>
      <?php if ($related_coaches) : ?>
        <div class="ls-coach-pills" aria-label="<?php esc_attr_e('Common coach fits', 'house36-bbt'); ?>">
          <?php foreach ($related_coaches as $coach) : ?>
            <a href="<?php echo esc_url(house36_bbt_coaches_url() . '#' . $coach['anchor']); ?>"><?php echo esc_html($coach['name']); ?></a>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
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

  <section id="lesson-form" class="ls-form-section">
    <div class="ls-form-section__inner reveal">
      <div class="cta-box forminator-cta-box ls-form-card">
        <div class="cta-box-topline">
          <div class="cta-box-eyebrow">Parent Inquiry Form</div>
          <div class="cta-box-badge">Private + Group</div>
        </div>
        <h2 class="cta-box-headline"><?php echo esc_html(house36_bbt_lesson_page_heading($lesson)); ?></h2>
        <p class="ls-form-copy"><?php echo esc_html($lesson['form_copy'] ?? 'Tell us about your athlete and our team will help you choose the right next step.'); ?></p>
        <div class="forminator-shell">
          <?php echo house36_bbt_render_training_form(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
        </div>
      </div>
    </div>
  </section>

  <section class="ls-answer-strip reveal" aria-labelledby="ls-answer-strip-heading">
    <div class="ls-answer-strip__inner">
      <div class="ls-section-label">Parents Ask About <?php echo esc_html($lesson['title']); ?></div>
      <h2 id="ls-answer-strip-heading" class="ls-section-title">What to Know Before You Book <?php echo esc_html($lesson['title']); ?> Lessons</h2>
      <div class="ls-answer-grid">
        <?php foreach ($lesson_faq_items as $item) : ?>
          <article class="ls-answer-card">
            <h3><?php echo esc_html($item['question']); ?></h3>
            <p><?php echo wp_kses_post($item['answer_html']); ?></p>
            <?php if (! empty($item['coach_links'])) : ?>
              <ul class="ls-answer-links">
                <?php foreach ($item['coach_links'] as $coach) : ?>
                  <li><a href="<?php echo esc_url(house36_bbt_coaches_url() . '#' . $coach['anchor']); ?>"><?php echo esc_html($coach['name']); ?></a> <span><?php echo esc_html($coach['job_title']); ?></span></li>
                <?php endforeach; ?>
              </ul>
            <?php endif; ?>
            <?php if (! empty($item['link_url']) && ! empty($item['link_label'])) : ?>
              <a href="<?php echo esc_url($item['link_url']); ?>" class="bk-card__inline-link"><?php echo esc_html($item['link_label']); ?></a>
            <?php endif; ?>
          </article>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <section class="ls-cards reveal">
    <div class="ls-cards__inner">
      <article class="bk-card">
        <div class="bk-card__eyebrow">Contact Better Baseball Training</div>
        <h2 class="bk-card__title">Talk With Our Team</h2>
        <p class="bk-card__copy">Reach out if you want help choosing the best lesson, coach, or location for your ballplayer.</p>
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
        <a href="<?php echo esc_url(house36_bbt_booking_url()); ?>" class="bk-card__inline-link">Start the Player Form</a>
      </article>

      <article class="bk-card">
        <div class="bk-card__eyebrow">Training Locations</div>
        <h2 class="bk-card__title">Rocklin + El Dorado Hills</h2>
        <div class="bk-card__location">
          <strong>Rocklin</strong>
          <span>4283 Duluth Ave</span>
          <span>Rocklin, CA 95765</span>
        </div>
        <div class="bk-card__location">
          <strong>El Dorado Hills</strong>
          <span>4990 Hillsdale Dr, Suite 400</span>
          <span>El Dorado Hills, CA 95762</span>
        </div>
        <div class="bk-card__links">
          <a href="<?php echo esc_url(house36_bbt_seo_page_url('baseball-lessons-rocklin')); ?>" class="bk-card__inline-link">Rocklin Baseball Lessons</a>
          <a href="<?php echo esc_url(house36_bbt_seo_page_url('baseball-lessons-el-dorado-hills')); ?>" class="bk-card__inline-link">El Dorado Hills Baseball Lessons</a>
        </div>
      </article>

      <article class="bk-card">
        <div class="bk-card__eyebrow">Academy Membership</div>
        <h2 class="bk-card__title">Train More Consistently</h2>
        <p class="bk-card__copy">Academy membership gives players ages 8-14U recurring access to structured development in Rocklin and El Dorado Hills.</p>
        <a href="<?php echo esc_url(house36_bbt_seo_page_url('baseball-academy')); ?>" class="bk-card__inline-link">Explore the Baseball Academy</a>
      </article>

      <article class="bk-card">
        <div class="bk-card__eyebrow">Travel Baseball</div>
        <h2 class="bk-card__title">Build Toward Team Readiness</h2>
        <p class="bk-card__copy">BBT helps players connect private lessons and academy reps to the skills, confidence, and IQ needed for more competitive baseball.</p>
        <a href="<?php echo esc_url(house36_bbt_seo_page_url('travel-baseball')); ?>" class="bk-card__inline-link">Explore Travel Development</a>
      </article>

      <article class="bk-card">
        <div class="bk-card__eyebrow">Expert Staff</div>
        <h2 class="bk-card__title">Meet the Coaches</h2>
        <p class="bk-card__copy">Review the coaching staff to see specialties, baseball backgrounds, and which coaches can be a fit for your athlete.</p>
        <a href="<?php echo esc_url(house36_bbt_coaches_url()); ?>" class="bk-card__inline-link">View All Coaches</a>
      </article>

      <article class="bk-card">
        <div class="bk-card__eyebrow">Next Step</div>
        <h2 class="bk-card__title">See the Schedule</h2>
        <p class="bk-card__copy">Browse current class options and training times, then use the form above so our team can follow up with the best fit.</p>
        <a href="<?php echo esc_url(house36_bbt_schedule_url()); ?>" class="bk-card__inline-link">View Current Schedule</a>
      </article>
    </div>
  </section>
</main>
<?php
$lesson_schema = array(
    '@context'            => 'https://schema.org',
    '@type'               => 'Service',
    '@id'                 => untrailingslashit(house36_bbt_lesson_url($lesson['slug'])) . '#service',
    'name'                => sprintf('%s Lessons', $lesson['title']),
    'serviceType'         => sprintf('%s lessons', $lesson['title']),
    'description'         => wp_trim_words(wp_strip_all_tags($lesson['overview']), 40, '...'),
    'url'                 => house36_bbt_lesson_url($lesson['slug']),
    'provider'            => array(
        '@id' => home_url('/#organization'),
    ),
    'audience'            => array(
        '@type'          => 'PeopleAudience',
        'suggestedMinAge'=> 8,
        'suggestedMaxAge'=> 14,
    ),
    'areaServed'          => array(
        array(
            '@type' => 'City',
            'name'  => 'Rocklin',
        ),
        array(
            '@type' => 'City',
            'name'  => 'El Dorado Hills',
        ),
    ),
);
?>
<script type="application/ld+json">
<?php echo wp_json_encode($lesson_schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT); ?>
</script>
<script type="application/ld+json">
<?php echo wp_json_encode($lesson_faq_schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT); ?>
</script>
<?php
get_footer();
