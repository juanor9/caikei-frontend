// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Authentication', () => {
  test('should show error modal on invalid login', async ({ page }) => {
    await page.goto('/');

    // Fill in invalid credentials
    await page.fill('input[name="email"]', 'invalid@email.com');
    await page.fill('input[name="password"]', 'wrongpassword');

    // Submit form
    await page.click('button[type="submit"]');

    // Should show error modal (may take a moment to appear)
    await expect(page.locator('.modal-container')).toBeVisible({ timeout: 5000 });
  });

  test('should require email field', async ({ page }) => {
    await page.goto('/');

    const emailInput = page.locator('input[name="email"]');
    await expect(emailInput).toHaveAttribute('required');
  });

  test('should require password field', async ({ page }) => {
    await page.goto('/');

    const passwordInput = page.locator('input[name="password"]');
    await expect(passwordInput).toHaveAttribute('required');
  });

  test('should have password field with correct type', async ({ page }) => {
    await page.goto('/');

    const passwordInput = page.locator('input[name="password"]');
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('should have autocomplete attributes', async ({ page }) => {
    await page.goto('/');

    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');

    await expect(emailInput).toHaveAttribute('autocomplete', 'username');
    await expect(passwordInput).toHaveAttribute('autocomplete', 'current-password');
  });
});
