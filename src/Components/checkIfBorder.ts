//check if leftAboveRightBelow pixels are all contained in the item array

interface CheckIfBorderProps {
  data: Uint8ClampedArray;
  pixel: number;
  columns: number;
  itemColorsSet: Set<string>;
}
export default function checkIfBorder({
  data,
  pixel,
  columns,
  itemColorsSet,
}: CheckIfBorderProps) {
  let pixelSpace = 4;
  let leftAboveRightBelow = [
    "rgb(" +
      data[pixel - pixelSpace] +
      "," +
      data[pixel + 1 - pixelSpace] +
      "," +
      data[pixel + 2 - pixelSpace] +
      ")",
    "rgb(" +
      data[pixel - columns] +
      "," +
      data[pixel + 1 - columns] +
      "," +
      data[pixel + 2 - columns] +
      ")",
    "rgb(" +
      data[pixel + pixelSpace] +
      "," +
      data[pixel + 1 + pixelSpace] +
      "," +
      data[pixel + 2 + pixelSpace] +
      ")",
    "rgb(" +
      data[pixel + columns] +
      "," +
      data[pixel + 1 + columns] +
      "," +
      data[pixel + 2 + columns] +
      ")",
  ];
  let checkarray = [];
  for (var check = 0; check < leftAboveRightBelow.length; check++) {
    if (itemColorsSet.has(leftAboveRightBelow[check])) {
      checkarray.push("true");
    } else {
      checkarray.push("false");
    }
  }
  let checkarraySet = new Set(checkarray);
  if (checkarraySet.has("false")) {
    return true;
  } else {
    return false;
  }
}
