/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { createMovement } from '../services/movements';

const initialState = {
  movement: {},
};

const movementSlice = createSlice(
  {
    name: 'movement',
    initialState,
    extraReducers: (builder) => {
      builder.addCase(createMovement.fulfilled, (state, action) => {
        state.movement = action.payload;
      });
    },
  },
);

export default movementSlice.reducer;
