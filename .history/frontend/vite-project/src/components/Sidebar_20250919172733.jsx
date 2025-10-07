import { useState } from "react";
import { 
  FaHome, FaBuilding, FaSignOutAlt, FaChevronRight, FaChevronDown, 
  FaTruck, FaDrum, FaShoppingCart, FaChartBar 
} from "react-icons/fa";
import logo from "../assets/logo.png";
import slogo from "../assets/slogo.png";

export default function Sidebar({ activeItem, setActiveItem, handleLogout, collapsed }) {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => setOpenMenu(openMenu === menu ? null : menu);
  const handleItemClick = (item) => setActiveItem(item);

  return (
    <aside
      className={`d-flex flex-column bg-primary text-white p-3 ${collapsed ? "sidebar-collapsed" : ""}`}
      style={{ width: collapsed ? "60px" : "220px", transition: "width 0.3s ease" }}
    >
      {/* Logo */}
      <div className="text-center mb-4">
        {collapsed ? (
          <img src={slogo} alt="Small Logo" className="img-fluid" style={{ maxWidth: "40px" }} />
        ) : (
          <img src={logo} alt="Main Logo" className="img-fluid" style={{ maxWidth: "180px", height: "40px" }} />
        )}
      </div>

      {/* Menu */}
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a
            className={`nav-link text-white ${activeItem === "Dashboard" ? "active bg-info" : ""}`}
            onClick={() => handleItemClick("Dashboard")}
          >
            <FaHome className="me-2" />
            {!collapsed && "Dashboard"}
          </a>
        </li>

        {/* Construction Work */}
        <li>
          <a
            className="nav-link text-white d-flex align-items-center"
            onClick={() => toggleMenu("construction")}
          >
            <FaBuilding className="me-2" />
            {!collapsed && <span className="flex-grow-1">Construction Work</span>}
            {!collapsed && (openMenu === "construction" ? <FaChevronDown /> : <FaChevronRight />)}
          </a>
          {openMenu === "construction" && !collapsed && (
            <ul className="nav flex-column ms-4 border-start ps-2">
              {["CW-Dashboard", "CW-Management", "CW-A03"].map((item) => (
                <li key={item}>
                  <a
                    className={`nav-link text-white small ${activeItem === item ? "active bg-info" : ""}`}
                    onClick={() => handleItemClick(item)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Example: Delivery Management */}
        <li>
          <a
            className="nav-link text-white d-flex align-items-center"
            onClick={() => toggleMenu("delivery")}
          >
            <FaTruck className="me-2" />
            {!collapsed && <span className="flex-grow-1">Delivery Management</span>}
            {!collapsed && (openMenu === "delivery" ? <FaChevronDown /> : <FaChevronRight />)}
          </a>
          {openMenu === "delivery" && !collapsed && (
            <ul className="nav flex-column ms-4 border-start ps-2">
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
                <li key={item}>
                  <a
                    className={`nav-link text-white small ${activeItem === item ? "active bg-info" : ""}`}
                    onClick={() => handleItemClick(item)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Logout */}
        <li className="mt-3">
          <a className="nav-link text-danger" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" />
            {!collapsed && "Logout"}
          </a>
        </li>
      </ul>
    </aside>
  );
}
