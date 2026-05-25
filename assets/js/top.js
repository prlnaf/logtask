// =====================
// Voices Slider (SP)
// =====================

const voicesList = document.querySelector(".voices__list");
const voiceCards = document.querySelectorAll(".voice-card");
const voiceDots = document.querySelectorAll(".voices__dot");

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

// =====================
// FV AI Animation
// =====================

const fvAiCore = document.querySelector(".ai-node__core");
const fvAiGlow = document.querySelector(".ai-node__glow");
const fvAiRings = document.querySelectorAll(".ai-node__ring");

const hasGsap = typeof gsap !== "undefined";

const fvAiParticles = hasGsap
  ? gsap.utils.toArray(".ai-particles span")
  : [];

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

// AI処理反応
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

// 粒子演出
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