/**
 * Libraries Service - Refactored
 * Applies DIP (Dependency Inversion Principle) - uses centralized apiClient
 */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet, apiPost, apiPatch, buildQueryString, getAuthToken } from '../../../utils/apiClient';

export const createLibrary = createAsyncThunk(
  'libraries/createLibrary',
  async ({ form, userToken }) => apiPost('/api/libraries', userToken, form),
);

export const getLibrariesById = createAsyncThunk(
  'libraries/getLibrariesById',
  async ({ id, userToken }) => apiGet(`/api/libraries/${id}`, userToken),
);

export const getLibrariesByFilter = createAsyncThunk(
  'libraries/getLibrariesByFilter',
  async ({ filter, userToken }) => {
    const queryString = buildQueryString(filter);
    return apiGet(`/api/libraries/search?${queryString}`, userToken);
  },
);

export const updateLibrary = createAsyncThunk(
  'libraries/updateLibrary',
  async ({ form, id }) => {
    const token = getAuthToken();
    return apiPatch(`/api/libraries/${id}`, token, form);
  },
);
