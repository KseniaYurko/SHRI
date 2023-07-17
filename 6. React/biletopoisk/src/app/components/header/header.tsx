"use client";

import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";

import styles from "./header.module.css";
import cartSVG from "../../../../public/icons/cart.svg";
import { selectCartSum } from "@/redux/features/cartSlice";

export default function Header() {
  const sum = useSelector(selectCartSum);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.title}>
        Билетопоиск
      </Link>
      <div className={styles.right}>
        {sum > 0 ? (
          <div className={styles["count-container"]}>
            <span className={styles.count}>{sum}</span>
          </div>
        ) : null}
        <Link href="/cart" className={styles.cart}>
          <Image src={cartSVG} alt="cart" />
        </Link>
      </div>
    </header>
  );
}
