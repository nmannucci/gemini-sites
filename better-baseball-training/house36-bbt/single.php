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
        <p class="default-page__eyebrow"><?php echo esc_html(get_the_date()); ?></p>
        <h1 class="default-page__title"><?php the_title(); ?></h1>
        <div class="entry-content">
          <?php the_content(); ?>
        </div>
      </article>
    <?php endwhile; ?>
  </div>
</main>
<?php
get_footer();
