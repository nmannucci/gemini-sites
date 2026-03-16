<?php
if (! defined('ABSPATH')) {
    exit;
}

$schema = array(
    array(
        '@context' => 'https://schema.org',
        '@type'    => 'Organization',
        'name'     => get_bloginfo('name'),
        'url'      => home_url('/'),
        'logo'     => house36_bbt_asset('images/logo-bbt.png'),
        'sameAs'   => array(
            'https://www.facebook.com/betterbaseballtraining1',
            'https://www.instagram.com/trainbetterbaseball/',
            'https://twitter.com/Betterbaseball1',
        ),
        'founder'  => array(
            '@type' => 'Person',
            'name'  => 'Jon Peters',
        ),
    ),
    array(
        '@context' => 'https://schema.org',
        '@type'    => array('LocalBusiness', 'SportsActivityLocation'),
        'name'     => 'Better Baseball Training - Rocklin',
        'image'    => house36_bbt_asset('images/facility-img-1.jpg'),
        'telephone'=> '916-465-5551',
        'address'  => array(
            '@type'           => 'PostalAddress',
            'streetAddress'   => '4283 Duluth Ave',
            'addressLocality' => 'Rocklin',
            'addressRegion'   => 'CA',
            'postalCode'      => '95765',
            'addressCountry'  => 'US',
        ),
    ),
    array(
        '@context' => 'https://schema.org',
        '@type'    => array('LocalBusiness', 'SportsActivityLocation'),
        'name'     => 'Better Baseball Training - El Dorado Hills',
        'image'    => house36_bbt_asset('images/facility-edh-1.jpg'),
        'telephone'=> '916-465-5551',
        'address'  => array(
            '@type'           => 'PostalAddress',
            'streetAddress'   => '4990 Hillsdale Dr, Suite 400',
            'addressLocality' => 'El Dorado Hills',
            'addressRegion'   => 'CA',
            'postalCode'      => '95762',
            'addressCountry'  => 'US',
        ),
    ),
    array(
        '@context' => 'https://schema.org',
        '@type'    => 'BreadcrumbList',
        'itemListElement' => array(
            array(
                '@type'    => 'ListItem',
                'position' => 1,
                'name'     => 'Home',
                'item'     => home_url('/'),
            ),
        ),
    ),
);
?>
  <footer>
    <div class="footer-container reveal">
      <div class="footer-brand">
        <?php echo house36_bbt_logo('footer-logo', 'brand-assets/BBT Logo 2.jpeg'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
        <p class="footer-desc">Better Baseball Training is a youth sports performance platform developing players socially, physically, and mentally. Serving ages 8-14U with private lessons, academy memberships, and travel teams.</p>
        <div class="footer-social">
          <a href="https://www.facebook.com/betterbaseballtraining1" target="_blank" rel="noreferrer" aria-label="<?php esc_attr_e('Facebook', 'house36-bbt'); ?>">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <a href="https://www.instagram.com/trainbetterbaseball/" target="_blank" rel="noreferrer" aria-label="<?php esc_attr_e('Instagram', 'house36-bbt'); ?>">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="https://twitter.com/Betterbaseball1" target="_blank" rel="noreferrer" aria-label="<?php esc_attr_e('Twitter', 'house36-bbt'); ?>">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
          </a>
        </div>
      </div>

      <div class="footer-contact">
        <h3 class="footer-title"><?php esc_html_e('Locations', 'house36-bbt'); ?></h3>
        <address>
          <strong>Rocklin Basecamp</strong>
          4283 Duluth Ave<br>
          Rocklin, CA 95765<br>
          <a href="tel:9164655551">916-465-5551</a>
        </address>
        <address>
          <strong>El Dorado Hills (EDH)</strong>
          4990 Hillsdale Dr, Suite 400<br>
          El Dorado Hills, CA 95762
        </address>
      </div>

      <div class="footer-contact">
        <h3 class="footer-title"><?php esc_html_e('Contact', 'house36-bbt'); ?></h3>
        <address>
          <strong>Phone</strong>
          <a href="tel:9164655551">916-465-5551</a>
        </address>
        <address>
          <strong>Email</strong>
          <a href="mailto:trainwithbbt@gmail.com">trainwithbbt@gmail.com</a>
        </address>
        <h3 class="footer-title footer-title--spaced"><?php esc_html_e('Quick Links', 'house36-bbt'); ?></h3>
        <ul class="footer-links">
          <li><a href="<?php echo esc_url(house36_bbt_booking_url()); ?>"><?php esc_html_e('Book a Lesson', 'house36-bbt'); ?></a></li>
          <li><a href="<?php echo esc_url(house36_bbt_coaches_url()); ?>"><?php esc_html_e('Meet Coaches', 'house36-bbt'); ?></a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="footer-copy">
        &copy; <?php echo esc_html(date_i18n('Y')); ?> <?php bloginfo('name'); ?>. <?php esc_html_e('All Rights Reserved.', 'house36-bbt'); ?>
      </div>
      <div class="footer-service-area">
        <?php esc_html_e('Proudly Serving: Rocklin, El Dorado Hills, Sacramento, Granite Bay, Folsom, Roseville', 'house36-bbt'); ?>
      </div>
    </div>

    <script type="application/ld+json">
      <?php echo wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT); ?>
    </script>
  </footer>
<?php wp_footer(); ?>
</body>
</html>
