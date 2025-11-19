import MovementCard from './MovementCard';

export default {
  title: 'Features/Movements/MovementCard',
  component: MovementCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <table>
        <tbody>
          <Story />
        </tbody>
      </table>
    ),
  ],
};

export const Ingreso = {
  args: {
    id: 1001,
    date: '2024-01-15T10:30:00Z',
    kind: 'ingreso',
    from: 'publisher123',
    to: 'library456',
    grossTotal: 500000,
    netTotal: null,
    books: [
      { id: 'book1', copies: 10 },
      { id: 'book2', copies: 5 },
    ],
    movementId: 'mov123',
    deletedFunc: () => {},
  },
};

export const Remision = {
  args: {
    id: 1002,
    date: '2024-01-20T14:00:00Z',
    kind: 'remision',
    from: 'publisher123',
    to: 'library789',
    grossTotal: 750000,
    netTotal: 600000,
    books: [
      { id: 'book1', copies: 20 },
      { id: 'book3', copies: 15 },
    ],
    movementId: 'mov456',
    deletedFunc: () => {},
  },
};

export const Devolucion = {
  args: {
    id: 1003,
    date: '2024-02-01T09:00:00Z',
    kind: 'devolucion',
    from: 'library456',
    to: 'publisher123',
    grossTotal: 250000,
    netTotal: 200000,
    books: [
      { id: 'book2', copies: 8 },
    ],
    movementId: 'mov789',
    deletedFunc: () => {},
  },
};

export const Liquidacion = {
  args: {
    id: 1004,
    date: '2024-02-10T16:30:00Z',
    kind: 'liquidacion',
    from: 'library789',
    to: 'publisher123',
    grossTotal: 1200000,
    netTotal: 960000,
    books: [
      { id: 'book1', copies: 30 },
      { id: 'book2', copies: 20 },
      { id: 'book3', copies: 10 },
    ],
    movementId: 'mov101',
    deletedFunc: () => {},
  },
};
