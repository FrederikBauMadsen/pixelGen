import { CharItem, Item } from "../Interfaces/interfaces.ts";
import {
  crabOutline,
  crabMeat,
  crabEyesBlack,
  crabEyesGrey,
  crabEyesWhite,
  crabEyesColor,
  crabMouth,
  staticCrabArray,
} from "../crabConstants.ts";
//generate the base crab

interface StaticCrabProps {
  background: string;
  objectArray: CharItem[];
}
export default function staticCrab({
  background,
  objectArray,
}: StaticCrabProps) {
  let layersID = [];
  let layersColors = [];

  //layer1
  for (var i = 0; i < objectArray.length; i++) {
    if (objectArray[i].category == "nature") {
      layersID.push(...objectArray[i].itemId);
      layersColors.push(...objectArray[i].itemColor);
    }
  }
  //layer2
  for (var o = 0; o < objectArray.length; o++) {
    if (objectArray[o].category === "eyes") {
      layersID.push(...objectArray[o].itemId);
      layersColors.push(...objectArray[o].itemColor);
    }
  }
  //layer3
  for (var p = 0; p < objectArray.length; p++) {
    if (objectArray[p].category === "hats") {
      layersID.push(...objectArray[p].itemId);
      layersColors.push(...objectArray[p].itemColor);
    }
  }
  //layer4
  for (var l = 0; l < objectArray.length; l++) {
    if (objectArray[l].category === "accessories") {
      layersID.push(...objectArray[l].itemId);
      layersColors.push(...objectArray[l].itemColor);
    }
  }
  //layer5
  for (var k = 0; k < objectArray.length; k++) {
    if (objectArray[k].category === "righthand") {
      layersID.push(...objectArray[k].itemId);
      layersColors.push(...objectArray[k].itemColor);
    }
  }
  //layer6
  for (var j = 0; j < objectArray.length; j++) {
    if (objectArray[j].category === "lefthand") {
      layersID.push(...objectArray[j].itemId);
      layersColors.push(...objectArray[j].itemColor);
    }
  }

  var golden = Math.random() < 0.1;

  function random_rgb() {
    var o = Math.round,
      r = Math.random,
      s = 255;
    return "rgb(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + ")";
  }

  function hexToRgb(hex: string | null) {
    if (hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : {
            r: 0,
            g: 0,
            b: 0,
          };
    }
    return {
      r: 0,
      g: 0,
      b: 0,
    };
  }

  var eyes = random_rgb();

  // Build lookup sets once instead of scanning arrays for every pixel
  const outlineSet = new Set(crabOutline);
  const meatSet = new Set(crabMeat);
  const eyesGreySet = new Set(crabEyesGrey);
  const eyesBlackSet = new Set(crabEyesBlack);
  const eyesWhiteSet = new Set(crabEyesWhite);
  const eyesColorSet = new Set(crabEyesColor);
  const mouthSet = new Set(crabMouth);
  const staticCrabSet = new Set(staticCrabArray);
  // First occurrence wins, matching the previous indexOf behaviour
  const layerColorById = new Map<string, string>();
  for (let n = 0; n < layersID.length; n++) {
    if (!layerColorById.has(layersID[n])) {
      layerColorById.set(layersID[n], layersColors[n]);
    }
  }

  let rows = [];
  let array = [];
  let ids = [];

  for (var i = 0; i < 4096; i++) {
    const id = i.toString();
    let itemsInclude = layerColorById.has(id);

    if (outlineSet.has(id) && !itemsInclude) {
      if (golden) {
        array.push("rgb(218,165,32)");
      } else {
        array.push("rgb(115,14,10)");
      }
      ids.push(i);
    }
    if (meatSet.has(id) && !itemsInclude) {
      if (golden) {
        array.push("rgb(255,215,0)");
      } else {
        array.push("rgb(210,90,50)");
      }

      ids.push(i);
    }
    if (eyesGreySet.has(id) && !itemsInclude) {
      array.push("rgb(211,211,211)");
      ids.push(i);
    }
    if (eyesBlackSet.has(id) && !itemsInclude) {
      array.push("rgb(1,0,1)");
      ids.push(i);
    }
    if (eyesWhiteSet.has(id) && !itemsInclude) {
      array.push("rgb(254,254,254)");
      ids.push(i);
    }
    if (eyesColorSet.has(id) && !itemsInclude) {
      array.push(eyes);
      ids.push(i);
    }
    if (mouthSet.has(id) && !itemsInclude) {
      array.push("rgb(254,254,254)");
      ids.push(i);
    }

    if (itemsInclude) {
      const layerColor = layerColorById.get(id) as string;
      if (layerColor.charAt(0) === "#") {
        const { r, g, b } = hexToRgb(layerColor);
        array.push("rgb(" + r + "," + g + "," + b + ")");
        ids.push(i);
      } else {
        array.push(layerColor);
        ids.push(i);
      }
    }

    if (!staticCrabSet.has(id) && !itemsInclude) {
      array.push(background);
      ids.push(i);
    }
  }

  while (array.length) {
    rows.push(array.splice(0, 64));
  }
  return rows;
}
