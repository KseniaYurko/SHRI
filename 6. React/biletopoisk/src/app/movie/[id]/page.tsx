"use client";

import Image from "next/image";
import { genres } from "@/data/data";
import { useGetMovieQuery } from "@/redux/services/movieApi";
import Top from "./components/top/top";
import Information from "./components/information/info";
import Description from "./components/description/description";
import Reviews from "./components/reviews/reviews";
import styles from "./page.module.css";

export default function Movie({ params: { id } }: { params: { id: string } }) {
  const { data, isLoading, isSuccess, isError, error } = useGetMovieQuery(id);

  let content;

  if (isLoading) {
    content = <span>Loading...</span>;
  } else if (isSuccess) {
    const information = [
      { title: "Жанр", value: genres[data.genre] },
      { title: "Год выпуска", value: data.releaseYear },
      { title: "Рейтинг", value: data.rating },
      { title: "Режиссер", value: data.director },
    ];
    content = (
      <>
        <section className={styles.content}>
          <div>
            <Image
              width={400}
              height={500}
              src={data.posterUrl}
              alt={data.title}
              className={styles.image}
            />
          </div>
          <div className={styles["info-container"]}>
            <Top {...data} />
            <Information information={information} />
            <Description description={data.description} />
          </div>
        </section>
        <Reviews id={id} />
      </>
    );
  } else if (isError) {
    content = <span>{error.toString()}</span>;
  }

  return <main className={styles.container}>{content}</main>;
}
