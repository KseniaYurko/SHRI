interface Dropdown {
  title: string;
  defaultValue: string;
  placeholder: string;
  items: Array<IListItem>;
  actionCreator: any;
}

export interface IListItem {
  id: string;
  name: string;
}

export function getName(id: string, list: DropdownItem[]) {
  const item = list.find((item) => item.id === id);
  return (item && item.name) || "";
}
