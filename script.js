(() => {
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");
  const inquiryModal = document.getElementById("inquiry-modal");
  const inquiryForm = document.getElementById("inquiry-form");
  const inquiryNotice = document.getElementById("inquiry-notice");
  const closeInquiryButton = document.querySelector("[data-close-inquiry]");
  let previousFocus = null;
  let noticeTimeout;

  function closeMenu() {
    mainNav.classList.remove("nav-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    menuToggle.classList.remove("menu-open");
  }

  function openInquiry() {
    previousFocus = document.activeElement;
    inquiryModal.hidden = false;
    document.body.classList.add("modal-open");
    closeMenu();
    inquiryModal.querySelector('input[name="name"]').focus();
  }

  function closeInquiry() {
    inquiryModal.hidden = true;
    document.body.classList.remove("modal-open");
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
  }

  function scrollToSection(id) {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    closeMenu();
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    menuToggle.classList.toggle("menu-open", isOpen);
  });

  document.querySelectorAll("[data-scroll]").forEach((button) => {
    button.addEventListener("click", () => scrollToSection(button.dataset.scroll));
  });

  document.querySelectorAll("[data-open-inquiry]").forEach((button) => {
    button.addEventListener("click", openInquiry);
  });

  closeInquiryButton.addEventListener("click", closeInquiry);
  inquiryModal.addEventListener("click", (event) => {
    if (event.target === inquiryModal) closeInquiry();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (!inquiryModal.hidden) closeInquiry();
      closeMenu();
    }
  });

  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    closeInquiry();
    inquiryForm.reset();
    inquiryNotice.hidden = false;
    window.clearTimeout(noticeTimeout);
    noticeTimeout = window.setTimeout(() => {
      inquiryNotice.hidden = true;
    }, 4500);
  });

  if (window.location.hash) {
    window.requestAnimationFrame(() => {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: "auto" });
    });
  }
})();