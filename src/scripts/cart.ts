import { site } from "../data/site";

export interface CartLine {
  id: string;
  qty: number;
}

export interface ClientProduct {
  title: string;
  category: string;
  group: string;
  thumb: string;
}

declare global {
  interface Window {
    __varasiddhiProducts?: Record<string, ClientProduct>;
  }
}

const STORAGE_KEY = "varasiddhi-cart-v1";

const readLines = (): CartLine[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const products = window.__varasiddhiProducts ?? {};
    return parsed.filter(
      (l: CartLine) =>
        typeof l.id === "string" &&
        typeof l.qty === "number" &&
        l.qty > 0 &&
        products[l.id],
    );
  } catch {
    return [];
  }
};

const writeLines = (lines: CartLine[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  render();
  emitChange();
};

const emitChange = () => {
  document.dispatchEvent(new CustomEvent("cart:changed"));
};

export const getCount = (): number =>
  readLines().reduce((sum, l) => sum + l.qty, 0);

export const getLines = (): CartLine[] => readLines();

export const add = (id: string, qty = 1) => {
  const lines = readLines();
  const existing = lines.find((l) => l.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    lines.push({ id, qty });
  }
  writeLines(lines);
};

export const setQty = (id: string, qty: number) => {
  const lines = readLines();
  const line = lines.find((l) => l.id === id);
  if (!line) return;
  if (qty <= 0) {
    writeLines(lines.filter((l) => l.id !== id));
  } else {
    line.qty = qty;
    writeLines(lines);
  }
};

export const remove = (id: string) => {
  writeLines(readLines().filter((l) => l.id !== id));
};

export const buildWhatsAppUrl = (paymentMethod: string): string => {
  const products = window.__varasiddhiProducts ?? {};
  const lines = readLines();
  if (!lines.length) return "#";

  const linesText = lines
    .map((l) => {
      const p = products[l.id];
      return `\u2022 ${l.qty} \u00D7 ${p?.title ?? l.id} (${p?.category ?? ""})`;
    })
    .join("\n");

  const method =
    paymentMethod === "online" ? "Online checkout when available" : "WhatsApp confirmation";

  const message = [
    `Namaste ${site.shortName}! I would like to enquire about these catalogue pieces:`,
    "",
    linesText,
    "",
    `Next step: ${method}`,
    "",
    "(Sent from the Varasiddhi website)",
  ].join("\n");

  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
};

/* ─── Drawer render + wiring ─── */

const products = (): Record<string, ClientProduct> =>
  window.__varasiddhiProducts ?? {};

const drawer = (): HTMLElement | null =>
  document.querySelector<HTMLElement>("[data-cart-drawer]");

const overlay = (): HTMLElement | null =>
  document.querySelector<HTMLElement>("[data-cart-overlay]");

let returnFocusTo: HTMLElement | null = null;

export const openDrawer = () => {
  const d = drawer();
  const o = overlay();
  if (!d || !o) return;
  returnFocusTo = document.activeElement as HTMLElement;
  d.hidden = false;
  o.hidden = false;
  requestAnimationFrame(() => {
    d.classList.add("is-open");
    o.classList.add("is-open");
  });
  document.body.style.overflow = "hidden";
  window.__varasiddhiLenis?.stop();
  d.querySelector<HTMLElement>("[data-cart-close]")?.focus();
};

export const closeDrawer = () => {
  const d = drawer();
  const o = overlay();
  if (!d || !o) return;
  d.classList.remove("is-open");
  o.classList.remove("is-open");
  setTimeout(() => {
    d.hidden = true;
    o.hidden = true;
  }, 280);
  document.body.style.overflow = "";
  window.__varasiddhiLenis?.start();
  returnFocusTo?.focus();
};

const render = () => {
  const lines = readLines();
  const allProducts = products();
  const container = document.querySelector<HTMLElement>("[data-cart-lines]");
  const emptyState = document.querySelector<HTMLElement>("[data-cart-empty]");
  const filledState = document.querySelector<HTMLElement>("[data-cart-filled]");
  const countBadge = document.querySelectorAll<HTMLElement>("[data-cart-count]");
  const totalCount = lines.reduce((s, l) => s + l.qty, 0);

  countBadge.forEach((el) => {
    const badge = el as HTMLElement;
    badge.textContent = String(totalCount);
    badge.hidden = totalCount === 0;
  });

  if (totalCount === 0) {
    if (emptyState) emptyState.hidden = false;
    if (filledState) filledState.hidden = true;
    return;
  }

  if (emptyState) emptyState.hidden = true;
  if (filledState) filledState.hidden = false;

  if (container) {
    container.innerHTML = lines
      .map((l) => {
        const p = allProducts[l.id];
        if (!p) return "";
        return `
        <div class="cart-line">
          <img class="cart-line__img" src="${p.thumb}" alt="" width="64" height="80" loading="lazy" />
          <div class="cart-line__info">
            <p class="cart-line__cat">${p.category}</p>
            <p class="cart-line__name">${p.title}</p>
            <div class="cart-line__qty">
              <button type="button" data-cart-dec="${l.id}" aria-label="Decrease quantity of ${p.title}">−</button>
              <span>${l.qty}</span>
              <button type="button" data-cart-inc="${l.id}" aria-label="Increase quantity of ${p.title}">+</button>
            </div>
          </div>
          <button type="button" class="cart-line__remove" data-cart-remove="${l.id}" aria-label="Remove ${p.title} from enquiry bag">&times;</button>
        </div>`;
      })
      .join("");
  }
};

/* ─── Event delegation ─── */

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  if (target.closest("[data-cart-open]")) {
    e.preventDefault();
    openDrawer();
  }

  if (
    target.closest("[data-cart-close]") ||
    target.closest("[data-cart-overlay]")
  ) {
    closeDrawer();
  }

  const addBtn = target.closest("[data-cart-add]");
  if (addBtn) {
    e.preventDefault();
    const id = addBtn.getAttribute("data-cart-add")!;
    add(id, 1);

    const btn = addBtn as HTMLButtonElement;
    const orig = btn.textContent;
    btn.textContent = "Added";
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = orig ?? "Add to enquiry";
      btn.disabled = false;
    }, 900);

    setTimeout(openDrawer, 350);
  }

  const incBtn = target.closest("[data-cart-inc]");
  if (incBtn) {
    const id = incBtn.getAttribute("data-cart-inc")!;
    const line = readLines().find((l) => l.id === id);
    if (line) setQty(id, line.qty + 1);
  }

  const decBtn = target.closest("[data-cart-dec]");
  if (decBtn) {
    const id = decBtn.getAttribute("data-cart-dec")!;
    const line = readLines().find((l) => l.id === id);
    if (line) setQty(id, line.qty - 1);
  }

  const removeBtn = target.closest("[data-cart-remove]");
  if (removeBtn) {
    const id = removeBtn.getAttribute("data-cart-remove")!;
    remove(id);
  }

  const checkoutBtn = target.closest("[data-cart-checkout]");
  if (checkoutBtn) {
    e.preventDefault();
    const method =
      (document.querySelector(
        'input[name="cart-payment"]:checked',
      ) as HTMLInputElement)?.value ?? "whatsapp";
    const url = buildWhatsAppUrl(method);
    if (url !== "#") window.open(url, "_blank", "noopener");
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

const boot = () => {
  const dataEl = document.querySelector<HTMLScriptElement>(
    'script[data-catalogue-data]',
  );
  if (dataEl) {
    try {
      window.__varasiddhiProducts = JSON.parse(dataEl.textContent ?? "{}");
    } catch {
      window.__varasiddhiProducts = {};
    }
  }
  render();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}


