const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-link');
const backToTop = document.querySelector('.back-to-top');

if (menuToggle && navLinks) {
  const setMenuState = (isOpen) => {
    navLinks.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    document.body.classList.toggle('menu-open', isOpen);
  };

  menuToggle.addEventListener('click', () => {
    setMenuState(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  navItems.forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenuState(false);
      menuToggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (menuToggle.getAttribute('aria-expanded') !== 'true') return;
    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) setMenuState(false);
  });
}

const sections = document.querySelectorAll('main section[id]');
const updateNavigation = () => {
  const position = window.scrollY + 120;
  let activeSectionId = '';
  sections.forEach((section) => {
    if (position >= section.offsetTop && position < section.offsetTop + section.offsetHeight) {
      activeSectionId = section.id;
    }
  });
  navItems.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${activeSectionId}`;
    link.classList.toggle('active', isActive);
    if (isActive) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 500);
};

window.addEventListener('scroll', updateNavigation, { passive: true });
updateNavigation();

if (backToTop) {
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

const revealTargets = document.querySelectorAll(
  '.section-heading, .about-photo, .about-copy, .education-card, .skill-card, .project-card, .career-photo, .career-copy, .contact-grid'
);

revealTargets.forEach((element) => element.classList.add('reveal'));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

  revealTargets.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min((index % 3) * 70, 140)}ms`;
    revealObserver.observe(element);
  });
} else {
  revealTargets.forEach((element) => element.classList.add('is-visible'));
}
