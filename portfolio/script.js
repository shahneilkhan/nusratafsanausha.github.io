/* =========================================================
NUSRAT AFSANA USHA
ULTRA PREMIUM PORTFOLIO — FINAL INTERACTION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

"use strict";

/* =======================================================
ELEMENTS
======================================================= */

const body = document.body;
const nav = document.getElementById("site-nav");
const menuBtn = document.querySelector(".menu-btn");
const links = document.getElementById("links");
const year = document.getElementById("year");

/* =======================================================
YEAR
======================================================= */

if (year) {
year.textContent = new Date().getFullYear();
}

/* =======================================================
PAGE LOADER
======================================================= */

const loader = document.createElement("div");

loader.className = "page-loader";

loader.innerHTML =     <div class="loader-inner">
      <span class="loader-mark">N</span>
      <div class="loader-line">
        <span></span>
      </div>
      <small>UX / UI DESIGNER</small>
    </div>
 ;

body.prepend(loader);

window.addEventListener("load", () => {

setTimeout(() => {
  loader.classList.add("loaded");
  body.classList.add("page-ready");
}, 250);

});

/* =======================================================
MOBILE MENU
======================================================= */

if (menuBtn && links) {

const closeMenu = () => {

  links.classList.remove("open");

  menuBtn.setAttribute(
    "aria-expanded",
    "false"
  );

  menuBtn.setAttribute(
    "aria-label",
    "Open navigation"
  );

  body.classList.remove("menu-open");

};


menuBtn.addEventListener("click", () => {

  const open =
    links.classList.toggle("open");

  menuBtn.setAttribute(
    "aria-expanded",
    String(open)
  );

  menuBtn.setAttribute(
    "aria-label",
    open
      ? "Close navigation"
      : "Open navigation"
  );

  body.classList.toggle(
    "menu-open",
    open
  );

});


links.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", closeMenu);

});


document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    closeMenu();
  }

});

}

/* =======================================================
NAVBAR SCROLL
======================================================= */

let lastScroll = 0;
let ticking = false;

const updateNav = () => {

const currentScroll =
  window.scrollY;


if (nav) {

  nav.classList.toggle(
    "scrolled",
    currentScroll > 40
  );


  if (
    currentScroll > lastScroll &&
    currentScroll > 300
  ) {

    nav.classList.add("nav-hidden");

  } else {

    nav.classList.remove("nav-hidden");

  }

}


lastScroll = currentScroll;
ticking = false;

};

window.addEventListener(
"scroll",
() => {

  if (!ticking) {

    window.requestAnimationFrame(
      updateNav
    );

    ticking = true;

  }

},
{ passive: true }

);

/* =======================================================
SCROLL PROGRESS BAR
======================================================= */

const progress =
document.createElement("div");

progress.className =
"scroll-progress";

document.body.appendChild(progress);

const updateProgress = () => {

const scrollTop =
  window.scrollY;

const documentHeight =
  document.documentElement.scrollHeight -
  window.innerHeight;

const percentage =
  documentHeight > 0
    ? (scrollTop / documentHeight) * 100
    : 0;

progress.style.width =
  `${percentage}%`;

};

window.addEventListener(
"scroll",
updateProgress,
{ passive: true }
);

updateProgress();

/* =======================================================
SMOOTH ANCHOR NAVIGATION
======================================================= */

document.querySelectorAll(
'a[href^="#"]'
).forEach(anchor => {

anchor.addEventListener(
  "click",
  event => {

    const targetId =
      anchor.getAttribute("href");


    if (
      !targetId ||
      targetId === "#"
    ) {
      return;
    }


    const target =
      document.querySelector(
        targetId
      );


    if (!target) {
      return;
    }


    event.preventDefault();


    const offset =
      nav
        ? nav.offsetHeight + 12
        : 12;


    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      offset;


    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });

  }
);

});

/* =======================================================
SCROLL REVEAL
======================================================= */

const revealSelector = [
".section",
".project",
".expertise-card",
".timeline-item",
".education-content",
".contact-inner",
".footer"
].join(",");

const revealElements =
document.querySelectorAll(
revealSelector
);

