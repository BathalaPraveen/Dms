import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { generatePdf } from "../exports/PdfTemplate";
import exportToExcel from "../exports/ExportExcel";
import { useTranslation } from "react-i18next";

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaPlus,
  FaRegEye,
  FaPencilAlt,
  FaTrashAlt,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaFilter,
  FaRegFilePdf,
  FaFileExcel,
} from "react-icons/fa";

const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initialValue);
  useEffect(() => setValue(initialValue), [initialValue]);
  useEffect(() => {
    const timeout = setTimeout(() => onChange(value), debounce);
    return () => clearTimeout(timeout);
  }, [value]);
  return <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
};

const ApiTable = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // <-- translation hook
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [activeFilter, setActiveFilter] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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

  const table = useReactTable({
    data: users,
    columns,
    state: { sorting, columnFilters, pagination },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (loading) return <div className="text-center mt-5">{t("table.loading")}</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  const handleItemsPerPageChange = (e) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value > 0) {
      setItemsPerPage(value);
      table.setPageSize(value);
    } else setItemsPerPage(e.target.value);
  };

  const exportPdf = () => {
    const filteredRows = table.getFilteredRowModel().rows;
    const headers = table.getVisibleLeafColumns().filter(col => col.id !== "actions").map(col => col.columnDef.header);
    const data = filteredRows.map(row =>
      table.getVisibleLeafColumns()
        .filter(col => col.id !== "actions")
        .map(col => {
          const accessor = col.accessorKey || col.id;
          let value = row.original;
          if (typeof accessor === 'string' && accessor.includes('.')) {
            accessor.split('.').forEach(key => { if (value) value = value[key]; });
            return value ?? '';
          }
          return row.original[accessor] ?? '';
        })
    );
    generatePdf(t("table.reportTitle"), headers, data);
  };

  const exportExcel = () => {
    const filteredRows = table.getFilteredRowModel().rows;
    const headers = table.getVisibleLeafColumns().filter(col => col.id !== "actions").map(col => col.columnDef.header);
    const data = filteredRows.map(row =>
      table.getVisibleLeafColumns()
        .filter(col => col.id !== "actions")
        .map(col => {
          const accessor = col.accessorKey || col.id;
          let value = row.original;
          if (typeof accessor === "string" && accessor.includes(".")) {
            accessor.split(".").forEach(key => { if (value) value = value[key]; });
            return value ?? "";
          }
          return row.original[accessor] ?? "";
        })
    );
    exportToExcel(t("table.reportTitle"), headers, data);
  };

  const totalRecords = table.getFilteredRowModel().rows.length;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  return (
    <div className="container">
      <div className="card mb-2 p-3">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
          <h4 className="mb-2 mb-md-0">{t("table.employeeList")}</h4>
          <div className="d-flex flex-wrap gap-2">
            <button className="btn btn-success" onClick={exportExcel}><FaFileExcel /> {t("table.excel")}</button>
            <button className="btn btn-danger" onClick={exportPdf}><FaRegFilePdf /> {t("table.pdf")}</button>
            <button className="btn btn-primary"><FaPlus /></button>
          </div>
        </div>
      </div>

      <div className="card p-4 table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead className="text-white">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} style={{ backgroundColor: "#2d4059", color: "white" }}>
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center justify-content-between">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <div className="d-flex align-items-center">
                          {header.column.getCanSort() && (
                            <button className="btn btn-link text-white p-0" onClick={header.column.getToggleSortingHandler()}>
                              {header.column.getIsSorted() === "asc" ? <FaSortUp /> : header.column.getIsSorted() === "desc" ? <FaSortDown /> : <FaSort />}
                            </button>
                          )}
                          {header.column.getCanFilter() && (
                            <button className="btn btn-link text-white p-0 ms-2" onClick={() => setActiveFilter(activeFilter === header.id ? null : header.id)}>
                              <FaFilter />
                            </button>
                          )}
                        </div>
                      </div>
                      {header.column.getCanFilter() && activeFilter === header.id && (
                        <div className="mt-1">
                          <DebouncedInput type="text" value={header.column.getFilterValue() ?? ""} onChange={header.column.setFilterValue} className="form-control form-control-sm" />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            )) : (
              <tr>
                <td colSpan={columns.length} className="text-center">{t("table.noData")}</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-3 gap-2">
          <div className="d-flex align-items-center gap-2">
            <label className="form-label mb-0">{t("table.itemsPerPage")}</label>
            <input type="number" className="form-control form-control-sm" style={{ width: "100px" }} value={itemsPerPage} onChange={handleItemsPerPageChange} min="1" />
          </div>
          <span>{pageIndex + 1} {t("table.of")} {pageCount} {t("table.pages")} ({totalRecords} {t("table.items")})</span>
          <nav aria-label="Table Pagination">
            <ul className="pagination mb-0 flex-wrap">
              <li className={`page-item ${!table.getCanPreviousPage() ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => table.previousPage()}>&lt;</button>
              </li>
              {[...Array(pageCount)].map((_, i) =>
                Math.abs(pageIndex - i) <= 1 || i === 0 || i === pageCount - 1 ? (
                  <li key={i} className={`page-item ${i === pageIndex ? "active" : ""}`}>
                    <button className="page-link" onClick={() => table.setPageIndex(i)}>{i + 1}</button>
                  </li>
                ) : Math.abs(pageIndex - i) === 2 && <li key={i} className="page-item disabled"><span className="page-link">...</span></li>
              )}
              <li className={`page-item ${!table.getCanNextPage() ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => table.nextPage()}>&gt;</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ApiTable;
