import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { generatePdf } from "../exports/PdfTemplate";
import exportToExcel from "../exports/ExportExcel";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import { createColumnHelper } from "@tanstack/react-table";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlus, FaRegEye, FaPencilAlt, FaTrashAlt, FaRegFilePdf, FaFileExcel } from "react-icons/fa";
import Table from "../components/Table";

const ApiTable = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]); // New state to hold filtered rows
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(response.data);
      } catch (err) {
        setError(t("table.fetchError"));
        console.error("API Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [t]);

  // useEffect(() => {
  //   setLoading(true); // show loading while fetching
  //   try {
  //     // Get data from localStorage
  //     const storedUsers = localStorage.getItem("employeeData"); // your key
  //     if (storedUsers) {
  //       setUsers(JSON.parse(storedUsers)); // parse JSON string to array
  //     } else {
  //       setUsers([]); // if nothing in localStorage
  //     }
  //   } catch (err) {
  //     setError("Failed to load data from localStorage");
  //     console.error("LocalStorage Error:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  const handleView = (id) => navigate(`/employee/employeeview/${id}`);

  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.accessor("id", { header: t("table.id"), cell: (info) => info.getValue(), enableColumnFilter: false }),
      columnHelper.accessor("name", { header: t("table.employeeName"), cell: (info) => info.getValue() }),
      columnHelper.accessor("username", { header: t("table.userName"), cell: (info) => info.getValue() }),
      columnHelper.accessor("email", { header: t("table.email"), cell: (info) => info.getValue() }),
      columnHelper.accessor("address.city", { header: t("table.city"), id: "city", cell: (info) => info.getValue() }),
      columnHelper.accessor("company.name", { header: t("table.company"), id: "company", cell: (info) => info.getValue() }),
      columnHelper.accessor("website", { header: t("table.website"), cell: (info) => info.getValue() }),
      columnHelper.display({
        id: "actions",
        header: t("table.actions"),
        cell: (props) => (
          <div className="d-flex justify-content-start">
            <button className="btn btn-link p-0 me-2 text-decoration-none" onClick={() => handleView(props.row.original.id)}>
              <FaRegEye style={{ color: "#65a3d9" }} />
            </button>
            <button className="btn btn-link p-0 me-2 text-decoration-none" onClick={() => console.log("Edit", props.row.original.id)}>
              <FaPencilAlt style={{ color: "#4d88e0" }} />
            </button>
            <button className="btn btn-link p-0 text-decoration-none" onClick={() => console.log("Delete", props.row.original.id)}>
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
    // PDF export logic now uses the filteredRows state
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
    // Excel export logic now uses the filteredRows state
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
      <div className={cardClass}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center ${darkMode ? "bg-dark text-white" : "bg-light text-dark"">
          <h4 className="mb-2 mb-md-0">{t("table.employeeList")}</h4>
          <div className="d-flex flex-wrap gap-2">
            <button className="btn btn-success" onClick={exportExcel}><FaFileExcel /> {t("table.excel")}</button>
            <button className="btn btn-danger" onClick={exportPdf}><FaRegFilePdf /> {t("table.pdf")}</button>
            <button className="btn btn-primary" onClick={() => navigate("/employee/employeeadd")}><FaPlus /></button>
          </div>
        </div>
      </div>
      
      <Table 
        data={users} 
        columns={columns} 
        totalRecords={users.length} 
        onFilteredRowsChange={setFilteredRows} // Pass the callback to update state
      />
    </div>
  );
};

export default ApiTable;