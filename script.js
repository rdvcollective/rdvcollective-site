(() => {
  const floatingTop = document.querySelector('[data-floating-top]');
  const updateTopControl = () => {
    if (!floatingTop) return;
    const threshold = Math.max(window.innerHeight * 0.75, 520);
    floatingTop.classList.toggle('is-visible', window.scrollY > threshold);
  };
  updateTopControl();
  window.addEventListener('scroll', updateTopControl, { passive: true });
})();