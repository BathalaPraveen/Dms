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

  // menu configuration (all menus + submenus)
  const menuConfig = [
    { key: "dashboard", title: "Dashboard", icon: FaHome },
    {
      key: "construction",
      title: "Construction Work",
      icon: FaBuilding,
      children: ["CW-Dashboard", "CW-Management", "CW-A03"],
    },
    {
      key: "delivery",
      title: "Delivery Management",
      icon: FaTruck,
      children: [
        "All Deliveries",
        "Planned Deliveries",
        "Confirmation Request",
        "Confirmed Deliveries",
        "Dispatched",
        "T&C Pending",
        "Completed Deliveries",
        "Close DRNs",
      ],
    },
    { key: "employee", title: "Employee Management", icon: FaShoppingCart },
    { key: "holiday", title: "Holiday Management", icon: FaChartBar },
    {
      key: "supplier",
      title: "Supplier Management",
      icon: FaTruck,
      children: ["Supplier Management", "All Suppliers", "Import Suppliers", "Add Suppliers"],
    },
    {
      key: "reports",
      title: "Reports Management",
      icon: FaDrum,
      children: [
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
      ],
    },
    {
      key: "userAccess",
      title: "User Access Reports",
      icon: FaTruck,
      children: ["User Access Reports", "User Activity Reports"],
    },
    {
      key: "workOrder",
      title: "Work Order",
      icon: FaTruck,
      children: ["Import Work Order", "Work Order Status"],
    },
    // single extra menus (no children)
    { key: "log", title: "Log Capture Management", icon: FaChartBar },
    { key: "beDelivery", title: "BE Delivery Information", icon: FaChartBar },
    { key: "clinics", title: "Clinics Management", icon: FaChartBar },
    { key: "zone", title: "Zone/State/Districts", icon: FaChartBar },
    { key: "document", title: "Document Management", icon: FaChartBar },
    { key: "tracking", title: "Tracking Management", icon: FaChartBar },
    { key: "tender", title: "Tender Packages", icon: FaChartBar },
    { key: "pkd", title: "PKD/PPD Contact Lists", icon: FaChartBar },
    { key: "subscription", title: "Subscription Management", icon: FaChartBar },
  ];

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
    setOpenMenu(null);
  };

  // render menu (with or without children)
  const renderMenu = (menu) => {
    const Icon = menu.icon;

    // with children → expandable
    if (menu.children) {
      return (
        <li key={menu.key} className="nav-item">
          <div
            className="d-flex align-items-center justify-content-between nav-link"
            style={{ cursor: "pointer" }}
            onClick={() => toggleMenu(menu.key)}
          >
            <span className="d-flex align-items-center">
              <Icon className="me-2" />
              {!collapsed && menu.title}
            </span>
            {!collapsed &&
              (openMenu === menu.key ? <FaChevronDown /> : <FaChevronRight />)}
          </div>

          {!collapsed && openMenu === menu.key && (
            <ul className="nav flex-column ms-3 border-start ps-2">
              {menu.children.map((child) => (
                <li
                  key={child}
                  className={`nav-link small ${
                    activeItem === child
                      ? "bg-info text-white rounded"
                      : "text-dark"
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleItemClick(child)}
                >
                  {child}
                </li>
              ))}
            </ul>
          )}
        </li>
      );
    }

    // no children → single menu
    return (
      <li
        key={menu.key}
        className={`nav-item nav-link d-flex align-items-center ${
          activeItem === menu.title ? "bg-secondary rounded text-white" : ""
        }`}
        style={{ cursor: "pointer" }}
        onClick={() => handleItemClick(menu.title)}
      >
        <Icon className="me-2" />
        {!collapsed && menu.title}
      </li>
    );
  };

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

      {/* Render Menus */}
      <ul className="nav flex-column gap-1">
        {menuConfig.map((menu) => renderMenu(menu))}
      </ul>
    </aside>
  );
}
