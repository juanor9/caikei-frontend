/**
 * Hook for managing authentication token
 * Applies SRP (Single Responsibility Principle)
 */
import { useMemo } from 'react';
import { getAuthToken } from '../utils/apiClient';

const useAuthToken = () => {
  const userToken = useMemo(() => getAuthToken(), []);

  return userToken;
};

export default useAuthToken;