revealElements.forEach(
(element, index) => {

  element.classList.add("reveal");

  const delay =
    (index % 5) * 80;

  element.style.setProperty(
    "--reveal-delay",
    `${delay}ms`
  );

}

);

if (
"IntersectionObserver"
in window
) {

const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (
          entry.isIntersecting
        ) {

          entry.target.classList.add(
            "visible"
          );

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold:.12,
      rootMargin:
        "0px 0px -50px 0px"
    }
  );


revealElements.forEach(
  element =>
    revealObserver.observe(element)
);

} else {

revealElements.forEach(
  element =>
    element.classList.add("visible")
);

}

/* =======================================================
ACTIVE NAVIGATION
======================================================= */

const sections =
document.querySelectorAll(
"main section[id]"
);

const navLinks =
document.querySelectorAll(
'.links a[href^="#"]'
);

if (
"IntersectionObserver"
in window
) {

const activeObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (
          !entry.isIntersecting
        ) {
          return;
        }


        const id =
          entry.target.id;


        navLinks.forEach(link => {

          const matches =
            link.getAttribute(
              "href"
            ) === `#${id}`;


          link.classList.toggle(
            "active",
            matches
          );

        });

      });

    },
    {
      rootMargin:
        "-35% 0px -55% 0px"
    }
  );


sections.forEach(section => {

  activeObserver.observe(
    section
  );

});

}

/* =======================================================
HERO IMAGE PARALLAX
======================================================= */

const heroImage =
document.querySelector(
".portrait-frame img"
);

const desktop =
window.matchMedia(
"(min-width: 901px)"
);

if (
heroImage &&
desktop.matches
) {

window.addEventListener(
  "scroll",
  () => {

    const scroll =
      window.scrollY;


    if (
      scroll <
      window.innerHeight * 1.15
    ) {

      const movement =
        scroll * .025;


      heroImage.style.transform =
        `translateY(${movement}px) scale(1.025)`;

    }

  },
  { passive:true }
);

}

/* =======================================================
PROJECT TILT EFFECT
======================================================= */

document.querySelectorAll(
".project-image"
).forEach(project => {

project.addEventListener(
  "mousemove",
  event => {

    if (
      window.innerWidth < 900
    ) {
      return;
    }


    const rect =
      project.getBoundingClientRect();


    const x =
      event.clientX -
      rect.left;


    const y =
      event.clientY -
      rect.top;


    const rotateX =
      ((y / rect.height) - .5) * -3;


    const rotateY =
      ((x / rect.width) - .5) * 3;


    project.style.transform =
      `perspective(1000px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       translateY(-5px)`;

  }
);


project.addEventListener(
  "mouseleave",
  () => {

    project.style.transform =
      "";

  }
);

});

/* =======================================================
MAGNETIC BUTTONS
======================================================= */

