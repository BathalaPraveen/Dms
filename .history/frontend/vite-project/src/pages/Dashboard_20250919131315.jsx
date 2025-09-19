import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));


return (
    <div className="dashboard-layout">

      <div className="dashboard-body">
        {/* Sidebar */}


        {/* Main Content */}
        <main className="dashboard-main">
          <div className="dashboard-card">
            <h4>Welcome Back {user?.name}</h4>
            <p>Selected: {activeItem}</p>
          </div>
        </main>
      </div>
    </div>
  );
}
