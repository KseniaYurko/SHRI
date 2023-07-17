import { useContext } from "react";
import { DropdownContext } from "./dropdown";

export default function useDropdownContext() {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error("error context");
  }
  return context;
}
