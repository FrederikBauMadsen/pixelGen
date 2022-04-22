import SelectItem, {resetborder} from './SelectItem.js';
import {useState} from 'react';
import applyEffect from './applyEffect';

export default function PreviewerHTML({slide, multiplier,spawnCrab, charItems}){
  const [currentItem, setCurrentItem] = useState(null);
  const [listcolor, setListcolor] = useState(null);
  const [selectedColors, setSelectedColors] = useState(null);
  const [startEffect, setStartEffect] = useState(false);
  //const timer = ms => new Promise(res => setTimeout(res, ms));
  let listcategory = charItems.map((item, index )=><div  key={1 + ' ' +  index}  > {item.category} </div>);
  let listname = charItems.map((item, index )=><div  key={1 + ' ' +  index}  > {item.name} </div>);
  let selectedColorsArray = [];

  function StartEffect(e){
    let effect = document.getElementById("effectName").value;
    let start = e.target.innerText.toString();
    applyEffect(currentItem,selectedColors,charItems,multiplier,start, effect);
  }

  function StopEffect(e){
    let effect = document.getElementById("effectName").value;
    let stop = e.target.innerText.toString();
    applyEffect(currentItem,selectedColors,charItems,multiplier,stop, effect);
  }


  function spawn(){
    setSelectedColors(null);
    setCurrentItem(null);
    setListcolor(null);
    spawnCrab();
  }

  async function itemSelect(e){
      await resetborder();
      setSelectedColors(null);
      setCurrentItem(null);
      setListcolor(null);
      selectedColorsArray = [];
      let item = null;
      let itemcolors = [];
      let colorpos = null;

      if(currentItem === e.target.innerText.toString()){
        SelectItem(multiplier,charItems,item,itemcolors[colorpos]);
      }else{
        setCurrentItem(e.target.innerText.toString());
        item = e.target.innerText.toString();
        colorpos = charItems.map(function(e) { return e.name; }).indexOf(item);
        for(var a = 0; a<charItems.length; a++){
          let colors = charItems[a].itemColor;
          let set = new Set(colors);
          colors = Array.from(set);
          itemcolors.push(colors);
        }
        setListcolor(itemcolors[colorpos].map((item, index )=><div key={1 + ' ' +  index} className="selectedItemColors"><button style={{backgroundColor: item, width:'50px', height:'50px'}} name={item} onClick={colorSelect} key={1 + ' ' +  index} ></button><div id={item}>Not Selected</div></div>));
        SelectItem(multiplier,charItems,item,itemcolors[colorpos]);
      }
  }

  function colorSelect(e){
    if(selectedColorsArray.includes(e.target.name)){
      selectedColorsArray .splice(selectedColorsArray.indexOf(e.target.name),1);
      document.getElementById(e.target.name).innerText = 'Not Selected'
    }else{
      selectedColorsArray.push(e.target.name);
      document.getElementById(e.target.name).innerText = 'Selected';
    }
    setSelectedColors(selectedColorsArray);
  }



  return(
    <div className="preview">
        <div className="functions">
          <div className="slider" id="slider">
            <input type="range" min="1" max="14" onChange={slide} />
          </div>
          <button className="buttons" name="crab" onClick={spawn}> RANDOM CRAB </button>
          <div className="selectedItem">
            <div style={{fontSize:"24px"}}>Selected Item: {currentItem}</div>
            <div>Colors: </div>
            {listcolor}
            <button className="buttons" name="true" onClick={StartEffect}>Start Effect</button>
            <button className="buttons" name="false" onClick={StopEffect}>Stop Effect</button>
            <select name="effect" id="effectName">
              <option value="fire">Fire</option>
              <option value="stars">Stars</option>
            </select>
          </div>
        </div>
        <canvas id="canvas"></canvas>
        <div className="functions charItemsContainer">

          <div className="itemCategory">{listcategory[0]}</div>
          <div className="itemName" onClick={itemSelect}>{listname[0]}</div>


          <div className="itemCategory">{listcategory[1]}</div>
          <div className="itemName"onClick={itemSelect}>{listname[1]}</div>


          <div className="itemCategory">{listcategory[2]}</div>
          <div className="itemName"onClick={itemSelect}>{listname[2]}</div>


          <div className="itemCategory">{listcategory[3]}</div>
          <div className="itemName"onClick={itemSelect}>{listname[3]}</div>


          <div className="itemCategory">{listcategory[4]}</div>
          <div className="itemName"onClick={itemSelect}>{listname[4]}</div>


          <div className="itemCategory">{listcategory[5]}</div>
          <div className="itemName"onClick={itemSelect}>{listname[5]}</div>


          <div className="itemCategory">{listcategory[6]}</div>
          <div className="itemName"onClick={itemSelect}>{listname[6]}</div>


          <div className="itemCategory">{listcategory[7]}</div>
          <div className="itemName"onClick={itemSelect}>{listname[7]}</div>



        </div>
    </div>
  )
}
