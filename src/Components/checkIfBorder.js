//check if leftAboveRightBelow pixels are all contained in the item array
export default function checkIfBorder(data, pixel, columns, itemcolorsSet){
  let pixelSpace = 4;
  let leftAboveRightBelow = ['rgb('+data[pixel-pixelSpace]+','+data[pixel+1-pixelSpace]+','+data[pixel+2-pixelSpace]+')', 'rgb('+data[pixel-columns]+','+data[pixel+1-columns]+','+data[pixel+2-columns]+')', 'rgb('+data[pixel+pixelSpace]+','+data[pixel+1+pixelSpace]+','+data[pixel+2+pixelSpace]+')', 'rgb('+data[pixel+columns]+','+data[pixel+1+columns]+','+data[pixel+2+columns]+')' ]
  let checkarray =[];
  for(var check = 0; check < leftAboveRightBelow.length; check++){
    if(itemcolorsSet.has(leftAboveRightBelow[check])){
      checkarray.push('true');
    }
    else{
      checkarray.push('false');
    }
  }
  let checkarraySet = new Set(checkarray);
  if(checkarraySet.has('false')){
    return true;
  }else{
    return false;
  }
}
