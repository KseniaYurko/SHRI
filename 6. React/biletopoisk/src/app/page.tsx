"use client";

import { useSelector } from "react-redux";
import Card from "@/app/components/card/card";
import Filters from "./components/filters/filters";
import styles from "./page.module.css";

import {useGetMoviesByCinemaQuery, useGetMoviesQuery} from "../redux/services/movieApi";
import { selectCinema, selectGenre, selectSearchValue} from "@/redux/features/movieSlice";
import { genres, genresList } from "@/data/data";
import { getName } from "../helpers/base";

type Genre = "fantasy" | "horror" | "action" | "comedy";

interface Card {
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

export default function Home() {
  const cinemaId: string = useSelector(selectSearchValue);
  return (
    <main className={styles.main}>
      <Filters />
      {cinemaId === "0" ? <Cards /> : <CinemaCards />}
    </main>
  );
}

function Cards() {
  const searchValue: string = useSelector(selectSearchValue);

  const genreName = getName(useSelector(selectGenre), genresList);

  const {
    data: cards = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMoviesQuery(null);

  let content;

  if (isLoading) {
    content = <span>Loading...</span>;
  } else if (isSuccess) {
    const sortedCards = sortBySearchValue(cards, searchValue);
    const sortedByGenre = sortByGenre(sortedCards, genreName);

    content = sortedByGenre.map((card: Card) => (
      <Card key={card.id} {...card} />
    ));
  } else if (isError) {
    content = <span>{error.toString()}</span>;
  }

  return <section className={styles.movies}>{content}</section>;
}

function sortBySearchValue(cards: Array<Card>, searchValue: string) {
  return cards.filter((card: Card) =>
    card.title
      .toLocaleLowerCase()
      .includes(searchValue.trim().toLocaleLowerCase())
  );
}

function sortByGenre(cards: Array<Card>, genre: string) {
  if (genre === "Не выбран" || genre.length === 0) return cards;
  return cards.filter((card: Card) => genres[card.genre] === genre);
}

function CinemaCards() {
  const cinemaId: string = useSelector(selectCinema);
  const searchValue: string = useSelector(selectSearchValue);

  const genreName = getName(useSelector(selectGenre), genresList);

  const {
    data: cards = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMoviesByCinemaQuery(cinemaId);

  let content;

  if (isLoading) {
    content = <span>Loading...</span>;
  } else if (isSuccess) {
    const sortedCards = sortBySearchValue(cards, searchValue);
    const sortedByGenre = sortByGenre(sortedCards, genreName);

    content = sortedByGenre.map((card: Card) => (
      <Card key={card.id} {...card} />
    ));
  } else if (isError) {
    content = <span>{error.toString()}</span>;
  }

  return <section className={styles.movies}>{content}</section>;
}
