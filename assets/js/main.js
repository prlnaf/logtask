document.addEventListener("DOMContentLoaded", () => {

  const menuButton = document.querySelector(".header__menu");
const nav = document.querySelector("#global-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.classList.toggle("is-open", !isOpen);
    nav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("is-menu-open", !isOpen);
  });

  const navLinks = nav.querySelectorAll("a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.classList.remove("is-open");
      nav.classList.remove("is-open");
      document.body.classList.remove("is-menu-open");
    });
  });
}

//  index.お客様の声 SPのみ

if (voicesList && voiceCards.length && voiceDots.length) {
  voicesList.addEventListener("scroll", () => {
    if (window.innerWidth >= 768) return;

    const cardWidth = voiceCards[0].offsetWidth + 20;
    const currentIndex = Math.round(voicesList.scrollLeft / cardWidth);

    voiceDots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentIndex);
    });
  });
}
//  index.お客様の声 SPのみ　ここまで

  // 使い方ページ：ページ内リンク・固定サイドナビ
  const howMediaQuery = window.matchMedia("(min-width: 768px)");
  const sections = [...document.querySelectorAll(".detail-card[id]")];
  const sidebarItems = [...document.querySelectorAll(".how-sidebar__nav li[data-step]")];
  const tabItems = [...document.querySelectorAll(".how-main__tabs li")];
  const flowCards = [...document.querySelectorAll(".flow-card[href^='#step']")];
  const progress = document.querySelector(".how-sidebar__progress");
  const sidebarNav = document.querySelector(".how-sidebar__nav");
  let isHowNavActive = false;

  if (sections.length) {
    const getStepFromId = (id) => Number(id.replace("step", ""));
    const getStepFromLink = (link) => {
      const href = link.getAttribute("href");
      return href ? getStepFromId(href.replace("#", "")) : NaN;
    };

    function updateLinkState(items, stepNumber) {
      items.forEach((item) => {
        const link = item.matches("a") ? item : item.querySelector("a");
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
        item.classList.toggle("is-active", itemStep === stepNumber);
        item.classList.toggle("is-complete", itemStep < stepNumber);

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
      if (!howMediaQuery.matches || !progress || !sidebarNav) return;

      const activeItem = document.querySelector(`.how-sidebar__nav li[data-step="${stepNumber}"]`);
      const circle = activeItem?.querySelector("a span");
      if (!circle) return;

      const navRect = sidebarNav.getBoundingClientRect();
      const circleRect = circle.getBoundingClientRect();
      const circleCenter = (circleRect.top - navRect.top) + (circleRect.height / 2);

      progress.style.height = `${Math.max(circleCenter - 22, 0)}px`;
    }

    function setActiveStep(stepNumber) {
      if (Number.isNaN(stepNumber)) return;

      updateSidebarState(stepNumber);
      updateLinkState(tabItems, stepNumber);
      updateLinkState(flowCards, stepNumber);
      updateProgress(stepNumber);
    }

    function getCurrentStep() {
      const triggerY = 140; // ヘッダー下あたりで切り替える
      let currentStep = 1;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= triggerY) {
          const stepNumber = getStepFromId(section.id);
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
      window.addEventListener("scroll", handleHowScroll, { passive: true });
      window.addEventListener("resize", handleHowScroll);
      handleHowScroll();
    }

    function deactivateHowNav() {
      if (isHowNavActive) {
        isHowNavActive = false;
        window.removeEventListener("scroll", handleHowScroll);
        window.removeEventListener("resize", handleHowScroll);
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

    [...flowCards, ...tabItems.map((item) => item.querySelector("a")), ...sidebarItems.map((item) => item.querySelector("a"))]
      .filter(Boolean)
      .forEach((link) => {
        link.addEventListener("click", () => {
          const stepNumber = getStepFromLink(link);
          window.requestAnimationFrame(() => setActiveStep(stepNumber));
        });
      });

    switchHowNav();
    if (howMediaQuery.addEventListener) {
      howMediaQuery.addEventListener("change", switchHowNav);
    } else {
      howMediaQuery.addListener(switchHowNav);
    }
  }
});
  // 使い方ページの左固定数字のカラーの変化　ここまで



// =====================
// FV AI Animation
// =====================

const fvAiCore = document.querySelector(".ai-node__core");
const fvAiGlow = document.querySelector(".ai-node__glow");
const fvAiRings = document.querySelectorAll(".ai-node__ring");
const hasGsap = typeof gsap !== "undefined";
const fvAiParticles = hasGsap ? gsap.utils.toArray(".ai-particles span") : [];

// AI球体：呼吸
if (hasGsap && fvAiCore) {
  gsap.to(fvAiCore, {
    scale: 1.05,
    duration: 2.4,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1
  });
}

// AIの光：呼吸
if (hasGsap && fvAiGlow) {
  gsap.to(fvAiGlow, {
    scale: 1.14,
    opacity: 0.9,
    duration: 2.4,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1
  });
}

// AI処理反応：定期的に強く光る
if (hasGsap && fvAiCore && fvAiGlow) {
  const fvAiProcessingTl = gsap.timeline({
    repeat: -1,
    repeatDelay: 1.2
  });

  fvAiProcessingTl
    .to(fvAiGlow, {
      scale: 1.28,
      opacity: 1,
      duration: 0.45,
      ease: "power2.out"
    })
    .to(fvAiCore, {
      scale: 1.12,
      boxShadow:
        "inset 0 0 22px rgba(255,255,255,0.45), 0 0 48px rgba(59,130,246,0.75), 0 20px 44px rgba(37,99,235,0.34)",
      duration: 0.45,
      ease: "power2.out"
    }, "<")
    .to(fvAiRings, {
      scale: 1.1,
      opacity: 0.85,
      duration: 0.45,
      ease: "power2.out"
    }, "<")
    .to(fvAiCore, {
      scale: 1,
      boxShadow:
        "inset 0 0 18px rgba(255,255,255,0.35), 0 0 28px rgba(59,130,246,0.45), 0 18px 36px rgba(37,99,235,0.28)",
      duration: 0.8,
      ease: "sine.inOut"
    })
    .to(fvAiGlow, {
      scale: 1,
      opacity: 0.55,
      duration: 0.8,
      ease: "sine.inOut"
    }, "<")
    .to(fvAiRings, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: "sine.inOut"
    }, "<");
}

// 吸い込まれていく演出：粒子
// PC：左 → AI
// SP：上 → AI
if (hasGsap && fvAiParticles.length) {
  const isSP = window.matchMedia("(max-width: 767px)").matches;

  fvAiParticles.forEach((dot, index) => {
    const fromPosition = isSP
      ? {
          x: gsap.utils.random(-48, 48),
          y: -180 - index * 18,
          opacity: 0,
          scale: 0.7
        }
      : {
          x: -180 - index * 22,
          y: gsap.utils.random(-70, 70),
          opacity: 0,
          scale: 0.7
        };

    gsap.fromTo(
      dot,
      fromPosition,
      {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 0.2,
        duration: 1.5 + index * 0.08,
        delay: index * 0.14,
        ease: "power2.in",
        repeat: -1,
        repeatDelay: 0.7
      }
    );
  });
}

// お問い合わせフォーム（静的ページ用）
const contactForm = document.querySelector(".contact-form");
const contactFormMessage = document.querySelector(".contact-form__message");

if (contactForm && contactFormMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    contactForm.reset();
    contactFormMessage.hidden = false;
    contactFormMessage.focus?.();
  });
}
