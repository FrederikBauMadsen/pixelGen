//imports
import react, {useState, useEffect, useCallback } from 'react'
import './App.css';
import Pixel from './Components/pixel.js'
import Options from './Components/Options.js'
import staticCrab from './Components/staticCrab.js'
import applyBorder from './Components/applyBorder.js'
import downloadCanvas from './Components/downloadCanvas.js'
import Header from './Components/Header.js'
import { HexColorPicker } from "react-colorful";
import {staticCrabArray} from './crabConstants.js'
import {crab64} from './figures.js'
import Canvas from './Components/Canvas.js'
var savedArrays = [{}]
var redoSavedArrays = [{}]
function App() {
  //states


  function setCanvas(multiplier){
    var resolution = 64
    var totalArrayLength = (resolution*multiplier)*(resolution*multiplier)*4
    var white = new Uint8ClampedArray(totalArrayLength);

      for(var x = 0; x < resolution; x++){
        for(var y = 0; y < resolution; y++){
          var rgb =   crab64[x][y];
          rgb = rgb.replace(/[^\d,]/g, '').split(',');
          if(multiplier > 1){
            var pos1 = multiplier*multiplier*resolution*4*x+(y*8);
            var pos2 = pos1+4;
            var pos3 = pos1+((multiplier*multiplier*resolution*4*1)/2);
            var pos4 = pos3+4;
            var loop = multiplier

            for(var n = 0; n < multiplier; n++){
              for(var m = 0; m < multiplier; m++){
                let pos = (x*resolution*4*multiplier*multiplier)+(y*4*multiplier)+(resolution*multiplier*4*n)+(m*4)
                white[pos] = (parseInt(rgb[0]))
                white[pos+1] = (parseInt(rgb[1]))
                white[pos+2] = (parseInt(rgb[2]))
                white[pos+3] = (255)
              }
            }

          }else{
            let pos = (x*resolution*4)+(y*4);
            white[pos] = (parseInt(rgb[0]))
            white[pos+1] = (parseInt(rgb[1]))
            white[pos+2] = (parseInt(rgb[2]))
            white[pos+3] = (255)
          }
        }
      }
      Canvas(white, resolution, multiplier)
  }


  document.addEventListener("keyup", (event) => {
      setTimeout(function(){
        if (event.code === 'KeyZ' && (event.ctrlKey || event.metaKey)){
          setItemArray(savedArrays[savedArrays.length-1])
          redoSavedArrays.push(savedArrays[savedArrays.length-1])
        }
      },100)

}, { once: true })

  const [color, setColor] = useState("#b32aa9");
  const [itemArray, setItemArray] = useState([])
  const [items, setItems] = useState([])
  const [currentItem, setCurrentItem] = useState([])
  const [draw, setDraw] = useState(false)
  const [copy, setCopy] = useState(false)
  const [hold, setHold] = useState(false)
  const [pos, setPos] = useState('')
  const [multiplier, setMultiplier] = useState(1)
  //runs on render, retrieves items from localStorage
  const drawItemArray = useCallback(() => {
    if(itemArray.length > 0){
    for(var i = 0; i < itemArray.length; i++){
      document.getElementById(itemArray[i].itemId).style.backgroundColor = itemArray[i].itemColor;
    }
  }
  }, [itemArray])
  useEffect(() => {
    setCanvas(multiplier)
    drawItemArray()
    setTimeout(function(){
      getItems()
    }, 500)

  },[drawItemArray, multiplier]);


    function getPos(e){
      let pixel = {itemId:e.target.id, itemColor:color}
      if(draw && hold ){
        setItemArray(itemArray => [...itemArray, pixel]);
      }

    }

    //perform a random animation on the art
    function randomEffect(){

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

    //save the current itemArray
    function saveItem(){
      let fileName = prompt("Enter a name for the file", "");
      localStorage.setItem(fileName, JSON.stringify(itemArray))
    }


    //add the currently selected item to the canvas
    function addItem(){
      var item = document.getElementById('itemSelect').value
      setCurrentItem(items[item])
      for(var i = 0; i < items[item].data.length; i += 1){
        document.getElementById(items[item].data[i].itemId).style.backgroundColor = items[item].data[i].itemColor
      }
    }


    //get items from localStorage
    function getItems(){
    var items = []
    for (let i = 0; i < localStorage.length; i+= 1) {
      const key = localStorage.key(i);
      items.push({name:key, data: JSON.parse(localStorage.getItem(key))})
    }
    setItems(items)
    }


  //clear canvas to white
  function Clear(){
    savedArrays = []
    setItemArray([])
    var divs = document.getElementsByClassName('pixel');
      for (var i = 0; i < divs.length; i++){
      divs[i].style.backgroundColor = 'rgb(255, 255, 255)'
  }
  }



  //change color of pixel to color state, save pixels that have been altered in itemArray
  function setColorCall(e){
    var array = []
    var arraynum = []
    var changed = false
    let pixel = {itemId:e.target.id, itemColor:color}
    if(copy){  setColor(document.getElementById(e.target.id).style.backgroundColor)}

    for(var i = 0; i < itemArray.length; i+=1){
      array.push({itemId:itemArray[i].itemId, itemColor:itemArray[i].itemColor })
      arraynum.push(itemArray[i].itemId)
    }

    if(draw){
    if(arraynum.includes(e.target.id)){
      var n = arraynum.indexOf(e.target.id)
      if(itemArray[n].itemColor !== color){
        itemArray[n].itemColor = color
        changed = true

      }
    }else{
      setItemArray(itemArray => [...itemArray, pixel]);
      changed = true

    }
  }
    if(array.length > 0 && changed){
      savedArrays.push(array)
    }
  }

  //set color state using hex color value
  function setColorWithHex(e){
    setColor(e.target.value)
  }




// random crab
function spawnCrab(){
  setItemArray([])
  var randomEyes = Math.floor(Math.random()*16777215).toString(16);
  var randomBackground = Math.floor(Math.random()*16777215).toString(16);
  var divs = document.getElementsByClassName('pixel');

  setTimeout(function(){for (var i = 0; i < divs.length ; i += 1) {

    staticCrab(divs[i], randomEyes)

    if(!staticCrabArray.includes(divs[i].id)){
    divs[i].style.backgroundColor = '#'+randomBackground;
    }



  }},500)

  randomEffect()

}
//set state to draw
function drawstate(){
  setCopy(false)
  setDraw(true)
}


//set state to copy
function copystate(){
  setCopy(true)
  setDraw(false)
  console.log(itemArray)
  console.log(savedArrays)
  console.log(redoSavedArrays)
}

function holdstate(){
  setHold(!hold)
}

var slider = document.getElementById("slider")
function slide(e){
  var value = e.target.value
  setMultiplier(value)
}
  return (
  <>
  < Header />
  <div className="screen">
  <canvas id="canvas"></canvas>

    <>

    <div className="functions">
      <button className="buttons" onClick={applyBorder}> Apply Border </button>
      <button className="buttons" onClick={randomEffect}> Random Effect </button>
    </div>
    <div className="slider" id="slider">
		  <input type="range" min="1" max="14" onChange={slide} />
	  </div>
    <div className="position">
      pos : {pos}
    </div>

{/*
    <div id="art" onMouseDown={holdstate} onMouseUp={holdstate} >
      <Pixel getColor={setColorCall} getPos={getPos} white={white} resolution={resolution}/>
    </div>
*/}
    </>



  <div className="functions">

    <button className="buttons" name="crab" onClick={spawnCrab}> RANDOM CRAB </button>
    <button className="buttons" name="white" onClick={Clear}> CLEAR CANVAS </button>
    <button className="buttons" onClick={downloadCanvas}> DOWNLOAD CANVAS </button>
    <button className="buttons" onClick={saveItem}> SAVE ITEM </button>


    <div>
      <select id="itemSelect" name="item">
        <Options options={items} />
      </select>
      <button className="addItem" onClick={addItem}> SPAWN ITEM </button>
    </div>




    <div className="colorpicker">
      <div className="value" style={{ borderLeftColor: color }}>
        Current color is {color}
      </div>
      <HexColorPicker color={color} onChange={setColor}  />
      <input type='text' onChange={setColorWithHex} style={{margin:'9px'}}/>
      <button className="buttons" onClick={drawstate}> draw </button>
      <button className="buttons" onClick={copystate}> copy </button>
    </div>

  </div>


  </div>
  </>
  );
}

export default App;
