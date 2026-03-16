(function () {
  function initReveals() {
    var reveals = document.querySelectorAll('.reveal');

    if (!reveals.length || typeof IntersectionObserver === 'undefined') {
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(function (element) {
      observer.observe(element);
    });
  }

  function initHeroSlideshow() {
    var slides = document.querySelectorAll('.hero-slide');
    var prevBtn = document.querySelector('.hero-nav-btn.prev');
    var nextBtn = document.querySelector('.hero-nav-btn.next');
    var dots = document.querySelectorAll('.hero-nav-dot');

    if (!slides.length) {
      return;
    }

    var currentSlide = 0;
    var slideInterval;

    function ensureSlideLoaded(index) {
      var slide = slides[index];

      if (!slide || !slide.dataset.src) {
        return;
      }

      if (slide.dataset.srcset) {
        slide.srcset = slide.dataset.srcset;
        slide.removeAttribute('data-srcset');
      }
      slide.src = slide.dataset.src;
      slide.removeAttribute('data-src');
    }

    function goToSlide(index) {
      slides[currentSlide].classList.remove('active');

      if (dots.length) {
        dots[currentSlide].classList.remove('active');
      }

      currentSlide = (index + slides.length) % slides.length;
      ensureSlideLoaded(currentSlide);
      slides[currentSlide].classList.add('active');

      ensureSlideLoaded((currentSlide + 1) % slides.length);

      if (dots.length) {
        dots[currentSlide].classList.add('active');
      }
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    function startInterval() {
      window.clearInterval(slideInterval);
      slideInterval = window.setInterval(nextSlide, 5000);
    }

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', function () {
        prevSlide();
        startInterval();
      });

      nextBtn.addEventListener('click', function () {
        nextSlide();
        startInterval();
      });
    }

    if (dots.length) {
      dots.forEach(function (dot, index) {
        dot.addEventListener('click', function () {
          goToSlide(index);
          startInterval();
        });
      });
    }

    ensureSlideLoaded(currentSlide);
    ensureSlideLoaded((currentSlide + 1) % slides.length);

    startInterval();
  }

  function initGalleryToggle() {
    var expandBtn = document.getElementById('galleryExpandBtn');
    var galleryGrid = document.querySelector('.gallery-grid');
    var galleryHeader = document.querySelector('.gallery-header');

    if (!expandBtn || !galleryGrid) {
      return;
    }

    expandBtn.addEventListener('click', function () {
      var label = expandBtn.querySelector('span');

      galleryGrid.classList.toggle('is-expanded');

      if (galleryGrid.classList.contains('is-expanded')) {
        if (label) {
          label.textContent = 'Show Less';
        }
      } else {
        if (label) {
          label.textContent = 'View More Photos';
        }

        if (galleryHeader) {
          galleryHeader.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  function initCoachReadMore() {
    document.querySelectorAll('.coaches-page-section .coach-bio').forEach(function (bio) {
      var btn = bio.nextElementSibling;

      if (!btn || !btn.classList.contains('read-more-btn')) {
        return;
      }

      if (bio.scrollHeight > bio.clientHeight) {
        btn.style.display = 'block';
      }

      btn.addEventListener('click', function () {
        bio.classList.toggle('expanded');
        btn.textContent = bio.classList.contains('expanded') ? 'Show Less' : 'Read More';
      });
    });
  }

  function initMobileMenu() {
    var hamburger = document.querySelector('.hamburger');
    var mobileMenu = document.querySelector('.mobile-menu');
    var mobileLinks = document.querySelectorAll('.mobile-menu-links a');

    if (!hamburger || !mobileMenu) {
      return;
    }

    function closeMenu() {
      hamburger.classList.remove('is-active');
      mobileMenu.classList.remove('is-active');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('is-active');
      mobileMenu.classList.toggle('is-active');
      document.body.style.overflow = mobileMenu.classList.contains('is-active') ? 'hidden' : '';
    });

    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    mobileMenu.addEventListener('click', function (event) {
      if (event.target === mobileMenu) {
        closeMenu();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initReveals();
    initHeroSlideshow();
    initGalleryToggle();
    initCoachReadMore();
    initMobileMenu();
  });
}());
