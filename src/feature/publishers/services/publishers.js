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
  async (data) => {
    const { publisher, userToken } = data;
    if (publisher === undefined) {
      return {
        address: '',
        logo: '',
        name: '',
        phone: '',
        publisherIds: [],
      };
    }
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };
    const res = await fetch(`${BASE_URL}/api/publishers/${publisher}`, options);
    const result = await res.json();
    return result;
  },
);

export const getPublisherByFilter = createAsyncThunk(
  'publishers/getPublisherByFilter',
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
    const res = await fetch(`${BASE_URL}/api/publishers/search${uri}`, options);
    const result = await res.json();
    return result;
  },
);

export const updatePublisher = createAsyncThunk(
  'publishers/updatePublisher',
  async (updateData) => {
    const { userToken, publisherId, ...form } = updateData;
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(form),
    };
    const res = await fetch(`${BASE_URL}/api/publishers/${publisherId}`, options);
    const result = await res.json();
    return result;
  },
);
