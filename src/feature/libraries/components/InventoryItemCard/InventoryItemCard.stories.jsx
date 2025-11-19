import InventoryItemCard from './InventoryItemCard';

export default {
  title: 'Features/Libraries/InventoryItemCard',
  component: InventoryItemCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    name: 'Libreria Nacional',
    copies: 25,
  },
};

export const HighStock = {
  args: {
    name: 'Almacen Principal',
    copies: 500,
  },
};

export const LowStock = {
  args: {
    name: 'Sucursal Centro',
    copies: 3,
  },
};

export const NoStock = {
  args: {
    name: 'Punto de Venta Norte',
    copies: 0,
  },
};
