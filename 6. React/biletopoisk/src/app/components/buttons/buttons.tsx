import { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import Modal from "@/app/components/modal/modal";
import styles from "./buttons.module.css";
import {addMovie, decrementCount, incrementCount, selectCartItems} from "@/redux/features/cartSlice";

interface MovieCard {
  id: string;
  title: string;
  posterUrl: string;
  genre: string;
  count?: number;
}

export default function Buttons(movieCard: MovieCard) {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const { id } = movieCard;
  const cartItems: MovieCard[] = useSelector(selectCartItems);

  const item = cartItems.find((cartItem) => cartItem.id === id);
  const count = (item && item.count) || 0;

  const incrementCardCount = () => {
    if (!item) {
      dispatch(addMovie(movieCard));
    } else {
      dispatch(incrementCount(id));
    }
  };

  const decrementCardCount = () => {
    if (count === 1) {
      setIsOpen(true);
    } else {
      dispatch(decrementCount(id));
    }
  };

  return (
    <div className={styles.buttons}>
      <button
        className={styles.button}
        disabled={count === 0}
        onClick={decrementCardCount}
      />
      <span className={styles.counter}>{count}</span>
      <button
        className={classNames(styles.button, styles.plus)}
        disabled={count === 30}
        onClick={incrementCardCount}
      />
      {isOpen && createPortal(
          <Modal id={id} closeModal={closeModal} />,
          document.getElementById("portals") as HTMLElement
        )}
    </div>
  );
}
