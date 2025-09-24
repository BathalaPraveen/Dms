import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li
              className={`breadcrumb-item ${isLast ? "active" : ""}`}
              key={routeTo}
              aria-current={isLast ? "page" : undefined}
            >
              {isLast ? (
                name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
              ) : (
                <Link to={routeTo}>
                  {name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
