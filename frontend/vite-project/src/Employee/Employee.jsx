import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFilter, FaPlus, FaRegEye, FaPencilAlt, FaTrashAlt } from "react-icons/fa";

const ApiTable = () => {

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFilterForm, setShowFilterForm] = useState(false);
    const [filterValues, setFilterValues] = useState({
        city: null,
        company: null,
        username: null,
        website: null,
    });

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

    useEffect(() => {
        const result = users.filter(user => {
            const matchesCity = !filterValues.city || user.address.city === filterValues.city.value;
            const matchesCompany = !filterValues.company || user.company.name === filterValues.company.value;
            const matchesUsername = !filterValues.username || user.username === filterValues.username.value;
            const matchesWebsite = !filterValues.website || user.website === filterValues.website.value;
            return matchesCity && matchesCompany && matchesUsername && matchesWebsite;
        });
        setFilteredUsers(result);
    }, [users, filterValues]);

    const uniqueFilterOptions = useMemo(() => {
        if (!users.length) return { cities: [], companies: [], usernames: [], websites: [] };

        const cities = [...new Set(users.map(user => user.address.city))].map(city => ({ value: city, label: city }));
        const companies = [...new Set(users.map(user => user.company.name))].map(company => ({ value: company, label: company }));
        const usernames = [...new Set(users.map(user => user.username))].map(username => ({ value: username, label: username }));
        const websites = [...new Set(users.map(user => user.website))].map(website => ({ value: website, label: website }));

        return { cities, companies, usernames, websites };
    }, [users]);

    const handleFilterChange = (selectedOption, { name }) => {
        setFilterValues(prev => ({ ...prev, [name]: selectedOption }));
    };

    const handleReset = () => {
        setFilterValues({
            city: null,
            company: null,
            username: null,
            website: null,
        });

    };

    const handleCloseForm = () => {
        setShowFilterForm(false);
    };




    const handleView = (id) => {
        navigate(`/employee/employeeview/${id}`);
    };



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
                        <button className="btn btn-link p-0 me-2 text-decoration-none" onClick={() => console.log("Edit user with ID:", props.row.original.id)}>
                            <FaPencilAlt style={{ color: '#4d88e0' }} />
                        </button>
                        <button className="btn btn-link p-0 text-decoration-none" onClick={() => console.log("Delete user with ID:", props.row.original.id)}>
                            <FaTrashAlt style={{ color: '#de6b62' }} />
                        </button>
                    </div>
                ),
            }),
        ],
        [columnHelper, handleView]
    );

    const table = useReactTable({
        data: filteredUsers,
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
    const totalRecords = filteredUsers.length;
    const pageIndex = table.getState().pagination.pageIndex;
    const pageSize = table.getState().pagination.pageSize;
    const startRecord = pageIndex * pageSize + 1;
    const endRecord = Math.min((pageIndex + 1) * pageSize, totalRecords);

    const getPaginationItems = () => {
        const pageCount = table.getPageCount();
        const currentPageIndex = table.getState().pagination.pageIndex;
        const pages = [];
        const visiblePageCount = 3;
        const startPage = Math.max(0, currentPageIndex - Math.floor(visiblePageCount / 2));
        const endPage = Math.min(pageCount - 1, startPage + visiblePageCount - 1);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="container">
            <div className="card mb-2 p-3">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                    <h4 className="mb-2 mb-md-0">Employee List</h4>
                    <div className="d-flex flex-wrap gap-2">
                        <button
                            className="btn btn-secondary"
                            onClick={() => setShowFilterForm(true)}
                        >
                            <FaFilter className="me-1" /> Filter
                        </button>
                        <button className="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>

            {showFilterForm && (
                <div className="card p-3 mb-3">
                    <div className="d-flex justify-content-end  align-items-center mb-3">
                        <button type="button" className="btn-close" onClick={handleCloseForm} aria-label="Close"></button>
                    </div>
                    <div className="row g-3">
                        <div className="col-md-3">
                            <label className="form-label">City</label>
                            <Select
                                name="city"
                                value={filterValues.city}
                                onChange={handleFilterChange}
                                options={uniqueFilterOptions.cities}
                                placeholder="All Cities"
                                isClearable={true}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Company</label>
                            <Select
                                name="company"
                                value={filterValues.company}
                                onChange={handleFilterChange}
                                options={uniqueFilterOptions.companies}
                                placeholder="All Companies"
                                isClearable={true}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Username</label>
                            <Select
                                name="username"
                                value={filterValues.username}
                                onChange={handleFilterChange}
                                options={uniqueFilterOptions.usernames}
                                placeholder="All Usernames"
                                isClearable={true}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Website</label>
                            <Select
                                name="website"
                                value={filterValues.website}
                                onChange={handleFilterChange}
                                options={uniqueFilterOptions.websites}
                                placeholder="All Websites"
                                isClearable={true}
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-end mt-4">
                        <button className="btn btn-secondary" onClick={handleReset}>Reset</button>
                    </div>
                </div>
            )}

            <div className="card p-4 table-responsive">
                <table className="table table-striped table-hover table-bordered">
                    <thead className="text-white">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
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

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-3 gap-2">
                    {/* Record Info */}
                    <span className="mb-2 mb-md-0">
                        Showing {startRecord} to {endRecord} of {totalRecords} records
                    </span>

                    {/* Pagination */}
                    <nav aria-label="Table Pagination">
                        <ul className="pagination mb-0 flex-wrap">
                            <li className={`page-item ${!table.getCanPreviousPage() ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => table.previousPage()}>
                                    &lt;
                                </button>
                            </li>
                            {getPaginationItems().map((page) => (
                                <li
                                    key={page}
                                    className={`page-item ${page === pageIndex ? "active" : ""}`}
                                >
                                    <button className="page-link" onClick={() => table.setPageIndex(page)}>
                                        {page + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${!table.getCanNextPage() ? "disabled" : ""}`}>
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