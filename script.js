/* =========================================================
   NUSRAT AFSANA USHA — ULTRA PREMIUM PORTFOLIO
   script.js
   ========================================================= */

(() => {
  "use strict";

  /* =======================================================
     DOM HELPERS
     ======================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const html = document.documentElement;
  const body = document.body;

  const pageLoader = $("#pageLoader");
  const progressBar = $("#progressBar");

  const cursor = $("#cursor");
  const cursorDot = $("#cursorDot");

  const themeToggle = $("#themeToggle");
  const menuToggle = $("#menuToggle");
  const mobileMenu = $("#mobileMenu");

  const sectionCounter = $("#sectionCounter");
  const sectionLabel = $("#sectionLabel");

  const currentYear = $("#currentYear");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* =======================================================
     PAGE LOADER
     ======================================================= */

  const hideLoader = () => {
    if (!pageLoader) return;

    setTimeout(() => {
      pageLoader.classList.add("is-hidden");
      body.classList.add("page-loaded");
    }, reducedMotion ? 0 : 700);
  };

  if (document.readyState === "complete") {
    hideLoader();
  } else {
    window.addEventListener("load", hideLoader, {
      once: true
    });
  }


  /* =======================================================
     CURRENT YEAR
     ======================================================= */

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* =======================================================
     SCROLL PROGRESS
     ======================================================= */

  const updateScrollProgress = () => {
    if (!progressBar) return;

    const scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    progressBar.style.width = `${Math.min(
      100,
      Math.max(0, progress)
    )}%`;
  };


  /* =======================================================
     HEADER SCROLL STATE
     ======================================================= */

  const header = $(".site-header");

  const updateHeader = () => {
    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 30
    );
  };


  /* =======================================================
     COMBINED SCROLL HANDLER
     ======================================================= */

  let ticking = false;

  const onScroll = () => {
    if (ticking) return;

    window.requestAnimationFrame(() => {
      updateScrollProgress();
      updateHeader();

      if (!reducedMotion) {
        updateParallax();
      }

      ticking = false;
    });

    ticking = true;
  };

  window.addEventListener("scroll", onScroll, {
    passive: true
  });

  updateScrollProgress();
  updateHeader();


  /* =======================================================
     CUSTOM CURSOR
     ======================================================= */

  const canUseCustomCursor =
    window.matchMedia("(pointer:fine)").matches &&
    !reducedMotion &&
    cursor &&
    cursorDot;

  if (canUseCustomCursor) {

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let cursorX = mouseX;
    let cursorY = mouseY;

    let dotX = mouseX;
    let dotY = mouseY;

    let cursorAnimation;

    document.addEventListener("mousemove", (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      body.classList.add("cursor-ready");
    });

    const animateCursor = () => {

      cursorX += (mouseX - cursorX) * 0.16;
      cursorY += (mouseY - cursorY) * 0.16;

      dotX += (mouseX - dotX) * 0.32;
      dotY += (mouseY - dotY) * 0.32;

      cursor.style.transform =
        `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;

      cursorDot.style.transform =
        `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;

      cursorAnimation =
        window.requestAnimationFrame(animateCursor);
    };

    animateCursor();

    document.addEventListener("mouseleave", () => {
      body.classList.remove("cursor-ready");
    });

    document.addEventListener("mouseenter", () => {
      body.classList.add("cursor-ready");
    });

    const interactiveElements = $$(
      "a, button, .project, .skill, .service-row, .journal-card"
    );

    interactiveElements.forEach((element) => {

      element.addEventListener("mouseenter", () => {
        cursor.classList.add("cursor-hover");
      });

      element.addEventListener("mouseleave", () => {
        cursor.classList.remove("cursor-hover");
      });

    });

    window.addEventListener("beforeunload", () => {
      if (cursorAnimation) {
        cancelAnimationFrame(cursorAnimation);
      }
    });
  }


  /* =======================================================
     THEME SYSTEM
     ======================================================= */

  const THEME_KEY = "nusrat_usha_theme";

  const getStoredTheme = () => {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch {
      return null;
    }
  };

  const saveTheme = (theme) => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* Storage may be disabled */
    }
  };

  const getPreferredTheme = () => {

    const stored = getStoredTheme();

    if (stored === "dark" || stored === "light") {
      return stored;
    }

    return window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
      ? "dark"
      : "light";
  };

  const applyTheme = (theme) => {

    html.setAttribute(
      "data-theme",
      theme
    );

    if (theme === "dark") {
      body.classList.add("dark-theme");
    } else {
      body.classList.remove("dark-theme");
    }

    if (themeToggle) {

      themeToggle.setAttribute(
        "aria-pressed",
        theme === "dark" ? "true" : "false"
      );

      themeToggle.setAttribute(
        "aria-label",
        theme === "dark"
          ? "Switch to light theme"
          : "Switch to dark theme"
      );

      const icon = $(
        "[data-theme-icon]",
        themeToggle
      );

      if (icon) {
        icon.textContent =
          theme === "dark"
            ? "☼"
            : "☾";
      }
    }
  };

  applyTheme(getPreferredTheme());

  if (themeToggle) {

    themeToggle.addEventListener("click", () => {

      const current =
        html.getAttribute("data-theme") ||
        "light";

      const next =
        current === "dark"
          ? "light"
          : "dark";

      applyTheme(next);
      saveTheme(next);

    });
  }


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  const openMenu = () => {

    if (!mobileMenu || !menuToggle) return;

    mobileMenu.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");

    body.classList.add("menu-open");

    const firstLink =
      $(".mobile-nav a", mobileMenu);

    if (firstLink) {
      setTimeout(() => {
        firstLink.focus();
      }, 250);
    }
  };

  const closeMenu = () => {

    if (!mobileMenu || !menuToggle) return;

    mobileMenu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");

    body.classList.remove("menu-open");
  };

  if (menuToggle) {

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.addEventListener("click", () => {

      const isOpen =
        mobileMenu &&
        mobileMenu.classList.contains("is-open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }

    });
  }

  $$(".mobile-nav a").forEach((link) => {

    link.addEventListener("click", () => {
      closeMenu();
    });

  });

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      closeMenu();
    }

  });


  /* =======================================================
     CLOSE MOBILE MENU ON RESIZE
     ======================================================= */

  window.addEventListener("resize", () => {

    if (window.innerWidth > 900) {
      closeMenu();
    }

  });


  /* =======================================================
     SMOOTH ANCHOR SCROLL
     ======================================================= */

  $$('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const href = link.getAttribute("href");

      if (!href || href === "#") {
        return;
      }

      const target = $(href);

      if (!target) {
        return;
      }

      event.preventDefault();

      const headerOffset =
        header
          ? header.offsetHeight + 15
          : 20;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: reducedMotion
          ? "auto"
          : "smooth"
      });

    });

  });


  /* =======================================================
     REVEAL ANIMATIONS
     ======================================================= */

  const revealElements = $$(
    ".reveal, .image-reveal, .service-row, .process-step, " +
    ".project, .principle, .timeline-item, .skill-group, " +
    ".journal-card"
  );

  if (reducedMotion) {

    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });

  } else {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold:0.12,
          rootMargin:"0px 0px -60px 0px"
        }
      );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  }


  /* =======================================================
     STAGGERED REVEAL
     ======================================================= */

  const staggerGroups = [
    ".services-list",
    ".process-grid",
    ".work-grid",
    ".principles-list",
    ".timeline",
    ".skills-grid",
    ".journal-grid"
  ];

  staggerGroups.forEach((selector) => {

    const group = $(selector);

    if (!group) return;

    const children = [
      ...group.children
    ];

    children.forEach((child, index) => {

      if (!child.classList.contains("reveal")) {
        child.classList.add("reveal");
      }

      child.style.transitionDelay =
        `${Math.min(index * 0.07, 0.42)}s`;

    });

  });


  /* =======================================================
     HERO PARALLAX
     ======================================================= */

  const heroVisual = $(".hero-visual");
  const heroCopy = $(".hero-copy");
  const heroImage = $(".hero-image-wrap");

  let parallaxScroll = 0;
  let mouseParallaxX = 0;
  let mouseParallaxY = 0;

  const updateParallax = () => {

    if (!heroVisual) return;

    const scrollY = window.scrollY;

    parallaxScroll =
      Math.min(scrollY * 0.045, 45);

    heroVisual.style.transform =
      `translate3d(0, ${parallaxScroll}px, 0)`;

    if (heroCopy) {

      const copyOffset =
        Math.min(scrollY * -0.018, 18);

      heroCopy.style.transform =
        `translate3d(0, ${copyOffset}px, 0)`;
    }

    if (heroImage) {

      heroImage.style.transform =
        `translate3d(${mouseParallaxX}px, ${mouseParallaxY}px, 0)`;
    }
  };

  if (!reducedMotion) {

    document.addEventListener(
      "mousemove",
      (event) => {

        if (window.innerWidth < 901) {
          return;
        }

        const x =
          (event.clientX /
            window.innerWidth -
            0.5);

        const y =
          (event.clientY /
            window.innerHeight -
            0.5);

        mouseParallaxX = x * 10;
        mouseParallaxY = y * 10;

      },
      { passive:true }
    );

  }


  /* =======================================================
     MAGNETIC BUTTONS
     ======================================================= */

  if (!reducedMotion &&
      window.matchMedia("(pointer:fine)").matches) {

    const magneticButtons = $$(
      ".button, .text-link, .back-top"
    );

    magneticButtons.forEach((button) => {

      button.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            button.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left -
            rect.width / 2;

          const y =
            event.clientY -
            rect.top -
            rect.height / 2;

          button.style.transform =
            `translate(${x * 0.12}px, ${y * 0.12}px)`;
        }
      );

      button.addEventListener(
        "mouseleave",
        () => {
          button.style.transform = "";
        }
      );

    });

  }


  /* =======================================================
     ACTIVE NAVIGATION
     ======================================================= */

  const navLinks = $$(".main-nav a");

  const sections = $$(
    "main section[id]"
  );

  const sectionData = sections.map(
    (section) => ({
      element:section,
      id:section.id,
      label:
        section.dataset.label ||
        section.querySelector(
          ".section-kicker"
        )?.textContent?.trim() ||
        section.id
    })
  );

  const updateActiveSection = (activeId) => {

    navLinks.forEach((link) => {

      const href =
        link.getAttribute("href");

      link.classList.toggle(
        "active",
        href === `#${activeId}`
      );

      if (
        href === `#${activeId}`
      ) {
        link.setAttribute(
          "aria-current",
          "page"
        );
      } else {
        link.removeAttribute(
          "aria-current"
        );
      }

    });

    const index =
      sectionData.findIndex(
        (item) =>
          item.id === activeId
      );

    if (sectionCounter) {

      sectionCounter.textContent =
        String(index + 1).padStart(
          2,
          "0"
        );
    }

    if (sectionLabel) {

      sectionLabel.textContent =
        sectionData[index]?.label ||
        "";
    }
  };

  if (sectionData.length) {

    const sectionObserver =
      new IntersectionObserver(
        (entries) => {

          const visible =
            entries
              .filter(
                (entry) =>
                  entry.isIntersecting
              )
              .sort(
                (a, b) =>
                  b.intersectionRatio -
                  a.intersectionRatio
              );

          if (!visible.length) {
            return;
          }

          updateActiveSection(
            visible[0].target.id
          );

        },
        {
          threshold:[
            0.15,
            0.35,
            0.55,
            0.75
          ],
          rootMargin:
            "-15% 0px -45% 0px"
        }
      );

    sectionData.forEach(
      ({ element }) =>
        sectionObserver.observe(element)
    );

  }


  /* =======================================================
     IMAGE LOADING
     ======================================================= */

  const images = $$("img");

  images.forEach((img) => {

    if (img.complete) {
      img.classList.add("loaded");
      return;
    }

    img.addEventListener(
      "load",
      () => {
        img.classList.add("loaded");
      },
      { once:true }
    );

    img.addEventListener(
      "error",
      () => {
        img.classList.add("image-error");
      },
      { once:true }
    );

  });


  /* =======================================================
     BACK TO TOP
     ======================================================= */

  $$(".back-top").forEach((button) => {

    button.addEventListener("click", (event) => {

      const href =
        button.getAttribute("href");

      if (
        href === "#" ||
        href === "#home"
      ) {

        event.preventDefault();

        window.scrollTo({
          top:0,
          behavior:
            reducedMotion
              ? "auto"
              : "smooth"
        });
      }

    });

  });


  /* =======================================================
     HOVER IMAGE TILT
     ======================================================= */

  if (
    !reducedMotion &&
    window.matchMedia("(pointer:fine)").matches
  ) {

    $$(".project-visual").forEach(
      (visual) => {

        visual.addEventListener(
          "mousemove",
          (event) => {

            const rect =
              visual.getBoundingClientRect();

            const x =
              (event.clientX -
                rect.left) /
                rect.width -
              0.5;

            const y =
              (event.clientY -
                rect.top) /
                rect.height -
              0.5;

            visual.style.transform =
              `perspective(1000px)
               rotateX(${y * -2}deg)
               rotateY(${x * 2}deg)`;
          }
        );

        visual.addEventListener(
          "mouseleave",
          () => {
            visual.style.transform = "";
          }
        );

      }
    );

  }


  /* =======================================================
     KEYBOARD ACCESSIBILITY
     ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Tab"
      ) {
        body.classList.add(
          "keyboard-user"
        );
      }

    },
    { once:true }
  );


  /* =======================================================
     EXTERNAL PLACEHOLDER LINKS
     ======================================================= */

  $$(
    'a[data-placeholder="true"]'
  ).forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
      }
    );

    link.setAttribute(
      "aria-disabled",
      "true"
    );

  });


  /* =======================================================
     RESIZE / VISIBILITY
     ======================================================= */

  document.addEventListener(
    "visibilitychange",
    () => {

      if (
        document.hidden
      ) {
        body.classList.add(
          "page-hidden"
        );
      } else {
        body.classList.remove(
          "page-hidden"
        );
      }

    }
  );


  /* =======================================================
     INITIAL STATE
     ======================================================= */

  window.requestAnimationFrame(() => {

    updateScrollProgress();
    updateHeader();

    if (!reducedMotion) {
      updateParallax();
    }

    if (
      sectionData.length &&
      window.scrollY < 100
    ) {
      updateActiveSection(
        sectionData[0].id
      );
    }

  });

})();
