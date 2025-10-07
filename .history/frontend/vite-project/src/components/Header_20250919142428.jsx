import "./Header.css";

export default function Header({ user }) {
  return (
    <header className="header">
      <div>Welcome, {user?.name || "User"}</div>
    </header>
  );
}
