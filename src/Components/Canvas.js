import react, {useState, useEffect} from 'react'
import SelectItem from './SelectItem.js'
import img from './13.png'
var canvas = null;
export var pixels = [];
export var pixelsID = [];
export function resetCanvas(){
 canvas = null;
}
export var savedImageData =null;

export default function Canvas(white, multiplier, pixelArray, pixelsArrayID){
  pixels = pixelArray;
  pixelsID = pixelsArrayID;
  const image = new Image()
  image.src = img
  //const timer = ms => new Promise(res => setTimeout(res, ms))
  if(canvas === null){
    canvas = document.getElementById('canvas');
    canvas.width = 896;
    canvas.height = 896;
  }

//if you have your own image
/*
  image.addEventListener('load', async function(){
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    canvas.getContext('2d').drawImage(image,0,0,64*multiplier,64*multiplier)
  })*/

//if you painted it in the program
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  let imageData = new ImageData(white,64*multiplier);
  savedImageData = imageData;
  canvas.getContext('2d').putImageData(imageData, 0, 0);

}
