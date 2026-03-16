<?php
/*
Template Name: Coaches Page
Template Post Type: page
*/

$coaches_page = get_queried_object();
$coaches_title = ($coaches_page instanceof WP_Post) ? get_the_title($coaches_page) : 'The Standard of Excellence';
$coaches_description = 'Better Baseball Training isn\'t run by parent volunteers. We\'ve handpicked an elite staff of former professional players and collegiate stars. Your child learns the game exactly how it\'s taught at the highest levels.';

if ($coaches_page instanceof WP_Post && has_excerpt($coaches_page)) {
    $coaches_description = get_the_excerpt($coaches_page);
}

get_header();
?>

<main id="main-content">
<section class="page-hero">
  <div class="page-hero-bg">
    <img src="<?php echo esc_url(house36_bbt_asset('images/team-photo-1.jpg')); ?>" alt="BBT Coaches" />
  </div>
  <div class="page-hero-content reveal">
    <h1 class="page-title"><?php echo wp_kses_post($coaches_title); ?></h1>
    <p class="page-desc"><?php echo esc_html($coaches_description); ?></p>
  </div>
</section>

<section class="coaches-page-section">
  <div class="coaches-grid">
    <div class="coach-card reveal reveal-delay-1">
      <div class="coach-img-wrapper">
        <img src="<?php echo esc_url(house36_bbt_asset('images/coach-jon-peters.jpg')); ?>" alt="Jon Peters" class="coach-img" />
        <span class="coach-badge coach-badge-owner">Owner</span>
      </div>
      <div class="coach-info">
        <h3 class="coach-name">Jon Peters</h3>
        <div class="coach-role">Owner / Player Development</div>
        <p class="coach-bio">Founded BBT with one goal: build better players and better people. Jon oversees all player development programming across both facilities and has spent years studying hitting, pitching development, and athletic performance from youth to collegiate level. Chino High School (2007). Mt San Antonio College (09-10) where he earned All conference honors. Chico State ('11-'13) where he studied physical education and earned his BA in Kinesiology ('14). JP began coaching at Folsom Lake College from (2014-2020) and again in 2024-2025. He served as an assistant coach for the Lincoln Potters (2015-2019), Assoc HC (2019-2022) and Head Coach (2022-2023), and was named Head Coach of the CCL NORTH All-Star Team. He has coached over 25 players selected in the MLB draft or signed to free agent contracts.</p>
        <button class="read-more-btn" type="button">Read More</button>
        <div class="coach-quote">
          <strong>Favorite part of coaching</strong>
          <p>"Watching the boys achieve their goals, nothing better in this thing than seeing all their hard work lead to success!"</p>
        </div>
        <p class="coach-cred"><strong>Chico State</strong> · Folsom Lake College</p>
      </div>
    </div>

    <div class="coach-card reveal reveal-delay-2">
      <div class="coach-img-wrapper">
        <img src="<?php echo esc_url(house36_bbt_asset('images/cesar-tamayo.jpeg')); ?>" alt="Cesar Tamayo" class="coach-img" />
        <span class="coach-badge coach-badge-pro" style="background:var(--cyan);color:black;">Rocklin GM</span>
      </div>
      <div class="coach-info">
        <h3 class="coach-name">Cesar Tamayo</h3>
        <div class="coach-role">Rocklin GM</div>
        <p class="coach-bio">Cesar Tamayo is a Southern California native and a 2014 grad from La Sierra High School. After graduating he played 2 years at Mt. San Jacinto College where he received his AA degree in Social Sciences. He then received a scholarship to play at Marymount University where he received a Bachelor's degree in Human Performance and Psychology. He moved to Roseville in 2023 to attend Jessup University and received his Master's Degree in Kinesiology. Cesar has been with BBT since 2021. He also served as an assistant coach with the Lincoln Potters in 2022 and 2023.</p>
        <button class="read-more-btn" type="button">Read More</button>
        <div class="coach-quote">
          <strong>Favorite part of coaching</strong>
          <p>"Being able to teach the kids the game I love."</p>
        </div>
        <p class="coach-cred"><strong>Jessup University (MS)</strong> · Marymount University</p>
      </div>
    </div>

    <div class="coach-card reveal reveal-delay-3">
      <div class="coach-img-wrapper">
        <img src="<?php echo esc_url(house36_bbt_asset('images/trey-furrey.jpeg')); ?>" alt="Trey Furrey" class="coach-img" />
        <span class="coach-badge coach-badge-pro" style="background:var(--cyan);color:black;">EDH GM</span>
      </div>
      <div class="coach-info">
        <h3 class="coach-name">Trey Furrey</h3>
        <div class="coach-role">El Dorado Hills GM</div>
        <p class="coach-bio">Trey is a Folsom native, graduated from Folsom High in 2018 and attended Folsom Lake College where he earned All-America honors in 2020. He then transferred to Oklahoma Baptist and later to Jessup University where he earned his bachelor's degree and was named GSAC Player of the Year and once again earned All-America honors.</p>
        <button class="read-more-btn" type="button">Read More</button>
        <div class="coach-quote">
          <strong>Favorite part of coaching</strong>
          <p>"Seeing the kids continuing to learn and grow and be able to take what they've learned and apply it to their game."</p>
        </div>
        <p class="coach-cred"><strong>Jessup University</strong> · GSAC Player of the Year</p>
      </div>
    </div>

    <div class="coach-card reveal reveal-delay-4">
      <div class="coach-img-wrapper">
        <img src="<?php echo esc_url(house36_bbt_asset('images/bruce-carmichael.PNG')); ?>" alt="Bruce Carmichael" class="coach-img" />
        <span class="coach-badge coach-badge-pro">Pro Alumni</span>
      </div>
      <div class="coach-info">
        <h3 class="coach-name">Bruce Carmichael</h3>
        <div class="coach-role">13U Gray Head Coach</div>
        <p class="coach-bio">Drafted by the Chicago Cubs Organization and played 3 years after earning a full baseball scholarship at Santa Clara University. Bruce has coached at the college and high school levels over the past 35 years. In 1998, he was named Western States Assistant Baseball Coach of the Year by the National High School Association. He also served as the General Manager for the Dusty Baker Baseball Camps for 30 years.</p>
        <button class="read-more-btn" type="button">Read More</button>
        <p class="coach-cred"><strong>Chicago Cubs</strong> · Santa Clara University</p>
      </div>
    </div>

    <div class="coach-card reveal reveal-delay-5">
      <div class="coach-img-wrapper">
        <img src="<?php echo esc_url(house36_bbt_asset('images/jean-machi.jpeg')); ?>" alt="Jean Machi" class="coach-img" />
        <span class="coach-badge coach-badge-pro">Pro Alumni</span>
      </div>
      <div class="coach-info">
        <h3 class="coach-name">Jean Machi</h3>
        <div class="coach-role">Pitching Lessons</div>
        <p class="coach-bio">BBT EDH is thrilled to add the knowledge and experience of former Big Leaguer and 2014 World Series Champion with the SF Giants, Jean Machi, to the calendar for pitching lessons at the EDH location. Jean pitched in the big leagues from 2012-2017 having stints with the Seattle Mariners, Boston Red Sox, and San Francisco Giants, boasting a lifetime ERA of 3.38.</p>
        <button class="read-more-btn" type="button">Read More</button>
        <p class="coach-cred"><strong>SF Giants · World Series Champion</strong> · Mariners · Red Sox</p>
      </div>
    </div>

    <div class="coach-card reveal reveal-delay-6">
      <div class="coach-img-wrapper">
        <img src="<?php echo esc_url(house36_bbt_asset('images/gabe-emmett.jpeg')); ?>" alt="Gabe Emmett" class="coach-img" />
        <span class="coach-badge coach-badge-pro">Pro Alumni</span>
      </div>
      <div class="coach-info">
        <h3 class="coach-name">Gabe Emmett</h3>
        <div class="coach-role">Pitching Lessons</div>
        <p class="coach-bio">Former Vista del Lago High School pitcher (Class of 2019) who went on to play at Folsom Lake College before being drafted by the Los Angeles Dodgers in 2021. Over the last four years, he's pitched in the Dodgers organization with the ACL Dodgers and the Rancho Cucamonga Quakes, and in June 2023 was named California League Pitcher of the Month. Consistently topping out 96-98 mph through knowledge gained working with some of the best coaches and players in the game.</p>
        <button class="read-more-btn" type="button">Read More</button>
        <p class="coach-cred"><strong>Los Angeles Dodgers</strong> · Folsom Lake College</p>
      </div>
    </div>

    <div class="coach-card reveal reveal-delay-1">
      <div class="coach-img-wrapper">
        <img src="<?php echo esc_url(house36_bbt_asset('images/kris-krise.jpeg')); ?>" alt="Kris Krise" class="coach-img" />
        <span class="coach-badge coach-badge-pro">Pro Alumni</span>
      </div>
      <div class="coach-info">
        <h3 class="coach-name">Kris Krise</h3>
        <div class="coach-role">12U Black Head Coach</div>
        <p class="coach-bio">2002 Crescenta Valley High School graduate (Los Angeles). Played at UC Irvine, COC, and Chico State before being selected in the 12th Round of the 2005 MLB Draft by the Los Angeles Dodgers.</p>
        <button class="read-more-btn" type="button">Read More</button>
        <div class="coach-quote">
          <strong>Favorite part of coaching</strong>
          <p>"My favorite part about coaching is the opportunity to positively influence young lives, fostering growth, confidence, and a love of the game."</p>
        </div>
        <p class="coach-cred"><strong>Los Angeles Dodgers</strong> · Chico State · UC Irvine</p>
      </div>
    </div>

    <div class="coach-card reveal reveal-delay-2">
      <div class="coach-img-wrapper">
        <img src="<?php echo esc_url(house36_bbt_asset('images/logan-coe.PNG')); ?>" alt="Logan Coe" class="coach-img" />
        <span class="coach-badge coach-badge-pro" style="background:var(--cyan);color:black;">College Alumni</span>
      </div>
      <div class="coach-info">
        <h3 class="coach-name">Logan Coe</h3>
        <div class="coach-role">Coach</div>
        <p class="coach-bio">Graduated from Buhach Colony HS in 2016. Played JUCO ball at Modesto, and went on to play at Oklahoma Baptist and Jessup University.</p>
        <button class="read-more-btn" type="button">Read More</button>
        <div class="coach-quote">
          <strong>Favorite part of coaching</strong>
          <p>"Passing down game knowledge and seeing the kids grow and develop."</p>
        </div>
        <p class="coach-cred"><strong>Jessup University</strong> · Oklahoma Baptist</p>
      </div>
    </div>

    <div class="coach-card reveal reveal-delay-3">
      <div class="coach-img-wrapper">
        <img src="<?php echo esc_url(house36_bbt_asset('images/nolan-theibay.jpeg')); ?>" alt="Nolan Theibay" class="coach-img" />
        <span class="coach-badge coach-badge-pro" style="background:var(--cyan);color:black;">College Alumni</span>
      </div>
      <div class="coach-info">
        <h3 class="coach-name">Nolan Theibay</h3>
        <div class="coach-role">Coach</div>
        <p class="coach-bio">Jessup University alumni.</p>
        <button class="read-more-btn" type="button">Read More</button>
        <p class="coach-cred"><strong>Jessup University</strong></p>
      </div>
    </div>

    <div class="coach-card reveal reveal-delay-4">
      <div class="coach-img-wrapper">
        <img src="<?php echo esc_url(house36_bbt_asset('images/quinten-hall.jpeg')); ?>" alt="Quintan Hall" class="coach-img" />
        <span class="coach-badge coach-badge-pro" style="background:var(--cyan);color:black;">College Alumni</span>
      </div>
      <div class="coach-info">
        <h3 class="coach-name">Quintan Hall</h3>
        <div class="coach-role">Coach</div>
        <p class="coach-bio">Graduated from Mill Valley High School (KS) in 2019. Played at Johnson County Community College, University of Central Missouri, and Jessup University, competing at the highest level of college ball.</p>
        <button class="read-more-btn" type="button">Read More</button>
        <div class="coach-quote">
          <strong>Favorite part of coaching</strong>
          <p>"Giving back to the kids what I've learned and experienced in my journey to help them grow and learn the game at the highest level."</p>
        </div>
        <p class="coach-cred"><strong>Jessup University</strong> · Central Missouri · Johnson County CC</p>
      </div>
    </div>

    <div class="coach-card reveal reveal-delay-5">
      <div class="coach-img-wrapper">
        <img src="<?php echo esc_url(house36_bbt_asset('images/jackson-doherty.PNG')); ?>" alt="Jackson Doherty" class="coach-img" />
        <span class="coach-badge coach-badge-pro" style="background:var(--cyan);color:black;">College Alumni</span>
      </div>
      <div class="coach-info">
        <h3 class="coach-name">Jackson Doherty</h3>
        <div class="coach-role">Coach</div>
        <p class="coach-bio">2017 Olathe East Highschool graduate. Played 2 years at Coffeyville Community College and 3 years at Benedictine College, graduating with a BA in Mechanical Engineering. He currently works for Louisville Slugger Innovations as a Senior R&amp;D Testing Engineer.</p>
        <button class="read-more-btn" type="button">Read More</button>
        <div class="coach-quote">
          <strong>Favorite part of coaching</strong>
          <p>"Watching kids play to their full potential."</p>
        </div>
        <p class="coach-cred"><strong>Benedictine College</strong> · Coffeyville CC</p>
      </div>
    </div>

    <div class="coach-card reveal reveal-delay-6">
      <div class="coach-img-wrapper">
        <img src="<?php echo esc_url(house36_bbt_asset('images/bryce-pertrilla.PNG')); ?>" alt="Bryce Petrilla" class="coach-img" />
        <span class="coach-badge coach-badge-pro" style="background:var(--cyan);color:black;">College Alumni</span>
      </div>
      <div class="coach-info">
        <h3 class="coach-name">Bryce Petrilla</h3>
        <div class="coach-role">Coach</div>
        <p class="coach-bio">2019 Rocklin High graduate. Played at Folsom Lake College ('21-'22), Oregon Tech ('22-'23), and Jessup University ('23-'25).</p>
        <button class="read-more-btn" type="button">Read More</button>
        <div class="coach-quote">
          <strong>Favorite part of coaching</strong>
          <p>"Being able to teach kids not only the game of baseball but prepare them and develop them into the best men they can be."</p>
        </div>
        <p class="coach-cred"><strong>Jessup University</strong> · Oregon Tech</p>
      </div>
    </div>

    <div class="coach-card reveal reveal-delay-1">
      <div class="coach-img-wrapper">
        <img src="<?php echo esc_url(house36_bbt_asset('images/justin-watari.PNG')); ?>" alt="Justin Watari" class="coach-img" />
        <span class="coach-badge coach-badge-pro" style="background:var(--cyan);color:black;">College Alumni</span>
      </div>
      <div class="coach-info">
        <h3 class="coach-name">Justin Watari</h3>
        <div class="coach-role">Coach</div>
        <p class="coach-bio">Graduated from Woodcreek HS in 2016. Went on to play and graduate at the University of New Mexico.</p>
        <button class="read-more-btn" type="button">Read More</button>
        <div class="coach-quote">
          <strong>Favorite part of coaching</strong>
          <p>"Helping the athletes develop both physically and mentally to compete at the next age group and level."</p>
        </div>
        <p class="coach-cred"><strong>University of New Mexico</strong></p>
      </div>
    </div>

    <div class="coach-card reveal reveal-delay-2">
      <div class="coach-img-wrapper">
        <img src="<?php echo esc_url(house36_bbt_asset('images/logo-american-b-black-yellow.png')); ?>" alt="Mike Quintal" class="coach-img-placeholder" />
        <span class="coach-badge coach-badge-pro" style="background:var(--cyan);color:black;">College Alumni</span>
      </div>
      <div class="coach-info">
        <h3 class="coach-name">Mike Quintal</h3>
        <div class="coach-role">Coach</div>
        <p class="coach-bio">2001 Archbishop Mitty graduate. Played collegiately at SCU, SJCC, and Cal Poly Pomona.</p>
        <button class="read-more-btn" type="button">Read More</button>
        <div class="coach-quote">
          <strong>Favorite part of coaching</strong>
          <p>"The love for the game and much of the person I am was only because of the great coaches I had. Coaching isn't about me. It's all about the impact I can make on each kid."</p>
        </div>
        <p class="coach-cred"><strong>Cal Poly Pomona</strong> · SCU</p>
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

?></main><?php

get_footer();
