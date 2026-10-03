```javascript
/* =========================================================
   SNK PREMIUM PORTFOLIO
   script.js
   ========================================================= */

"use strict";

/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initSmoothNavigation();
  initScrollReveal();
  initActiveNavigation();
  initHeroParallax();
  initProjectPointerGlow();
  initImageFallback();
  initCurrentYear();
});


/* =========================================================
   MOBILE MENU
   ========================================================= */

function initMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (!menuToggle || !nav) return;

  const navLinks = nav.querySelectorAll("a");

  function openMenu() {
    menuToggle.classList.add("active");
    nav.classList.add("open");

    document.body.classList.add("menu-open");

    menuToggle.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    menuToggle.classList.remove("active");
    nav.classList.remove("open");

    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
  }

  function toggleMenu() {
    const isOpen = nav.classList.contains("open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Toggle navigation");

  menuToggle.addEventListener("click", toggleMenu);

  /* Close after clicking a navigation link */

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  /* Close when clicking outside */

  document.addEventListener("click", (event) => {
    if (!nav.classList.contains("open")) return;

    const clickedInsideNav = nav.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideNav && !clickedToggle) {
      closeMenu();
    }
  });

  /* Close with Escape */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  /* Close menu when viewport becomes desktop */

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });
}


/* =========================================================
   SMOOTH NAVIGATION
   ========================================================= */

function initSmoothNavigation() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const header = document.querySelector(".header");
      const headerHeight = header
        ? header.offsetHeight
        : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        10;

      window.scrollTo({
        top: targetPosition,
        behavior: getReducedMotion()
          ? "auto"
          : "smooth"
      });

      /*
       * Update URL without jumping.
       */

      if (history.pushState) {
        history.pushState(null, "", targetId);
      }
    });
  });
}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal");

  if (!elements.length) return;

  /*
   * Accessibility:
   * If the user prefers reduced motion,
   * immediately reveal everything.
   */

  if (getReducedMotion()) {
    elements.forEach((element) => {
      element.classList.add("revealed");
    });

    return;
  }

  /*
   * Modern browsers:
   * IntersectionObserver.
   */

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("revealed");

          observerInstance.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return;
  }

  /*
   * Fallback for older browsers.
   */

  elements.forEach((element) => {
    element.classList.add("revealed");
  });
}


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

function initActiveNavigation() {
  const navLinks = document.querySelectorAll(
    '.nav a[href^="#"]'
  );

  if (!navLinks.length) return;

  const sections = [];

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href || href === "#") return;

    const section = document.querySelector(href);

    if (section) {
      sections.push({
        element: section,
        link: link
      });
    }
  });

  if (!sections.length) return;

  function updateActiveNav() {
    const scrollPosition =
      window.scrollY +
      window.innerHeight * 0.28;

    let currentSection = null;

    sections.forEach((item) => {
      const sectionTop =
        item.element.offsetTop;

      if (scrollPosition >= sectionTop) {
        currentSection = item;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
    });

    if (currentSection) {
      currentSection.link.classList.add("active");
    }
  }

  let ticking = false;

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveNav();
          ticking = false;
        });

        ticking = true;
      }
    },
    { passive: true }
  );

  updateActiveNav();
}


/* =========================================================
   HERO PARALLAX
   ========================================================= */

function initHeroParallax() {
  const hero = document.querySelector(".hero");
  const visual = document.querySelector(".hero-visual");

  if (!hero || !visual) return;

  if (getReducedMotion()) return;

  /*
   * Disable parallax on touch/mobile devices.
   */

  const isTouchDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0;

  if (isTouchDevice || window.innerWidth <= 760) {
    return;
  }

  let targetX = 0;
  let targetY = 0;

  let currentX = 0;
  let currentY = 0;

  let animationFrame = null;

  function updateTarget(event) {
    const rect = hero.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
      rect.width;

    const y =
      (event.clientY - rect.top) /
      rect.height;

    targetX = (x - 0.5) * 22;
    targetY = (y - 0.5) * 18;

    startAnimation();
  }

  function animate() {
    currentX +=
      (targetX - currentX) * 0.08;

    currentY +=
      (targetY - currentY) * 0.08;

    visual.style.setProperty(
      "--mouse-x",
      `${currentX}px`
    );

    visual.style.setProperty(
      "--mouse-y",
      `${currentY}px`
    );

    const difference =
      Math.abs(targetX - currentX) +
      Math.abs(targetY - currentY);

    if (difference > 0.05) {
      animationFrame =
        window.requestAnimationFrame(animate);
    } else {
      animationFrame = null;
    }
  }

  function startAnimation() {
    if (animationFrame === null) {
      animationFrame =
        window.requestAnimationFrame(animate);
    }
  }

  function resetParallax() {
    targetX = 0;
    targetY = 0;

    startAnimation();
  }

  hero.addEventListener(
    "mousemove",
    updateTarget,
    { passive: true }
  );

  hero.addEventListener(
    "mouseleave",
    resetParallax
  );
}


/* =========================================================
   PROJECT POINTER GLOW
   ========================================================= */

function initProjectPointerGlow() {
  const covers = document.querySelectorAll(
    ".project-cover"
  );

  if (!covers.length) return;

  if (getReducedMotion()) return;

  covers.forEach((cover) => {
    cover.addEventListener(
      "pointermove",
      (event) => {
        const rect =
          cover.getBoundingClientRect();

        const x =
          ((event.clientX - rect.left) /
            rect.width) *
          100;

        const y =
          ((event.clientY - rect.top) /
            rect.height) *
          100;

        cover.style.setProperty(
          "--pointer-x",
          `${x}%`
        );

        cover.style.setProperty(
          "--pointer-y",
          `${y}%`
        );
      },
      { passive: true }
    );

    cover.addEventListener(
      "pointerleave",
      () => {
        cover.style.setProperty(
          "--pointer-x",
          "50%"
        );

        cover.style.setProperty(
          "--pointer-y",
          "50%"
        );
      }
    );
  });
}


/* =========================================================
   IMAGE FALLBACK
   ========================================================= */

function initImageFallback() {
  const images = document.querySelectorAll(
    "img"
  );

  images.forEach((image) => {
    image.addEventListener(
      "error",
      () => {
        image.classList.add("image-error");

        /*
         * If the image is inside a portrait frame,
         * create a clean fallback.
         */

        const portraitFrame =
          image.closest(".portrait-frame");

        if (portraitFrame) {
          image.style.display = "none";

          if (
            !portraitFrame.querySelector(
              ".portrait-placeholder"
            )
          ) {
            const placeholder =
              document.createElement("div");

            placeholder.className =
              "portrait-placeholder";

            placeholder.textContent = "SNK";

            portraitFrame.appendChild(
              placeholder
            );
          }
        }
      },
      { once: true }
    );
  });
}


/* =========================================================
   CURRENT YEAR
   ========================================================= */

function initCurrentYear() {
  const yearElements =
    document.querySelectorAll(
      "[data-year], .current-year"
    );

  if (!yearElements.length) return;

  const year =
    new Date().getFullYear();

  yearElements.forEach((element) => {
    element.textContent = year;
  });
}


/* =========================================================
   REDUCED MOTION HELPER
   ========================================================= */

function getReducedMotion() {
  return window.matchMedia &&
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
}


/* =========================================================
   HEADER SCROLL STATE
   ========================================================= */

(function initHeaderScrollState() {
  const header =
    document.querySelector(".header");

  if (!header) return;

  function updateHeader() {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

  updateHeader();
})();


/* =========================================================
   EXTERNAL LINK SAFETY
   ========================================================= */

(function initExternalLinks() {
  const links =
    document.querySelectorAll(
      'a[target="_blank"]'
    );

  links.forEach((link) => {
    const rel =
      link.getAttribute("rel") || "";

    const values =
      rel.split(" ").filter(Boolean);

    if (!values.includes("noopener")) {
      values.push("noopener");
    }

    if (!values.includes("noreferrer")) {
      values.push("noreferrer");
    }

    link.setAttribute(
      "rel",
      values.join(" ")
    );
  });
})();


/* =========================================================
   BUTTON MICRO-INTERACTION
   ========================================================= */

(function initButtonInteraction() {
  const buttons =
    document.querySelectorAll(
      ".button, .contact-button, .nav-contact"
    );

  if (!buttons.length) return;

  if (getReducedMotion()) return;

  buttons.forEach((button) => {
    button.addEventListener(
      "pointerdown",
      () => {
        button.style.transform =
          "translateY(1px) scale(.985)";
      }
    );

    button.addEventListener(
      "pointerup",
      () => {
        button.style.transform = "";
      }
    );

    button.addEventListener(
      "pointerleave",
      () => {
        button.style.transform = "";
      }
    );
  });
})();


/* =========================================================
   BACK-TO-TOP BEHAVIOR
   ========================================================= */

(function initBackToTop() {
  const backTop =
    document.querySelector(
      '[data-back-top]'
    );

  if (!backTop) return;

  backTop.addEventListener(
    "click",
    (event) => {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: getReducedMotion()
          ? "auto"
          : "smooth"
      });
    }
  );
})();


/* =========================================================
   CONSOLE BRANDING
   ========================================================= */

console.log(
  "%c SNK Portfolio ",
  "background:#171719;color:#fff;padding:8px 12px;border-radius:6px;font-weight:700;"
);

console.log(
  "%c Designed & engineered with intention. ",
  "color:#7763e8;font-weight:600;"
);
```
