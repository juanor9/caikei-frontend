/* eslint-disable no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const createPublisher = createAsyncThunk(
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

export default createPublisher;
