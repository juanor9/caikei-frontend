import { render, screen } from '@testing-library/react';
import InventoryItemCard from '../../feature/libraries/components/InventoryItemCard/InventoryItemCard';

describe('InventoryItemCard', () => {
  const defaultProps = {
    name: 'Test Location',
    copies: 50,
  };

  it('should render location name', () => {
    render(<InventoryItemCard {...defaultProps} />);

    expect(screen.getByText('Test Location')).toBeInTheDocument();
  });

  it('should render copies count', () => {
    render(<InventoryItemCard {...defaultProps} />);

    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('should render copies label', () => {
    render(<InventoryItemCard {...defaultProps} />);

    expect(screen.getByText(/ejemplares disponibles/i)).toBeInTheDocument();
  });

  it('should render with zero copies', () => {
    render(<InventoryItemCard {...defaultProps} copies={0} />);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should render article element', () => {
    render(<InventoryItemCard {...defaultProps} />);

    expect(screen.getByRole('article')).toBeInTheDocument();
  });
});
