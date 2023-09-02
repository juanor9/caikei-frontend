import { configureStore } from '@reduxjs/toolkit';
import allLibrariesReducer from '../feature/libraries/reducer/allLibrariesSlice';
import bookReducer from '../feature/books/reducer/bookSlice';
import catalogueReducer from '../feature/books/reducer/catalogueSlice';
import libraryReducer from '../feature/libraries/reducer/librarySlice';
import movementReducer from '../feature/movements/reducer/singleMovementSlice';
import movementsReducer from '../feature/movements/reducer/movementSlice';
import planReducer from '../feature/plans/reducer/planSlice';
import plansReducer from '../feature/plans/reducer/plansAllSlice';
import publisherReducer from '../feature/publishers/reducer/publisherSlice';
import uploadReducer from '../feature/uploads/uploadReducer/uploadSlice';
import userReducer from '../feature/users/userReducer/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    publisher: publisherReducer,
    plan: planReducer,
    plans: plansReducer,
    catalogue: catalogueReducer,
    book: bookReducer,
    allLibraries: allLibrariesReducer,
    library: libraryReducer,
    movements: movementsReducer,
    movement: movementReducer,
    upload: uploadReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
