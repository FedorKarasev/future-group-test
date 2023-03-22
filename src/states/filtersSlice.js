import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 'all',
  sortBy: 'relevance',
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateCategory: (state, action) => {
      state.category = action.payload;
    },
    updateSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { updateCategory, updateSortBy } = filtersSlice.actions;

export default filtersSlice.reducer;
