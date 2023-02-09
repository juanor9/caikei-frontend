/* eslint-disable no-unused-vars */
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

export const getLibrariesById = createAsyncThunk(
  'libraries/getLibrariesById',
  async (id) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await fetch(`${BASE_URL}/api/libraries/${id}`, options);
    const result = await res.json();
    return result;
  },
);

export const updateLibrary = createAsyncThunk(
  'libraries/updateLibrary',
  async (updateData) => {
    const { form, id } = updateData;
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    };
    const res = await fetch(`${BASE_URL}/api/libraries/${id}`, options);
    const result = await res.json();
    return result;
  },
);
