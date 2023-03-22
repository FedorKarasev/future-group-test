import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 'all',
  sortBy: 'relevance',
  startIndex: 0,
  maxResults: 30,
  searchString: '',
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
    setStartIndex: (state, action) => {
      state.startIndex = action.payload;
    },
    setSearchString: (state, action) => {
      state.searchString = action.payload;
    },
  },
});

export const { updateCategory, updateSortBy, setStartIndex, setSearchString } = filtersSlice.actions;

export default filtersSlice.reducer;
