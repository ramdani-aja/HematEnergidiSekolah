/**
 * ============================================================
 * script.js
 * Script Interaktivitas Navigasi & Tampilan Website HematEnergi (Fase 1)
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var navbar = document.getElementById('mainNavbar');
  var navbarCollapse = document.getElementById('navbarMenu');
  var navbarToggler = document.querySelector('.he-toggler');

  // --- 1. Navigasi Mobile (Hamburger Toggle Mandiri & Bootstrap Compatible) ---
  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = navbarCollapse.classList.toggle('show');
      navbarToggler.classList.toggle('active', isOpen);
      navbarToggler.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Menutup menu mobile ketika tautan diklik
    var navLinks = navbarCollapse.querySelectorAll('.he-nav-link');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (navbarCollapse.classList.contains('show')) {
          navbarCollapse.classList.remove('show');
          navbarToggler.classList.remove('active');
          navbarToggler.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Menutup menu mobile saat mengklik di luar area navigasi
    document.addEventListener('click', function (event) {
      if (navbar && !navbar.contains(event.target) && navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
        navbarToggler.classList.remove('active');
        navbarToggler.setAttribute('aria-expanded', 'false');
      }
    });

    // Menutup menu dengan tombol Escape (Aksesibilitas Keyboard)
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
        navbarToggler.classList.remove('active');
        navbarToggler.setAttribute('aria-expanded', 'false');
        navbarToggler.focus();
      }
    });
  }

  // --- 2. Efek Sticky Shadow pada Navbar saat Halaman Digulir ---
  if (navbar) {
    function updateNavbar() {
      if (window.scrollY > 25) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });
  }

  // --- 3. Smooth Scrolling untuk Tautan Internal (#kenapa, dll) ---
  var smoothLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  smoothLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      var targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  var prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealTargets = document.querySelectorAll(
    'main .he-section-header, main .he-card, main .he-image-card, main .he-teaser-card, ' +
    'main .data-stat-card, main .data-chart-card, main .recommendation-card'
  );

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -36px 0px', threshold: 0.08 });

    revealTargets.forEach(function (target) {
      target.classList.add('reveal-pending');
      revealObserver.observe(target);
    });
  }
});
