import styles from "./description.module.css";

export default function Description({ description }: { description: string }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Описание</h2>
      <div>
        <p className={styles.paragraph}>{description}</p>
      </div>
    </div>
  );
}
