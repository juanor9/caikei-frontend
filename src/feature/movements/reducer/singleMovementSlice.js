/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getMovementById } from '../services/movements';

const initialState = {
  movement: {},
};

const singleMovementSlice = createSlice(
  {
    name: 'movement',
    initialState,
    extraReducers: (builder) => {
      builder.addCase(getMovementById.fulfilled, (state, action) => {
        state.movement = action.payload;
      });
    },
  },
);

export default singleMovementSlice.reducer;
