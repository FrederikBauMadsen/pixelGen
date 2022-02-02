import react from 'react'
import { saveAs } from 'file-saver';
//split 4096 array into 64x64 arrays
export default function rowArray (items) {
  const rows = []
  items = [].concat(...items)

  while (items.length) {
  rows.push(
    items.splice(0, 64)
  )
}

let fileName = prompt("Enter a name for the file", "");

// Create a blob of the data
var fileToSave = new Blob([JSON.stringify(rows)], {
    type: 'application/json'
});

// Save the file
saveAs(fileToSave, fileName)
}
