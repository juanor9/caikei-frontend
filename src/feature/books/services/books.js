/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const token = localStorage.getItem('login-token');

export const createBook = createAsyncThunk(
  'books/createBook',
  async (book) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(book),
    };
    if (!token) {
      return { mesage: 'no token available' };
    }
    const res = await fetch(`${BASE_URL}/api/books`, options);
    const result = await res.json();
    return result;
  },
);

export const getBooksByFilter = createAsyncThunk(
  'books/getBooksByFilter',
  async (filter) => {
    console.log('inside books/getBooksByFilter')
    const {publisher, userToken} = filter
    const uriParams = new URLSearchParams(publisher).toString();
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };
    if (!userToken) {
      return { mesage: 'no token available' };
    }

    const res = await fetch(`${BASE_URL}/api/books/search?${uriParams}`, options);
    const result = await res.json();
    return result;
  },
);

export const getBookById = createAsyncThunk(
  'books/getBookById',
  async (data) => {
    const { id, userToken } = data;
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };
    const res = await fetch(`${BASE_URL}/api/books/${id}`, options);
    const result = await res.json();
    return result;
  },
);

export const updateBookById = createAsyncThunk(
  'books/updateBook',
  async (data) => {
    const { form, id } = data;
    const options = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    };

    const res = await fetch(`${BASE_URL}/api/books/${id}`, options);
    const result = await res.json();
    return result;
  },
);
