<?php
get_header();

$locations = house36_bbt_locations_data();
$schedule_highlights = array(
    array(
        'eyebrow' => 'Ages Served',
        'title'   => 'Built For 8-14U Players',
        'copy'    => 'The current schedule is centered on academy programming for youth players who need consistent reps, structure, and age-appropriate development.',
    ),
    array(
        'eyebrow' => 'Calendar Format',
        'title'   => 'Live Weekly Schedule',
        'copy'    => 'The embedded calendar below shows the current class schedule and updates as availability changes across the two BBT locations.',
    ),
    array(
        'eyebrow' => 'Program Focus',
        'title'   => 'Academy Class Coverage',
        'copy'    => 'Expect the schedule to highlight recurring baseball development sessions such as hitting, pitching, defense, catching, baseball IQ, and baserunning work.',
    ),
);
?>
<main id="main-content" class="default-page">
  <div class="default-page__inner">
    <?php
    while (have_posts()) :
        the_post();
        ?>
      <article <?php post_class('entry-card'); ?>>
        <h1 class="default-page__title"><?php esc_html_e('Baseball Training Schedule in Rocklin & El Dorado Hills', 'house36-bbt'); ?></h1>
        <p class="default-page__copy"><?php esc_html_e('View the current Better Baseball Training academy schedule for Rocklin and El Dorado Hills, including active class times and recurring training sessions.', 'house36-bbt'); ?></p>
        <div class="schedule-highlights">
          <?php foreach ($schedule_highlights as $item) : ?>
            <div class="schedule-highlight">
              <div class="schedule-highlight__eyebrow"><?php echo esc_html($item['eyebrow']); ?></div>
              <h2 class="schedule-highlight__title"><?php echo esc_html($item['title']); ?></h2>
              <p class="schedule-highlight__copy"><?php echo esc_html($item['copy']); ?></p>
            </div>
          <?php endforeach; ?>
        </div>

        <section class="schedule-summary" aria-label="<?php esc_attr_e('Schedule overview', 'house36-bbt'); ?>">
          <div class="schedule-details">
            <article class="schedule-panel">
              <div class="schedule-card__eyebrow"><?php esc_html_e('Locations', 'house36-bbt'); ?></div>
              <h2 class="schedule-panel__title"><?php esc_html_e('Two Training Locations', 'house36-bbt'); ?></h2>
              <div class="schedule-location-grid">
                <?php foreach ($locations as $location) : ?>
                  <div class="schedule-location-card">
                    <strong><?php echo esc_html($location['name']); ?></strong>
                    <span><?php echo esc_html($location['address_line']); ?></span>
                    <span><?php echo esc_html($location['city_state_zip']); ?></span>
                    <p><?php echo esc_html($location['summary']); ?></p>
                  </div>
                <?php endforeach; ?>
              </div>
            </article>
          </div>
        </section>
        <div class="entry-content">
          <div class="schedule-embed">
            <?php the_content(); ?>
          </div>
        </div>
      </article>
    <?php endwhile; ?>
  </div>
</main>
<?php
get_footer();
