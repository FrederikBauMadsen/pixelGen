import { CharItem } from "../Interfaces/interfaces.ts";
import PreviewerHTML from "./PreviewerHTML.tsx";

interface HomeProps {
  slide: (e: any) => void;
  multiplier: number;
  spawnCrab: () => void;
  charItems: CharItem[];
}
export default function Home({
  slide,
  multiplier,
  spawnCrab,
  charItems,
}: HomeProps) {
  return (
    <PreviewerHTML
      slide={slide}
      multiplier={multiplier}
      spawnCrab={spawnCrab}
      charItems={charItems}
    />
  );
}
