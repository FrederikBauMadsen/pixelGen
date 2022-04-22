import Canvas from './Canvas.js'
import {resetborder} from './SelectItem.js'
export default async function setResize(multiplier, preview64){
  await resetborder();
  var resolution = 64;
  var totalArrayLength = (resolution*multiplier)*(resolution*multiplier)*4;
  var white = new Uint8ClampedArray(totalArrayLength);
  var pixelArray = [];
  var pixelsArrayID = [];
    for(var x = 0; x < resolution; x++){
      for(var y = 0; y < resolution; y++){
        let array = [];
        var rgb =   preview64[x][y]
        rgb = rgb.replace(/[^\d,]/g, '').split(',')
        if(multiplier > 1){
          for(var n = 0; n < multiplier; n++){
            let pixelRow = [];
            for(var m = 0; m < multiplier; m++){
              let pos = (x*resolution*4*multiplier*multiplier)+(y*4*multiplier)+(resolution*multiplier*4*n)+(m*4)
              white[pos] = (Math.floor(rgb[0]))
              white[pos+1] = (Math.floor(rgb[1]))
              white[pos+2] = (Math.floor(rgb[2]))
              white[pos+3] = (255)
              pixelRow.push(pos);
              pixelsArrayID.push(pos);
            }
            array.push(pixelRow)
          }

        }else{
          let pos = (x*resolution*4)+(y*4)
          white[pos] = (Math.floor(rgb[0]))
          white[pos+1] = (Math.floor(rgb[1]))
          white[pos+2] = (Math.floor(rgb[2]))
          white[pos+3] = (255)
        }
        let object = {positions: array, color:rgb, column: x, row: y}
        pixelArray.push(object);
      }
    }
    let pixelsArrayIDSet = new Set(pixelsArrayID);
    Canvas(white, multiplier, pixelArray, pixelsArrayIDSet);
}
