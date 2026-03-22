<?php
get_header();

$faq_schema = array(
    '@context'   => 'https://schema.org',
    '@type'      => 'FAQPage',
    'mainEntity' => array(
        array(
            '@type'          => 'Question',
            'name'           => 'What ages does Better Baseball Training serve?',
            'acceptedAnswer' => array(
                '@type' => 'Answer',
                'text'  => 'BBT provides elite baseball training, academy memberships, and travel teams for youth baseball players ages 8 to 14U.',
            ),
        ),
        array(
            '@type'          => 'Question',
            'name'           => 'Where is Better Baseball Training located?',
            'acceptedAnswer' => array(
                '@type' => 'Answer',
                'text'  => 'We have two indoor training facilities with full turf and batting cages in the Sacramento area: Rocklin (4283 Duluth Ave) and El Dorado Hills (4990 Hillsdale Dr, Suite 400).',
            ),
        ),
        array(
            '@type'          => 'Question',
            'name'           => 'How much does baseball academy membership cost?',
            'acceptedAnswer' => array(
                '@type' => 'Answer',
                'text'  => 'Our Academy Membership provides unlimited access to classes and training. Pricing is $250/month in Rocklin and $299/month in El Dorado Hills.',
            ),
        ),
        array(
            '@type'          => 'Question',
            'name'           => 'Do you offer private baseball lessons?',
            'acceptedAnswer' => array(
                '@type' => 'Answer',
                'text'  => 'Yes. We offer both private and group instruction for hitting, pitching, infield/outfield, and catching. All lessons are coached by our staff of college and pro alumni.',
            ),
        ),
        array(
            '@type'          => 'Question',
            'name'           => 'Does BBT have travel baseball teams?',
            'acceptedAnswer' => array(
                '@type' => 'Answer',
                'text'  => 'Yes. Better Baseball Training fields 11+ highly competitive youth travel baseball teams across multiple divisions (Black and Gray) from ages 9U through 14U.',
            ),
        ),
    ),
);

$lazy_pixel = 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';
?>

<main id="main-content">
<section id="hero" class="hero">
  <div class="hero-left">
    <?php echo house36_bbt_logo('hero-logo-mark', 'brand-assets/BBT Logo 1-no bg.png', false); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>

    <div class="hero-badge">
      <span class="hero-badge-dot"></span>
      <span class="hero-badge-text">Rocklin &amp; El Dorado Hills, CA</span>
    </div>

    <div class="hero-brand"><?php bloginfo('name'); ?></div>

    <h1 class="hero-headline">
      <span class="line1">It's Just</span>
      <span class="line2">Better.</span>
    </h1>

    <p class="hero-sub">
      We are more than baseball. Developing youth to their full potential, socially, physically, and mentally. Private lessons, academy memberships, and travel baseball for ages 8-14U.
    </p>

    <div class="hero-ctas">
      <a href="<?php echo esc_url(house36_bbt_booking_url()); ?>" class="btn-primary">
        <span>Book a Lesson</span>
      </a>
      <a href="<?php echo esc_url(house36_bbt_schedule_url()); ?>" class="btn-outline">
        <span>See Our Schedule</span>
      </a>
    </div>
  </div>

  <div class="hero-right">
    <div class="hero-slideshow">
      <img class="hero-slide active" src="<?php echo esc_url(house36_bbt_asset_variant_url('images/hero-slideshow-1.PNG', 720)); ?>" srcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/hero-slideshow-1.PNG', array(720, 960, 1320))); ?>" sizes="100vw" alt="BBT hero slide 1" width="1320" height="774" fetchpriority="high" decoding="async" />
      <img class="hero-slide" src="<?php echo esc_attr($lazy_pixel); ?>" data-src="<?php echo esc_url(house36_bbt_asset_variant_url('images/hero-slideshow-2.PNG', 720)); ?>" data-srcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/hero-slideshow-2.PNG', array(720, 960, 1320))); ?>" sizes="100vw" alt="BBT hero slide 2" width="1299" height="697" loading="lazy" decoding="async" />
      <img class="hero-slide" src="<?php echo esc_attr($lazy_pixel); ?>" data-src="<?php echo esc_url(house36_bbt_asset_variant_url('images/hero-slideshow-3.PNG', 720)); ?>" data-srcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/hero-slideshow-3.PNG', array(720, 960, 1320))); ?>" sizes="100vw" alt="BBT hero slide 3" width="1320" height="843" loading="lazy" decoding="async" />
      <img class="hero-slide cover" src="<?php echo esc_attr($lazy_pixel); ?>" data-src="<?php echo esc_url(house36_bbt_asset_variant_url('images/hero-slideshow-4.PNG', 720)); ?>" data-srcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/hero-slideshow-4.PNG', array(720, 960, 1320))); ?>" sizes="100vw" alt="BBT hero slide 4" width="1320" height="833" loading="lazy" decoding="async" />
      <img class="hero-slide cover" src="<?php echo esc_attr($lazy_pixel); ?>" data-src="<?php echo esc_url(house36_bbt_asset_variant_url('images/hero-slideshow-5.PNG', 720)); ?>" data-srcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/hero-slideshow-5.PNG', array(720, 960, 1320))); ?>" sizes="100vw" alt="BBT hero slide 5" width="1320" height="832" loading="lazy" decoding="async" />
    </div>
    <div class="hero-nav">
      <button class="hero-nav-btn prev" aria-label="Previous Slide" type="button">
        <svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>
      </button>
      <div class="hero-nav-dots">
        <button class="hero-nav-dot active" aria-label="Go to slide 1" type="button"></button>
        <button class="hero-nav-dot" aria-label="Go to slide 2" type="button"></button>
        <button class="hero-nav-dot" aria-label="Go to slide 3" type="button"></button>
        <button class="hero-nav-dot" aria-label="Go to slide 4" type="button"></button>
        <button class="hero-nav-dot" aria-label="Go to slide 5" type="button"></button>
      </div>
      <button class="hero-nav-btn next" aria-label="Next Slide" type="button">
        <svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
      </button>
    </div>
  </div>

  <div class="hero-ticker">
    <div class="ticker-track">
      <div class="ticker-item"><span class="ticker-num">2</span><span class="ticker-label">Locations: Rocklin &amp; El Dorado Hills</span></div>
      <span class="ticker-diamond">◆</span>
      <div class="ticker-item"><span class="ticker-num"></span><span class="ticker-label">Dedicated outdoor fields</span></div>
      <span class="ticker-diamond">◆</span>
      <div class="ticker-item"><span class="ticker-num">20+</span><span class="ticker-label">Expert Coaches</span></div>
      <span class="ticker-diamond">◆</span>
      <div class="ticker-item"><span class="ticker-num">5+</span><span class="ticker-label">Training Disciplines</span></div>
      <span class="ticker-diamond">◆</span>
      <div class="ticker-item"><span class="ticker-num">9-14U</span><span class="ticker-label">Youth Teams</span></div>
      <span class="ticker-diamond">◆</span>
      <div class="ticker-item"><span class="ticker-num">15-17U</span><span class="ticker-label">High School Teams</span></div>
      <span class="ticker-diamond">◆</span>
      <div class="ticker-item"><span class="ticker-num">2</span><span class="ticker-label">Locations: Rocklin &amp; El Dorado Hills</span></div>
      <span class="ticker-diamond">◆</span>
      <div class="ticker-item"><span class="ticker-num"></span><span class="ticker-label">Dedicated outdoor fields</span></div>
      <span class="ticker-diamond">◆</span>
      <div class="ticker-item"><span class="ticker-num">20+</span><span class="ticker-label">Expert Coaches</span></div>
      <span class="ticker-diamond">◆</span>
      <div class="ticker-item"><span class="ticker-num">5+</span><span class="ticker-label">Training Disciplines</span></div>
      <span class="ticker-diamond">◆</span>
      <div class="ticker-item"><span class="ticker-num">9-14U</span><span class="ticker-label">Youth Teams</span></div>
      <span class="ticker-diamond">◆</span>
      <div class="ticker-item"><span class="ticker-num">15-17U</span><span class="ticker-label">High School Teams</span></div>
      <span class="ticker-diamond">◆</span>
    </div>
  </div>
