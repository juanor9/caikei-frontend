import BookInventoryCard from './BookInventoryCard';

export default {
  title: 'Features/Books/BookInventoryCard',
  component: BookInventoryCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    title: 'Cien anos de soledad',
    cover: 'https://via.placeholder.com/100x150/3498db/ffffff?text=Cover',
    copies: 45,
  },
};

export const HighStock = {
  args: {
    title: 'El amor en los tiempos del colera',
    cover: 'https://via.placeholder.com/100x150/e74c3c/ffffff?text=Cover',
    copies: 250,
  },
};

export const LowStock = {
  args: {
    title: 'Cronica de una muerte anunciada',
    cover: 'https://via.placeholder.com/100x150/f39c12/ffffff?text=Cover',
    copies: 5,
  },
};

export const NoStock = {
  args: {
    title: 'El otono del patriarca',
    cover: 'https://via.placeholder.com/100x150/95a5a6/ffffff?text=Cover',
    copies: 0,
  },
};

export const NoCover = {
  args: {
    title: 'Libro sin imagen',
    copies: 30,
  },
};
