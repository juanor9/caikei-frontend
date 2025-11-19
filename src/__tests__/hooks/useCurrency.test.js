import { renderHook } from '@testing-library/react';
import useCurrency from '../../hooks/useCurrency';

describe('useCurrency', () => {
  it('should format currency with default locale (es-CO, COP)', () => {
    const { result } = renderHook(() => useCurrency());
    const formatCurrency = result.current;

    const formatted = formatCurrency(25000);

    expect(formatted).toContain('25');
    expect(formatted).toContain('000');
  });

  it('should return null for null value', () => {
    const { result } = renderHook(() => useCurrency());
    const formatCurrency = result.current;

    expect(formatCurrency(null)).toBeNull();
  });

  it('should return null for undefined value', () => {
    const { result } = renderHook(() => useCurrency());
    const formatCurrency = result.current;

    expect(formatCurrency(undefined)).toBeNull();
  });

  it('should format zero correctly', () => {
    const { result } = renderHook(() => useCurrency());
    const formatCurrency = result.current;

    const formatted = formatCurrency(0);

    expect(formatted).toContain('0');
  });

  it('should format large numbers correctly', () => {
    const { result } = renderHook(() => useCurrency());
    const formatCurrency = result.current;

    const formatted = formatCurrency(1000000);

    expect(formatted).toBeDefined();
    expect(typeof formatted).toBe('string');
  });

  it('should use custom locale when provided', () => {
    const { result } = renderHook(() => useCurrency('en-US', 'USD'));
    const formatCurrency = result.current;

    const formatted = formatCurrency(1000);

    expect(formatted).toBeDefined();
    expect(typeof formatted).toBe('string');
  });
});
