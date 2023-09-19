import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getPlan = createAsyncThunk(
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

export const getAllPlans = createAsyncThunk(
  'plans/getAll',
  async (userToken) => {
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };
    const res = await fetch(`${BASE_URL}/api/plans`, options);
    const result = await res.json();
    return result;
  },
);
