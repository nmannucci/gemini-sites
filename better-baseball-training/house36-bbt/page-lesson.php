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

  <section class="ls-form-section">
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

  <section class="ls-cards reveal">
    <div class="ls-cards__inner">
      <article class="bk-card">
        <div class="bk-card__eyebrow">Contact Better Baseball Training</div>
        <h2 class="bk-card__title">Talk With Our Team</h2>
        <p class="bk-card__copy">Reach out if you want help choosing the best lesson, coach, or location for your ballplayer.</p>
        <div class="bk-card__links">
          <div class="bk-card__contact-row">
            <span class="bk-card__contact-label">Phone</span>
            <a href="tel:9164655551">916-465-5551</a>
          </div>
          <div class="bk-card__contact-row">
            <span class="bk-card__contact-label">Email</span>
            <a href="mailto:trainwithbbt@gmail.com">trainwithbbt@gmail.com</a>
          </div>
        </div>
      </article>

      <article class="bk-card">
        <div class="bk-card__eyebrow">Training Locations</div>
        <h2 class="bk-card__title">Rocklin + EDH</h2>
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
get_footer();
