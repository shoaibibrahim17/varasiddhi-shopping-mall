const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const AUTOPLAY_INTERVAL = 5200;
const RESUME_DELAY = 7000;

const initCarousel = (carousel: HTMLElement) => {
  const track = carousel.querySelector<HTMLElement>("[data-carousel-track]");
  const items = Array.from(carousel.querySelectorAll<HTMLElement>("[data-carousel-item]"));
  const prev = carousel.querySelector<HTMLButtonElement>("[data-carousel-prev]");
  const next = carousel.querySelector<HTMLButtonElement>("[data-carousel-next]");
  const counter = carousel.querySelector<HTMLElement>("[data-carousel-counter]");
  const dots = Array.from(carousel.querySelectorAll<HTMLButtonElement>("[data-carousel-dot]"));
  const pause = carousel.querySelector<HTMLButtonElement>("[data-carousel-pause]");

  if (!track || items.length < 2) {
    return;
  }

  let activeIndex = 0;
  let autoplayId = 0;
  let resumeId = 0;
  let isPointerInside = false;
  let isFocusInside = false;
  let isInteracting = false;
  let isPaused = false;
  let scrollRaf = 0;

  const updateCounter = () => {
    if (!counter) {
      return;
    }

    counter.textContent = `${String(activeIndex + 1).padStart(2, "0")} — ${String(items.length).padStart(2, "0")}`;
    dots.forEach((dot, index) => {
      dot.setAttribute("aria-selected", String(index === activeIndex));
    });
  };

  const getNearestIndex = () => {
    const trackLeft = track.scrollLeft;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    items.forEach((item, index) => {
      const distance = Math.abs(item.offsetLeft - track.offsetLeft - trackLeft);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    return nearestIndex;
  };

  const setActiveFromScroll = () => {
    activeIndex = getNearestIndex();
    updateCounter();
  };

  const scrollToIndex = (index: number, behavior: ScrollBehavior = "smooth") => {
    const normalized = (index + items.length) % items.length;
    activeIndex = normalized;
    track.scrollTo({ left: items[normalized].offsetLeft - track.offsetLeft, behavior });
    updateCounter();
  };

  const stopAutoplay = () => {
    if (autoplayId) {
      window.clearInterval(autoplayId);
      autoplayId = 0;
    }
  };

  const startAutoplay = () => {
    if (isPaused || reducedMotionQuery.matches || document.hidden || isPointerInside || isFocusInside || isInteracting || autoplayId) {
      return;
    }

    autoplayId = window.setInterval(() => {
      scrollToIndex(activeIndex + 1);
    }, AUTOPLAY_INTERVAL);
  };

  const pauseAutoplay = (resume = true) => {
    stopAutoplay();
    window.clearTimeout(resumeId);

    if (resume && !reducedMotionQuery.matches) {
      resumeId = window.setTimeout(() => {
        isInteracting = false;
        startAutoplay();
      }, RESUME_DELAY);
    }
  };

  prev?.addEventListener("click", () => {
    isInteracting = true;
    pauseAutoplay();
    scrollToIndex(activeIndex - 1);
  });

  next?.addEventListener("click", () => {
    isInteracting = true;
    pauseAutoplay();
    scrollToIndex(activeIndex + 1);
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.carouselDot);
      if (!Number.isInteger(index)) return;
      isInteracting = true;
      pauseAutoplay();
      scrollToIndex(index);
    });
  });

  pause?.addEventListener("click", () => {
    isPaused = !isPaused;
    if (isPaused) {
      pauseAutoplay(false);
      pause.textContent = "Play";
      pause.setAttribute("aria-label", "Resume campaign autoplay");
    } else {
      pause.textContent = "Pause";
      pause.setAttribute("aria-label", "Pause campaign autoplay");
      isInteracting = false;
      startAutoplay();
    }
  });

  track.addEventListener("scroll", () => {
    if (scrollRaf) {
      return;
    }

    scrollRaf = window.requestAnimationFrame(() => {
      scrollRaf = 0;
      setActiveFromScroll();
    });
  }, { passive: true });

  ["pointerdown", "touchstart", "wheel"].forEach((eventName) => {
    track.addEventListener(eventName, () => {
      isInteracting = true;
      pauseAutoplay();
    }, { passive: true });
  });

  carousel.addEventListener("pointerenter", () => {
    isPointerInside = true;
    pauseAutoplay(false);
  });

  carousel.addEventListener("pointerleave", () => {
    isPointerInside = false;
    startAutoplay();
  });

  carousel.addEventListener("focusin", () => {
    isFocusInside = true;
    pauseAutoplay(false);
  });

  carousel.addEventListener("focusout", () => {
    isFocusInside = carousel.contains(document.activeElement);
    if (!isFocusInside) {
      startAutoplay();
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      pauseAutoplay(false);
    } else {
      startAutoplay();
    }
  });

  reducedMotionQuery.addEventListener("change", (event) => {
    if (event.matches) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  updateCounter();

  if (carousel.hasAttribute("data-carousel-manual")) {
    return;
  }

  startAutoplay();
};

const boot = () => {
  document.querySelectorAll<HTMLElement>("[data-carousel]").forEach(initCarousel);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
