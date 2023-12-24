//download full current canvas as json file
export default function downloadCanvas() {
  var div = document.getElementById("art");
  var divs = div?.getElementsByTagName("div");
  var divArray: string[] = [];
  var rows = [];
  if (divs)
    for (var i = 0; i < divs.length; i += 1) {
      if (divs[i].style.backgroundColor) {
        divArray.push(divs[i].style.backgroundColor);
      }
    }
  while (divArray.length) {
    rows.push(divArray.splice(0, 64));
  }
  return rows;
}
