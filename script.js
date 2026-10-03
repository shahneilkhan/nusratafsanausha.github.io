document.addEventListener("DOMContentLoaded", () => {

"use strict";

/* =====================================================
ELEMENTS
===================================================== */

const body = document.body;

const loader = document.getElementById("loader");
const header = document.getElementById("siteHeader");
const progress = document.getElementById("scrollProgress");

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

const modal = document.getElementById("caseModal");
const modalDialog = document.querySelector(".case-dialog");
const modalClose = document.getElementById("caseClose");

const caseImage = document.getElementById("caseImage");
const caseCategory = document.getElementById("caseCategory");
const caseTitle = document.getElementById("caseTitle");
const caseRole = document.getElementById("caseRole");
const caseTools = document.getElementById("caseTools");
const caseStatus = document.getElementById("caseStatus");
const caseAbout = document.getElementById("caseAbout");

const caseChallenge = document.getElementById("caseChallenge");
const caseApproach = document.getElementById("caseApproach");
const caseOutcome = document.getElementById("caseOutcome");

const caseCurrent = document.getElementById("caseCurrent");

const casePrev = document.getElementById("casePrev");
const caseNext = document.getElementById("caseNext");

const projectCards = [
...document.querySelectorAll("[data-project]")
];

/* =====================================================
YEAR
===================================================== */

const currentYear = new Date().getFullYear();

document.querySelectorAll(".year").forEach(el => {
el.textContent = currentYear;
});

/* =====================================================
LOADER
===================================================== */

const hideLoader = () => {

if (!loader) return;

loader.classList.add("loaded");

setTimeout(() => {
  loader.remove();
}, 1000);

};

window.addEventListener("load", () => {

setTimeout(hideLoader, 500);

});

/* =====================================================
MOBILE MENU
===================================================== */

function openMenu(){

if (!menuToggle || !mobileMenu) return;

menuToggle.classList.add("active");
mobileMenu.classList.add("open");

menuToggle.setAttribute("aria-expanded", "true");

body.classList.add("modal-open");

}

function closeMenu(){

if (!menuToggle || !mobileMenu) return;

menuToggle.classList.remove("active");
mobileMenu.classList.remove("open");

menuToggle.setAttribute("aria-expanded", "false");

body.classList.remove("modal-open");

}

if (menuToggle){

menuToggle.addEventListener("click", () => {

  const isOpen = mobileMenu.classList.contains("open");

  if (isOpen){
    closeMenu();
  }else{
    openMenu();
  }

});

}

document.querySelectorAll(".mobile-menu a").forEach(link => {

link.addEventListener("click", () => {
  closeMenu();
});

});

/* =====================================================
HEADER HIDE / SHOW
===================================================== */

let lastScroll = window.scrollY;
let tickingHeader = false;

function updateHeader(){

const currentScroll = window.scrollY;

if (!header) return;

if (currentScroll > 120){

  if (currentScroll > lastScroll + 8){
    header.classList.add("header-hidden");
  }

  if (currentScroll < lastScroll - 8){
    header.classList.remove("header-hidden");
  }

}else{

  header.classList.remove("header-hidden");

}

lastScroll = currentScroll;
tickingHeader = false;

}

window.addEventListener("scroll", () => {

if (!tickingHeader){

  requestAnimationFrame(updateHeader);

  tickingHeader = true;

}

}, {passive});

/* =====================================================
SCROLL PROGRESS
===================================================== */

function updateProgress(){

if (!progress) return;

const scrollTop = window.scrollY;

const height =
  document.documentElement.scrollHeight -
  window.innerHeight;

const percentage =
  height > 0
    ? (scrollTop / height) * 100
    : 0;

progress.style.width = `${percentage}%`;

}

window.addEventListener("scroll", updateProgress, {
passive
});

updateProgress();

/* =====================================================
SMOOTH ANCHORS
===================================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

link.addEventListener("click", event => {

  const targetId = link.getAttribute("href");

  if (
    !targetId ||
    targetId === "#" ||
    targetId === "#!"
  ){
    return;
  }

  const target = document.querySelector(targetId);

  if (!target) return;

  event.preventDefault();

  target.scrollIntoView({
    behavior:"smooth",
    block:"start"
  });

});

});

/* =====================================================
REVEAL ANIMATION
===================================================== */

const revealElements =
document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window){

const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting){

          entry.target.classList.add("is-visible");

          revealObserver.unobserve(entry.target);

        }

      });

    },
    {
      threshold:.12,
      rootMargin:"0px 0px -50px 0px"
    }
  );

revealElements.forEach(element => {
  revealObserver.observe(element);
});

}else{

revealElements.forEach(element => {
  element.classList.add("is-visible");
});

}

/* =====================================================
HERO PARALLAX
===================================================== */

const heroVisual =
document.querySelector(".hero-visual");

