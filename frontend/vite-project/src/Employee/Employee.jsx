import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
} from "react-icons/fa";

// A debounced input component to prevent excessive re-renders during filtering.
const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

const ApiTable = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10, // Initial page size
  });

  // New state to manage which filter input is active
  const [activeFilter, setActiveFilter] = useState(null);

  // State to manage the input field value for items per page
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch user data from the API on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch data from the API.");
        console.error("API Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Navigation function for the View button
  const handleView = (id) => {
    navigate(`/employee/employeeview/${id}`);
  };

  // Define table columns using useMemo for performance
  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "ID",
        cell: (info) => info.getValue(),
        enableColumnFilter: false, // No filtering for the ID column
      }),
      columnHelper.accessor("name", {
        header: "Employee Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("username", {
        header: "User Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("address.city", {
        header: "City",
        id: "city", // Important for nested object access
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("company.name", {
        header: "Company",
        id: "company", // Important for nested object access
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("website", {
        header: "Website",
        cell: (info) => info.getValue(),
      }),
      columnHelper.display({
        id: "actions",
        header: "Action",
        cell: (props) => (
          <div className="d-flex justify-content-start">
            <button
              className="btn btn-link p-0 me-2 text-decoration-none"
              onClick={() => handleView(props.row.original.id)}
            >
              <FaRegEye style={{ color: "#65a3d9" }} />
            </button>
            <button
              className="btn btn-link p-0 me-2 text-decoration-none"
              onClick={() =>
                console.log("Edit user with ID:", props.row.original.id)
              }
            >
              <FaPencilAlt style={{ color: "#4d88e0" }} />
            </button>
            <button
              className="btn btn-link p-0 text-decoration-none"
              onClick={() =>
                console.log("Delete user with ID:", props.row.original.id)
              }
            >
              <FaTrashAlt style={{ color: "#de6b62" }} />
            </button>
          </div>
        ),
        enableSorting: false, // No sorting for the action column
        enableColumnFilter: false, // No filtering for the action column
      }),
    ],
    [columnHelper, handleView]
  );

  // Initialize react-table hook with all the necessary models
  const table = useReactTable({
    data: users,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (loading) {
    return (
      <div className="text-center mt-5">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <p>{error}</p>
      </div>
    );
  }

  // New: Handle page size changes from input field and buttons
  const handleItemsPerPageChange = (e) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value > 0) {
      setItemsPerPage(value);
      table.setPageSize(value);
    } else {
      setItemsPerPage(e.target.value);
    }
  };



  // Get current pagination details for display
  const totalRecords = table.getFilteredRowModel().rows.length;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  return (
    <div className="container">
      {/* Header and Add Button */}
      <div className="card mb-2 p-3">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
          <h4 className="mb-2 mb-md-0">Employee List</h4>
          <div className="d-flex flex-wrap gap-2">
            <button className="btn btn-primary">
              {" "}
              <FaPlus />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card p-4 table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead className="text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ backgroundColor: "#2d4059", color: "white" }}
                  >
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center justify-content-between">
                        {/* Header Label */}
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <div className="d-flex align-items-center">
                          {/* Sorting Icons */}
                          {header.column.getCanSort() && (
                            <button
                              className="btn btn-link text-white p-0"
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
                          {/* Filter Icon */}
                          {header.column.getCanFilter() && (
                            <button
                              className="btn btn-link text-white p-0 ms-2"
                              onClick={() =>
                                setActiveFilter(
                                  activeFilter === header.id ? null : header.id
                                )
                              }
                            >
                              <FaFilter />
                            </button>
                          )}
                        </div>
                      </div>
                      {/* Conditional Filter Input */}
                      {header.column.getCanFilter() &&
                        activeFilter === header.id && (
                          <div className="mt-1">
                            <DebouncedInput
                              type="text"
                              value={header.column.getFilterValue() ?? ""}
                              onChange={(value) =>
                                header.column.setFilterValue(value)
                              }
                              className="form-control form-control-sm"
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
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination and Items per page */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-3 gap-2">
          <div className="d-flex align-items-center gap-2">
            <label className="form-label mb-0">Items per page</label>
            <input
              type="number"
              className="form-control form-control-sm"
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
            <ul className="pagination mb-0 flex-wrap">
              <li
                className={`page-item ${
                  !table.getCanPreviousPage() ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => table.previousPage()}
                >
                  &lt;
                </button>
              </li>

              {/* Dynamically render page numbers */}
              {[...Array(pageCount)].map((_, i) =>
                Math.abs(pageIndex - i) <= 1 ||
                i === 0 ||
                i === pageCount - 1 ? (
                  <li
                    key={i}
                    className={`page-item ${i === pageIndex ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => table.setPageIndex(i)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ) : (
                  Math.abs(pageIndex - i) === 2 && (
                    <li key={i} className="page-item disabled">
                      <span className="page-link">...</span>
                    </li>
                  )
                )
              )}

              <li
                className={`page-item ${
                  !table.getCanNextPage() ? "disabled" : ""
                }`}
              >
                <button className="page-link" onClick={() => table.nextPage()}>
                  &gt;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ApiTable;
