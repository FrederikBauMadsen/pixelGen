import react, {useState, useEffect} from 'react'
import {white} from '../figures.js'


function Pixel({getColor}) {
  const [array, setArray] = useState([])

  const num = white.length-1;

    for (var i = 0; i < white.length; i++){

        var list;

        array.push(white[i].map((pixel, index )=><div  key={i*64 + index}  onClick={getColor} id={i*64 + index} className="pixel" style={{backgroundColor: pixel, animationDelay: (i*64 + index)/500 +'s'  }}> </div>))

        list = array.map((item, index )=><div  key={i + ' ' +  index} className={"r row" + index} > {item} </div>)

        if(i == num){
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
