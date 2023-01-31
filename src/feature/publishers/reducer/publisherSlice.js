/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { createPublisher, getPublisherById, updatePublisher } from '../services/publishers';

const initialState = {
  publisher: {},
};

const publisherSlice = createSlice(
  {
    name: 'publisher',
    initialState,
    extraReducers: (builder) => {
      builder.addCase(createPublisher.fulfilled, (state, action) => {
        state.publisher = action.payload;
      });
      builder.addCase(getPublisherById.fulfilled, (state, action) => {
        state.publisher = action.payload;
      });
      builder.addCase(updatePublisher.fulfilled, (state, action) => {
        state.publisher = action.payload;
      });
    },
  },
);

export default publisherSlice.reducer;
