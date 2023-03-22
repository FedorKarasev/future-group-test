import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
  totalItems: 0,
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    updateBooksList: (state, action) => {
      state.books = action.payload;
    },
    updateTotalItems: (state, action) => {
      state.totalItems = action.payload;
    },
    addToCurrentBooksList: (state, action) => {
      state.books = [...state.books, ...action.payload];
    },
  },
});

export const { updateBooksList, updateTotalItems, addToCurrentBooksList } = booksSlice.actions;

export default booksSlice.reducer;
