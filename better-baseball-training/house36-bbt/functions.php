<?php
if (! defined('ABSPATH')) {
    exit;
}

function house36_bbt_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support(
        'custom-logo',
        array(
            'height'      => 160,
            'width'       => 320,
            'flex-height' => true,
            'flex-width'  => true,
        )
    );
    add_theme_support(
        'html5',
        array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
            'style',
            'script',
        )
    );

    register_nav_menus(
        array(
            'primary' => __('Primary Menu', 'house36-bbt'),
        )
    );

    add_post_type_support('page', 'excerpt');
}
add_action('after_setup_theme', 'house36_bbt_setup');

function house36_bbt_enqueue_assets() {
    $theme = wp_get_theme();
    $version = $theme->get('Version') ?: null;

    wp_enqueue_style(
        'house36-bbt-fonts',
        'https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=DM+Mono:wght@400;500&family=Inter:wght@300;400;500&family=Teko:wght@500;600&display=swap',
        array(),
        null
    );

    wp_enqueue_style(
        'house36-bbt-style',
        get_stylesheet_uri(),
        array('house36-bbt-fonts'),
        $version
    );

    wp_enqueue_script(
        'house36-bbt-theme',
        get_template_directory_uri() . '/assets/js/theme.js',
        array(),
        $version,
        true
    );
}
add_action('wp_enqueue_scripts', 'house36_bbt_enqueue_assets');

function house36_bbt_style_loader_tag($html, $handle, $href, $media) {
    if ('house36-bbt-fonts' !== $handle) {
        return $html;
    }

    return sprintf(
        "<link rel='preload' href='%1\$s' as='style' onload=\"this.onload=null;this.rel='stylesheet'\" media='%2\$s'>\n<noscript><link rel='stylesheet' href='%1\$s' media='%2\$s'></noscript>\n",
        esc_url($href),
        esc_attr($media)
    );
}
add_filter('style_loader_tag', 'house36_bbt_style_loader_tag', 10, 4);

function house36_bbt_resource_hints($urls, $relation_type) {
    if ('preconnect' === $relation_type) {
        $urls[] = 'https://fonts.googleapis.com';
        $urls[] = array(
            'href'        => 'https://fonts.gstatic.com',
            'crossorigin' => 'anonymous',
        );
    }

    if ('dns-prefetch' === $relation_type) {
        $urls[] = 'https://fonts.googleapis.com';
        $urls[] = 'https://fonts.gstatic.com';
    }

    return $urls;
}
add_filter('wp_resource_hints', 'house36_bbt_resource_hints', 10, 2);

function house36_bbt_asset($path = '') {
    return trailingslashit(get_template_directory_uri()) . 'assets/' . ltrim($path, '/');
}

function house36_bbt_asset_path($path = '') {
    return trailingslashit(get_template_directory()) . 'assets/' . ltrim($path, '/');
}

function house36_bbt_asset_dimensions($path = '') {
    $dimensions = array(
        'brand-assets/BBT Logo 1-no bg.png' => array(533, 468),
        'brand-assets/BBT Logo 2.jpeg'       => array(695, 606),
        'images/coach-jon-peters.jpg'        => array(400, 500),
        'images/cesar-tamayo.jpeg'           => array(1320, 977),
        'images/trey-furrey.jpeg'            => array(1125, 1289),
        'images/bruce-carmichael.PNG'        => array(1288, 1460),
        'images/gabe-emmett.jpeg'            => array(1050, 1118),
        'images/jean-machi.jpeg'             => array(1320, 2603),
        'images/service-hitting-1.PNG'       => array(1320, 743),
        'images/service-pitching-2.PNG'      => array(1320, 753),
        'images/service-inf.ouf-3.PNG'       => array(1320, 722),
        'images/service-catching-4.PNG'      => array(1210, 842),
        'images/service-baseball.iq-5.PNG'   => array(1320, 1054),
        'images/hero-slideshow-1.PNG'        => array(1320, 774),
        'images/hero-slideshow-2.PNG'        => array(1299, 697),
        'images/hero-slideshow-3.PNG'        => array(1320, 843),
        'images/hero-slideshow-4.PNG'        => array(1320, 833),
        'images/hero-slideshow-5.PNG'        => array(1320, 832),
        'images/facility-img-1.jpg'          => array(905, 679),
        'images/facility-img-2.jpg'          => array(679, 679),
        'images/facility-img-3.jpg'          => array(905, 679),
        'images/facility-img-4.jpg'          => array(905, 679),
        'images/IMG_0604.jpg'                => array(5712, 4284),
        'images/IMG_0605.jpg'                => array(5712, 4284),
        'images/IMG_0607.jpg'                => array(5712, 4284),
        'images/IMG_0609.jpg'                => array(5712, 4284),
        'images/jp-signature-white.png'      => array(91, 72),
        'images/logo-bbt.png'                => array(115, 104),
        'images/logo-bbt-white.png'          => array(119, 119),
    );

    return $dimensions[$path] ?? null;
}

