export default async function CanvasEffects(multiplier){
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const size = multiplier*64
  const columns = size * 4;
  const pixelSpace = 4;
  var counter = 0;
  var uniqueColor = [];
  var items = []
  const totalArrayLength = size*size*pixelSpace
  const sdata = ctx.getImageData(0,0,size, size);
  const background = sdata.data[0] + sdata.data[1] + sdata.data[2];
  const timer = ms => new Promise(res => setTimeout(res, ms))
  var newdata = new Uint8ClampedArray(totalArrayLength);


  //for(var loops = 1; loops <(size/2)+1 ;loops+=32){



  //blink effect
  for(var repeat = 0; repeat < 1; repeat++){
  for(var state = 0; state < 4; state+=1 ){
    const data = ctx.getImageData(0,0,size, size);
    var imageData = new ImageData(newdata, size);
    const layers = 1;
    for (var x = 0; x<size; x++){
      for(var y = 0; y<size; y++){
        var pos = (x*columns) + (y*4);
        if(pos>columns*(layers) && pos < data.data.length-columns*(layers) && y > (layers-1) && y < size-(layers)){
        for(var i = 0; i < 1 ; i++){
        var avgR = 0;
        var avgG = 0;
        var avgB = 0;
        for(var l = 1; l < layers+1 ; l++){
          for (var color = 0; color < 3; color++){
            let avg = 0;
            //left side
            avg += data.data[(pos-(columns*l)-(pixelSpace*l))+color]
            avg += data.data[(pos-(pixelSpace*l))+color]
            avg += data.data[(pos+(columns*l)-(pixelSpace*l))+color]
            //right side
            avg += data.data[(pos-(columns*l)+(pixelSpace*l))+color]
            avg += data.data[(pos-(pixelSpace*l))+color]
            avg += data.data[(pos+(columns*l)+(pixelSpace*l))+color]
            //top
            avg += data.data[(pos-(columns*l)+(pixelSpace*l))+color]
            //bottom
            avg += data.data[(pos-(columns*l)+(pixelSpace*l))+color]
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
    let diffR = Math.abs(data.data[pos]-(avgR/(8*layers)))
    let diffG = Math.abs(data.data[pos+1]-(avgG/(8*layers)))
    let diffB = Math.abs(data.data[pos+2]-(avgB/(8*layers)))
    let totalDiff = diffR + diffG + diffB;
    var minusOrPlus = 0
    var lightFactor = parseInt((size/y)*16)


  //do something random to each unique color/item
    if(counter>=3){
      let string = sdata.data[pos].toString(10) + ' ' + sdata.data[pos+1].toString(10) + ' ' + sdata.data[pos+2].toString(10);
      if(string === uniqueColor[0]){
        imageData.data[pos] = sdata.data[pos];
        imageData.data[pos+1] = sdata.data[pos+1]-parseInt(pos/(items[0]/12));
        imageData.data[pos+2] = sdata.data[pos+2];
      }
      else if(string === uniqueColor[3] || string === uniqueColor[2] || string === uniqueColor[1]){
        imageData.data[pos] = sdata.data[pos]+lightFactor-32;
        imageData.data[pos+1] = sdata.data[pos+1]+lightFactor-32;
        imageData.data[pos+2] = sdata.data[pos+2]+lightFactor-32;
      }
      else{
        imageData.data[pos] = sdata.data[pos];
        imageData.data[pos+1] = sdata.data[pos+1];
        imageData.data[pos+2] = sdata.data[pos+2];
      }
    }


    //find the background color, and you will have the outline of all items, set outline to transparent.
    //set everything else back to normal
      /*if(counter===2){
        let check = data.data[pos] + data.data[pos+1] + data.data[pos+2];
        if(check === background && pos>columns*(layers+1) && pos < data.data.length-columns*(layers+1) && y > (layers) && y < size-(layers+1)){
          imageData.data[pos] = 0;
          imageData.data[pos+1] = 0;
          imageData.data[pos+2] = 0;
        }
        else{
          imageData.data[pos] = sdata.data[pos];
          imageData.data[pos+1] = sdata.data[pos+1];
          imageData.data[pos+2] = sdata.data[pos+2];
        }
      }*/

      //set background back to normal, keep everything else same
      if(counter ===2){
        let check = data.data[pos] + data.data[pos+1] + data.data[pos+2];
        let checks = sdata.data[pos] + sdata.data[pos+1] + sdata.data[pos+2];
        let string = data.data[pos].toString(10) + ' ' + data.data[pos+1].toString(10) + ' ' + data.data[pos+2].toString(10);
        let includes = uniqueColor.includes(string)

        if(checks === background){
          imageData.data[pos] = sdata.data[pos];
          imageData.data[pos+1] = sdata.data[pos+1];
          imageData.data[pos+2] = sdata.data[pos+2];
        }
        else{
          if(!includes && (string !== '1 0 1' && string !== '211 211 211' && string !== '254 254 254' && string !== '255 255 255')){
            uniqueColor.push(string)
            items.push(pos)
          }
          imageData.data[pos] = data.data[pos];
          imageData.data[pos+1] = data.data[pos+1];
          imageData.data[pos+2] = data.data[pos+2];
        }
      }


      //set color at differences to original colors, and everything else to white.
      if(counter===1){
        if(totalDiff === 0){
          imageData.data[pos] = 255;
          imageData.data[pos+1] = 255;
          imageData.data[pos+2] = 255 ;
          imageData.data[pos+3] = 255;
        }else{
            imageData.data[pos] = sdata.data[pos];
            imageData.data[pos+1] = sdata.data[pos+1];
            imageData.data[pos+2] = sdata.data[pos+2];
            imageData.data[pos+3] = 255;
        }
      }


      //find differences
      if(counter === 0)
      {
          imageData.data[pos] = diffR;
          imageData.data[pos+1] = diffG;
          imageData.data[pos+2] = diffB;
          imageData.data[pos+3] = 255;
      }






        //loading effect
        /*
        if(pos>columns*layers && pos < data.data.length-columns*layers && y > layers && y < size-layers){*
          for(var i = 0; i < 1 ; i++){
          var avgR = 0;
          var avgG = 0;
          var avgB = 0;
          for(var l = 1; l < layers+1 ; l++){
            for (var color = 0; color < 3; color++){

            let avg = 0;
            //left side
            avg += data.data[(pos-(columns*l)-(pixelSpace*l))+color]
            avg += data.data[(pos-(pixelSpace*l))+color]
            avg += data.data[(pos+(columns*l)-(pixelSpace*l))+color]
            //right side
            avg += data.data[(pos-(columns*l)+(pixelSpace*l))+color]
            avg += data.data[(pos-(pixelSpace*l))+color]
            avg += data.data[(pos+(columns*l)+(pixelSpace*l))+color]
            //top
            avg += data.data[(pos-(columns*l)+(pixelSpace*l))+color]
            //bottom
            avg += data.data[(pos-(columns*l)+(pixelSpace*l))+color]
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
      let diffR = Math.abs(data.data[pos]-(avgR/(8*layers)))
      let diffG = Math.abs(data.data[pos+1]-(avgG/(8*layers)))
      let diffB = Math.abs(data.data[pos+2]-(avgB/(8*layers)))
      let totalDiff = diffR + diffG + diffB;




        //red shiny

        imageData.data[pos] = diffR;
        imageData.data[pos+1] = diffG;
        imageData.data[pos+2] = diffB;
        imageData.data[pos+3] = 255

        //green shiny
        /*
        imageData.data[pos] = diffR;
        imageData.data[pos+1] = totalDiff;
        imageData.data[pos+2] = diffB;
        imageData.data[pos+3] = 255*/

        //blue shiny
        /*
        imageData.data[pos] = diffR;
        imageData.data[pos+1] = diffG;
        imageData.data[pos+2] = totalDiff;
        imageData.data[pos+3] = 255*/

        //rainbow shiny
        /*
        imageData.data[pos] = diffR;
        imageData.data[pos+1] = diffG;
        imageData.data[pos+2] = diffB;
        imageData.data[pos+3] = 255*/

        //blur the image
        /*
        imageData.data[pos] = avgR/(8*layers);
        imageData.data[pos+1] = avgG/(8*layers);
        imageData.data[pos+2] = avgB/(8*layers);
        imageData.data[pos+3] = 255*/

        //turn image grey
        /*
        imageData.data[pos] = totalDiff;
        imageData.data[pos+1] = totalDiff;
        imageData.data[pos+2] = totalDiff;
        imageData.data[pos+3] = 255;*/



  }

}else{
  imageData.data[pos] = sdata.data[pos];
  imageData.data[pos+1] = sdata.data[pos+1];
  imageData.data[pos+2] = sdata.data[pos+2];
  imageData.data[pos+3] = 255;
}
    /*
      var firstLayerR = (data.data[pos-columns-4]+data.data[pos-columns]+data.data[pos-columns+4]+data.data[pos+4]+data.data[pos+columns+4]+data.data[pos+columns]+data.data[pos+columns-4]+data.data[pos-4]);
      var firstLayerG =(data.data[pos-columns-4+1]+data.data[pos-columns+1]+data.data[pos-columns+4+1]+data.data[pos+4+1]+data.data[pos+columns+4+1]+data.data[pos+columns+1]+data.data[pos+columns-4+1]+data.data[pos-4+1]);
      var firstLayerB =(data.data[pos-columns-4+2]+data.data[pos-columns+2]+data.data[pos-columns+4+2]+data.data[pos+4+2]+data.data[pos+columns+4+2]+data.data[pos+columns+2]+data.data[pos+columns-4+2]+data.data[pos-4+2]);

      var secondLayerR = (data.data[pos-(columns*2)-8]+data.data[pos-(columns*2)-4]+data.data[pos-(columns*2)]+data.data[pos-(columns*2)+4]+data.data[pos-(columns*2)+8]+data.data[pos-columns+8]+data.data[pos+8]+data.data[pos+columns+8]+data.data[pos+(columns*2)+8]+data.data[pos+(columns*2)+4]+data.data[pos+(columns*2)]+data.data[pos+(columns*2)-4]+data.data[pos+(columns*2)-8]+data.data[pos+columns-8]+data.data[pos-8]+data.data[pos-columns-8])
      var secondLayerG = (data.data[pos-(columns*2)-8+1]+data.data[pos-(columns*2)-4+1]+data.data[pos-(columns*2)+1]+data.data[pos-(columns*2)+4+1]+data.data[pos-(columns*2)+8+1]+data.data[pos-columns+8+1]+data.data[pos+8+1]+data.data[pos+columns+8+1]+data.data[pos+(columns*2)+8+1]+data.data[pos+(columns*2)+4+1]+data.data[pos+(columns*2)+1]+data.data[pos+(columns*2)-4+1]+data.data[pos+(columns*2)-8+1]+data.data[pos+columns-8+1]+data.data[pos-8+1]+data.data[pos-columns-8+1])
      var secondLayerB = (data.data[pos-(columns*2)-8+2]+data.data[pos-(columns*2)-4+2]+data.data[pos-(columns*2)+2]+data.data[pos-(columns*2)+4+2]+data.data[pos-(columns*2)+8+2]+data.data[pos-columns+8+2]+data.data[pos+8+2]+data.data[pos+columns+8+2]+data.data[pos+(columns*2)+8+2]+data.data[pos+(columns*2)+4+2]+data.data[pos+(columns*2)+2]+data.data[pos+(columns*2)-4+2]+data.data[pos+(columns*2)-8+2]+data.data[pos+columns-8+2]+data.data[pos-8+2]+data.data[pos-columns-8+2])

      var thirdLayerR = (data.data[pos-(columns*3)-12]+data.data[pos-(columns*3)-8]+data.data[pos-(columns*3)-4]+data.data[pos-(columns*3)]+data.data[pos-(columns*3)+4]+data.data[pos-(columns*3)+8]+data.data[pos-(columns*3)+12]+data.data[pos-(columns*2)+12]+data.data[pos-columns+12]+data.data[pos+12]+data.data[pos+columns+12]+data.data[pos+(columns*2)+12]+data.data[pos+(columns*3)+12]+data.data[pos+(columns*3)+8]+data.data[pos+(columns*3)+4]+data.data[pos+(columns*3)]+data.data[pos+(columns*3)-4]+data.data[pos+(columns*3)-8]+data.data[pos+(columns*3)-12]+data.data[pos+(columns*2)-12]+data.data[pos+columns-12]+data.data[pos-12]+data.data[pos-columns-12]+data.data[pos-(columns*2)-12])
      var thirdLayerG = (data.data[pos-(columns*3)-12+1]+data.data[pos-(columns*3)-8+1]+data.data[pos-(columns*3)-4+1]+data.data[pos-(columns*3)+1]+data.data[pos-(columns*3)+4+1]+data.data[pos-(columns*3)+8+1]+data.data[pos-(columns*3)+12+1]+data.data[pos-(columns*2)+12+1]+data.data[pos-columns+12+1]+data.data[pos+12+1]+data.data[pos+columns+12+1]+data.data[pos+(columns*2)+12+1]+data.data[pos+(columns*3)+12+1]+data.data[pos+(columns*3)+8+1]+data.data[pos+(columns*3)+4+1]+data.data[pos+(columns*3)+1]+data.data[pos+(columns*3)-4+1]+data.data[pos+(columns*3)-8+1]+data.data[pos+(columns*3)-12+1]+data.data[pos+(columns*2)-12+1]+data.data[pos+columns-12+1]+data.data[pos-12+1]+data.data[pos-columns-12+1]+data.data[pos-(columns*2)-12+1])
      var thirdLayerB = (data.data[pos-(columns*3)-12+2]+data.data[pos-(columns*3)-8+2]+data.data[pos-(columns*3)-4+2]+data.data[pos-(columns*3)+2]+data.data[pos-(columns*3)+4+2]+data.data[pos-(columns*3)+8+2]+data.data[pos-(columns*3)+12+2]+data.data[pos-(columns*2)+12+2]+data.data[pos-columns+12+2]+data.data[pos+12+2]+data.data[pos+columns+12+2]+data.data[pos+(columns*2)+12+2]+data.data[pos+(columns*3)+12+2]+data.data[pos+(columns*3)+8+2]+data.data[pos+(columns*3)+4+2]+data.data[pos+(columns*3)+2]+data.data[pos+(columns*3)-4+2]+data.data[pos+(columns*3)-8+2]+data.data[pos+(columns*3)-12+2]+data.data[pos+(columns*2)-12+2]+data.data[pos+columns-12+2]+data.data[pos-12+2]+data.data[pos-columns-12+2]+data.data[pos-(columns*2)-12+2])


      var avgR =parseInt(((firstLayerR)+(secondLayerR)+(thirdLayerR))/48);
      var avgG =parseInt(((firstLayerG)+(secondLayerG)+(thirdLayerG))/48);
      var avgB =parseInt(((firstLayerB)+(secondLayerB)+(thirdLayerB))/48);



      var totalDiff = (Math.abs(avgR-data.data[pos]) + Math.abs(avgG-data.data[pos+1]) + Math.abs(avgB-data.data[pos+2]))
      var diffR = Math.abs(avgR-data.data[pos])
      var diffG = Math.abs(avgG-data.data[pos+1])
      var diffB = Math.abs(avgB-data.data[pos+2])

      data.data[pos] = avgR;
      data.data[pos+1] = avgG;
      data.data[pos+2] = avgB; */

    }
  }
  ctx.putImageData(imageData, 0, 0);
  counter++;
  console.log(items)
  //await timer(1)

//}
}


}
//blink effect end
}
