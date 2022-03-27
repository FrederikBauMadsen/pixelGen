import react from 'react'
import { HexColorPicker } from "react-colorful";
import Options from './Options.js'
import Pixel from './pixel.js'
export default function BuilderHTML({getPos, pos, applyBorder, holdstate, getColor, spawnCrab, Clear, saveItem, items, addItem, color, setColor, drawstate, copystate, setColorWithHex}){
  return(
    <div className="Builder">
    <div className="functions">
      <button className="buttons" onClick={applyBorder}> Apply Border </button>
      <button className="buttons" name="white" onClick={Clear}> CLEAR CANVAS </button>
    </div>
    <div className="artContain">
      <div className="position">
        pos : {pos}
      </div>
      <div id="art" onMouseDown={holdstate} onMouseUp={holdstate} >
        <Pixel getColor={getColor} getPos={getPos}/>
      </div>
    </div>
  <div className="functions">
    <form >
      <button className="buttons" onClick={saveItem}>SAVE ITEM</button>
    </form>
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
      <input type='text' onChange={setColorWithHex} style={{margin:'9px'}}/>
      <button className="buttons" onClick={drawstate}> draw </button>
      <button className="buttons" onClick={copystate}> copy </button>
    </div>
  </div>
  </div>
  )
}
