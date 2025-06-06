// src/features/favorites/favoritesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db } from '../../../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Load favorites from Firestore
export const loadFavoritesFromFirestore = createAsyncThunk(
  'favorites/loadFromFirestore',
  async (_, { rejectWithValue }) => {
    const user = auth.currentUser;
    if (!user) return [];
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists() && userSnap.data().favorites) {
      return userSnap.data().favorites;
    }
    return [];
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    list: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const exists = state.list.some(item => item.id === action.payload.id);
      if (exists) {
        state.list = state.list.filter(item => item.id !== action.payload.id);
      } else {
        state.list.push(action.payload);
      }
      // Save to Firestore
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        setDoc(userRef, { favorites: state.list }, { merge: true });
      }
    },
    clearFavorites: (state) => {
      state.list = [];
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        setDoc(userRef, { favorites: [] }, { merge: true });
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadFavoritesFromFirestore.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  }
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
