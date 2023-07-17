import {selectCinema, selectGenre, updateCinema, updateGenre} from "@/redux/features/movieSlice";

import { useSelector } from "react-redux";
import Input from "../input/input";
import Dropdown from "../dropdown/dropdown";

import styles from "./filters.module.css";

import { cinemasList, genresList } from "@/data/data";
import { getName } from "@/helpers/base";

export default function Filters() {
  const genreName = getName(useSelector(selectGenre), genresList);
  const cinemaName = getName(useSelector(selectCinema), cinemasList);

  return (
    <aside className={styles.container}>
      <h2 className={styles.title}>Фильтр поиска</h2>
      <form className={styles.form}>
        <Input />
        <Dropdown
          title="Жанр"
          defaultValue={genreName}
          placeholder="Выберите жанр"
          items={genresList}
          actionCreator={updateGenre}
        />
        <Dropdown
          title="Кинотеатр"
          defaultValue={cinemaName}
          placeholder="Выберите кинотеатр"
          items={cinemasList}
          actionCreator={updateCinema}
        />
      </form>
    </aside>
  );
}
