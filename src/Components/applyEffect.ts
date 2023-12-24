import { savedImageData } from "./Canvas.ts";
import createParticle from "./createParticle.ts";
import { resetborder } from "./SelectItem.ts";
import checkIfBorder from "./checkIfBorder.ts";
import generateArrayForSelectedColors from "./GenerateArrayForSelectedColors.ts";
import generateArrayForItem from "./GenerateArrayForItem.ts";
import { CharItem } from "../Interfaces/interfaces.ts";
let drawing = 1;
let looping = false;

interface ApplyEffectProps {
  currentItem: string | null;
  selectedColors: string[] | null;
  charItems: CharItem[];
  multiplier: number;
  startEffect: boolean;
  effectName: string;
}
export default function applyEffect({
  currentItem,
  selectedColors,
  charItems,
  multiplier,
  startEffect,
  effectName,
}: ApplyEffectProps) {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  ctx?.putImageData(savedImageData, 0, 0);
  const size = multiplier * 64;
  const pixelSpace = 4;
  const columns = size * pixelSpace;
  let itemcolors = [];
  let colorpos = currentItem
    ? charItems
        .map(function (e) {
          return e.name;
        })
        .indexOf(currentItem)
    : 0;
  for (const element of charItems) {
    let colors = element.itemColor;
    let set = new Set(colors);
    colors = Array.from(set);
    itemcolors.push(colors);
  }
  const colorSet = new Set(itemcolors[colorpos]);
  //const layers = 1;
  //find averages and more of current pixel
  //let averages = getAverage(pixel, layers, columns, savedImageData.data)
  if (startEffect && currentItem && selectedColors) {
    resetborder();
    let border: number[] = [];
    let itemArray = generateArrayForItem({ currentItem, charItems });
    let itemSelectedColorsArray = generateArrayForSelectedColors({
      itemArray,
      selectedColors,
      savedImageData,
    });
    for (const element of itemSelectedColorsArray) {
      for (let lol = 0; lol < element.length; lol++) {
        let isBorder = checkIfBorder({
          data: savedImageData?.data,
          pixel: element[lol],
          columns,
          itemColorsSet: colorSet,
        });
        if (isBorder) {
          border.push(element[lol]);
        }
      }
    }
    looping = true;
    draw();
    function draw() {
      if (looping && selectedColors && selectedColors.length > 0) {
        setTimeout(function () {
          ctx?.putImageData(savedImageData, 0, 0);
          const imageDataCopy = new ImageData(
            new Uint8ClampedArray(savedImageData.data),
            savedImageData.width,
            savedImageData.height
          );
          var particleArray = [];
          for (
            var b = 0;
            b < border.length;
            b += Math.round(border.length / 90)
          ) {
            let stage = drawing % 3;
            //let offsetx = randomIntFromInterval(0, stage);
            //let offsety = randomIntFromInterval(0, stage);
            let newPos = border[b] + columns * 9;
            particleArray.push(
              createParticle({
                pixel: newPos,
                columns,
                pixelSpace,
                effectName,
                stage,
              })
            );
          }

          for (const element of particleArray) {
            for (var b = 0; b < element.length; b++) {
              imageDataCopy.data[element[b].pixel] = element[b].r;
              imageDataCopy.data[element[b].pixel + 1] = element[b].g;
              imageDataCopy.data[element[b].pixel + 2] = element[b].b;
              imageDataCopy.data[element[b].pixel + 3] = 255;
            }
          }
          ctx?.putImageData(imageDataCopy, 0, 0);
          drawing = requestAnimationFrame(draw);
        }, 1000 / 144);
      } //set frames here
      else {
        drawing = requestAnimationFrame(draw);
        cancelAnimationFrame(drawing);
        ctx?.putImageData(savedImageData, 0, 0);
        return;
      }
    }
  } else {
    looping = false;
  }
}
