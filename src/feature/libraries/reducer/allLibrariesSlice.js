/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import getLibrariesByPublisher from '../services/allLibraries';

const initialState = {
  allLibraries: {},
};

const allLibrariesSlice = createSlice(
  {
    name: 'allLibraries',
    initialState,
    extraReducers: (builder) => {
      builder.addCase(getLibrariesByPublisher.fulfilled, (state, action) => {
        state.allLibraries = action.payload;
      });
    },
  },
);
export default allLibrariesSlice.reducer;
