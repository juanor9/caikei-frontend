import LibraryCard from './LibraryCard';

export default {
  title: 'Features/Libraries/LibraryCard',
  component: LibraryCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    name: 'Libreria Nacional',
    city: 'Bogota',
    link: '123',
  },
};

export const WithCopies = {
  args: {
    name: 'Libreria Panamericana',
    city: 'Medellin',
    link: '456',
    copies: 150,
  },
};

export const NoCityInfo = {
  args: {
    name: 'Libreria Local',
    link: '789',
  },
};

export const LongName = {
  args: {
    name: 'Libreria y Papeleria El Gran Libro de Colombia',
    city: 'Cali',
    link: '101',
    copies: 75,
  },
};
