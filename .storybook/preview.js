import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import '../src/index.css';

// Create a mock store for Storybook
const createMockStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      user: (state = { userData: { publisher: '123' } }) => state,
      publisher: (state = {
        publisher: {
          name: 'Editorial Demo',
          logo: '',
          publisherIds: [{ type: 'NIT', number: '123456789' }],
          address: 'Calle 123',
          phone: '3001234567',
          email: 'demo@editorial.com'
        }
      }) => state,
      allLibraries: (state = { allLibraries: [] }) => state,
      book: (state = { book: {} }) => state,
      movements: (state = { movements: [] }) => state,
    },
    preloadedState,
  });
};

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <Provider store={createMockStore()}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </Provider>
    ),
  ],
};

export default preview;
