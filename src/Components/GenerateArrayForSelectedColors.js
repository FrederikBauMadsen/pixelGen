export default function generateArrayForSelectedColors(itemArray, selectedColors, savedImageData ){
  const itemcolorsSet = new Set(selectedColors);
  var itemSelectedColorsArray = [];
  for(var colors = 0; colors < selectedColors.length; colors++){
    itemSelectedColorsArray.push([])
  }
  //iterate through all subarrays in itemArray
  for(var a = 0; a < itemArray.length; a++){
    //columns of subarrays
    for(var x = 0; x < itemArray[a].positions.length; x++){
      //rows of subarrays
      for(var y = 0; y < itemArray[a].positions[x].length; y++ ){
        //current pixel
        let pixel = itemArray[a].positions[x][y];
        let pixelRGB = 'rgb('+savedImageData.data[pixel]+','+savedImageData.data[pixel+1]+','+savedImageData.data[pixel+2]+')';
        if(itemcolorsSet.has(pixelRGB)){
          itemSelectedColorsArray[selectedColors.indexOf(pixelRGB)].push(pixel);
        }
      }
    }
  }
  return itemSelectedColorsArray;
}
