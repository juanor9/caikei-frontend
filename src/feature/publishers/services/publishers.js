/* eslint-disable no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const createPublisher = createAsyncThunk(
  'publishers/createPublisher',
  async (publisher) => {
    const token = publisher.user;
    const {
      address,
      email,
      idNumber,
      idType,
      name,
      phone,
      publisherLogo,
    } = publisher;
    const newPublisherModel = {
      name,
      publisherIds: [{
        type: idType,
        number: idNumber,
      }],
      email,
      logo: publisherLogo,
      address,
      phone,
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPublisherModel),
    };

    const res = await fetch(`${BASE_URL}/api/publishers`, options);
    const result = await res.json();
    return result;
  },
);

export const getPublisherById = createAsyncThunk(
  'publishers/getPublisherById',
  async (id) => {
    const token = localStorage.getItem('login-token');
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await fetch(`${BASE_URL}/api/publishers/${id}`, options);
    const result = await res.json();
    return result;
  },
);

export const updatePublisher = createAsyncThunk(
  'publishers/updatePublisher',
  async (updateData) => {
    const token = localStorage.getItem('login-token');
    const { publisherId, ...form } = updateData;
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    };
    const res = await fetch(`${BASE_URL}/api/publishers/${publisherId}`, options);
    const result = await res.json();
    return result;
  },
);
