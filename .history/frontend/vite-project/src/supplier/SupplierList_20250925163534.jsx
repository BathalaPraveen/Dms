import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { generatePdf } from "../exports/PdfTemplate";
import exportToExcel from "../exports/ExportExcel";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import { createColumnHelper } from "@tanstack/react-table";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlus, FaRegEye, FaPencilAlt, FaTrashAlt, FaRegFilePdf, FaFileExcel, FaUserTie } from "react-icons/fa";
import Table from "../components/Table";
import Delete from "../components/Delete";

const ApiTable = ({ collapsed }) => {

  const navigate = useNavigate();
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]); // New state to hold filtered rows
  const { darkMode } = useTheme();

  useEffect(() => {
    setLoading(true); // show loading while fetching
    try {
      // Get data from localStorage
      const storedUsers = localStorage.getItem("employeeData"); // your key
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers)); // parse JSON string to array
      } else {
        setUsers([]); // if nothing in localStorage
      }
    } catch (err) {
      setError("Failed to load data from localStorage");
      console.error("LocalStorage Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleView = (index) => navigate(`/employee/employeeview/${index}`);
  const handleEdit = (index) => navigate(`/employee/employeeedit/${index}`);
  const handleDelete = (index) => {
    Delete({
      title: "Delete Employee",
      message: "Are you sure you want to delete this employee?",
      onConfirm: () => {
        const updatedUsers = [...users];
        updatedUsers.splice(index, 1);
        setUsers(updatedUsers);
        localStorage.setItem("employeeData", JSON.stringify(updatedUsers));
      },
    });
  };
  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.accessor("employeeId", { header: t("employee.id"), cell: (info) => info.getValue() }),
      columnHelper.accessor("firstName", { header: t("employee.employeeName"), cell: (info) => info.getValue() }),
      columnHelper.accessor("designation", { header: t("employee.designation"), cell: (info) => info.getValue() }),
      columnHelper.accessor("userType", { header: t("employee.usertype"), cell: (info) => info.getValue() }),
      columnHelper.accessor("email", { header: t("employee.email"), cell: (info) => info.getValue() }),
      columnHelper.accessor("zone", { header: t("employee.zone"), cell: (info) => info.getValue() }),
      columnHelper.accessor("mobile", { header: t("employee.mobile"), cell: (info) => info.getValue() }),
      columnHelper.display({
        id: "actions",
        header: t("table.actions"),
        cell: (props) => (
          <div className="d-flex justify-content-start">
            <button className="btn btn-link p-0 me-2 text-decoration-none" onClick={() => handleView(props.row.index)}>
              <FaUserTie style={{ color: "#65a3d9" }} />
            </button>
            <button className="btn btn-link p-0 me-2 text-decoration-none" onClick={() => handleView(props.row.index)}>
              <FaRegEye style={{ color: "#65a3d9" }} />
            </button>
            <button className="btn btn-link p-0 me-2 text-decoration-none" onClick={() => handleEdit( props.row.index)}>
              <FaPencilAlt style={{ color: "#4d88e0" }} />
            </button>
            <button className="btn btn-link p-0 text-decoration-none" onClick={() => handleDelete(props.row.index)}>
              <FaTrashAlt style={{ color: "#de6b62" }} />
            </button>
          </div>
        ),
        enableSorting: false,
        enableColumnFilter: false,
      }),
    ],
    [columnHelper, t]
  );

  if (loading) return <div className="text-center mt-5">{t("table.loading")}</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  const exportPdf = () => {
    const headers = columns.filter(col => col.id !== "actions").map(col => col.header);
    const data = filteredRows.map(row =>
      row.getVisibleCells().filter(cell => cell.column.id !== "actions").map(cell => {
        let value = cell.row.original;
        const accessor = cell.column.accessorKey || cell.column.id;
        if (typeof accessor === 'string' && accessor.includes('.')) {
          accessor.split('.').forEach(key => { if (value) value = value[key]; });
          return value ?? '';
        }
        return cell.row.original[accessor] ?? '';
      })
    );
    generatePdf(t("table.reportTitle"), headers, data);
  };

  const exportExcel = () => {
    const headers = columns.filter(col => col.id !== "actions").map(col => col.header);
    const data = filteredRows.map(row =>
      row.getVisibleCells().filter(cell => cell.column.id !== "actions").map(cell => {
        let value = cell.row.original;
        const accessor = cell.column.accessorKey || cell.column.id;
        if (typeof accessor === 'string' && accessor.includes('.')) {
          accessor.split('.').forEach(key => { if (value) value = value[key]; });
          return value ?? '';
        }
        return cell.row.original[accessor] ?? '';
      })
    );
    exportToExcel(t("table.reportTitle"), headers, data);
  };

  const cardClass = `card mb-2 p-3 ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`;

  return (
    <div className="container">
      <div className='card mb-2 p-3' style={{backgroundColor: darkMode ? "#3d3d3dff" : "#ffff",color: darkMode ? "#e6eef8" : "#212529"}}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center" >
          <h4 className="mb-2 mb-md-0">{t("supplier.suplist")}</h4>
          <div className="d-flex flex-wrap gap-2">
            <button className="btn btn-success" onClick={exportExcel}><FaFileExcel /> {t("table.excel")}</button>
            <button className="btn btn-danger" onClick={exportPdf}><FaRegFilePdf /> {t("table.pdf")}</button>
            <button className="btn btn-primary" onClick={() => navigate("/supplier/supplieradd")}><FaPlus /></button>
          </div>
        </div>
      </div>
      
      <Table 
        data={users} 
        columns={columns} 
        totalRecords={users.length} 
        onFilteredRowsChange={setFilteredRows} 
        collapsed = {collapsed}
      />
    </div>
  );
};

export default ApiTable;