</section>

<section id="lessons" class="services">
  <div class="services-topbar"></div>
  <img src="<?php echo esc_url(house36_bbt_asset_variant_url('brand-assets/BBT Logo 2.jpeg', 160) ?: house36_bbt_asset_variant_url('brand-assets/BBT Logo 2.jpeg', 320) ?: house36_bbt_asset('brand-assets/BBT Logo 2.jpeg')); ?>" srcset="<?php echo esc_attr(house36_bbt_asset_srcset('brand-assets/BBT Logo 2.jpeg', array(160, 320))); ?>" sizes="160px" alt="" class="services-watermark" aria-hidden="true" loading="lazy" decoding="async" fetchpriority="low" width="695" height="606" />

  <div class="services-header reveal">
    <div>
      <span class="services-label">What We Do</span>
      <h2 class="services-title">Train.<br><em>Develop.</em><br>Win.</h2>
    </div>
    <p class="services-desc">
      BBT offers private and group instruction across every discipline of the game, from hitting mechanics to baseball IQ. We are committed to providing safe, reliable training for kids of all ages.
    </p>
  </div>

  <div class="services-grid">
    <div class="service-card reveal reveal-delay-1">
      <div class="service-image-wrapper">
        <img src="<?php echo esc_url(house36_bbt_asset_variant_url('images/service-hitting-1.PNG', 640)); ?>" srcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/service-hitting-1.PNG', array(640, 960))); ?>" sizes="(max-width: 800px) 50vw, (max-width: 1200px) 33vw, 280px" alt="Hitting training at BBT" class="service-card-img" loading="lazy" decoding="async" width="1320" height="743" />
      </div>
      <div class="service-card-body">
        <div class="service-number">01</div>
        <h3 class="service-name">Hitting</h3>
        <p class="service-text">Mechanics, timing, situational hitting and plate discipline for every level. Private and group training available.</p>
        <a href="<?php echo esc_url(house36_bbt_lesson_url('hitting')); ?>" class="service-link">
          Learn More
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>

    <div class="service-card reveal reveal-delay-2">
      <div class="service-image-wrapper">
        <img src="<?php echo esc_url(house36_bbt_asset_variant_url('images/service-pitching-2.PNG', 640)); ?>" srcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/service-pitching-2.PNG', array(640, 960))); ?>" sizes="(max-width: 800px) 50vw, (max-width: 1200px) 33vw, 280px" alt="Pitching training at BBT" class="service-card-img" style="object-position:center top;" loading="lazy" decoding="async" width="1320" height="753" />
      </div>
      <div class="service-card-body">
        <div class="service-number">02</div>
        <h3 class="service-name">Pitching</h3>
        <p class="service-text">Mechanics, arm care, velocity development, and pitch sequencing coached by college and pro alumni.</p>
        <a href="<?php echo esc_url(house36_bbt_lesson_url('pitching')); ?>" class="service-link">
          Learn More
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>

    <div class="service-card reveal reveal-delay-3">
      <div class="service-image-wrapper">
        <img src="<?php echo esc_url(house36_bbt_asset_variant_url('images/service-inf.ouf-3.PNG', 640)); ?>" srcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/service-inf.ouf-3.PNG', array(640, 960))); ?>" sizes="(max-width: 800px) 50vw, (max-width: 1200px) 33vw, 280px" alt="Infield and outfield training at BBT" class="service-card-img" style="object-position:center 20%;" loading="lazy" decoding="async" width="1320" height="722" />
      </div>
      <div class="service-card-body">
        <div class="service-number">03</div>
        <h3 class="service-name">INF / OF</h3>
        <p class="service-text">Footwork, positioning and in-game understanding, infield and outfield fundamentals for all positions.</p>
        <a href="<?php echo esc_url(house36_bbt_lesson_url('infield-outfield')); ?>" class="service-link">
          Learn More
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>

    <div class="service-card reveal reveal-delay-4">
      <div class="service-image-wrapper">
        <img src="<?php echo esc_url(house36_bbt_asset_variant_url('images/service-catching-4.PNG', 640)); ?>" srcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/service-catching-4.PNG', array(640, 960))); ?>" sizes="(max-width: 800px) 50vw, (max-width: 1200px) 33vw, 280px" alt="Catching training at BBT" class="service-card-img" style="object-position:center 30%;" loading="lazy" decoding="async" width="1210" height="842" />
      </div>
      <div class="service-card-body">
        <div class="service-number">04</div>
        <h3 class="service-name">Catching</h3>
        <p class="service-text">Receiving, blocking, footwork and game managing. Full position-specific development with experienced coaches.</p>
        <a href="<?php echo esc_url(house36_bbt_lesson_url('catching')); ?>" class="service-link">
          Learn More
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>

    <div class="service-card reveal reveal-delay-5">
      <div class="service-image-wrapper">
        <img src="<?php echo esc_url(house36_bbt_asset_variant_url('images/service-baseball.iq-5.PNG', 640)); ?>" srcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/service-baseball.iq-5.PNG', array(640, 960))); ?>" sizes="(max-width: 800px) 50vw, (max-width: 1200px) 33vw, 280px" alt="Baseball IQ training at BBT" class="service-card-img" loading="lazy" decoding="async" width="1320" height="1054" />
      </div>
      <div class="service-card-body">
        <div class="service-number">05</div>
        <h3 class="service-name">Baseball IQ</h3>
        <p class="service-text">Baseball is often described as a thinking person’s game, where each pitch, swing, and defensive move requires thoughtful decision-making and preparation.</p>
        <a href="<?php echo esc_url(house36_bbt_lesson_url('baseball-iq')); ?>" class="service-link">
          Learn More
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>
  </div>

  <div class="services-divider reveal"></div>

  <div class="membership-banner reveal">
    <div>
      <p class="membership-label">Academy Membership · Ages 8-14U</p>
      <h3 class="membership-title">Unlimited Academy Access</h3>
      <div class="membership-classes">
        <span class="membership-class">Hitting</span>
        <span class="membership-class">Pitching</span>
        <span class="membership-class">INF / OF</span>
        <span class="membership-class">Catchers</span>
        <span class="membership-class">Baseball IQ</span>
        <span class="membership-class">Baserunning</span>
        <span class="membership-class">Basestealing</span>
      </div>
    </div>

    <div class="membership-right">
      <div class="membership-pricing">
        <div class="price-item">
          <div class="price-location">Rocklin</div>
          <div class="price-amount">$250</div>
          <div class="price-period">/ month</div>
        </div>
        <div class="price-divider"></div>
        <div class="price-item">
          <div class="price-location">El Dorado Hills</div>
          <div class="price-amount">$299</div>
          <div class="price-period">/ month</div>
        </div>
      </div>

      <div style="display:flex; flex-direction:column; align-items:flex-end; gap:12px;">
        <a href="<?php echo esc_url(house36_bbt_booking_url()); ?>" class="membership-cta">Get Started</a>
        <span class="membership-ages">Ages 8-14U · Unlimited Access</span>
      </div>
    </div>
  </div>
