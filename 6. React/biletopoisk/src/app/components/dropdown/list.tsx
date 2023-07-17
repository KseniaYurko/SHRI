import styles from "./list.module.css";
import useDropdownContext from "./useDropdownContext";

export default function List({ children }: { children: React.ReactNode }) {
  const { position } = useDropdownContext();

  const listItemsPosition = {
    top: position?.y,
    left: position?.x,
  };

  return (
    <ul className={styles.list} style={listItemsPosition}>
      {children}
    </ul>
  );
}
