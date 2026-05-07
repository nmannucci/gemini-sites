<?php
get_header();
?>
<main id="main-content" class="default-page">
  <div class="default-page__inner">
    <article class="entry-card">
      <div class="default-page__eyebrow"><?php esc_html_e('Legal', 'house36-bbt'); ?></div>
      <h1 class="default-page__title"><?php esc_html_e('Privacy Policy', 'house36-bbt'); ?></h1>
      <p class="default-page__copy">
        <?php
        echo esc_html(
            sprintf(
                __('Effective date: %s. This page explains how Better Baseball Training may collect and use information submitted through this website.', 'house36-bbt'),
                date_i18n('F j, Y')
            )
        );
        ?>
      </p>

      <div class="entry-content">
        <p><?php esc_html_e('Better Baseball Training uses this site to share program information, accept player interest requests, and help families choose the right next step for baseball lessons, academy memberships, and related services.', 'house36-bbt'); ?></p>

        <h2><?php esc_html_e('Information We May Collect', 'house36-bbt'); ?></h2>
        <p><?php esc_html_e('When you use the forms on this site, BBT may receive information such as a player name, parent or guardian contact details, age, lesson interests, preferred location, and any additional details you choose to share.', 'house36-bbt'); ?></p>

        <h2><?php esc_html_e('How Information May Be Used', 'house36-bbt'); ?></h2>
        <ul>
          <li><?php esc_html_e('To respond to player interest and booking requests', 'house36-bbt'); ?></li>
          <li><?php esc_html_e('To recommend the right lesson, class, or location', 'house36-bbt'); ?></li>
          <li><?php esc_html_e('To follow up about scheduling, programs, or requested services', 'house36-bbt'); ?></li>
          <li><?php esc_html_e('To improve the website experience and understand which pages families use most', 'house36-bbt'); ?></li>
        </ul>

        <h2><?php esc_html_e('Third-Party Tools', 'house36-bbt'); ?></h2>
        <p><?php esc_html_e('Some services linked from this website, such as scheduling tools, waiver forms, embedded calendars, or social media platforms, are operated by third parties. Those services may collect information under their own terms and privacy policies.', 'house36-bbt'); ?></p>

        <h2><?php esc_html_e('Cookies And Site Data', 'house36-bbt'); ?></h2>
        <p><?php esc_html_e('This website may use cookies, embedded content, server logs, or basic analytics tools to help the site function properly and to understand website activity. You can adjust cookie settings through your browser.', 'house36-bbt'); ?></p>

        <h2><?php esc_html_e('Sharing Of Information', 'house36-bbt'); ?></h2>
        <p><?php esc_html_e('BBT does not use this page to promise any specific legal treatment of data beyond what is necessary to operate the site and respond to inquiries. Information may be shared with service providers only when needed to run website forms, scheduling, communication, or hosting infrastructure.', 'house36-bbt'); ?></p>

        <h2><?php esc_html_e('Contact', 'house36-bbt'); ?></h2>
        <p>
          <?php
          echo esc_html(
              sprintf(
                  __('If you have questions about this privacy policy, contact Better Baseball Training at %1$s or %2$s.', 'house36-bbt'),
                  house36_bbt_contact_phone(),
                  house36_bbt_contact_email()
              )
          );
          ?>
        </p>
      </div>
    </article>
  </div>
</main>
<?php
get_footer();
