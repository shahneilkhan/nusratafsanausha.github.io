document.addEventListener("DOMContentLoaded", () => {

const body = document.body;
const header = document.querySelector(".site-header");
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const progress = document.querySelector(".scroll-progress span");
const loader = document.querySelector(".page-loader");
const year = document.getElementById("year");

/* =========================
YEAR
========================= */

if (year) {
year.textContent = new Date().getFullYear();
}

/* =========================
PAGE LOADER
========================= */

window.addEventListener("load", () => {

setTimeout(() => {
  loader?.classList.add("is-hidden");
}, 500);

});

/* =========================
MOBILE MENU
========================= */

const closeMenu = () => {

navLinks?.classList.remove("open");

menuBtn?.setAttribute(
  "aria-expanded",
  "false"
);

menuBtn?.setAttribute(
  "aria-label",
  "Open menu"
);

};

menuBtn?.addEventListener("click", () => {

const open =
  navLinks?.classList.toggle("open");

menuBtn.setAttribute(
  "aria-expanded",
  String(open)
);

menuBtn.setAttribute(
  "aria-label",
  open ? "Close menu" : "Open menu"
);

});

navLinks?.querySelectorAll("a").forEach(link => {

link.addEventListener("click", () => {
  closeMenu();
});

});

document.addEventListener("keydown", event => {

if (event.key === "Escape") {
  closeMenu();
  closeModal();
}

});

/* =========================
HEADER SHOW / HIDE
========================= */

let lastScroll = window.scrollY;

window.addEventListener(
"scroll",
() => {

  const current = window.scrollY;

  if (current > 30) {
    header?.classList.add("scrolled");
  } else {
    header?.classList.remove("scrolled");
  }

  if (current > lastScroll && current > 180) {
    header?.classList.add("hidden");
  } else {
    header?.classList.remove("hidden");
  }

  lastScroll = current;

},
{ passive:true }

);

/* =========================
SCROLL PROGRESS
========================= */

const updateProgress = () => {

if (!progress) return;

const scrollTop =
  window.scrollY;

const scrollHeight =
  document.documentElement.scrollHeight -
  window.innerHeight;

const percentage =
  scrollHeight > 0
    ? (scrollTop / scrollHeight) * 100
    : 0;

progress.style.width =
  `${percentage}%`;

};

window.addEventListener(
"scroll",
updateProgress,
{ passive }
);

updateProgress();

/* =========================
SMOOTH ANCHORS
========================= */

document
.querySelectorAll('a[href^="#"]')
.forEach(link => {

  link.addEventListener("click", event => {

    const id =
      link.getAttribute("href");

    if (!id || id === "#") return;

    const target =
      document.querySelector(id);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior:"smooth",
      block:"start"
    });

  });

});

/* =========================
REVEAL
========================= */

const revealItems =
document.querySelectorAll(".reveal");

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
    rootMargin:"0px 0px -50px"
  }
);

revealItems.forEach(item => {
revealObserver.observe(item);
});

/* =========================
HERO PARALLAX
========================= */

const heroImage =
document.querySelector(".hero-frame img");

if (
heroImage &&
!window.matchMedia(
"(prefers-reduced-motion: reduce)"
).matches
) {

window.addEventListener(
  "scroll",
  () => {

    const y =
      Math.min(window.scrollY * .08, 35);

    heroImage.style.transform =
      `scale(1.02) translateY(${y}px)`;

  },
  { passive:true }
);

}

/* =========================
PROJECT TILT
========================= */

const projects =
document.querySelectorAll(".project-image");

if (
window.matchMedia("(pointer)").matches &&
!window.matchMedia(
"(prefers-reduced-motion: reduce)"
).matches
) {

projects.forEach(card => {

  card.addEventListener(
    "mousemove",
    event => {

      const rect =
        card.getBoundingClientRect();

      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;

      const rotateX =
        ((y / rect.height) - .5) * -3;

      const rotateY =
        ((x / rect.width) - .5) * 3;

      card.style.transform =
        `perspective(900px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         scale(1.005)`;

    }
  );

  card.addEventListener(
    "mouseleave",
    () => {

      card.style.transform =
        "";

    }
  );

});

}

/* =========================
CURSOR
========================= */

