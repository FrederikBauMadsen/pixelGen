import { HexColorPicker } from "react-colorful";
import ItemList from "./ItemList.tsx";
import { Item } from "../Interfaces/interfaces.ts";
import { Dispatch, SetStateAction } from "react";

window.addEventListener("mousedown", function () {
  hold = true;
});
window.addEventListener("mouseup", function () {
  hold = false;
});

let hold: boolean = false;
let draw = true;
let name: string | null;
let category: string | null = null;

export interface BuilderHTMLProps {
  spawnChar: () => void;
  getPos: (e: any) => void;
  pos: any;
  applyBorder: () => void;
  getColor: (e: any) => void;
  clear: () => void;
  saveItem: (name: string | null, category: string | null) => void;
  items: Item[];
  addItem: () => void;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  setColorWithHex: (e: any) => void;
}

export function BuilderHTML({
  spawnChar,
  getPos,
  pos,
  applyBorder,
  getColor,
  clear,
  saveItem,
  items,
  addItem,
  color,
  setColor,
  setColorWithHex,
}: BuilderHTMLProps) {
  function erase() {
    setColor("");
  }
  function saveData() {
    saveItem(name, category);
  }
  function updateName(e: any) {
    name = e.target?.value;
  }
  function updateCategory(e: any) {
    category = e.target.value;
    let array = document.getElementsByClassName(
      "categoryButton"
    ) as HTMLCollectionOf<HTMLButtonElement>;
    for (var i = 0; i < array.length; i++) {
      if (array[i].value === category) {
        array[i].classList.add("categoryButtonActive");
      } else {
        array[i].classList.remove("categoryButtonActive");
      }
    }
    let nameinput = document.getElementById("nameInput");
    if (nameinput) nameinput.style.display = "block";
  }

  function save() {
    let savebox = document.getElementById("savebox");
    if (savebox) savebox.style.display = "flex";
  }

  var array = [];
  for (var i = 0; i < 4096; i++) {
    array.push(i);
  }

  function drawstate() {
    draw = true;
  }

  function copystate() {
    draw = false;
  }

  function paintclick(e: any) {
    const element = document.getElementById(e.target.id);
    if (draw) {
      if (element) element.style.backgroundColor = color;
      getColor(e);
    } else {
      if (element) setColor(element.style.backgroundColor);
    }
  }

  function paint(e: any) {
    getPos(e);
    if (draw) {
      if (hold === false) {
        return;
      } else {
        const element = document.getElementById(e.target.id);
        if (element) element.style.backgroundColor = color;
        getColor(e);
      }
    }
  }

  var list = array.map((item, index) => (
    <div
      id={index.toString()}
      key={index}
      className={"pixel"}
      onMouseOver={paint}
      onClick={paintclick}
    ></div>
  ));

  return (
    <div className="Builder">
      <div className="functions">
        <button className="buttons" onClick={spawnChar}>
          {" "}
          Spawn Char{" "}
        </button>
        <button className="buttons" onClick={applyBorder}>
          {" "}
          Apply Border{" "}
        </button>
        <button className="buttons" name="white" onClick={clear}>
          {" "}
          CLEAR CANVAS{" "}
        </button>
      </div>
      <div className="artContain">
        <div className="position">pos : {pos}</div>
        <div id="art" className="drawingContainer">
          {list}
        </div>
      </div>
      <div className="functions">
        <button className="buttons" onClick={save}>
          SAVE ITEM
        </button>
        <div className="itemAdder ">
          <select id="itemSelect" name="item">
            <ItemList items={items} />
          </select>
          <button className="addItem" onClick={addItem}>
            {" "}
            SPAWN ITEM{" "}
          </button>
        </div>
        <div className="colorpicker">
          <div className="value" style={{ borderLeftColor: color }}>
            Current color is {color}
          </div>
          <HexColorPicker
            className="tester"
            color={color}
            onChange={setColor}
          />
          <input
            className="inputButtons"
            type="text"
            onChange={setColorWithHex}
            style={{ margin: "9px" }}
          />
          <button className="buttons" onClick={drawstate}>
            {" "}
            Draw{" "}
          </button>
          <button className="buttons" onClick={copystate}>
            {" "}
            Copy{" "}
          </button>
          <button className="buttons" onClick={erase}>
            {" "}
            Erase{" "}
          </button>
        </div>
      </div>
      <div id="savebox" className="saveItemContainer">
        <div className="saveboxTitle">Save Item</div>
        <div className="categoryButtons">
          <div className="categoryButtonHalf">
            <button
              className="categoryButton"
              onClick={updateCategory}
              value="nature"
            >
              nature
            </button>
            <button
              className="categoryButton"
              onClick={updateCategory}
              value="hats"
            >
              hats
            </button>
            <button
              className="categoryButton"
              onClick={updateCategory}
              value="eyes"
            >
              eyes
            </button>
          </div>
          <div className="categoryButtonHalf">
            <button
              className="categoryButton"
              onClick={updateCategory}
              value="righthand"
            >
              righthand
            </button>
            <button
              className="categoryButton"
              onClick={updateCategory}
              value="lefthand"
            >
              lefthand
            </button>
            <button
              className="categoryButton"
              onClick={updateCategory}
              value="accessories"
            >
              accessories
            </button>
          </div>
        </div>
        <input
          id="nameInput"
          type="text"
          className="inputButtons"
          onChange={updateName}
          name="name"
        />
        <form>
          {" "}
          <input
            id="submitItem"
            className="inputButtons"
            type="submit"
            onClick={saveData}
          />
        </form>
      </div>
    </div>
  );
}
