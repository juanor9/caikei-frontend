/* eslint-disable no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const createBook = createAsyncThunk(
  'books/createBook',
  async (book) => {
    const token = localStorage.getItem('login-token');
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

export default createBook;
