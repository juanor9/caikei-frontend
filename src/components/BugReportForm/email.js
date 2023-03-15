import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const sendReport = createAsyncThunk(
  'reports/sendReport',
  async (data) => {
    const { form, token } = data;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    };

    const res = await fetch(`${BASE_URL}/email`, options);
    const result = await res.json();
    return result;
  },
);

export default sendReport;
