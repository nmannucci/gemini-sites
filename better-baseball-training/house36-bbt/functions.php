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
        array(
            'in_footer' => true,
            'strategy'  => 'defer',
        )
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

function house36_bbt_lessons_base_slug() {
    return 'lessons';
}

function house36_bbt_lessons_data() {
    return array(
        'hitting'          => array(
            'label'            => 'Hitting',
            'headline'         => 'Hitting Lessons That Build More Confident, Game-Ready Hitters',
            'subheadline'      => 'Whether your athlete needs cleaner mechanics, better timing, or more confidence in the box, Better Baseball Training gives them focused instruction and a clear plan for better at-bats.',
            'overview'         => 'Our hitting lessons are built for players who need more than random reps. We help athletes build swings they can trust, develop a stronger approach at the plate, and carry more confidence into games.',
            'section_title'    => 'What This Lesson Helps Build',
            'focus_items'      => array(
                'More consistent contact and better quality at-bats',
                'A swing players can repeat under game pressure',
                'Better timing, plate discipline, and approach',
                'More confidence stepping into the box',
            ),
            'form_copy'        => 'Tell us a little about your athlete and our team will help you find the right hitting lesson, coach, and next step.',
            'image'            => 'images/service-hitting-1.PNG',
            'image_alt'        => 'Hitting lesson at Better Baseball Training',
            'image_widths'     => array(640, 960),
            'meta_description' => 'Hitting lessons at Better Baseball Training in Rocklin and El Dorado Hills. Help your athlete build a more confident swing, better timing, and stronger game performance at the plate.',
        ),
        'pitching'         => array(
            'label'            => 'Pitching',
            'headline'         => 'Pitching Lessons That Improve Command, Confidence, and Development',
            'subheadline'      => 'If your athlete needs better mechanics, more command, or a clearer plan on the mound, BBT provides focused coaching that supports both performance and long-term development.',
            'overview'         => 'Our pitching lessons help players throw with more intent, better control, and greater confidence under pressure. We focus on building healthy, repeatable movement patterns so athletes can compete now and keep improving over time.',
            'section_title'    => 'What This Lesson Helps Build',
            'focus_items'      => array(
                'More repeatable mechanics and better command',
                'Healthier arm care habits and stronger movement quality',
                'A clearer plan for velocity and overall development',
                'More confidence, poise, and trust on the mound',
            ),
            'form_copy'        => 'Share a few details about your athlete and we will help you find the right pitching lesson, coach, and next step.',
            'image'            => 'images/service-pitching-2.PNG',
            'image_alt'        => 'Pitching lesson at Better Baseball Training',
            'image_widths'     => array(640, 960),
            'meta_description' => 'Pitching lessons at Better Baseball Training in Rocklin and El Dorado Hills. Help your athlete improve command, mechanics, arm care, and confidence on the mound.',
        ),
        'infield-outfield' => array(
            'label'            => 'Infield / Outfield',
            'headline'         => 'Defensive Lessons That Help Players Move Better and Think Faster',
            'subheadline'      => 'For players who need better footwork, cleaner reads, and more confidence on defense, BBT delivers instruction that helps the game slow down and performance speed up.',
            'overview'         => 'Our infield and outfield lessons help athletes become more dependable defenders. Players learn how to move with purpose, react faster, and make better decisions so they can play with more confidence when the ball is hit their way.',
            'section_title'    => 'What This Lesson Helps Build',
            'focus_items'      => array(
                'Cleaner footwork and faster first-step reactions',
                'Better reads, routes, glove work, and throwing decisions',
                'Stronger positioning and defensive awareness',
                'More confidence making plays in game-speed moments',
            ),
            'form_copy'        => 'Tell us about your athlete and our staff will help you choose the right defensive lesson and next step for infield or outfield development.',
            'image'            => 'images/service-inf.ouf-3.PNG',
            'image_alt'        => 'Infield and outfield lesson at Better Baseball Training',
            'image_widths'     => array(640, 960),
            'meta_description' => 'Infield and outfield lessons at Better Baseball Training in Rocklin and El Dorado Hills. Help your athlete improve footwork, reads, positioning, and defensive confidence.',
        ),
        'catching'         => array(
            'label'            => 'Catching',
            'headline'         => 'Catching Lessons for Players Ready to Lead Behind the Plate',
            'subheadline'      => 'If your athlete wants to become more reliable, more confident, and more complete as a catcher, BBT offers position-specific coaching built around real game demands.',
            'overview'         => 'Our catching lessons help players grow into stronger leaders behind the plate. Athletes work on the technical details of the position while building the confidence, communication, and consistency that coaches and parents want to see in games.',
            'section_title'    => 'What This Lesson Helps Build',
            'focus_items'      => array(
                'More reliable receiving, blocking, and recovery',
                'Cleaner footwork and quicker, more confident transfers',
                'Better communication and control behind the plate',
                'A catcher who can lead the game with confidence',
            ),
            'form_copy'        => 'Share a few details about your athlete and we will help you find the right catching lesson, coach, and next step.',
            'image'            => 'images/service-catching-4.PNG',
            'image_alt'        => 'Catching lesson at Better Baseball Training',
            'image_widths'     => array(640, 960),
            'meta_description' => 'Catching lessons at Better Baseball Training in Rocklin and El Dorado Hills. Help your athlete improve receiving, blocking, footwork, and leadership behind the plate.',
        ),
        'baseball-iq'      => array(
            'label'            => 'Baseball IQ',
            'headline'         => 'Baseball IQ Training That Helps Players Make Better In-Game Decisions',
            'subheadline'      => 'For athletes who need the game to slow down, BBT teaches the awareness, preparation, and decision-making that turn raw ability into smarter play.',
            'overview'         => 'Our baseball IQ lessons help players become more prepared, more confident, and more dependable in real game situations. Athletes learn how to recognize what is happening faster and make better decisions when it matters most.',
            'section_title'    => 'What This Lesson Helps Build',
            'focus_items'      => array(
                'Stronger situational awareness and preparation habits',
                'Better offensive and defensive decision-making',
                'A clearer understanding of responsibilities in game moments',
                'More confidence when the pressure is on',
            ),
            'form_copy'        => 'Tell us about your athlete and our team will help you find the right next step for baseball IQ training and overall development.',
            'image'            => 'images/service-baseball.iq-5.PNG',
            'image_alt'        => 'Baseball IQ lesson at Better Baseball Training',
            'image_widths'     => array(640, 960),
            'meta_description' => 'Baseball IQ lessons at Better Baseball Training in Rocklin and El Dorado Hills. Help your athlete improve game awareness, decision-making, and confidence in live situations.',
        ),
    );
}

