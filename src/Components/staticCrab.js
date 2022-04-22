import {crabOutline, crabMeat, crabEyesBlack, crabEyesGrey, crabEyesWhite, crabEyesColor, crabMouth, staticCrabArray} from '../crabConstants.js'
  //generate the base crab
export default function staticCrab(randomItemsName,items,randomCategories, background, objectArray){


let layers = [];
let layersID =[];
let layersColors =[];

//layer1
for(var i = 0; i < objectArray.length; i++){
  if(objectArray[i].category == 'nature'){
      layersID.push(... objectArray[i].itemId);
      layersColors.push(... objectArray[i].itemColor);
  }
}
//layer2
for(var o = 0; o < objectArray.length; o++){
  if(objectArray[o].category === 'eyes'){
    layersID.push(... objectArray[o].itemId);
    layersColors.push(... objectArray[o].itemColor);
  }
}
//layer3
for(var p = 0; p < objectArray.length; p++){
  if(objectArray[p].category === 'hats'){
    layersID.push(... objectArray[p].itemId);
    layersColors.push(... objectArray[p].itemColor);
  }
}
//layer4
for(var l = 0; l < objectArray.length; l++){
  if(objectArray[l].category === 'accessories'){
    layersID.push(... objectArray[l].itemId);
    layersColors.push(... objectArray[l].itemColor);
  }
}
//layer5
for(var k = 0; k < objectArray.length; k++){
  if(objectArray[k].category === 'righthand'){
    layersID.push(... objectArray[k].itemId);
    layersColors.push(... objectArray[k].itemColor);
  }
}
//layer6
for(var j = 0; j < objectArray.length; j++){
  if(objectArray[j].category === "lefthand"){
    layersID.push(... objectArray[j].itemId);
    layersColors.push(... objectArray[j].itemColor);
  }
}

var golden = Math.random() < 0.1;

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

  let rows = [];
  let array = [];
  let ids = [];

    for(var i =0; i < 4096; i++){
      let itemsInclude = layersID.includes(i.toString());

      if(crabOutline.includes(i.toString()) && !itemsInclude){
      if(golden){
        array.push('rgb(218,165,32)');
      }else{
        array.push('rgb(115,14,10)');
      }
       ids.push(i);
      }
      if(crabMeat.includes(i.toString()) && !itemsInclude){
        if(golden){
          array.push('rgb(255,215,0)');
        }else{
          array.push('rgb(210,90,50)');
        }

       ids.push(i);
      }
      if(crabEyesGrey.includes(i.toString()) && !itemsInclude){
        array.push('rgb(211,211,211)');
        ids.push(i);
      }
      if(crabEyesBlack.includes(i.toString()) && !itemsInclude){
        array.push('rgb(1,0,1)');
        ids.push(i);
      }
      if(crabEyesWhite.includes(i.toString()) && !itemsInclude){
        array.push('rgb(254,254,254)');
        ids.push(i);
      }
      if(crabEyesColor.includes(i.toString()) && !itemsInclude){
        array.push(eyes);
        ids.push(i);
      }
      if(crabMouth.includes(i.toString()) && !itemsInclude){
       array.push('rgb(254,254,254)');
        ids.push(i);
      }

      if(itemsInclude){
        debugger;
        let r;
        let g;
        let b;
        if (layersColors[layersID.indexOf(i.toString())].charAt( 0 ) === '#' ){
          r = hexToRgb(layersColors[layersID.indexOf(i.toString())]).r
          g = hexToRgb(layersColors[layersID.indexOf(i.toString())]).g
          b = hexToRgb(layersColors[layersID.indexOf(i.toString())]).b
          let rgb = 'rgb(' + r + ',' + g + ',' + b + ')'
          array.push(rgb)
          ids.push(i);
        }else{
          array.push(layersColors[layersID.indexOf(i.toString())]);
          ids.push(i);
        }
      }

      if(!staticCrabArray.includes(i.toString())  && !itemsInclude){
        array.push(background)
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
