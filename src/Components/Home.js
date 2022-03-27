import react from 'react'
import applyBorder from './applyBorder.js'
import BuilderHTML from './builderHTML.js'
import PreviewerHTML from './PreviewerHTML.js'
import Header from './Header.js'

export default function Home({slide, multiplier, spawnCrab}){
return(
  <PreviewerHTML slide={slide} multiplier={multiplier} spawnCrab={spawnCrab}/>
)
}
