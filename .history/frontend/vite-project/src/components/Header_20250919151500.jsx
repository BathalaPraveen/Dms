import { useState } from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";

export default function Header({ toggleSidebar }) {
  return (
    <header className="navbar">
      <div className="nav-left">
        <button className="toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>
       
      </div>
    </header>
  );
}
