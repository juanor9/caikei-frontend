/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getBooksByFilter } from '../services/books';

const initialState = {
  catalogue: [],
};

const catalogueSlice = createSlice(
  {
    name: 'book',
    initialState,
    extraReducers: (builder) => {
      builder.addCase(getBooksByFilter.fulfilled, (state, action) => {
        state.catalogue = action.payload;
      });
    },
  },
);

export default catalogueSlice.reducer;
