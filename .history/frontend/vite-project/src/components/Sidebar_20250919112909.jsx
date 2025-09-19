import { useState } from "react";
import {
  FaHome, FaBuilding, FaTruck, FaShoppingCart,
  FaChartBar, FaSignOutAlt, FaChevronRight, FaChevronDown
} from "react-icons/fa";

export default function Sidebar({ activeItem, setActiveItem, handleLogout }) {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <aside className="sidebar">
      <ul className="menu">
        {/* Dashboard */}
        <li
          className={activeItem === "Dashboard" ? "active" : ""}
          onClick={() => handleItemClick("Dashboard")}
        >
          <FaHome className="icon" /> <span>Dashboard</span>
        </li>

        {/* Construction Work submenu */}
        <li>
          <div
            className="menu-item"
            onClick={() => toggleMenu("construction")}
          >
            <div className="menu-left">
              <FaBuilding className="icon" /> <span>Construction Work</span>
            </div>
            <div className="arrow">
              {openMenu === "construction" ? <FaChevronDown /> : <FaChevronRight />}
            </div>
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
          <FaSignOutAlt className="icon" /> <span>Logout</span>
        </li>
      </ul>
    </aside>
  );
}
