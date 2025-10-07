import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Header.css";

export default function Header() {
  return (
    <header className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="MyApp Logo" />
      </div>
      <nav className="nav-links">
        <NavLink to="/signup" className="nav-link">
          Signup
        </NavLink>
        <NavLink to="/login" className="nav-link">
          Login
        </NavLink>
      </nav>
    </header>
  );
}
