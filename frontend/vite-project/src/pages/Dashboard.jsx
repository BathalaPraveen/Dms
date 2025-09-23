import { useTheme } from "../contexts/ThemeContext";
export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { darkMode } = useTheme();
  return (
    <div className={`d-flex flex-column vh-100 bg-${darkMode ? "dark" : "light"} text-${darkMode ? "white" : "dark"}`}>
      <div className="d-flex flex-grow-1 overflow-hidden">
        <main className="flex-grow-1 p-3 overflow-auto d-flex flex-column">
          <div className={`card p-3 shadow-sm rounded mb-3 bg-${darkMode ? "secondary text-white" : "light text-dark"}`}>
            <h4>Welcome Back {user?.name}!</h4>
          </div>
        </main>
      </div>
    </div>
  );
}
