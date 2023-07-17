import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import styles from "./modal.module.css";
import close from "../../../../public/icons/close.svg";
import { removeMovie } from "@/redux/features/cartSlice";

interface Modal {
  id: string;
  closeModal: () => void;
}

export default function Modal({ id, closeModal }: Modal) {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as any)) {
        closeModal();
      }
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  const removeMovieFromCart = () => {
    dispatch(removeMovie(id));
    closeModal();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container} ref={modalRef}>
        <div className={styles.top}>
          <div className={styles["top-top"]}>
            <span className={styles.title}>Удаление билета</span>
            <button className={styles["close-button"]} onClick={closeModal}>
              <Image src={close} alt="close" />
            </button>
          </div>
          <div>
            <p className={styles.text}>Вы уверены, что хотите удалить билет?</p>
          </div>
        </div>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={removeMovieFromCart}>
            Да
          </button>
          <button className={styles["button-outlined"]} onClick={closeModal}>
            Нет
          </button>
        </div>
      </div>
    </div>
  );
}
