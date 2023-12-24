export interface PixelInfo {
  positions: number[][];
  color: string[];
  column: number;
  row: number;
}
let canvas: HTMLCanvasElement | null = null;
export let pixels: PixelInfo[] = [];
export let pixelsID: Set<number> = new Set();
export function resetCanvas() {
  canvas = null;
}
export let savedImageData: ImageData = new ImageData(
  new Uint8ClampedArray([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
  4
);
interface CanvasProps {
  white: Uint8ClampedArray;
  multiplier: number;
  pixelArray: PixelInfo[];
  pixelsArrayIDSet: Set<number>;
}
export default function Canvas({
  white,
  multiplier,
  pixelArray,
  pixelsArrayIDSet,
}: CanvasProps) {
  pixels = pixelArray;
  pixelsID = pixelsArrayIDSet;
  //const timer = ms => new Promise(res => setTimeout(res, ms))
  if (canvas === null) {
    canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.width = 896;
    canvas.height = 896;
  }
  let context = canvas.getContext("2d");
  context?.clearRect(0, 0, canvas.width, canvas.height);
  let imageData = new ImageData(white, 64 * multiplier);
  savedImageData = imageData;
  context?.putImageData(imageData, 0, 0);

  //if you have your own image
  /*
  image.addEventListener('load', async function(){
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    canvas.getContext('2d').drawImage(image,0,0,64*multiplier,64*multiplier)
  })*/

  //if you painted it in the program
}