function house36_bbt_lessons_menu_items() {
    return array(
        array(
            'title' => 'Hitting',
            'url'   => house36_bbt_lesson_url('hitting'),
        ),
        array(
            'title' => 'Pitching',
            'url'   => house36_bbt_lesson_url('pitching'),
        ),
        array(
            'title' => 'Infield / Outfield',
            'url'   => house36_bbt_lesson_url('infield-outfield'),
        ),
        array(
            'title' => 'Catching',
            'url'   => house36_bbt_lesson_url('catching'),
        ),
        array(
            'title' => 'Baseball IQ',
            'url'   => house36_bbt_lesson_url('baseball-iq'),
        ),
    );
}

function house36_bbt_get_lesson($slug) {
    $lessons = house36_bbt_lessons_data();
    $slug = sanitize_title((string) $slug);

    if (! isset($lessons[$slug]) || ! is_array($lessons[$slug])) {
        return null;
    }

    return array_merge(
        $lessons[$slug],
        array(
            'slug'  => $slug,
            'title' => $lessons[$slug]['label'] ?? ucwords(str_replace('-', ' ', $slug)),
        )
    );
}

function house36_bbt_lesson_url($slug) {
    $slug = sanitize_title((string) $slug);

    if (! house36_bbt_get_lesson($slug)) {
        return home_url('/');
    }

    return home_url('/' . trim(house36_bbt_lessons_base_slug(), '/') . '/' . $slug . '/');
}

function house36_bbt_booking_slug() {
    return 'book-now';
}

function house36_bbt_booking_url() {
    return house36_bbt_get_page_url(house36_bbt_booking_slug(), house36_bbt_booking_slug());
}

function house36_bbt_is_lessons_page() {
    return get_query_var('house36_bbt_page') === house36_bbt_lessons_base_slug() && (bool) house36_bbt_get_current_lesson();
}

function house36_bbt_get_current_lesson() {
    return house36_bbt_get_lesson(get_query_var('house36_bbt_lesson'));
}

function house36_bbt_is_booking_page() {
    return get_query_var('house36_bbt_page') === house36_bbt_booking_slug();
}

function house36_bbt_is_coaches_page() {
    return is_page('coaches') || is_page_template('page-coaches.php');
}

function house36_bbt_is_schedule_page() {
    return is_page('schedule') || is_page_template('page-schedule.php');
}

function house36_bbt_is_focus_page() {
    return is_front_page() || house36_bbt_is_lessons_page() || house36_bbt_is_booking_page() || house36_bbt_is_coaches_page() || house36_bbt_is_schedule_page();
}

function house36_bbt_locations_data() {
    return array(
        'rocklin' => array(
            'name'            => 'Rocklin',
            'full_name'       => 'Better Baseball Training - Rocklin',
            'address_line'    => '4283 Duluth Ave',
            'city_state_zip'  => 'Rocklin, CA 95765',
            'location_url'    => house36_bbt_home_section_url('rocklin-training'),
            'summary'         => 'Rocklin serves families looking for private lessons, academy training, and travel baseball development in Placer County.',
        ),
        'el-dorado-hills' => array(
            'name'            => 'El Dorado Hills',
            'full_name'       => 'Better Baseball Training - El Dorado Hills',
            'address_line'    => '4990 Hillsdale Dr, Suite 400',
            'city_state_zip'  => 'El Dorado Hills, CA 95762',
            'location_url'    => house36_bbt_home_section_url('el-dorado-hills-training'),
            'summary'         => 'El Dorado Hills offers indoor baseball lessons, academy classes, and player development for families across EDH, Folsom, and surrounding communities.',
        ),
    );
}

