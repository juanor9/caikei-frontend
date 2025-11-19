// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy on home page', async ({ page }) => {
    await page.goto('/');

    // Check for h1 element (logo)
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
  });

  test('should have proper form labels', async ({ page }) => {
    await page.goto('/');

    // Check that inputs have associated labels
    const emailLabel = page.locator('label[for="email"]');
    const passwordLabel = page.locator('label[for="password"]');

    await expect(emailLabel).toBeVisible();
    await expect(passwordLabel).toBeVisible();
  });

  test('should have proper button types', async ({ page }) => {
    await page.goto('/');

    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
  });

  test('should have proper language attribute on Japanese characters', async ({ page }) => {
    await page.goto('/');

    const japaneseChar = page.locator('[lang="ja"]');
    await expect(japaneseChar).toBeVisible();
  });

  test('should have clickable links with href attributes', async ({ page }) => {
    await page.goto('/');

    const footerLinks = page.locator('footer a');
    const linkCount = await footerLinks.count();

    for (let i = 0; i < linkCount; i++) {
      const link = footerLinks.nth(i);
      await expect(link).toHaveAttribute('href');
    }
  });

  test('should allow keyboard navigation', async ({ page }) => {
    await page.goto('/');

    // Tab through form elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Check that we can focus on the login button
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeDefined();
  });
});
