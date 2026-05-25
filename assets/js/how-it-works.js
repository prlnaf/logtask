document.addEventListener("DOMContentLoaded", () => {

  // =====================
  // How it works Navigation
  // =====================

  const howMediaQuery = window.matchMedia("(min-width: 768px)");

  const sections = [...document.querySelectorAll(".detail-card[id]")];

  const sidebarItems = [
    ...document.querySelectorAll(".how-sidebar__nav li[data-step]")
  ];

  const tabItems = [
    ...document.querySelectorAll(".how-main__tabs li")
  ];

  const flowCards = [
    ...document.querySelectorAll(".flow-card[href^='#step']")
  ];

  const progress = document.querySelector(".how-sidebar__progress");

  const sidebarNav = document.querySelector(".how-sidebar__nav");

  let isHowNavActive = false;

  if (sections.length) {

    const getStepFromId = (id) =>
      Number(id.replace("step", ""));

    const getStepFromLink = (link) => {
      const href = link.getAttribute("href");

      return href
        ? getStepFromId(href.replace("#", ""))
        : NaN;
    };

    function updateLinkState(items, stepNumber) {
      items.forEach((item) => {

        const link = item.matches("a")
          ? item
          : item.querySelector("a");

        if (!link) return;

        const itemStep = getStepFromLink(link);

        const isActive = itemStep === stepNumber;

        item.classList.toggle("is-active", isActive);

        if (isActive) {
          link.setAttribute("aria-current", "step");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    function updateSidebarState(stepNumber) {
      sidebarItems.forEach((item) => {

        const itemStep = Number(item.dataset.step);

        item.classList.toggle(
          "is-active",
          itemStep === stepNumber
        );

        item.classList.toggle(
          "is-complete",
          itemStep < stepNumber
        );

        const link = item.querySelector("a");

        if (link) {
          if (itemStep === stepNumber) {
            link.setAttribute("aria-current", "step");
          } else {
            link.removeAttribute("aria-current");
          }
        }
      });
    }

    function updateProgress(stepNumber) {

      if (
        !howMediaQuery.matches ||
        !progress ||
        !sidebarNav
      ) {
        return;
      }

      const activeItem = document.querySelector(
        `.how-sidebar__nav li[data-step="${stepNumber}"]`
      );

      const circle =
        activeItem?.querySelector("a span");

      if (!circle) return;

      const navRect =
        sidebarNav.getBoundingClientRect();

      const circleRect =
        circle.getBoundingClientRect();

      const circleCenter =
        (circleRect.top - navRect.top) +
        (circleRect.height / 2);

      progress.style.height =
        `${Math.max(circleCenter - 22, 0)}px`;
    }

    function setActiveStep(stepNumber) {

      if (Number.isNaN(stepNumber)) return;

      updateSidebarState(stepNumber);

      updateLinkState(tabItems, stepNumber);

      updateLinkState(flowCards, stepNumber);

      updateProgress(stepNumber);
    }

    function getCurrentStep() {

      const triggerY = 140;

      let currentStep = 1;

      sections.forEach((section) => {

        const rect =
          section.getBoundingClientRect();

        if (rect.top <= triggerY) {

          const stepNumber =
            getStepFromId(section.id);

          if (!Number.isNaN(stepNumber)) {
            currentStep = stepNumber;
          }
        }
      });

      return currentStep;
    }

    function handleHowScroll() {
      setActiveStep(getCurrentStep());
    }

    function activateHowNav() {

      if (isHowNavActive) return;

      isHowNavActive = true;

      window.addEventListener(
        "scroll",
        handleHowScroll,
        { passive: true }
      );

      window.addEventListener(
        "resize",
        handleHowScroll
      );

      handleHowScroll();
    }

    function deactivateHowNav() {

      if (isHowNavActive) {

        isHowNavActive = false;

        window.removeEventListener(
          "scroll",
          handleHowScroll
        );

        window.removeEventListener(
          "resize",
          handleHowScroll
        );
      }

      if (progress) {
        progress.style.height = "";
      }

      setActiveStep(getCurrentStep());
    }

    function switchHowNav() {

      if (howMediaQuery.matches) {
        activateHowNav();
      } else {
        deactivateHowNav();
      }
    }

    [
      ...flowCards,
      ...tabItems.map((item) =>
        item.querySelector("a")
      ),
      ...sidebarItems.map((item) =>
        item.querySelector("a")
      )
    ]
      .filter(Boolean)
      .forEach((link) => {

        link.addEventListener("click", () => {

          const stepNumber =
            getStepFromLink(link);

          window.requestAnimationFrame(() => {
            setActiveStep(stepNumber);
          });
        });
      });

    switchHowNav();

    if (howMediaQuery.addEventListener) {

      howMediaQuery.addEventListener(
        "change",
        switchHowNav
      );

    } else {

      howMediaQuery.addListener(
        switchHowNav
      );
    }
  }

});