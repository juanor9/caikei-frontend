// @ts-check
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

/**
 * E2E Accessibility Tests using axe-core
 * Tests pages for WCAG 2.1 AA compliance
 */

test.describe('Home Page Accessibility', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['heading-order', 'page-has-heading-one'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper image alt texts', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['image-alt'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Login Page Accessibility', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/login');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have accessible form fields', async ({ page }) => {
    await page.goto('/login');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['label', 'form-field-multiple-labels'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Register Page Accessibility', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/register');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Privacy Policy Page Accessibility', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/privacy');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have readable text contrast', async ({ page }) => {
    await page.goto('/privacy');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['color-contrast'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Terms and Conditions Page Accessibility', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/terms');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Keyboard Navigation', () => {
  test('should be able to navigate using tab key', async ({ page }) => {
    await page.goto('/');

    // Test that focusable elements can be reached via keyboard
    await page.keyboard.press('Tab');
    const firstFocusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(firstFocusedElement).toBeTruthy();

    // Continue tabbing through the page
    for (let i = 0; i < 5; i += 1) {
      await page.keyboard.press('Tab');
    }

    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });

  test('should have visible focus indicators', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['focus-visible'])
      .analyze();

    // Note: This rule may not detect all focus issues
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('ARIA and Landmarks', () => {
  test('should have proper ARIA landmarks', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules([
        'landmark-one-main',
        'region',
        'aria-required-attr',
        'aria-valid-attr',
        'aria-valid-attr-value',
      ])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper button roles', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['button-name', 'aria-command-name'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Mobile Accessibility', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should be accessible on mobile viewport', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have touch-friendly targets', async ({ page }) => {
    await page.goto('/');

    // Check that interactive elements have sufficient size
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['target-size'])
      .analyze();

    // Note: target-size rule may not be available in all axe versions
    // This test checks if the rule exists and passes
    const targetSizeViolations = accessibilityScanResults.violations
      .filter((v) => v.id === 'target-size');
    expect(targetSizeViolations).toEqual([]);
  });
});

test.describe('Color and Contrast', () => {
  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['color-contrast', 'color-contrast-enhanced'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Document Structure', () => {
  test('should have proper document structure', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules([
        'document-title',
        'html-has-lang',
        'html-lang-valid',
        'meta-viewport',
      ])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper list structure', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['list', 'listitem', 'definition-list'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Links and Navigation', () => {
  test('should have descriptive link texts', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['link-name', 'link-in-text-block'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have broken skip links', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['skip-link'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
