// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Home Page', () => {
  test('should display the logo', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('text=Caikei')).toBeVisible();
  });

  test('should display login form', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

  test('should have login button', async ({ page }) => {
    await page.goto('/');

    const loginButton = page.locator('button[type="submit"]');
    await expect(loginButton).toBeVisible();
  });

  test('should display footer with links', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('text=Tanuki SAS')).toBeVisible();
  });

  test('should navigate to terms and conditions', async ({ page }) => {
    await page.goto('/');

    await page.click('text=Terminos y condiciones');
    await expect(page).toHaveURL('/terms-and-conditions');
  });

  test('should navigate to privacy policy', async ({ page }) => {
    await page.goto('/');

    await page.click('text=Politica de privacidad');
    await expect(page).toHaveURL('/privacy');
  });
});