function house36_bbt_coaches_data() {
    return array(
        'jon-peters' => array(
            'anchor'      => 'jon-peters',
            'name'        => 'Jon Peters',
            'job_title'   => 'Owner / Player Development',
            'description' => 'Oversees player development programming across both BBT facilities, with experience in youth, collegiate, and summer-ball coaching.',
            'locations'   => array('Rocklin', 'El Dorado Hills'),
            'specialties' => array('Player development', 'Hitting', 'Pitching', 'Academy programming'),
            'image'       => house36_bbt_asset('images/coach-jon-peters.jpg'),
            'alumniOf'    => array(
                array(
                    '@type' => 'CollegeOrUniversity',
                    'name'  => 'Chico State',
                    'url'   => 'https://en.wikipedia.org/wiki/California_State_University,_Chico',
                ),
                array(
                    '@type' => 'CollegeOrUniversity',
                    'name'  => 'Folsom Lake College',
                    'url'   => 'https://en.wikipedia.org/wiki/Folsom_Lake_College',
                ),
            ),
        ),
        'cesar-tamayo' => array(
            'anchor'      => 'cesar-tamayo',
            'name'        => 'Cesar Tamayo',
            'job_title'   => 'Rocklin GM',
            'description' => 'Leads Rocklin programming and supports player development with collegiate experience and a kinesiology background.',
            'locations'   => array('Rocklin'),
            'specialties' => array('Player development', 'Academy programming', 'Travel baseball'),
            'image'       => house36_bbt_asset('images/cesar-tamayo.jpeg'),
            'alumniOf'    => array(
                array(
                    '@type' => 'CollegeOrUniversity',
                    'name'  => 'Jessup University',
                    'url'   => 'https://en.wikipedia.org/wiki/Jessup_University',
                ),
                array(
                    '@type' => 'CollegeOrUniversity',
                    'name'  => 'Marymount University',
                    'url'   => 'https://en.wikipedia.org/wiki/Marymount_University',
                ),
            ),
        ),
        'trey-furrey' => array(
            'anchor'      => 'trey-furrey',
            'name'        => 'Trey Furrey',
            'job_title'   => 'El Dorado Hills GM',
            'description' => 'Leads BBT programming in El Dorado Hills and brings All-America playing experience to academy and team development.',
            'locations'   => array('El Dorado Hills'),
            'specialties' => array('Player development', 'Academy programming', 'Travel baseball'),
            'image'       => house36_bbt_asset('images/trey-furrey.jpeg'),
            'alumniOf'    => array(
                array(
                    '@type' => 'CollegeOrUniversity',
                    'name'  => 'Jessup University',
                    'url'   => 'https://en.wikipedia.org/wiki/Jessup_University',
                ),
                array(
                    '@type' => 'CollegeOrUniversity',
                    'name'  => 'Oklahoma Baptist University',
                ),
                array(
                    '@type' => 'CollegeOrUniversity',
                    'name'  => 'Folsom Lake College',
                ),
            ),
        ),
        'bruce-carmichael' => array(
            'anchor'      => 'bruce-carmichael',
            'name'        => 'Bruce Carmichael',
            'job_title'   => '13U Gray Head Coach',
            'description' => 'Former Chicago Cubs draft pick and longtime coach with experience across college and high school baseball.',
            'locations'   => array('Rocklin', 'El Dorado Hills'),
            'specialties' => array('Player development', 'Travel baseball', 'Defense'),
            'image'       => house36_bbt_asset('images/bruce-carmichael.PNG'),
            'alumniOf'    => array(
                array(
                    '@type' => 'SportsOrganization',
                    'name'  => 'Chicago Cubs',
                    'url'   => 'https://en.wikipedia.org/wiki/Chicago_Cubs',
                ),
                array(
                    '@type' => 'CollegeOrUniversity',
                    'name'  => 'Santa Clara University',
                    'url'   => 'https://en.wikipedia.org/wiki/Santa_Clara_University',
                ),
            ),
        ),
        'jean-machi' => array(
            'anchor'      => 'jean-machi',
            'name'        => 'Jean Machi',
            'job_title'   => 'Pitching Coach',
            'description' => 'Former MLB pitcher and 2014 World Series Champion offering pitching lessons in El Dorado Hills.',
            'locations'   => array('El Dorado Hills'),
            'specialties' => array('Pitching', 'Private lessons', 'Professional experience'),
            'image'       => house36_bbt_asset('images/jean-machi.jpeg'),
            'alumniOf'    => array(
                array(
                    '@type' => 'SportsOrganization',
                    'name'  => 'San Francisco Giants',
                    'url'   => 'https://en.wikipedia.org/wiki/San_Francisco_Giants',
                ),
            ),
        ),
        'gabe-emmett' => array(
            'anchor'      => 'gabe-emmett',
            'name'        => 'Gabe Emmett',
            'job_title'   => 'Pitching Coach',
            'description' => 'Former Dodgers draft pick providing pitching instruction with recent professional development experience.',
            'locations'   => array('Rocklin', 'El Dorado Hills'),
            'specialties' => array('Pitching', 'Velocity development', 'Private lessons'),
            'image'       => house36_bbt_asset('images/gabe-emmett.jpeg'),
            'alumniOf'    => array(
                array(
                    '@type' => 'SportsOrganization',
                    'name'  => 'Los Angeles Dodgers',
                    'url'   => 'https://en.wikipedia.org/wiki/Los_Angeles_Dodgers',
                ),
                array(
                    '@type' => 'CollegeOrUniversity',
                    'name'  => 'Folsom Lake College',
                    'url'   => 'https://en.wikipedia.org/wiki/Folsom_Lake_College',
                ),
            ),
        ),
        'kris-krise' => array(
            'anchor'      => 'kris-krise',
            'name'        => 'Kris Krise',
            'job_title'   => '12U Black Head Coach',
            'description' => 'Former Dodgers draft pick with collegiate experience at UC Irvine, COC, and Chico State.',
            'locations'   => array('Rocklin', 'El Dorado Hills'),
            'specialties' => array('Player development', 'Travel baseball', 'Hitting'),
            'image'       => house36_bbt_asset('images/kris-krise.jpeg'),
            'alumniOf'    => array(
                array(
                    '@type' => 'SportsOrganization',
                    'name'  => 'Los Angeles Dodgers',
                    'url'   => 'https://en.wikipedia.org/wiki/Los_Angeles_Dodgers',
                ),
                array(
                    '@type' => 'CollegeOrUniversity',
                    'name'  => 'Chico State',
                    'url'   => 'https://en.wikipedia.org/wiki/California_State_University,_Chico',
                ),
                array(
                    '@type' => 'CollegeOrUniversity',
                    'name'  => 'UC Irvine',
                    'url'   => 'https://en.wikipedia.org/wiki/University_of_California,_Irvine',
                ),
            ),
        ),
        'logan-coe' => array(
            'anchor'      => 'logan-coe',
            'name'        => 'Logan Coe',
            'job_title'   => 'Coach',
            'description' => 'College alumnus focused on energetic instruction and player development.',
            'locations'   => array('Rocklin', 'El Dorado Hills'),
            'specialties' => array('Player development', 'Defense', 'Academy classes'),
            'image'       => house36_bbt_asset('images/logan-coe.PNG'),
            'alumniOf'    => array(
                array(
                    '@type' => 'CollegeOrUniversity',
                    'name'  => 'Jessup University',
                ),
                array(
                    '@type' => 'CollegeOrUniversity',
                    'name'  => 'Oklahoma Baptist University',
                ),
            ),
        ),
        'nolan-theibay' => array(
            'anchor'      => 'nolan-theibay',
            'name'        => 'Nolan Theibay',
            'job_title'   => 'Coach',
            'description' => 'Jessup University alumnus supporting player development at BBT.',
            'locations'   => array('Rocklin', 'El Dorado Hills'),
            'specialties' => array('Player development', 'Academy classes'),
            'image'       => house36_bbt_asset('images/nolan-theibay.jpeg'),
            'alumniOf'    => array(
                array(
                    '@type' => 'CollegeOrUniversity',
                    'name'  => 'Jessup University',
                ),
            ),
        ),
        'quintan-hall' => array(
            'anchor'      => 'quintan-hall',
            'name'        => 'Quintan Hall',
            'job_title'   => 'Coach',
            'description' => 'College coach with experience at Johnson County Community College, Central Missouri, and Jessup University.',
            'locations'   => array('Rocklin', 'El Dorado Hills'),
            'specialties' => array('Player development', 'Defense', 'Academy classes'),
            'image'       => house36_bbt_asset('images/quinten-hall.jpeg'),
            'alumniOf'    => array(
                array(
                    '@type' => 'CollegeOrUniversity',
                    'name'  => 'Jessup University',
                ),
                array(
                    '@type' => 'CollegeOrUniversity',
                    'name'  => 'University of Central Missouri',
                ),
                array(
                    '@type' => 'CollegeOrUniversity',
                    'name'  => 'Johnson County Community College',
                ),
            ),
        ),
        'jackson-doherty' => array(
            'anchor'      => 'jackson-doherty',
            'name'        => 'Jackson Doherty',
            'job_title'   => 'Coach',
            'description' => 'Former collegiate player and Louisville Slugger Innovations R&D testing engineer.',
            'locations'   => array('Rocklin', 'El Dorado Hills'),
            'specialties' => array('Player development', 'Hitting', 'Bat technology'),
            'image'       => house36_bbt_asset('images/jackson-doherty.PNG'),
            'alumniOf'    => array(
                array(
                    '@type' => 'CollegeOrUniversity',
                    'name'  => 'Benedictine College',
                ),
                array(
                    '@type' => 'CollegeOrUniversity',
                    'name'  => 'Coffeyville Community College',
                ),
            ),
        ),
        'bryce-petrilla' => array(
            'anchor'      => 'bryce-petrilla',
            'name'        => 'Bryce Petrilla',
            'job_title'   => 'Coach',
            'description' => 'Rocklin-area college alumnus with playing experience at Folsom Lake College, Oregon Tech, and Jessup University.',
            'locations'   => array('Rocklin', 'El Dorado Hills'),
            'specialties' => array('Player development', 'Defense', 'Academy classes'),
            'image'       => house36_bbt_asset('images/bryce-pertrilla.PNG'),
            'alumniOf'    => array(
                array(
                    '@type' => 'CollegeOrUniversity',
                    'name'  => 'Jessup University',
                ),
                array(
                    '@type' => 'CollegeOrUniversity',
                    'name'  => 'Oregon Tech',
                ),
                array(
                    '@type' => 'CollegeOrUniversity',
                    'name'  => 'Folsom Lake College',
                ),
            ),
        ),
        'justin-watari' => array(
            'anchor'      => 'justin-watari',
            'name'        => 'Justin Watari',
            'job_title'   => 'Coach',
            'description' => 'University of New Mexico alumnus helping athletes develop physically and mentally for the next level.',
            'locations'   => array('Rocklin', 'El Dorado Hills'),
            'specialties' => array('Player development', 'Academy classes'),
            'image'       => house36_bbt_asset('images/justin-watari.PNG'),
            'alumniOf'    => array(
                array(
                    '@type' => 'CollegeOrUniversity',
                    'name'  => 'University of New Mexico',
                ),
            ),
        ),
        'mike-quintal' => array(
            'anchor'      => 'mike-quintal',
            'name'        => 'Mike Quintal',
            'job_title'   => 'Coach',
            'description' => 'Former collegiate player with experience at Santa Clara, San Jose City College, and Cal Poly Pomona.',
            'locations'   => array('Rocklin', 'El Dorado Hills'),
            'specialties' => array('Player development', 'Academy classes'),
            'image'       => house36_bbt_asset('images/logo-american-b-black-yellow.png'),
            'alumniOf'    => array(
                array(
                    '@type' => 'CollegeOrUniversity',
                    'name'  => 'Cal Poly Pomona',
                ),
                array(
                    '@type' => 'CollegeOrUniversity',
                    'name'  => 'Santa Clara University',
                ),
                array(
                    '@type' => 'CollegeOrUniversity',
                    'name'  => 'San Jose City College',
                ),
            ),
        ),
    );
}

