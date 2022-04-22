import {pixels} from './Canvas.js';
export default function generateArrayForItem(currentItem, charItems){
  let itemPos = charItems.map(function(e) { return e.name; }).indexOf(currentItem);
  let itemArray = [];
  let sortedIds = charItems[itemPos].itemId.sort(function (a, b) {  return a - b;  });
  for(var i = 0; i < sortedIds.length; i++){
    let pos = parseInt(sortedIds[i])
    itemArray.push(pixels[pos])
  }
  return itemArray;
}
