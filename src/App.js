//imports
import react, {useState, useEffect, useCallback } from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './Components/Home.js';
import checkWhiteSpace from './Components/checkWhiteSpace.js';
import hexToRgb from './Components/HexToRgb.js';
import Create from './Components/Create.js';
import downloadCanvas from './Components/downloadCanvas.js';
import applyBorder from './Components/applyBorder.js';
import './App.css';
import Header from './Components/Header.js';
import axios from "axios";
import staticCrab from './Components/staticCrab.js';
import setResize from './Components/imgPreviewer.js';
import {staticCrabArray} from './crabConstants.js';
import {resetCanvas} from './Components/Canvas.js';

function App() {



  //states
  const [color, setColor] = useState("#b32aa9");
  const [itemArray, setItemArray] = useState([]);
  const [items, setItems] = useState([{
      name:'',
      category:'',
      content:[]
  }]);
  const [currentItem, setCurrentItem] = useState('none');
  const [beforeCurrentItem, setBeforeCurrentItem] = useState([]);
  const [viewState, setViewState] = useState(false);
  const [preview64, setPreview64] = useState();
  const [charItems, setCharItems] = useState([]);
  const [changed, setChanged] = useState(0);
  const [pos, setPos] = useState('');
  const [multiplier, setMultiplier] = useState(14);
  const backgrounds = ['rgb(145,160,180)', 'rgb(201, 180, 253)', 'rgb(232, 231, 201)' , 'rgb(217, 165, 215)', 'rgb(176, 156, 156)', 'rgb(137, 194, 246)', 'rgb(175, 224, 159)'];

  useEffect(() => {
    if(viewState){
      setResize(multiplier, preview64)
    }
    setTimeout(function(){
      getItems()
    }, 200)
  },[multiplier, preview64, changed]);


    function getPos(e){
      let x = Math.trunc(e.target.id/64);
      let y = e.target.id%64;
      setPos(x + ',' + y);
    }


    //save the current itemArray
    function saveItem(name, category){
      const newItem = {
        name: name,
        category: category,
        content: itemArray
      }
      axios.post('http://localhost:3001/Create', newItem);
    }


    //add the currently selected item to the canvas
    function addItem(){
      setChanged(changed+1);

      var item = document.getElementById('itemSelect').value;
      if(currentItem !== items[item].name){
        debugger;
        for(var a = 0; a < itemArray.length; a++){
          document.getElementById(itemArray[a].itemId).style.backgroundColor = '';
        }
        setCurrentItem(items[item].name);
        setItemArray(items[item].content);
        for(var b = 0; b < items[item].content.length; b++ ){
          document.getElementById(items[item].content[b].itemId).style.backgroundColor = items[item].content[b].itemColor;
        }
      }else{
        return;
      }

    }


    //get items from localStorage
    function getItems(){
    var items = []
    fetch("/items").then(res => {
        if(res.ok) {
            return res.json()
        }
    }).then(jsonRes => setItems(jsonRes))
    }


  //clear canvas to white
  function Clear(){
    setItemArray([])
    var divs = document.getElementsByClassName('pixel');
      for (var i = 0; i < divs.length; i++){
      divs[i].style.backgroundColor = ''
  }
  }



  //change color of pixel to color state, save pixels that have been altered in itemArray
  function setColorCall(e){
    var array = []
    var arraynum = []
    let pixel = {itemId:e.target.id, itemColor:color}

        for(var i = 0; i < itemArray.length; i+=1){
          array.push({itemId:itemArray[i].itemId, itemColor:itemArray[i].itemColor })
          arraynum.push(itemArray[i].itemId)
        }

      if(pixel.itemColor === ''){
        if(arraynum.includes(e.target.id)){
          array.splice(arraynum.indexOf(e.target.id),1);
          setItemArray(array);
        }else{
          return;
        }
      }else{
        if(arraynum.includes(e.target.id)){
          var n = arraynum.indexOf(e.target.id)
          if(array[n].itemColor !== color){
            array[n].itemColor = color
            setItemArray(array);
          }else{
            return;
          }
        }else{
          array.push(pixel);
          setItemArray(array);

        }
      }

  }

  //set color state using hex color value
  function setColorWithHex(e){
    setColor(e.target.value)
  }


// 0.5 opacity Char
function spawnChar(){
  Clear();
  var div = document.getElementById('art');
  var divs = div.getElementsByTagName('div');
  for (var i = 0; i < divs.length; i += 1) {
    if(staticCrabArray.includes(divs[i].id)){
      divs[i].style.backgroundColor = 'rgba(0,0,0,0.5)';
    }
  }
}

// random crab
function spawnCrab(){

  window.scroll({
  top: 200,
  left: 100,
  behavior: 'smooth'
});
  setCharItems([])
  setViewState(true);
  const random = Math.floor(Math.random() * backgrounds.length);
  const background = backgrounds[random];
  let object = {};
  let objectArray = [];
  let randomItemsId = [];
  let randomItemsColor = [];
  let randomItemsName = [];
  let randomCategories = [];

  let categories = []
  for(var c = 0; c < items.length; c++){
    if(!categories.includes(items[c].category)){
      categories.push(items[c].category)
    }
  }

  let numbers = [];

  for(var n = 0; n < 8; n++){
    let number = Math.floor(Math.random() * items.length);
    if(!numbers.includes(number)){
      numbers.push(number)
    }
  }

  for(var l = 0; l < numbers.length; l++){
    let itemsId = [];
    let itemsColor = [];
    if(!randomCategories.includes(items[numbers[l]].category)){
    for(var i = 0; i < items[numbers[l]].content.length; i++){
      if(items[numbers[l]].content[i].itemColor.charAt(0) === '#'){
        let array = hexToRgb(items[numbers[l]].content[i].itemColor);
        let string = 'rgb(' + array[0] + ',' + array[1] + ',' + array[2] + ')';
        itemsId.push(items[numbers[l]].content[i].itemId)
        randomItemsId.push(items[numbers[l]].content[i].itemId)
        itemsColor.push(string)
        randomItemsColor.push(string)
      }
      else if(checkWhiteSpace(items[numbers[l]].content[i].itemColor)){
        let noWhiteSpace = items[numbers[l]].content[i].itemColor.replaceAll(" ", "");
        itemsId.push(items[numbers[l]].content[i].itemId)
        randomItemsId.push(items[numbers[l]].content[i].itemId)
        itemsColor.push(noWhiteSpace)
        randomItemsColor.push(noWhiteSpace)
      }
      else{
        itemsId.push(items[numbers[l]].content[i].itemId)
        randomItemsId.push(items[numbers[l]].content[i].itemId)
        itemsColor.push(items[numbers[l]].content[i].itemColor)
        randomItemsColor.push(items[numbers[l]].content[i].itemColor)
      }
    }
      randomCategories.push(items[numbers[l]].category)
      randomItemsName.push(items[numbers[l]].name)
      object =
      {
        name: items[numbers[l]].name,
        category: items[numbers[l]].category,
        itemId: itemsId,
        itemColor: itemsColor
      }
      objectArray.push(object);
    }
  }

    setCharItems(objectArray);
    setPreview64(staticCrab(randomItemsName, items,randomCategories, background, objectArray));
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
      <Route path={"/"} element={<Home multiplier={multiplier} slide={slide} spawnCrab={spawnCrab} charItems={charItems}/>}/>
      <Route path={"/Create"} element={<Create spawnChar={spawnChar} pos={pos}  applyBorder={applyBorder} getPos={getPos} getColor={setColorCall} Clear={Clear} saveItem={saveItem} items={items} addItem={addItem} color={color} setColor={setColor} setColorWithHex={setColorWithHex} />} />
    </Routes>
    </Router>
  </div>
  );
}

export default App;
