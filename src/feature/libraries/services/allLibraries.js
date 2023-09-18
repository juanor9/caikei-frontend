import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const getLibrariesByPublisher = createAsyncThunk(
  'libraries/getLibrariesByPublisher',
  async (data) => {
    const { publisher, userToken } = data;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };

    const res = await fetch(`${BASE_URL}/api/libraries/search?publishers.publisherId=${publisher}`, options);
    const result = await res.json();
    return result;
  },
);

export default getLibrariesByPublisher;
