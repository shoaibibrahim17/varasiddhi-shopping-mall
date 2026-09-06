const drawer = (): HTMLElement | null =>
  document.querySelector<HTMLElement>("[data-mobile-drawer]");

const openDrawer = () => {
  const d = drawer();
  if (!d) return;
  d.hidden = false;
  requestAnimationFrame(() => d.classList.add("is-open"));
  document.body.style.overflow = "hidden";
  window.__varasiddhiLenis?.stop();
  d.querySelector<HTMLElement>("[data-menu-close]")?.focus();
};

const closeDrawer = () => {
  const d = drawer();
  if (!d) return;
  d.classList.remove("is-open");
  setTimeout(() => {
    d.hidden = true;
  }, 300);
  document.body.style.overflow = "";
  window.__varasiddhiLenis?.start();
};

export const boot = () => {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    if (target.closest("[data-menu-open]")) {
      e.preventDefault();
      openDrawer();
    }

    if (
      target.closest("[data-menu-close]") ||
      target.closest("[data-mobile-overlay]")
    ) {
      closeDrawer();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const d = drawer();
      if (d && !d.hidden) {
        e.preventDefault();
        closeDrawer();
      }
    }
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
