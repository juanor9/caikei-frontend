/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { createBook } from '../services/books';

const initialState = {
  book: {},
};

const bookSlice = createSlice(
  {
    name: 'book',
    initialState,
    extraReducers: (builder) => {
      builder.addCase(createBook.fulfilled, (state, action) => {
        state.book = action.payload;
      });
    },
  },
);

export default bookSlice.reducer;
