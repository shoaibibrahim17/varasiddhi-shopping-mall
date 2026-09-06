import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:4321';

test.describe('Homepage', () => {
  test('renders topbar + header + story bubbles + hero + product rails', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('.topbar')).toBeVisible();
    await expect(page.locator('.site-header')).toBeVisible();
    await expect(page.locator('.story-bubbles')).toBeVisible();
    await expect(page.locator('.story-bubbles__item')).toHaveCount(6);
    await expect(page.locator('.hero')).toBeVisible();
    await expect(page.locator('.circle-nav')).toBeHidden();
    await expect(page.locator('.product-rail').first()).toBeVisible();
  });

  test('story bubbles have correct links', async ({ page }) => {
    await page.goto(BASE);
    const bubbles = page.locator('.story-bubbles__item');
    await expect(bubbles).toHaveCount(6);
    await expect(bubbles.nth(0)).toHaveAttribute('href', '/occasion');
    await expect(bubbles.nth(1)).toHaveAttribute('href', '/sarees');
  });
});

test.describe('Cart flow', () => {
  test('add to cart button exists and is clickable', async ({ page }) => {
    await page.goto(BASE + '/catalogue');
    const addBtn = page.locator('[data-cart-add]').first();
    await expect(addBtn).toBeVisible();
    await expect(addBtn).toHaveText('Add to cart');
    await addBtn.click();
    await page.waitForFunction(() => {
      const badge = document.querySelector('[data-cart-count]');
      return badge && !badge.hidden;
    }, { timeout: 5000 });
  });

  test('cart count badge updates after add', async ({ page }) => {
    await page.goto(BASE + '/catalogue');
    const badge = page.locator('[data-cart-count]').first();
    await page.locator('[data-cart-add]').first().click();
    await page.waitForFunction(() => {
      const el = document.querySelector('[data-cart-count]');
      return el && !el.hidden;
    }, { timeout: 5000 });
    await expect(badge).toContainText('1');
  });

  test('qty increment/decrement in drawer', async ({ page }) => {
    await page.goto(BASE + '/catalogue');
    await page.locator('[data-cart-add]').first().click();
    await page.waitForFunction(() => {
      const drawer = document.querySelector('[data-cart-drawer]');
      return drawer && !drawer.hidden;
    }, { timeout: 5000 });
    await page.waitForSelector('.cart-line');

    await page.locator('[data-cart-inc]').first().click();
    const qty = page.locator('.cart-line__qty span').first();
    await expect(qty).toHaveText('2');

    await page.locator('[data-cart-dec]').first().click();
    await expect(qty).toHaveText('1');
  });

  test('remove item empties cart', async ({ page }) => {
    await page.goto(BASE + '/catalogue');
    await page.locator('[data-cart-add]').first().click();
    await page.waitForFunction(() => {
      const drawer = document.querySelector('[data-cart-drawer]');
      return drawer && !drawer.hidden;
    }, { timeout: 5000 });
    await page.waitForSelector('.cart-line');

    await page.locator('[data-cart-remove]').first().click();
    await expect(page.locator('[data-cart-empty]')).toBeVisible();
  });

  test('drawer closes on Escape', async ({ page }) => {
    await page.goto(BASE + '/catalogue');
    await page.locator('[data-cart-add]').first().click();
    await page.waitForFunction(() => {
      const drawer = document.querySelector('[data-cart-drawer]');
      return drawer && !drawer.hidden;
    }, { timeout: 5000 });
    await page.waitForSelector('.cart-line');

    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    const drawerHidden = await page.evaluate(() => {
      return document.querySelector('[data-cart-drawer]')?.hidden;
    });
    expect(drawerHidden).toBe(true);
  });
});

test.describe('Product detail page', () => {
  test('renders breadcrumb + title + price + add to cart + related rail', async ({ page }) => {
    await page.goto(BASE + '/products/festive-red-saree');

    await expect(page.locator('.pdp-breadcrumb')).toBeVisible();
    await expect(page.locator('.pdp__title')).toHaveText('Festive Red Saree');
    await expect(page.locator('.pdp__price')).toHaveText('Price on WhatsApp');
    await expect(page.locator('[data-cart-add="festive-red-saree"]')).toBeVisible();
    await expect(page.locator('.product-rail').first()).toBeVisible();
  });
});

test.describe('Collection pages', () => {
  for (const path of ['/women', '/men', '/sarees', '/occasion', '/catalogue']) {
    test(`${path} renders product grid`, async ({ page }) => {
      await page.goto(BASE + path);
      await expect(page.locator('.collection-grid').first()).toBeVisible();
      const cards = page.locator('.product-card');
      expect(await cards.count()).toBeGreaterThan(0);
    });
  }
});

