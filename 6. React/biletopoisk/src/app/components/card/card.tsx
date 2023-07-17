"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import Modal from "@/app/components/modal/modal";
import Buttons from "../buttons/buttons";
import styles from "./card.module.css";
import { genres } from "@/data/data";
import close from "../../../../public/icons/close.svg";

interface MovieCard {
  id: string;
  title: string;
  posterUrl: string;
  genre: string;
  count?: number;
}

export default function Card(movieCard: MovieCard) {
  const pathname = usePathname();

  const { id, title, posterUrl, genre } = movieCard;
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <article className={styles.container}>
      <Link href={`/movie/${id}`} className={styles["image-container"]}>
        <Image
          width={100}
          height={120}
          priority
          src={posterUrl}
          alt={title}
          className={styles.image}
        />
      </Link>
      <div className={styles.wrapper}>
        <Link href={`/movie/${id}`} className={styles["text-wrapper"]}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.genre}>{genres[genre]}</p>
        </Link>
        <div className={styles.actions}>
          <Buttons {...movieCard} />
          {pathname === "/cart" ? (
            <button className={styles["close-button"]} onClick={toggleModal}>
              <Image src={close} alt="close" />
            </button>
          ) : null}
          {isOpen && createPortal(
              <Modal id={id} closeModal={closeModal} />,
              document.getElementById("portals") as HTMLElement
            )}
        </div>
      </div>
    </article>
  );
}
