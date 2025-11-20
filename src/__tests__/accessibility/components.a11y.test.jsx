/**
 * Accessibility Tests for Components
 * Uses jest-axe to test components for WCAG compliance
 */
import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { configureStore } from '@reduxjs/toolkit';

// Mock react-router-dom before importing components
jest.mock('react-router-dom');

// Import components
import Logo from '../../components/Logo/Logo';
import Footer from '../../components/Footer/Footer';
import Modal from '../../components/Modal/Modal';
import EditableField from '../../components/EditableField';
import BookCard from '../../feature/books/components/BookCard/BookCard';
import LibraryCard from '../../feature/libraries/components/LibraryCard/LibraryCard';
import InventoryItemCard from '../../feature/libraries/components/InventoryItemCard/InventoryItemCard';
import PlanCard from '../../feature/plans/components/PlanCard/PlanCard';

// Create mock store
const createMockStore = (initialState = {}) => configureStore({
  reducer: {
    user: (state = { user: {}, userToken: null }) => state,
    publisher: (state = { publisher: {} }) => state,
    book: (state = { book: {}, books: [] }) => state,
    library: (state = { libraries: [] }) => state,
    movement: (state = { movements: [] }) => state,
    ...initialState,
  },
});

// Wrapper component for tests
const TestWrapper = ({ children }) => (
  <Provider store={createMockStore()}>
    <MemoryRouter>
      {children}
    </MemoryRouter>
  </Provider>
);

describe('Component Accessibility Tests', () => {
  describe('Logo', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <TestWrapper>
          <Logo />
        </TestWrapper>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Footer', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <TestWrapper>
          <Footer />
        </TestWrapper>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Modal', () => {
    it('should have no accessibility violations when open', async () => {
      const { container } = render(
        <TestWrapper>
          <Modal isOpen onClose={() => {}}>
            <h2>Modal Title</h2>
            <p>Modal content</p>
          </Modal>
        </TestWrapper>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('EditableField', () => {
    it('should have no accessibility violations in read mode', async () => {
      const { container } = render(
        <TestWrapper>
          <EditableField
            label="Test Field"
            name="testField"
            type="text"
            defaultValue="Test value"
            readOnly
            onChange={() => {}}
          />
        </TestWrapper>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations in edit mode', async () => {
      const { container } = render(
        <TestWrapper>
          <EditableField
            label="Test Field"
            name="testField"
            type="text"
            defaultValue="Test value"
            readOnly={false}
            onChange={() => {}}
          />
        </TestWrapper>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('BookCard', () => {
    it('should have no accessibility violations', async () => {
      const mockBook = {
        _id: '1',
        title: 'Test Book',
        cover: 'https://example.com/cover.jpg',
        isbn: '1234567890',
        price: 29.99,
      };

      const { container } = render(
        <TestWrapper>
          <BookCard
            id={mockBook._id}
            title={mockBook.title}
            cover={mockBook.cover}
            isbn={mockBook.isbn}
            price={mockBook.price}
          />
        </TestWrapper>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('LibraryCard', () => {
    it('should have no accessibility violations', async () => {
      const mockLibrary = {
        _id: '1',
        name: 'Test Library',
        city: 'Test City',
      };

      const { container } = render(
        <TestWrapper>
          <LibraryCard
            id={mockLibrary._id}
            name={mockLibrary.name}
            city={mockLibrary.city}
          />
        </TestWrapper>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('InventoryItemCard', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <TestWrapper>
          <InventoryItemCard
            name="Test Location"
            copies={50}
          />
        </TestWrapper>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('PlanCard', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <TestWrapper>
          <PlanCard
            plan="Plan Básico"
            cost={10000}
            titles={10}
          />
        </TestWrapper>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe('Form Accessibility Tests', () => {
  describe('Input Fields', () => {
    it('text input should have no accessibility violations', async () => {
      const { container } = render(
        <TestWrapper>
          <form>
            <label htmlFor="test-input">
              Test Label
              <input id="test-input" type="text" name="test" />
            </label>
          </form>
        </TestWrapper>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('select should have no accessibility violations', async () => {
      const { container } = render(
        <TestWrapper>
          <form>
            <label htmlFor="test-select">
              Test Select
              <select id="test-select" name="test">
                <option value="">Select an option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
              </select>
            </label>
          </form>
        </TestWrapper>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe('Interactive Element Accessibility Tests', () => {
  describe('Buttons', () => {
    it('button should have no accessibility violations', async () => {
      const { container } = render(
        <TestWrapper>
          <button type="button">Click me</button>
        </TestWrapper>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('submit button should have no accessibility violations', async () => {
      const { container } = render(
        <TestWrapper>
          <form>
            <button type="submit">Submit</button>
          </form>
        </TestWrapper>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Links', () => {
    it('link should have no accessibility violations', async () => {
      const { container } = render(
        <TestWrapper>
          <a href="/test">Test Link</a>
        </TestWrapper>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
