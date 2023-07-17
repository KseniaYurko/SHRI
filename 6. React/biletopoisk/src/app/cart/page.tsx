"use client";

import { useSelector } from "react-redux";
import Card from "@/app/components/card/card";
import styles from "./page.module.css";
import { selectCartItems, selectCartSum } from "@/redux/features/cartSlice";

export default function Cart() {
  const sum = useSelector(selectCartSum);
  const cartItems = useSelector(selectCartItems);
  return (
    <main className={styles.container}>
      <section className={styles.cards}>
        {cartItems.map((cartItem) => {
          return <Card key={cartItem.id} {...cartItem} />;
        })}
      </section>
      <div className={styles.sum}>
        <p className={styles.text}>Итого билетов:</p>
        <p className={styles.text}>{sum}</p>
      </div>
    </main>
  );
}
