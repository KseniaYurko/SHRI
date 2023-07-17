import { createSlice } from "@reduxjs/toolkit";

export type Genre = "fantasy" | "horror" | "action" | "comedy";

import { RootType } from "../store";
export interface Card {
  title: string;
  posterUrl: string;
  releaseYear: number;
  description: string;
  genre: Genre;
  id: string;
  rating: number;
  director: string;
  reviewIds: string[];
}

interface CartItem extends Card {
  count: number;
}

interface InitialState {
  sum: number;
  movies: CartItem[];
}

const initialState: InitialState = {
  sum: 0,
  movies: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addMovie(state, { payload }) {
      state.movies.push({ ...payload, count: 1 });
      state.sum++;
    },
    removeMovie(state, { payload }) {
      const item = state.movies.find((el) => el.id === payload);
      if (item) {
        state.sum -= item?.count;
      }
      state.movies = state.movies.filter((el) => el.id !== payload);
    },
    incrementCount(state, { payload }) {
      const item = state.movies.find((el) => el.id === payload);
      if (item && item.count < 30) {
        item.count++;
        state.sum++;
      }
    },
    decrementCount(state, { payload }) {
      const item = state.movies.find((el) => el.id === payload);
      if (item && item.count > 0) {
        item.count--;
        state.sum--;
      }
    },
  },
});

export const selectCartItems = (state: RootType) => state.cart.movies;
export const selectCartSum = (state: RootType) => state.cart.sum;

export const { addMovie, removeMovie, incrementCount, decrementCount } =
  cartSlice.actions;

export default cartSlice.reducer;
