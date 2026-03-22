<?php
if (! defined('ABSPATH')) {
    exit;
}

get_header();
?>
<main id="main-content" class="booking-page bk-page">
  <section class="bk-hero reveal">
    <div class="bk-hero__inner">
      <div class="bk-hero__kicker">Better Baseball Training</div>
      <h1 class="bk-hero__title">Book Training for Your <em>Ballplayer</em></h1>
      <p class="bk-hero__copy">Fill out the player interest form below and our staff will help you choose the right lesson, membership, or next step for your athlete.</p>
    </div>
  </section>

  <section id="bk-form" class="bk-form-section">
    <div class="bk-form-section__inner reveal">
      <div class="cta-box forminator-cta-box bk-form-card">
        <div class="cta-box-topline">
          <div class="cta-box-eyebrow">Player Interest Form</div>
          <div class="cta-box-badge">Ages 8–14U</div>
        </div>
        <h2 class="cta-box-headline">Fill Out the Form Below to <em>Get Started</em></h2>
        <div class="forminator-shell">
          <?php echo house36_bbt_render_training_form(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
        </div>
      </div>
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
        <p class="bk-card__copy">Ages 8-14U. Built for athletes who want consistent reps, structured development, and professional coaching.</p>
      </article>

      <article class="bk-card">
        <div class="bk-card__eyebrow">Contact Us</div>
        <h2 class="bk-card__title">Reach the Team</h2>
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
        <a href="<?php echo esc_url(house36_bbt_schedule_url()); ?>" class="bk-card__inline-link">View Current Schedule</a>
      </article>

      <article class="bk-card">
        <div class="bk-card__eyebrow">Locations</div>
        <h2 class="bk-card__title">2 Facilities</h2>
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
    </div>
  </section>
</main>
<?php
get_footer();
