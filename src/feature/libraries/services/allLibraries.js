/**
 * All Libraries Service - Refactored
 * Applies DIP (Dependency Inversion Principle) - uses centralized apiClient
 */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet } from '../../../utils/apiClient';

const getLibrariesByPublisher = createAsyncThunk(
  'libraries/getLibrariesByPublisher',
  async ({ publisher, userToken }) => apiGet(`/api/libraries/search?publishers.publisherId=${publisher}`, userToken),
);

export default getLibrariesByPublisher;
