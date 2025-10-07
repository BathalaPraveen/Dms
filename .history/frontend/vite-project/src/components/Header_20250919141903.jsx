import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Header.css";

export default function Header({ user }) {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <span>{user?.name || "Welcome"}</span>
      </div>
      <nav className="nav-links">
        <NavLink to="/signup" className="nav-link">Signup</NavLink>
        <NavLink to="/login" className="nav-link">Login</NavLink>
      </nav>
    </header>
  );
}
