export default function findStarPos(pixel,columns,pixelSpace,multiplier, drawing){
  let array = [];
  for(var i = 0; i<6; i++){
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*2)+(pixelSpace*(multiplier/2)))
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*2)+(pixelSpace*(multiplier/2)) + pixelSpace)
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*2)+(pixelSpace*(multiplier/2)) - pixelSpace)
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*2)+(pixelSpace*(multiplier/2)) - columns)
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*2)+(pixelSpace*(multiplier/2)) + columns)
  }
  for(var i = 0; i<5; i++){
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*2)+(pixelSpace*(multiplier/2)) + (columns*(multiplier/2))+(pixelSpace*(multiplier/2)))
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*2)+(pixelSpace*(multiplier/2)) + (columns*(multiplier/2))+(pixelSpace*(multiplier/2)) + pixelSpace)
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*2)+(pixelSpace*(multiplier/2)) + (columns*(multiplier/2))+(pixelSpace*(multiplier/2)) - pixelSpace)
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*2)+(pixelSpace*(multiplier/2)) + (columns*(multiplier/2))+(pixelSpace*(multiplier/2)) - columns)
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*2)+(pixelSpace*(multiplier/2)) + (columns*(multiplier/2))+(pixelSpace*(multiplier/2)) + columns)
  }
  for(var i = 0; i<6; i++){
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*4)+(pixelSpace*(multiplier/2)))
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*4)+(pixelSpace*(multiplier/2)) + pixelSpace)
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*4)+(pixelSpace*(multiplier/2)) - pixelSpace)
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*4)+(pixelSpace*(multiplier/2)) - columns)
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*4)+(pixelSpace*(multiplier/2)) + columns)
  }
  for(var i = 0; i<5; i++){
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*4)+(pixelSpace*(multiplier/2))+ (columns*(multiplier/2))+(pixelSpace*(multiplier/2)))
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*4)+(pixelSpace*(multiplier/2))+ (columns*(multiplier/2))+(pixelSpace*(multiplier/2)) + pixelSpace)
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*4)+(pixelSpace*(multiplier/2))+ (columns*(multiplier/2))+(pixelSpace*(multiplier/2)) - pixelSpace)
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*4)+(pixelSpace*(multiplier/2))+ (columns*(multiplier/2))+(pixelSpace*(multiplier/2)) - columns)
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*4)+(pixelSpace*(multiplier/2))+ (columns*(multiplier/2))+(pixelSpace*(multiplier/2)) + columns)
  }
  for(var i = 0; i<6; i++){
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*6)+(pixelSpace*(multiplier/2)))
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*6)+(pixelSpace*(multiplier/2)) - pixelSpace)
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*6)+(pixelSpace*(multiplier/2)) + pixelSpace)
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*6)+(pixelSpace*(multiplier/2)) - columns)
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*6)+(pixelSpace*(multiplier/2)) + columns)
  }
  for(var i = 0; i<5; i++){
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*6)+(pixelSpace*(multiplier/2))+ (columns*(multiplier/2))+(pixelSpace*(multiplier/2)))
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*6)+(pixelSpace*(multiplier/2))+ (columns*(multiplier/2))+(pixelSpace*(multiplier/2)) - pixelSpace)
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*6)+(pixelSpace*(multiplier/2))+ (columns*(multiplier/2))+(pixelSpace*(multiplier/2)) + pixelSpace)
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*6)+(pixelSpace*(multiplier/2))+ (columns*(multiplier/2))+(pixelSpace*(multiplier/2)) - columns)
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*6)+(pixelSpace*(multiplier/2))+ (columns*(multiplier/2))+(pixelSpace*(multiplier/2)) + columns)
  }
  for(var i = 0; i<6; i++){
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*8)+(pixelSpace*(multiplier/2)))
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*8)+(pixelSpace*(multiplier/2)) - pixelSpace)
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*8)+(pixelSpace*(multiplier/2)) + pixelSpace)
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*8)+(pixelSpace*(multiplier/2)) - columns)
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*8)+(pixelSpace*(multiplier/2)) + columns)
  }
  for(var i = 0; i<5; i++){
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*8)+(pixelSpace*(multiplier/2))+ (columns*(multiplier/2))+(pixelSpace*(multiplier/2)))
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*8)+(pixelSpace*(multiplier/2))+ (columns*(multiplier/2))+(pixelSpace*(multiplier/2)) - pixelSpace)
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*8)+(pixelSpace*(multiplier/2))+ (columns*(multiplier/2))+(pixelSpace*(multiplier/2)) + pixelSpace)
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*8)+(pixelSpace*(multiplier/2))+ (columns*(multiplier/2))+(pixelSpace*(multiplier/2)) - columns)
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*8)+(pixelSpace*(multiplier/2))+ (columns*(multiplier/2))+(pixelSpace*(multiplier/2)) + columns)
  }
  for(var i = 0; i<6; i++){
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*10)+(pixelSpace*(multiplier/2)))
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*10)+(pixelSpace*(multiplier/2)) - pixelSpace)
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*10)+(pixelSpace*(multiplier/2)) + pixelSpace)
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*10)+(pixelSpace*(multiplier/2)) - columns)
    array.push(((pixel)+(pixelSpace*multiplier*i))+((columns/2)*multiplier*10)+(pixelSpace*(multiplier/2)) + columns)
  }
  return array;
}
