import styles from "./listItem.module.css";
import useDropdownContext from "./useDropdownContext";

interface ListItem {
  id: string;
  name: string;
}

export default function ListItem({ id, name }: ListItem) {
  const { chooseValue } = useDropdownContext();

  return (
    <li className={styles.container} onClick={() => chooseValue(id)}>
      <span className={styles.text}>{name}</span>
    </li>
  );
}
