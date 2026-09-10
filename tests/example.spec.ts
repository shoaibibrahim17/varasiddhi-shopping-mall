import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:4321';

test('homepage has Varasiddhi title', async ({ page }) => {
  await page.goto(BASE);
  await expect(page).toHaveTitle(/Shri Varasiddhi Shopping Mall/);
});
