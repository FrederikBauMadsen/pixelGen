//imports
import react, {useState, useEffect, useCallback } from 'react'
import './App.css';
import staticCrab from './Components/staticCrab.js'
import applyBorder from './Components/applyBorder.js'
import downloadCanvas from './Components/downloadCanvas.js'
import randomEffect from './Components/randomEffect.js'
import setResize from './Components/imgPreviewer.js'
import BuilderHTML from './Components/builderHTML.js'
import PreviewerHTML from './Components/PreviewerHTML.js'
import Header from './Components/Header.js'
import {staticCrabArray} from './crabConstants.js'
import {resetCanvas} from './Components/Canvas.js'
var savedArrays = [{}]
var redoSavedArrays = [{}]
function App() {

{/*  document.addEventListener("keyup", (event) => {
        setTimeout(function(){
          if (event.code === 'KeyZ' && (event.ctrlKey || event.metaKey)){
            setItemArray(savedArrays[savedArrays.length-1])
            redoSavedArrays.push(savedArrays[savedArrays.length-1])
          }
        },100)

  }, { once: true })*/}


  //states
  const [color, setColor] = useState("#b32aa9");
  const [itemArray, setItemArray] = useState([])
  const [items, setItems] = useState([])
  const [currentItem, setCurrentItem] = useState('none')
  const [beforeCurrentItem, setBeforeCurrentItem] = useState([])
  const [draw, setDraw] = useState(false)
  const [copy, setCopy] = useState(false)
  const [hold, setHold] = useState(false)
  const [preview64, setPreview64] = useState([])
  const [preview, setPreview] = useState(false)
  const [changed, setChanged] = useState(false)
  const [pos, setPos] = useState('')
  const [multiplier, setMultiplier] = useState(14)


  const drawItemArray = useCallback(() => {
    if(itemArray.length > 0){
    for(var i = 0; i < itemArray.length; i++){
      document.getElementById(itemArray[i].itemId).style.backgroundColor = itemArray[i].itemColor;
    }
  }
  }, [itemArray])


  useEffect(() => {
    if(preview){
    setResize(multiplier, preview64)
  }
    drawItemArray()
    setTimeout(function(){
      getItems()
    }, 500)

  },[drawItemArray, multiplier, preview, preview64, changed]);



    function getPos(e){
      let pixel = {itemId:e.target.id, itemColor:color}
      if(draw && hold ){
        setItemArray(itemArray => [...itemArray, pixel]);
      }
      let x = Math.trunc(e.target.id/64)
      let y = e.target.id%64
      setPos(x + ',' + y)
    }


    //save the current itemArray
    function saveItem(){
      let fileName = prompt("Enter a name for the file", "");
      localStorage.setItem(fileName, JSON.stringify(itemArray));
    }


    //add the currently selected item to the canvas
    function addItem(){
      var item = document.getElementById('itemSelect').value;
      var divs = document.getElementsByClassName('pixel');
      let pixel;
      let array =[];

      if(currentItem !== items[item].name){
              setBeforeCurrentItem([]);
              setCurrentItem(items[item].name);

              for(var a = 0; a < items[item].data.length; a++ ){
                  var itemColor = divs[items[item].data[a].itemId].style.backgroundColor
                  var itemId = items[item].data[a].itemId
                  pixel = {itemId, itemColor}
                  array.push(pixel)
              }

              setBeforeCurrentItem(array);

              if(currentItem !== 'none'){
                for(var i = 0; i<itemArray.length; i++){
                  divs[itemArray[i].itemId].style.backgroundColor = beforeCurrentItem[i].itemColor
                }
              }

              setItemArray(items[item].data)
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
    setChanged(false);
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
        setChanged(true);

      }
    }else{
      setItemArray(itemArray => [...itemArray, pixel]);
      setChanged(true);

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
  let randomItemsId = [];
  let randomItemsColor = [];

  var randomEyes = Math.floor(Math.random()*16777215).toString(16);
  var randomBackground = Math.floor(Math.random()*16777215).toString(16);
  var divs = document.getElementsByClassName('pixel');
  let numbers = [];

  for(var n = 0; n < items.length; n++){
    let number = Math.floor(Math.random() * items.length);
    if(!numbers.includes(numbers)){
      numbers.push(number)
    }
  }

  for(var l = 0; l < items.length; l++){
    for(var i = 0; i < items[l].data.length; i++){
      if(numbers.includes(l)){
        randomItemsId.push(items[l].data[i].itemId)
        randomItemsColor.push(items[l].data[i].itemColor)
      }
    }
  }
  setTimeout(function(){for (var i = 0; i < divs.length ; i += 1) {


    staticCrab(divs[i], randomEyes, items, randomItemsId, randomItemsColor)

    if(!staticCrabArray.includes(divs[i].id) && !randomItemsId.includes(divs[i].id)){
    divs[i].style.backgroundColor = '#'+randomBackground;
    }



  }},1000)


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
}

function holdstate(){
  setHold(!hold)
  }



function slide(e){
  var value = e.target.value
  setMultiplier(value)
}


function previewer(){
  resetCanvas()
    if(preview === false){
      setPreview64(downloadCanvas())
    }
    setPreview(!preview)
}
  return (
  <>
  < Header />
  <div className="screen">

  {preview && (
    <PreviewerHTML slide={slide} previewer={previewer} multiplier={multiplier}/>
  )}



    <BuilderHTML pos={pos} getPos={getPos} applyBorder={applyBorder} randomEffect={randomEffect} previewer={previewer} holdstate={holdstate} setColorCall={setColorCall} spawnCrab={spawnCrab} Clear={Clear} downloadCanvas={downloadCanvas} saveItem={saveItem} items={items} addItem={addItem} color={color} setColor={setColor} drawstate={drawstate} copystate={copystate} setColorWithHex={setColorWithHex} />


  </div>
  </>

  );
}

export default App;
