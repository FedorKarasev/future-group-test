import { configureStore } from '@reduxjs/toolkit';
import booksSliceReducer from './booksSlice';
import filtersSliceReducer from './filtersSlice';
import appSliceReducer from './appSlice';

export const store = configureStore({
  reducer: {
    books: booksSliceReducer,
    filters: filtersSliceReducer,
    app: appSliceReducer,
  },
});