function house36_bbt_lesson_related_coach_keys($slug) {
    $map = array(
        'hitting'          => array('jon-peters', 'kris-krise', 'cesar-tamayo', 'trey-furrey'),
        'pitching'         => array('jean-machi', 'gabe-emmett', 'jon-peters', 'bruce-carmichael'),
        'infield-outfield' => array('cesar-tamayo', 'trey-furrey', 'logan-coe', 'bryce-petrilla'),
        'catching'         => array('jon-peters', 'bruce-carmichael', 'quintan-hall', 'logan-coe'),
        'baseball-iq'      => array('jon-peters', 'trey-furrey', 'justin-watari', 'kris-krise'),
    );

    return $map[sanitize_title((string) $slug)] ?? array();
}

function house36_bbt_lesson_related_coaches($slug) {
    $coaches = house36_bbt_coaches_data();
    $related = array();

    foreach (house36_bbt_lesson_related_coach_keys($slug) as $key) {
        if (isset($coaches[$key])) {
            $related[$key] = $coaches[$key];
        }
    }

    return $related;
}

function house36_bbt_home_meta_title() {
    return 'Youth Baseball Lessons in Rocklin & El Dorado Hills | ' . get_bloginfo('name');
}

function house36_bbt_home_meta_description() {
    return 'Private baseball lessons, academy memberships, pitching, hitting, and travel baseball in Rocklin and El Dorado Hills for players ages 8-14U.';
}

