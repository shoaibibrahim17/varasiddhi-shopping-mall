import { animate, inView, scroll, stagger } from "motion";

const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const mobileQuery = window.matchMedia("(max-width: 47.99rem)");

type WatchedReveal = {
  element: HTMLElement;
  run: () => void;
  threshold: number;
};

const setupMobileMenu = () => {
  document.querySelectorAll<HTMLDetailsElement>("details[data-mobile-menu]").forEach((menu) => {
    const summary = menu.querySelector<HTMLElement>("summary");
    if (!summary) {
      return;
    }

    const syncExpandedState = () => {
      summary.setAttribute("aria-expanded", menu.open ? "true" : "false");
    };

    menu.addEventListener("toggle", syncExpandedState);
    syncExpandedState();
  });

  document.querySelectorAll<HTMLAnchorElement>("[data-mobile-nav-item]").forEach((link) => {
    link.addEventListener("click", () => {
      link.closest("details")?.removeAttribute("open");
    });
  });
};

setupMobileMenu();

if (!reducedMotionQuery.matches) {
  const isMobile = mobileQuery.matches;
  const distance = isMobile ? 14 : 26;
  const titleDistance = isMobile ? 10 : 18;
  const duration = isMobile ? 0.56 : 0.72;
  const ease = [0.16, 1, 0.3, 1] as const;
  const revealWatchers: WatchedReveal[] = [];
  let revealTicking = false;

  document.documentElement.classList.add("motion-ready");

  const isWithinViewport = (element: HTMLElement, threshold = 0.92) => {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight * threshold && rect.bottom >= window.innerHeight * 0.04;
  };

  const checkRevealWatchers = () => {
    revealTicking = false;

    for (let index = revealWatchers.length - 1; index >= 0; index -= 1) {
      const watcher = revealWatchers[index];

      if (isWithinViewport(watcher.element, watcher.threshold)) {
        watcher.run();
        revealWatchers.splice(index, 1);
      }
    }
  };

  const queueRevealCheck = () => {
    if (revealTicking || !revealWatchers.length) {
      return;
    }

    revealTicking = true;
    requestAnimationFrame(checkRevealWatchers);
  };

  window.addEventListener("scroll", queueRevealCheck, { passive: true });
  window.addEventListener("resize", queueRevealCheck, { passive: true });

  const watchOnce = (element: HTMLElement, callback: () => void, threshold = 0.9) => {
    let complete = false;
    let stopInView: (() => void) | undefined;

    const run = () => {
      if (complete) {
        return;
      }

      complete = true;
      stopInView?.();
      callback();
    };

    stopInView = inView(element, run, { margin: "0px 0px -8% 0px" });

    if (isWithinViewport(element, threshold)) {
      requestAnimationFrame(run);
      return;
    }

    revealWatchers.push({ element, run, threshold });
  };

  const setWillChange = (element: HTMLElement) => {
    element.style.willChange = "opacity, transform, clip-path";
  };

  const clearWillChange = (element: HTMLElement) => {
    element.style.willChange = "";
  };

  const reveal = (element: HTMLElement, keyframes: Record<string, string | number>) => {
    animate(element, keyframes, { duration, ease }).finished.then(() => clearWillChange(element));
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
      element.style.transform = `translateY(${titleDistance}px)`;
      if (element.matches("[data-hero-title-line]")) {
        element.style.clipPath = "inset(0 0 105% 0)";
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
        delay: stagger(isMobile ? 0.04 : 0.055),
        duration: isMobile ? 0.52 : 0.66,
        ease,
      },
    ).finished.then(() => heroText.forEach(clearWillChange));

    const heroImage = hero.querySelector<HTMLElement>("[data-hero-image]");
    if (heroImage) {
      setWillChange(heroImage);
      heroImage.style.opacity = "0";
      heroImage.style.clipPath = "inset(0 18% 0 0)";
      animate(
        heroImage,
        { opacity: 1, clipPath: "inset(0 0% 0 0)" },
        { delay: isMobile ? 0.06 : 0.12, duration: isMobile ? 0.58 : 0.78, ease },
      ).finished.then(() => clearWillChange(heroImage));
    }
  }

  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
    const mode = element.dataset.reveal;
    setWillChange(element);
    element.style.opacity = "0";

    if (mode === "title") {
      element.style.overflow = "hidden";
      element.style.clipPath = "inset(0 0 105% 0)";
      element.style.transform = `translateY(${titleDistance}px)`;
    } else if (mode === "fade") {
      element.style.transform = "translateY(0px)";
    } else {
      element.style.transform = `translateY(${distance}px)`;
    }

    watchOnce(element, () => {
      reveal(element, {
        opacity: 1,
        transform: "translateY(0px)",
        clipPath: "inset(0 0 0% 0)",
      });
    });
  });

  document.querySelectorAll<HTMLElement>("[data-image-reveal]").forEach((frame) => {
    setWillChange(frame);
    frame.style.opacity = "0";
    frame.style.clipPath = "inset(0 0 10% 0)";

    watchOnce(
      frame,
      () => {
        animate(
          frame,
          {
            opacity: 1,
            clipPath: "inset(0 0 0% 0)",
          },
          { duration: isMobile ? 0.54 : 0.78, ease },
        ).finished.then(() => clearWillChange(frame));
      },
      0.9,
    );
  });

  document.querySelectorAll<HTMLElement>("[data-stagger], [data-reveal-section]").forEach((section) => {
    const items = Array.from(section.querySelectorAll<HTMLElement>("[data-stagger-item]"));

    if (!items.length) {
      return;
    }

    items.forEach((item) => {
      setWillChange(item);
      item.style.opacity = "0";
      item.style.transform = `translateY(${distance}px)`;
    });

    watchOnce(
      section,
      () => {
        animate(
          items,
          { opacity: 1, transform: "translateY(0px)" },
          {
            delay: stagger(isMobile ? 0.035 : 0.055),
            duration: isMobile ? 0.48 : 0.62,
            ease,
          },
        ).finished.then(() => items.forEach(clearWillChange));
      },
      0.86,
    );
  });

  requestAnimationFrame(checkRevealWatchers);
  window.setTimeout(queueRevealCheck, 500);

  if (!isMobile) {
    document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((frame) => {
      const target = frame.querySelector<HTMLElement>("img") ?? frame;
      target.style.setProperty("--parallax-y", "0px");
      scroll(
        animate(
          target,
          { "--parallax-y": ["-12px", "12px"] } as Record<string, string[]>,
          { ease: "linear" },
        ),
        {
          target: frame,
          offset: ["start end", "end start"],
        },
      );
    });
  }
}
