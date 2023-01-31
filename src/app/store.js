import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../feature/users/userReducer/userSlice';
import uploadReducer from '../feature/uploads/uploadReducer/uploadSlice';
import publisherReducer from '../feature/publishers/reducer/publisherSlice';

const store = configureStore({
  reducer: {
    // hotels: hotelReducer,
    // login: userLoginReducer,
    user: userReducer,
    // rooms: roomsReducer,
    // bookings: bookingReducer,
    upload: uploadReducer,
    publisher: publisherReducer,
    // uploadsMultiple: uploadsMultipleReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
