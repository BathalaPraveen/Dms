import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaBackward } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";

const SupplierEmpView = () => {
  const { supplierIndex, employeeIndex } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const { darkMode } = useTheme();

  useEffect(() => {
    try {
      const suppliers = JSON.parse(localStorage.getItem("supplierData")) || [];
      const sIndex = parseInt(supplierIndex, 10);
      const eIndex = parseInt(employeeIndex, 10);

      if (suppliers[sIndex] && suppliers[sIndex].empList) {
        const emp = suppliers[sIndex].empList[eIndex];
        if (emp) {
          setEmployee(emp);
        } else {
          setError("Employee not found.");
        }
      } else {
        setError("Supplier or employee list not found.");
      }
    } catch (err) {
      setError("Failed to fetch employee data.");
      console.error("LocalStorage Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [supplierIndex, employeeIndex]);

  if (loading) {
    return <div className="text-center mt-5"><p>{t("loading")}</p></div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger"><p>{error}</p></div>;
  }

  if (!employee) {
    return <div className="text-center mt-5"><p>{t("employee.notFound")}</p></div>;
  }

  return (
    <div className="container mt-5">
      <div
        className="card shadow-sm p-4"
        style={{
          backgroundColor: darkMode ? "#3d3d3dff" : "#ffff",
          color: darkMode ? "#e6eef8" : "#212529",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="card-title text-center">
            {t("employee.empdetails")}
          </h4>
          <div className="text-center">
            <Link to={`/supplier/supplieremp/${supplierIndex}`} className="btn btn-primary">
              <FaBackward /> {t("common.back")}
            </Link>
          </div>
        </div>

        <div className="table-responsive">
          <table
            className={`table table-bordered table-striped ${
              darkMode ? "table-dark" : ""
            }`}
          >
            <tbody>
              <tr>
                <th style={{ width: "200px" }}>{t("employee.id")}</th>
                <td>{employee.employeeId}</td>
                <th style={{ width: "200px" }}>{t("employee.employeeName")}</th>
                <td>{employee.employeeName}</td>
              </tr>
              <tr>
                <th>{t("employee.usertype")}</th>
                <td>{employee.employeeType}</td>
                <th>{t("supplier.mobile")}</th>
                <td>{employee.mobile}</td>
              </tr>
              <tr>
                <th>{t("supplier.email")}</th>
                <td>{employee.email}</td>
                <th>{t("employee.zone")}</th>
                <td>{employee.zone}</td>
              </tr>
              <tr>
                <th>{t("employee.country")}</th>
                <td>{employee.country}</td>
                <th>{t("employee.state")}</th>
                <td>{employee.state}</td>
              </tr>
              <tr>
                <th>{t("employee.district")}</th>
                <td>{employee.district}</td>
                <td colSpan={2}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupplierEmpView;
