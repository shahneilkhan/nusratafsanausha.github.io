/* =========================================================
   NUSrat Afsana Usha — Premium Portfolio
========================================================= */

(() => {

  "use strict";


  /* =======================================================
     HELPERS
  ======================================================= */

  const $ = (selector, scope = document) =>
    scope.querySelector(selector);

  const $$ = (selector, scope = document) =>
    [...scope.querySelectorAll(selector)];


  /* =======================================================
     PROJECT DATA
  ======================================================= */

  const projects = {

    "website-deals": {
      title: "Website Deals",
      category: "Marketplace · UX/UI Design",
      short:
        "A marketplace experience designed to make discovering and comparing digital products feel simple and intuitive.",
      role:
        "UX/UI Designer",
      tools:
        "Figma · FigJam · Adobe",
      timeline:
        "Selected project",

      image:
        "assets/project-01.jpg",

      galleryOne:
        "assets/project-01.jpg",

      galleryTwo:
        "assets/project-01-detail.jpg",

      challenge:
        "The experience needed to communicate a large amount of information without making users feel overwhelmed. The design challenge was to create a clear hierarchy between products, categories, pricing and supporting information.",

      solution:
        "I focused on strong information architecture, clear visual hierarchy and reusable interface patterns. Product cards, filters, navigation and supporting sections were designed to guide users naturally through the experience.",

      outcome:
        "The resulting direction creates a cleaner marketplace experience where users can scan information quickly, understand product differences and move through the interface with less friction."
    },


    "client-redesign": {
      title: "Client Website Redesign",
      category: "Web Design · Interface",
      short:
        "A refined website direction focused on stronger hierarchy, clearer messaging and a more polished digital presence.",
      role:
        "UX/UI Designer",
      tools:
        "Figma · Prototyping",
      timeline:
        "Client project",

      image:
        "assets/project-02.jpg",

      galleryOne:
        "assets/project-02.jpg",

      galleryTwo:
        "assets/project-02-detail.jpg",

      challenge:
        "The existing digital experience needed a stronger visual structure and a clearer way to communicate its key information. Content, navigation and page hierarchy all needed to work together more naturally.",

      solution:
        "The redesign introduced a more intentional layout system, stronger typography, clearer calls to action and a visual language designed around simplicity and confidence.",

      outcome:
        "The new direction provides a more coherent experience across the main sections while creating a stronger visual foundation for future content and product growth."
    },


    "masters-project": {
      title: "UX Design Master's Project",
      category: "UX Research · Product Design",
      short:
        "A research-led UX project exploring user needs, behaviours and opportunities through structured design thinking.",
      role:
        "UX Researcher & Designer",
      tools:
        "Figma · FigJam · Research",
      timeline:
        "Academic project",

      image:
        "assets/project-03.jpg",

      galleryOne:
        "assets/project-03.jpg",

      galleryTwo:
        "assets/project-03-detail.jpg",

      challenge:
        "The project began with an open-ended problem space that required understanding users before jumping into interface decisions. The key challenge was translating research insights into a practical product direction.",

      solution:
        "The process combined research, synthesis, user flows, wireframes and high-fidelity interface exploration. Each design decision was connected back to a specific user need or observed behaviour.",

      outcome:
        "The final concept demonstrates how research can guide interface decisions and create a product experience that is both visually refined and grounded in user needs."
    }

  };


  /* =======================================================
     PAGE LOADER
  ======================================================= */

  const finishLoading = () => {
    document.body.classList.add("page-ready");
  };

  if (document.readyState === "complete") {
    setTimeout(finishLoading, 250);
  } else {
    window.addEventListener("load", () => {
      setTimeout(finishLoading, 250);
    });
  }


  /* =======================================================
     YEAR
  ======================================================= */

  const year = $("#year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const menuBtn = $(".menu-btn");
  const navLinks = $("#navLinks");

  const closeMenu = () => {

    if (!menuBtn || !navLinks) return;

    menuBtn.classList.remove("open");
    navLinks.classList.remove("open");

    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open menu");
  };


  if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

      const open = !navLinks.classList.contains("open");

      menuBtn.classList.toggle("open", open);
      navLinks.classList.toggle("open", open);

      menuBtn.setAttribute(
        "aria-expanded",
        String(open)
      );

      menuBtn.setAttribute(
        "aria-label",
        open ? "Close menu" : "Open menu"
      );

    });


    $$(".nav-links a").forEach(link => {

      link.addEventListener("click", () => {
        closeMenu();
      });

    });


    document.addEventListener("keydown", event => {

      if (event.key === "Escape") {
        closeMenu();
      }

    });

  }


  /* =======================================================
     HEADER SCROLL
  ======================================================= */

  const header = $(".site-header");

  let lastScroll = window.scrollY;

  const handleScroll = () => {

    const current = window.scrollY;

    if (header) {

      header.classList.toggle(
        "scrolled",
        current > 30
      );

      if (
        current > 180 &&
        current > lastScroll &&
        !navLinks?.classList.contains("open")
      ) {

        header.classList.add("nav-hidden");

      } else {

        header.classList.remove("nav-hidden");

      }

    }

    lastScroll = current;

  };


  window.addEventListener(
    "scroll",
    handleScroll,
    { passive:true }
  );


  handleScroll();


  /* =======================================================
     SCROLL PROGRESS
  ======================================================= */

  const progress = $(".scroll-progress span");

  const updateProgress = () => {

    if (!progress) return;

    const scrollTop = window.scrollY;

    const height =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const percentage =
      height > 0
        ? (scrollTop / height) * 100
        : 0;

    progress.style.width =
      `${Math.min(100, Math.max(0, percentage))}%`;

  };


  window.addEventListener(
    "scroll",
    updateProgress,
    { passive:true }
  );


  updateProgress();


  /* =======================================================
     SMOOTH ANCHORS
  ======================================================= */

  $$('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior:
          window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches
            ? "auto"
            : "smooth"
      });

    });

  });


  /* =======================================================
     REVEAL
  ======================================================= */

  const revealItems = $$(".reveal");

  if (
    "IntersectionObserver" in window &&
    revealItems.length
  ) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add("visible");

            revealObserver.unobserve(
              entry.target
            );

          });

        },
        {
          threshold:.12,
          rootMargin:"0px 0px -40px 0px"
        }
      );


    revealItems.forEach(item => {
      revealObserver.observe(item);
    });

  } else {

    revealItems.forEach(item => {
      item.classList.add("visible");
    });

  }


  /* =======================================================
     ACTIVE NAV
  ======================================================= */

  const navAnchors =
    $$(".nav-links a[href^='#']");

  const sections =
    $$("main section[id]");


  if (
    "IntersectionObserver" in window &&
    sections.length
  ) {

    const sectionObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) {
              return;
            }

            const id =
              `#${entry.target.id}`;

            navAnchors.forEach(link => {

              link.classList.toggle(
                "active",
                link.getAttribute("href") === id
              );

            });

          });

        },
        {
          threshold:.25,
          rootMargin:"-25% 0px -55% 0px"
        }
      );


    sections.forEach(section => {
      sectionObserver.observe(section);
    });

  }


  /* =======================================================
     MAGNETIC BUTTONS
  ======================================================= */

  const supportsHover =
    window.matchMedia(
      "(hover:hover) and (pointer:fine)"
    ).matches;


  if (supportsHover) {

    $$(".magnetic").forEach(element => {

      element.addEventListener("mousemove", event => {

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
          `translate(${x * .13}px, ${y * .13}px)`;

      });


      element.addEventListener("mouseleave", () => {

        element.style.transform = "";

      });

    });

  }


  /* =======================================================
     HERO PARALLAX
  ======================================================= */

  const heroImage =
    $(".hero-frame img");


  if (
    supportsHover &&
    heroImage
  ) {

    const heroVisual =
      $(".hero-visual");


    heroVisual?.addEventListener(
      "mousemove",
      event => {

        const rect =
          heroVisual.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) /
          rect.width - .5;

        const y =
          (event.clientY - rect.top) /
          rect.height - .5;

        heroImage.style.transform =
          `scale(1.035) translate(${x * 7}px, ${y * 7}px)`;

      }
    );


    heroVisual?.addEventListener(
      "mouseleave",
      () => {

        heroImage.style.transform =
          "";

      }
    );

  }


  /* =======================================================
     PROJECT IMAGE INTERACTION
  ======================================================= */

  if (supportsHover) {

    $$(".project-image").forEach(card => {

      card.addEventListener(
        "mousemove",
        event => {

          const rect =
            card.getBoundingClientRect();

          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;

          const rotateY =
            ((x / rect.width) - .5) * 2;

          const rotateX =
            ((y / rect.height) - .5) * -2;

          card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform = "";

        }
      );

    });

  }


  /* =======================================================
     CURSOR GLOW
  ======================================================= */

  const cursor =
    $(".cursor-glow");


  if (
    supportsHover &&
    cursor
  ) {

    let cursorX = 0;
    let cursorY = 0;

    let targetX = 0;
    let targetY = 0;


    document.addEventListener(
      "mousemove",
      event => {

        targetX = event.clientX;
        targetY = event.clientY;

        document.body.classList.add(
          "cursor-active"
        );

      }
    );


    const animateCursor = () => {

      cursorX +=
        (targetX - cursorX) * .12;

      cursorY +=
        (targetY - cursorY) * .12;

      cursor.style.left =
        `${cursorX}px`;

      cursor.style.top =
        `${cursorY}px`;

      requestAnimationFrame(
        animateCursor
      );

    };


    animateCursor();


    document.addEventListener(
      "mouseleave",
      () => {
        document.body.classList.remove(
          "cursor-active"
        );
      }
    );

  }


  /* =======================================================
     IMAGE LOADING
  ======================================================= */

  $$("img").forEach(image => {

    if (image.complete) {

      image.classList.add("loaded");

    } else {

      image.addEventListener(
        "load",
        () => {
          image.classList.add("loaded");
        },
        { once:true }
      );

    }

  });


  /* =======================================================
     CASE STUDY MODAL
  ======================================================= */

  const modal =
    $("#caseModal");

  const caseImage =
    $("#caseImage");

  const caseTitle =
    $("#caseTitle");

  const caseCategory =
    $("#caseCategory");

  const caseShort =
    $("#caseShort");

  const caseRole =
    $("#caseRole");

  const caseTools =
    $("#caseTools");

  const caseTimeline =
    $("#caseTimeline");

  const caseChallenge =
    $("#caseChallenge");

  const caseSolution =
    $("#caseSolution");

  const caseOutcome =
    $("#caseOutcome");

  const caseGalleryOne =
    $("#caseGalleryOne");

  const caseGalleryTwo =
    $("#caseGalleryTwo");


  const closeModal = () => {

    if (!modal) return;

    modal.classList.remove("open");
    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "modal-open"
    );

  };


  const openModal = key => {

    const data = projects[key];

    if (!data || !modal) return;


    caseImage.src = data.image;
    caseImage.alt = data.title;

    caseGalleryOne.src =
      data.galleryOne;

    caseGalleryTwo.src =
      data.galleryTwo;

    caseGalleryOne.alt =
      `${data.title} project detail`;

    caseGalleryTwo.alt =
      `${data.title} interface detail`;

    caseTitle.textContent =
      data.title;

    caseCategory.textContent =
      data.category;

    caseShort.textContent =
      data.short;

    caseRole.textContent =
      data.role;

    caseTools.textContent =
      data.tools;

    caseTimeline.textContent =
      data.timeline;

    caseChallenge.textContent =
      data.challenge;

    caseSolution.textContent =
      data.solution;

    caseOutcome.textContent =
      data.outcome;


    modal.classList.add("open");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "modal-open"
    );


    const dialog =
      $(".case-dialog", modal);

    if (dialog) {
      dialog.scrollTop = 0;
    }


    const closeButton =
      $(".case-close", modal);

    setTimeout(() => {
      closeButton?.focus();
    }, 300);

  };


  $$("[data-project]").forEach(trigger => {

    trigger.addEventListener(
      "click",
      () => {

        const key =
          trigger.dataset.project;

        openModal(key);

      }
    );

  });


  $$("[data-close-modal]").forEach(element => {

    element.addEventListener(
      "click",
      closeModal
    );

  });


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        modal?.classList.contains("open")
      ) {

        closeModal();

      }

    }
  );


  /* =======================================================
     PREVENT EMPTY SOCIAL LINKS
  ======================================================= */

  $$(
    '.contact-links a[href="#"]'
  ).forEach(link => {

    link.addEventListener(
      "click",
      event => {
        event.preventDefault();
      }
    );

  });


  /* =======================================================
     RESIZE
  ======================================================= */

  let resizeTimer;

  window.addEventListener(
    "resize",
    () => {

      clearTimeout(resizeTimer);

      resizeTimer =
        setTimeout(() => {

          if (
            window.innerWidth > 800
          ) {
            closeMenu();
          }

        }, 150);

    }
  );


})();
