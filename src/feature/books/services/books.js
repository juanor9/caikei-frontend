/**
 * Books Service - Refactored
 * Applies DIP (Dependency Inversion Principle) - uses centralized apiClient
 */
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiGet,
  apiPost,
  apiPatch,
  buildQueryString,
} from '../../../utils/apiClient';

export const createBook = createAsyncThunk(
  'books/createBook',
  async ({ userToken, ...bookData }) => {
    if (!userToken) {
      return { message: 'no token available' };
    }
    return apiPost('/api/books', userToken, bookData);
  },
);

export const getBooksByPublisher = createAsyncThunk(
  'books/getBooksByPublisher',
  async ({ publisher, userToken }) => {
    if (!userToken) {
      return { message: 'no token available' };
    }
    return apiGet(`/api/books/search?publisher=${publisher}`, userToken);
  },
);

export const getBooksByFilter = createAsyncThunk(
  'books/getBooksByFilter',
  async ({ bookFilter, userToken }) => {
    if (!userToken) {
      return { message: 'no token available' };
    }
    const queryString = buildQueryString(bookFilter);
    return apiGet(`/api/books/search?${queryString}`, userToken);
  },
);

export const getBookById = createAsyncThunk(
  'books/getBookById',
  async ({ id, userToken }) => apiGet(`/api/books/${id}`, userToken),
);

export const updateBookById = createAsyncThunk(
  'books/updateBook',
  async ({ form, id, userToken }) => apiPatch(`/api/books/${id}`, userToken, form),
);
