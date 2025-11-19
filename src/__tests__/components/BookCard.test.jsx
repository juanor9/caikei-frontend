import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BookCard from '../../feature/books/components/BookCard/BookCard';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('BookCard', () => {
  const defaultProps = {
    title: 'Test Book',
    cover: 'https://example.com/cover.jpg',
    bookId: '123',
  };

  it('should render book title', () => {
    renderWithRouter(<BookCard {...defaultProps} />);

    expect(screen.getByText('Test Book')).toBeInTheDocument();
  });

  it('should render link to book page', () => {
    renderWithRouter(<BookCard {...defaultProps} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/book/123');
  });

  it('should render cover image as background', () => {
    const { container } = renderWithRouter(<BookCard {...defaultProps} />);

    const coverDiv = container.querySelector('.book__cover');
    expect(coverDiv).toHaveStyle({
      backgroundImage: 'url(https://example.com/cover.jpg)',
    });
  });

  it('should render without cover', () => {
    renderWithRouter(<BookCard {...defaultProps} cover="" />);

    expect(screen.getByText('Test Book')).toBeInTheDocument();
  });

  it('should render article element', () => {
    renderWithRouter(<BookCard {...defaultProps} />);

    expect(screen.getByRole('article')).toBeInTheDocument();
  });
});
