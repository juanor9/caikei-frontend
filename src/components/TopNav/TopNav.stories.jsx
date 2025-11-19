import TopNav from './TopNav';

export default {
  title: 'Components/TopNav',
  component: TopNav,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export const LoggedIn = {
  decorators: [
    (Story) => {
      localStorage.setItem('login-token', 'mock-token');
      return <Story />;
    },
  ],
};

export const LoggedOut = {
  decorators: [
    (Story) => {
      localStorage.removeItem('login-token');
      return <Story />;
    },
  ],
};
