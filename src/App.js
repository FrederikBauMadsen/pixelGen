//imports
import react, {useState, useEffect, useCallback } from 'react'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from './Components/Home.js'
import Create from './Components/Create.js'
import {white} from './figures.js'
import downloadCanvas from './Components/downloadCanvas.js'
import applyBorder from './Components/applyBorder.js'
import './App.css';
import Header from './Components/Header.js';
import axios from "axios";
import staticCrab from './Components/staticCrab.js'
import setResize from './Components/imgPreviewer.js'
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
  const [items, setItems] = useState([{
      name:'',
      category:'',
      content:[]
  }])

  const [currentItem, setCurrentItem] = useState('none')
  const [beforeCurrentItem, setBeforeCurrentItem] = useState([])
  const [viewState, setViewState] = useState(false)
  const [draw, setDraw] = useState(false)
  const [copy, setCopy] = useState(false)
  const [hold, setHold] = useState(false)
  const [preview64, setPreview64] = useState(white)
  //const [categories, setCategories] = useState([])
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

    if(viewState){
      setResize(multiplier, preview64)
    }else{
      setTimeout(drawItemArray(),1000)
    }


    setTimeout(function(){
      getItems()
    }, 500)

  },[drawItemArray, multiplier, preview64, changed]);



    function getPos(e){
      if(draw && hold ){
        let pixel = {itemId:e.target.id, itemColor:color}
        setItemArray(itemArray => [...itemArray, pixel]);
      }
      let x = Math.trunc(e.target.id/64)
      let y = e.target.id%64
      setPos(x + ',' + y)
    }


    //save the current itemArray
    function saveItem(e){
      let name = prompt("Enter a name for the file", "");
      let category = prompt("what category should the item be added to?", "");

      const newItem = {
        name: name,
        category: category,
        content: itemArray
      }

      axios.post('http://localhost:3001/Create', newItem)
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

              for(var a = 0; a < items[item].content.length; a++ ){
                  var itemColor = divs[items[item].content[a].itemId].style.backgroundColor
                  var itemId = items[item].content[a].itemId
                  pixel = {itemId, itemColor}
                  array.push(pixel)
              }

              setBeforeCurrentItem(array);

              if(currentItem !== 'none'){
                for(var i = 0; i<itemArray.length; i++){
                  divs[itemArray[i].itemId].style.backgroundColor = beforeCurrentItem[i].itemColor
                }
              }

              setItemArray(items[item].content)
      }

    }


    //get items from localStorage
    function getItems(){
    var items = []
    fetch("/items").then(res => {
        if(res.ok) {
            return res.json()
        }

    }).then(jsonRes => setItems(jsonRes));

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
  setViewState(true);
  let randomItemsId = [];
  let randomItemsColor = [];
  let randomItemsName = [];

  let numbers = [];

  for(var n = 0; n < 8; n++){
    let number = Math.floor(Math.random() * items.length);
    if(!numbers.includes(number)){
      numbers.push(number)
    }
  }

  for(var l = 0; l < numbers.length; l++){
    for(var i = 0; i < items[numbers[l]].content.length; i++){
        randomItemsId.push(items[numbers[l]].content[i].itemId)
        randomItemsColor.push(items[numbers[l]].content[i].itemColor)
    }
    randomItemsName.push(items[numbers[l]].name)
  }

    setPreview64(staticCrab(randomItemsName,items, randomItemsId, randomItemsColor))
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

function previewer(e){
  resetCanvas()
  setItemArray([])
  if(e.target.value==="view"){
    setViewState(true)
  }else{
    setViewState(false)
  }

}

function setPreview(x){
    setPreview64(x)
}


  return (
  <div className="screen">
    <Router>
    < Header previewer={previewer} />
    <Routes>
      <Route path={"/"} element={<Home multiplier={multiplier} slide={slide} spawnCrab={spawnCrab}/>}/>
      <Route path={"/Create"} element={<Create pos={pos}  applyBorder={applyBorder} getPos={getPos} holdstate={holdstate} getColor={setColorCall} Clear={Clear} saveItem={saveItem} items={items} addItem={addItem} color={color} setColor={setColor} drawstate={drawstate} copystate={copystate} setColorWithHex={setColorWithHex} />} />
    </Routes>
    </Router>
  </div>
  );
}

export default App;
