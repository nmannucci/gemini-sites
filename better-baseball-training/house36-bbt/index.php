<?php
get_header();
?>
<main id="main-content" class="default-page">
  <div class="default-page__inner">
    <?php if (have_posts()) : ?>
      <h1 class="default-page__title"><?php esc_html_e('Latest Posts', 'house36-bbt'); ?></h1>
      <div class="posts-feed">
        <?php
        while (have_posts()) :
            the_post();
            ?>
          <article <?php post_class('post-card'); ?>>
            <p class="default-page__eyebrow"><?php echo esc_html(get_the_date()); ?></p>
            <h2 class="post-card__title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
            <div class="post-card__excerpt"><?php the_excerpt(); ?></div>
          </article>
        <?php endwhile; ?>
      </div>
      <div class="pagination-wrap">
        <?php the_posts_pagination(); ?>
      </div>
    <?php else : ?>
      <h1 class="default-page__title"><?php bloginfo('name'); ?></h1>
      <p class="default-page__copy"><?php esc_html_e('Create pages, assign the homepage, and build your navigation in WordPress admin to launch the site.', 'house36-bbt'); ?></p>
    <?php endif; ?>
  </div>
</main>
<?php
get_footer();