function house36_bbt_current_page_name() {
    if (is_front_page()) {
        return 'Youth Baseball Lessons in Rocklin & El Dorado Hills';
    }

    if (house36_bbt_is_booking_page()) {
        return 'Book Baseball Lessons and Training in Rocklin & El Dorado Hills';
    }

    if (house36_bbt_is_coaches_page()) {
        return 'Baseball Coaches in Rocklin & El Dorado Hills';
    }

    if (house36_bbt_is_schedule_page()) {
        return 'Baseball Training Schedule in Rocklin & El Dorado Hills';
    }

    $lesson = house36_bbt_get_current_lesson();

    if ($lesson) {
        return sprintf('%s Lessons in Rocklin & El Dorado Hills', $lesson['title']);
    }

    if (is_singular()) {
        return get_the_title(get_queried_object_id());
    }

    return wp_get_document_title();
}

function house36_bbt_current_canonical_url() {
    if (house36_bbt_is_lessons_page()) {
        $lesson = house36_bbt_get_current_lesson();

        return $lesson ? house36_bbt_lesson_url($lesson['slug']) : house36_bbt_home_section_url('lessons');
    }

    if (house36_bbt_is_booking_page()) {
        return house36_bbt_booking_url();
    }

    if (house36_bbt_is_coaches_page()) {
        return house36_bbt_coaches_url();
    }

    if (house36_bbt_is_schedule_page()) {
        return house36_bbt_schedule_url();
    }

    if (is_front_page()) {
        return home_url('/');
    }

    if (is_singular()) {
        return get_permalink(get_queried_object_id());
    }

    return home_url(add_query_arg(array(), $GLOBALS['wp']->request ?? ''));
}

function house36_bbt_current_meta_description() {
    if (is_front_page()) {
        return house36_bbt_home_meta_description();
    }

    $override = house36_bbt_get_meta_description();

    if ($override) {
        return $override;
    }

    if (is_singular()) {
        $post = get_post(get_queried_object_id());

        if ($post instanceof WP_Post && has_excerpt($post)) {
            return wp_strip_all_tags(get_the_excerpt($post));
        }
    }

    return get_bloginfo('description');
}

function house36_bbt_current_webpage_schema() {
    $canonical = house36_bbt_current_canonical_url();

    if (! $canonical) {
        return null;
    }

    return array(
        '@context'    => 'https://schema.org',
        '@type'       => 'WebPage',
        '@id'         => untrailingslashit($canonical) . '#webpage',
        'url'         => $canonical,
        'name'        => house36_bbt_current_page_name(),
        'description' => house36_bbt_current_meta_description(),
        'isPartOf'    => array(
            '@id' => home_url('/#website'),
        ),
        'about'       => array(
            '@id' => home_url('/#organization'),
        ),
    );
}

function house36_bbt_virtual_sitemap_url() {
    return home_url('/training-sitemap.xml');
}

function house36_bbt_add_query_vars($vars) {
    $vars[] = 'house36_bbt_llms_txt';
    $vars[] = 'house36_bbt_training_sitemap';
    return $vars;
}
add_filter('query_vars', 'house36_bbt_add_query_vars');

function house36_bbt_register_virtual_pages() {
    add_rewrite_tag('%house36_bbt_page%', '([^&]+)');
    add_rewrite_tag('%house36_bbt_lesson%', '([^&]+)');

    add_rewrite_rule(
        '^llms\.txt$',
        'index.php?house36_bbt_llms_txt=1',
        'top'
    );
    add_rewrite_rule(
        '^training-sitemap\.xml$',
        'index.php?house36_bbt_training_sitemap=1',
        'top'
    );

    add_rewrite_rule(
        '^' . preg_quote(house36_bbt_booking_slug(), '/') . '/?$',
        'index.php?house36_bbt_page=' . house36_bbt_booking_slug(),
        'top'
    );
    add_rewrite_rule(
        '^' . preg_quote(house36_bbt_lessons_base_slug(), '/') . '/([^/]+)/?$',
        'index.php?house36_bbt_page=' . house36_bbt_lessons_base_slug() . '&house36_bbt_lesson=$matches[1]',
        'top'
    );
}
add_action('init', 'house36_bbt_register_virtual_pages');

