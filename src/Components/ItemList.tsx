import { Item } from "../Interfaces/interfaces";

interface ItemListProps {
  items: Array<Item>;
}
export default function ItemList({ items }: ItemListProps) {
  return (
    <>
      {items.map((item, index) => (
        <option key={item.name} value={item.name}>
          {item.name}
        </option>
      ))}
    </>
  );
}
