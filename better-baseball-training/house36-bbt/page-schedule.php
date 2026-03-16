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
        <h1 class="default-page__title"><?php esc_html_e('Class Schedule', 'house36-bbt'); ?></h1>
        <p class="default-page__copy"><?php esc_html_e('View our upcoming classes and academy sessions below.', 'house36-bbt'); ?></p>
        <div class="entry-content">
          <?php the_content(); ?>
        </div>
      </article>
    <?php endwhile; ?>
  </div>
</main>
<?php
get_footer();