function house36_bbt_serve_llms_txt() {
    if (get_query_var('house36_bbt_llms_txt')) {
        header('Content-Type: text/plain; charset=utf-8');

        $locations = house36_bbt_locations_data();
        $coaches = house36_bbt_coaches_data();
        $lesson_links = array();

        foreach (house36_bbt_lessons_data() as $slug => $lesson) {
            $lesson_links[] = sprintf(
                '- %s: %s',
                $lesson['label'],
                house36_bbt_lesson_url($slug)
            );
        }

        echo "# Better Baseball Training\n\n";
        echo "Better Baseball Training provides youth baseball lessons, academy memberships, and travel baseball development in Rocklin and El Dorado Hills, California.\n\n";
        echo "## Core Facts\n";
        echo "- Website: " . home_url('/') . "\n";
        echo "- Coaches page: " . house36_bbt_coaches_url() . "\n";
        echo "- Schedule page: " . house36_bbt_schedule_url() . "\n";
        echo "- Booking page: " . house36_bbt_booking_url() . "\n";
        echo "- Training sitemap: " . house36_bbt_virtual_sitemap_url() . "\n";
        echo "- Ages served: 8-14U for academy memberships and core lesson programming\n";
        echo "- Services: private lessons, group lessons, academy memberships, travel baseball teams\n";
        echo "- Lesson categories: hitting, pitching, infield/outfield, catching, baseball IQ\n";
        echo "- Academy pricing: \$250/month in Rocklin and \$299/month in El Dorado Hills\n\n";

        echo "## Locations\n";
        foreach ($locations as $location) {
            echo sprintf(
                "- %s: %s, %s (%s)\n",
                $location['full_name'],
                $location['address_line'],
                $location['city_state_zip'],
                $location['location_url']
            );
        }
        echo "\n";

        echo "## Lesson URLs\n";
        echo implode("\n", $lesson_links) . "\n\n";

        echo "## Coaches\n";
        foreach (array('jon-peters', 'cesar-tamayo', 'trey-furrey', 'jean-machi', 'gabe-emmett', 'kris-krise') as $coach_key) {
            if (! isset($coaches[$coach_key])) {
                continue;
            }

            $coach = $coaches[$coach_key];
            echo sprintf(
                "- %s: %s. Locations: %s. Coach profile: %s#%s\n",
                $coach['name'],
                $coach['job_title'],
                implode(', ', $coach['locations']),
                house36_bbt_coaches_url(),
                $coach['anchor']
            );
        }
        echo "\n";

        echo "## Contact\n";
        echo "- Phone: 916-465-5551\n";
        echo "- Email: trainwithbbt@gmail.com\n";

        exit;
    }
}
add_action('template_redirect', 'house36_bbt_serve_llms_txt', 1);

function house36_bbt_serve_training_sitemap() {
    if (! get_query_var('house36_bbt_training_sitemap')) {
        return;
    }

    header('Content-Type: application/xml; charset=utf-8');

    $urls = array(
        house36_bbt_booking_url(),
        house36_bbt_coaches_url(),
        house36_bbt_schedule_url(),
    );

    foreach (house36_bbt_lessons_data() as $slug => $lesson) {
        $urls[] = house36_bbt_lesson_url($slug);
    }

    $urls = array_unique(array_filter($urls));
    $lastmod = gmdate('c');

    echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
    echo "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";

    foreach ($urls as $url) {
        echo "  <url>\n";
        echo '    <loc>' . esc_url($url) . "</loc>\n";
        echo '    <lastmod>' . esc_html($lastmod) . "</lastmod>\n";
        echo "  </url>\n";
    }

    echo "</urlset>\n";
    exit;
}
add_action('template_redirect', 'house36_bbt_serve_training_sitemap', 1);

function house36_bbt_maybe_flush_virtual_pages() {
    $version = '2026-03-21-llm-seo-foundation';

    if (get_option('house36_bbt_virtual_page_version') === $version) {
        return;
    }

    house36_bbt_register_virtual_pages();
    flush_rewrite_rules(false);
    update_option('house36_bbt_virtual_page_version', $version);
}
add_action('init', 'house36_bbt_maybe_flush_virtual_pages', 20);

function house36_bbt_virtual_page_template($template) {
    if (house36_bbt_is_booking_page()) {
        $virtual_template = locate_template('page-book-now.php');

        return $virtual_template ?: $template;
    }

    if (! house36_bbt_is_lessons_page()) {
        return $template;
    }

    $virtual_template = locate_template('page-lesson.php');

    return $virtual_template ?: $template;
}
add_filter('template_include', 'house36_bbt_virtual_page_template');

function house36_bbt_virtual_page_flags() {
    if (! house36_bbt_is_booking_page() && ! house36_bbt_is_lessons_page()) {
        return;
    }

    global $wp_query;

    $wp_query->is_404 = false;
    $wp_query->is_page = true;
    $wp_query->is_singular = true;
    status_header(200);
}
add_action('template_redirect', 'house36_bbt_virtual_page_flags');

function house36_bbt_virtual_page_title($title) {
    if (is_front_page()) {
        return house36_bbt_home_meta_title();
    }

    if (house36_bbt_is_booking_page()) {
        return 'Book Baseball Lessons in Rocklin & El Dorado Hills | ' . get_bloginfo('name');
    }

    if (house36_bbt_is_coaches_page()) {
        return 'Baseball Coaches in Rocklin & El Dorado Hills | ' . get_bloginfo('name');
    }

    if (house36_bbt_is_schedule_page()) {
        return 'Baseball Training Schedule in Rocklin & El Dorado Hills | ' . get_bloginfo('name');
    }

    $lesson = house36_bbt_get_current_lesson();

    if (! $lesson) {
        return $title;
    }

    return sprintf(
        '%s in Rocklin & El Dorado Hills | %s',
        $lesson['headline'],
        get_bloginfo('name')
    );
}
add_filter('pre_get_document_title', 'house36_bbt_virtual_page_title');

function house36_bbt_virtual_page_body_class($classes) {
    if (house36_bbt_is_booking_page()) {
        $classes[] = 'page-template-book-now';
        $classes[] = 'page-book-now';

        return $classes;
    }

    if (! house36_bbt_is_lessons_page()) {
        return $classes;
    }

    $classes[] = 'page-template-lesson';
    $classes[] = 'page-lesson';
    $classes[] = 'page-lesson-' . sanitize_html_class((string) get_query_var('house36_bbt_lesson'));

    return $classes;
}
add_filter('body_class', 'house36_bbt_virtual_page_body_class');

