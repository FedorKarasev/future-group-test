import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  apiKey: 'AIzaSyDqJ8WW5OCHdKT6rGJtawuJraEY_A_Qhsc',
};

export const appSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {},
});

export const {} = appSlice.actions;

export default appSlice.reducer;
