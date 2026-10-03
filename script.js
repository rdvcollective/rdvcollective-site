(() => {
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.getElementById("main-nav");
  const heroImage = document.querySelector(".hero-media img");
  const reveals = [...document.querySelectorAll(".reveal")];

  const closeMenu = () => {
    if (!nav || !menuToggle) return;
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  };

  menuToggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach((el) => observer.observe(el));

  const updateScrollState = () => {
    const y = window.scrollY || 0;
    header?.classList.toggle("scrolled", y > 60);

    if (heroImage && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      heroImage.style.transform = `translate3d(0,${Math.min(y * 0.08, 50)}px,0) scale(1.04)`;
    }
  };

  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });
})();