function house36_bbt_virtual_page_meta_description($description) {
    if (is_front_page()) {
        return house36_bbt_home_meta_description();
    }

    if (house36_bbt_is_booking_page()) {
        return 'Book baseball lessons and training in Rocklin and El Dorado Hills. Submit the player interest form to find the right lesson, academy plan, or next step.';
    }

    if (house36_bbt_is_coaches_page()) {
        return 'Meet the Better Baseball Training coaching staff in Rocklin and El Dorado Hills, including former professional players and college alumni leading youth baseball development.';
    }

    if (house36_bbt_is_schedule_page()) {
        return 'View the Better Baseball Training academy schedule for Rocklin and El Dorado Hills, including current class times and youth baseball training options.';
    }

    $lesson = house36_bbt_get_current_lesson();

    if (! $lesson) {
        return $description;
    }

    return $lesson['meta_description'];
}

function house36_bbt_forminator_form_id() {
    return absint(apply_filters('house36_bbt_forminator_form_id', 42));
}

function house36_bbt_render_training_form() {
    $form_id = house36_bbt_forminator_form_id();

    if ($form_id > 0 && shortcode_exists('forminator_form')) {
        $form_html = do_shortcode(
            sprintf(
                '[forminator_form id="%d"]',
                $form_id
            )
        );

        if (house36_bbt_is_focus_page()) {
            $canonical = esc_url(house36_bbt_current_canonical_url());

            $form_html = preg_replace('/name="current_url"\s+value="[^"]*"/', 'name="current_url" value="' . $canonical . '"', $form_html);
            $form_html = preg_replace('/name="referer_url"\s+value="[^"]*"/', 'name="referer_url" value="' . $canonical . '"', $form_html);
            $form_html = str_replace(home_url('/hello-world/'), $canonical, $form_html);
            $form_html = str_replace(home_url('/hello-world'), $canonical, $form_html);
        }

        return $form_html;
    }

    ob_start();
    ?>
    <div class="forminator-empty-state">
      <div class="forminator-empty-kicker"><?php esc_html_e('Forminator Ready', 'house36-bbt'); ?></div>
      <h4 class="forminator-empty-head"><?php esc_html_e('Activate Forminator and the homepage form will load automatically.', 'house36-bbt'); ?></h4>
      <p class="forminator-empty-text"><?php esc_html_e('The theme styling is already in place for Forminator form ID 42. Once the plugin is active, this section will switch from fallback mode to the live embedded form.', 'house36-bbt'); ?></p>
      <div class="forminator-empty-actions">
        <a href="<?php echo esc_url(house36_bbt_booking_url()); ?>" class="membership-cta" target="_blank" rel="noreferrer">
          <?php esc_html_e('Use Current Booking Link', 'house36-bbt'); ?>
        </a>
        <a href="tel:9164655551" class="cta-box-secondary-link">
          <?php esc_html_e('Call 916-465-5551', 'house36-bbt'); ?>
        </a>
      </div>
    </div>
    <?php

    return ob_get_clean();
}

