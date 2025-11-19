import BookCard from './BookCard';

export default {
  title: 'Features/Books/BookCard',
  component: BookCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    title: 'Cien anos de soledad',
    cover: 'https://via.placeholder.com/200x300/3498db/ffffff?text=Book+Cover',
    bookId: '123',
  },
};

export const LongTitle = {
  args: {
    title: 'El ingenioso hidalgo Don Quijote de la Mancha: Primera parte',
    cover: 'https://via.placeholder.com/200x300/e74c3c/ffffff?text=Quijote',
    bookId: '456',
  },
};

export const NoCover = {
  args: {
    title: 'Libro sin portada',
    cover: '',
    bookId: '789',
  },
};

export const ShortTitle = {
  args: {
    title: 'Poemas',
    cover: 'https://via.placeholder.com/200x300/2ecc71/ffffff?text=Poemas',
    bookId: '101',
  },
};
