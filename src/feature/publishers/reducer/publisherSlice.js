/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import createPublisher from '../services/publishers';

const initialState = {
  publisher: {},
};

const publisherSlice = createSlice(
  {
    name: 'publisher',
    initialState,
    extraReducers: (builder) => {
      builder.addCase(createPublisher.fulfilled, (state, action) => {
        console.log('in createPublisher');
        state.publisher = action.payload;
      });
    },
  },
);

export default publisherSlice.reducer;
