/* =========================================================
   NUSRAT AFSANA USHA — ULTRA PREMIUM PORTFOLIO
   V2 SCRIPT
========================================================= */

(() => {
  "use strict";


  /* =======================================================
     HELPERS
  ======================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


  /* =======================================================
     DOM READY
  ======================================================= */

  const init = () => {


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    const loader = $("#pageLoader");

    const hideLoader = () => {
      if (!loader) return;

      window.setTimeout(() => {
        loader.classList.add("is-hidden");
        document.body.classList.add("page-ready");
      }, 500);
    };

    if (document.readyState === "complete") {
      hideLoader();
    } else {
      window.addEventListener(
        "load",
        hideLoader,
        { once: true }
      );
    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const year = $("#currentYear");

    if (year) {
      year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

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


    /* =====================================================
       HEADER SCROLL STATE
    ===================================================== */

    const header = $("#siteHeader");

    const updateHeader = () => {

      if (!header) return;

      header.classList.toggle(
        "scrolled",
        window.scrollY > 40
      );
    };


    /* =====================================================
       THEME
    ===================================================== */

    const themeToggle = $("#themeToggle");

    const themeIcon = themeToggle
      ? $("[data-theme-icon]", themeToggle)
      : null;

    const storageKey =
      "nusrat_usha_theme";

    const getPreferredTheme = () => {

      const saved =
        localStorage.getItem(storageKey);

      if (
        saved === "dark" ||
        saved === "light"
      ) {
        return saved;
      }

      return window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
        ? "dark"
        : "light";
    };


    const applyTheme = (theme) => {

      document.documentElement
        .setAttribute(
          "data-theme",
          theme
        );

      if (themeIcon) {
        themeIcon.textContent =
          theme === "dark"
            ? "☼"
            : "◐";
      }

      if (themeToggle) {
        themeToggle.setAttribute(
          "aria-label",
          theme === "dark"
            ? "Switch to light theme"
            : "Switch to dark theme"
        );
      }
    };


    applyTheme(getPreferredTheme());


    if (themeToggle) {

      themeToggle.addEventListener(
        "click",
        () => {

          const current =
            document.documentElement
              .getAttribute("data-theme");

          const next =
            current === "dark"
              ? "light"
              : "dark";

          applyTheme(next);

          localStorage.setItem(
            storageKey,
            next
          );

        }
      );

    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = $("#menuToggle");
    const mobileMenu = $("#mobileMenu");

    const mobileLinks =
      $$(".mobile-menu a");

    const closeMobileMenu = () => {

      if (!menuToggle || !mobileMenu) {
        return;
      }

      menuToggle.classList.remove("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Open navigation"
      );

      mobileMenu.classList.remove(
        "is-open"
      );

      document.body.classList.remove(
        "menu-open"
      );
    };


    const openMobileMenu = () => {

      if (!menuToggle || !mobileMenu) {
        return;
      }

      menuToggle.classList.add("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "true"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Close navigation"
      );

      mobileMenu.classList.add(
        "is-open"
      );

      document.body.classList.add(
        "menu-open"
      );
    };


    if (menuToggle && mobileMenu) {

      menuToggle.addEventListener(
        "click",
        () => {

          const isOpen =
            mobileMenu.classList.contains(
              "is-open"
            );

          if (isOpen) {
            closeMobileMenu();
          } else {
            openMobileMenu();
          }

        }
      );

    }


    mobileLinks.forEach((link) => {

      link.addEventListener(
        "click",
        closeMobileMenu
      );

    });


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

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
            header
              ? header.offsetHeight
              : 0;

          const targetTop =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            15;

          window.scrollTo({
            top: targetTop,
            behavior: "smooth"
          });

          history.replaceState(
            null,
            "",
            href
          );

        }
      );

    });


    /* =====================================================
       REVEAL OBSERVER
    ===================================================== */

    const revealItems =
      $$(".reveal");

    if ("IntersectionObserver" in window) {

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
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
          }
        );


      revealItems.forEach((item, index) => {

        const parent =
          item.parentElement;

        const siblings =
          parent
            ? [...parent.children]
                .filter(
                  (child) =>
                    child.classList.contains(
                      "reveal"
                    )
                )
            : [];

        const position =
          siblings.indexOf(item);

        if (
          position >= 0 &&
          siblings.length > 1
        ) {
          item.style.transitionDelay =
            `${Math.min(position * 70, 350)}ms`;
        } else {
          item.style.transitionDelay =
            `${Math.min(index * 20, 160)}ms`;
        }

        revealObserver.observe(item);

      });

    } else {

      revealItems.forEach((item) => {
        item.classList.add("is-visible");
      });

    }


    /* =====================================================
       IMAGE ERROR / FALLBACK
    ===================================================== */

    const heroImage =
      $(".hero-image");

    if (heroImage) {

      const handleImageError = () => {

        heroImage.classList.add(
          "image-error"
        );

        heroImage.setAttribute(
          "aria-hidden",
          "true"
        );

      };


      heroImage.addEventListener(
        "error",
        handleImageError
      );


      if (
        heroImage.complete &&
        heroImage.naturalWidth === 0
      ) {
        handleImageError();
      }

    }


    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    const cursor = $("#cursor");
    const cursorDot = $("#cursorDot");

    const finePointer =
      window.matchMedia(
        "(pointer: fine)"
      ).matches;

    if (
      cursor &&
      cursorDot &&
      finePointer
    ) {

      let mouseX = 0;
      let mouseY = 0;

      let cursorX = 0;
      let cursorY = 0;

      let dotX = 0;
      let dotY = 0;


      document.body.classList.add(
        "custom-cursor-ready"
      );


      window.addEventListener(
        "mousemove",
        (event) => {

          mouseX = event.clientX;
          mouseY = event.clientY;

          cursor.style.opacity = "1";
          cursorDot.style.opacity = "1";

        },
        { passive: true }
      );


      const renderCursor = () => {

        cursorX +=
          (mouseX - cursorX) * 0.13;

        cursorY +=
          (mouseY - cursorY) * 0.13;

        dotX +=
          (mouseX - dotX) * 0.35;

        dotY +=
          (mouseY - dotY) * 0.35;


        cursor.style.transform =
          `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;

        cursorDot.style.transform =
          `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;


        requestAnimationFrame(
          renderCursor
        );
      };


      renderCursor();


      const cursorTargets =
        $$(
          "a, button, .project-visual, .service-row, .journal-card"
        );


      cursorTargets.forEach((target) => {

        target.addEventListener(
          "mouseenter",
          () => {
            cursor.classList.add(
              "cursor-hover"
            );
          }
        );


        target.addEventListener(
          "mouseleave",
          () => {
            cursor.classList.remove(
              "cursor-hover"
            );
          }
        );

      });


      document.addEventListener(
        "mouseleave",
        () => {
          cursor.style.opacity = "0";
          cursorDot.style.opacity = "0";
        }
      );


      document.addEventListener(
        "mouseenter",
        () => {
          cursor.style.opacity = "1";
          cursorDot.style.opacity = "1";
        }
      );

    }


    /* =====================================================
       MAGNETIC BUTTONS
    ===================================================== */

    const magneticElements =
      $$(".magnetic");

    if (
      finePointer &&
      !window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {

      magneticElements.forEach((element) => {

        element.addEventListener(
          "mousemove",
          (event) => {

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

            element.style.transform =
              `translate(${x * 0.12}px, ${y * 0.12}px)`;

          }
        );


        element.addEventListener(
          "mouseleave",
          () => {

            element.style.transform =
              "";

          }
        );

      });

    }


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const heroVisual =
      $(".hero-visual");

    const heroImageWrap =
      $(".hero-image-wrap");

    const floatingCards =
      $$(".floating-card");


    if (
      heroVisual &&
      finePointer &&
      !window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {

      heroVisual.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            heroVisual.getBoundingClientRect();

          const x =
            (event.clientX - rect.left) /
            rect.width -
            .5;

          const y =
            (event.clientY - rect.top) /
            rect.height -
            .5;


          if (heroImageWrap) {

            heroImageWrap.style.transform =
              `translate(${x * 9}px, ${y * 9}px)`;

          }


          floatingCards.forEach(
            (card, index) => {

              const multiplier =
                index === 0
                  ? -13
                  : 13;

              card.style.transform =
                `translate(${x * multiplier}px, ${y * multiplier}px)`;

            }
          );

        }
      );


      heroVisual.addEventListener(
        "mouseleave",
        () => {

          if (heroImageWrap) {
            heroImageWrap.style.transform =
              "";
          }

          floatingCards.forEach(
            (card) => {
              card.style.transform = "";
            }
          );

        }
      );

    }


    /* =====================================================
       PROJECT TILT
    ===================================================== */

    const projectVisuals =
      $$(".project-visual");


    if (
      finePointer &&
      !window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {

      projectVisuals.forEach(
        (visual) => {

          visual.addEventListener(
            "mousemove",
            (event) => {

              const rect =
                visual.getBoundingClientRect();

              const x =
                (event.clientX - rect.left) /
                rect.width -
                .5;

              const y =
                (event.clientY - rect.top) /
                rect.height -
                .5;


              const browser =
                $(".browser", visual);

              const dashboard =
                $(".dashboard", visual);

              const mobile =
                $(".mobile-mock", visual);


              const target =
                browser ||
                dashboard ||
                mobile;


              if (!target) return;


              const rotateX =
                y * -3;

              const rotateY =
                x * 4;


              if (
                target.classList.contains(
                  "browser"
                )
              ) {

                target.style.transform =
                  `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

              } else if (
                target.classList.contains(
                  "dashboard"
                )
              ) {

                target.style.transform =
                  `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

              } else {

                target.style.transform =
                  `rotate(${x * 2}deg) translate(${x * 3}px, ${y * 3}px)`;

              }

            }
          );


          visual.addEventListener(
            "mouseleave",
            () => {

              const browser =
                $(".browser", visual);

              const dashboard =
                $(".dashboard", visual);

              const mobile =
                $(".mobile-mock", visual);


              if (browser) {
                browser.style.transform = "";
              }

              if (dashboard) {
                dashboard.style.transform = "";
              }

              if (mobile) {
                mobile.style.transform = "";
              }

            }
          );

        }
      );

    }


    /* =====================================================
       SECTION TRACKING
    ===================================================== */

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
          (entries) => {

            entries.forEach((entry) => {

              if (!entry.isIntersecting) {
                return;
              }

              const current =
                sections.indexOf(
                  entry.target
                );

              if (current < 0) {
                return;
              }


              if (sectionCounter) {

                sectionCounter.textContent =
                  String(current + 1)
                    .padStart(2, "0");

              }


              if (sectionLabel) {

                sectionLabel.textContent =
                  entry.target.dataset.section ||
                  "";

              }

            });

          },
          {
            threshold: 0.2
          }
        );


      sections.forEach(
        (section) =>
          sectionObserver.observe(section)
      );

    }


    /* =====================================================
       ACTIVE NAV
    ===================================================== */

    const navLinks =
      $$(".main-nav a");


    if (
      navLinks.length &&
      "IntersectionObserver" in window
    ) {

      const linkMap = new Map();

      navLinks.forEach((link) => {

        const href =
          link.getAttribute("href");

        if (!href) return;

        const section =
          document.querySelector(href);

        if (section) {
          linkMap.set(section, link);
        }

      });


      const navObserver =
        new IntersectionObserver(
          (entries) => {

            entries.forEach((entry) => {

              if (!entry.isIntersecting) {
                return;
              }

              navLinks.forEach(
                (link) =>
                  link.classList.remove(
                    "active"
                  )
              );

              const activeLink =
                linkMap.get(entry.target);

              if (activeLink) {
                activeLink.classList.add(
                  "active"
                );
              }

            });

          },
          {
            threshold: 0.35
          }
        );


      linkMap.forEach(
        (_, section) =>
          navObserver.observe(section)
      );

    }


    /* =====================================================
       IMAGE REVEAL
    ===================================================== */

    const imageReveals =
      $$(".image-reveal");


    if (
      imageReveals.length &&
      "IntersectionObserver" in window
    ) {

      const imageObserver =
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
            threshold: 0.2
          }
        );


      imageReveals.forEach(
        (item) =>
          imageObserver.observe(item)
      );

    } else {

      imageReveals.forEach(
        (item) =>
          item.classList.add(
            "is-visible"
          )
      );

    }


    /* =====================================================
       KEYBOARD ACCESSIBILITY
    ===================================================== */

    document.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Escape"
        ) {
          closeMobileMenu();
        }

      }
    );


    /* =====================================================
       RESIZE
    ===================================================== */

    let resizeTimer;

    window.addEventListener(
      "resize",
      () => {

        clearTimeout(resizeTimer);

        resizeTimer =
          setTimeout(() => {

            if (
              window.innerWidth > 900
            ) {
              closeMobileMenu();
            }

          }, 150);

      },
      { passive: true }
    );


    /* =====================================================
       SCROLL HANDLER
    ===================================================== */

    let ticking = false;

    const handleScroll = () => {

      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {

        updateProgress();
        updateHeader();

        ticking = false;

      });

    };


    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );


    updateProgress();
    updateHeader();


    /* =====================================================
       MAILTO ACCESSIBILITY
    ===================================================== */

    $$(
      'a[href^="mailto:"]'
    ).forEach((link) => {

      link.setAttribute(
        "rel",
        "noopener"
      );

    });


    /* =====================================================
       PAGE READY
    ===================================================== */

    document.documentElement.classList.add(
      "js-ready"
    );

  };


  /* =======================================================
     START
  ======================================================= */

  if (
    document.readyState === "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init,
      { once: true }
    );

  } else {

    init();

  }

})();
