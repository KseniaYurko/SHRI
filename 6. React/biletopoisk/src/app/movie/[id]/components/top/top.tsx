import Buttons from "@/app/components/buttons/buttons";
import styles from "./top.module.css";

interface MovieCard {
  id: string;
  title: string;
  posterUrl: string;
  genre: string;
  count?: number;
}

interface Top {
  id: string;
  title: string;
}

export default function Top(movieCard: MovieCard) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{movieCard.title}</h1>
      <Buttons {...movieCard} />
    </div>
  );
}
