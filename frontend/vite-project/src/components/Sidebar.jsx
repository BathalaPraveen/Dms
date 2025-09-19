import { useState } from "react";
import {
  FaHome, FaBuilding, FaSignOutAlt,
  FaChevronRight, FaChevronDown
} from "react-icons/fa";
import logo from "../assets/logo.png";
import "./Sidebar.css";

export default function Sidebar({ activeItem, setActiveItem, handleLogout, collapsed }) {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="nav-logo">
        <img src={logo} alt="MyApp Logo" />
      </div>

      <ul className="menu">
        {/* Dashboard */}
        <li
          className={activeItem === "Dashboard" ? "active" : ""}
          onClick={() => handleItemClick("Dashboard")}
        >
          <FaHome style={{ marginRight: "8px" }} /> Dashboard
        </li>

        {/* Submenu example */}
        <li>
          <div className="menu-item" onClick={() => toggleMenu("construction")}>
            <FaBuilding style={{ marginRight: "8px" }} /> Construction Work
            {openMenu === "construction" ? <FaChevronDown /> : <FaChevronRight />}
          </div>
          {openMenu === "construction" && (
            <ul className="submenu">
              {["CW-Dashboard", "CW-Management", "CW-A03"].map((item) => (
                <li
                  key={item}
                  className={activeItem === item ? "active" : ""}
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Logout */}
        <li className="logout" onClick={handleLogout}>
          <FaSignOutAlt style={{ marginRight: "8px" }} /> Logout
        </li>
      </ul>
    </aside>
  );
}
