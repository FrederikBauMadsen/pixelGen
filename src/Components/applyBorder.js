
//apply or remove 1px border
export default function applyBorder(){
    var divs = document.getElementsByClassName('pixel');
    for (var i = 0; i < divs.length; i++){
        if(divs[i].style.border === 'none'){
          divs[i].style.border = '1px solid rgba(0, 0, 0, .3)'
        }else{
          divs[i].style.border = 'none'
        }
    }
  }
