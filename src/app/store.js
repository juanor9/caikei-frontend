import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../feature/users/userReducer/userSlice';

const store = configureStore({
  reducer: {
    // hotels: hotelReducer,
    // login: userLoginReducer,
    user: userReducer,
    // rooms: roomsReducer,
    // bookings: bookingReducer,
    // upload: uploadsReducer,
    // uploadsMultiple: uploadsMultipleReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
