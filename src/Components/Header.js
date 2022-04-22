  import React from "react";
  import {Link} from "react-router-dom";

export default function Header({previewer}){
  return(
    <div className="header">
      <h4 value="view" onClick={previewer}><Link to="/"> View </Link></h4>
      <div className="title"> Bau Pixel LegoBuilder </div>
      <h4 onClick={previewer}><Link to="/Create"> Create </Link></h4>
    </div>
  )
}
