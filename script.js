
/* =========================================================
   NUSrat AFSANA USHA — PREMIUM PORTFOLIO INTERACTIONS
   File: script.js
   ========================================================= */

(() => {
  "use strict";

  /* -------------------------------------------------------
     1. ELEMENTS
  ------------------------------------------------------- */

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#mainNav");
  const year = document.querySelector("#year");

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  const navLinks = document.querySelectorAll(
    '.nav a[href^="#"]'
  );

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* -------------------------------------------------------
     2. COPYRIGHT YEAR
  ------------------------------------------------------- */

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* -------------------------------------------------------
     3. MOBILE NAVIGATION
  ------------------------------------------------------- */

  function closeMenu() {
    if (!navigation || !menuButton) return;

    navigation.classList.remove("open");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    document.body.classList.remove("menu-open");
  }

  if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

      const isOpen =
        navigation.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      document.body.classList.toggle(
        "menu-open",
        isOpen
      );

    });

    navigation.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", closeMenu);

    });

    document.addEventListener("click", event => {

      if (
        !navigation.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        closeMenu();
      }

    });

    document.addEventListener("keydown", event => {

      if (event.key === "Escape") {
        closeMenu();
      }

    });

    window.addEventListener("resize", () => {

      if (window.innerWidth > 760) {
        closeMenu();
      }

    });

  }


  /* -------------------------------------------------------
     4. SCROLL REVEAL ANIMATIONS
  ------------------------------------------------------- */

  const revealElements = document.querySelectorAll(`
    .section-heading,
    .about-grid,
    .project,
    .work-note,
    .timeline-item,
    .education-card,
    .skill-card,
    .language-row,
    .contact-inner
  `);

  if (!reducedMotion && "IntersectionObserver" in window) {

    revealElements.forEach(element => {
      element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("revealed");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -45px 0px"
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("revealed");
    });

  }


  /* -------------------------------------------------------
     5. ACTIVE NAVIGATION
  ------------------------------------------------------- */

  if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          const currentId = entry.target.id;

          navLinks.forEach(link => {

            const isActive =
              link.getAttribute("href") === `#${currentId}`;

            link.classList.toggle(
              "active",
              isActive
            );

            if (isActive) {
              link.setAttribute("aria-current", "location");
            } else {
              link.removeAttribute("aria-current");
            }

          });

        });

      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
      }
    );

    sections.forEach(section => {
      sectionObserver.observe(section);
    });

  }


  /* -------------------------------------------------------
     6. HERO PARALLAX
  ------------------------------------------------------- */

  const heroVisual = document.querySelector(".hero-visual");

  if (
    heroVisual &&
    !reducedMotion &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    let ticking = false;

    document.addEventListener("mousemove", event => {

      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {

        const x =
          (event.clientX / window.innerWidth - 0.5) * 12;

        const y =
          (event.clientY / window.innerHeight - 0.5) * 12;

        heroVisual.style.setProperty(
          "--mouse-x",
          `${x}px`
        );

        heroVisual.style.setProperty(
          "--mouse-y",
          `${y}px`
        );

        ticking = false;

      });

    });

  }


  /* -------------------------------------------------------
     7. PROJECT CARD INTERACTION
  ------------------------------------------------------- */

  const projectCards = document.querySelectorAll(
    ".project-cover"
  );

  if (
    !reducedMotion &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    projectCards.forEach(card => {

      card.addEventListener("mousemove", event => {

        const rect = card.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) / rect.width;

        const y =
          (event.clientY - rect.top) / rect.height;

        card.style.setProperty(
          "--pointer-x",
          `${x * 100}%`
        );

        card.style.setProperty(
          "--pointer-y",
          `${y * 100}%`
        );

      });

      card.addEventListener("mouseleave", () => {

        card.style.removeProperty("--pointer-x");
        card.style.removeProperty("--pointer-y");

      });

    });

  }


  /* -------------------------------------------------------
     8. CONTACT EMAIL COPY
  ------------------------------------------------------- */

  const emailLink = document.querySelector(".contact-email");

  if (emailLink && navigator.clipboard) {

    emailLink.addEventListener("click", async event => {

      if (!event.ctrlKey && !event.metaKey) {

        try {

          await navigator.clipboard.writeText(
            "nusrat.afsana1992@gmail.com"
          );

          emailLink.dataset.copied = "true";

          const originalText = emailLink.textContent;

          emailLink.textContent = "Email copied!";

          window.setTimeout(() => {

            emailLink.textContent = originalText;

            delete emailLink.dataset.copied;

          }, 1800);

        } catch (error) {

          // The mailto link remains available as fallback.

        }

      }

    });

  }


  /* -------------------------------------------------------
     9. BACK TO TOP
  ------------------------------------------------------- */

  const backToTop = document.querySelector(
    '.footer a[href="#top"]'
  );

  if (backToTop) {

    backToTop.addEventListener("click", event => {

      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: reducedMotion ? "auto" : "smooth"
      });

    });

  }


  /* -------------------------------------------------------
     10. INITIALIZATION
  ------------------------------------------------------- */

  document.documentElement.classList.add(
    "portfolio-ready"
  );

})();
