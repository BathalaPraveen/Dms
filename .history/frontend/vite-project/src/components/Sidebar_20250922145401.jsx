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
  const [activeParent, setActiveParent] = useState(null);

  const navigate = useNavigate();

  const toggleMenu = (menu) =>
    setOpenMenu((prev) => (prev === menu ? null : menu));

  const handleParentClick = (menu) => {
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

  const handleItemClick = (item, parent = null) => {
    setActiveItem(item);
    setActiveParent(parent);
    setOpenMenu(parent);
    setHoverMenu(null);
  };

  const renderPopup = (menu, items, title) => {
    if (!collapsed || hoverMenu !== menu) return null;

    const viewportHeight = window.innerHeight;
    const padding = 16;
    const maxHeight = viewportHeight - hoverPos.top - padding;

    return (
      <ul
        className="list-unstyled shadow rounded"
        style={{
          position: "fixed",
          top: `${hoverPos.top}px`,
          left: `${hoverPos.left + 8}px`,
          minWidth: "220px",
          maxHeight: `${maxHeight}px`,
          overflowY: "auto",
          zIndex: 1050,
          padding: "4px 0",
          margin: 0,
          backgroundColor: "#002560",
        }}
        onMouseEnter={() => setHoverMenu(menu)}
        onMouseLeave={() => setHoverMenu(null)}
      >
        <li
          style={{
            cursor: "pointer",
            fontWeight: "600",
            padding: "6px 12px",
            whiteSpace: "nowrap",
            backgroundColor: activeItem === title ? "#ffffff" : "transparent",
            color: activeItem === title ? "#002560" : "#ffffff",
          }}
          onClick={() => handleItemClick(title)}
        >
          {title}
        </li>
        {items.map((it) => (
          <li
            key={it}
            style={{
              cursor: "pointer",
              padding: "4px 24px",
              whiteSpace: "nowrap",
              backgroundColor: activeItem === it ? "#ffffff" : "transparent",
              color: activeItem === it ? "#002560" : "#ffffff",
            }}
            onClick={() => handleItemClick(it, menu)}
          >
            {it}
          </li>
        ))}
      </ul>
    );
  };

  const renderMenuSection = (key, Icon, title, items) => (
    <li
      key={key}
      className="nav-item position-relative"
      onMouseEnter={(e) => handleMouseEnter(key, e)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="d-flex align-items-center justify-content-between nav-link rounded"
        style={{
          cursor: "pointer",
          color: activeParent === key ? "#002560" : "#ffffff",
          backgroundColor: activeParent === key ? "#ffffff" : "#002560",
          fontSize: "14px",
        }}
        onClick={() => handleParentClick(key)}
      >
        <span className="d-flex align-items-center">
          <Icon className="me-2" />
          {!collapsed && title}
        </span>
        {!collapsed &&
          (openMenu === key ? <FaChevronDown /> : <FaChevronRight />)}
      </div>

      {!collapsed && openMenu === key && (
        <ul
          className="nav flex-column"
          style={{
            paddingLeft: "0px",
            paddingLeft: "0px",
            margin: 0,
            listStyle: "none",
            fontSize: "14px",
          }}
        >
          {items.map((item) => (
            <li
              key={item}
              style={{
                cursor: "pointer",
                color: activeItem === item ? "#002560" : "#ffffff",
                backgroundColor: activeItem === item ? "#ffffff" : "transparent",
                whiteSpace: "nowrap",
                textAlign: "left",
                width: "100%",
                paddingLeft: "55px",
                paddingTop: "5px",
                paddingBottom: "4px",
                boxSizing: "border-box",
                position: "relative",
              }}
              onClick={() => handleItemClick(item, key)}
            >
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

      {renderPopup(key, items, title)}
    </li>
  );

  const renderSingleMenu = (key, Icon, title, onClick) => (
    <li
      key={key}
      className="nav-item position-relative"
      onMouseEnter={(e) => handleMouseEnter(key, e)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="d-flex align-items-center nav-link rounded"
        style={{
          cursor: "pointer",
          color: activeItem === title ? "#002560" : "#ffffff",
          backgroundColor: activeItem === title ? "#ffffff" : "#002560",
          fontSize: "14px",
        }}
        onClick={() => {
          handleItemClick(title);
          if (onClick) onClick();
        }}
      >
        <Icon className="me-2" />
        {!collapsed && title}
      </div>
      {renderPopup(key, [], title)}
    </li>
  );

  return (
    <aside
      className={`d-flex flex-column vh-100 ${
        collapsed ? "align-items-center" : ""
      }`}
      style={{
        width: collapsed ? "60px" : "250px",
        transition: "width 0.3s ease",
        overflow: "visible",
        backgroundColor: "#002560",
        padding: "0px",
        color: "#ffffff",
      }}
    >
      <div
        className="text-center"
        style={{
          padding: collapsed ? "5px" : "14px",
          backgroundColor: "#ffffff",
        }}
      >
        <img
          src={collapsed ? slogo : logo}
          alt="Logo"
          className="img-fluid"
          style={{ height: collapsed ? "40px" : "43px" }}
        />
      </div>

      <div className="flex-grow-1" style={{ overflowX: "hidden", minHeight: 0 }}>
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
