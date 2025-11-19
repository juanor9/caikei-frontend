/**
 * Accessibility Testing Utilities
 * Helper functions for testing components with axe-core
 */
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

/**
 * Run axe accessibility tests on a container
 * @param {HTMLElement} container - The DOM element to test
 * @param {Object} options - axe-core configuration options
 * @returns {Promise} - axe results
 */
export const checkA11y = async (container, options = {}) => {
  const defaultOptions = {
    rules: {
      // Disable rules that may cause false positives in test environment
      'color-contrast': { enabled: false },
      region: { enabled: false },
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    rules: {
      ...defaultOptions.rules,
      ...options.rules,
    },
  };

  const results = await axe(container, mergedOptions);
  return results;
};

/**
 * Run axe accessibility tests and expect no violations
 * @param {HTMLElement} container - The DOM element to test
 * @param {Object} options - axe-core configuration options
 */
export const expectNoA11yViolations = async (container, options = {}) => {
  const results = await checkA11y(container, options);
  expect(results).toHaveNoViolations();
};

/**
 * Run axe accessibility tests with WCAG 2.1 AA standards
 * @param {HTMLElement} container - The DOM element to test
 * @returns {Promise} - axe results
 */
export const checkWCAG21AA = async (container) => {
  const results = await axe(container, {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
    },
  });
  return results;
};

/**
 * Get a formatted report of accessibility violations
 * @param {Array} violations - Array of axe violations
 * @returns {string} - Formatted report
 */
export const formatViolationsReport = (violations) => {
  if (!violations || violations.length === 0) {
    return 'No accessibility violations found';
  }

  return violations.map((violation) => {
    const nodes = violation.nodes.map((node) => `    - ${node.html}`).join('\n');
    return `
[${violation.impact?.toUpperCase()}] ${violation.id}: ${violation.description}
  Help: ${violation.helpUrl}
  Affected nodes:
${nodes}
`;
  }).join('\n');
};

/**
 * Custom axe configuration for testing forms
 */
export const formA11yConfig = {
  rules: {
    label: { enabled: true },
    'form-field-multiple-labels': { enabled: true },
    'autocomplete-valid': { enabled: true },
  },
};

/**
 * Custom axe configuration for testing interactive elements
 */
export const interactiveA11yConfig = {
  rules: {
    'button-name': { enabled: true },
    'link-name': { enabled: true },
    'aria-command-name': { enabled: true },
    'focus-visible': { enabled: true },
  },
};

/**
 * Custom axe configuration for testing images
 */
export const imageA11yConfig = {
  rules: {
    'image-alt': { enabled: true },
    'image-redundant-alt': { enabled: true },
    'svg-img-alt': { enabled: true },
  },
};

export default {
  checkA11y,
  expectNoA11yViolations,
  checkWCAG21AA,
  formatViolationsReport,
  formA11yConfig,
  interactiveA11yConfig,
  imageA11yConfig,
};
