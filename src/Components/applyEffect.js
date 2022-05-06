import getAverage from './getAverage.js';
import {savedImageData} from './Canvas.js';
import createStar from './createStar.js';
import createParticle from './createParticle.js';
import findStarPos from './findStarPos.js';
import {resetborder} from './SelectItem.js';
import checkIfBorder from './checkIfBorder.js';
import generateArrayForSelectedColors from './GenerateArrayForSelectedColors.js'
import generateArrayForItem from './GenerateArrayForItem.js'
var drawing =1;
var looping = false;
let superArray=[];



function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}



export default function applyEffect(currentItem,selectedColors,charItems,multiplier, startEffect, effectName){
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.putImageData(savedImageData, 0, 0);
  const size = multiplier*64
  const pixelSpace = 4;
  const columns = size * pixelSpace;
  let itemcolors =[];
  let colorpos = charItems.map(function(e) { return e.name; }).indexOf(currentItem);
  for(var a = 0; a<charItems.length; a++){
    let colors = charItems[a].itemColor;
    let set = new Set(colors);
    colors = Array.from(set);
    itemcolors.push(colors);
  }
  debugger;
  const colorSet = new Set(itemcolors[colorpos]);
  //const layers = 1;
  //find averages and more of current pixel
  //let averages = getAverage(pixel, layers, columns, savedImageData.data)
  if(startEffect === 'Start Effect'){
  resetborder();
  let border = [];
  var itemArray = generateArrayForItem(currentItem, charItems);
  var itemSelectedColorsArray = generateArrayForSelectedColors(itemArray, selectedColors, savedImageData);
  for(var kek = 0; kek < itemSelectedColorsArray.length; kek++){
    for(var lol = 0; lol < itemSelectedColorsArray[kek].length; lol++){
      let isBorder = checkIfBorder(savedImageData.data, itemSelectedColorsArray[kek][lol], columns, colorSet);
      if(isBorder){
        border.push(itemSelectedColorsArray[kek][lol]);

      }
    }
  }
  looping = true;
  draw();
  function draw() {
    if(looping && selectedColors.length > 0){
    setTimeout(function(){
      ctx.putImageData(savedImageData,0,0);
      const imageDataCopy = new ImageData(
        new Uint8ClampedArray(savedImageData.data),
        savedImageData.width,
        savedImageData.height
      );
        var particleArray = [];
          for(var b = 0; b < border.length; b+=Math.round(border.length/90)){
            let stage = drawing%3;
            //let offsetx = randomIntFromInterval(0, stage);
            //let offsety = randomIntFromInterval(0, stage);
            let direction = Math.random() < 0.5 ? -1 : 1;
            let newPos = border[b]+columns*9;
            particleArray.push(createParticle(newPos,columns,pixelSpace,effectName,stage));
          }

        for(var a = 0; a < particleArray.length; a++){
          for(var b = 0; b < particleArray[a].length; b++){
              imageDataCopy.data[particleArray[a][b].pixel] = particleArray[a][b].r;
              imageDataCopy.data[particleArray[a][b].pixel+1] = particleArray[a][b].g;
              imageDataCopy.data[particleArray[a][b].pixel+2] = particleArray[a][b].b;
              imageDataCopy.data[particleArray[a][b].pixel+3] = 255;
          }
        }
      ctx.putImageData(imageDataCopy,0,0);
      drawing = requestAnimationFrame(draw);
    }, 1000/144)} //set frames here
    else{
      drawing = requestAnimationFrame(draw);
      cancelAnimationFrame(drawing);
      ctx.putImageData(savedImageData, 0, 0);
      return;
    }
  }
}
else{
looping = false;
}
}
