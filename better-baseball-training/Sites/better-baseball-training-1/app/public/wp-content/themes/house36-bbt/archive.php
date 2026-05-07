<?php
get_header();
?>
<main id="main-content" class="default-page">
  <div class="default-page__inner">
    <h1 class="default-page__title"><?php the_archive_title(); ?></h1>
    <?php if (have_posts()) : ?>
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
      <p class="default-page__copy"><?php esc_html_e('No posts found yet.', 'house36-bbt'); ?></p>
    <?php endif; ?>
  </div>
</main>
<?php
get_footer();
