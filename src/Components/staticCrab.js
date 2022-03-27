import {crabOutline, crabMeat, crabEyesBlack, crabEyesGrey, crabEyesWhite, crabEyesColor, crabMouth, staticCrabArray} from '../crabConstants.js'
  //generate the base crab
export default function staticCrab(randomItemsName,items, randomItemsId, randomItemsColor){
console.log(randomItemsName)


  function random_rgb() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

  var eyes = random_rgb();
  var bg = random_rgb();
  let rows = [];
  let array = [];
  let ids = [];

    for(var i =0; i < 4096; i++){

      let itemsInclude = randomItemsId.includes(i.toString());

      if(crabOutline.includes(i.toString()) && !itemsInclude){
       array.push('rgb(125, 14, 10)');
       ids.push(i);
      }
      if(crabMeat.includes(i.toString()) && !itemsInclude){
       array.push('rgb(210, 24, 17)');
       ids.push(i);
      }
      if(crabEyesGrey.includes(i.toString()) && !itemsInclude){
        array.push('rgb(211, 211, 211)');
        ids.push(i);
      }
      if(crabEyesBlack.includes(i.toString()) && !itemsInclude){
        array.push('rgb(1, 0, 1)');
        ids.push(i);
      }
      if(crabEyesWhite.includes(i.toString()) && !itemsInclude){
        array.push('rgb(254, 254, 254)');
        ids.push(i);
      }
      if(crabEyesColor.includes(i.toString()) && !itemsInclude){
        array.push(eyes);
        ids.push(i);
      }
      if(crabMouth.includes(i.toString()) && !itemsInclude){
       array.push('rgb(254, 254, 254)');
        ids.push(i);
      }

      if(randomItemsId.includes(i.toString())){
        let r;
        let g;
        let b;

        if (randomItemsColor[randomItemsId.indexOf(i.toString())].charAt( 0 ) === '#' ){
          r = hexToRgb(randomItemsColor[randomItemsId.indexOf(i.toString())]).r
          g = hexToRgb(randomItemsColor[randomItemsId.indexOf(i.toString())]).g
          b = hexToRgb(randomItemsColor[randomItemsId.indexOf(i.toString())]).b
          let rgb = 'rgb(' + r + ',' + g + ',' + b + ')'
          array.push(rgb)
          ids.push(i);
        }else{
          array.push(randomItemsColor[randomItemsId.indexOf(i.toString())]);
          ids.push(i);
        }


      }

      if(!staticCrabArray.includes(i.toString())  && !itemsInclude){
        array.push(bg)
        ids.push(i);
      }

    }


    while (array.length) {
    rows.push(
      array.splice(0, 64)
    )
  }
      return rows;

  }
