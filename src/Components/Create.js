import react from 'react'
import BuilderHTML from './builderHTML.js'

export default function Create({pos, getPos, holdstate,applyBorder, getColor, Clear, saveItem, items, addItem, color, setColor, drawstate, copystate, setColorWithHex}){
  return(
    <BuilderHTML pos={pos} getPos={getPos} applyBorder={applyBorder} holdstate={holdstate} getColor={getColor} Clear={Clear} saveItem={saveItem} items={items} addItem={addItem} color={color} setColor={setColor} drawstate={drawstate} copystate={copystate} setColorWithHex={setColorWithHex} />
  )
}
