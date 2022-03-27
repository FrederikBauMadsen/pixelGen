import CanvasEffects from './CanvasEffects.js'


export default function PreviewerHTML({slide, multiplier,spawnCrab}){

  function effect(){
    CanvasEffects(multiplier)
  }

  return(
    <div className="preview">
        <div className="slider" id="slider">
          <input type="range" min="1" max="14" onChange={slide} />
        </div>
        <div className="functions">
          <button className="buttons" name="crab" onClick={spawnCrab}> RANDOM CRAB </button>
          <button className="buttons" onClick={effect}> Smoothe Edges </button>
        </div>
        <canvas id="canvas"></canvas>
    </div>
  )
}
