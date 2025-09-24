import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(x => x);

  return (
    <nav aria-label="breadcrumb" className="mb-3">
      <ol className="breadcrumb bg-light rounded-3 p-2">
        <li className="breadcrumb-item">
          <Link to="/" className="text-primary text-decoration-none">Home</Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <li key={index} className="breadcrumb-item active" aria-current="page">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </li>
          ) : (
            <li key={index} className="breadcrumb-item">
              <Link to={routeTo} className="text-primary text-decoration-none">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