function house36_bbt_logo($class = 'nav-logo', $fallback_asset = 'brand-assets/BBT Logo 2.jpeg', $linked = true) {
    $site_name = get_bloginfo('name');
    $image_html = '';
    $should_use_custom_logo = has_custom_logo() && false !== strpos((string) $class, 'nav-logo');

    $is_footer = (false !== strpos((string) $class, 'footer'));
    $loading = $is_footer ? 'lazy' : 'eager';
    $fetchpriority = $is_footer ? 'low' : 'high';

    if ($should_use_custom_logo) {
        $logo_id = get_theme_mod('custom_logo');
        $image_html = wp_get_attachment_image(
            $logo_id,
            'full',
            false,
            array(
                'class'         => $class,
                'alt'           => $site_name,
                'loading'       => $loading,
                'decoding'      => 'async',
                'fetchpriority' => $fetchpriority,
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
            '<img src="%1$s" alt="%2$s" class="%3$s" loading="%4$s" decoding="async" fetchpriority="%5$s"%6$s%7$s%8$s />',
            esc_url($fallback_src),
            esc_attr($site_name),
            esc_attr($class),
            esc_attr($loading),
            esc_attr($fetchpriority),
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
        if ('Lessons' === $item[0]) {
            $menu .= sprintf(
                '<li class="menu-item-has-children"><a href="%1$s">%2$s</a><ul class="sub-menu">',
                esc_url($item[1]),
                esc_html($item[0])
            );

            foreach (house36_bbt_lessons_menu_items() as $lesson_item) {
                $menu .= sprintf(
                    '<li><a href="%1$s">%2$s</a></li>',
                    esc_url($lesson_item['url']),
                    esc_html($lesson_item['title'])
                );
            }

            $menu .= '</ul></li>';
            continue;
        }

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

function house36_bbt_primary_menu_add_lessons_submenu($items, $args) {
    if (($args->theme_location ?? '') !== 'primary' || empty($items) || ! is_array($items)) {
        return $items;
    }

    $lesson_parent = null;

    foreach ($items as $item) {
        if (! empty($item->menu_item_parent)) {
            continue;
        }

        $title = strtolower(trim(wp_strip_all_tags((string) $item->title)));
        $url = (string) ($item->url ?? '');

        if ($title === 'lessons' || $url === house36_bbt_home_section_url('lessons')) {
            $lesson_parent = $item;
            break;
        }
    }

    if (! $lesson_parent) {
        return $items;
    }

    foreach ($items as $item) {
        if ((int) ($item->menu_item_parent ?? 0) === (int) $lesson_parent->ID) {
            return $items;
        }
    }

    $lesson_parent->classes = is_array($lesson_parent->classes ?? null) ? $lesson_parent->classes : array();
    $lesson_parent->classes[] = 'menu-item-has-children';

    $next_id = -1000;

    foreach (house36_bbt_lessons_menu_items() as $position => $lesson_item) {
        $submenu_item = (object) array(
            'ID'                    => $next_id - $position,
            'db_id'                 => 0,
            'menu_item_parent'      => (string) $lesson_parent->ID,
            'object_id'             => 0,
            'object'                => 'custom',
            'type'                  => 'custom',
            'type_label'            => __('Custom Link', 'house36-bbt'),
            'title'                 => $lesson_item['title'],
            'url'                   => $lesson_item['url'],
            'target'                => '',
            'attr_title'            => '',
            'description'           => '',
            'classes'               => array('lesson-submenu-item'),
            'xfn'                   => '',
            'status'                => 'publish',
            'menu_order'            => 100 + $position,
            'current'               => false,
            'current_item_ancestor' => false,
            'current_item_parent'   => false,
        );

        $items[] = $submenu_item;
    }

    return $items;
}
add_filter('wp_nav_menu_objects', 'house36_bbt_primary_menu_add_lessons_submenu', 10, 2);

function house36_bbt_lesson_page_heading($lesson) {
    if (! is_array($lesson) || empty($lesson['label'])) {
        return __('Lesson', 'house36-bbt');
    }

    return sprintf(
        __('Get More Info About %s', 'house36-bbt'),
        $lesson['label']
    );
}

function house36_bbt_get_meta_description() {
    return apply_filters('house36_bbt_meta_description_override', '');
}

add_filter('house36_bbt_meta_description_override', 'house36_bbt_virtual_page_meta_description');

/**
 * Rank Math Integration for Virtual Pages
 */
add_filter('rank_math/frontend/title', 'house36_bbt_rm_title');
add_filter('rank_math/frontend/opengraph/title', 'house36_bbt_rm_title');
add_filter('rank_math/frontend/twitter/title', 'house36_bbt_rm_title');

function house36_bbt_rm_title($title) {
    if (house36_bbt_is_focus_page()) {
        return house36_bbt_virtual_page_title($title);
    }
    return $title;
}

add_filter('rank_math/frontend/description', 'house36_bbt_rm_desc');
add_filter('rank_math/frontend/opengraph/description', 'house36_bbt_rm_desc');
add_filter('rank_math/frontend/twitter/description', 'house36_bbt_rm_desc');

function house36_bbt_rm_desc($description) {
    if (house36_bbt_is_focus_page()) {
        $override = house36_bbt_get_meta_description();
        if ($override) {
            return $override;
        }
    }
    return $description;
}

add_filter('rank_math/frontend/canonical', 'house36_bbt_rm_canonical');
add_filter('rank_math/frontend/opengraph/url', 'house36_bbt_rm_canonical');

function house36_bbt_rm_canonical($canonical) {
    if (house36_bbt_is_focus_page()) {
        return house36_bbt_current_canonical_url();
    }
    return $canonical;
}

function house36_bbt_filter_rank_math_json_ld($data) {
    if (house36_bbt_is_focus_page()) {
        return array();
    }

    return $data;
}
add_filter('rank_math/json_ld', 'house36_bbt_filter_rank_math_json_ld', 99);

function house36_bbt_cleanup_focus_page_head() {
    if (! house36_bbt_is_focus_page()) {
        return;
    }

    remove_action('wp_head', 'feed_links', 2);
    remove_action('wp_head', 'feed_links_extra', 3);
    remove_action('wp_head', 'wp_oembed_add_discovery_links');
    remove_action('wp_head', 'wp_oembed_add_host_js');
    remove_action('wp_head', 'rest_output_link_wp_head');
    remove_action('wp_head', 'wp_shortlink_wp_head');
    remove_action('wp_head', 'rel_canonical');
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wlwmanifest_link');
}
add_action('wp', 'house36_bbt_cleanup_focus_page_head');

function house36_bbt_print_focus_page_meta_tags() {
    if (! house36_bbt_is_focus_page() || defined('RANK_MATH_VERSION')) {
        return;
    }
    ?>
<link rel="canonical" href="<?php echo esc_url(house36_bbt_current_canonical_url()); ?>" />
<meta name="description" content="<?php echo esc_attr(house36_bbt_current_meta_description()); ?>" />
    <?php
}
add_action('wp_head', 'house36_bbt_print_focus_page_meta_tags', 1);

function house36_bbt_append_training_sitemap_to_robots($output, $public) {
    if ('0' === (string) $public) {
        return $output;
    }

    $sitemap_line = 'Sitemap: ' . house36_bbt_virtual_sitemap_url();

    if (false === strpos($output, $sitemap_line)) {
        $output = trim($output) . "\n" . $sitemap_line . "\n";
    }

    return $output;
}
add_filter('robots_txt', 'house36_bbt_append_training_sitemap_to_robots', 10, 2);

add_action('rank_math/sitemap/page_content', function() {
    $virtual_urls = array(
        house36_bbt_schedule_url(),
        house36_bbt_coaches_url(),
        house36_bbt_booking_url(),
    );

    $lessons = house36_bbt_lessons_data();
    if (is_array($lessons)) {
        foreach ($lessons as $slug => $lesson) {
            $virtual_urls[] = house36_bbt_lesson_url($slug);
        }
    }

    $now = date('c');
    foreach (array_unique($virtual_urls) as $url) {
        if (trim((string) $url) !== '' && trim((string) $url) !== home_url('/')) {
            echo "\n<url>\n\t<loc>" . esc_url((string) $url) . "</loc>\n\t<lastmod>" . esc_html($now) . "</lastmod>\n</url>\n";
        }
    }
});

function house36_bbt_preload_front_page_assets() {
    if (! is_front_page()) {
        return;
    }
    ?>
<link rel="preload" as="image" href="<?php echo esc_url(house36_bbt_asset_variant_url('images/hero-slideshow-1.PNG', 720)); ?>" imagesrcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/hero-slideshow-1.PNG', array(720, 960, 1320))); ?>" imagesizes="100vw" fetchpriority="high" />
    <?php
}
add_action('wp_head', 'house36_bbt_preload_front_page_assets', 2);
