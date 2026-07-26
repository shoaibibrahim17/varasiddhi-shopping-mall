import Lenis from "lenis";
import "lenis/dist/lenis.css";

type LenisInstance = InstanceType<typeof Lenis>;

declare global {
  interface Window {
    __varasiddhiLenis?: LenisInstance;
  }
}

const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

let lenis: LenisInstance | undefined;
let rafId = 0;

const shouldPrevent = (node: Element | null) => {
  return Boolean(
    node?.closest(
      "[data-lenis-prevent], [data-lenis-prevent-wheel], [data-lenis-prevent-touch], [data-carousel-track]",
    ),
  );
};

const stopLenis = () => {
  if (rafId) {
    window.cancelAnimationFrame(rafId);
    rafId = 0;
  }

  lenis?.destroy();
  lenis = undefined;
  window.__varasiddhiLenis = undefined;
  document.documentElement.removeAttribute("data-lenis");
};

const startLenis = () => {
  if (reducedMotionQuery.matches || lenis) {
    return;
  }

  lenis = new Lenis({
    anchors: true,
    duration: 0.82,
    easing: (time: number) => 1 - Math.pow(1 - time, 3),
    gestureOrientation: "vertical",
    orientation: "vertical",
    prevent: shouldPrevent,
    smoothWheel: true,
    syncTouch: false,
    touchMultiplier: 1,
    wheelMultiplier: 0.96,
  });

  window.__varasiddhiLenis = lenis;
  document.documentElement.dataset.lenis = "ready";

  const raf = (time: number) => {
    lenis?.raf(time);
    rafId = window.requestAnimationFrame(raf);
  };

  rafId = window.requestAnimationFrame(raf);
};

const boot = () => {
  if (reducedMotionQuery.matches) {
    stopLenis();
    return;
  }

  startLenis();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}

reducedMotionQuery.addEventListener("change", (event) => {
  if (event.matches) {
    stopLenis();
  } else {
    startLenis();
  }
});