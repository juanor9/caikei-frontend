/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { uploadImage } from '../services/upload';

const initialState = {
  uploads: '',
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(uploadImage.fulfilled, (state, action) => {
      state.uploads = action.payload;
    });
  },
});

export default uploadSlice.reducer;
