// import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="d-flex flex-column vh-100">
      <div className="d-flex flex-grow-1 overflow-hidden">
        {/* Sidebar would go here */}

        {/* Main Content */}
        <main className="flex-grow-1 bg-light p-3 overflow-auto d-flex flex-column">
          <div className="card p-3 shadow-sm rounded mb-3">
            <h4>Welcome Back {user?.name}!</h4>
          </div>
        </main>
      </div>
    </div>
    
  );
}
