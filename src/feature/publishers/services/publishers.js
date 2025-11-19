/**
 * Publishers Service - Refactored
 * Applies DIP (Dependency Inversion Principle) - uses centralized apiClient
 */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet, apiPost, apiPatch, buildQueryString } from '../../../utils/apiClient';

export const createPublisher = createAsyncThunk(
  'publishers/createPublisher',
  async (publisher) => {
    const token = publisher.user;
    const {
      address,
      email,
      idNumber,
      idType,
      name,
      phone,
      publisherLogo,
    } = publisher;

    const newPublisherModel = {
      name,
      publisherIds: [{
        type: idType,
        number: idNumber,
      }],
      email,
      logo: publisherLogo,
      address,
      phone,
    };

    return apiPost('/api/publishers', token, newPublisherModel);
  },
);

export const getPublisherById = createAsyncThunk(
  'publishers/getPublisherById',
  async ({ publisher, userToken }) => {
    if (publisher === undefined) {
      return {
        address: '',
        logo: '',
        name: '',
        phone: '',
        publisherIds: [],
      };
    }
    return apiGet(`/api/publishers/${publisher}`, userToken);
  },
);

export const getPublisherByFilter = createAsyncThunk(
  'publishers/getPublisherByFilter',
  async ({ filter, userToken }) => {
    const queryString = buildQueryString(filter);
    return apiGet(`/api/publishers/search?${queryString}`, userToken);
  },
);

export const updatePublisher = createAsyncThunk(
  'publishers/updatePublisher',
  async ({ userToken, publisherId, ...form }) => apiPatch(`/api/publishers/${publisherId}`, userToken, form),
);
