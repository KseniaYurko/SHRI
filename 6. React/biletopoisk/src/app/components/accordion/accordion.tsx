"use client";
import { useState } from "react";
import classNames from "classnames";

import Image from "next/image";
import styles from "./accordion.module.css";
import blackArrow from "../../../../public/icons/black-arrow.svg";

interface Accordion {
  title: string;
  content: string[];
}

export default function Accordion({ title, content }: Accordion) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleVisibility = () => setIsOpen(!isOpen);

  return (
    <div className={styles.container} onClick={toggleVisibility}>
      <div className={styles.wrapper}>
        <p className={styles.title}>{title}</p>
        <Image
          src={blackArrow}
          alt="arrow"
          className={classNames({ [styles.rotate]: isOpen })}
        />
      </div>
      {isOpen ? (
        <div className={styles.content}>
          {content.map((paragraph, i) => {
            return (
              <p key={i} className={styles.paragraph}>
                {paragraph}
              </p>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
