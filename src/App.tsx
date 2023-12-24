//imports
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home.tsx";
import hexToRgb from "./Components/HexToRgb.ts";
import Create from "./Components/Create.tsx";
import applyBorder from "./Components/applyBorder.ts";
import "./App.css";
import Header from "./Components/Header.tsx";
import axios from "axios";
import staticCrab from "./Components/staticCrab.ts";
import setResize from "./Components/imgPreviewer.ts";
import { staticCrabArray } from "./crabConstants.ts";
import { resetCanvas } from "./Components/Canvas.ts";
import { CharItem, Item, ItemContent } from "./Interfaces/interfaces.ts";

function App() {
  //states
  const [color, setColor] = useState("#b32aa9");
  const [itemArray, setItemArray] = useState<ItemContent[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [currentItem, setCurrentItem] = useState("none");
  const [viewState, setViewState] = useState(false);
  const [preview64, setPreview64] = useState<string[][] | undefined>();
  const [charItems, setCharItems] = useState<CharItem[]>([]);
  const [changed, setChanged] = useState(0);
  const [pos, setPos] = useState("");
  const [multiplier, setMultiplier] = useState(14);
  const backgrounds = [
    "rgb(145,160,180)",
    "rgb(201, 180, 253)",
    "rgb(232, 231, 201)",
    "rgb(217, 165, 215)",
    "rgb(176, 156, 156)",
    "rgb(137, 194, 246)",
    "rgb(175, 224, 159)",
  ];

  useEffect(() => {
    if (viewState && preview64) {
      setResize({ multiplier, preview64 });
    }
    setTimeout(function () {
      getItems();
    }, 200);
  }, [multiplier, preview64, changed, viewState]);

  function getPos(e: any) {
    let x = Math.trunc(e.target.id / 64);
    let y = e.target.id % 64;
    setPos(x + "," + y);
  }

  //save the current itemArray
  function saveItem(name: string | null, category: string | null) {
    const newItem = {
      name: name,
      category: category,
      content: itemArray,
    };
    axios.post("http://localhost:3002/Create", newItem);
  }

  //add the currently selected item to the canvas
  function addItem() {
    setChanged(changed + 1);

    let item = document.getElementById("itemSelect") as HTMLSelectElement;
    if (currentItem !== item.value) {
      for (const element of itemArray) {
        const prevItem = document.getElementById(element.itemId);
        if (prevItem) prevItem.style.backgroundColor = "";
      }
      setCurrentItem(items[parseInt(item.value)].name);
      setItemArray(items[parseInt(item.value)].content);
      for (const element of items[parseInt(item.value)].content) {
        const newItem = document.getElementById(element.itemId);
        if (newItem) newItem.style.backgroundColor = element.itemColor;
      }
    } else {
      return;
    }
  }

  //get items from localStorage
  function getItems() {
    fetch("/items")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setItems(jsonRes));
  }

  //clear canvas to white
  function Clear() {
    setItemArray([]);
    let divs = document.getElementsByClassName(
      "pixel"
    ) as HTMLCollectionOf<HTMLDivElement>;
    for (const element of divs) {
      element.style.backgroundColor = "";
    }
  }

  //change color of pixel to color state, save pixels that have been altered in itemArray
  function setColorCall(e: any) {
    let array = [];
    let arraynum = [];
    let pixel = { itemId: e.target.id, itemColor: color };

    for (const element of itemArray) {
      array.push({
        itemId: element.itemId,
        itemColor: element.itemColor,
      });
      arraynum.push(element.itemId);
    }

    if (pixel.itemColor === "") {
      if (arraynum.includes(e.target.id)) {
        array.splice(arraynum.indexOf(e.target.id), 1);
        setItemArray(array);
      } else {
        return;
      }
    } else {
      if (arraynum.includes(e.target.id)) {
        let n = arraynum.indexOf(e.target.id);
        if (array[n].itemColor !== color) {
          array[n].itemColor = color;
          setItemArray(array);
        } else {
          return;
        }
      } else {
        array.push(pixel);
        setItemArray(array);
      }
    }
  }

  //set color state using hex color value
  function setColorWithHex(e: any) {
    setColor(e.target.value);
  }

  // 0.5 opacity Char
  function spawnChar() {
    Clear();
    let div = document.getElementById("art");
    let divs = div?.getElementsByTagName("div");
    if (divs)
      for (const element of divs) {
        if (staticCrabArray.includes(element.id)) {
          element.style.backgroundColor = "rgba(0,0,0,0.5)";
        }
      }
  }

  // random crab
  function spawnCrab() {
    window.scroll({
      top: 200,
      left: 100,
      behavior: "smooth",
    });
    setCharItems([]);
    setViewState(true);
    const random = Math.floor(Math.random() * backgrounds.length);
    const background = backgrounds[random];

    let objectArray: CharItem[] = [];
    let randomItemsId: string[] = [];
    let randomItemsColor: string[] = [];
    let randomItemsName: string[] = [];
    let randomCategories: string[] = [];

    let categories: string[] = [];
    for (const element of items) {
      if (!categories.includes(element.category)) {
        categories.push(element.category);
      }
    }

    let numbers: number[] = [];

    for (let n = 0; n < 8; n++) {
      let number = Math.floor(Math.random() * items.length);
      if (!numbers.includes(number)) {
        numbers.push(number);
      }
    }

    for (let l = 0; l < numbers.length; l++) {
      let itemsId = [];
      let itemsColor = [];
      if (!randomCategories.includes(items[numbers[l]].category)) {
        for (const element of items[numbers[l]].content) {
          if (element.itemColor.charAt(0) === "#") {
            let array = hexToRgb(element.itemColor);
            let string =
              "rgb(" + array[0] + "," + array[1] + "," + array[2] + ")";
            itemsId.push(element.itemId);
            randomItemsId.push(element.itemId);
            itemsColor.push(string);
            randomItemsColor.push(string);
          } else {
            itemsId.push(element.itemId);
            randomItemsId.push(element.itemId);
            itemsColor.push(element.itemColor.replaceAll(" ", ""));
            randomItemsColor.push(element.itemColor.replaceAll(" ", ""));
          }
        }
        randomCategories.push(items[numbers[l]].category);
        randomItemsName.push(items[numbers[l]].name);

        objectArray.push({
          name: items[numbers[l]].name,
          category: items[numbers[l]].category,
          itemId: itemsId,
          itemColor: itemsColor,
        });
      }
    }

    setCharItems(objectArray);
    setPreview64(
      staticCrab({
        background,
        objectArray,
      })
    );
  }

  function slide(e: any) {
    var value = e.target.value;
    setMultiplier(value);
  }

  function previewer(e: any) {
    resetCanvas();
    setItemArray([]);
    if (e.target.value === "view") {
      setViewState(true);
    } else {
      setViewState(false);
    }
  }

  function setPreview(x: any) {
    setPreview64(x);
  }

  return (
    <div className="screen">
      <Router>
        <Header previewer={previewer} />
        <Routes>
          <Route
            path={"/"}
            element={
              <Home
                multiplier={multiplier}
                slide={slide}
                spawnCrab={spawnCrab}
                charItems={charItems}
              />
            }
          />
          <Route
            path={"/Create"}
            element={
              <Create
                spawnChar={spawnChar}
                pos={pos}
                applyBorder={applyBorder}
                getPos={getPos}
                getColor={setColorCall}
                clear={Clear}
                saveItem={saveItem}
                items={items}
                addItem={addItem}
                color={color}
                setColor={setColor}
                setColorWithHex={setColorWithHex}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
