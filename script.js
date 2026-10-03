/* =========================================================
   NUSRAT AFSANA USHA — PREMIUM INTERACTION ENGINE
   FINAL SCRIPT
   ========================================================= */

(() => {
  "use strict";

  const $ = (selector, scope = document) =>
    scope.querySelector(selector);

  const $$ = (selector, scope = document) =>
    [...scope.querySelectorAll(selector)];

  const body = document.body;
  const html = document.documentElement;

  /* =======================================================
     PAGE READY
  ======================================================= */

  window.addEventListener("load", () => {
    setTimeout(() => {
      $("#pageLoader")?.classList.add("is-hidden");
    }, 350);

    body.classList.add("js-ready");
  });


  /* =======================================================
     CURRENT YEAR
  ======================================================= */

  const year = $("#currentYear");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =======================================================
     SCROLL PROGRESS
  ======================================================= */

  const progressBar = $("#progressBar");

  const updateProgress = () => {
    if (!progressBar) return;

    const scrollTop = window.scrollY;
    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    progressBar.style.width = `${progress}%`;
  };


  /* =======================================================
     HEADER SCROLL STATE
  ======================================================= */

  const siteHeader = $("#siteHeader");

  const updateHeader = () => {
    if (!siteHeader) return;

    siteHeader.classList.toggle(
      "scrolled",
      window.scrollY > 35
    );
  };


  /* =======================================================
     THEME
  ======================================================= */

  const themeToggle = $("#themeToggle");

  const themeIcon = themeToggle
    ? $("[data-theme-icon]", themeToggle)
    : null;

  const THEME_KEY = "nusrat_usha_theme";

  const savedTheme =
    localStorage.getItem(THEME_KEY);

  const preferredTheme =
    window.matchMedia &&
    window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches
      ? "light"
      : "dark";

  const setTheme = (theme) => {
    const safeTheme =
      theme === "light"
        ? "light"
        : "dark";

    html.setAttribute(
      "data-theme",
      safeTheme
    );

    localStorage.setItem(
      THEME_KEY,
      safeTheme
    );

    if (themeIcon) {
      themeIcon.textContent =
        safeTheme === "light"
          ? "☾"
          : "☼";
    }
  };

  setTheme(
    savedTheme ||
    html.getAttribute("data-theme") ||
    preferredTheme
  );

  themeToggle?.addEventListener(
    "click",
    () => {
      const current =
        html.getAttribute("data-theme") ||
        "dark";

      setTheme(
        current === "dark"
          ? "light"
          : "dark"
      );
    }
  );


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const menuToggle = $("#menuToggle");
  const mobileMenu = $("#mobileMenu");

  const openMenu = () => {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.add("is-open");
    mobileMenu.classList.add("is-open");

    body.classList.add("menu-open");

    menuToggle.setAttribute(
      "aria-expanded",
      "true"
    );
  };

  const closeMenu = () => {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.remove("is-open");
    mobileMenu.classList.remove("is-open");

    body.classList.remove("menu-open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );
  };

  menuToggle?.addEventListener(
    "click",
    () => {
      mobileMenu?.classList.contains("is-open")
        ? closeMenu()
        : openMenu();
    }
  );

  $$(".mobile-menu a").forEach((link) => {
    link.addEventListener(
      "click",
      closeMenu
    );
  });


  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    }
  );


  /* =======================================================
     SMOOTH ANCHOR SCROLL
  ======================================================= */

  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener(
      "click",
      (event) => {
        const href =
          link.getAttribute("href");

        if (
          !href ||
          href === "#" ||
          href.length < 2
        ) {
          return;
        }

        const target =
          document.querySelector(href);

        if (!target) return;

        event.preventDefault();

        const headerHeight =
          siteHeader?.offsetHeight || 0;

        const targetTop =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight -
          18;

        window.scrollTo({
          top: targetTop,
          behavior: "smooth"
        });
      }
    );
  });


  /* =======================================================
     PREMIUM CUSTOM CURSOR
  ======================================================= */

  const cursor = $("#cursor");
  const cursorDot = $("#cursorDot");

  const finePointer =
    window.matchMedia &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches;

  if (
    finePointer &&
    cursor &&
    cursorDot
  ) {
    body.classList.add(
      "cursor-enabled"
    );

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let cursorX = mouseX;
    let cursorY = mouseY;

    let dotX = mouseX;
    let dotY = mouseY;

    window.addEventListener(
      "mousemove",
      (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
      },
      { passive: true }
    );

    const renderCursor = () => {
      cursorX +=
        (mouseX - cursorX) * 0.13;

      cursorY +=
        (mouseY - cursorY) * 0.13;

      dotX +=
        (mouseX - dotX) * 0.32;

      dotY +=
        (mouseY - dotY) * 0.32;

      cursor.style.transform =
        `translate3d(
          ${cursorX}px,
          ${cursorY}px,
          0
        ) translate(-50%, -50%)`;

      cursorDot.style.transform =
        `translate3d(
          ${dotX}px,
          ${dotY}px,
          0
        ) translate(-50%, -50%)`;

      requestAnimationFrame(
        renderCursor
      );
    };

    renderCursor();

    const cursorTargets = $$(
      "a, button, [data-magnetic], .project-card, .skill, .service-item"
    );

    cursorTargets.forEach((element) => {
      element.addEventListener(
        "mouseenter",
        () => {
          body.classList.add(
            "cursor-hover"
          );
        }
      );

      element.addEventListener(
        "mouseleave",
        () => {
          body.classList.remove(
            "cursor-hover"
          );
        }
      );
    });
  }


  /* =======================================================
     MAGNETIC BUTTONS
  ======================================================= */

  const magneticItems =
    $$("[data-magnetic]");

  if (finePointer) {
    magneticItems.forEach((item) => {
      let rect;

      item.addEventListener(
        "mouseenter",
        () => {
          rect =
            item.getBoundingClientRect();
        }
      );

      item.addEventListener(
        "mousemove",
        (event) => {
          if (!rect) {
            rect =
              item.getBoundingClientRect();
          }

          const x =
            event.clientX -
            rect.left -
            rect.width / 2;

          const y =
            event.clientY -
            rect.top -
            rect.height / 2;

          item.style.transform =
            `translate3d(
              ${x * 0.18}px,
              ${y * 0.18}px,
              0
            )`;
        }
      );

      item.addEventListener(
        "mouseleave",
        () => {
          item.style.transform = "";
          rect = null;
        }
      );
    });
  }


  /* =======================================================
     HERO MOUSE PARALLAX
  ======================================================= */

  const heroVisual =
    $(".hero-visual");

  const heroImage =
    $(".hero-image");

  if (
    finePointer &&
    heroVisual &&
    heroImage
  ) {
    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    heroVisual.addEventListener(
      "mousemove",
      (event) => {
        const rect =
          heroVisual.getBoundingClientRect();

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

        targetX = x * 10;
        targetY = y * 10;
      }
    );

    heroVisual.addEventListener(
      "mouseleave",
      () => {
        targetX = 0;
        targetY = 0;
      }
    );

    const animateHero = () => {
      currentX +=
        (targetX - currentX) * 0.08;

      currentY +=
        (targetY - currentY) * 0.08;

      heroImage.style.transform =
        `translate3d(
          ${currentX}px,
          ${currentY}px,
          0
        ) scale(1.015)`;

      requestAnimationFrame(
        animateHero
      );
    };

    animateHero();
  }


  /* =======================================================
     PROJECT 3D TILT
  ======================================================= */

  const projectCards =
    $$(".project-card");

  if (finePointer) {
    projectCards.forEach((card) => {
      let rect;

      card.addEventListener(
        "mouseenter",
        () => {
          rect =
            card.getBoundingClientRect();
        }
      );

      card.addEventListener(
        "mousemove",
        (event) => {
          if (!rect) {
            rect =
              card.getBoundingClientRect();
          }

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

          const rotateY =
            x * 5;

          const rotateX =
            y * -5;

          card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-4px)`;
        }
      );

      card.addEventListener(
        "mouseleave",
        () => {
          card.style.transform = "";
          rect = null;
        }
      );
    });
  }


  /* =======================================================
     REVEAL ANIMATION
  ======================================================= */

  const revealElements =
    $$(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(
            (entry) => {
              if (!entry.isIntersecting) {
                return;
              }

              entry.target.classList.add(
                "is-visible"
              );

              observer.unobserve(
                entry.target
              );
            }
          );
        },
        {
          threshold:0.12,
          rootMargin:"0px 0px -50px 0px"
        }
      );

    revealElements.forEach(
      (element, index) => {
        element.style.transitionDelay =
          `${Math.min(index * 35, 240)}ms`;

        revealObserver.observe(
          element
        );
      }
    );
  } else {
    revealElements.forEach(
      (element) => {
        element.classList.add(
          "is-visible"
        );
      }
    );
  }


  /* =======================================================
     IMAGE REVEAL
  ======================================================= */

  const imageReveals =
    $$(".image-reveal");

  if ("IntersectionObserver" in window) {
    const imageObserver =
      new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(
            (entry) => {
              if (!entry.isIntersecting) {
                return;
              }

              entry.target.classList.add(
                "is-visible"
              );

              observer.unobserve(
                entry.target
              );
            }
          );
        },
        {
          threshold:0.2
        }
      );

    imageReveals.forEach(
      (image) => {
        imageObserver.observe(image);
      }
    );
  } else {
    imageReveals.forEach(
      (image) => {
        image.classList.add(
          "is-visible"
        );
      }
    );
  }


  /* =======================================================
     SECTION TRACKING
  ======================================================= */

  const sections =
    $$(
      "main section[id]"
    );

  const sectionCounter =
    $("#sectionCounter");

  const sectionLabel =
    $("#sectionLabel");

  const updateSection =
    (section) => {
      if (!section) return;

      const sectionsArray =
        sections;

      const index =
        sectionsArray.indexOf(
          section
        );

      if (sectionCounter) {
        sectionCounter.textContent =
          String(index + 1)
            .padStart(2, "0");
      }

      if (sectionLabel) {
        const label =
          section.dataset.label ||
          section.id;

        sectionLabel.textContent =
          label;
      }

      $$(".desktop-nav a").forEach(
        (link) => {
          const href =
            link.getAttribute("href");

          link.classList.toggle(
            "active",
            href === `#${section.id}`
          );
        }
      );
    };


  if (
    sections.length &&
    "IntersectionObserver" in window
  ) {
    const sectionObserver =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                entry.isIntersecting &&
                entry.intersectionRatio >= .35
              ) {
                updateSection(
                  entry.target
                );
              }
            }
          );
        },
        {
          threshold:[.35,.6]
        }
      );

    sections.forEach(
      (section) => {
        sectionObserver.observe(
          section
        );
      }
    );
  }


  /* =======================================================
     ACTIVE NAV — FALLBACK
  ======================================================= */

  const updateActiveNav =
    () => {
      if (!sections.length) return;

      let current =
        sections[0];

      const offset =
        window.scrollY +
        window.innerHeight *
        0.35;

      sections.forEach(
        (section) => {
          if (
            section.offsetTop <= offset
          ) {
            current = section;
          }
        }
      );

      updateSection(current);
    };


  /* =======================================================
     PORTRAIT IMAGE SAFETY
  ======================================================= */

  const portrait =
    $(".hero-image");

  if (portrait) {
    portrait.addEventListener(
      "error",
      () => {
        portrait.style.opacity = "0";

        const frame =
          portrait.closest(
            ".hero-image-frame"
          );

        if (frame) {
          frame.classList.add(
            "image-error"
          );
        }
      }
    );

    portrait.addEventListener(
      "load",
      () => {
        portrait.style.opacity = "1";
      }
    );
  }


  /* =======================================================
     IMAGE LAZY LOAD FALLBACK
  ======================================================= */

  $$("img").forEach(
    (image) => {
      if (
        !image.hasAttribute(
          "loading"
        ) &&
        image !== portrait
      ) {
        image.setAttribute(
          "loading",
          "lazy"
        );
      }
    }
  );


  /* =======================================================
     MAILTO LINKS
  ======================================================= */

  $$(
    'a[href^="mailto:"]'
  ).forEach(
    (link) => {
      link.addEventListener(
        "click",
        () => {
          link.setAttribute(
            "aria-label",
            "Send email"
          );
        }
      );
    }
  );


  /* =======================================================
     SCROLL HANDLER
  ======================================================= */

  let ticking = false;

  const onScroll =
    () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(
        () => {
          updateProgress();
          updateHeader();
          updateActiveNav();

          ticking = false;
        }
      );
    };

  window.addEventListener(
    "scroll",
    onScroll,
    { passive:true }
  );


  /* =======================================================
     RESIZE
  ======================================================= */

  window.addEventListener(
    "resize",
    () => {
      if (
        window.innerWidth > 900
      ) {
        closeMenu();
      }
    },
    { passive:true }
  );


  /* =======================================================
     INITIAL STATE
  ======================================================= */

  updateProgress();
  updateHeader();
  updateActiveNav();

})();
