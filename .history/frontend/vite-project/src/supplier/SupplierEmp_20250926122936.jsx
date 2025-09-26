import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { generatePdf } from "../exports/PdfTemplate";
import exportToExcel from "../exports/ExportExcel";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import { createColumnHelper } from "@tanstack/react-table";
import { FaPencilAlt, FaTrashAlt, FaRegFilePdf, FaFileExcel,FaPlus } from "react-icons/fa";
import Table from "../components/Table";
import Delete from "../components/Delete";

const SupplierEmpList = ({ supplierIndex }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { darkMode } = useTheme();

  const [empList, setEmpList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    try {
      const storedSuppliers = JSON.parse(localStorage.getItem("supplierData")) || [];
      const supplier = storedSuppliers[supplierIndex];
      if (supplier && supplier.empList) {
        setEmpList(supplier.empList);
      } else {
        setEmpList([]);
      }
    } catch (err) {
      setError("Failed to load Supplier Employee data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [supplierIndex]);

  const handleEdit = (index) => navigate(`/supplier/supplieremp/edit/${supplierIndex}/${index}`);
  const handleDelete = (index) => {
    Delete({
      title: "Delete Employee",
      message: "Are you sure you want to delete this employee?",
      onConfirm: () => {
        const updatedList = [...empList];
        updatedList.splice(index, 1);
        setEmpList(updatedList);

        // Update localStorage
        const storedSuppliers = JSON.parse(localStorage.getItem("supplierData")) || [];
        storedSuppliers[supplierIndex].empList = updatedList;
        localStorage.setItem("supplierData", JSON.stringify(storedSuppliers));
      },
    });
  };

  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "sno",
        header: "S.No",
        cell: (info) => info.row.index + 1
      }),
      columnHelper.accessor("staffName", { header: "Staff Name", cell: (info) => info.getValue() }),
      columnHelper.accessor("staffId", { header: "Staff Id", cell: (info) => info.getValue() }),
      columnHelper.accessor("designation", { header: "Designation", cell: (info) => info.getValue() }),
      columnHelper.display({
        id: "actions",
        header: "Action",
        cell: (props) => (
          <div className="d-flex">
            <button
              className="btn btn-link p-0 me-2 text-decoration-none"
              onClick={() => handleEdit(props.row.index)}
            >
              <FaPencilAlt style={{ color: "#4d88e0" }} />
            </button>
            <button
              className="btn btn-link p-0 text-decoration-none"
              onClick={() => handleDelete(props.row.index)}
            >
              <FaTrashAlt style={{ color: "#de6b62" }} />
            </button>
          </div>
        ),
        enableSorting: false,
        enableColumnFilter: false,
      }),
    ],
    [columnHelper, empList]
  );

  const exportPdf = () => {
    const headers = ["S.No", "Staff Name", "Staff Id", "Designation"];
    const data = empList.map((emp, index) => [index + 1, emp.staffName, emp.staffId, emp.designation]);
    generatePdf("Supplier Employee List", headers, data);
  };

  const exportExcel = () => {
    const headers = ["S.No", "Staff Name", "Staff Id", "Designation"];
    const data = empList.map((emp, index) => [index + 1, emp.staffName, emp.staffId, emp.designation]);
    exportToExcel("Supplier Employee List", headers, data);
  };

  if (loading) return <div className="text-center mt-5">{t("table.loading")}</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <div className="container mt-3">
      <div
        className="card mb-2 p-3"
        style={{
          backgroundColor: darkMode ? "#3d3d3dff" : "#ffff",
          color: darkMode ? "#e6eef8" : "#212529",
        }}
      >
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
          <h4 className="mb-2 mb-md-0">Supplier Employee List</h4>
          <div className="d-flex flex-wrap gap-2">
            <button className="btn btn-success" onClick={exportExcel}>
              <FaFileExcel /> Excel
            </button>
            <button className="btn btn-danger" onClick={exportPdf}>
              <FaRegFilePdf /> PDF
            </button>
            <button className="btn btn-primary" onClick={() => navigate("/supplier/supplieremp/add${supplierIndex}")}><FaPlus /></button>
          </div>
        </div>
      </div>

      <Table
        data={empList}
        columns={columns}
        totalRecords={empList.length}
        onFilteredRowsChange={setFilteredRows}
      />
    </div>
  );
};

export default SupplierEmpList;
