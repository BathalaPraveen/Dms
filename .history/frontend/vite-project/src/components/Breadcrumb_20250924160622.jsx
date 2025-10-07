import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "../contexts/ThemeContext";

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(x => x);
  const { darkMode } = useTheme();

  // URL slug → Display name mapping
  const nameMap = {
    dashboard: "Dashboard",
    employee: "Employee Management",
    "employeeview": "Employee View",
    "employeeadd": "Add Employee",
    settings: "Settings",
  };

  return (
    <nav aria-label="breadcrumb" className="mb-3">
      <ol className="breadcrumb bg-light rounded-3 p-2" style={{
          backgroundColor: darkMode ? "#1e1e1e" : "#f8f9fa", // dark bg / light bg
          color: darkMode ? "#e6eef8" : "#212529", // dark text / light text
        }}>
        <li className="breadcrumb-item">
          <Link to="/dashboard" className="text-primary text-decoration-none" style={{ color: darkMode ? "#000000ff" : "#0d6efd" }}>
            Home
          </Link>
        </li>
        {pathnames
          .filter(name => isNaN(name))
          .map((name, index, filteredArray) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === filteredArray.length - 1; // 👈 correct check

            const displayName =
              nameMap[name] || name.charAt(0).toUpperCase() + name.slice(1);

            return (
              <li
                key={index}
                className={`breadcrumb-item ${isLast ? "active" : ""}`}
                aria-current={isLast ? "page" : undefined}
                style={{
                  color: darkMode
                    ? isLast
                      ? "#fff"
                      : "#90caf9"
                    : isLast
                    ? "#212529"
                    : "#0d6efd",
                }}
              >
                {isLast ? (
                  displayName
                ) : (
                  <Link to={routeTo} className="text-primary text-decoration-none"  style={{ color: darkMode ? "#90caf9" : "#0d6efd" }}>
                    {displayName}
                  </Link>
                )}
              </li>
            );
          })}
      </ol>
    </nav>
  );
}
