/* =========================================================
NUSRAT AFSANA USHA — PREMIUM PORTFOLIO
Main Interaction Script
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

/* ---------------------------------------------------------
ELEMENTS
--------------------------------------------------------- */

const nav = document.getElementById("site-nav");
const menuBtn = document.querySelector(".menu-btn");
const links = document.getElementById("links");
const year = document.getElementById("year");

/* ---------------------------------------------------------
CURRENT YEAR
--------------------------------------------------------- */

if (year) {
year.textContent = new Date().getFullYear();
}

/* ---------------------------------------------------------
MOBILE MENU
--------------------------------------------------------- */

if (menuBtn && links) {

menuBtn.addEventListener("click", () => {

  const open = links.classList.toggle("open");

  menuBtn.setAttribute(
    "aria-expanded",
    open ? "true" : "false"
  );

  menuBtn.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation"
  );

  document.body.classList.toggle("menu-open", open);

});


links.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {

    links.classList.remove("open");

    menuBtn.setAttribute(
      "aria-expanded",
      "false"
    );

    menuBtn.setAttribute(
      "aria-label",
      "Open navigation"
    );

    document.body.classList.remove("menu-open");

  });

});


document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    links.classList.remove("open");

    menuBtn.setAttribute(
      "aria-expanded",
      "false"
    );

    menuBtn.setAttribute(
      "aria-label",
      "Open navigation"
    );

    document.body.classList.remove("menu-open");

  }

});

}

/* ---------------------------------------------------------
NAVBAR SCROLL EFFECT
--------------------------------------------------------- */

let lastScroll = 0;

function updateNavbar() {

const currentScroll = window.scrollY;

if (nav) {

  if (currentScroll > 40) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }

  if (
    currentScroll > lastScroll &&
    currentScroll > 250
  ) {
    nav.classList.add("nav-hidden");
  } else {
    nav.classList.remove("nav-hidden");
  }

}

lastScroll = currentScroll;

}

window.addEventListener(
"scroll",
updateNavbar,
{ passive: true }
);

/* ---------------------------------------------------------
SMOOTH INTERNAL NAVIGATION
--------------------------------------------------------- */

document.querySelectorAll('a[href^="#"]').forEach(link => {

link.addEventListener("click", event => {

  const targetId = link.getAttribute("href");

  if (
    !targetId ||
    targetId === "#" ||
    targetId.length < 2
  ) {
    return;
  }

  const target = document.querySelector(targetId);

  if (!target) return;

  event.preventDefault();

  const navHeight = nav
    ? nav.offsetHeight
    : 0;

  const targetPosition =
    target.getBoundingClientRect().top +
    window.scrollY -
    navHeight -
    15;

  window.scrollTo({
    top: targetPosition,
    behavior: "smooth"
  });

});

});

/* ---------------------------------------------------------
SCROLL REVEAL
--------------------------------------------------------- */

const revealElements = document.querySelectorAll(
".section, " +
".project, " +
".expertise-card, " +
".timeline-item, " +
".education-content, " +
".contact-inner"
);

revealElements.forEach((element, index) => {

element.classList.add("reveal");

if (
  element.classList.contains("project") ||
  element.classList.contains("expertise-card")
) {

  element.style.setProperty(
    "--reveal-delay",
    `${(index % 4) * 80}ms`
  );

}

});

if ("IntersectionObserver" in window) {

const revealObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -60px 0px"
  }
);


revealElements.forEach(element => {
  revealObserver.observe(element);
});

} else {

revealElements.forEach(element => {
  element.classList.add("visible");
});

}

/* ---------------------------------------------------------
ACTIVE NAVIGATION
--------------------------------------------------------- */

const sections = document.querySelectorAll(
"main section[id]"
);

const navLinks = document.querySelectorAll(
'.links a[href^="#"]'
);

if ("IntersectionObserver" in window) {

const activeObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const id = entry.target.getAttribute("id");

      navLinks.forEach(link => {

        link.classList.remove("active");

        if (
          link.getAttribute("href") === `#${id}`
        ) {
          link.classList.add("active");
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
  activeObserver.observe(section);
});

}

/* ---------------------------------------------------------
HERO IMAGE PARALLAX
--------------------------------------------------------- */

const heroImage = document.querySelector(
".portrait-frame img"
);

if (heroImage && window.matchMedia("(min-width: 900px)").matches) {

window.addEventListener(
  "scroll",
  () => {

    const scroll = window.scrollY;

    if (scroll < window.innerHeight * 1.2) {

      const movement = scroll * 0.035;

      heroImage.style.transform =
        `translateY(${movement}px) scale(1.02)`;

    }

  },
  { passive: true }
);

}

/* ---------------------------------------------------------
PROJECT IMAGE HOVER
--------------------------------------------------------- */

document.querySelectorAll(".project-image").forEach(project => {

project.addEventListener("mousemove", event => {

  if (window.innerWidth < 900) return;

  const rect =
    project.getBoundingClientRect();

  const x =
    (event.clientX - rect.left) /
    rect.width;

  const y =
    (event.clientY - rect.top) /
    rect.height;

  const moveX = (x - 0.5) * 8;
  const moveY = (y - 0.5) * 8;

  project.style.setProperty(
    "--mouse-x",
    `${moveX}px`
  );

  project.style.setProperty(
    "--mouse-y",
    `${moveY}px`
  );

});


project.addEventListener("mouseleave", () => {

  project.style.setProperty(
    "--mouse-x",
    "0px"
  );

  project.style.setProperty(
    "--mouse-y",
    "0px"
  );

});

});

/* ---------------------------------------------------------
BUTTON MAGNETIC MICRO INTERACTION
--------------------------------------------------------- */

const magneticElements = document.querySelectorAll(
".primary-btn, .nav-contact, .contact-email"
);

magneticElements.forEach(element => {

element.addEventListener("mousemove", event => {

  if (window.innerWidth < 900) return;

  const rect =
    element.getBoundingClientRect();

  const x =
    event.clientX - rect.left - rect.width / 2;

  const y =
    event.clientY - rect.top - rect.height / 2;

  element.style.transform =
    `translate(${x * 0.06}px, ${y * 0.06}px)`;

});


element.addEventListener("mouseleave", () => {

  element.style.transform =
    "translate(0, 0)";

});

});

/* ---------------------------------------------------------
IMAGE LOAD REVEAL
--------------------------------------------------------- */

const images = document.querySelectorAll("img");

images.forEach(image => {

if (image.complete) {

  image.classList.add("loaded");

} else {

  image.addEventListener(
    "load",
    () => image.classList.add("loaded"),
    { once: true }
  );

}

});

/* ---------------------------------------------------------
REDUCED MOTION ACCESSIBILITY
--------------------------------------------------------- */

const reducedMotion =
window.matchMedia(
"(prefers-reduced-motion: reduce)"
);

if (reducedMotion.matches) {

document.documentElement.classList.add(
  "reduced-motion"
);

}

/* ---------------------------------------------------------
HERO INTRO
--------------------------------------------------------- */

const heroIntro =
document.querySelector(".hero-intro");

if (heroIntro) {

requestAnimationFrame(() => {

  heroIntro.classList.add("loaded");

});

}

/* ---------------------------------------------------------
PAGE LOADED
--------------------------------------------------------- */

document.body.classList.add("page-ready");

});
