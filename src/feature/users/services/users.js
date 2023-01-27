import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const createUser = createAsyncThunk(
  'users/createUser',
  async (user) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    const res = await fetch(`${BASE_URL}/api/users`, options);
    const result = await res.json();
    return result;
  },
);
export const getUser = createAsyncThunk(
  'users/getUser',
  async (token) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await fetch(`${BASE_URL}/api/users`, options);
    const result = await res.json();
    return result;
  },
);
