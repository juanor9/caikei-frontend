/**
 * Users Service - Refactored
 * Applies DIP (Dependency Inversion Principle) - uses centralized apiClient
 */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet, apiPost, apiPatch, getAuthToken, setAuthToken } from '../../../utils/apiClient';

export const createUser = createAsyncThunk(
  'users/createUser',
  async (user) => apiPost('/api/users', null, user),
);

export const getUser = createAsyncThunk(
  'users/getUser',
  async (token) => apiGet('/api/users', token),
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (formData) => {
    const token = getAuthToken();
    const { userId } = formData;
    const form = formData.form || formData.deactivate;

    const result = await apiPatch(`/api/users/${userId}`, token, form);

    if (result.newToken) {
      setAuthToken(result.newToken);
    }

    return result;
  },
);
