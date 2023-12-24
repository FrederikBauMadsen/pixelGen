import SuperFormula from "./SuperFormula.ts";

interface CreateParticleProps {
  pixel: number;
  columns: number;
  pixelSpace: number;
  effectName: string;
  stage: number;
}
export default function createParticle({
  pixel,
  columns,
  pixelSpace,
  effectName,
  stage,
}: CreateParticleProps) {
  let array = [];
  let arrayPos: number[] = [];

  //size should be 6,8,10,12 so on
  if (effectName == "stars") {
    let random = 3 + Math.round(Math.random() * 3);
    let m = 5 + Math.random() * 2;
    let n1 = 2 + Math.random() * 3;
    let n2 = 7;
    let n3 = 7;
    for (let i = 0; i < random; i++) {
      for (let pixels = 0; pixels < random * 0.1; pixels += 0.001) {
        let particle = SuperFormula({
          m,
          n1,
          n2,
          n3,
          pi: (pixels * (Math.PI * 2)) / (random * 0.1),
          sizex: i,
          sizey: i,
        });
        let x = Math.round(particle.x);
        let y = Math.round(particle.y);
        let pos = Math.round(pixel + x * pixelSpace + y * columns);
        let remainder = pos % 4;
        let newPos = pos - remainder;
        if (arrayPos.includes(newPos)) {
          arrayPos.slice(arrayPos.length, 1);
        } else {
          array.push({
            pixel: newPos,
            r: 211 - y * 12,
            g: 175 - y * 12,
            b: 55 - y * 12,
          });
        }
        arrayPos.push(newPos);
      }
    }
  } else {
    let random = 21 + stage;
    let m = Math.round(Math.random() * random);
    let n1 = 0.9 - random * 0.1;
    let n2 = 9;
    let n3 = 1;
    for (let i = 0; i < random; i++) {
      for (let pixels = 0; pixels < random * 0.01; pixels += 0.001) {
        let particle = SuperFormula({
          m,
          n1,
          n2,
          n3,
          pi: (pixels * (Math.PI * 2)) / (random * 0.01),
          sizex: i,
          sizey: i,
        });
        let x = Math.round(particle.x);
        let y = Math.round(particle.y);
        let pos = Math.round(pixel + x * pixelSpace + y * columns);
        let remainder = pos % 4;
        let newPos = pos - remainder;
        if (y < 0 && Math.abs(x) < 9) {
          if (arrayPos.includes(newPos)) {
            arrayPos.slice(arrayPos.length, 1);
          } else {
            if (
              (y === -1 && Math.abs(x) > 2) ||
              (y === -2 && Math.abs(x) > 3) ||
              (y === -3 && Math.abs(x) > 4) ||
              (y === -4 && Math.abs(x) > 5) ||
              (y === -5 && Math.abs(x) > 6) ||
              (y === -6 && Math.abs(x) > 7) ||
              (y === -7 && Math.abs(x) > 8) ||
              (y === -8 && Math.abs(x) > 9)
            ) {
              continue;
            } else {
              //black/yellow/red
              array.push({
                pixel: newPos,
                r:
                  0 +
                  Math.abs(y) * (random * 0.8863) +
                  Math.abs(x) * (random * 0.8863),
                g:
                  0 +
                  Math.abs(y) * (random * 0.3451) +
                  Math.abs(x) * (random * 0.3451),
                b:
                  0 +
                  Math.abs(y) * (random * 0.1333) +
                  Math.abs(x) * (random * 0.1333),
              });
              //Sinful weapon enchant
              /*
           array.push({
            pixel:newPos,
            r:255-(Math.abs(y)*9)-(Math.abs(x)*5),
            g:105-(Math.abs(y)*10)-(Math.abs(x)*5),
            b:180-(Math.abs(y)*155)-(Math.abs(x)*10),
          });
          */
              //purple fire
              /*
          array.push({
           pixel:newPos,
           r:0+(Math.abs(y)*(random*0.3391))+(Math.abs(x)*(random*0.3391)),
           g:0+(Math.abs(y)*(random*0.1057))+(Math.abs(x)*(random*0.1057)),
           b:0+(Math.abs(y)*(random*0.5553))+(Math.abs(x)*(random*0.5553)),
         });
         */
              arrayPos.push(newPos);
            }
          }
        }
      }
    }
  }
  return array;
}
