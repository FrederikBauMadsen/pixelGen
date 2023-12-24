import { pixels } from "./Canvas.ts";
import checkIfBorder from "./checkIfBorder.ts";
import { savedImageData } from "./Canvas.ts";
import { CharItem } from "../Interfaces/interfaces.ts";
let border: number[] = [];
let drawing;
let looping = false;

export function resetborder() {
  border = [];
  looping = false;
}

interface SelectItemProps {
  multiplier: number;
  charItems: CharItem[];
  currentItem: string | null;
  itemcolors: string[] | null;
}
export default function SelectItem({
  multiplier,
  charItems,
  currentItem,
  itemcolors,
}: SelectItemProps) {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  ctx?.putImageData(savedImageData, 0, 0);
  const itemColorsSet = new Set(itemcolors);
  const size = multiplier * 64;
  const pixelSpace = 4;
  const columns = size * pixelSpace;

  const sdata = ctx?.getImageData(0, 0, size, size);
  var data = ctx?.getImageData(0, 0, size, size);
  var itemAllPixels = [];

  if (currentItem !== null && data !== undefined && sdata !== undefined) {
    let itemPos = charItems
      .map(function (e) {
        return e.name;
      })
      .indexOf(currentItem);
    let itemArray = [];
    let sortedIds = charItems[itemPos].itemId.sort(function (a, b) {
      return parseInt(a) - parseInt(b);
    });
    for (var i = 0; i < sortedIds.length; i++) {
      let pos = parseInt(sortedIds[i]);
      itemArray.push(pixels[pos]);
    }

    //iterate through all subarrays in itemArray
    for (var a = 0; a < itemArray.length; a++) {
      //columns of subarrays
      for (var x = 0; x < itemArray[a].positions.length; x++) {
        //rows of subarrays
        for (var y = 0; y < itemArray[a].positions[x].length; y++) {
          //current pixel
          let pixel = itemArray[a].positions[x][y];
          itemAllPixels.push(pixel);
          //find border of current item
          let isBorder = checkIfBorder({
            data: sdata.data,
            pixel,
            columns,
            itemColorsSet,
          });
          //loop between -1 and 1 to create black or white color
          var plusOrMinus = (a + x + y) % 2 === 0 ? -1 : 1;
          //display the border on the current item
          if (isBorder) {
            data.data[pixel] = 255 + 255 * plusOrMinus;
            data.data[pixel + 1] = 255 + 255 * plusOrMinus;
            data.data[pixel + 2] = 255 + 255 * plusOrMinus;
            data.data[pixel + 3] = 255;
            border.push(pixel);
          }
        }
      }
      ctx?.putImageData(data, 0, 0);
    }

    var itemAllPixelsSet = new Set(itemAllPixels);

    function draw() {
      if (looping && itemAllPixelsSet.has(border[0])) {
        setTimeout(function () {
          if (data) {
            for (var i = 0; i < border.length; i++) {
              var random = Math.random() < 0.5 ? 0 : 255;
              data.data[border[i]] = random;
              data.data[border[i] + 1] = random;
              data.data[border[i] + 2] = random;
              data.data[border[i] + 3] = 255;
            }
            ctx?.putImageData(data, 0, 0);
            drawing = requestAnimationFrame(draw);
          }
        }, 1000 / 5);
      } else {
        drawing = requestAnimationFrame(draw);
        cancelAnimationFrame(drawing);
        ctx?.putImageData(savedImageData, 0, 0);
        return;
      }
    }
    looping = true;
    draw();
  } else {
    ctx?.putImageData(savedImageData, 0, 0);
  }
}
