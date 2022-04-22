export default function createStar(pixel, size, columns, pixelSpace){
//size should be 6,8,10,12 so on
let starArray = [];
//x and y axis
for(var axis=1; axis<size+1; axis++){
  //x-axis
  starArray.push(pixel-(pixelSpace*axis));
  starArray.push(pixel+(pixelSpace*axis));
  //y-axis
  starArray.push(pixel-(columns*axis));
  starArray.push(pixel+(columns*axis));
}
//diagonals
for(var diagonals=1; diagonals<((size-2)/2)+1; diagonals++){
  starArray.push(pixel-(columns*diagonals)-(pixelSpace*diagonals));
  starArray.push(pixel+(columns*diagonals)+(pixelSpace*diagonals));
  starArray.push(pixel-(columns*diagonals)+(pixelSpace*diagonals));
  starArray.push(pixel+(columns*diagonals)-(pixelSpace*diagonals));
}

//surroundDiagonalsFill
for(var surroundDiagonalsFill=1;surroundDiagonalsFill<((size/2)-1);surroundDiagonalsFill++ ){
    //horizontal
    starArray.push(pixel+(columns*surroundDiagonalsFill)+(pixelSpace*(surroundDiagonalsFill+1)));
    starArray.push(pixel+(columns*surroundDiagonalsFill)-(pixelSpace*(surroundDiagonalsFill+1)));
    starArray.push(pixel-(columns*surroundDiagonalsFill)+(pixelSpace*(surroundDiagonalsFill+1)));
    starArray.push(pixel-(columns*surroundDiagonalsFill)-(pixelSpace*(surroundDiagonalsFill+1)));
    //vertical
    starArray.push(pixel+(pixelSpace*surroundDiagonalsFill)+(columns*(surroundDiagonalsFill+1)));
    starArray.push(pixel+(pixelSpace*surroundDiagonalsFill)-(columns*(surroundDiagonalsFill+1)));
    starArray.push(pixel-(pixelSpace*surroundDiagonalsFill)+(columns*(surroundDiagonalsFill+1)));
    starArray.push(pixel-(pixelSpace*surroundDiagonalsFill)-(columns*(surroundDiagonalsFill+1)));
  }

//horizontal and vertical fill
    for(var horiverFill = 3; horiverFill<size+1; horiverFill++){
  //horizontal
  starArray.push(pixel+columns+(pixelSpace*(horiverFill-2)));
  starArray.push(pixel+columns-(pixelSpace*(horiverFill-2)));
  starArray.push(pixel-columns+(pixelSpace*(horiverFill-2)));
  starArray.push(pixel-columns-(pixelSpace*(horiverFill-2)));

  //vertical
  starArray.push(pixel+pixelSpace+(columns*(horiverFill-2)));
  starArray.push(pixel+pixelSpace-(columns*(horiverFill-2)));
  starArray.push(pixel-pixelSpace+(columns*(horiverFill-2)));
  starArray.push(pixel-pixelSpace-(columns*(horiverFill-2)));
}

starArray.push(pixel);
return starArray;

}
