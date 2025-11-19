/**
 * Movements Service - Refactored
 * Applies DIP (Dependency Inversion Principle) - uses centralized apiClient
 */
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiGet,
  apiPost,
  apiDelete,
  getAuthToken,
} from '../../../utils/apiClient';

export const createMovement = createAsyncThunk(
  'movements/createMovement',
  async ({ userToken, formfulldata }) => apiPost('/api/movements', userToken, formfulldata),
);

export const getMovementsByPublisher = createAsyncThunk(
  'movements/getMovements',
  async (id) => {
    const token = getAuthToken();
    return apiGet(`/api/movements?createdBy=${id}`, token);
  },
);

export const getMovementById = createAsyncThunk(
  'movements/getMovement',
  async ({ id }) => {
    const token = getAuthToken();
    return apiGet(`/api/movements/${id}`, token);
  },
);

export const deleteMovementById = createAsyncThunk(
  'movements/deleteMovement',
  async ({ id }) => {
    const token = getAuthToken();
    return apiDelete(`/api/movements/${id}`, token);
  },
);
