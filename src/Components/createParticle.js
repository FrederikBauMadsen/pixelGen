import SuperFormula from './SuperFormula.js';
export default function createParticle(pixel, columns, pixelSpace,size,m, n1, n2, n3){
//size should be 6,8,10,12 so on

  let array =[];
  let arrayPos = [];
  for(var i = 0; i < size; i++){
    for(var pixels=0; pixels < 1; pixels+=0.001){
      let particle = SuperFormula(m,n1,n2,n3,(pixels*(Math.PI*2))/1,i,i);
      let x = Math.round(particle.x);
      let y = Math.round(particle.y);
      let pos = parseInt(pixel+(x*pixelSpace)+(y*columns));
      let remainder = pos%4;
      let newPos = pos-remainder;
      if(arrayPos.includes(newPos)){
        arrayPos.slice(arrayPos.length,1);
      }else{
        array.push({
         pixel:newPos,
         r:211,
         g:175,
         b:55
        });
      }
      arrayPos.push(newPos);
  }
}
return array;
}
