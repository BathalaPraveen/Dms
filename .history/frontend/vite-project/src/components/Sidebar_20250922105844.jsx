// Sidebar.jsx
import { useState } from "react";
import {
  FaHome,
  FaBuilding,
  FaChevronRight,
  FaChevronDown,
  FaTruck,
  FaDrum,
  FaShoppingCart,
  FaChartBar,
} from "react-icons/fa";
import logo from "../assets/logo.png";
import slogo from "../assets/slogo.png";

export default function Sidebar({ activeItem, setActiveItem, collapsed }) {
  const [openMenu, setOpenMenu] = useState(null); // expanded inline submenu
  const [hoverMenu, setHoverMenu] = useState(null); // collapsed hover submenu
  const [hoverPos, setHoverPos] = useState({ top: 0, left: 0 });

  const toggleMenu = (menu) =>
    setOpenMenu((prev) => (prev === menu ? null : menu));

  const handleParentClick = (menu, e) => {
    if (collapsed) return; // collapsed la click ignore, hover la popup show pannuvom
    toggleMenu(menu);
  };

  const handleMouseEnter = (menu, e) => {
    if (!collapsed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverPos({ top: rect.top, left: rect.right });
    setHoverMenu(menu);
  };

  const handleMouseLeave = () => {
    if (!collapsed) return;
    setHoverMenu(null);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
    setOpenMenu(null);
    setHoverMenu(null);
  };

  // Floating submenu for collapsed mode
  const renderPopup = (menu, items) => {
    if (!collapsed) return null; // popup only collapsed la
    if (hoverMenu !== menu) return null;

    return (
      <ul
        className="list-unstyled bg-white shadow rounded p-2"
        style={{
          position: "fixed",
          top: `${hoverPos.top}px`,
          left: `${hoverPos.left + 8}px`,
          minWidth: "200px",
          zIndex: 1050,
        }}
        onMouseEnter={() => setHoverMenu(menu)}
        onMouseLeave={() => setHoverMenu(null)}
      >
        {items.map((it) => (
          <li
            key={it}
            className={`nav-link small ${
              activeItem === it ? "bg-info text-white rounded" : "text-dark"
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleItemClick(it)}
          >
            {it}
          </li>
        ))}
      </ul>
    );
  };

  // Render parent with submenu
  const renderMenuSection = (key, Icon, title, items) => (
    <li
      key={key}
      className="nav-item position-relative"
      onMouseEnter={(e) => handleMouseEnter(key, e)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="d-flex align-items-center justify-content-between nav-link"
        style={{ cursor: "pointer" }}
        onClick={(e) => handleParentClick(key, e)}
      >
        <span className="d-flex align-items-center">
          <Icon className="me-2" />
          {!collapsed && title}
        </span>

        {!collapsed &&
          (openMenu === key ? <FaChevronDown /> : <FaChevronRight />)}
      </div>

      {/* inline submenu */}
      {!collapsed && openMenu === key && (
        <ul className="nav flex-column ms-3 border-start ps-2">
          {items.map((item) => (
            <li
              key={item}
              className={`nav-link small ${
                activeItem === item
                  ? "bg-info text-white rounded"
                  : "text-dark"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => handleItemClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {/* floating popup submenu */}
      {renderPopup(key, items)}
    </li>
  );

  return (
    <aside
      className={`d-flex flex-column bg-white text-dark p-3 vh-100 ${
        collapsed ? "align-items-center" : ""
      }`}
      style={{
        width: collapsed ? "60px" : "280px",
        transition: "width 0.3s ease",
        overflow: "visible",
      }}
    >
      {/* Logo */}
      <div className="mb-4 text-center">
        <img
          src={collapsed ? slogo : logo}
          alt="Logo"
          className="img-fluid"
          style={{ height: collapsed ? "40px" : "43px" }}
        />
      </div>

      {/* Menu list */}
      <div className="flex-grow-1" style={{ overflowX: "hidden", minHeight: 0 }}>
        <ul className="nav flex-column gap-1">
          {/* Dashboard (no submenu) */}
          <li
            className={`nav-item nav-link d-flex align-items-center ${
              activeItem === "Dashboard" ? "bg-secondary rounded text-white" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleItemClick("Dashboard")}
          >
            <FaHome className="me-2" />
            {!collapsed && "Dashboard"}
          </li>

          {/* Construction Work */}
          {renderMenuSection("construction", FaBuilding, "Construction Work", [
            "CW-Dashboard",
            "CW-Management",
            "CW-A03",
          ])}

          {/* Delivery Management */}
          {renderMenuSection("delivery", FaTruck, "Delivery Management", [
            "All Deliveries",
            "Planned Deliveries",
            "Confirmation Request",
            "Confirmed Deliveries",
            "Dispatched",
            "T&C Pending",
            "Completed Deliveries",
            "Close DRNs",
          ])}

          {/* Employee Management (single) */}
          <li
            className={`nav-item nav-link d-flex align-items-center ${
              activeItem === "Employee Management"
                ? "bg-secondary rounded text-white"
                : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleItemClick("Employee Management")}
          >
            <FaShoppingCart className="me-2" />
            {!collapsed && "Employee Management"}
          </li>

          {/* Holiday Management */}
          <li
            className={`nav-item nav-link d-flex align-items-center ${
              activeItem === "Holiday Management"
                ? "bg-secondary rounded text-white"
                : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleItemClick("Holiday Management")}
          >
            <FaChartBar className="me-2" />
            {!collapsed && "Holiday Management"}
          </li>

          {/* Supplier Management */}
          {renderMenuSection("supplier", FaTruck, "Supplier Management", [
            "Supplier Management",
            "All Suppliers",
            "Import Suppliers",
            "Add Suppliers",
          ])}

          {/* Reports Management */}
          {renderMenuSection("reports", FaDrum, "Reports Management", [
            "DMS Detail Report",
            "Pending Action",
            "Dispatch Delay",
            "Delivery Delay",
            "Delivery Rescheduled",
            "Completed Deliveries",
            "PKD/PPD Report",
            "DMS MGMT Report",
            "LAD Report",
            "TnC Aging report",
            "Bank report",
            "T & C Certificate",
            "Batch Rescheduled DRNs",
          ])}

          {/* User Access Reports */}
          {renderMenuSection("userAccess", FaTruck, "User Access Reports", [
            "User Access Reports",
            "User Activity Reports",
          ])}

          {/* Work Order */}
          {renderMenuSection("workOrder", FaTruck, "Work Order", [
            "Import Work Order",
            "Work Order Status",
          ])}
        </ul>
      </div>
    </aside>
  );
}
