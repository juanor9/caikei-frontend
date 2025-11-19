import { render, screen } from '@testing-library/react';
import PlanCard from '../../feature/plans/components/PlanCard/PlanCard';

describe('PlanCard', () => {
  const defaultProps = {
    plan: 'Plan Basico',
    cost: 29900,
    titles: 20,
  };

  it('should render plan name', () => {
    render(<PlanCard {...defaultProps} />);

    expect(screen.getByText('Plan Basico')).toBeInTheDocument();
  });

  it('should render titles count', () => {
    render(<PlanCard {...defaultProps} />);

    expect(screen.getByText(/20 titulos activos/i)).toBeInTheDocument();
  });

  it('should render formatted cost', () => {
    render(<PlanCard {...defaultProps} />);

    // Check that cost is formatted as currency
    const costElement = screen.getByText(/29/);
    expect(costElement).toBeInTheDocument();
  });

  it('should render free plan without IVA text', () => {
    render(<PlanCard plan="Plan Gratuito" cost={0} titles={10} />);

    expect(screen.queryByText(/IVA/i)).not.toBeInTheDocument();
  });

  it('should render subscription link for paid plans', () => {
    render(<PlanCard {...defaultProps} />);

    const link = screen.getByRole('link', { name: /suscribirse/i });
    expect(link).toBeInTheDocument();
  });

  it('should not render subscription link for plans without payment link', () => {
    render(<PlanCard plan="Custom" cost={500000} titles={500} />);

    expect(screen.queryByRole('link', { name: /suscribirse/i })).not.toBeInTheDocument();
  });
});