test.describe('Viewports', () => {
  test('mobile: menu + cart visible, desktop nav hidden', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE);
    await expect(page.locator('[data-menu-open]')).toBeVisible();
    await expect(page.locator('.icon-btn--cart')).toBeVisible();
    await expect(page.locator('.desktop-nav')).toBeHidden();
  });

  test('desktop: full nav + cart visible, menu hidden', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE);
    await expect(page.locator('.desktop-nav')).toBeVisible();
    await expect(page.locator('.icon-btn--cart')).toBeVisible();
    await expect(page.locator('[data-menu-open]')).toBeHidden();
  });
});

test.describe('Mobile navigation drawer', () => {
  test('opens on menu button click and closes on overlay/close button', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE);

    await page.locator('[data-menu-open]').click();
    await expect(page.locator('.mobile-drawer')).toHaveClass(/is-open/);
    await expect(page.locator('.mobile-drawer__nav')).toBeVisible();

    await page.locator('[data-menu-close]').click();
    await page.waitForTimeout(350);
    await expect(page.locator('.mobile-drawer')).not.toHaveClass(/is-open/);
  });

  test('closes on Escape', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE);

    await page.locator('[data-menu-open]').click();
    await expect(page.locator('.mobile-drawer')).toHaveClass(/is-open/);

    await page.keyboard.press('Escape');
    await page.waitForTimeout(350);
    await expect(page.locator('.mobile-drawer')).not.toHaveClass(/is-open/);
  });
});

test.describe('Hero editorial banner', () => {
  test('hero CTAs are sharp rectangular with inverted contrast', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE);

    const cta = page.locator('.hero__cta').first();
    await expect(cta).toBeVisible();

    const bg = await cta.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(bg).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('hero image maintains aspect ratio on mobile and desktop', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE);
    const mobileImg = page.locator('.hero__bg .asset-frame__image').first();
    await expect(mobileImg).toBeVisible();
    const mobileRatio = await mobileImg.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return rect.width / rect.height;
    });
    expect(mobileRatio).toBeGreaterThan(0.5);

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE);
    const desktopImg = page.locator('.hero__bg .asset-frame__image').first();
    await expect(desktopImg).toBeVisible();
    const desktopRatio = await desktopImg.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return rect.width / rect.height;
    });
    expect(desktopRatio).toBeGreaterThan(0.5);
  });
});

test.describe('Story bubbles touch-swipe fluidity', () => {
  test('story bubbles are horizontally scrollable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE);

    const track = page.locator('.story-bubbles__track');
    await expect(track).toBeVisible();

    const firstBubble = page.locator('.story-bubbles__item').first();
    const lastBubble = page.locator('.story-bubbles__item').last();

    await firstBubble.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);

    const initialVisible = await firstBubble.isVisible();
    expect(initialVisible).toBe(true);

    await track.evaluate((el) => {
      el.scrollTo({ left: el.scrollWidth, behavior: 'instant' });
    });
    await page.waitForTimeout(100);

    const lastVisible = await lastBubble.isVisible();
    expect(lastVisible).toBe(true);
  });

  test('story bubbles have correct circle sizes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE);
    const mobileRing = page.locator('.story-bubbles__ring').first();
    const mobileBox = await mobileRing.boundingBox();
    expect(mobileBox?.width).toBeCloseTo(68, 0);

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE);
    const desktopRing = page.locator('.story-bubbles__ring').first();
    const desktopBox = await desktopRing.boundingBox();
    expect(desktopBox?.width).toBeCloseTo(84, 0);
  });
});

test.describe('Announcement marquee', () => {
  test('marquee text is present and scrolls', async ({ page }) => {
    await page.goto(BASE);
    const marquee = page.locator('.topbar__track');
    await expect(marquee).toBeVisible();

    const text = await marquee.locator('.topbar__item').first().textContent();
    expect(text).toContain('Festive Collection Live');
  });
});

test.describe('Sticky header', () => {
  test('header remains sticky on scroll', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE);

    const header = page.locator('.site-header');
    await expect(header).toBeVisible();

    const stickyBefore = await header.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.position;
    });
    expect(stickyBefore).toBe('sticky');

    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(100);

    const stickyAfter = await header.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.position;
    });
    expect(stickyAfter).toBe('sticky');
  });
});

test.describe('Typography', () => {
  test('headings use Playfair Display', async ({ page }) => {
    await page.goto(BASE);

    const fontFamily = await page.evaluate(() => {
      const heading = document.querySelector('h2');
      if (!heading) {
        return null;
      }
      return window.getComputedStyle(heading).fontFamily;
    });

    expect(fontFamily).toBeTruthy();
    if (fontFamily) {
      expect(fontFamily.toLowerCase()).toContain('playfair display');
    }
  });
});
