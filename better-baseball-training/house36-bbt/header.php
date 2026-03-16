<?php
if (! defined('ABSPATH')) {
    exit;
}
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
  <a class="skip-link screen-reader-text" href="#main-content"><?php esc_html_e('Skip to main content', 'house36-bbt'); ?></a>
  <nav aria-label="<?php esc_attr_e('Primary navigation', 'house36-bbt'); ?>">
    <button class="hamburger" aria-label="<?php esc_attr_e('Open menu', 'house36-bbt'); ?>" type="button">
      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>
    </button>

    <?php echo house36_bbt_logo('nav-logo', 'brand-assets/BBT Logo 2.jpeg'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>

    <?php
    wp_nav_menu(
        array(
            'theme_location' => 'primary',
            'container'      => false,
            'menu_class'     => 'nav-links',
            'fallback_cb'    => 'house36_bbt_primary_menu_fallback',
        )
    );
    ?>

    <div class="nav-actions">
      <a href="tel:9164655551" class="nav-cta nav-cta--ghost"><?php esc_html_e('Call Us', 'house36-bbt'); ?></a>
      <a href="<?php echo esc_url(house36_bbt_booking_url()); ?>" class="nav-cta"><?php esc_html_e('Book Now', 'house36-bbt'); ?></a>
    </div>
  </nav>

  <div class="mobile-menu">
    <?php
    wp_nav_menu(
        array(
            'theme_location' => 'primary',
            'container'      => false,
            'menu_class'     => 'mobile-menu-links',
            'fallback_cb'    => 'house36_bbt_primary_menu_fallback',
        )
    );
    ?>
  </div>
