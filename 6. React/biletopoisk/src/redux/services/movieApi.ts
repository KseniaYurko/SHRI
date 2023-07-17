import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api" }),
  endpoints: (builder) => ({
    getMovies: builder.query({ query: () => "/movies" }),
    getMoviesByCinema: builder.query({
      query: (cinemaId) => `/movies?cinemaId=${cinemaId}`,
    }),
    getMovie: builder.query({
      query: (movieId) => `/movie?movieId=${movieId}`,
    }),
    getMovieReviews: builder.query({
      query: (movieId) => `/reviews?movieId=${movieId}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMoviesByCinemaQuery,
  useGetMovieQuery,
  useGetMovieReviewsQuery,
} = movieApi;
