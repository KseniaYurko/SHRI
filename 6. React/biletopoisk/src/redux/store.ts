import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";
import moviesSlice from "./features/movieSlice";
import { movieApi } from "./services/movieApi";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    movies: moviesSlice,
    [movieApi.reducerPath]: movieApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
});

export type RootType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;