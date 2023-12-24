import { CharItem } from "../Interfaces/interfaces.ts";
import { PixelInfo, pixels } from "./Canvas.ts";

interface GenerateArrayForItemProps {
  currentItem: string;
  charItems: CharItem[];
}
export default function generateArrayForItem({
  currentItem,
  charItems,
}: GenerateArrayForItemProps) {
  let itemPos = charItems
    .map(function (e) {
      return e.name;
    })
    .indexOf(currentItem);
  let itemArray: PixelInfo[] = [];
  let sortedIds = charItems[itemPos].itemId.sort(function (a, b) {
    return parseInt(a) - parseInt(b);
  });
  for (var i = 0; i < sortedIds.length; i++) {
    let pos = parseInt(sortedIds[i]);
    itemArray.push(pixels[pos]);
  }
  return itemArray;
}
