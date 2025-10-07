import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import "./Layout.css";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [activeItem, setActiveItem] = useState("");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
<<<<<<< HEAD
    <div className="layout">
      <Sidebar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        handleLogout={handleLogout}
      />
      <div className="main-area">
        <Header user={user} />
        <div className="content-area">
          {children}
        </div>
=======
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} />

      {/* Right container */}
      <div className="right-container">
        <Header toggleSidebar={toggleSidebar} />
        <main className="dashboard-content">{children}</main>
>>>>>>> ad932467a59e94c5f01b939aca0a4c8745a79cb2
        <Footer />
      </div>
    </div>
  );
}