document.querySelectorAll(
".primary-btn, .nav-contact, .contact-email"
).forEach(element => {

element.addEventListener(
  "mousemove",
  event => {

    if (
      window.innerWidth < 900
    ) {
      return;
    }


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
      `translate(
        ${x * .055}px,
        ${y * .055}px
      )`;

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

/* =======================================================
IMAGE LOAD
======================================================= */

document.querySelectorAll("img")
.forEach(image => {

  if (image.complete) {

    image.classList.add(
      "loaded"
    );

  } else {

    image.addEventListener(
      "load",
      () => {
        image.classList.add(
          "loaded"
        );
      },
      { once:true }
    );

  }

});

/* =======================================================
CURSOR GLOW
======================================================= */

const cursorGlow =
document.createElement("div");

cursorGlow.className =
"cursor-glow";

document.body.appendChild(
cursorGlow
);

if (
window.matchMedia(
"(pointer)"
).matches
) {

let mouseX = 0;
let mouseY = 0;

let glowX = 0;
let glowY = 0;


window.addEventListener(
  "mousemove",
  event => {

    mouseX =
      event.clientX;

    mouseY =
      event.clientY;

  },
  { passive:true }
);


const animateGlow = () => {

  glowX +=
    (mouseX - glowX) * .12;

  glowY +=
    (mouseY - glowY) * .12;


  cursorGlow.style.transform =
    `translate3d(
      ${glowX}px,
      ${glowY}px,
      0
    )`;


  requestAnimationFrame(
    animateGlow
  );

};


animateGlow();

} else {

cursorGlow.remove();

}

/* =======================================================
HOVER CURSOR STATE
======================================================= */

const interactiveElements =
document.querySelectorAll(
"a, button, .project-image"
);

interactiveElements.forEach(
element => {

  element.addEventListener(
    "mouseenter",
    () => {
      body.classList.add(
        "cursor-active"
      );
    }
  );


  element.addEventListener(
    "mouseleave",
    () => {
      body.classList.remove(
        "cursor-active"
      );
    }
  );

}

);

/* =======================================================
PROJECT MODAL SYSTEM

 Future-ready:
 Add data-project to any
 .project element and the
 modal will automatically work.

======================================================= */

const projectData = {

"website-deals": {
  number:"01",
  category:"Marketplace",
  title:"Website Deals",
  description:
    "A marketplace and website delivery experience focused on clear communication, practical interfaces and client-friendly project flow."
},

"client-redesign": {
  number:"02",
  category:"Web Design",
  title:"Client Website Redesign",
  description:
    "A structured website redesign developed from client requirements, layout exploration and interactive Figma prototyping."
},

"masters-project": {
  number:"03",
  category:"UX Research",
  title:"UX Design Master's Project",
  description:
    "A UX project involving research, wireframing and usability testing as part of postgraduate design study."
}

};

const modal =
document.createElement("div");

modal.className =
"project-modal";

modal.innerHTML = `
<div class="modal-backdrop"></div>

<div
  class="modal-window"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title">

  <button
    class="modal-close"
    aria-label="Close project">
    ×
  </button>

  <div class="modal-number"></div>

  <div class="modal-category"></div>

  <h2 id="modal-title"></h2>

  <p class="modal-description"></p>

  <div class="modal-footer">
    <span>Case study</span>
    <span>Coming soon</span>
  </div>

</div>

`;

document.body.appendChild(
modal
);

const modalWindow =
modal.querySelector(
".modal-window"
);

const modalClose =
modal.querySelector(
".modal-close"
);

const modalBackdrop =
modal.querySelector(
".modal-backdrop"
);

const closeModal = () => {

modal.classList.remove(
  "open"
);

body.classList.remove(
  "modal-open"
);

};

const openModal = project => {

const data =
  projectData[project];


if (!data) {
  return;
}


modal.querySelector(
  ".modal-number"
).textContent =
  data.number;


modal.querySelector(
  ".modal-category"
).textContent =
  data.category;


modal.querySelector(
  "#modal-title"
).textContent =
  data.title;


modal.querySelector(
  ".modal-description"
).textContent =
  data.description;


modal.classList.add(
  "open"
);

body.classList.add(
  "modal-open"
);

};

document.querySelectorAll(
"[data-project]"
).forEach(project => {

project.addEventListener(
  "click",
  event => {

    event.preventDefault();

    openModal(
      project.dataset.project
    );

  }
);

});

modalClose.addEventListener(
"click",
closeModal
);

modalBackdrop.addEventListener(
"click",
closeModal
);

document.addEventListener(
"keydown",
event => {

  if (
    event.key === "Escape" &&
    modal.classList.contains("open")
  ) {

    closeModal();

  }

}

);

/* =======================================================
DOUBLE CLICK / BACK TO TOP
======================================================= */

document.querySelectorAll(
'.footer-bottom a[href="#top"]'
).forEach(link => {

link.addEventListener(
  "click",
  event => {

    event.preventDefault();

    window.scrollTo({
      top:0,
      behavior:"smooth"
    });

  }
);

});

/* =======================================================
REDUCED MOTION
======================================================= */

const reducedMotion =
window.matchMedia(
"(prefers-reduced-motion: reduce)"
);

if (reducedMotion.matches) {

document.documentElement.classList.add(
  "reduced-motion"
);

}

/* =======================================================
RESIZE CLEANUP
======================================================= */

window.addEventListener(
"resize",
() => {

  if (
    window.innerWidth > 860 &&
    links
  ) {

    links.classList.remove(
      "open"
    );

    body.classList.remove(
      "menu-open"
    );

    if (menuBtn) {

      menuBtn.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  }

}

);

});
