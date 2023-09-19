/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getAllPlans } from '../services/plans';

const initialState = {
  plans: [],
};

const planSlice = createSlice(
  {
    name: 'plan',
    initialState,
    extraReducers: (builder) => {
      builder.addCase(getAllPlans.fulfilled, (state, action) => {
        state.plans = action.payload;
      });
    },
  },
);

export default planSlice.reducer;
