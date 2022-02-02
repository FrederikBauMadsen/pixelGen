//imports
import react, {useState, useEffect} from 'react'
import './App.css';
import Pixel from './Components/pixel.js'
import Options from './Components/Options.js'
import staticCrab from './Components/staticCrab.js'
import applyBorder from './Components/applyBorder.js'
import downloadCanvas from './Components/downloadCanvas.js'
import Header from './Components/Header.js'
import { HexColorPicker } from "react-colorful";
import {staticCrabArray} from './crabConstants.js'

function App() {

  //states
  const [generated, setGenerated] = useState(false)
  const [color, setColor] = useState("#b32aa9");
  const [itemArray, setItemArray] = useState({items:[]})
  const [spawned, setSpawned] = useState(false)
  const [items, setItems] = useState([])

  //runs on render, retrieves items from localStorage
  useEffect(() => {
    getItems()
  },[]);



    //save the current itemArray
    function SaveItem(){
      let fileName = prompt("Enter a name for the file", "");
      localStorage.setItem(fileName, JSON.stringify(itemArray))
    }


    //add the currently selected item to the canvas
    function addItem(){
      var item = document.getElementById('itemSelect').value
      for(var i = 0; i < items[item].data.items.length; i += 1){
        document.getElementById(items[item].data.items[i].itemId).style.backgroundColor = items[item].data.items[i].itemColor
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


  //spawn white canvas
  function Spawn(e){
    setSpawned(true)
    setItemArray({items:[]})
    var divs = document.getElementsByClassName('pixel');
    if(generated){
      for (var i = 0; i < divs.length; i++){
      divs[i].style.backgroundColor = 'rgb(255, 255, 255)'
    }
  }else{setGenerated(true)}
  }

  //despawn canvas
  function Despawn(){
    setGenerated(false)
    setSpawned(false)
  }


  //change color of pixel to color state, save pixels that have been altered in itemArray
  function setColorCall(e){
    var array = []
    document.getElementById(e.target.id).style.backgroundColor = color;

    for(var i = 0; i < itemArray.items.length; i+=1){
      array.push(itemArray.items[i].itemId)
    }

    if(array.includes(e.target.id)){
      var n = array.indexOf(e.target.id)
      if(itemArray.items[n].itemColor !== color){
        itemArray.items[n].itemColor = color
      }
    }else{
      itemArray.items.push({itemId:e.target.id, itemColor:color})
    }
  }

  //set color state using hex color value
  function setColorWithHex(e){
    setColor(e.target.value)
  }




//spawn random crab
function spawnCrab(){
  setItemArray({items:[]})
  var randomEyes = Math.floor(Math.random()*16777215).toString(16);
  var randomBackground = Math.floor(Math.random()*16777215).toString(16);
  var divs = document.getElementsByClassName('pixel');

  setTimeout(function(){for (var i = 0; i < divs.length ; i += 1) {

    staticCrab(divs[i], randomEyes)

    if(!staticCrabArray.includes(divs[i].id)){
    divs[i].style.backgroundColor = '#'+randomBackground;
    }

  }},500)

}


  return (
  <>
  < Header />
  <div className="screen">



  {generated &&(
    <>
    <div className="functions">
      <button className="buttons" onClick={applyBorder}> Apply Border </button>
    </div>
    <div id="art">
      <Pixel getColor={setColorCall}/>
    </div>
    </>
  )}

  <div className="functions">
    <button className="buttons" name="crab" onClick={spawnCrab}> RANDOM CRAB </button>
    <button className="buttons" name="white" onClick={Spawn}> SPAWN CANVAS </button>
    <button className="buttons" onClick={Despawn}> DESPAWN </button>
    <button className="buttons" onClick={downloadCanvas}> DOWNLOAD CANVAS </button>
    <button className="buttons" onClick={SaveItem}> SAVE ITEM </button>

    {spawned &&(
    <div>
      <select id="itemSelect" name="item">
        <Options options={items} />
      </select>
      <button className="addItem" onClick={addItem}> SPAWN ITEM </button>
    </div>
   )}



    <div className="colorpicker">
      <div className="value" style={{ borderLeftColor: color }}>
        Current color is {color}
      </div>
      <HexColorPicker color={color} onChange={setColor}  />
      <input type='text' onChange={setColorWithHex} style={{margin:'9px'}}/>
    </div>
  </div>


  </div>
  </>
  );
}

export default App;
