import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumb from "./Breadcrumb";
import "./Layout.css";
import { useTheme } from "../contexts/ThemeContext";
import { ToastContainer } from "react-toastify"; // import ToastContainer
import "react-toastify/dist/ReactToastify.css";   // import styles

export default function Layout({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { darkMode } = useTheme();

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
          <Breadcrumb />
          {children}
        </div>
        <Footer />
      </div>

      {/* ToastContainer added here for all pages */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
