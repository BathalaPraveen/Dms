import { useState } from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";

<<<<<<< HEAD
export default function Header({ user }) {
  return (
    <header className="header">
      {/* <div className="logo">
        <img src={logo} alt="Logo" />
        <span>{user?.name || "Welcome"}</span>
      </div>
      <nav className="nav-links">
        <NavLink to="/signup" className="nav-link">Signup</NavLink>
        <NavLink to="/login" className="nav-link">Login</NavLink>
      </nav> */}
=======
export default function Header({ toggleSidebar }) {
  return (
    <header className="navbar">
      <div className="nav-left">
        <button className="toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>
       
      </div>
>>>>>>> ad932467a59e94c5f01b939aca0a4c8745a79cb2
    </header>
  );
}
