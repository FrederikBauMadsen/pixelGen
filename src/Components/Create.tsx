import { BuilderHTMLProps, BuilderHTML } from "./builderHTML";

export default function Create({
  spawnChar,
  pos,
  getPos,
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
  return (
    <BuilderHTML
      spawnChar={spawnChar}
      pos={pos}
      getPos={getPos}
      applyBorder={applyBorder}
      getColor={getColor}
      clear={clear}
      saveItem={saveItem}
      items={items}
      addItem={addItem}
      color={color}
      setColor={setColor}
      setColorWithHex={setColorWithHex}
    />
  );
}
