// src/components/Layout.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumb from "./Breadcrumb";
import "./Layout.css";
import { useTheme } from "../contexts/ThemeContext"; // Import the custom hook

export default function Layout({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { darkMode } = useTheme(); // Access dark mode state from context

  const [activeItem, setActiveItem] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  return (
    <div className={`layout ${darkMode ? "dark-mode" : "light-mode"}`}>
      <Sidebar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        handleLogout={handleLogout}
        collapsed={isSidebarCollapsed}
      />
      <div className="main-area">
        <Header toggleSidebar={toggleSidebar} user={user} />
        <div className="content-area p-3">
          <Breadcrumb /> {/* <-- Added breadcrumb */}
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}