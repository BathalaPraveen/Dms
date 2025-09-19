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
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => setOpenMenu(openMenu === menu ? null : menu);
  const handleItemClick = (item) => setActiveItem(item);

  return (
   <aside
  className={`d-flex flex-column bg-white text-dark p-3 vh-100 ${
    collapsed ? "align-items-center" : ""
  }`}
  style={{
    width: collapsed ? "60px" : "280px",
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

      {/* Menu */}
     <div className="flex-grow-1 overflow-auto" style={{ overflowX: "hidden", minHeight: 0 }}>
    <ul className="nav flex-column gap-1">

        {/* Dashboard */}
        <li
          className={`nav-item nav-link d-flex align-items-center ${
            activeItem === "Dashboard" ? "bg-secondary rounded" : ""
          }`}
          style={{ cursor: "pointer" }}
          onClick={() => handleItemClick("Dashboard")}
        >
          <FaHome className="me-2" />
          {!collapsed && "Dashboard"}
        </li>

        {/* Construction Work */}
        <li className="nav-item">
          <div
            className="d-flex align-items-center justify-content-between nav-link"
            style={{ cursor: "pointer" }}
            onClick={() => toggleMenu("construction")}
          >
            <span className="d-flex align-items-center">
              <FaBuilding className="me-2" />
              {!collapsed && "Construction Work"}
            </span>
            {!collapsed && (openMenu === "construction" ? <FaChevronDown /> : <FaChevronRight />)}
          </div>
          {!collapsed && openMenu === "construction" && (
            <ul className="nav flex-column ms-3 border-start ps-2">
              {["CW-Dashboard", "CW-Management", "CW-A03"].map((item) => (
                <li
                  key={item}
                  className={`nav-link small ${
                    activeItem === item ? "bg-info text-white rounded" : "text-dark"
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

        {/* Delivery Management */}
        <li className="nav-item">
          <div
            className="d-flex align-items-center justify-content-between nav-link"
            style={{ cursor: "pointer" }}
            onClick={() => toggleMenu("delivery")}
          >
            <span className="d-flex align-items-center">
              <FaTruck className="me-2" />
              {!collapsed && "Delivery Management"}
            </span>
            {!collapsed && (openMenu === "delivery" ? <FaChevronDown /> : <FaChevronRight />)}
          </div>
          {!collapsed && openMenu === "delivery" && (
            <ul className="nav flex-column ms-3 border-start ps-2">
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
                  className={`nav-link small ${
                    activeItem === item ? "bg-info text-white rounded" : "text-dark"
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

        {/* Employee Management */}
        <li
          className={`nav-item nav-link d-flex align-items-center ${
            activeItem === "Employee Management" ? "bg-secondary rounded" : ""
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
            activeItem === "Holiday Management" ? "bg-secondary rounded" : ""
          }`}
          style={{ cursor: "pointer" }}
          onClick={() => handleItemClick("Holiday Management")}
        >
          <FaChartBar className="me-2" />
          {!collapsed && "Holiday Management"}
        </li>

        {/* Supplier Management */}
        <li className="nav-item">
          <div
            className="d-flex align-items-center justify-content-between nav-link"
            style={{ cursor: "pointer" }}
            onClick={() => toggleMenu("supplier")}
          >
            <span className="d-flex align-items-center">
              <FaTruck className="me-2" />
              {!collapsed && "Supplier Management"}
            </span>
            {!collapsed && (openMenu === "supplier" ? <FaChevronDown /> : <FaChevronRight />)}
          </div>
          {!collapsed && openMenu === "supplier" && (
            <ul className="nav flex-column ms-3 border-start ps-2">
              {["Supplier Management", "All Suppliers", "Import Suppliers", "Add Suppliers"].map(
                (item) => (
                  <li
                    key={item}
                    className={`nav-link small ${
                      activeItem === item ? "bg-info text-white rounded" : "text-dark"
                    }`}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleItemClick(item)}
                  >
                    {item}
                  </li>
                )
              )}
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
          <li
            key={item}
            className={`nav-item nav-link d-flex align-items-center ${
              activeItem === item ? "bg-secondary rounded" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleItemClick(item)}
          >
            <FaChartBar className="me-2" />
            {!collapsed && item}
          </li>
        ))}

        {/* Reports Management */}
        <li className="nav-item">
          <div
            className="d-flex align-items-center justify-content-between nav-link"
            style={{ cursor: "pointer" }}
            onClick={() => toggleMenu("reports")}
          >
            <span className="d-flex align-items-center">
              <FaDrum className="me-2" />
              {!collapsed && "Reports Management"}
            </span>
            {!collapsed && (openMenu === "reports" ? <FaChevronDown /> : <FaChevronRight />)}
          </div>
          {!collapsed && openMenu === "reports" && (
            <ul className="nav flex-column ms-3 border-start ps-2">
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
                <li
                  key={item}
                  className={`nav-link small ${
                    activeItem === item ? "bg-info text-white rounded" : "text-dark"
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

        {/* User Access Reports */}
        <li className="nav-item">
          <div
            className="d-flex align-items-center justify-content-between nav-link"
            style={{ cursor: "pointer" }}
            onClick={() => toggleMenu("userAccess")}
          >
            <span className="d-flex align-items-center">
              <FaTruck className="me-2" />
              {!collapsed && "User Access Reports"}
            </span>
            {!collapsed && (openMenu === "userAccess" ? <FaChevronDown /> : <FaChevronRight />)}
          </div>
          {!collapsed && openMenu === "userAccess" && (
            <ul className="nav flex-column ms-3 border-start ps-2">
              {["User Access Reports", "User Activity Reports"].map((item) => (
                <li
                  key={item}
                  className={`nav-link small ${
                    activeItem === item ? "bg-info text-white rounded" : "text-dark"
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

        {/* Work Order */}
        <li className="nav-item">
          <div
            className="d-flex align-items-center justify-content-between nav-link"
            style={{ cursor: "pointer" }}
            onClick={() => toggleMenu("workOrder")}
          >
            <span className="d-flex align-items-center">
              <FaTruck className="me-2" />
              {!collapsed && "Work Order"}
            </span>
            {!collapsed && (openMenu === "workOrder" ? <FaChevronDown /> : <FaChevronRight />)}
          </div>
          {!collapsed && openMenu === "workOrder" && (
            <ul className="nav flex-column ms-3 border-start ps-2">
              {["Import Work Order", "Work Order Status"].map((item) => (
                <li
                  key={item}
                  className={`nav-link small ${
                    activeItem === item ? "bg-info text-white rounded" : "text-dark"
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

       
        </ul>
        </div>
    </aside>
  );
}
