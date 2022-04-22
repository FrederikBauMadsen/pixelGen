export default function SuperFormula(m,n1,n2,n3,pi,sizex,sizey)
{
   var x;
   var y;
   var r;
   var t1;
   var t2;
   var a=1;
   var b=1;

   t1 = Math.cos(m * pi / 4) / a;
   t1 = Math.abs(t1);
   t1 = Math.pow(t1,n2);

   t2 = Math.sin(m * pi / 4) / b;
   t2 = Math.abs(t2);
   t2 = Math.pow(t2,n3);

   r = Math.pow(t1+t2,1/n1);
   if (Math.abs(r) == 0) {
      x = 0;
      y = 0;
   } else {
      r = 1 / r;
      x = r * Math.cos(pi)*sizex;
      y = r * Math.sin(pi)*sizey;
   }
   return {x: x, y: y}
}
