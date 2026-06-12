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

  const modal = document.getElementById('image-modal');
  const modalOverlay = modal?.querySelector('[data-modal-close]');
  const modalClose = modal?.querySelector('.modal__close');
  const modalImage = modal?.querySelector('.modal__image');
  const modalCaption = modal?.querySelector('.modal__caption');

  const openModal = (src, alt) => {
    if (!modal || !modalImage || !modalCaption) return;
    modalImage.src = src;
    modalImage.alt = alt || '';
    modalCaption.textContent = alt || '';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modal || !modalImage) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modalImage.src = '';
    modalImage.alt = '';
    document.body.style.overflow = '';
  };

  const screenImages = document.querySelectorAll('.section--intro .screen-card__image');
  screenImages.forEach((image) => {
    image.addEventListener('click', () => {
      openModal(image.src, image.alt);
    });
  });

  modalOverlay?.addEventListener('click', closeModal);
  modalClose?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal?.classList.contains('is-open')) {
      closeModal();
    }
  });
});
