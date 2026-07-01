(function () {
  var loader = document.getElementById('loader');
  var navToggle = document.querySelector('.nav__toggle');
  var navMenu = document.querySelector('.nav__menu');
  var navLinks = document.querySelectorAll('.nav__menu a');

  function dismissLoader() {
    loader.classList.add('is-done');
    document.body.classList.add('is-loaded');
  }

  var loadTimer = setTimeout(dismissLoader, 3000);

  window.addEventListener('load', function () {
    clearTimeout(loadTimer);
    setTimeout(dismissLoader, 800);
  });

  if (document.readyState === 'complete') {
    clearTimeout(loadTimer);
    setTimeout(dismissLoader, 800);
  }

  // Mobile nav
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      navMenu.classList.toggle('is-open');
    });

    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
      });
    });
  }

  // Subtle fade-in for content on scroll
  var revealTargets = document.querySelectorAll('.section, .reveal');
  if ('IntersectionObserver' in window && revealTargets.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    revealTargets.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    document.head.insertAdjacentHTML(
      'beforeend',
      '<style>.is-visible{opacity:1!important;transform:none!important}</style>'
    );
  }

  // Weather modals
  document.querySelectorAll('[data-modal]').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      var id = 'modal-' + trigger.getAttribute('data-modal');
      var overlay = document.getElementById(id);
      if (overlay) overlay.classList.add('is-open');
    });
  });

  document.querySelectorAll('[data-close]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var overlay = document.getElementById(btn.getAttribute('data-close'));
      if (overlay) overlay.classList.remove('is-open');
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) overlay.classList.remove('is-open');
    });
  });

  // Carousel
  var carousel = document.getElementById('carousel');
  if (carousel) {
    var track = carousel.querySelector('.carousel__track');
    var slides = carousel.querySelectorAll('.carousel__slide');
    var prevBtn = carousel.querySelector('.carousel__btn--prev');
    var nextBtn = carousel.querySelector('.carousel__btn--next');
    var dotsContainer = carousel.querySelector('.carousel__dots');
    var current = 0;
    var total = slides.length;

    function goTo(index) {
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      current = index;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dotsContainer.querySelectorAll('.carousel__dot').forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === current);
      });
    }

    for (var i = 0; i < total; i++) {
      var dot = document.createElement('button');
      dot.className = 'carousel__dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', 'Photo ' + (i + 1));
      dot.addEventListener('click', function (idx) { return function () { goTo(idx); }; }(i));
      dotsContainer.appendChild(dot);
    }

    prevBtn.addEventListener('click', function () { goTo(current - 1); resetAuto(); });
    nextBtn.addEventListener('click', function () { goTo(current + 1); resetAuto(); });

    // Auto-advance
    var autoInterval = setInterval(function () { goTo(current + 1); }, 4000);

    function resetAuto() {
      clearInterval(autoInterval);
      autoInterval = setInterval(function () { goTo(current + 1); }, 4000);
    }

    carousel.addEventListener('mouseenter', function () { clearInterval(autoInterval); });
    carousel.addEventListener('mouseleave', function () {
      autoInterval = setInterval(function () { goTo(current + 1); }, 4000);
    });

    // Keyboard
    carousel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { goTo(current - 1); resetAuto(); }
      if (e.key === 'ArrowRight') { goTo(current + 1); resetAuto(); }
    });
  }

  // Floating TL;DR
  var tldrToggle = document.getElementById('tldr-toggle');
  var tldrPanel = document.getElementById('tldr-panel');
  var tldrClose = document.getElementById('tldr-close');
  if (tldrToggle && tldrPanel) {
    function openTldr() { tldrPanel.classList.add('is-open'); }
    function closeTldr() { tldrPanel.classList.remove('is-open'); }
    tldrToggle.addEventListener('click', openTldr);
    if (tldrClose) tldrClose.addEventListener('click', closeTldr);
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.tldr')) closeTldr();
    });
  }

  // Flip cards
  document.querySelectorAll('.flip-card').forEach(function (card) {
    card.addEventListener('click', function () {
      card.classList.toggle('is-flipped');
    });
  });
})();
