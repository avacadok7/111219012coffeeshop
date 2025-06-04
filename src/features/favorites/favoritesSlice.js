import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const index = state.list.findIndex(item => item.id === action.payload.id);
      if (index >= 0) {
        state.list.splice(index, 1); // remove
      } else {
        state.list.push(action.payload); // add
      }
    },
    clearFavorites: (state) => {
      state.list = [];
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
