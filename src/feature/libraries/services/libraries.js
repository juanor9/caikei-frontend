/* eslint-disable no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const token = localStorage.getItem('login-token');

export const createLibrary = createAsyncThunk(
  'libraries/createLibrary',
  async (data) => {
    const { form, userToken } = data;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(form),
    };

    const res = await fetch(`${BASE_URL}/api/libraries`, options);
    const result = await res.json();
    return result;
  },
);

export const getLibrariesById = createAsyncThunk(
  'libraries/getLibrariesById',
  async (data) => {
    const { id, userToken } = data;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };
    const res = await fetch(`${BASE_URL}/api/libraries/${id}`, options);
    const result = await res.json();
    return result;
  },
);

export const getLibrariesByFilter = createAsyncThunk(
  'libraries/getLibrariesByFilter',
  async (data) => {
    const { filter, userToken } = data;

    const uriParams = new URLSearchParams();
    Object.keys(filter).forEach((key) => {
      const value = filter[key];
      uriParams.append(key, value);
    });
    const uri = `?${uriParams.toString()}`;

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };
    const res = await fetch(`${BASE_URL}/api/libraries/search${uri}`, options);
    const result = await res.json();
    return result;
  },
);

export const updateLibrary = createAsyncThunk(
  'libraries/updateLibrary',
  async (updateData) => {
    // console.log('inside updateLibrary.', updateData);
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
