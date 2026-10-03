/*
  Nusrat Afsana Usha
  UX / UI Designer Portfolio
  Main interaction script
*/

(() => {
  "use strict";

  /* --------------------------------
     HELPERS
  -------------------------------- */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


  /* --------------------------------
     DOM
  -------------------------------- */

  const body = document.body;
  const html = document.documentElement;

  const pageLoader = $("#pageLoader");
  const progressBar = $("#progressBar");

  const siteHeader = $("#siteHeader");

  const cursor = $("#cursor");
  const cursorDot = $("#cursorDot");

  const themeToggle = $("#themeToggle");
  const themeIcon = $("[data-theme-icon]", themeToggle);

  const menuToggle = $("#menuToggle");
  const mobileMenu = $("#mobileMenu");

  const currentYear = $("#currentYear");

  const sectionCounter = $("#sectionCounter");
  const sectionLabel = $("#sectionLabel");


  /* --------------------------------
     YEAR
  -------------------------------- */

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* --------------------------------
     PAGE LOADER
  -------------------------------- */

  const hideLoader = () => {
    if (!pageLoader) return;

    pageLoader.classList.add("is-hidden");

    setTimeout(() => {
      pageLoader.style.display = "none";
    }, 1000);
  };

  if (document.readyState === "complete") {
    setTimeout(hideLoader, 350);
  } else {
    window.addEventListener("load", () => {
      setTimeout(hideLoader, 350);
    });
  }


  /* --------------------------------
     SCROLL PROGRESS
  -------------------------------- */

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


  /* --------------------------------
     HEADER
  -------------------------------- */

  const updateHeader = () => {
    if (!siteHeader) return;

    siteHeader.classList.toggle(
      "scrolled",
      window.scrollY > 40
    );
  };


  /* --------------------------------
     THEME
  -------------------------------- */

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
      // Storage may be unavailable.
    }
  };

  const updateThemeButton = (theme) => {
    if (!themeToggle) return;

    const isDark = theme === "dark";

    themeToggle.setAttribute(
      "aria-pressed",
      String(isDark)
    );

    themeToggle.setAttribute(
      "aria-label",
      isDark
        ? "Switch to light mode"
        : "Switch to dark mode"
    );

    if (themeIcon) {
      themeIcon.textContent = isDark ? "☼" : "◐";
    }
  };

  const applyTheme = (theme) => {
    const safeTheme =
      theme === "dark" ? "dark" : "light";

    if (safeTheme === "dark") {
      html.setAttribute("data-theme", "dark");
    } else {
      html.setAttribute("data-theme", "light");
    }

    body.classList.toggle(
      "dark-theme",
      safeTheme === "dark"
    );

    updateThemeButton(safeTheme);
  };

  const storedTheme = getStoredTheme();

  if (storedTheme) {
    applyTheme(storedTheme);
  } else {
    applyTheme("light");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {

      const current =
        html.getAttribute("data-theme") === "dark"
          ? "dark"
          : "light";

      const next =
        current === "dark"
          ? "light"
          : "dark";

      applyTheme(next);
      saveTheme(next);
    });
  }


  /* --------------------------------
     MOBILE MENU
  -------------------------------- */

  const setMenuState = (open) => {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.toggle(
      "is-open",
      open
    );

    mobileMenu.classList.toggle(
      "is-open",
      open
    );

    body.classList.toggle(
      "menu-open",
      open
    );

    menuToggle.setAttribute(
      "aria-expanded",
      String(open)
    );

    menuToggle.setAttribute(
      "aria-label",
      open
        ? "Close menu"
        : "Open menu"
    );
  };

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {

      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      setMenuState(!isOpen);
    });
  }

  $$("#mobileMenu a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      setMenuState(false);
    }

  });


  /* --------------------------------
     SMOOTH ANCHOR LINKS
  -------------------------------- */

  const anchorLinks = $$(
    'a[href^="#"]:not([href="#"])'
  );

  anchorLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const href = link.getAttribute("href");

      if (!href) return;

      const target = document.querySelector(href);

      if (!target) return;

      event.preventDefault();

      const headerOffset =
        siteHeader
          ? siteHeader.offsetHeight + 15
          : 20;

      const targetTop =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth"
      });

    });

  });


  /* --------------------------------
     REVEAL ANIMATIONS
  -------------------------------- */

  const revealElements = $$(".reveal");

  const revealObserver =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries, observer) => {

            entries.forEach((entry) => {

              if (!entry.isIntersecting) return;

              entry.target.classList.add(
                "is-visible"
              );

              observer.unobserve(
                entry.target
              );

            });

          },
          {
            threshold: 0.12,
            rootMargin: "0px 0px -60px 0px"
          }
        )
      : null;

  if (revealObserver) {

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });

  }


  /* --------------------------------
     STAGGERED ELEMENTS
  -------------------------------- */

  const staggerGroups = [
    ".service-row",
    ".process-step",
    ".project",
    ".principle",
    ".timeline-item",
    ".skill-group",
    ".journal-card"
  ];

  staggerGroups.forEach((selector) => {

    const elements = $$(selector);

    elements.forEach((element, index) => {

      element.style.transitionDelay =
        `${Math.min(index * 70, 420)}ms`;

    });

  });


  /* --------------------------------
     IMAGE REVEAL
  -------------------------------- */

  const heroImage = $(".hero-image");

  if (heroImage) {

    heroImage.addEventListener(
      "load",
      () => {

        heroImage.classList.add(
          "image-loaded"
        );

      },
      { once: true }
    );

  }


  /* --------------------------------
     IMAGE ERROR HANDLING
  -------------------------------- */

  $$(".hero-image").forEach((image) => {

    image.addEventListener("error", () => {

      image.style.display = "none";

      const wrapper =
        image.closest(".hero-image-wrap");

      if (wrapper) {
        wrapper.classList.add(
          "image-missing"
        );
      }

    });

  });


  /* --------------------------------
     CUSTOM CURSOR
  -------------------------------- */

  const finePointer =
    window.matchMedia(
      "(pointer:fine)"
    ).matches;

  let mouseX = 0;
  let mouseY = 0;

  let cursorX = 0;
  let cursorY = 0;

  let cursorDotX = 0;
  let cursorDotY = 0;

  if (
    finePointer &&
    cursor &&
    cursorDot
  ) {

    cursor.style.opacity = "1";
    cursorDot.style.opacity = "1";

    window.addEventListener(
      "mousemove",
      (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

      },
      { passive: true }
    );

    const animateCursor = () => {

      cursorX +=
        (mouseX - cursorX) * 0.14;

      cursorY +=
        (mouseY - cursorY) * 0.14;

      cursorDotX +=
        (mouseX - cursorDotX) * 0.35;

      cursorDotY +=
        (mouseY - cursorDotY) * 0.35;

      cursor.style.transform =
        `translate3d(
          ${cursorX}px,
          ${cursorY}px,
          0
        ) translate(-50%,-50%)`;

      cursorDot.style.transform =
        `translate3d(
          ${cursorDotX}px,
          ${cursorDotY}px,
          0
        ) translate(-50%,-50%)`;

      requestAnimationFrame(
        animateCursor
      );
    };

    animateCursor();


    const interactiveElements = $$(
      "a, button, .project, .service-row, .journal-card, .skill-list span"
    );

    interactiveElements.forEach((element) => {

      element.addEventListener(
        "mouseenter",
        () => {
          cursor.classList.add(
            "cursor-hover"
          );
        }
      );

      element.addEventListener(
        "mouseleave",
        () => {
          cursor.classList.remove(
            "cursor-hover"
          );
        }
      );

    });

  }


  /* --------------------------------
     MAGNETIC BUTTONS
  -------------------------------- */

  if (finePointer) {

    const magneticButtons = $$(".magnetic");

    magneticButtons.forEach((button) => {

      button.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            button.getBoundingClientRect();

          const x =
            event.clientX -
            (rect.left + rect.width / 2);

          const y =
            event.clientY -
            (rect.top + rect.height / 2);

          button.style.transform =
            `translate(
              ${x * 0.08}px,
              ${y * 0.08}px
            )`;

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


  /* --------------------------------
     HERO PARALLAX
  -------------------------------- */

  const heroVisual = $(".hero-visual");

  let ticking = false;

  const updateParallax = () => {

    if (
      !heroVisual ||
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      ticking = false;
      return;
    }

    const scroll =
      window.scrollY;

    if (window.innerWidth > 900) {

      const amount =
        Math.min(scroll * 0.08, 45);

      heroVisual.style.transform =
        `translateY(${amount}px)`;

    } else {

      heroVisual.style.transform = "";

    }

    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {

      if (!ticking) {

        requestAnimationFrame(
          updateParallax
        );

        ticking = true;

      }

    },
    { passive: true }
  );


  /* --------------------------------
     PROJECT TILT
  -------------------------------- */

  if (
    finePointer &&
    !window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {

    const projectVisuals =
      $$(".project-visual");

    projectVisuals.forEach((visual) => {

      visual.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            visual.getBoundingClientRect();

          const x =
            (event.clientX - rect.left) /
            rect.width -
            0.5;

          const y =
            (event.clientY - rect.top) /
            rect.height -
            0.5;

          const rotateX =
            y * -2;

          const rotateY =
            x * 2;

          visual.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

        }
      );

      visual.addEventListener(
        "mouseleave",
        () => {

          visual.style.transform = "";

        }
      );

    });

  }


  /* --------------------------------
     SECTION TRACKING
  -------------------------------- */

  const sections = [
    {
      id: "home",
      label: "Home"
    },
    {
      id: "services",
      label: "Services"
    },
    {
      id: "thinking",
      label: "Thinking"
    },
    {
      id: "work",
      label: "Work"
    },
    {
      id: "principles",
      label: "Principles"
    },
    {
      id: "about",
      label: "About"
    },
    {
      id: "experience",
      label: "Experience"
    },
    {
      id: "skills",
      label: "Skills"
    },
    {
      id: "journal",
      label: "Journal"
    },
    {
      id: "contact",
      label: "Contact"
    }
  ];

  const sectionElements =
    sections
      .map((section) => ({
        ...section,
        element:
          document.getElementById(section.id)
      }))
      .filter((section) => section.element);


  const updateSectionIndicator = () => {

    if (!sectionElements.length) return;

    const marker =
      window.scrollY +
      window.innerHeight * 0.35;

    let active =
      sectionElements[0];

    sectionElements.forEach((section) => {

      const top =
        section.element.offsetTop;

      if (marker >= top) {
        active = section;
      }

    });

    if (sectionCounter) {

      const index =
        sectionElements.indexOf(active) + 1;

      sectionCounter.textContent =
        `${String(index).padStart(2, "0")} / ${String(sectionElements.length).padStart(2, "0")}`;

    }

    if (sectionLabel) {
      sectionLabel.textContent =
        active.label;
    }

  };


  /* --------------------------------
     ACTIVE NAV
  -------------------------------- */

  const navLinks =
    $$(".main-nav .nav-link");

  const setActiveNav =
    (sectionId) => {

      navLinks.forEach((link) => {

        const href =
          link.getAttribute("href");

        link.classList.toggle(
          "active",
          href === `#${sectionId}`
        );

      });

    };


  const navObserver =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {

            entries.forEach((entry) => {

              if (
                entry.isIntersecting &&
                entry.intersectionRatio > 0.25
              ) {

                setActiveNav(
                  entry.target.id
                );

              }

            });

          },
          {
            threshold: [0.25, 0.5],
            rootMargin:
              "-15% 0px -55% 0px"
          }
        )
      : null;

  if (navObserver) {

    sectionElements.forEach(
      ({ element }) => {
        navObserver.observe(element);
      }
    );

  }


  /* --------------------------------
     SCROLL HANDLER
  -------------------------------- */

  const handleScroll = () => {

    updateScrollProgress();
    updateHeader();
    updateSectionIndicator();

  };

  window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
  );

  handleScroll();


  /* --------------------------------
     RESIZE
  -------------------------------- */

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 900
      ) {
        setMenuState(false);
      }

    },
    { passive: true }
  );


  /* --------------------------------
     ACCESSIBILITY
  -------------------------------- */

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

    }
  );

  document.addEventListener(
    "mousedown",
    () => {

      body.classList.remove(
        "keyboard-user"
      );

    },
    { passive: true }
  );


  /* --------------------------------
     CONTACT MAILTO
  -------------------------------- */

  const emailLinks =
    $$('a[href^="mailto:"]');

  emailLinks.forEach((link) => {

    link.setAttribute(
      "rel",
      "noopener"
    );

  });


  /* --------------------------------
     INITIAL STATE
  -------------------------------- */

  document.body.classList.add(
    "page-ready"
  );

})();
