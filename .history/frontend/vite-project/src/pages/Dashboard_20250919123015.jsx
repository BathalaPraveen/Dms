import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "./Dashboard.css";

export default function Dashboard() {
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
  {/* Header */}
  <Header user={user} />

  <div className="dashboard-body">
    {/* Sidebar */}
    <Sidebar
      activeItem={activeItem}
      setActiveItem={setActiveItem}
      handleLogout={handleLogout}
          <main className="dashboard-main">
      <div className="dashboard-card">
        <h4>Welcome Back {user?.name}</h4>
        <p>Selected: {activeItem}</p>
      </div>
    </main>
    <Footer />
    />

    {/* Main Content */}

  </div>

  {/* Footer */}
  <Footer />
</div>

  );
}
