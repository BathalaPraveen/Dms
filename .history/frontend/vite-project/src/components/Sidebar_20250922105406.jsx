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
import "bootstrap/dist/css/bootstrap.min.css";

export default function Sidebar({ activeItem, setActiveItem, collapsed }) {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) =>
    setOpenMenu((prev) => (prev === menu ? null : menu));

  const handleItemClick = (item) => {
    setActiveItem(item);
    setOpenMenu(null);
  };

  // parent + child render
  const renderMenuSection = (key, Icon, title, items) => (
    <li key={key} className="nav-item">
      <div
        className={`d-flex justify-content-between align-items-center nav-link ${
          openMenu === key ? "bg-light rounded" : ""
        }`}
        style={{ cursor: "pointer" }}
        onClick={() => toggleMenu(key)}
      >
        <span className="d-flex align-items-center">
          <Icon className="me-2" />
          {!collapsed && title}
        </span>
        {!collapsed &&
          (openMenu === key ? <FaChevronDown /> : <FaChevronRight />)}
      </div>

      {/* Child menus */}
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
    </li>
  );

  return (
    <aside
      className={`d-flex flex-column bg-white text-dark p-3 vh-100 ${
        collapsed ? "align-items-center" : ""
      }`}
      style={{
        width: collapsed ? "60px" : "260px",
        transition: "width 0.3s ease",
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

      {/* Menu items */}
      <ul className="nav flex-column gap-1">
        {/* Dashboard */}
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

        {/* Example submenu */}
        {renderMenuSection("construction", FaBuilding, "Construction Work", [
          "CW-Dashboard",
          "CW-Management",
          "CW-A03",
        ])}

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

        {/* Single items */}
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

        {renderMenuSection("supplier", FaTruck, "Supplier Management", [
          "Supplier Management",
          "All Suppliers",
          "Import Suppliers",
          "Add Suppliers",
        ])}

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

        {renderMenuSection("userAccess", FaTruck, "User Access Reports", [
          "User Access Reports",
          "User Activity Reports",
        ])}

        {renderMenuSection("workOrder", FaTruck, "Work Order", [
          "Import Work Order",
          "Work Order Status",
        ])}
      </ul>
    </aside>
  );
}
