import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.css"; // import CSS

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(x => x);

  return (
    <nav className="breadcrumb-container mb-3">
      <ol className="breadcrumb mb-0">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
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
              <Link to={routeTo}>{name.charAt(0).toUpperCase() + name.slice(1)}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
