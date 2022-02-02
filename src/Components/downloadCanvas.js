import react from 'react'
import rowArray from './rowArray.js'
//download full current canvas as json file
export default function downloadCanvas(){
    var div = document.getElementById('art');
    var divs = div.getElementsByTagName('div');
    var divArray = [];
    for (var i = 0; i < divs.length; i += 1) {
    if(divs[i].style.backgroundColor){
    divArray.push(divs[i].style.backgroundColor);
  }
  }
  rowArray(divArray)
  }
