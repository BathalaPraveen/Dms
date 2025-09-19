
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

return (
    <div className="dashboard-layout">

      <div className="dashboard-body">
        {/* Sidebar */}

        {/* Main Content */}
        <main className="dashboard-main">
          <div className="dashboard-card">
            <h4>Welcome Back {user?.name}</h4>
          </div>
        </main>
      </div>
    </div>
  );
}
