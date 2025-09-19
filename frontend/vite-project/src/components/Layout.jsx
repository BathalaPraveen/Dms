import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

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
    <div className="dashboard-layout">
      {/* Header on top */}
      <Header user={user} />

      {/* Body: sidebar + main content */}
      <div className="dashboard-body">
        {/* Sidebar left */}
        <Sidebar
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          handleLogout={handleLogout}
        />

        {/* Main content right */}
        <div className="dashboard-content">
          {children}
          {/* Footer inside main content */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