if (
window.matchMedia("(pointer)").matches
) {

const cursor =
  document.createElement("div");

cursor.className =
  "cursor-glow";

document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener(
  "mousemove",
  event => {

    mouseX = event.clientX;
    mouseY = event.clientY;

  }
);

const cursorLoop = () => {

  currentX +=
    (mouseX - currentX) * .16;

  currentY +=
    (mouseY - currentY) * .16;

  cursor.style.left =
    `${currentX}px`;

  cursor.style.top =
    `${currentY}px`;

  requestAnimationFrame(
    cursorLoop
  );

};

cursorLoop();


document
  .querySelectorAll(
    "a,button,.project-image"
  )
  .forEach(element => {

    element.addEventListener(
      "mouseenter",
      () => {
        cursor.classList.add("active");
      }
    );

    element.addEventListener(
      "mouseleave",
      () => {
        cursor.classList.remove("active");
      }
    );

  });

}

/* =========================
CASE STUDY DATA
========================= */

const projectsData = {

"website-deals": {

  title:"Website Deals",

  category:"Marketplace / UX/UI",

  image:"project-01.jpg",

  role:"UI Designer & Partner",

  tools:"Figma",

  status:"Client / Marketplace",

  about:
    "A marketplace and website-design workflow focused on presenting services clearly, helping clients understand available options, and creating a smoother path from requirement to final website."

},


"client-website": {

  title:"Client Website Design",

  category:"Web Design / UI",

  image:"project-02.jpg",

  role:"UX/UI Designer",

  tools:"Figma",

  status:"Client Project",

  about:
    "A client-focused website design process covering information structure, visual hierarchy, responsive layouts and interactive Figma prototypes before development."

},


"masters": {

  title:"MA UX Design Projects",

  category:"UX Research / Academic",

  image:"project-03.jpg",

  role:"UX Design Student",

  tools:"Figma / Research",

  status:"Academic Project",

  about:
    "UX design studies exploring research, information architecture, wireframing, prototyping and usability testing as part of postgraduate UX Design education."

}

};

/* =========================
MODAL
========================= */

const modal =
document.getElementById("caseModal");

const caseImage =
document.getElementById("caseImage");

const caseCategory =
document.getElementById("caseCategory");

const caseTitle =
document.getElementById("caseTitle");

const caseRole =
document.getElementById("caseRole");

const caseTools =
document.getElementById("caseTools");

const caseStatus =
document.getElementById("caseStatus");

const caseAbout =
document.getElementById("caseAbout");

const openModal = key => {

const data =
  projectsData[key];

if (!data || !modal) return;

if (caseImage) {

  caseImage.src =
    data.image;

  caseImage.alt =
    data.title;

  caseImage.onerror = () => {

    caseImage.style.display =
      "none";

  };

}

if (caseCategory)
  caseCategory.textContent =
    data.category;

if (caseTitle)
  caseTitle.textContent =
    data.title;

if (caseRole)
  caseRole.textContent =
    data.role;

if (caseTools)
  caseTools.textContent =
    data.tools;

if (caseStatus)
  caseStatus.textContent =
    data.status;

if (caseAbout)
  caseAbout.textContent =
    data.about;

modal.classList.add("open");

modal.setAttribute(
  "aria-hidden",
  "false"
);

body.classList.add(
  "modal-open"
);

};

function closeModal(){

if (!modal) return;

modal.classList.remove("open");

modal.setAttribute(
  "aria-hidden",
  "true"
);

body.classList.remove(
  "modal-open"
);

}

document
.querySelectorAll("[data-project]")
.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      const key =
        button.dataset.project;

      openModal(key);

    }
  );

});

document
.querySelectorAll("[data-close]")
.forEach(element => {

  element.addEventListener(
    "click",
    closeModal
  );

});

/* =========================
IMAGE FALLBACK
========================= */

document
.querySelectorAll("img")
.forEach(img => {

  img.addEventListener(
    "load",
    () => {

      img.classList.add(
        "loaded"
      );

    }
  );

  img.addEventListener(
    "error",
    () => {

      img.classList.add(
        "image-error"
      );

    }
  );

});

/* =========================
RESIZE
========================= */

window.addEventListener(
"resize",
() => {

  if (
    window.innerWidth > 900
  ) {
    closeMenu();
  }

}

);

});
