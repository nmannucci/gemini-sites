<?php
if (! defined('ABSPATH')) {
    exit;
}

$locations = house36_bbt_locations_data();
$training_focuses = house36_bbt_training_focus_labels();

get_header();
?>
<main id="main-content" class="booking-page bk-page">
  <section class="bk-hero reveal">
    <div class="bk-hero__inner">
      <div class="bk-hero__kicker">Better Baseball Training</div>
      <h1 class="bk-hero__title">Book Baseball Lessons and Training in <em>Rocklin &amp; El Dorado Hills</em></h1>
      <p class="bk-hero__copy">Fill out the player interest form below and BBT will help you choose the right lesson, academy membership, coach, and location for your athlete.</p>
    </div>
  </section>

  <section id="bk-form" class="bk-form-section">
    <div class="bk-form-section__inner reveal">
      <div class="cta-box forminator-cta-box bk-form-card">
        <div class="cta-box-topline">
          <div class="cta-box-eyebrow">Player Interest Form</div>
          <div class="cta-box-badge">Ages 8–14U</div>
        </div>
        <h2 class="cta-box-headline">Tell Us About Your Athlete and <em>Get Started</em></h2>
        <div class="forminator-shell">
          <?php echo house36_bbt_render_training_form(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
        </div>
      </div>
    </div>
  </section>

  <section class="bk-overview reveal" aria-labelledby="bk-overview-heading">
    <div class="bk-overview__inner">
      <article class="bk-overview-card bk-overview-card--wide">
        <div class="bk-card__eyebrow">What We Can Help With</div>
        <h2 id="bk-overview-heading" class="bk-card__title">Lessons, Academy, and the Right Next Step</h2>
        <p class="bk-card__copy">If you are not sure what your athlete needs yet, this is the place to start. The BBT team can help you choose the right option based on age, goals, and preferred location.</p>
        <ul class="bk-detail-list">
          <?php foreach ($training_focuses as $focus) : ?>
            <li><?php echo esc_html($focus); ?> lessons and training for more confidence and better reps.</li>
          <?php endforeach; ?>
          <li>Academy guidance for families who want a more consistent long-term plan.</li>
        </ul>
      </article>
    </div>
  </section>

  <section class="bk-cards reveal">
    <div class="bk-cards__inner">
      <article class="bk-card">
        <div class="bk-card__eyebrow">Unlimited Access Academy</div>
        <h2 class="bk-card__title">Train Year-Round</h2>
        <div class="bk-card__pricing">
          <div class="bk-card__price">
            <span>Rocklin</span>
            <strong>$250<em>/mo</em></strong>
          </div>
          <div class="bk-card__price">
            <span>El Dorado Hills</span>
            <strong>$299<em>/mo</em></strong>
          </div>
        </div>
        <p class="bk-card__copy">Ages 8-14U. Built for athletes who want consistent reps, structured development, and a clear year-round baseball training plan.</p>
      </article>

      <article class="bk-card">
        <div class="bk-card__eyebrow">Contact Us</div>
        <h2 class="bk-card__title">Reach the Team</h2>
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
        <a href="<?php echo esc_url(house36_bbt_schedule_url()); ?>" class="bk-card__inline-link">View Current Schedule</a>
      </article>

      <article class="bk-card">
        <div class="bk-card__eyebrow">Locations</div>
        <h2 class="bk-card__title">2 Facilities</h2>
        <?php foreach ($locations as $location) : ?>
          <div class="bk-card__location">
            <strong><?php echo esc_html($location['name']); ?></strong>
            <span><?php echo esc_html($location['address_line']); ?></span>
            <span><?php echo esc_html($location['city_state_zip']); ?></span>
          </div>
        <?php endforeach; ?>
        <a href="<?php echo esc_url(house36_bbt_coaches_url()); ?>" class="bk-card__inline-link">Meet the coaching staff</a>
      </article>
    </div>
  </section>
</main>
<?php
get_footer();
