import getAverage from './getAverage.js';
import {savedImageData} from './Canvas.js';
import createStar from './createStar.js';
import createParticle from './createParticle.js';
import findStarPos from './findStarPos.js';
import {resetborder} from './SelectItem.js';
import generateArrayForSelectedColors from './GenerateArrayForSelectedColors.js'
import generateArrayForItem from './GenerateArrayForItem.js'
var drawing =1;
var looping = false;
let superArray=[];



function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}



export default function applyEffect(currentItem,selectedColors,charItems,multiplier, startEffect, effectName){
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.putImageData(savedImageData, 0, 0);
  const size = multiplier*64
  const pixelSpace = 4;
  const columns = size * pixelSpace;
  //const layers = 1;
  //find averages and more of current pixel
  //let averages = getAverage(pixel, layers, columns, savedImageData.data)
  if(startEffect === 'Start Effect'){
  resetborder();
  var itemArray = generateArrayForItem(currentItem, charItems);
  var itemSelectedColorsArray = generateArrayForSelectedColors(itemArray, selectedColors, savedImageData);
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
      let amountOfParticlesArray = [];
      for(var amountOfColors = 0; amountOfColors < selectedColors.length; amountOfColors++){
        var amountOfParticles = parseInt(itemSelectedColorsArray[amountOfColors].length/1500);
        if(amountOfParticles === 0){
          amountOfParticles = 1;
        }
        amountOfParticlesArray.push(amountOfParticles);
      }

        var particleArray = [];
        var stage = 2 + (drawing%5);
        let m = 5;
        let n1 = 2;
        let n2 = 7;
        let n3 = 7;
        let particle;

        for(var a = 0; a < amountOfParticlesArray.length; a++){
          for(var b = 0; b < amountOfParticlesArray[a]; b++){
            particle = createParticle(itemSelectedColorsArray[a][Math.floor(Math.random()*itemSelectedColorsArray[a].length)],columns,pixelSpace,stage,m, n1, n2, n3);
            particleArray.push(particle);
          }
        }

        for(var a = 0; a < particleArray.length; a++){
          for(var b = 0; b < particleArray[a].length; b++){
            debugger;
                imageDataCopy.data[particleArray[a][b].pixel] = particleArray[a][b].r;
              imageDataCopy.data[particleArray[a][b].pixel+1] = particleArray[a][b].g;
              imageDataCopy.data[particleArray[a][b].pixel+2] = particleArray[a][b].b;
              imageDataCopy.data[particleArray[a][b].pixel+3] = 255;
          }
        }
      ctx.putImageData(imageDataCopy,0,0);
      drawing = requestAnimationFrame(draw);
    }, 1000/5)} //set frames here
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
