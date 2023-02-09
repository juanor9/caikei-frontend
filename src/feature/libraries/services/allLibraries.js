/* eslint-disable no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const token = localStorage.getItem('login-token');

const getLibrariesByPublisher = createAsyncThunk(
  'libraries/getLibrariesByPublisher',
  async (publisher) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await fetch(`${BASE_URL}/api/libraries/search?publishers.publisherId=${publisher}`, options);
    const result = await res.json();
    return result;
  },
);

export default getLibrariesByPublisher;
