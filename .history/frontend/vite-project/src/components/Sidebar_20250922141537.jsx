// Sidebar.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [hoverMenu, setHoverMenu] = useState(null);
  const [hoverPos, setHoverPos] = useState({ top: 0, left: 0 });
  const navigate = useNavigate();
  const toggleMenu = (menu) =>
    setOpenMenu((prev) => (prev === menu ? null : menu));

  const handleParentClick = (menu, e) => {
    if (collapsed) return;
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

  // 🔹 Render popup (submenu OR single menu) for collapsed mode
  // 🔹 Render popup (collapsed mode)
  const renderPopup = (menu, items, title) => {
    if (!collapsed || hoverMenu !== menu) return null;

    // calculate max height to fit in viewport
    const viewportHeight = window.innerHeight;
    const padding = 16; // some spacing from bottom
    const maxHeight = viewportHeight - hoverPos.top - padding;

    return (
      <ul
        className="list-unstyled bg-white shadow rounded"
        style={{
          position: "fixed",
          top: `${hoverPos.top}px`,
          left: `${hoverPos.left + 8}px`,
          minWidth: "220px",
          maxHeight: `${maxHeight}px`, // ✅ dynamic max height
          overflowY: "auto", // scroll if submenu too long
          zIndex: 1050,
          padding: "4px 0",
          margin: 0,
        }}
        onMouseEnter={() => setHoverMenu(menu)}
        onMouseLeave={() => setHoverMenu(null)}
      >
        {/* Main menu always visible */}
        <li
          className={`nav-link small ${
            activeItem === title ? "bg-info text-white rounded" : "text-dark"
          }`}
          style={{
            cursor: "pointer",
            fontWeight: "600",
            padding: "6px 12px",
            whiteSpace: "nowrap",
          }}
          onClick={() => handleItemClick(title)}
        >
          {title}
        </li>

        {/* Submenu items */}
        {items.map((it) => (
          <li
            key={it}
            className={`nav-link small ${
              activeItem === it ? "bg-info text-white rounded" : "text-dark"
            }`}
            style={{
              cursor: "pointer",
              padding: "4px 24px",
              whiteSpace: "nowrap",
            }}
            onClick={() => handleItemClick(it)}
          >
            {it}
          </li>
        ))}
      </ul>
    );
  };

  // 🔹 Parent with submenu
  const renderMenuSection = (key, Icon, title, items) => (
    <li
      key={key}
      className="nav-item position-relative"
      onMouseEnter={(e) => handleMouseEnter(key, e)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="d-flex align-items-center justify-content-between nav-link"
        style={{ cursor: "pointer", color: "#ffffffff",fontSize: "15px" }}
        onClick={(e) => handleParentClick(key, e)}
      >
        <span className="d-flex align-items-center">
          <Icon className="me-2" />
          {!collapsed && title}
        </span>
        {!collapsed &&
          (openMenu === key ? <FaChevronDown /> : <FaChevronRight />)}
      </div>

      {/* Inline submenu (expanded mode) */}
      {!collapsed && openMenu === key && (
        <ul
          className="nav flex-column"
          style={{
            paddingLeft: "0px", // ✅ indent whole submenu from main menu
            margin: 0,
            listStyle: "none",
            fontSize: "14.5px"
          }}
        >
          {items.map((item) => (
            <li
              key={item}
              className={`nav-link small ${
                activeItem === item ? "bg-info text-white rounded" : ""
              }`}
              style={{
                cursor: "pointer",
                color: "#000000ff",
                whiteSpace: "nowrap",
                backgroundColor: "#ffffffff",
                textAlign: "left", // text left start
                width: "100%", // full width box
                paddingLeft: "55px", // text start from left but box full width
                paddingTop: "4px",
                paddingBottom: "4px",
                boxSizing: "border-box", // ensures padding inside li
                position: "relative",
              }}
              onClick={() => handleItemClick(item)}
            >
              {/* Round icon */}
              <span
                style={{
                  position: "absolute",
                  left: "30px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#ee943fff",
                }}
              ></span>
              {item}
            </li>
          ))}
        </ul>
      )}

      {/* Popup submenu (collapsed mode) */}
      {renderPopup(key, items, title)}
    </li>
  );

  // 🔹 Single menu (no submenu)
  // 🔹 Single menu (no submenu)
  const renderSingleMenu = (key, Icon, title, onClick) => (
    <li
      key={key}
      className="nav-item position-relative"
      onMouseEnter={(e) => handleMouseEnter(key, e)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`d-flex align-items-center nav-link ${
          activeItem === title ? "bg-secondary rounded text-white" : ""
        }`}
        style={{ cursor: "pointer", color: "#ffffffff",fontSize: "15px" }}
        onClick={() => {
          handleItemClick(title); // highlight the menu
          if (onClick) onClick(); // navigate if provided
        }}
      >
        <Icon className="me-2" />
        {!collapsed && title}
      </div>

      {/* Popup only shows title (collapsed mode) */}
      {renderPopup(key, [], title)}
    </li>
  );

  return (
    <aside
      className={`d-flex flex-column vh-100 ${
        collapsed ? "align-items-center" : ""
      }`}
      style={{
        width: collapsed ? "60px" : "280px",
        transition: "width 0.3s ease",
        overflow: "visible",
        backgroundColor: "#002560", // sidebar background
        padding: "0px",
        color: "#ffffffff",
      }}
    >
      {/* Logo */}
      <div
        className="text-center"
        style={{
          padding: collapsed ? "5px" : "14px", // ✅ add padding
          backgroundColor: "#ffffff", // ✅ background white
        }}
      >
        <img
          src={collapsed ? slogo : logo}
          alt="Logo"
          className="img-fluid"
          style={{ height: collapsed ? "40px" : "43px" }}
        />
      </div>

      {/* Menu list */}
      <div
        className="flex-grow-1"
        style={{ overflowX: "hidden", minHeight: 0 }}
      >
        <ul className="nav flex-column gap-1">
          {renderSingleMenu("dashboard", FaHome, "Dashboard", () =>
            navigate("/dashboard")
          )}
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
          {renderSingleMenu(
            "employee",
            FaShoppingCart,
            "Employee Management",
            () => navigate("/employee")
          )}

          {renderSingleMenu("holiday", FaChartBar, "Holiday Management")}
          {renderMenuSection("supplier", FaTruck, "Supplier Management", [
            "Supplier Management",
            "All Suppliers",
            "Import Suppliers",
            "Add Suppliers",
          ])}
          {renderSingleMenu("logCapture", FaChartBar, "Log Capture Management")}
          {renderSingleMenu(
            "beDelivery",
            FaChartBar,
            "BE Delivery Information"
          )}
          {renderSingleMenu("clinics", FaChartBar, "Clinics Management")}
          {renderSingleMenu("zone", FaChartBar, "Zone/State/Districts")}
          {renderSingleMenu("document", FaChartBar, "Document Management")}
          {renderSingleMenu("tracking", FaChartBar, "Tracking Management")}
          {renderSingleMenu("tender", FaChartBar, "Tender Packages")}
          {renderSingleMenu("pkd", FaChartBar, "PKD/PPD Contact Lists")}
          {renderSingleMenu(
            "subscription",
            FaChartBar,
            "Subscription Management"
          )}
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
      </div>
    </aside>
  );
}
