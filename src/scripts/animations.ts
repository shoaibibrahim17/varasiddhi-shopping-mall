import { animate, inView, scroll, stagger } from "motion";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

document.querySelectorAll<HTMLAnchorElement>("[data-mobile-nav-item]").forEach((link) => {
  link.addEventListener("click", () => {
    link.closest("details")?.removeAttribute("open");
  });
});

if (!prefersReducedMotion.matches) {
  const isMobile = window.matchMedia("(max-width: 47.99rem)").matches;
  const baseDistance = isMobile ? 14 : 26;
  const smallDistance = isMobile ? 10 : 18;
  const revealDuration = isMobile ? 0.52 : 0.68;
  const ease = [0.16, 1, 0.3, 1] as const;

  document.documentElement.classList.add("motion-ready");

  const setWillChange = (element: HTMLElement) => {
    element.style.willChange = "opacity, transform, clip-path";
  };

  const clearWillChange = (element: HTMLElement) => {
    element.style.willChange = "";
  };

  const hero = document.querySelector<HTMLElement>("[data-hero]");

  if (hero) {
    const heroText = [
      hero.querySelector<HTMLElement>("[data-hero-item]"),
      ...Array.from(hero.querySelectorAll<HTMLElement>("[data-hero-title-line]")),
      ...Array.from(hero.querySelectorAll<HTMLElement>("[data-hero-item]")).slice(1),
    ].filter(Boolean) as HTMLElement[];

    heroText.forEach((element) => {
      setWillChange(element);
      element.style.opacity = "0";
      element.style.transform = `translateY(${smallDistance}px)`;
      if (element.matches("[data-hero-title-line]")) {
        element.style.clipPath = "inset(0 0 100% 0)";
      }
    });

    animate(
      heroText,
      {
        opacity: 1,
        transform: "translateY(0px)",
        clipPath: "inset(0 0 0% 0)",
      },
      {
        delay: stagger(isMobile ? 0.045 : 0.07),
        duration: revealDuration,
        ease,
      },
    ).finished.then(() => heroText.forEach(clearWillChange));

    const heroImage = hero.querySelector<HTMLElement>("[data-hero-image]");
    if (heroImage) {
      setWillChange(heroImage);
      heroImage.style.clipPath = "inset(0 100% 0 0)";
      animate(
        heroImage,
        { clipPath: "inset(0 0% 0 0)" },
        { delay: isMobile ? 0.08 : 0.16, duration: 0.78, ease },
      ).finished.then(() => clearWillChange(heroImage));
    }
  }

  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
    setWillChange(element);
    element.style.opacity = "0";

    if (element.dataset.reveal === "title") {
      element.style.clipPath = "inset(0 0 100% 0)";
      element.style.transform = `translateY(${smallDistance}px)`;
    } else {
      element.style.transform = `translateY(${baseDistance}px)`;
    }

    inView(
      element,
      () => {
        animate(
          element,
          {
            opacity: 1,
            transform: "translateY(0px)",
            clipPath: "inset(0 0 0% 0)",
          },
          { duration: revealDuration, ease },
        ).finished.then(() => clearWillChange(element));
      },
      { margin: "0px 0px -12% 0px" },
    );
  });

  document.querySelectorAll<HTMLElement>("[data-image-reveal]").forEach((frame) => {
    setWillChange(frame);
    frame.style.opacity = "0";
    frame.style.clipPath = "inset(0 0 12% 0)";

    inView(
      frame,
      () => {
        animate(
          frame,
          {
            opacity: 1,
            clipPath: "inset(0 0 0% 0)",
          },
          { duration: isMobile ? 0.58 : 0.78, ease },
        ).finished.then(() => clearWillChange(frame));
      },
      { margin: "0px 0px -10% 0px" },
    );
  });

  document.querySelectorAll<HTMLElement>("[data-reveal-section]").forEach((section) => {
    const items = Array.from(section.querySelectorAll<HTMLElement>("[data-stagger-item]"));

    if (!items.length) {
      return;
    }

    items.forEach((item) => {
      setWillChange(item);
      item.style.opacity = "0";
      item.style.transform = `translateY(${baseDistance}px)`;
    });

    inView(
      section,
      () => {
        animate(
          items,
          { opacity: 1, transform: "translateY(0px)" },
          {
            delay: stagger(isMobile ? 0.04 : 0.065),
            duration: isMobile ? 0.5 : 0.62,
            ease,
          },
        ).finished.then(() => items.forEach(clearWillChange));
      },
      { margin: "0px 0px -18% 0px" },
    );
  });

  if (!isMobile) {
    document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((frame) => {
      scroll(
        animate(frame, { y: [-10, 10] }, { ease: "linear" }),
        {
          target: frame,
          offset: ["start end", "end start"],
        },
      );
    });
  }
}
