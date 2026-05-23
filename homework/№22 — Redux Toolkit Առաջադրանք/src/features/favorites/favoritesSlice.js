import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    movies: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      state.movies.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.movies = state.movies.filter((m) => m.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;