const prefersReducedMotion =
window.matchMedia &&
window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (
heroVisual &&
!prefersReducedMotion &&
window.innerWidth > 900
){

let raf = null;

window.addEventListener("scroll", () => {

  if (raf) return;

  raf = requestAnimationFrame(() => {

    const scroll = window.scrollY;

    if (scroll < window.innerHeight * 1.2){

      const movement =
        Math.min(scroll * .06, 35);

      heroVisual.style.transform =
        `translateY(${movement}px)`;

    }

    raf = null;

  });

}, {passive:true});

}

/* =====================================================
PROJECT DATA
===================================================== */

const projectsData = {

"website-deals": {

  title:"Website Deals",

  category:"Marketplace / UX/UI",

  image:"project-01.jpg",

  role:"UI Designer & Partner",

  tools:"Figma",

  status:"Client / Marketplace",

  about:
    "A marketplace and website-design workflow focused on presenting services clearly, helping clients understand available options, and creating a smoother path from requirement to final website.",

  challenge:
    "Website services can quickly become difficult to understand when users are presented with too many options, technical terms and competing calls to action. The challenge was to create a clearer visual hierarchy that helped people understand what was available and what to do next.",

  approach:
    "The experience was structured around clear content grouping, stronger hierarchy and simple navigation. Figma was used to explore layouts, responsive behaviour and visual directions before development.",

  outcome:
    "The resulting direction creates a more approachable marketplace experience where services are easier to scan, compare and understand while maintaining a polished digital brand presence."

},


"client-website": {

  title:"Client Website Design",

  category:"Web Design / UI",

  image:"project-02.jpg",

  role:"UX/UI Designer",

  tools:"Figma",

  status:"Client Project",

  about:
    "A client-focused website design process covering information structure, visual hierarchy, responsive layouts and interactive Figma prototypes before development.",

  challenge:
    "The primary challenge was translating a business's goals and content into a digital experience that felt professional without overwhelming visitors. The interface needed to communicate value quickly while remaining flexible across devices.",

  approach:
    "The design process began with information hierarchy and page structure before moving into wireframes and high-fidelity visual design. Responsive layouts and interaction states were considered throughout the process.",

  outcome:
    "The final direction delivers a cleaner and more intentional website experience with stronger hierarchy, improved readability and a visual system that can scale across future pages."

},


"masters": {

  title:"MA UX Design Projects",

  category:"UX Research / Academic",

  image:"project-03.jpg",

  role:"UX Design Student",

  tools:"Figma / Research",

  status:"Academic Project",

  about:
    "UX design studies exploring research, information architecture, wireframing, prototyping and usability testing as part of postgraduate UX Design education.",

  challenge:
    "Academic UX projects require moving beyond visual design and understanding the reasoning behind each interaction. The challenge was to investigate user needs, translate findings into design decisions and validate the resulting experience.",

  approach:
    "The work follows a research-led process involving user understanding, problem definition, information architecture, wireframes, interactive prototypes and iterative refinement.",

  outcome:
    "The projects provide a practical foundation in human-centered design and demonstrate how research and testing can influence stronger interface and interaction decisions."

}

};

const projectIds = Object.keys(projectsData);

let currentProjectIndex = 0;

/* =====================================================
MODAL HELPERS
===================================================== */

function getProjectIdFromCard(card){

return card.getAttribute("data-project");

}

function findProjectIndex(projectId){

return projectIds.indexOf(projectId);

}

function renderProject(projectId){

const data = projectsData[projectId];

if (!data) return;

currentProjectIndex =
  findProjectIndex(projectId);


if (caseImage){

  caseImage.style.opacity = "0";

  caseImage.src = data.image;
  caseImage.alt = `${data.title} — case study`;

  caseImage.onload = () => {

    caseImage.style.transition =
      "opacity .5s ease";

    caseImage.style.opacity = "1";

  };

  caseImage.onerror = () => {

    caseImage.removeAttribute("src");

    caseImage.alt =
      "Project preview unavailable";

    caseImage.style.opacity = "1";

  };

}


if (caseCategory){
  caseCategory.textContent =
    data.category;
}

if (caseTitle){
  caseTitle.textContent =
    data.title;
}

if (caseRole){
  caseRole.textContent =
    data.role;
}

if (caseTools){
  caseTools.textContent =
    data.tools;
}

if (caseStatus){
  caseStatus.textContent =
    data.status;
}

if (caseAbout){
  caseAbout.textContent =
    data.about;
}

if (caseChallenge){
  caseChallenge.textContent =
    data.challenge;
}

if (caseApproach){
  caseApproach.textContent =
    data.approach;
}

if (caseOutcome){
  caseOutcome.textContent =
    data.outcome;
}

if (caseCurrent){

  caseCurrent.textContent =
    String(currentProjectIndex + 1)
      .padStart(2,"0");

}

if (modalDialog){

  modalDialog.scrollTo({
    top:0,
    behavior:"instant"
  });

}

}

