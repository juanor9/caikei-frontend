/**
 * Hook for currency formatting
 * Applies SRP (Single Responsibility Principle)
 */
import { useCallback } from 'react';

const useCurrency = (locale = 'es-CO', currency = 'COP') => {
  const formatCurrency = useCallback((value) => {
    if (value === null || value === undefined) return null;

    return value.toLocaleString(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }, [locale, currency]);

  return formatCurrency;
};

export default useCurrency;
