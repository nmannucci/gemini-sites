<?php
get_header();
?>
<main id="main-content" class="default-page default-page--centered">
  <div class="default-page__inner">
    <p class="default-page__eyebrow">404</p>
    <h1 class="default-page__title"><?php esc_html_e('Page Not Found', 'house36-bbt'); ?></h1>
    <p class="default-page__copy"><?php esc_html_e('That page does not exist yet, but the next pitch is still live.', 'house36-bbt'); ?></p>
    <a href="<?php echo esc_url(home_url('/')); ?>" class="btn-primary"><span><?php esc_html_e('Back Home', 'house36-bbt'); ?></span></a>
  </div>
</main>
<?php
get_footer();
