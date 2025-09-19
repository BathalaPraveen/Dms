import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import "./Layout.css";

export default function Layout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} />

      {/* Right container */}
      <div className="right-container">
        <Header toggleSidebar={toggleSidebar} />
        <main className="dashboard-content">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
