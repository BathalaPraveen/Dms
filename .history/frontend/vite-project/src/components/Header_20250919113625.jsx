import "./Header.css";

export default function Header({ user }) {
  return (
    <header className="dashboard-header">
      <h2>My Dashboard</h2>
      <div className="user-info">Welcome, {user?.name}</div>
    </header>
  );
}
