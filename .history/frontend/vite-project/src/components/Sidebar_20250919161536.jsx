import { useState } from "react";
import { FaHome, FaBuilding, FaSignOutAlt, FaChevronRight, FaChevronDown } from "react-icons/fa";
import "./Sidebar.css";
import logo from "../assets/logo.png";
import slogo from "../assets/slogo.png";

export default function Sidebar({ activeItem, setActiveItem, handleLogout, collapsed }) {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => setOpenMenu(openMenu === menu ? null : menu);
  const handleItemClick = (item) => setActiveItem(item);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="logo-container">
        {collapsed ? (
          <img src={slogo} alt="Small Logo" className="slogo" />
        ) : (
          <img src={logo} alt="Main Logo" className="logo" />
        )}
      </div>

      <ul className="menu">
        <li
          className={activeItem === "Dashboard" ? "active" : ""}
          onClick={() => handleItemClick("Dashboard")}
        >
          <FaHome style={{ marginRight: collapsed ? 0 : "8px" }} />
          {!collapsed && "Dashboard"}
        </li>

        <li>
          <div className="menu-item" onClick={() => toggleMenu("construction")}>
            <FaBuilding style={{ marginRight: collapsed ? 0 : "8px" }} />
            {!collapsed && "Construction Work"}
            {!collapsed &&
              (openMenu === "construction" ? <FaChevronDown /> : <FaChevronRight />)}
          </div>
          {openMenu === "construction" && !collapsed && (
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
        
          {/* Delivery Management */}
          <li>
            <div className="menu-item" onClick={() => toggleMenu("delivery")}>
              <FaBuilding style={{ marginRight: "8px" }} /> Delivery Management
              {openMenu === "delivery" ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            {openMenu === "delivery" && (
              <ul className="submenu">
                {[
                  "All Deliveries",
                  "Planned Deliveries",
                  "Confirmation Request",
                  "Confirmed Deliveries",
                  "Dispatched",
                  "T&C Pending",
                  "Completed Deliveries",
                  "Close DRNs",
                ].map((item) => (
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

        <li className="logout" onClick={handleLogout}>
          <FaSignOutAlt style={{ marginRight: collapsed ? 0 : "8px" }} />
          {!collapsed && "Logout"}
        </li>
      </ul>
    </aside>
  );
}
