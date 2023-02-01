/* eslint-disable no-unused-vars */
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
    const res = await fetch(`${BASE_URL}/api/books`, options);
    const result = await res.json();
    return result;
  },
);

export const getBooksByFilter = createAsyncThunk(
  'books/getBooksByFilter',
  async (filter) => {
    const uriParams = new URLSearchParams(filter).toString();
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await fetch(`${BASE_URL}/api/books/search?${uriParams}`, options);
    const result = await res.json();
    return result;
  },
);
