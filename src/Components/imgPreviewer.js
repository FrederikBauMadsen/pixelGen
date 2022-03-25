import Canvas from './Canvas.js'
export default function setResize(multiplier, preview64){
  var resolution = 64
  var totalArrayLength = (resolution*multiplier)*(resolution*multiplier)*4
  var white = new Uint8ClampedArray(totalArrayLength);
    for(var x = 0; x < resolution; x++){
      for(var y = 0; y < resolution; y++){
        var rgb =   preview64[x][y]
        rgb = rgb.replace(/[^\d,]/g, '').split(',')
        if(multiplier > 1){
          for(var n = 0; n < multiplier; n++){
            for(var m = 0; m < multiplier; m++){
              let pos = (x*resolution*4*multiplier*multiplier)+(y*4*multiplier)+(resolution*multiplier*4*n)+(m*4)
              white[pos] = (Math.floor(rgb[0]))
              white[pos+1] = (Math.floor(rgb[1]))
              white[pos+2] = (Math.floor(rgb[2]))
              white[pos+3] = (255)
            }
          }

        }else{
          let pos = (x*resolution*4)+(y*4)
          white[pos] = (Math.floor(rgb[0]))
          white[pos+1] = (Math.floor(rgb[1]))
          white[pos+2] = (Math.floor(rgb[2]))
          white[pos+3] = (255)
        }
      }

    }
    Canvas(white, multiplier);

}
