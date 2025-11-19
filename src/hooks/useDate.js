/**
 * Hook for date formatting
 * Applies SRP (Single Responsibility Principle)
 */
import { useCallback } from 'react';

const useDate = (locale = 'es-ES') => {
  const formatDate = useCallback((date, options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) => {
    if (!date) return '';
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString(locale, options);
  }, [locale]);

  const formatDateISO = useCallback((date) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  }, []);

  return {
    formatDate,
    formatDateISO,
  };
};

export default useDate;
