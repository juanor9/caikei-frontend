/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { createMovement, getMovementsByPublisher } from '../services/movements';

const initialState = {
  movement: [],
};

const movementSlice = createSlice(
  {
    name: 'movement',
    initialState,
    extraReducers: (builder) => {
      builder.addCase(createMovement.fulfilled, (state, action) => {
        state.movement = action.payload;
      });
      builder.addCase(getMovementsByPublisher.fulfilled, (state, action) => {
        state.movement = action.payload;
      });
    },
  },
);

export default movementSlice.reducer;
