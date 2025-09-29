import { Link, useLocation, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";

export default function Breadcrumb({ collapsed }) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const { darkMode } = useTheme();
  const { t } = useTranslation();
  const { supplierIndex } = useParams();

  const nameMap = {
    dashboard: t("breadcrumb.dashboard"),
    employee: t("breadcrumb.employee"),
    employeeview: t("breadcrumb.employeeview"),
    employeeadd: t("breadcrumb.employeeadd"),
    employeeedit: t("breadcrumb.employeeedit"),
    settings: t("breadcrumb.settings"),
    SuplierList: t("supplier.suplist"),
    supplier: t("supplier.supmang"),
    supplierview: t("supplier.supview"),
    supplieremp: t("supplier.supemp"),
    supempadd: t("breadcrumb.employeeadd"),
    supempview: t("breadcrumb.employeeview"),
    Supempedit: t("breadcrumb.employeeview"),
  };

  return (
    <nav aria-label="breadcrumb" className="mb-3 w-100" style={{ overflowX: collapsed ? "hidden" : "auto" }}>
      <ol
        className="rounded-3 p-2 d-flex flex-wrap gap-2"
        style={{
          listStyle: "none",
          backgroundColor: darkMode ? "#3d3d3dff" : "#ffff",
          color: darkMode ? "#e6eef8" : "#212529",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <li className="breadcrumb-item">
          <Link to="/dashboard" className="text-decoration-none" style={{ color: darkMode ? "#90caf9" : "#0d6efd" }}>
            {t("breadcrumb.home")}
          </Link>
        </li>

        {pathnames
          .filter((name) => isNaN(name))
          .map((name, index, filteredArray) => {
            let routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            
            // <-- handle supplieremp route with index
            if (name === "supplieremp" && supplierIndex) {
              routeTo = `/supplier/supplieremp/${supplierIndex}`;
            }

            const isLast = index === filteredArray.length - 1;
            const displayName = nameMap[name] || name.charAt(0).toUpperCase() + name.slice(1);

            return (
              <li
                key={index}
                className={`breadcrumb-item ${isLast ? "active" : ""}`}
                aria-current={isLast ? "page" : undefined}
                style={{
                  color: darkMode
                    ? isLast
                      ? "#CCCCCC"
                      : "#90caf9"
                    : isLast
                    ? "#212529"
                    : "#0d6efd",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {isLast ? (
                  displayName
                ) : (
                  <Link to={routeTo} className="text-decoration-none" style={{ color: darkMode ? "#90caf9" : "#0d6efd" }}>
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
