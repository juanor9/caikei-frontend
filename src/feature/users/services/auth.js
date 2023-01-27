import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const login = createAsyncThunk(
  'auth/login',
  async (user) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    const res = await fetch(`${BASE_URL}/auth/local/login`, options);
    const result = await res.json();
    return result;
  },
);

export default login;

// export const validateUserMailToken = async (token) => {
//   const response = await fetch(`${BASE_URL}/auth/local/activate/${token}`);
//   const data = response.json();

//   return data;
// };

// export const resetPassword = createAsyncThunk(
//   'auth/reset-password',
//   async (email) => {
//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(email),
//     };

//     const res = await fetch(`${BASE_URL}/auth/local/password-reset`, options);
//     const result = await res.json();
//     return result;
//   },
// );
// export const resetPasswordUpdate = createAsyncThunk(
//   'auth/reset-password-update',
//   async (data) => {
//     const { newPassword, token } = data;
//     const body = {
//       password: newPassword,
//     };
//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body),
//     };
//     const res = await fetch(`${BASE_URL}/auth/local/password-reset/${token}`, options);
//     const result = await res.json();
//     return result;
//   },
// );
