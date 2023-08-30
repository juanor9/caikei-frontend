import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const getPlan = createAsyncThunk(
  'plans/getPlan',
  async (data) => {
    const { planId, userToken } = data;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };
    const res = await fetch(`${BASE_URL}/api/plans/${planId}`, options);
    const result = await res.json();
    return result;
  },
);

export default getPlan;
