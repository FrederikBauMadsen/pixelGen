
import {crabOutline, crabMeat, crabEyesBlack, crabEyesGrey, crabEyesWhite, crabEyesColor, crabMouth} from '../crabConstants.js'
  //generate the base crab
export default function staticCrab(x,randomEyes){
      if(crabOutline.includes(x.id)){
       x.style.backgroundColor = 'rgb(125, 14, 10)';
      }
      if(crabMeat.includes(x.id)){
       x.style.backgroundColor = 'rgb(210, 24, 17)';
      }
      if(crabEyesGrey.includes(x.id)){
        x.style.backgroundColor = 'rgb(211, 211, 211)';
      }
      if(crabEyesBlack.includes(x.id)){
        x.style.backgroundColor = 'rgb(1, 0, 1)';
      }
      if(crabEyesWhite.includes(x.id)){
        x.style.backgroundColor = 'rgb(255, 255, 255)';
      }
      if(crabEyesColor.includes(x.id)){
        x.style.backgroundColor = '#'+ randomEyes;
      }
      if(crabMouth.includes(x.id)){
       x.style.backgroundColor = 'rgb(255, 255, 255)';
      }
  }
