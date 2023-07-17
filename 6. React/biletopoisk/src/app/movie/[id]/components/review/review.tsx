import Image from "next/image";
import styles from "./review.module.css";
import defaultAvatar from "../../../../../../public/images/default-avatar.png";

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
}

export default function Review({ id, name, rating, text }: Review) {
  return (
    <article className={styles.container}>
      <div>
        <Image width={100} height={100} src={defaultAvatar} alt={name} />
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <h2 className={styles.title}>{name}</h2>
          <div className={styles.review}>
            <span className={styles["review-title"]}>Оценка:</span>
            <span className={styles["review-value"]}>{rating}</span>
          </div>
        </div>
        <div>
          <p className={styles.text}>{text}</p>
        </div>
      </div>
    </article>
  );
}
