/* eslint-disable*/
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import createUser from '../services/users';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
  userData: [],
}

const usersSlice = createSlice({
  name: 'userData',
  initialState,
  extraReducers: (builder) => {
    // builder.addCase(getUserById.fulfilled, (state, action) => {
    //   state.userData = action.payload;
    // });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
    // builder.addCase(updateUser.fulfilled, (state, action) => {
    //   state.userData = action.payload;
    // });
  },
});

export default usersSlice.reducer;
