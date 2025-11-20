// jest-dom adds custom jest matchers for asserting on DOM nodes.
import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';
import { TextEncoder, TextDecoder } from 'util';

// Add jest-axe matchers for accessibility testing
expect.extend(toHaveNoViolations);

// Polyfill for TextEncoder/TextDecoder (required for react-router v7)
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock fetch
global.fetch = jest.fn();

// Reset mocks before each test
beforeEach(() => {
  // Reset localStorage mocks before clearing all mocks
  if (localStorage.getItem && typeof localStorage.getItem.mockReturnValue === 'function') {
    localStorage.getItem.mockReturnValue(null);
  }
});
