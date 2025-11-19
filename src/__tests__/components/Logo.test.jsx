import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Logo', () => {
  it('should render logo text', () => {
    renderWithRouter(<Logo />);

    expect(screen.getByText(/caikei/i)).toBeInTheDocument();
  });

  it('should render link to home page', () => {
    renderWithRouter(<Logo />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });

  it('should render Japanese character', () => {
    renderWithRouter(<Logo />);

    const japaneseChar = screen.getByText('計');
    expect(japaneseChar).toBeInTheDocument();
    expect(japaneseChar).toHaveAttribute('lang', 'ja');
  });

  it('should render heading element', () => {
    renderWithRouter(<Logo />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
