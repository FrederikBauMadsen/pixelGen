import react, {useState, useEffect} from 'react'
import img from './13.png'

export default function Canvas(white, resolution, multiplier){
  const timer = ms => new Promise(res => setTimeout(res, ms))
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = resolution*multiplier;
  canvas.height = resolution*multiplier;
  const image = new Image()
  image.src = img

  image.addEventListener('load', async function(){
    let imageData = new ImageData(white,resolution*multiplier);
    ctx.putImageData(imageData, 0, 0);
    {/*
    const data = ctx.getImageData(0,0,canvas.width,canvas.height)
    var backgroundColor = [data.data[0], data.data[1], data.data[2], data.data[3]]
    var backgroundArray = []
    var characterArray = []
    //create array with each pixel as array of [r,g,b,a]
    var data4 = []
    for (var m = 0; m < data.data.length; m+=4) {
      var array = []
      for(var n = 0; n < 4; n += 1){
          array.push(data.data[m+n])
      }
      data4.push(array)
    }

    function arrayEquals(a, b) {
      return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
      }

    for(var i = 0; i < data4.length; i += 1){
      if(arrayEquals(backgroundColor, data4[i])){
        backgroundArray.push(i)
      }
      else{
        characterArray.push(i)
      }
    }

    console.log(backgroundArray, characterArray)


//variables
  var speed = 32
  var rgbapos = 4


  //bg animation
for(var loop = 0; loop< 150; loop +=1){
  if(loop % 2 === 0){
  var num = Math.floor(Math.random() * 255)
  var rgba = Math.floor(Math.random() * 4)
  for(var c = 0; c < characterArray.length; c++){
    data.data[((characterArray[c]+1)*4)-rgbapos] = num
  }

  ctx.putImageData(data,0,0)
  await timer(500)
}
else{
  var num = Math.floor(Math.random() * 255)
  var rgba = Math.floor(Math.random() * 4)
  for(var c = 0; c < characterArray.length; c++){
    data.data[((characterArray[c]+1)*4)-rgbapos] = num

  }

  ctx.putImageData(data,0,0)
  await timer(500)
}

}
*/}

  //whole pic animation
    {/*for(var b = 0; b < 4; b += 1){

      if(b % 2 == 0){
        var num = Math.floor(Math.random() * 255)
        for(var a = 0; a < canvas.height/speed; a++){
          for(var i = 0; i < ((a+1)*900*4)*speed ; i+=4*speed){
            for(var l = 0; l < 4*speed; l += 4){
              if()
              data.data[i+rgbapos+l] = num
            }
          }

          ctx.putImageData(data,0,0)
          await timer(1)
        }
     }
     else{
       var num = Math.floor(Math.random() * 255)
        for(var a = 0; a < canvas.height/speed; a++){
          for(var i = 0; i < ((a+1)*900*4)*speed; i+=4*speed){
            for(var l = 0; l < 4*speed; l += 4){
              data.data[i+rgbapos+l] = num
            }
          }

          ctx.putImageData(data,0,0)
          await timer(1)
        }
    }
  }*/}



    //level up
    {/*
    for(var a = 0; a < 10; a++){
        for(var i = 0; i < data.data.length; i+=4){
          if(a % 2 == 0) {
            data.data[i+3] = 40
          }
          else {
            data.data[i+3]= 80
          }
        }

        ctx.putImageData(data,0,0)
        console.log(a)
        await timer(250);
    }
      for(var a = 0; a < 10; a++){
          for(var i = 0; i < data.data.length; i+=4){
            if(a % 2 == 0 && a != 10) {
              data.data[i+3] = 80
            }
            else {
              data.data[i+3]= 160
            }
            if(a == 9){
              data.data[i+3] = 230
            }
          }

          ctx.putImageData(data,0,0)
          console.log(a)
          await timer(150);
      }
      */}





  })

}
