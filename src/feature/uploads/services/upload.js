/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const uploadImage = createAsyncThunk(
  'uploads/uploadImage', async (file) => {
    const formData = new FormData();
    const options = {
      method: 'POST',
      body: formData,
    };

    formData.append('file', file);
    formData.append('fileName', file.name);

    const response = await fetch(`${BASE_URL}/api/upload/file`, options);
    const data = await response.json();
    const url = await data.url;
    return url;
  }
);

export const uploadExcel = createAsyncThunk(
  'uploads/uploadExcel', async (file) => {
    const formData = new FormData();
    const options = {
      method: 'POST',
      body: formData,
    };

    formData.append('file', file);
    formData.append('fileName', file.name);

    const response = await fetch(`${BASE_URL}/api/upload/import-inventory`, options);
    const data = await response.json();
    return data;
  }
);
