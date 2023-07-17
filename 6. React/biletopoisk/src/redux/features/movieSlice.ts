import { createSlice } from "@reduxjs/toolkit";
import { RootType } from "../store";

interface InitialState {
  searchValue: string;
  genre: string;
  cinema: string;
}

const initialState: InitialState = {
  searchValue: "",
  genre: "",
  cinema: "",
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    updateSearchValue(state, { payload }) {
      state.searchValue = payload;
    },
    updateGenre(state, { payload }) {
      state.genre = payload;
    },
    updateCinema(state, { payload }) {
      state.cinema = payload;
    },
  },
});

export const selectSearchValue = (state: RootType) => state.movies.searchValue;
export const selectGenre = (state: RootType) => state.movies.genre;
export const selectCinema = (state: RootType) => state.movies.cinema;

export const { updateSearchValue, updateGenre, updateCinema } =
  moviesSlice.actions;
export default moviesSlice.reducer;
