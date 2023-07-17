import styles from "./information.module.css";

export default function Information({information} : {information: Array<{ title: string; value: string }>}) {
  const content = information.map(({ title, value }, i) => {
    return (
      <div key={i} className={styles["list-item"]}>
        <p className={styles.title}>{title}:</p>
        <p className={styles.value}>{value}</p>
      </div>
    );
  });
  return <div className={styles.list}>{content}</div>;
}
