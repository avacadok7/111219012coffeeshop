// src/features/favorites/favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadFavorites = () => {
  try {
    const data = localStorage.getItem('favorites');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    list: loadFavorites(),
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const exists = state.list.some(item => item.id === action.payload.id);
      if (exists) {
        state.list = state.list.filter(item => item.id !== action.payload.id);
      } else {
        state.list.push(action.payload);
      }
      // Save to localStorage
      localStorage.setItem('favorites', JSON.stringify(state.list));
    },
    clearFavorites: (state) => {
      state.list = [];
      localStorage.removeItem('favorites');
    }
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
