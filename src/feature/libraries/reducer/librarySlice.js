/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { createLibrary, getLibrariesById, getLibrariesByFilter } from '../services/libraries';

const initialState = {
  library: {},
};

const librarySlice = createSlice(
  {
    name: 'library',
    initialState,
    extraReducers: (builder) => {
      builder.addCase(createLibrary.fulfilled, (state, action) => {
        state.library = action.payload;
      });
      builder.addCase(getLibrariesById.fulfilled, (state, action) => {
        state.library = action.payload;
      });
      builder.addCase(getLibrariesByFilter.fulfilled, (state, action) => {
        state.library = action.payload;
      });
    },
  },
);
export default librarySlice.reducer;
