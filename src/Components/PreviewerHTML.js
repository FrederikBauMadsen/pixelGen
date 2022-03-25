import CanvasEffects from './CanvasEffects.js'


export default function PreviewerHTML({previewer,slide, multiplier}){

  function effect(){
    CanvasEffects(multiplier)
  }

  return(
    <div className="preview">
      <div className="relative">
        <div className="slider" id="slider">
          <input type="range" min="1" max="14" onChange={slide} />
        </div>
          <button className="buttons" onClick={previewer}> Close </button>
          <button className="buttons" onClick={effect}> Smoothe Edges </button>
        <canvas id="canvas"></canvas>
      </div>
    </div>
  )
}
