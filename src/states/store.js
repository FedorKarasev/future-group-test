import { configureStore } from '@reduxjs/toolkit';
import booksSliceReducer from './booksSlice';
import filtersSliceReducer from './filtersSlice';

export const store = configureStore({
  reducer: {
    books: booksSliceReducer,
    filters: filtersSliceReducer,
  },
});
