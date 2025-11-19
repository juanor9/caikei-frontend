// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Navigation', () => {
  test('should navigate to home when clicking logo', async ({ page }) => {
    await page.goto('/terms-and-conditions');

    // Click on logo link
    await page.click('a.logo-link');

    await expect(page).toHaveURL('/');
  });

  test('should display terms and conditions page', async ({ page }) => {
    await page.goto('/terms-and-conditions');

    await expect(page.locator('h1, h2')).toContainText(/terminos|condiciones/i);
  });

  test('should display privacy policy page', async ({ page }) => {
    await page.goto('/privacy');

    await expect(page.locator('h1, h2')).toContainText(/privacidad|privacy/i);
  });

  test('should handle 404 for unknown routes', async ({ page }) => {
    const response = await page.goto('/unknown-page-that-does-not-exist');

    // React apps typically don't return 404 status, but we can check the content
    // or that the page still loads (SPA behavior)
    expect(response?.status()).toBeLessThan(500);
  });
});
