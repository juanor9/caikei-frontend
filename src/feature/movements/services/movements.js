import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const token = localStorage.getItem('login-token');

export const createMovement = createAsyncThunk(
  'movements/createMovement',
  async (data) => {
    const { userToken, formfulldata } = data;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(formfulldata),
    };

    const res = await fetch(`${BASE_URL}/api/movements`, options);
    const result = await res.json();
    return result;
  },
);
export const getMovementsByPublisher = createAsyncThunk(
  'movements/getMovements',
  async (id) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await fetch(`${BASE_URL}/api/movements?createdBy=${id}`, options);
    const result = await res.json();
    return result;
  },
);

export const getMovementById = createAsyncThunk(
  'movements/getMovement',
  async (data) => {
    const { id } = data;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await fetch(`${BASE_URL}/api/movements/${id}`, options);
    const result = await res.json();
    return result;
  },
);