function house36_bbt_asset_variant_url($path, $width) {
    $name = pathinfo($path, PATHINFO_FILENAME);
    $variant_rel_path = sprintf('optimized/%s-%d.webp', $name, absint($width));

    if (! file_exists(house36_bbt_asset_path($variant_rel_path))) {
        return '';
    }

    return house36_bbt_asset($variant_rel_path);
}

function house36_bbt_asset_srcset($path, $widths) {
    $srcset = array();

    foreach ($widths as $width) {
        $variant = house36_bbt_asset_variant_url($path, $width);

        if ($variant) {
            $srcset[] = sprintf('%s %dw', esc_url($variant), absint($width));
        }
    }

    return implode(', ', $srcset);
}

function house36_bbt_home_section_url($section = '') {
    $section = ltrim((string) $section, '#');

    return $section ? home_url('/#' . $section) : home_url('/');
}

function house36_bbt_get_page_url($path, $fallback = '') {
    $page = get_page_by_path(trim((string) $path, '/'));

    if ($page instanceof WP_Post) {
        return get_permalink($page);
    }

    if ($fallback !== '') {
        return home_url('/' . trim($fallback, '/') . '/');
    }

    return home_url('/' . trim((string) $path, '/') . '/');
}

function house36_bbt_schedule_url() {
    return house36_bbt_get_page_url('schedule', 'schedule');
}

function house36_bbt_coaches_url() {
    return house36_bbt_get_page_url('coaches', 'coaches');
}

function house36_bbt_booking_url() {
    return 'https://api.leadconnectorhq.com/widget/form/BJLwn3WfcWbG1bhz4nJA';
}

function house36_bbt_logo($class = 'nav-logo', $fallback_asset = 'brand-assets/BBT Logo 2.jpeg', $linked = true) {
    $site_name = get_bloginfo('name');
    $image_html = '';
    $should_use_custom_logo = has_custom_logo() && false !== strpos((string) $class, 'nav-logo');

    if ($should_use_custom_logo) {
        $logo_id = get_theme_mod('custom_logo');
        $image_html = wp_get_attachment_image(
            $logo_id,
            'full',
            false,
            array(
                'class'         => $class,
                'alt'           => $site_name,
                'loading'       => 'eager',
                'decoding'      => 'async',
                'fetchpriority' => 'low',
                'sizes'         => '180px',
            )
        );
    }

    if (! $image_html && $fallback_asset) {
        $dimensions = house36_bbt_asset_dimensions($fallback_asset);
        $fallback_src = house36_bbt_asset($fallback_asset);
        $fallback_srcset = '';
        $fallback_sizes = '';

        if ('hero-logo-mark' === $class) {
            $fallback_src = house36_bbt_asset_variant_url($fallback_asset, 320) ?: $fallback_src;
            $fallback_srcset = house36_bbt_asset_srcset($fallback_asset, array(160, 320));
            $fallback_sizes = '140px';
        } elseif (false !== strpos((string) $class, 'footer-logo')) {
            $fallback_src = house36_bbt_asset_variant_url($fallback_asset, 320) ?: $fallback_src;
            $fallback_srcset = house36_bbt_asset_srcset($fallback_asset, array(160, 320));
            $fallback_sizes = '180px';
        }

        $image_html = sprintf(
            '<img src="%1$s" alt="%2$s" class="%3$s" loading="eager" decoding="async"%4$s%5$s%6$s />',
            esc_url($fallback_src),
            esc_attr($site_name),
            esc_attr($class),
            $dimensions
                ? sprintf(
                    ' width="%d" height="%d"',
                    absint($dimensions[0]),
                    absint($dimensions[1])
                )
                : '',
            $fallback_srcset ? sprintf(' srcset="%s"', esc_attr($fallback_srcset)) : '',
            $fallback_sizes ? sprintf(' sizes="%s"', esc_attr($fallback_sizes)) : ''
        );
    }

    if (! $image_html) {
        $image_html = sprintf(
            '<span class="%1$s nav-title">%2$s</span>',
            esc_attr($class),
            esc_html($site_name)
        );
    }

    if (! $linked) {
        return $image_html;
    }

    return sprintf(
        '<a href="%1$s" class="%2$s-link" rel="home" aria-label="%4$s">%3$s</a>',
        esc_url(home_url('/')),
        esc_attr($class),
        $image_html,
        esc_attr__('Go to homepage', 'house36-bbt')
    );
}

