//perform a random animation on the art
export default function randomEffect(){

  const divs = document.querySelectorAll('.pixel')
  var randomDivs = []
  for(var i = 0; i < divs.length; i+= 1) {
    randomDivs.push( divs[Math.floor(Math.random() * divs.length)] )
    divs[i].classList.add("pixeplay")
  };

  for(var l = 0; l < randomDivs.length; l += 1){
    randomDivs[l].style.animationDelay = (l*64)/128000 + 's'
  }

  setTimeout(function () {
    for(var i = 0; i < divs.length; i+= 1) {
    divs[i].classList.remove("pixeplay")
  }
  }, 4000);

}
