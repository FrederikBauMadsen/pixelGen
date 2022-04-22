import {pixelsSet} from './Canvas.js';
import {pixelsID} from './Canvas.js';
export default function getAverage(pixel, layers, columns, data){
  let pixelSpace = 4;
  var avgR = 0;
  var avgG = 0;
  var avgB = 0;
  let counter = 0;
  for(var l = 1; l < layers+1 ; l++){
    for (var color = 0; color < 3; color++){
      let avg = 0;
      //STATICLOOP
      let staticArray = [];
        //L
        staticArray.push(pixel-columns-(pixelSpace*l));
        staticArray.push(pixel-(pixelSpace*l));
        staticArray.push(pixel+columns-(pixelSpace*l));
        //R
        staticArray.push(pixel-columns+(pixelSpace*l));
        staticArray.push(pixel+(pixelSpace*l));
        staticArray.push(pixel+columns+(pixelSpace*l));
        //T
        staticArray.push(pixel-(columns*l));
        //B
        staticArray.push(pixel+(columns*l));
        for(var q = 0; q<staticArray.length; q++){
          if(pixelsID.has((staticArray[q]))){
            avg += data[staticArray[q]+color]
            counter++;
          }
        }

      //NEWLOOP
      for(var ll = 1; ll < l; ll++){
          let layerArray = []
          //L
          layerArray.push(pixel-((columns*(ll+1))-(pixelSpace*l)));
          layerArray.push(pixel+((columns*(ll+1))-(pixelSpace*l)));
          //R
          layerArray.push(pixel-((columns*(ll+1))+(pixelSpace*l)));
          layerArray.push(pixel+((columns*(ll+1))+(pixelSpace*l)));
          //T
          layerArray.push(pixel-((columns*l)-(pixelSpace*ll)));
          layerArray.push(pixel-((columns*l)+(pixelSpace*ll)));
          //T
          layerArray.push(pixel+((columns*l)-(pixelSpace*ll)));
          layerArray.push(pixel+((columns*l)+(pixelSpace*ll)));

          for(var p = 0; p<layerArray.length; p++){
            if(pixelsID.has(layerArray[p])){
              avg += data[layerArray[p]+color]
              counter++;
            }
          }

      }
      //setColorAvg
      switch (color) {
        case 0:
          avgR += avg
          break;
        case 1:
          avgG += avg
          break;
        case 2:
          avgB += avg
          break;
      }
}
}
avgR = parseInt(avgR/(counter/3))
avgG = parseInt(avgG/(counter/3))
avgB = parseInt(avgB/(counter/3))
let diffR = Math.abs(parseInt(data[pixel]-avgR));
let diffG = Math.abs(parseInt(data[pixel+1]-avgG));
let diffB = Math.abs(parseInt(data[pixel+2]-avgB));
let totalDiff = diffR + diffG + diffB;
return {avgR: avgR, avgG: avgG, avgB: avgB, diffR: diffR, diffG: diffG, diffB: diffB, totalDiff: totalDiff}
}
