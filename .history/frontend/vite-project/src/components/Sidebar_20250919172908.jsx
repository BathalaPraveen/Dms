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
      style={{ width: collapsed ? "60px" : "240px", transition: "width 0.3s ease", minHeight: "100vh" }}
    >
      {/* Logo */}
      <div className="text-center mb-4">
        {collapsed ? (
          <img src={slogo} alt="Small Logo" className="img-fluid" style={{ maxWidth: "40px" }} />
        ) : (
          <img src={logo} alt="Main Logo" className="img-fluid" style={{ maxWidth: "180px", height: "40px" }} />
        )}
      </div>

      <ul className="nav nav-pills flex-column mb-auto">
        {/* Dashboard */}
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
          <a className="nav-link text-white d-flex align-items-center" onClick={() => toggleMenu("construction")}>
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

        {/* Delivery Management */}
        <li>
          <a className="nav-link text-white d-flex align-items-center" onClick={() => toggleMenu("delivery")}>
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

        {/* Employee Management */}
        <li>
          <a
            className={`nav-link text-white ${activeItem === "Employee Management" ? "active bg-info" : ""}`}
            onClick={() => handleItemClick("Employee Management")}
          >
            <FaShoppingCart className="me-2" />
            {!collapsed && "Employee Management"}
          </a>
        </li>

        {/* Holiday Management */}
        <li>
          <a
            className={`nav-link text-white ${activeItem === "Holiday Management" ? "active bg-info" : ""}`}
            onClick={() => handleItemClick("Holiday Management")}
          >
            <FaChartBar className="me-2" />
            {!collapsed && "Holiday Management"}
          </a>
        </li>

        {/* Supplier Management */}
        <li>
          <a className="nav-link text-white d-flex align-items-center" onClick={() => toggleMenu("Supplier Management")}>
            <FaTruck className="me-2" />
            {!collapsed && <span className="flex-grow-1">Supplier Management</span>}
            {!collapsed && (openMenu === "Supplier Management" ? <FaChevronDown /> : <FaChevronRight />)}
          </a>
          {openMenu === "Supplier Management" && !collapsed && (
            <ul className="nav flex-column ms-4 border-start ps-2">
              {["Supplier Management", "All Suppliers", "Import Suppliers", "Add Suppliers"].map((item) => (
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

        {/* Other Management Items */}
        {[
          "Log Capture Management",
          "BE Delivery Information",
          "Clinics Management",
          "Zone/State/Districts",
          "Document Management",
          "Tracking Management",
          "Tender Packages",
          "PKD/PPD Contact Lists",
          "Subscription Management",
        ].map((item) => (
          <li key={item}>
            <a
              className={`nav-link text-white ${activeItem === item ? "active bg-info" : ""}`}
              onClick={() => handleItemClick(item)}
            >
              <FaChartBar className="me-2" />
              {!collapsed && item}
            </a>
          </li>
        ))}

        {/* Reports Management */}
        <li>
          <a className="nav-link text-white d-flex align-items-center" onClick={() => toggleMenu("Reports Management")}>
            <FaDrum className="me-2" />
            {!collapsed && <span className="flex-grow-1">Reports Management</span>}
            {!collapsed && (openMenu === "Reports Management" ? <FaChevronDown /> : <FaChevronRight />)}
          </a>
          {openMenu === "Reports Management" && !collapsed && (
            <ul className="nav flex-column ms-4 border-start ps-2">
              {[
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

        {/* User Access Reports */}
        <li>
          <a className="nav-link text-white d-flex align-items-center" onClick={() => toggleMenu("User Access Reports")}>
            <FaTruck className="me-2" />
            {!collapsed && <span className="flex-grow-1">User Access Reports</span>}
            {!collapsed && (openMenu === "User Access Reports" ? <FaChevronDown /> : <FaChevronRight />)}
          </a>
          {openMenu === "User Access Reports" && !collapsed && (
            <ul className="nav flex-column ms-4 border-start ps-2">
              {["User Access Reports", "User Activity Reports"].map((item) => (
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

        {/* Work Order */}
        <li>
          <a className="nav-link text-white d-flex align-items-center" onClick={() => toggleMenu("Work Order")}>
            <FaTruck className="me-2" />
            {!collapsed && <span className="flex-grow-1">Work Order</span>}
            {!collapsed && (openMenu === "Work Order" ? <FaChevronDown /> : <FaChevronRight />)}
          </a>
          {openMenu === "Work Order" && !collapsed && (
            <ul className="nav flex-column ms-4 border-start ps-2">
              {["Import Work Order", "Work Order Status"].map((item) => (
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
