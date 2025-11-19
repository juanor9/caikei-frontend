/**
 * Auth Service - Refactored
 * Applies DIP (Dependency Inversion Principle) - uses centralized apiClient
 */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest, setAuthToken } from '../../../utils/apiClient';

export const login = createAsyncThunk(
  'auth/login',
  async (user) => {
    try {
      const result = await apiRequest('/auth/local/login', {
        method: 'POST',
        body: user,
      });

      if (result.userToken) {
        setAuthToken(result.userToken);
      }

      return result;
    } catch (error) {
      return error;
    }
  },
);

export default login;
