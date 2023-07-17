"use client";

import { useState, useEffect, useRef, createContext } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import classNames from "classnames";

import Image from "next/image";
import List from "./list";
import ListItem from "./list-item";
import styles from "./Dropdown.module.css";
import arrowDown from "../../../../public/icons/arrow-down.svg";
import { getName } from "@/helpers/base";

interface List {
  position: Position | null;
  chooseValue: (id: string) => void;
}

interface ListItem {
  id: string;
  name: string;
}

interface Dropdown {
  title: string;
  defaultValue: string;
  placeholder: string;
  items: Array<ListItem>;
  actionCreator: any;
}

interface Position {
  x: number;
  y: number;
}

export const DropdownContext = createContext<List | null>(null);

export default function Dropdown({
  title,
  defaultValue,
  placeholder,
  items,
  actionCreator,
}: Dropdown) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    defaultValue || placeholder
  );
  const [position, setPosition] = useState<Position | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const chooseValue = (id: string) => {
    setSelectedValue(getName(id, items));
    dispatch(actionCreator(id));
    setIsOpen(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: bounds.x,
      y: bounds.y + bounds.height + 4,
    });
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as any)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  });

  return (
    <div className={styles.dropdown}>
      <span className={styles.title}>{title}</span>
      <DropdownContext.Provider value={{ position, chooseValue }}>
        <div
          className={classNames(styles.container, { [styles.active]: isOpen })}
          onClick={handleClick}
          ref={ref}
        >
          {selectedValue !== placeholder ? (
            <span className={styles.selected}>{selectedValue}</span>
          ) : (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
          <Image
            src={arrowDown}
            alt="arrow down"
            className={classNames({ [styles.rotate]: isOpen })}
          />
          {isOpen &&
            createPortal(
              <Dropdown.List>
                {items.map((item) => {
                  return <Dropdown.ListItem key={item.id} {...item} />;
                })}
              </Dropdown.List>,
              document.getElementById("portals") as HTMLElement
            )}
        </div>
      </DropdownContext.Provider>
    </div>
  );
}

Dropdown.List = List;
Dropdown.ListItem = ListItem;