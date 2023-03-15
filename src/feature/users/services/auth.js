import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const login = createAsyncThunk(
  'auth/login',
  async (user) => {
    console.log(BASE_URL);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    try {
      const res = await fetch(`${BASE_URL}/auth/local/login`, options);
      if (res.status === 401) {
        return new Error('Authentication failed');
      }
      const result = await res.json();
      const { userToken } = result;
      localStorage.setItem('login-token', userToken);
      return result;
    } catch (error) {
      return error;
    }
  },
);

export default login;
