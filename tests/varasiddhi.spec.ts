import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:4321';

test.describe('Homepage', () => {
  test('renders announcement bar + header + hero + product rails', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('.announcement-bar')).toBeVisible();
    await expect(page.locator('.site-header')).toBeVisible();
    await expect(page.locator('.hero')).toBeVisible();
    await expect(page.locator('.circle-nav')).toBeVisible();
    await expect(page.locator('.product-rail').first()).toBeVisible();
  });

  test('category circles have correct links', async ({ page }) => {
    await page.goto(BASE);
    const circles = page.locator('.circle-nav__link');
    await expect(circles).toHaveCount(8);
    await expect(circles.first()).toHaveAttribute('href', '/sarees');
  });
});

test.describe('Cart flow', () => {
  test('add to cart button exists and is clickable', async ({ page }) => {
    await page.goto(BASE + '/catalogue');
    const addBtn = page.locator('[data-cart-add]').first();
    await expect(addBtn).toBeVisible();
    await expect(addBtn).toHaveText('Add to cart');
    await addBtn.click();
    // Button text should change briefly to "Added ✓" — wait for cart state update
    await page.waitForFunction(() => {
      const badge = document.querySelector('[data-cart-count]');
      return badge && !badge.hidden;
    }, { timeout: 5000 });
  });

  test('cart count badge updates after add', async ({ page }) => {
    await page.goto(BASE + '/catalogue');
    const badge = page.locator('[data-cart-count]').first();
    // Badge starts hidden
    await page.locator('[data-cart-add]').first().click();
    // Wait for cart store to update
    await page.waitForFunction(() => {
      const el = document.querySelector('[data-cart-count]');
      return el && !el.hidden;
    }, { timeout: 5000 });
    await expect(badge).toContainText('1');
  });

  test('qty increment/decrement in drawer', async ({ page }) => {
    await page.goto(BASE + '/catalogue');
    await page.locator('[data-cart-add]').first().click();
    // Wait for drawer to open
    await page.waitForFunction(() => {
      const drawer = document.querySelector('[data-cart-drawer]');
      return drawer && !drawer.hidden;
    }, { timeout: 5000 });
    await page.waitForSelector('.cart-line');

    // Increment
    await page.locator('[data-cart-inc]').first().click();
    const qty = page.locator('.cart-line__qty span').first();
    await expect(qty).toHaveText('2');

    // Decrement
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
  test('mobile: header shows cart + menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE);
    await expect(page.locator('.header-cart').first()).toBeVisible();
    await expect(page.locator('.mobile-menu')).toBeVisible();
  });

  test('desktop: full nav + cart visible', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE);
    await expect(page.locator('.desktop-nav--left')).toBeVisible();
    await expect(page.locator('.header-cart').first()).toBeVisible();
  });
});
