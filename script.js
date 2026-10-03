"use strict";

/* =========================================================
   NUSRAT AFSANA USHA — PREMIUM PORTFOLIO
   FULL REPLACEMENT SCRIPT.JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     HELPERS
  ======================================================== */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


  /* =======================================================
     PAGE LOADER
  ======================================================== */

  const pageLoader = $("#pageLoader");

  window.addEventListener("load", () => {

    setTimeout(() => {

      pageLoader?.classList.add("is-hidden");

    }, 450);

  });


  /* =======================================================
     CURRENT YEAR
  ======================================================== */

  const currentYear = $("#currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* =======================================================
     SCROLL PROGRESS
  ======================================================== */

  const progressBar = $("#progressBar");

  const updateProgress = () => {

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

    progressBar.style.width =
      `${Math.min(100, Math.max(0, progress))}%`;

  };


  /* =======================================================
     HEADER SCROLL STATE
  ======================================================== */

  const siteHeader = $("#siteHeader");

  const updateHeader = () => {

    if (!siteHeader) return;

    siteHeader.classList.toggle(
      "scrolled",
      window.scrollY > 25
    );

  };


  /* =======================================================
     THEME
  ======================================================== */

  const themeToggle = $("#themeToggle");

  const themeIcon = themeToggle
    ? $("[data-theme-icon]", themeToggle)
    : null;

  const themeStorageKey =
    "nusrat_usha_theme";

  const savedTheme =
    localStorage.getItem(themeStorageKey);

  const systemDark =
    window.matchMedia &&
    window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

  const initialTheme =
    savedTheme ||
    (systemDark ? "dark" : "light");

  document.documentElement.dataset.theme =
    initialTheme;


  const updateThemeIcon = () => {

    if (!themeIcon) return;

    const current =
      document.documentElement.dataset.theme;

    themeIcon.textContent =
      current === "dark"
        ? "☼"
        : "◐";

  };

  updateThemeIcon();


  themeToggle?.addEventListener(
    "click",
    () => {

      const current =
        document.documentElement.dataset.theme;

      const next =
        current === "dark"
          ? "light"
          : "dark";

      document.documentElement.dataset.theme =
        next;

      localStorage.setItem(
        themeStorageKey,
        next
      );

      updateThemeIcon();

    }
  );


  /* =======================================================
     MOBILE MENU
  ======================================================== */

  const menuToggle = $("#menuToggle");
  const mobileMenu = $("#mobileMenu");
  const mobileLinks = $$(".mobile-menu a");


  const closeMobileMenu = () => {

    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.remove("active");

    mobileMenu.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Open navigation"
    );

    document.body.classList.remove(
      "menu-open"
    );

  };


  const openMobileMenu = () => {

    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.add("active");

    mobileMenu.classList.add("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "true"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Close navigation"
    );

    document.body.classList.add(
      "menu-open"
    );

  };


  menuToggle?.addEventListener(
    "click",
    () => {

      const isOpen =
        mobileMenu?.classList.contains("open");

      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }

    }
  );


  mobileLinks.forEach(link => {

    link.addEventListener(
      "click",
      closeMobileMenu
    );

  });


  /* =======================================================
     SMOOTH ANCHOR SCROLL
  ======================================================== */

  const anchorLinks =
    $$('a[href^="#"]');


  anchorLinks.forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const href =
          link.getAttribute("href");

        if (!href || href === "#") {
          return;
        }

        const target =
          document.querySelector(href);

        if (!target) return;

        event.preventDefault();

        const headerOffset = 80;

        const targetTop =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerOffset;

        window.scrollTo({
          top: targetTop,
          behavior: "smooth"
        });

      }
    );

  });


  /* =======================================================
     REVEAL ANIMATION
  ======================================================== */

  const revealElements =
    $$(".reveal");


  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add(
              "visible"
            );

            revealObserver.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: .12,
          rootMargin: "0px 0px -50px 0px"
        }
      );


    revealElements.forEach(
      (element, index) => {

        element.style.transitionDelay =
          `${Math.min(index * 35, 280)}ms`;

        revealObserver.observe(element);

      }
    );

  } else {

    revealElements.forEach(
      element => {
        element.classList.add("visible");
      }
    );

  }


  /* =======================================================
     IMAGE REVEAL
  ======================================================== */

  const imageReveals =
    $$(".image-reveal");


  if ("IntersectionObserver" in window) {

    const imageObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add(
              "visible"
            );

            imageObserver.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: .15
        }
      );


    imageReveals.forEach(
      element => {
        imageObserver.observe(element);
      }
    );

  }


  /* =======================================================
     HERO IMAGE
     
     IMPORTANT:
     No text or overlay is added to the image.
  ======================================================== */

  const heroImage =
    $(".hero-image");


  if (heroImage) {

    heroImage.addEventListener(
      "error",
      () => {

        heroImage.style.opacity = "0";

        const frame =
          $(".hero-image-frame");

        if (frame) {

          frame.classList.add(
            "image-missing"
          );

        }

      }
    );


    heroImage.addEventListener(
      "load",
      () => {

        heroImage.classList.add(
          "image-loaded"
        );

      }
    );

  }


  /* =======================================================
     CUSTOM CURSOR
  ======================================================== */

  const cursor =
    $("#cursor");

  const cursorDot =
    $("#cursorDot");

  const finePointer =
    window.matchMedia &&
    window.matchMedia(
      "(pointer: fine)"
    ).matches;


  if (
    finePointer &&
    cursor &&
    cursorDot
  ) {

    let mouseX = 0;
    let mouseY = 0;

    let cursorX = 0;
    let cursorY = 0;

    let dotX = 0;
    let dotY = 0;


    window.addEventListener(
      "pointermove",
      event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        document.body.classList.add(
          "cursor-ready"
        );

      },
      { passive: true }
    );


    const animateCursor = () => {

      cursorX +=
        (mouseX - cursorX) * .14;

      cursorY +=
        (mouseY - cursorY) * .14;

      dotX +=
        (mouseX - dotX) * .32;

      dotY +=
        (mouseY - dotY) * .32;


      cursor.style.left =
        `${cursorX}px`;

      cursor.style.top =
        `${cursorY}px`;

      cursorDot.style.left =
        `${dotX}px`;

      cursorDot.style.top =
        `${dotY}px`;


      requestAnimationFrame(
        animateCursor
      );

    };


    animateCursor();


    const hoverTargets =
      $$(
        "a, button, .service-card, .project-card, .journal-card, .experience-item"
      );


    hoverTargets.forEach(element => {

      element.addEventListener(
        "mouseenter",
        () => {
          document.body.classList.add(
            "cursor-hover"
          );
        }
      );

      element.addEventListener(
        "mouseleave",
        () => {
          document.body.classList.remove(
            "cursor-hover"
          );
        }
      );

    });

  }


  /* =======================================================
     MAGNETIC BUTTONS
  ======================================================== */

  const magneticElements =
    $$(".magnetic");


  if (finePointer) {

    magneticElements.forEach(element => {

      element.addEventListener(
        "mousemove",
        event => {

          const rect =
            element.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left -
            rect.width / 2;

          const y =
            event.clientY -
            rect.top -
            rect.height / 2;

          const strength = .14;

          element.style.transform =
            `translate(${x * strength}px, ${y * strength}px)`;

        }
      );


      element.addEventListener(
        "mouseleave",
        () => {

          element.style.transform = "";

        }
      );

    });

  }


  /* =======================================================
     HERO PARALLAX
  ======================================================== */

  const heroVisual =
    $(".hero-visual");


  if (
    heroVisual &&
    finePointer
  ) {

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;


    window.addEventListener(
      "pointermove",
      event => {

        const x =
          (event.clientX /
            window.innerWidth -
            .5);

        const y =
          (event.clientY /
            window.innerHeight -
            .5);

        targetX = x * 8;
        targetY = y * 8;

      },
      { passive: true }
    );


    const animateHero =
      () => {

        currentX +=
          (targetX - currentX) * .06;

        currentY +=
          (targetY - currentY) * .06;


        heroVisual.style.transform =
          `translate3d(${currentX}px, ${currentY}px, 0)`;


        requestAnimationFrame(
          animateHero
        );

      };


    animateHero();

  }


  /* =======================================================
     PROJECT TILT
  ======================================================== */

  const projectVisuals =
    $$(".project-visual");


  if (finePointer) {

    projectVisuals.forEach(element => {

      element.addEventListener(
        "pointermove",
        event => {

          const rect =
            element.getBoundingClientRect();

          const x =
            (event.clientX - rect.left) /
            rect.width;

          const y =
            (event.clientY - rect.top) /
            rect.height;

          const rotateX =
            (y - .5) * -2.5;

          const rotateY =
            (x - .5) * 2.5;

          element.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        }
      );


      element.addEventListener(
        "pointerleave",
        () => {

          element.style.transform = "";

        }
      );

    });

  }


  /* =======================================================
     SECTION TRACKING
  ======================================================== */

  const sections =
    $$("main section[data-section]");

  const sectionCounter =
    $("#sectionCounter");

  const sectionLabel =
    $("#sectionLabel");


  if (
    sections.length &&
    "IntersectionObserver" in window
  ) {

    const sectionObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) {
              return;
            }

            const index =
              sections.indexOf(
                entry.target
              );

            if (index < 0) return;

            const number =
              String(index + 1)
                .padStart(2, "0");

            const total =
              String(sections.length)
                .padStart(2, "0");

            const name =
              entry.target.dataset.section ||
              "";


            if (sectionCounter) {

              sectionCounter.textContent =
                `${number} / ${total}`;

            }


            if (sectionLabel) {

              sectionLabel.textContent =
                name;

            }

          });

        },
        {
          threshold: .35
        }
      );


    sections.forEach(
      section =>
        sectionObserver.observe(section)
    );

  }


  /* =======================================================
     ACTIVE NAV
  ======================================================== */

  const navLinks =
    $$(".main-nav a");


  if (
    sections.length &&
    navLinks.length &&
    "IntersectionObserver" in window
  ) {

    const navObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) {
              return;
            }

            const id =
              entry.target.id;

            navLinks.forEach(link => {

              link.classList.toggle(
                "active",
                link.getAttribute("href") ===
                  `#${id}`
              );

            });

          });

        },
        {
          threshold: .45
        }
      );


    sections.forEach(
      section =>
        navObserver.observe(section)
    );

  }


  /* =======================================================
     ESCAPE KEY
  ======================================================== */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {

        closeMobileMenu();

      }

    }
  );


  /* =======================================================
     RESIZE
  ======================================================== */

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 1000
      ) {

        closeMobileMenu();

      }

    },
    { passive: true }
  );


  /* =======================================================
     SCROLL
  ======================================================== */

  let ticking = false;


  const handleScroll = () => {

    updateProgress();
    updateHeader();

    ticking = false;

  };


  window.addEventListener(
    "scroll",
    () => {

      if (!ticking) {

        window.requestAnimationFrame(
          handleScroll
        );

        ticking = true;

      }

    },
    { passive: true }
  );


  /* =======================================================
     INITIAL SCROLL STATE
  ======================================================== */

  updateProgress();
  updateHeader();


  /* =======================================================
     MAILTO ACCESSIBILITY
  ======================================================== */

  const mailLinks =
    $$('a[href^="mailto:"]');


  mailLinks.forEach(link => {

    link.setAttribute(
      "aria-label",
      `Email Nusrat Afsana Usha at ${link.href.replace("mailto:", "")}`
    );

  });


  /* =======================================================
     BODY READY
  ======================================================== */

  document.body.classList.add(
    "js-ready"
  );


});
