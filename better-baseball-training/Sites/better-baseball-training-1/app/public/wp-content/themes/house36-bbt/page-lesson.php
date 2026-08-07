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
  <section class="ls-hero reveal">
    <div class="ls-hero__inner">
      <div class="ls-hero__kicker">Better Baseball Training</div>
      <h1 class="ls-hero__title"><?php echo esc_html($lesson['headline']); ?></h1>
      <p class="ls-hero__copy"><?php echo esc_html($lesson['subheadline']); ?></p>
      <div class="ls-hero__meta" aria-label="<?php esc_attr_e('Lesson details', 'house36-bbt'); ?>">
        <span>Private + Group</span>
        <span>Ages 8-14U</span>
        <span>Rocklin + El Dorado Hills</span>
      </div>
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
          alt="<?php echo esc_attr($lesson['image_alt']); ?>"
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
        <div class="ls-section-label">Lesson Overview</div>
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

  <section class="ls-form-section">
    <div class="ls-form-section__inner reveal">
      <div class="cta-box forminator-cta-box ls-form-card">
        <div class="cta-box-topline">
          <div class="cta-box-eyebrow">Parent Inquiry Form</div>
          <div class="cta-box-badge">Private + Group</div>
        </div>
        <h2 class="cta-box-headline"><?php echo esc_html(house36_bbt_lesson_page_heading($lesson)); ?></h2>
        <div class="forminator-shell">
          <?php echo house36_bbt_render_training_form(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
        </div>
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
          <span>4990 Hillsdale Cir, Suite 400</span>
          <span>El Dorado Hills, CA 95762</span>
        </div>
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
