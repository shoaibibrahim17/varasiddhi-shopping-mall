import Lenis from "lenis";
import "lenis/dist/lenis.css";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!prefersReducedMotion.matches) {
  const lenis = new Lenis({
    anchors: true,
    duration: 0.95,
    easing: (time: number) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
    gestureOrientation: "vertical",
    orientation: "vertical",
    smoothWheel: true,
    syncTouch: false,
    touchMultiplier: 1,
    wheelMultiplier: 0.82,
    prevent: (node: Element) => Boolean(node.closest("[data-lenis-prevent]")),
  });

  const raf = (time: number) => {
    lenis.raf(time);
    window.requestAnimationFrame(raf);
  };

  window.requestAnimationFrame(raf);

  prefersReducedMotion.addEventListener("change", (event) => {
    if (event.matches) {
      lenis.destroy();
    }
  });
}
