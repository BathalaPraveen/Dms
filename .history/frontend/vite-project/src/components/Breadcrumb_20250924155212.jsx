import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(x => x);

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
      <ol className="breadcrumb bg-light rounded-3 p-2">
        <li className="breadcrumb-item">
          <Link to="/dashboard" className="text-primary text-decoration-none">
            Home
          </Link>
        </li>

        {pathnames
          .filter(name => isNaN(name)) // number (id) remove
          .map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;

            const displayName = nameMap[name] || (name.charAt(0).toUpperCase() + name.slice(1));

            return isLast ? (
              <li key={index} className="breadcrumb-item active" aria-current="page">
                {displayName}
              </li>
            ) : (
              <li key={index} className="breadcrumb-item">
                <Link to={routeTo} className="text-primary text-decoration-none">
                  {displayName}
                </Link>
              </li>
            );
          })}
      </ol>
    </nav>
  );
}
