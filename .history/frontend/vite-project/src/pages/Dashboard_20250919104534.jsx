import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import {
  FaHome,
  FaBuilding,
  FaTruck,
  FaShoppingCart,
  FaChartBar,
  FaSignOutAlt,
  FaChevronRight,
  FaChevronDown,
  FaDrum
} from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [openMenu, setOpenMenu] = useState(null);
  const [activeItem, setActiveItem] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

    return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <ul className="menu">
          {/* Dashboard */}
          <li
            className={activeItem === "Dashboard" ? "active" : ""}
            onClick={() => handleItemClick("Dashboard")}
          >
            <FaHome style={{ marginRight: "8px" }} /> Dashboard
          </li>

          {/* Construction Work */}
          <li>
            <div className="menu-item" onClick={() => toggleMenu("construction")}>
              <FaBuilding style={{ marginRight: "8px" }} /> Construction Work
              {openMenu === "construction" ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            {openMenu === "construction" && (
              <ul className="submenu">
                <li
                  className={activeItem === "CW-Dashboard" ? "active" : ""}
                  onClick={() => handleItemClick("CW-Dashboard")}
                >
                  Dashboard
                </li>
                <li
                  className={activeItem === "CW-Management" ? "active" : ""}
                  onClick={() => handleItemClick("CW-Management")}
                >
                  Management
                </li>
                <li
                  className={activeItem === "CW-A03" ? "active" : ""}
                  onClick={() => handleItemClick("CW-A03")}
                >
                  A03 Form
                </li>
              </ul>
            )}
          </li>

          {/* Delivery Management */}
          <li>
            <div className="menu-item" onClick={() => toggleMenu("delivery")}>
              <FaTruck style={{ marginRight: "8px" }} /> Delivery Management
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

          {/* Employee Management */}
          <li
            className={activeItem === "Employee Management" ? "active" : ""}
            onClick={() => handleItemClick("Employee Management")}
          >
            <FaShoppingCart style={{ marginRight: "8px" }} /> Employee Management
          </li>

          {/* Holiday Management */}
          <li
            className={activeItem === "Holiday Management" ? "active" : ""}
            onClick={() => handleItemClick("Holiday Management")}
          >
            <FaChartBar style={{ marginRight: "8px" }} /> Holiday Management
          </li>

          {/* Supplier Management */}
          <li>
            <div className="menu-item" onClick={() => toggleMenu("Supplier Management")}>
              <FaTruck style={{ marginRight: "8px" }} /> Supplier Management
              {openMenu === "Supplier Management" ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            {openMenu === "Supplier Management" && (
              <ul className="submenu">
                {["Supplier Management", "All Suppliers", "Import Suppliers", "Add Suppliers"].map(
                  (item) => (
                    <li
                      key={item}
                      className={activeItem === item ? "active" : ""}
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
              className={activeItem === item ? "active" : ""}
              onClick={() => handleItemClick(item)}
            >
              <FaChartBar style={{ marginRight: "8px" }} /> {item}
            </li>
          ))}

          {/* Reports Management */}
          <li>
            <div className="menu-item" onClick={() => toggleMenu("Reports Management")}>
              <FaDrum style={{ marginRight: "8px" }} /> Reports Management
              {openMenu === "Reports Management" ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            {openMenu === "Reports Management" && (
              <ul className="submenu">
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
                    className={activeItem === item ? "active" : ""}
                    onClick={() => handleItemClick(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* User Access Reports */}
          <li>
            <div className="menu-item" onClick={() => toggleMenu("User Access Reports")}>
              <FaTruck style={{ marginRight: "8px" }} /> User Access Reports
              {openMenu === "User Access Reports" ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            {openMenu === "User Access Reports" && (
              <ul className="submenu">
                {["User Access Reports", "User Activity Reports"].map((item) => (
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

          {/* Work Order */}
          <li>
            <div className="menu-item" onClick={() => toggleMenu("Work Order")}>
              <FaTruck style={{ marginRight: "8px" }} /> Work Order
              {openMenu === "Work Order" ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            {openMenu === "Work Order" && (
              <ul className="submenu">
                {["Import Work Order", "Work Order Status"].map((item) => (
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
            <FaSignOutAlt style={{ marginRight: "8px" }} /> Logout
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-card">
          <h4>Welcome Back {user?.name}</h4>
        </div>
      </main>
    </div>
  );
}