</section>

<section id="coaches" class="coaches" aria-labelledby="coaches-heading">
  <div class="coaches-header reveal">
    <h2 id="coaches-heading" class="coaches-title">Our Coaching <em>Staff</em></h2>
    <a href="<?php echo esc_url(house36_bbt_coaches_url()); ?>" class="btn-outline"><span>Meet All Coaches</span></a>
  </div>

  <div class="coaches-grid">
    <div class="coach-card reveal reveal-delay-1">
      <div class="coach-img-wrapper">
        <img src="<?php echo esc_url(house36_bbt_asset_variant_url('images/coach-jon-peters.jpg', 480)); ?>" srcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/coach-jon-peters.jpg', array(480, 768))); ?>" sizes="(max-width: 800px) 50vw, 33vw" alt="Jon Peters, owner and head of player development at Better Baseball Training in Rocklin CA" class="coach-img" loading="lazy" decoding="async" width="400" height="500" />
        <span class="coach-badge coach-badge-owner">Owner</span>
      </div>
      <div class="coach-info">
        <h3 class="coach-name">Jon Peters</h3>
        <div class="coach-role">Player Development</div>
        <p class="coach-bio">Founded BBT with one goal: build better players and better people. Jon oversees all player development programming across both facilities and has spent years studying hitting, pitching development, and athletic performance from youth to collegiate level.</p>
        <div class="coach-quote">
          <strong>Favorite part of coaching</strong>
          <p>"Watching the boys achieve their goals, nothing better in this thing than seeing all their hard work lead to success!"</p>
        </div>
        <p class="coach-cred">"The pinnacle of youth development"</p>
      </div>
    </div>

    <div class="coach-card reveal reveal-delay-2">
      <div class="coach-img-wrapper">
        <img src="<?php echo esc_url(house36_bbt_asset_variant_url('images/cesar-tamayo.jpeg', 480)); ?>" srcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/cesar-tamayo.jpeg', array(480, 768))); ?>" sizes="(max-width: 800px) 50vw, 33vw" alt="Cesar Tamayo, Rocklin GM at Better Baseball Training" class="coach-img" loading="lazy" decoding="async" width="1320" height="977" />
        <span class="coach-badge coach-badge-pro" style="background:var(--cyan);color:black;">Rocklin GM</span>
      </div>
      <div class="coach-info">
        <h3 class="coach-name">Cesar Tamayo</h3>
        <div class="coach-role">Rocklin GM</div>
        <p class="coach-bio">Southern California native. La Sierra High School ('14), Mt. San Jacinto College, Marymount University (BA), and Jessup University (MS in Kinesiology). With BBT since 2021 and served as assistant coach with the Lincoln Potters in 2022 and 2023.</p>
        <div class="coach-quote">
          <strong>Favorite part of coaching</strong>
          <p>"Being able to teach the kids the game I love."</p>
        </div>
        <p class="coach-cred"><strong>Jessup University (MS)</strong> · Marymount University</p>
      </div>
    </div>

    <div class="coach-card reveal reveal-delay-3">
      <div class="coach-img-wrapper">
        <img src="<?php echo esc_url(house36_bbt_asset_variant_url('images/trey-furrey.jpeg', 480)); ?>" srcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/trey-furrey.jpeg', array(480, 768))); ?>" sizes="(max-width: 800px) 50vw, 33vw" alt="Trey Furrey, El Dorado Hills GM at Better Baseball Training" class="coach-img" loading="lazy" decoding="async" width="1125" height="1289" />
        <span class="coach-badge coach-badge-pro" style="background:var(--cyan);color:black;">EDH GM</span>
      </div>
      <div class="coach-info">
        <h3 class="coach-name">Trey Furrey</h3>
        <div class="coach-role">El Dorado Hills GM</div>
        <p class="coach-bio">Folsom native, Folsom High ('18). Folsom Lake College All-American ('20). Transferred to Oklahoma Baptist and Jessup University where he was named GSAC Player of the Year and earned All-America honors.</p>
        <div class="coach-quote">
          <strong>Favorite part of coaching</strong>
          <p>"Seeing the kids continuing to learn and grow and be able to take what they've learned and apply it to their game."</p>
        </div>
        <p class="coach-cred"><strong>Jessup University</strong> · GSAC Player of the Year</p>
      </div>
    </div>

    <div class="coach-card reveal reveal-delay-4">
      <div class="coach-img-wrapper">
        <img src="<?php echo esc_url(house36_bbt_asset_variant_url('images/bruce-carmichael.PNG', 480)); ?>" srcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/bruce-carmichael.PNG', array(480, 768))); ?>" sizes="(max-width: 800px) 50vw, 33vw" alt="Bruce Carmichael, coach at Better Baseball Training" class="coach-img" loading="lazy" decoding="async" width="1288" height="1460" />
        <span class="coach-badge coach-badge-pro">Pro Alumni</span>
      </div>
      <div class="coach-info">
        <h3 class="coach-name">Bruce Carmichael</h3>
        <div class="coach-role">13U Gray Head Coach</div>
        <p class="coach-bio">Drafted by the Chicago Cubs Organization and played 3 years after earning a full baseball scholarship at Santa Clara University. 35+ years coaching at the college and high school levels. Named Western States Assistant Baseball Coach of the Year in 1998.</p>
        <p class="coach-cred"><strong>Chicago Cubs</strong> · Santa Clara University</p>
      </div>
    </div>

    <div class="coach-card reveal reveal-delay-5">
      <div class="coach-img-wrapper">
        <img src="<?php echo esc_url(house36_bbt_asset_variant_url('images/gabe-emmett.jpeg', 480)); ?>" srcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/gabe-emmett.jpeg', array(480, 768))); ?>" sizes="(max-width: 800px) 50vw, 33vw" alt="Gabe Emmett, pitching coach at Better Baseball Training" class="coach-img" loading="lazy" decoding="async" width="1050" height="1118" />
        <span class="coach-badge coach-badge-pro">Pro Alumni</span>
      </div>
      <div class="coach-info">
        <h3 class="coach-name">Gabe Emmett</h3>
        <div class="coach-role">Pitching Lessons</div>
        <p class="coach-bio">Vista del Lago HS ('19), Folsom Lake College, drafted by the LA Dodgers in 2021. Pitched with the ACL Dodgers and Rancho Cucamonga Quakes. Named California League Pitcher of the Month in June 2023. Tops out 96-98 mph.</p>
        <p class="coach-cred"><strong>Los Angeles Dodgers</strong> · Folsom Lake College</p>
      </div>
    </div>

    <div class="coach-card reveal reveal-delay-6">
      <div class="coach-img-wrapper">
        <img src="<?php echo esc_url(house36_bbt_asset_variant_url('images/jean-machi.jpeg', 480)); ?>" srcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/jean-machi.jpeg', array(480, 768))); ?>" sizes="(max-width: 800px) 50vw, 33vw" alt="Jean Machi, World Series Champion pitching coach at Better Baseball Training" class="coach-img" loading="lazy" decoding="async" width="1320" height="2603" />
        <span class="coach-badge coach-badge-pro">Pro Alumni</span>
      </div>
      <div class="coach-info">
        <h3 class="coach-name">Jean Machi</h3>
        <div class="coach-role">Pitching Lessons</div>
        <p class="coach-bio">Former big leaguer and 2014 World Series Champion with the SF Giants. Pitched in the big leagues from 2012-2017 with the Mariners, Red Sox, and Giants. Lifetime ERA of 3.38. Now providing pitching lessons at the EDH location.</p>
        <p class="coach-cred"><strong>SF Giants · World Series Champion</strong></p>
      </div>
    </div>

    <div class="coach-card reveal reveal-delay-1">
      <div class="coach-img-wrapper">
        <img src="<?php echo esc_url(house36_bbt_asset('images/kris-krise.jpeg')); ?>" alt="Kris Krise, former Dodgers draft pick and coach at Better Baseball Training" class="coach-img" loading="lazy" decoding="async" width="1200" height="1500" />
        <span class="coach-badge coach-badge-pro">Pro Alumni</span>
      </div>
      <div class="coach-info">
        <h3 class="coach-name">Kris Krise</h3>
        <div class="coach-role">12U Black Head Coach</div>
        <p class="coach-bio">Former 12th-round Los Angeles Dodgers draft pick who played at UC Irvine, COC, and Chico State. Brings pro-level experience and a strong player-development lens to every session.</p>
        <div class="coach-quote">
          <strong>Favorite part of coaching</strong>
          <p>"The opportunity to positively influence young lives, fostering growth, confidence, and a love of the game."</p>
        </div>
        <p class="coach-cred"><strong>Los Angeles Dodgers</strong> · Chico State · UC Irvine</p>
      </div>
    </div>

    <div class="coach-card reveal reveal-delay-2">
      <div class="coach-img-wrapper">
        <img src="<?php echo esc_url(house36_bbt_asset('images/logan-coe.PNG')); ?>" alt="Logan Coe, coach at Better Baseball Training" class="coach-img" loading="lazy" decoding="async" width="1200" height="1500" />
        <span class="coach-badge coach-badge-pro" style="background:var(--cyan);color:black;">College Alumni</span>
      </div>
      <div class="coach-info">
        <h3 class="coach-name">Logan Coe</h3>
        <div class="coach-role">Coach</div>
        <p class="coach-bio">Buhach Colony High School graduate who played JUCO ball at Modesto before continuing at Oklahoma Baptist and Jessup University. Focused on helping athletes grow through detailed, high-energy instruction.</p>
        <div class="coach-quote">
          <strong>Favorite part of coaching</strong>
          <p>"Passing down game knowledge and seeing the kids grow and develop."</p>
        </div>
        <p class="coach-cred"><strong>Jessup University</strong> · Oklahoma Baptist</p>
      </div>
    </div>
  </div>

  <div class="coaches-cta-row reveal">
    <a href="<?php echo esc_url(house36_bbt_coaches_url()); ?>" class="btn-primary"><span>Meet All Coaches</span></a>
  </div>

  <div class="coaches-quote reveal">
    <img src="<?php echo esc_url(house36_bbt_asset_variant_url('images/coach-jon-peters.jpg', 480)); ?>" srcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/coach-jon-peters.jpg', array(480, 768))); ?>" sizes="96px" alt="Jon Peters" class="coaches-quote-photo" loading="lazy" decoding="async" width="400" height="500" />
    <div class="coaches-quote-body">
      <blockquote>
        "It doesn't matter if you're coaching tee-ball or coaching at the college level, I'm a firm believer that a coach can be one of the most influential people in a young player's life. At Better Baseball, we aim to be the pinnacle of youth development."
      </blockquote>
      <div class="coaches-quote-footer">
        <img src="<?php echo esc_url(house36_bbt_asset('images/jp-signature-white.png')); ?>" alt="Jon Peters signature" class="coaches-quote-sig" loading="lazy" decoding="async" width="91" height="72" />
        <span class="coaches-quote-meta">Jon Peters — Owner / Player Development</span>
      </div>
    </div>
  </div>
</section>

<section class="why-bbt" aria-labelledby="why-bbt-heading">
  <div class="why-bbt-container reveal">
    <div class="why-bbt-header">
      <h2 id="why-bbt-heading">Why BBT? Because Your Kid Deserves <em>Better.</em></h2>
      <p>Most youth baseball academies are run by well-meaning dads with a cage in their garage. BBT is different. We've assembled a full coaching staff, including professional baseball alumni and college players from organizations like the Chicago Cubs, Los Angeles Dodgers, UC Davis, Cal Poly, and the University of New Mexico.</p>
    </div>

    <div class="why-bbt-grid">
      <div class="why-stat-card reveal reveal-delay-1">
        <div class="why-stat-num">3</div>
        <h3 class="why-stat-title">Pro Alumni On Staff</h3>
        <p class="why-stat-desc">Your kid is coached by former Chicago Cubs and LA Dodgers players, not parent volunteers. Bruce Carmichael, Kris Krise, and Gabe Emmett bring real professional experience to every session.</p>
      </div>
      <div class="why-stat-card reveal reveal-delay-2">
        <div class="why-stat-num">17</div>
        <h3 class="why-stat-title">Coaches, 10+ Programs</h3>
        <p class="why-stat-desc">Every BBT coach played college ball or higher. This is not weekend clinic instruction. It's real development with a real coaching pipeline.</p>
      </div>
      <div class="why-stat-card reveal reveal-delay-3">
        <div class="why-stat-num">11+</div>
        <h3 class="why-stat-title">Travel Teams, 2 Facilities</h3>
        <p class="why-stat-desc">Year-round competitive schedules from 9U through 14U across Black and Gray divisions with two indoor facilities in Rocklin and El Dorado Hills.</p>
      </div>
    </div>
  </div>
</section>

<section class="gallery" aria-labelledby="gallery-heading">
  <div class="gallery-header reveal">
    <h2 id="gallery-heading">Inside <em>BBT</em></h2>
    <p>Training days, championship wins, and everything in between. See what it's like to be part of the BBT family.</p>
  </div>

  <div class="gallery-grid">
    <div class="gallery-item gallery-item--wide reveal reveal-delay-1" style="aspect-ratio:16/9;">
      <img src="<?php echo esc_url(house36_bbt_asset_variant_url('images/hero-slideshow-1.PNG', 720)); ?>" srcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/hero-slideshow-1.PNG', array(720, 960, 1320))); ?>" sizes="(max-width: 800px) 100vw, 66vw" alt="BBT division champions" style="object-position:center top;" loading="lazy" decoding="async" width="1320" height="774" />
      <span class="gallery-caption">Division Champions</span>
    </div>
    <div class="gallery-item reveal reveal-delay-2" style="aspect-ratio:4/5;">
      <img src="<?php echo esc_url(house36_bbt_asset_variant_url('images/facility-img-4.jpg', 320)); ?>" srcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/facility-img-4.jpg', array(320, 900))); ?>" sizes="(max-width: 800px) 50vw, 25vw" alt="Catching gear and equipment at BBT" style="object-position:center 30%;" loading="lazy" decoding="async" width="905" height="679" />
      <span class="gallery-caption">Catchers Clinic</span>
    </div>
    <div class="gallery-item reveal reveal-delay-3" style="aspect-ratio:4/5;">
      <img src="<?php echo esc_url(house36_bbt_asset_variant_url('images/hero-slideshow-3.PNG', 720)); ?>" srcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/hero-slideshow-3.PNG', array(720, 960, 1320))); ?>" sizes="(max-width: 800px) 50vw, 25vw" alt="BBT players posing with medals" style="object-position:center top;" loading="lazy" decoding="async" width="1320" height="843" />
      <span class="gallery-caption">Hardware</span>
    </div>
    <div class="gallery-item gallery-item--wide reveal reveal-delay-4" style="aspect-ratio:16/9;">
      <img src="<?php echo esc_url(house36_bbt_asset_variant_url('images/IMG_0609.jpg', 960)); ?>" srcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/IMG_0609.jpg', array(320, 960))); ?>" sizes="(max-width: 800px) 100vw, 66vw" alt="BBT indoor training facility with batting cages" loading="lazy" decoding="async" width="5712" height="4284" />
      <span class="gallery-caption">Training Facility</span>
    </div>
    <div class="gallery-item reveal reveal-delay-5" style="aspect-ratio:3/2;">
      <img src="<?php echo esc_url(house36_bbt_asset_variant_url('images/hero-slideshow-5.PNG', 720)); ?>" srcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/hero-slideshow-5.PNG', array(720, 960, 1320))); ?>" sizes="(max-width: 800px) 100vw, 33vw" alt="BBT player holding championship ring" style="object-position:center 30%;" loading="lazy" decoding="async" width="1320" height="832" />
      <span class="gallery-caption">Championship Rings</span>
    </div>
    <div class="gallery-item reveal reveal-delay-1" style="aspect-ratio:3/2;">
      <img src="<?php echo esc_url(house36_bbt_asset_variant_url('images/service-hitting-1.PNG', 640)); ?>" srcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/service-hitting-1.PNG', array(640, 960))); ?>" sizes="(max-width: 800px) 100vw, 33vw" alt="Player hitting in batting cages" loading="lazy" decoding="async" width="1320" height="743" />
      <span class="gallery-caption">Batting Cages</span>
    </div>
    <div class="gallery-item reveal reveal-delay-2" style="aspect-ratio:3/2;">
      <img src="<?php echo esc_url(house36_bbt_asset_variant_url('images/hero-slideshow-2.PNG', 720)); ?>" srcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/hero-slideshow-2.PNG', array(720, 960, 1320))); ?>" sizes="(max-width: 800px) 100vw, 33vw" alt="BBT team celebrating with banner" style="object-position:center 20%;" loading="lazy" decoding="async" width="1299" height="697" />
      <span class="gallery-caption">Tournament Winners</span>
    </div>
    <div class="gallery-item gallery-item--wide reveal reveal-delay-3" style="aspect-ratio:16/9;">
      <img src="<?php echo esc_url(house36_bbt_asset_variant_url('images/hero-slideshow-4.PNG', 720)); ?>" srcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/hero-slideshow-4.PNG', array(720, 960, 1320))); ?>" sizes="(max-width: 800px) 100vw, 66vw" alt="BBT players celebrating a win" loading="lazy" decoding="async" width="1320" height="833" />
      <span class="gallery-caption">The BBT Family</span>
    </div>
  </div>

  <div class="gallery-expand-row reveal">
    <button id="galleryExpandBtn" class="btn-outline" type="button"><span>View More Photos</span></button>
  </div>
</section>

<section id="facilities" class="facilities" aria-labelledby="facilities-heading">
  <div class="facilities-header reveal">
    <h2 id="facilities-heading">Two Indoor <em>Training Facilities</em></h2>
    <p>Over 3,000+ sq ft of turf, professional-grade batting cages, netting, and fully-equipped weight rooms across two premier locations.</p>
  </div>

  <div class="facilities-grid">
    <div class="facility-card reveal reveal-delay-1">
      <div class="facility-gallery">
        <img src="<?php echo esc_url(house36_bbt_asset_variant_url('images/facility-img-1.jpg', 900)); ?>" srcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/facility-img-1.jpg', array(320, 900))); ?>" sizes="(max-width: 800px) 100vw, 50vw" alt="Rocklin facility batting cages" class="facility-main-img" loading="lazy" decoding="async" width="905" height="679" />
        <div class="facility-thumbnails">
          <img src="<?php echo esc_url(house36_bbt_asset_variant_url('images/facility-img-2.jpg', 320)); ?>" alt="Rocklin turf area" loading="lazy" decoding="async" width="679" height="679" />
          <img src="<?php echo esc_url(house36_bbt_asset_variant_url('images/facility-img-3.jpg', 320)); ?>" alt="Rocklin training equipment" loading="lazy" decoding="async" width="905" height="679" />
          <img src="<?php echo esc_url(house36_bbt_asset_variant_url('images/facility-img-4.jpg', 320)); ?>" alt="Rocklin catchers area" loading="lazy" decoding="async" width="905" height="679" />
        </div>
      </div>
      <div class="facility-info">
        <h3>Rocklin Basecamp</h3>
        <address>4283 Duluth Ave<br>Rocklin, CA 95765</address>
      </div>
    </div>

    <div class="facility-card reveal reveal-delay-2">
      <div class="facility-gallery">
        <img src="<?php echo esc_url(house36_bbt_asset_variant_url('images/IMG_0607.jpg', 960)); ?>" srcset="<?php echo esc_attr(house36_bbt_asset_srcset('images/IMG_0607.jpg', array(320, 960))); ?>" sizes="(max-width: 800px) 100vw, 50vw" alt="El Dorado Hills brand new turf facility" class="facility-main-img" loading="lazy" decoding="async" width="5712" height="4284" />
        <div class="facility-thumbnails">
          <img src="<?php echo esc_url(house36_bbt_asset_variant_url('images/IMG_0609.jpg', 320)); ?>" alt="EDH facility batting lanes" loading="lazy" decoding="async" width="5712" height="4284" />
          <img src="<?php echo esc_url(house36_bbt_asset_variant_url('images/IMG_0604.jpg', 320)); ?>" alt="EDH turf area" loading="lazy" decoding="async" width="5712" height="4284" />
          <img src="<?php echo esc_url(house36_bbt_asset_variant_url('images/IMG_0605.jpg', 320)); ?>" alt="EDH facility details" loading="lazy" decoding="async" width="5712" height="4284" />
        </div>
      </div>
      <div class="facility-info">
        <h3>El Dorado Hills (EDH)</h3>
        <address>4990 Hillsdale Dr, Suite 400<br>El Dorado Hills, CA</address>
      </div>
    </div>
  </div>
</section>

<section class="faq" aria-labelledby="faq-heading">
  <div class="faq-container reveal">
    <div class="faq-header">
      <h2 id="faq-heading">Frequently Asked <em>Questions</em></h2>
    </div>

    <div class="faq-list">
      <details class="faq-item reveal reveal-delay-1">
        <summary>What ages does Better Baseball Training serve? <span class="faq-icon"></span></summary>
        <div class="faq-a-wrap"><div class="faq-a"><div class="faq-a-inner"><p>BBT provides elite baseball training, academy memberships, and travel teams for youth baseball players ages <strong>8 to 14U</strong>.</p></div></div></div>
      </details>
      <details class="faq-item reveal reveal-delay-2">
        <summary>Where is Better Baseball Training located? <span class="faq-icon"></span></summary>
        <div class="faq-a-wrap"><div class="faq-a"><div class="faq-a-inner"><p>We have two indoor training facilities with full turf and batting cages in the Sacramento area: <strong>Rocklin</strong> (4283 Duluth Ave) and <strong>El Dorado Hills</strong> (4990 Hillsdale Dr, Suite 400).</p></div></div></div>
      </details>
      <details class="faq-item reveal reveal-delay-3">
        <summary>How much does baseball academy membership cost? <span class="faq-icon"></span></summary>
        <div class="faq-a-wrap"><div class="faq-a"><div class="faq-a-inner"><p>Our Academy Membership provides unlimited access to classes and training. Pricing is <strong>$250/month in Rocklin</strong> and <strong>$299/month in El Dorado Hills</strong>.</p></div></div></div>
      </details>
      <details class="faq-item reveal reveal-delay-4">
        <summary>Do you offer private baseball lessons? <span class="faq-icon"></span></summary>
        <div class="faq-a-wrap"><div class="faq-a"><div class="faq-a-inner"><p><strong>Yes.</strong> We offer both private and group instruction for hitting, pitching, infield/outfield, and catching. All lessons are coached by our staff of college and pro alumni.</p></div></div></div>
      </details>
      <details class="faq-item reveal reveal-delay-5">
        <summary>Does BBT have travel baseball teams? <span class="faq-icon"></span></summary>
        <div class="faq-a-wrap"><div class="faq-a"><div class="faq-a-inner"><p><strong>Yes.</strong> Better Baseball Training fields 11+ highly competitive youth travel baseball teams across multiple divisions from ages 9U through 14U.</p></div></div></div>
      </details>
    </div>
  </div>

  <script type="application/ld+json">
    <?php echo wp_json_encode($faq_schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT); ?>
  </script>
</section>

<section id="memberships" class="academy-details" aria-labelledby="academy-membership-heading">
  <div class="academy-container reveal">
    <div class="academy-content">
      <h2 id="academy-membership-heading">Unlimited Access Academy Membership</h2>
      <div style="font-family:'Bebas Neue',sans-serif;font-size:28px;letter-spacing:0.08em;color:var(--cyan);margin-top:6px;margin-bottom:12px;">Ages 8-14U</div>
      <p>
        Gain an edge on the competition with unlimited access to premium instruction and state-of-the-art facilities. Our Academy Memberships empower dedicated youth players to train year-round with professional-level guidance.
      </p>

      <div style="margin-top:28px;display:flex;gap:24px;flex-wrap:wrap;">
        <div style="flex:1;min-width:160px;padding:20px;border:1px solid rgba(255, 242, 0, 0.25);border-radius:6px;background:rgba(255, 242, 0, 0.04);box-shadow:0 0 20px rgba(255, 242, 0, 0.06);">
          <div style="font-family:'DM Mono',monospace;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:var(--cyan);margin-bottom:8px;">Rocklin</div>
          <div style="font-family:'Bebas Neue',sans-serif;font-size:48px;color:var(--yellow);line-height:1;">$250<span style="font-size:18px;color:rgba(255,255,255,0.5);font-family:'Inter',sans-serif;font-weight:300;">/mo</span></div>
        </div>
        <div style="flex:1;min-width:160px;padding:20px;border:1px solid rgba(255, 242, 0, 0.25);border-radius:6px;background:rgba(255, 242, 0, 0.04);box-shadow:0 0 20px rgba(255, 242, 0, 0.06);">
          <div style="font-family:'DM Mono',monospace;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:var(--cyan);margin-bottom:8px;">El Dorado Hills</div>
          <div style="font-family:'Bebas Neue',sans-serif;font-size:48px;color:var(--yellow);line-height:1;">$299<span style="font-size:18px;color:rgba(255,255,255,0.5);font-family:'Inter',sans-serif;font-weight:300;">/mo</span></div>
        </div>
      </div>

      <h3 class="academy-subheading">What's Included</h3>
      <ul class="academy-includes">
        <li>Hitting</li>
        <li>Pitching</li>
        <li>INF / OF</li>
        <li>Catchers</li>
        <li>Baseball IQ</li>
      </ul>
    </div>

    <div id="bbt-form" class="cta-box forminator-cta-box">
      <div class="cta-box-topline">
        <div class="cta-box-eyebrow">Start With a Game Plan</div>
        <div class="cta-box-badge">Ages 8-14U</div>
      </div>
      <h3 class="cta-box-headline">Fill Out the Form Below to <em>Get Started</em></h3>

      <div class="forminator-shell">
        <?php echo house36_bbt_render_training_form(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
      </div>

      <div class="cta-box-support">
        <a href="tel:9164655551" class="cta-box-phone">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          916-465-5551
        </a>
        <a href="<?php echo esc_url(house36_bbt_schedule_url()); ?>" class="cta-box-secondary-link">
          View Schedule
        </a>
      </div>
      <div class="cta-box-trust">
        <span class="cta-box-trust-item">Pro Coaching Staff</span>
        <span class="cta-box-trust-item">2 Sacramento-Area Locations</span>
        <span class="cta-box-trust-item">Private + Group Options</span>
      </div>
    </div>
  </div>
</section>

<?php
while (have_posts()) :
    the_post();
    if (trim(wp_strip_all_tags(get_the_content()))) :
        ?>
    <section class="editor-section">
      <div class="editor-section__inner entry-content">
        <?php the_content(); ?>
      </div>
    </section>
        <?php
    endif;
endwhile;
?>
</main>
<?php
get_footer();
