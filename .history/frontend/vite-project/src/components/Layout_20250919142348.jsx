import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
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
        <Footer />
      </div>
    </div>
  );
}
