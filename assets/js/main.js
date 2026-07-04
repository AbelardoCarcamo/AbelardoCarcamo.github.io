(function () {
  "use strict";

  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".navbar .nav-link");
  const collapseEl = document.querySelector(".navbar-collapse");

  function updateNavbar() {
    if (!navbar) return;
    navbar.classList.toggle("navbar-scrolled", window.scrollY > 16);
  }

  function initRevealEffects() {
    const items = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    items.forEach((item) => observer.observe(item));
  }

  function initCounters() {
    const counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;

    const runCounter = (counter) => {
      const target = Number(counter.dataset.counter || 0);
      const duration = 850;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        counter.textContent = Math.round(target * progress).toString();
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
      counters.forEach(runCounter);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.45 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  function closeMobileMenuOnClick() {
    if (!collapseEl || typeof bootstrap === "undefined") return;
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapseEl, { toggle: false });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (collapseEl.classList.contains("show")) {
          bsCollapse.hide();
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    updateNavbar();
    initRevealEffects();
    initCounters();
    closeMobileMenuOnClick();
  });

  window.addEventListener("scroll", updateNavbar, { passive: true });
})();
