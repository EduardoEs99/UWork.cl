import Swiper from "swiper";
import {
  A11y,
  Autoplay,
  EffectCoverflow,
  Keyboard,
  Pagination,
} from "swiper/modules";
const TIMING = { move: 300, interval: 1500, resume: 500 };
export default function mountStudentCarousel(root) {
  const viewport = root.querySelector("[data-student-swiper]");
  const cards = [...root.querySelectorAll("[data-student-card]")];
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const listen = (element, type, listener) =>
    element.addEventListener(type, listener);
  let hovered = root.matches(":hover");
  let hoveredCard = null;
  let keyboardFocus = false;
  let dragging = false;
  let centeringFromClick = false;
  let tapCandidate = null;
  let pendingTouchFlip = null;
  let visible = false;
  let playbackStarted = false;
  const isCentral = (card) =>
    card.parentElement?.classList.contains("swiper-slide-active") ?? false;
  const toggles = new Map();
  const flippers = new Map();
  const swiper = new Swiper(viewport, {
    init: false,
    modules: [A11y, Autoplay, EffectCoverflow, Keyboard, Pagination],
    effect: "coverflow",
    slidesPerView: "auto",
    centeredSlides: true,
    loop: true,
    initialSlide: 3,
    speed: reducedMotion.matches ? 0 : TIMING.move,
    spaceBetween: 46,
    grabCursor: true,
    threshold: 5,
    slideToClickedSlide: true,
    coverflowEffect: {
      rotate: 0,
      stretch: -6,
      depth: 100,
      scale: 1,
      modifier: 2.5,
      slideShadows: false,
    },
    autoplay: { delay: TIMING.interval, disableOnInteraction: false },
    keyboard: { enabled: true, onlyInViewport: true },
    pagination: {
      el: root.querySelector("[data-carousel-pagination]"),
      clickable: true,
    },
    a11y: {
      paginationBulletMessage: "Ir al perfil {{index}}",
      slideLabelMessage: "Perfil {{index}} de {{slidesLength}}",
    },
  });
  swiper.on("autoplay", () => {
    if (typeof swiper.params.autoplay === "object")
      swiper.params.autoplay.delay = TIMING.interval;
  });
  const syncPlayback = () => {
    if (swiper.destroyed) return;
    const pause =
      reducedMotion.matches ||
      hovered ||
      keyboardFocus ||
      dragging ||
      !visible ||
      document.hidden;
    if (pause) {
      if (swiper.autoplay.running) swiper.autoplay.stop();
    } else if (!swiper.autoplay.running) {
      if (typeof swiper.params.autoplay === "object") {
        swiper.params.autoplay.delay = playbackStarted
          ? TIMING.resume
          : TIMING.interval;
      }
      playbackStarted = true;
      swiper.autoplay.start();
    }
    root.dataset.autoplay = pause ? "paused" : "playing";
  };
  cards.forEach((card) => {
    const front = card.querySelector("[data-card-front]");
    const back = card.querySelector("[data-card-back]");
    const toggle = card.querySelector("[data-flip-toggle]");
    const label = toggle.querySelector("[data-flip-label]");
    toggles.set(card, toggle);
    const flip = (open) => {
      open =
        open &&
        isCentral(card) &&
        !dragging &&
        !swiper.animating &&
        !centeringFromClick;
      if (card.dataset.flipped === String(open)) return;
      card.dataset.flipped = String(open);
      front.inert = open;
      back.inert = !open;
      front.setAttribute("aria-hidden", String(open));
      back.setAttribute("aria-hidden", String(!open));
      toggle.setAttribute("aria-pressed", String(open));
      toggle.setAttribute(
        "aria-label",
        (open ? "Ver datos de " : "Ver foto de ") + toggle.dataset.personName,
      );
      label.textContent = open ? "Ver datos" : "Ver foto";
    };
    flippers.set(card, flip);
    listen(card, "pointerdown", (event) => {
      const target = event.target;
      tapCandidate =
        event.pointerType === "touch" &&
        !(target instanceof Element && target.closest("[data-flip-toggle]"))
          ? card
          : null;
      if (event.pointerType === "mouse" && !isCentral(card))
        centeringFromClick = true;
    });
    listen(card, "pointerenter", (event) => {
      if (event.pointerType !== "mouse") return;
      hoveredCard = card;
      if (!dragging) flip(true);
    });
    listen(card, "pointerleave", (event) => {
      if (event.pointerType !== "mouse") return;
      if (hoveredCard === card) hoveredCard = null;
      flip(false);
    });
    listen(toggle, "click", () => {
      if (!swiper.allowClick) return;
      flip(card.dataset.flipped !== "true");
    });
    listen(card, "click", (event) => {
      const target = event.target;
      if (target instanceof Element && target.closest("[data-flip-toggle]")) {
        tapCandidate = null;
        return;
      }
      if (tapCandidate !== card) return;
      tapCandidate = null;
      if (!swiper.allowClick) {
        pendingTouchFlip = null;
        return;
      }
      if (isCentral(card)) flip(card.dataset.flipped !== "true");
      else pendingTouchFlip = card;
    });
    listen(card, "keydown", (event) => {
      if (event.key === "Escape") flip(false);
    });
    listen(card, "focusout", (event) => {
      if (
        !(event.relatedTarget instanceof Node) ||
        !card.contains(event.relatedTarget)
      )
        flip(false);
    });
  });
  const updateSelection = () => {
    root.dataset.activeIndex = String(swiper.realIndex);
    for (const card of cards) {
      const selected =
        card.parentElement?.classList.contains("swiper-slide-active") ?? false;
      toggles.get(card).tabIndex = selected ? 0 : -1;
      if (!selected) flippers.get(card)(false);
    }
  };
  swiper.on("slideChange", () => {
    flippers.forEach((flip) => flip(false));
    updateSelection();
  });
  const flipHoveredCenter = () => {
    const center = cards.find(
      (card) => isCentral(card) && card.matches(":hover"),
    );
    if (hoveredCard && center && !dragging) flippers.get(center)(true);
  };
  swiper.on("slideChangeTransitionEnd", () => {
    if (pendingTouchFlip && isCentral(pendingTouchFlip) && !dragging) {
      flippers.get(pendingTouchFlip)(true);
      pendingTouchFlip = null;
    }
    flipHoveredCenter();
    syncPlayback();
  });
  swiper.on("sliderFirstMove", () => {
    dragging = true;
    tapCandidate = null;
    pendingTouchFlip = null;
    flippers.forEach((flip) => flip(false));
    syncPlayback();
  });
  swiper.on("touchEnd", () => {
    dragging = false;
    flipHoveredCenter();
    syncPlayback();
  });
  listen(root, "pointerenter", (event) => {
    if (event.pointerType === "mouse") {
      hovered = true;
      syncPlayback();
    }
  });
  listen(root, "pointerleave", (event) => {
    if (event.pointerType === "mouse") {
      hovered = false;
      centeringFromClick = false;
      syncPlayback();
    }
  });
  listen(root, "pointermove", (event) => {
    if (
      event.pointerType !== "mouse" ||
      !centeringFromClick ||
      swiper.animating ||
      dragging ||
      event.buttons
    )
      return;
    if (event.movementX === 0 && event.movementY === 0) return;
    centeringFromClick = false;
    flipHoveredCenter();
  });
  listen(root, "focusin", (event) => {
    keyboardFocus =
      event.target instanceof Element && event.target.matches(":focus-visible");
    syncPlayback();
  });
  listen(root, "focusout", (event) => {
    if (
      !(event.relatedTarget instanceof Node) ||
      !root.contains(event.relatedTarget)
    ) {
      keyboardFocus = false;
      syncPlayback();
    }
  });
  document.addEventListener("visibilitychange", syncPlayback);
  reducedMotion.addEventListener("change", () => {
    swiper.params.speed = reducedMotion.matches ? 0 : TIMING.move;
    syncPlayback();
  });
  swiper.init();
  updateSelection();
  syncPlayback();
  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.15;
      syncPlayback();
    },
    { threshold: [0, 0.15] },
  );
  observer.observe(root);
}
