import { Link } from "react-router-dom";

interface HeaderProps {
  previewer: (e: any) => void;
}
export default function Header({ previewer }: HeaderProps) {
  return (
    <div className="header">
      <h4 onClick={previewer}>
        <Link to="/"> View </Link>
      </h4>
      <div className="title"> Bau Pixel LegoBuilder </div>
      <h4 onClick={previewer}>
        <Link to="/Create"> Create </Link>
      </h4>
    </div>
  );
}
