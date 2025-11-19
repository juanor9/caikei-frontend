import { renderHook } from '@testing-library/react';
import useAuthToken from '../../hooks/useAuthToken';

describe('useAuthToken', () => {
  beforeEach(() => {
    localStorage.getItem.mockClear();
  });

  it('should return token from localStorage', () => {
    const mockToken = 'test-token-123';
    localStorage.getItem.mockReturnValue(mockToken);

    const { result } = renderHook(() => useAuthToken());

    expect(localStorage.getItem).toHaveBeenCalledWith('login-token');
    expect(result.current).toBe(mockToken);
  });

  it('should return null when no token exists', () => {
    localStorage.getItem.mockReturnValue(null);

    const { result } = renderHook(() => useAuthToken());

    expect(result.current).toBeNull();
  });

  it('should memoize the token value', () => {
    const mockToken = 'memoized-token';
    localStorage.getItem.mockReturnValue(mockToken);

    const { result, rerender } = renderHook(() => useAuthToken());
    const firstValue = result.current;

    rerender();
    const secondValue = result.current;

    expect(firstValue).toBe(secondValue);
  });
});
