/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { createUser, getUser } from '../services/users';
import { login } from '../services/auth';

const initialState = {
  userData: [],
};

const usersSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    reset: (state) => {
      state.userData = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.userData = action.payload;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.userData = action.payload.profile;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.userData = action.error;
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
  },
});
export const { reset } = usersSlice.actions;
export default usersSlice.reducer;
