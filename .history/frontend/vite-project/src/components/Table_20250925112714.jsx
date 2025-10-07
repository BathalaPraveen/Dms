import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FaSort, FaSortUp, FaSortDown, FaFilter } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

// Reusable input for filtering
const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initialValue);
  useEffect(() => setValue(initialValue), [initialValue]);
  useEffect(() => {
    const timeout = setTimeout(() => onChange(value), debounce);
    return () => clearTimeout(timeout);
  }, [value]);
  return <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
};

const Table = ({ data, columns, totalRecords, onPaginationChange, onFilteredRowsChange, collapsed }) => {
  const { darkMode } = useTheme();
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [activeFilter, setActiveFilter] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [expandedCells, setExpandedCells] = useState({}); // Track which mobile rows are expanded

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, pagination },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: (updater) => {
      setPagination(updater);
      if (onPaginationChange) onPaginationChange(updater);
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Lift filtered rows to parent
  useEffect(() => {
    if (onFilteredRowsChange) {
      onFilteredRowsChange(table.getRowModel().rows);
    }
  }, [table.getRowModel().rows, onFilteredRowsChange]);

  const handleItemsPerPageChange = (e) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value > 0) {
      setItemsPerPage(value);
      table.setPageSize(value);
    } else setItemsPerPage(e.target.value);
  };

  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  const tableClass = `table ${darkMode ? "table-dark" : "table-striped table-hover"} table-bordered`;

  return (
    <div
      className="card p-2 p-md-4"
      style={{
        backgroundColor: darkMode ? "#3d3d3dff" : "#ffff",
        color: darkMode ? "#e6eef8" : "#212529",
        width: "100%",
        margin: "0 auto",
        transition: "width 0.3s ease",
      }}
    >
      {/* Desktop Table */}
      <div className="table-responsive d-none d-md-block">
        <table className={tableClass}>
          <thead className={darkMode ? "text-white" : ""}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      backgroundColor: darkMode ? "#495057" : "#2d4059",
                      color: "white",
                      borderColor: darkMode ? "#6c757d" : "#dee2e6",
                    }}
                  >
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center justify-content-between">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <div className="d-flex align-items-center">
                          {header.column.getCanSort() && (
                            <button
                              className="btn btn-link p-0 text-white"
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {header.column.getIsSorted() === "asc" ? (
                                <FaSortUp />
                              ) : header.column.getIsSorted() === "desc" ? (
                                <FaSortDown />
                              ) : (
                                <FaSort />
                              )}
                            </button>
                          )}
                          {header.column.getCanFilter() && (
                            <button
                              className="btn btn-link ms-2 text-white"
                              onClick={() =>
                                setActiveFilter(activeFilter === header.id ? null : header.id)
                              }
                            >
                              <FaFilter />
                            </button>
                          )}
                        </div>
                      </div>
                      {header.column.getCanFilter() && activeFilter === header.id && (
                        <div className="mt-1">
                          <DebouncedInput
                            type="text"
                            value={header.column.getFilterValue() ?? ""}
                            onChange={header.column.setFilterValue}
                            className={`form-control form-control-sm ${
                              darkMode ? "bg-secondary text-white border-secondary" : ""
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      style={{
                        maxWidth: 160,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Table */}
      <div className="d-block d-md-none">
        {table.getRowModel().rows.map((row, rowIndex) => {
          const key = row.id;
          const isExpanded = expandedCells[key];

          return (
            <div
              key={rowIndex}
              className={`card mb-2 p-2 ${
                darkMode ? "bg-dark text-white" : "bg-light text-dark"
              }`}
            >
              {row.getVisibleCells().map((cell, cellIndex) => (
                <div key={cellIndex} className="mb-1">
                  <div className="d-flex justify-content-between align-items-center p-2">
                    <strong
                      className="text-truncate"
                      style={{ maxWidth: "calc(100% - 35px)", display: "block" }}
                    >
                      {flexRender(cell.column.columnDef.header, cell.getContext())}
                    </strong>
                    <button
                      className={`btn btn-sm ms-2 flex-shrink-0 ${
                        darkMode ? "btn-light text-dark" : "btn-dark text-white"
                      }`}
                      onClick={() =>
                        setExpandedCells((prev) => ({ ...prev, [key]: !prev[key] }))
                      }
                    >
                      {isExpanded ? "-" : "+"}
                    </button>
                  </div>
                  {isExpanded && (
                    <div className="ps-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div
        className={`d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-3 gap-2 ${
          darkMode ? "text-white" : ""
        }`}
      >
        <div className="d-flex align-items-center gap-2">
          <label className="form-label mb-0">Items per page</label>
          <input
            type="number"
            className={`form-control form-control-sm ${
              darkMode ? "bg-secondary text-white border-secondary" : ""
            }`}
            style={{ width: "100px" }}
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            min="1"
          />
        </div>
        <span>
          {pageIndex + 1} of {pageCount} pages ({totalRecords} items)
        </span>
        <nav aria-label="Table Pagination">
          <ul className={`pagination mb-0 flex-wrap ${darkMode ? "pagination-dark" : ""}`}>
            <li className={`page-item ${!table.getCanPreviousPage() ? "disabled" : ""}`}>
              <button
                className={`page-link ${darkMode ? "bg-dark text-white border-secondary" : ""}`}
                onClick={() => table.previousPage()}
              >
                &lt;
              </button>
            </li>
            {[...Array(pageCount)].map((_, i) =>
              Math.abs(pageIndex - i) <= 1 || i === 0 || i === pageCount - 1 ? (
                <li key={i} className={`page-item ${i === pageIndex ? "active" : ""}`}>
                  <button
                    className={`page-link ${darkMode ? "bg-dark text-white border-secondary" : ""}`}
                    onClick={() => table.setPageIndex(i)}
                  >
                    {i + 1}
                  </button>
                </li>
              ) : Math.abs(pageIndex - i) === 2 ? (
                <li key={i} className="page-item disabled">
                  <span
                    className={`page-link ${darkMode ? "bg-dark text-white border-secondary" : ""}`}
                  >
                    ...
                  </span>
                </li>
              ) : null
            )}
            <li className={`page-item ${!table.getCanNextPage() ? "disabled" : ""}`}>
              <button
                className={`page-link ${darkMode ? "bg-dark text-white border-secondary" : ""}`}
                onClick={() => table.nextPage()}
              >
                &gt;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Table;
