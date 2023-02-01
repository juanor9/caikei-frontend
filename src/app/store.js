import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../feature/users/userReducer/userSlice';
import uploadReducer from '../feature/uploads/uploadReducer/uploadSlice';
import publisherReducer from '../feature/publishers/reducer/publisherSlice';
import bookReducer from '../feature/books/reducer/bookSlice';
import catalogueReducer from '../feature/books/reducer/catalogueSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    upload: uploadReducer,
    publisher: publisherReducer,
    book: bookReducer,
    catalogue: catalogueReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
