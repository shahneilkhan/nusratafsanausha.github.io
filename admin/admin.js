/* =========================================================
   NUSrat Afsana Usha — Premium Admin System
   Shared JavaScript for all /admin/*.html pages
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
     STORAGE
  ======================================================= */

  const STORAGE = {
    theme: "nusrat_admin_theme",
    data: "nusrat_portfolio_admin_data",
    page: "nusrat_admin_current_page",
    updated: "nusrat_admin_last_updated"
  };


  /* =======================================================
     DOM
  ======================================================= */

  const body = document.body;
  const sidebar = $("#sidebar");
  const overlay = $("#mobileOverlay");
  const mobileMenu = $("#mobileMenu");
  const themeToggle = $("#themeToggle");
  const toast = $("#toast");
  const globalSave = $("#globalSave");
  const pageTitle = $("#pageTitle");
  const lastUpdated = $("#lastUpdated");

  const navItems = $$(".nav-item");
  const pages = $$(".page");
  const quickActions = $$("[data-open-page]");


  /* =======================================================
     DEFAULT DATA
  ======================================================= */

  const defaultData = {
    profile: {
      name: "Nusrat Afsana Usha",
      role: "UX/UI Designer",
      headline:
        "Designing clarity into digital experiences.",
      intro:
        "I design thoughtful digital experiences that turn complexity into clarity — combining user insight, visual systems and purposeful interaction.",
      location: "Dhaka, Bangladesh",
      availability:
        "Available for selected projects"
    },

    services: [
      "UX/UI Design",
      "Website Design",
      "Wireframing",
      "Prototyping",
      "User Research"
    ],

    settings: {
      portfolioLive: true
    }
  };


  /* =======================================================
     DATA HELPERS
  ======================================================= */

  function getData() {
    try {
      const saved = localStorage.getItem(STORAGE.data);

      if (!saved) {
        localStorage.setItem(
          STORAGE.data,
          JSON.stringify(defaultData)
        );

        return structuredClone
          ? structuredClone(defaultData)
          : JSON.parse(JSON.stringify(defaultData));
      }

      return {
        ...defaultData,
        ...JSON.parse(saved)
      };

    } catch (error) {
      console.warn(
        "Admin data could not be loaded:",
        error
      );

      return {
        ...defaultData
      };
    }
  }


  function saveData(data) {
    try {
      localStorage.setItem(
        STORAGE.data,
        JSON.stringify(data)
      );

      const now = new Date();

      localStorage.setItem(
        STORAGE.updated,
        now.toISOString()
      );

      updateLastUpdated();

      return true;

    } catch (error) {
      console.error(
        "Admin data could not be saved:",
        error
      );

      return false;
    }
  }


  /* =======================================================
     TOAST
  ======================================================= */

  let toastTimer = null;

  function showToast(message = "Changes saved") {

    if (!toast) return;

    const text = $("strong", toast);

    if (text) {
      text.textContent = message;
    }

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2400);
  }


  /* =======================================================
     LAST UPDATED
  ======================================================= */

  function updateLastUpdated() {

    if (!lastUpdated) return;

    const value =
      localStorage.getItem(STORAGE.updated);

    if (!value) {
      lastUpdated.textContent = "Just now";
      return;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      lastUpdated.textContent = "Just now";
      return;
    }

    lastUpdated.textContent =
      date.toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
      });
  }


  /* =======================================================
     THEME
  ======================================================= */

  function applyTheme(theme) {

    const validTheme =
      theme === "light"
        ? "light"
        : "dark";

    document.documentElement.dataset.theme =
      validTheme;

    localStorage.setItem(
      STORAGE.theme,
      validTheme
    );

    if (themeToggle) {
      themeToggle.textContent =
        validTheme === "dark"
          ? "☀"
          : "◐";

      themeToggle.setAttribute(
        "aria-label",
        validTheme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode"
      );
    }
  }


  function initTheme() {

    const stored =
      localStorage.getItem(STORAGE.theme);

    if (stored) {
      applyTheme(stored);
      return;
    }

    const prefersLight =
      window.matchMedia &&
      window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;

    applyTheme(
      prefersLight
        ? "light"
        : "dark"
    );
  }


  if (themeToggle) {

    themeToggle.addEventListener(
      "click",
      () => {

        const current =
          document.documentElement.dataset.theme ||
          "dark";

        applyTheme(
          current === "dark"
            ? "light"
            : "dark"
        );

        showToast("Theme updated");
      }
    );
  }


  /* =======================================================
     SIDEBAR
  ======================================================= */

  function openSidebar() {

    if (!sidebar) return;

    sidebar.classList.add("open");

    if (overlay) {
      overlay.classList.add("show");
    }

    body.classList.add("menu-open");
  }


  function closeSidebar() {

    if (!sidebar) return;

    sidebar.classList.remove("open");

    if (overlay) {
      overlay.classList.remove("show");
    }

    body.classList.remove("menu-open");
  }


  if (mobileMenu) {
    mobileMenu.addEventListener(
      "click",
      openSidebar
    );
  }


  if (overlay) {
    overlay.addEventListener(
      "click",
      closeSidebar
    );
  }


  /* =======================================================
     PAGE SYSTEM
  ======================================================= */

  const pageMap = {
    dashboard: "Dashboard",
    profile: "Profile",
    services: "Services",
    work: "Selected Work",
    experience: "Experience",
    education: "Education",
    skills: "Skills",
    journal: "Journal",
    contact: "Contact",
    homepage: "Homepage",
    banner: "Banner",
    "browser-ui": "Browser UI",
    newsletter: "Newsletter",
    "admin-management": "Admin Management",
    system: "System"
  };


  function getPageFromURL() {

    const currentFile =
      window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    if (
      !currentFile ||
      currentFile === "index.html"
    ) {
      return "dashboard";
    }

    const filename =
      currentFile.replace(
        ".html",
        ""
      );

    if (pageMap[filename]) {
      return filename;
    }

    return "dashboard";
  }


  function activatePage(page) {

    if (!pageMap[page]) {
      page = "dashboard";
    }

    navItems.forEach((item) => {

      item.classList.toggle(
        "active",
        item.dataset.page === page
      );

    });


    pages.forEach((section) => {

      const id =
        section.id
          .replace("page-", "");

      section.classList.toggle(
        "active",
        id === page
      );

    });


    if (pageTitle) {
      pageTitle.textContent =
        pageMap[page] || "Dashboard";
    }


    try {
      localStorage.setItem(
        STORAGE.page,
        page
      );
    } catch (_) {}


    closeSidebar();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }


  /* =======================================================
     INTERNAL PAGE NAVIGATION
  ======================================================= */

  navItems.forEach((item) => {

    item.addEventListener(
      "click",
      () => {

        const page =
          item.dataset.page;

        if (!page) return;

        const target =
          document.getElementById(
            `page-${page}`
          );

        /*
          If the page exists inside the current
          single-page admin, show it.
        */

        if (target) {
          activatePage(page);
          return;
        }

        /*
          Otherwise navigate to the dedicated
          HTML page.
        */

        const targetFile =
          page === "dashboard"
            ? "dashboard.html"
            : `${page}.html`;

        window.location.href =
          `./${targetFile}`;
      }
    );

  });


  /* =======================================================
     QUICK ACTIONS
  ======================================================= */

  quickActions.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const page =
          button.dataset.openPage;

        if (!page) return;

        const target =
          document.getElementById(
            `page-${page}`
          );

        if (target) {
          activatePage(page);
          return;
        }

        window.location.href =
          `./${page}.html`;
      }
    );

  });


  /* =======================================================
     SAVE FORM DATA
  ======================================================= */

  function collectFields() {

    const fields =
      $$("[data-save]");

    if (!fields.length) {
      return null;
    }

    const data =
      getData();

    data.profile =
      data.profile || {};

    fields.forEach((field) => {

      const key =
        field.dataset.save;

      if (!key) return;

      data.profile[key] =
        field.value;
    });

    return data;
  }


  function saveCurrentPage() {

    const data =
      collectFields();

    if (!data) {
      showToast("Nothing to save");
      return;
    }

    const success =
      saveData(data);

    if (success) {
      showToast("Changes saved");
    } else {
      showToast("Could not save changes");
    }
  }


  if (globalSave) {

    globalSave.addEventListener(
      "click",
      saveCurrentPage
    );
  }


  /* =======================================================
     CMD / CTRL + S
  ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      const isSave =
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "s";

      if (!isSave) return;

      event.preventDefault();

      saveCurrentPage();
    }
  );


  /* =======================================================
     LOAD PROFILE DATA
  ======================================================= */

  function populateProfile() {

    const data =
      getData();

    if (!data.profile) return;

    $$("[data-save]").forEach(
      (field) => {

        const key =
          field.dataset.save;

        if (
          Object.prototype.hasOwnProperty.call(
            data.profile,
            key
          )
        ) {
          field.value =
            data.profile[key];
        }

      }
    );
  }


  /* =======================================================
     IMAGE PREVIEW
  ======================================================= */

  const imageInput =
    $("#profileImageInput");

  const imagePreview =
    $("#profileImagePreview");


  if (imageInput && imagePreview) {

    imageInput.addEventListener(
      "change",
      () => {

        const file =
          imageInput.files &&
          imageInput.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
          showToast("Please select an image");
          return;
        }

        const reader =
          new FileReader();

        reader.onload = (event) => {

          imagePreview.src =
            event.target.result;

          /*
            Store only a preview locally.
            A real backend upload should replace
            this with Firebase/Supabase storage.
          */

          try {

            localStorage.setItem(
              "nusrat_admin_preview_image",
              event.target.result
            );

          } catch (error) {

            console.warn(
              "Image preview is too large for localStorage."
            );

          }

          showToast(
            "Image preview updated"
          );
        };

        reader.readAsDataURL(file);
      }
    );
  }


  function restoreImagePreview() {

    if (!imagePreview) return;

    try {

      const image =
        localStorage.getItem(
          "nusrat_admin_preview_image"
        );

      if (image) {
        imagePreview.src = image;
      }

    } catch (_) {}
  }


  /* =======================================================
     SERVICES
  ======================================================= */

  function updateServiceCount() {

    const list =
      $("#servicesList");

    const count =
      $("#serviceCount");

    if (!list || !count) return;

    const items =
      $$(".content-row", list);

    count.textContent =
      items.length;
  }


  $$("[data-add-service]").forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          const list =
            $("#servicesList");

          if (!list) return;

          const current =
            list.querySelectorAll(
              ".content-row"
            ).length + 1;

          const row =
            document.createElement("article");

          row.className =
            "content-row";

          row.innerHTML = `
            <div class="row-number">
              ${String(current).padStart(2, "0")}
            </div>

            <div class="row-content">
              <strong>New Service</strong>
              <span>
                Add a description for this service.
              </span>
            </div>

            <button class="row-action">
              Edit
            </button>
          `;

          list.appendChild(row);

          updateServiceCount();

          showToast(
            "New service added"
          );
        }
      );

    }
  );


  /* =======================================================
     PROJECT ADD
  ======================================================= */

  $$("[data-add-project]").forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          showToast(
            "Project editor is ready for backend connection"
          );

        }
      );

    }
  );


  /* =======================================================
     GENERIC EDIT BUTTON FEEDBACK
  ======================================================= */

  $$(".row-action").forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          showToast(
            "Editor opened"
          );

        }
      );

    }
  );


  /* =======================================================
     LIVE PORTFOLIO
  ======================================================= */

  function updateLiveStatus() {

    const status =
      $(".status-left strong");

    if (!status) return;

    const data =
      getData();

    if (
      data.settings &&
      data.settings.portfolioLive === false
    ) {
      status.textContent =
        "Portfolio is in draft mode";

      const dot =
        $(".status-dot");

      if (dot) {
        dot.style.background =
          "var(--warning)";
        dot.style.boxShadow =
          "0 0 0 5px rgba(228,189,113,.08), 0 0 18px rgba(228,189,113,.22)";
      }

    }

  }


  /* =======================================================
     ACCOUNT MENU
  ======================================================= */

  const accountMenu =
    $("#accountMenu");

  if (accountMenu) {

    accountMenu.addEventListener(
      "click",
      () => {

        showToast(
          "Account settings coming next"
        );

      }
    );
  }


  /* =======================================================
     ACTIVE DEDICATED PAGE
  ======================================================= */

  function highlightDedicatedPage() {

    const current =
      getPageFromURL();

    navItems.forEach((item) => {

      item.classList.toggle(
        "active",
        item.dataset.page === current
      );

    });

    if (pageTitle) {
      pageTitle.textContent =
        pageMap[current] ||
        "Dashboard";
    }
  }


  /* =======================================================
     PREVENT UNSAVED ACCIDENTAL LEAVE
  ======================================================= */

  let hasUnsavedChanges = false;

  $$("input, textarea, select").forEach(
    (field) => {

      field.addEventListener(
        "input",
        () => {
          hasUnsavedChanges = true;
        }
      );

      field.addEventListener(
        "change",
        () => {
          hasUnsavedChanges = true;
        }
      );

    }
  );


  if (globalSave) {

    globalSave.addEventListener(
      "click",
      () => {
        hasUnsavedChanges = false;
      }
    );

  }


  window.addEventListener(
    "beforeunload",
    (event) => {

      if (!hasUnsavedChanges) {
        return;
      }

      event.preventDefault();
      event.returnValue = "";
    }
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
        closeSidebar();
      }

    }
  );


  /* =======================================================
     INITIALIZE
  ======================================================= */

  function init() {

    initTheme();

    populateProfile();

    restoreImagePreview();

    updateLastUpdated();

    updateServiceCount();

    updateLiveStatus();

    highlightDedicatedPage();

  }


  init();

})();
