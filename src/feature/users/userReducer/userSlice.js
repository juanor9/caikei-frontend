import { createSlice } from '@reduxjs/toolkit';
import { createUser } from '../services/users';
import { login } from '../services/auth';

// const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
  userData: [],
};

const usersSlice = createSlice({
  name: 'userData',
  initialState,
  extraReducers: (builder) => {
    // builder.addCase(getUserById.fulfilled, (state, action) => {
    //   state.userData = action.payload;
    // });
    builder.addCase(createUser.fulfilled, (state, action) => {
      const newState = { ...state };
      newState.userData = action.payload;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem('login-token', action.payload.userToken);
      const newState = { ...state };
      newState.userData = action.payload.profile;
    });

    // builder.addCase(updateUser.fulfilled, (state, action) => {
    //   state.userData = action.payload;
    // });
  },
});

export default usersSlice.reducer;
