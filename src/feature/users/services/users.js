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

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (formData) => {
    const token = localStorage.getItem('login-token');
    let { form } = formData;
    const { userId } = formData;
    if (!formData.form) {
      form = formData.deactivate;
    }
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    };
    const res = await fetch(`${BASE_URL}/api/users/${userId}`, options);
    const result = await res.json();

    const { newToken } = result;
    localStorage.clear();
    localStorage.setItem('login-token', newToken);

    return result;
  },
);
