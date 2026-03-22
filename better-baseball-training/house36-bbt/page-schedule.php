<?php
get_header();
?>
<main id="main-content" class="default-page">
  <div class="default-page__inner">
    <?php
    while (have_posts()) :
        the_post();
        ?>
      <article <?php post_class('entry-card'); ?>>
        <h1 class="default-page__title"><?php esc_html_e('Baseball Training Schedule in Rocklin & El Dorado Hills', 'house36-bbt'); ?></h1>
        <p class="default-page__copy"><?php esc_html_e('View current academy classes, lesson availability, and training times for Better Baseball Training, then use the player form to find the best fit.', 'house36-bbt'); ?></p>
        <div class="entry-content">
          <?php the_content(); ?>
        </div>
      </article>
    <?php endwhile; ?>
  </div>
</main>
<?php
get_footer();
