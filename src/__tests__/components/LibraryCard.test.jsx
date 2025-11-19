import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LibraryCard from '../../feature/libraries/components/LibraryCard/LibraryCard';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('LibraryCard', () => {
  const defaultProps = {
    name: 'Test Library',
    city: 'Bogota',
    link: '456',
  };

  it('should render library name', () => {
    renderWithRouter(<LibraryCard {...defaultProps} />);

    expect(screen.getByText('Test Library')).toBeInTheDocument();
  });

  it('should render city when provided', () => {
    renderWithRouter(<LibraryCard {...defaultProps} />);

    expect(screen.getByText('Bogota')).toBeInTheDocument();
  });

  it('should not render city when not provided', () => {
    renderWithRouter(<LibraryCard {...defaultProps} city="" />);

    expect(screen.queryByText('Bogota')).not.toBeInTheDocument();
  });

  it('should render copies when provided', () => {
    renderWithRouter(<LibraryCard {...defaultProps} copies={100} />);

    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('should render link to library page', () => {
    renderWithRouter(<LibraryCard {...defaultProps} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/library/456');
  });

  it('should render article element', () => {
    renderWithRouter(<LibraryCard {...defaultProps} />);

    expect(screen.getByRole('article')).toBeInTheDocument();
  });
});
