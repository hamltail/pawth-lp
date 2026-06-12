document.addEventListener('DOMContentLoaded', () => {
  const fadeInElements = document.querySelectorAll('.fade-in');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -10% 0px',
  });

  fadeInElements.forEach((element) => observer.observe(element));

  const introSection = document.querySelector('.section--intro');
  if (!introSection) return;

  const screenCards = introSection.querySelectorAll('.screen-card');
  if (!screenCards.length) return;

  if (prefersReduced) {
    screenCards.forEach((card) => card.classList.add('is-visible'));
    return;
  }

  const introObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      screenCards.forEach((card) => card.classList.add('is-visible'));
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.25,
    rootMargin: '0px 0px -15% 0px',
  });

  introObserver.observe(introSection);
});
