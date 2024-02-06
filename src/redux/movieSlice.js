import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    favorites: [], 
    watchlist: [], 
  },
  reducers: {
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(movie => movie !== action.payload.id);
    },
    addToWatchlist: (state, action) => {
      state.watchlist.push(action.payload);
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(movie => movie !== action.payload.id);
    },
  },
});

export const { addToFavorites, removeFromFavorites, addToWatchlist, removeFromWatchlist } = movieSlice.actions;
export default movieSlice.reducer;