function house36_bbt_primary_menu_fallback($args) {
    $items = array(
        array('Home', house36_bbt_home_section_url('hero')),
        array('Lessons', house36_bbt_home_section_url('lessons')),
        array('Schedule', house36_bbt_schedule_url()),
        array('Coaches', house36_bbt_coaches_url()),
        array('Facilities', house36_bbt_home_section_url('facilities')),
        array('Memberships', house36_bbt_home_section_url('memberships')),
    );

    $menu = '<ul class="' . esc_attr($args['menu_class'] ?? 'menu') . '">';

    foreach ($items as $item) {
        $menu .= sprintf(
            '<li><a href="%1$s">%2$s</a></li>',
            esc_url($item[1]),
            esc_html($item[0])
        );
    }

    $menu .= '</ul>';

    if (! empty($args['echo'])) {
        echo $menu; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
    }

    return $menu;
}

function house36_bbt_get_meta_description() {
    if (is_singular()) {
        $post = get_queried_object();

        if ($post instanceof WP_Post) {
            $description = has_excerpt($post) ? get_the_excerpt($post) : wp_strip_all_tags(strip_shortcodes($post->post_content));
            $description = trim(preg_replace('/\s+/', ' ', $description));

            if ($description) {
                return wp_trim_words($description, 32, '...');
            }
        }
    }

    return 'BBT is a sports performance platform developing youth baseball players socially, physically and mentally. Private lessons, academy memberships, and travel baseball in Rocklin & El Dorado Hills, CA.';
}

function house36_bbt_output_meta_tags() {
    $title = wp_get_document_title();
    $description = house36_bbt_get_meta_description();
    $request_path = '';

    if (isset($GLOBALS['wp']) && ! empty($GLOBALS['wp']->request)) {
        $request_path = $GLOBALS['wp']->request;
    }

    $url = is_singular() ? get_permalink() : home_url('/' . ltrim($request_path, '/'));
    $type = is_front_page() ? 'website' : 'article';
    ?>
<meta name="description" content="<?php echo esc_attr($description); ?>" />
<meta property="og:title" content="<?php echo esc_attr($title); ?>" />
<meta property="og:description" content="<?php echo esc_attr($description); ?>" />
<meta property="og:url" content="<?php echo esc_url($url); ?>" />
<meta property="og:type" content="<?php echo esc_attr($type); ?>" />
<meta name="twitter:card" content="summary_large_image" />
    <?php
}
add_action('wp_head', 'house36_bbt_output_meta_tags', 1);

function house36_bbt_preload_front_page_assets() {
    if (! is_front_page()) {
        return;
    }
    ?>
<link rel="preload" as="image" href="<?php echo esc_url(house36_bbt_asset_variant_url('images/hero-slideshow-1.PNG', 720)); ?>" imagesrcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/hero-slideshow-1.PNG', array(720, 960, 1320))); ?>" imagesizes="100vw" fetchpriority="high" />
    <?php
}
add_action('wp_head', 'house36_bbt_preload_front_page_assets', 2);
