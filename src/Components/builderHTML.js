import react from 'react'
import { HexColorPicker } from "react-colorful";
import Options from './Options.js'


window.addEventListener("mousedown", function(){
    hold = true;
})
window.addEventListener("mouseup", function(){
    hold = false;
})


var hold;
var draw = true;
var name;
var category = null;
export default function BuilderHTML({spawnChar,getPos, pos, applyBorder, getColor, spawnCrab, Clear, saveItem, items, addItem, color, setColor, setColorWithHex}){


  function erase(){
    setColor('');
  }
  function saveData(){
    saveItem(name,category);
  }
  function updateName(e){
    name = e.target.value
  }
  function updateCategory(e){
    category = e.target.value
    let array = document.getElementsByClassName('categoryButton');
    for(var i = 0; i<array.length; i++){
      if(array[i].value === category){
        array[i].classList.add("categoryButtonActive");
      }else{
        array[i].classList.remove("categoryButtonActive");
      }
    }
    document.getElementById('nameInput').style.display = 'block';
  }

  function save(e){
    document.getElementById('savebox').style.display = 'flex';
  }

  var array = [];
  for(var i = 0; i < 4096; i++){
    array.push(i);
  }

  function drawstate(){
    draw = true;
  }

  function copystate(){
    draw = false;
  }

  function paintclick(e){
    if(draw){
      document.getElementById(e.target.id).style.backgroundColor = color;
      getColor(e,draw);
    }else{
      setColor(document.getElementById(e.target.id).style.backgroundColor)
    }
  }

  function paint(e){
    getPos(e);
    if(draw){
      if(!hold){
        return;
      }else{
        document.getElementById(e.target.id).style.backgroundColor = color;
        getColor(e);
      }
    }
  }

  var list = array.map((item, index)=><div  id={index} key={index} className={"pixel"} onMouseOver={paint} onClick={paintclick} ></div>)

  return(
    <div className="Builder">
    <div className="functions">
      <button className="buttons" onClick={spawnChar}> Spawn Char </button>
      <button className="buttons" onClick={applyBorder}> Apply Border </button>
      <button className="buttons" name="white" onClick={Clear}> CLEAR CANVAS </button>
    </div>
    <div className="artContain">
      <div className="position">
        pos : {pos}
      </div>
      <div id="art" className="drawingContainer">
        {list}
      </div>
    </div>
  <div className="functions">
    <button className="buttons" onClick={save}>SAVE ITEM</button>
    <div className="itemAdder ">
      <select id="itemSelect" name="item">
        <Options options={items} />
      </select>
      <button className="addItem" onClick={addItem}> SPAWN ITEM </button>
    </div>
    <div className="colorpicker">
      <div className="value" style={{ borderLeftColor: color }}>
        Current color is {color}
      </div>
      <HexColorPicker className="tester" color={color} onChange={setColor}  />
      <input className="inputButtons" type='text' onChange={setColorWithHex} style={{margin:'9px'}}/>
      <button className="buttons" onClick={drawstate}> Draw </button>
      <button className="buttons" onClick={copystate}> Copy </button>
      <button className="buttons" onClick={erase}> Erase </button>
    </div>
  </div>
  <div id="savebox" className="saveItemContainer">
    <div className="saveboxTitle" >Save Item</div>
    <div className="categoryButtons">
      <div className="categoryButtonHalf">
        <button className="categoryButton" onClick={updateCategory} value='nature'>nature</button>
        <button className="categoryButton" onClick={updateCategory} value='hats'>hats</button>
        <button className="categoryButton" onClick={updateCategory} value='eyes'>eyes</button>
      </div>
      <div className="categoryButtonHalf">
        <button className="categoryButton" onClick={updateCategory} value='righthand'>righthand</button>
        <button className="categoryButton" onClick={updateCategory} value='lefthand'>lefthand</button>
        <button className="categoryButton" onClick={updateCategory} value='accessories'>accessories</button>
      </div>
    </div>
    <input id="nameInput" type="text" className="inputButtons" onChange={updateName} name="name"/>
    <form> <input id="submitItem" className="inputButtons" type="submit" onClick={saveData}/></form>
  </div>
  </div>
  )
}
