import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Footer', () => {
  it('should render footer element', () => {
    renderWithRouter(<Footer />);

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should render logo text', () => {
    renderWithRouter(<Footer />);

    expect(screen.getByText(/caikei/i)).toBeInTheDocument();
  });

  it('should render copyright text', () => {
    renderWithRouter(<Footer />);

    expect(screen.getByText(/tanuki sas/i)).toBeInTheDocument();
  });

  it('should render version number', () => {
    renderWithRouter(<Footer />);

    expect(screen.getByText(/v\. 1\.0\.1/i)).toBeInTheDocument();
  });

  it('should render terms and conditions link', () => {
    renderWithRouter(<Footer />);

    const link = screen.getByRole('link', { name: /terminos y condiciones/i });
    expect(link).toHaveAttribute('href', '/terms-and-conditions');
  });

  it('should render privacy policy link', () => {
    renderWithRouter(<Footer />);

    const link = screen.getByRole('link', { name: /politica de privacidad/i });
    expect(link).toHaveAttribute('href', '/privacy');
  });
});
