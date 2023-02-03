import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const token = localStorage.getItem('login-token');

export const createLibrary = createAsyncThunk(
  'libraries/createLibrary',
  async (library) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(library),
    };

    const res = await fetch(`${BASE_URL}/api/libraries`, options);
    const result = await res.json();
    return result;
  },
);

export default createLibrary;
