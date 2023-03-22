import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  books: [],
  totalItems: 0,
  currentBook: {},
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
    getCurrentBook: (state) => {
      console.log(state.currentBook);
      return state.currentBook;
    },
  },
});

export const { updateBooksList, updateTotalItems, addToCurrentBooksList, getCurrentBook } = booksSlice.actions;

export default booksSlice.reducer;
