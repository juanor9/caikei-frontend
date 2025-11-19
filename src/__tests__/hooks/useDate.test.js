import { renderHook } from '@testing-library/react';
import useDate from '../../hooks/useDate';

describe('useDate', () => {
  describe('formatDate', () => {
    it('should format date with default options', () => {
      const { result } = renderHook(() => useDate());
      const { formatDate } = result.current;

      const formatted = formatDate('2024-01-15T10:30:00Z');

      expect(formatted).toContain('15');
      expect(formatted).toContain('2024');
    });

    it('should return empty string for null date', () => {
      const { result } = renderHook(() => useDate());
      const { formatDate } = result.current;

      expect(formatDate(null)).toBe('');
    });

    it('should return empty string for undefined date', () => {
      const { result } = renderHook(() => useDate());
      const { formatDate } = result.current;

      expect(formatDate(undefined)).toBe('');
    });

    it('should format date with custom options', () => {
      const { result } = renderHook(() => useDate());
      const { formatDate } = result.current;

      const formatted = formatDate('2024-06-20', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });

      expect(formatted).toBeDefined();
      expect(typeof formatted).toBe('string');
    });
  });

  describe('formatDateISO', () => {
    it('should format date to ISO format', () => {
      const { result } = renderHook(() => useDate());
      const { formatDateISO } = result.current;

      const formatted = formatDateISO('2024-01-15T10:30:00Z');

      expect(formatted).toBe('2024-01-15');
    });

    it('should return empty string for null date', () => {
      const { result } = renderHook(() => useDate());
      const { formatDateISO } = result.current;

      expect(formatDateISO(null)).toBe('');
    });

    it('should return empty string for undefined date', () => {
      const { result } = renderHook(() => useDate());
      const { formatDateISO } = result.current;

      expect(formatDateISO(undefined)).toBe('');
    });

    it('should handle Date objects', () => {
      const { result } = renderHook(() => useDate());
      const { formatDateISO } = result.current;

      const date = new Date('2024-03-20');
      const formatted = formatDateISO(date);

      expect(formatted).toBe('2024-03-20');
    });
  });
});
