/**
 * Plans Service - Refactored
 * Applies DIP (Dependency Inversion Principle) - uses centralized apiClient
 */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet } from '../../../utils/apiClient';

export const getPlan = createAsyncThunk(
  'plans/getPlan',
  async ({ planId, userToken }) => apiGet(`/api/plans/${planId}`, userToken),
);

export const getAllPlans = createAsyncThunk(
  'plans/getAll',
  async (userToken) => apiGet('/api/plans', userToken),
);
