import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.list.find(item => item.id === action.payload.id);
      if (!exists) state.list.push(action.payload);
    },
    clearFavorites: (state) => {
      state.list = [];
    },
  },
});

export const { addFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
