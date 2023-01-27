/* eslint-disable no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const createUser = createAsyncThunk(
  'users/createUser',
  async (user) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    const res = await fetch(`${BASE_URL}/api/users`, options);
    const result = await res.json();
    return result;
  },
);

export default createUser;
// export const getUserById = createAsyncThunk(
//   'users/getUser',
//   async (data) => {
//     const options = {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     };

//     const res = await fetch(`${BASE_URL}/api/users/${data}`, options);
//     const result = await res.json();
//     return result;
//   },
// );

// export const updateUser = createAsyncThunk(
//   'users/updateUser',
//   async (data) => {
//     const { formdata, _id } = data;
//     const options = {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formdata),
//     };

//     const res = await fetch(`${BASE_URL}/api/users/${_id}`, options);
//     const result = await res.json();
//     return result;
//   },
// );
