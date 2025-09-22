import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table";
import "bootstrap/dist/css/bootstrap.min.css";
// You may need to install react-icons: npm install react-icons
import { FaFilter, FaPlus, FaRegEye, FaPencilAlt, FaTrashAlt } from "react-icons/fa";

const ApiTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/users");
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

    const columnHelper = createColumnHelper();
    const columns = useMemo(
        () => [
            columnHelper.accessor("id", {
                header: "ID",
                cell: (info) => info.getValue(),
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
            columnHelper.display({
                id: "actions",
                header: "Action",
                cell: (props) => (
                    <div className="d-flex justify-content-start">
                        <button className="btn btn-link p-0 me-2 text-decoration-none" onClick={() => handleView(props.row.original.id)}>
                            <FaRegEye style={{ color: '#65a3d9' }} />
                        </button>
                        <button className="btn btn-link p-0 me-2 text-decoration-none" onClick={() => handleEdit(props.row.original.id)}>
                            <FaPencilAlt style={{ color: '#4d88e0' }} />
                        </button>
                        <button className="btn btn-link p-0 text-decoration-none" onClick={() => handleDelete(props.row.original.id)}>
                            <FaTrashAlt style={{ color: '#de6b62' }} />
                        </button>
                    </div>
                ),
            }),
        ],
        [columnHelper]
    );

    const handleView = (id) => {
        console.log("View user with ID:", id);
    };
    const handleEdit = (id) => {
        console.log("Edit user with ID:", id);
    };
    const handleDelete = (id) => {
        console.log("Delete user with ID:", id);
    };

    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
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
    const totalRecords = users.length;
    const pageIndex = table.getState().pagination.pageIndex;
    const pageSize = table.getState().pagination.pageSize;
    const startRecord = pageIndex * pageSize + 1;
    const endRecord = Math.min((pageIndex + 1) * pageSize, totalRecords);

    // Function to generate pagination items
    const getPaginationItems = () => {
        const pageCount = table.getPageCount();
        const pageIndex = table.getState().pagination.pageIndex;
        const pages = []; const visiblePageCount = 3; // Number of pages to show at a time
        const startPage = Math.max(0, pageIndex - Math.floor(visiblePageCount / 2));
        const endPage = Math.min(pageCount - 1, startPage + visiblePageCount - 1);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };
    return (
        <div className="container">
            <div className="card mb-2 p-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h4>Employee List</h4>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-secondary me-2">
                            <FaFilter /> Filter
                        </button>
                        <button className="btn btn-primary">
                            Add
                        </button>
                    </div>
                </div>
            </div>

            <div className="card p-4">
                <table className="table table-striped table-hover table-bordered">
                    <thead className="text-white">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    // Apply inline style directly to each <th> element
                                    <th key={header.id} style={{ backgroundColor: "#2d4059", color: "white" }}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
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
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
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

                <div className="d-flex justify-content-between align-items-center mt-3">
                    <span>
                        Showing {startRecord} to {endRecord} of {totalRecords} records
                    </span>
                    <nav aria-label="Table Pagination">
                        <ul className="pagination justify-content-end mb-0">
                            <li className={`page-item ${!table.getCanPreviousPage() ? 'disabled' : ''}`}>
                                <a className="page-link" href="#" onClick={() => table.previousPage()}>&lt;</a>
                            </li>
                            {getPaginationItems().map((page) => (
                                <li key={page} className={`page-item ${page === pageIndex ? 'active' : ''}`}>
                                    <a className="page-link" href="#" onClick={() => table.setPageIndex(page)}>{page + 1}</a>
                                </li>
                            ))}
                            <li className={`page-item ${!table.getCanNextPage() ? 'disabled' : ''}`}>
                                <a className="page-link" href="#" onClick={() => table.nextPage()}>&gt;</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default ApiTable;