function Pixel({getColor, getPos, white, resolution}) {
  var array = []
  const num = resolution-1;

      for (var i = 0; i < white.length; i++){

          var list;

          array.push(white[i].map((pixel, index )=><div  key={i*resolution + index}  onClick={getColor} onMouseEnter={getPos} id={i*resolution + index} className={"pixel"} style={{backgroundColor: pixel}}> </div>))

          list = array.map((item, index )=><div  key={i + ' ' +  index} className={"r row" + index} > {item} </div>)

          if(i === num){
            array.length=0
            return(
              <>
              {list}
              </>
            )
          }
      }




}




export default Pixel
