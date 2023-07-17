import {selectSearchValue, updateSearchValue} from "@/redux/features/movieSlice";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./input.module.css";

export default function Input() {
  const dispatch = useDispatch();
  const searchValue = useSelector(selectSearchValue);
  const [value, setValue] = useState(searchValue);

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(updateSearchValue(value));
    }, 500);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className={styles.container}>
      <label htmlFor="name" className={styles.label}>
        Название
      </label>
      <input
        className={styles.input}
        type="text"
        id="name"
        placeholder="Введите название"
        value={value}
        onChange={handleValue}
      />
    </div>
  );
}
