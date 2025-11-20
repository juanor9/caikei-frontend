import React from 'react';

const actualReactRouterDom = jest.requireActual('react-router');

module.exports = {
  ...actualReactRouterDom,
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>,
  Navigate: ({ to }) => <div>Navigate to {to}</div>,
  useNavigate: () => jest.fn(),
  useParams: () => ({}),
  useLocation: () => ({ pathname: '/', search: '', hash: '', state: null }),
  useSearchParams: () => [new URLSearchParams(), jest.fn()],
};