function openCaseStudy(projectId){

if (!modal) return;

renderProject(projectId);

modal.classList.add("open");
modal.setAttribute("aria-hidden","false");

body.classList.add("modal-open");

if (modalClose){

  setTimeout(() => {
    modalClose.focus();
  }, 150);

}

}

function closeCaseStudy(){

if (!modal) return;

modal.classList.remove("open");
modal.setAttribute("aria-hidden","true");

body.classList.remove("modal-open");

}

/* =====================================================
PROJECT CLICK
===================================================== */

projectCards.forEach(card => {

const button =
  card.querySelector(".project-open");

if (!button) return;

button.addEventListener("click", () => {

  const projectId =
    getProjectIdFromCard(card);

  if (projectId){

    openCaseStudy(projectId);

  }

});

});

/* =====================================================
CLOSE MODAL
===================================================== */

if (modalClose){

modalClose.addEventListener(
  "click",
  closeCaseStudy
);

}

document.querySelectorAll("[data-close-case]")
.forEach(element => {

  element.addEventListener(
    "click",
    closeCaseStudy
  );

});

/* =====================================================
PREVIOUS PROJECT
===================================================== */

if (casePrev){

casePrev.addEventListener("click", () => {

  currentProjectIndex--;

  if (currentProjectIndex < 0){

    currentProjectIndex =
      projectIds.length - 1;

  }

  renderProject(
    projectIds[currentProjectIndex]
  );

});

}

/* =====================================================
NEXT PROJECT
===================================================== */

if (caseNext){

caseNext.addEventListener("click", () => {

  currentProjectIndex++;

  if (
    currentProjectIndex >=
    projectIds.length
  ){

    currentProjectIndex = 0;

  }

  renderProject(
    projectIds[currentProjectIndex]
  );

});

}

/* =====================================================
KEYBOARD
===================================================== */

document.addEventListener("keydown", event => {

if (event.key === "Escape"){

  if (modal &&
      modal.classList.contains("open")){

    closeCaseStudy();

  }else if (
    mobileMenu &&
    mobileMenu.classList.contains("open")
  ){

    closeMenu();

  }

}


if (
  modal &&
  modal.classList.contains("open")
){

  if (event.key === "ArrowRight"){

    caseNext?.click();

  }

  if (event.key === "ArrowLeft"){

    casePrev?.click();

  }

}

});

/* =====================================================
PROJECT TILT
===================================================== */

if (
!prefersReducedMotion &&
window.innerWidth > 900
){

document
  .querySelectorAll(".project-image")
  .forEach(image => {

    image.addEventListener(
      "mousemove",
      event => {

        const rect =
          image.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) /
          rect.width;

        const y =
          (event.clientY - rect.top) /
          rect.height;

        const rotateX =
          (0.5 - y) * 3;

        const rotateY =
          (x - 0.5) * 3;

        image.style.transform =
          `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      }
    );


    image.addEventListener(
      "mouseleave",
      () => {

        image.style.transform =
          "perspective(900px) rotateX(0deg) rotateY(0deg)";

      }
    );

  });

}

/* =====================================================
CUSTOM CURSOR
===================================================== */

const cursorDot =
document.getElementById("cursorDot");

const cursorRing =
document.getElementById("cursorRing");

const finePointer =
window.matchMedia &&
window.matchMedia("(pointer)").matches;

if (
finePointer &&
cursorDot &&
cursorRing &&
!prefersReducedMotion
){

let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;


body.classList.add("cursor-active");


window.addEventListener(
  "mousemove",
  event => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    cursorDot.style.left =
      `${mouseX}px`;

    cursorDot.style.top =
      `${mouseY}px`;

  },
  {passive:true}
);


function animateCursor(){

  ringX +=
    (mouseX - ringX) * .16;

  ringY +=
    (mouseY - ringY) * .16;

  cursorRing.style.left =
    `${ringX}px`;

  cursorRing.style.top =
    `${ringY}px`;

  requestAnimationFrame(
    animateCursor
  );

}

animateCursor();


document
  .querySelectorAll("a,button,.project-card")
  .forEach(element => {

    element.addEventListener(
      "mouseenter",
      () => {
        body.classList.add("cursor-hover");
      }
    );

    element.addEventListener(
      "mouseleave",
      () => {
        body.classList.remove("cursor-hover");
      }
    );

  });

}

/* =====================================================
IMAGE FALLBACK
===================================================== */

document
.querySelectorAll("img")
.forEach(img => {

  img.addEventListener(
    "error",
    () => {

      img.classList.add("image-error");

    }
  );

});

/* =====================================================
INITIAL STATE
===================================================== */

requestAnimationFrame(() => {

document
  .querySelectorAll(".hero .reveal")
  .forEach(element => {

    element.classList.add("is-visible");

  });

});

});
