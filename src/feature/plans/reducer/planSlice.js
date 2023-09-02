/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getPlan } from '../services/plans';

const initialState = {
  plan: {},
};

const planSlice = createSlice(
  {
    name: 'plan',
    initialState,
    extraReducers: (builder) => {
      builder.addCase(getPlan.fulfilled, (state, action) => {
        state.plan = action.payload;
      });
    },
  },
);

export default planSlice.reducer;
