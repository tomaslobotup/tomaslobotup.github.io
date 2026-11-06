// ==========================================================================
// PORTFOLIO SCRIPT - JOAQUIN TOMAS LOBO
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Menú móvil hamburguesa
  const menuToggle = document.querySelector('.menu-toggle');
  const primaryNav = document.querySelector('#primary-nav');

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      primaryNav.classList.toggle('is-open');
    });

    // Cerrar al clickear cualquier enlace
    primaryNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        primaryNav.classList.remove('is-open');
      });
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        primaryNav.classList.remove('is-open');
      }
    });

    // Cerrar al clickear afuera
    document.addEventListener('click', (e) => {
      if (!primaryNav.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.setAttribute('aria-expanded', 'false');
        primaryNav.classList.remove('is-open');
      }
    });
  }

  // 2. Scroll Reveal con IntersectionObserver
  const revealElements = document.querySelectorAll('[data-reveal]');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // 3. Highlight de enlace activo en la navegación según el scroll
  const sections = document.querySelectorAll('section[data-section]');
  const navLinks = document.querySelectorAll('#primary-nav a[data-nav]');

  const updateActiveNav = () => {
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('data-nav') === id) {
            link.classList.add('is-active');
            link.setAttribute('aria-current', 'location');
          } else {
            link.classList.remove('is-active');
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
});
