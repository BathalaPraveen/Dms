import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";

import {
    FaBackward,
} from "react-icons/fa";
const SupplierView = () => {
    const { index } = useParams();
    const [supplier, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const { darkMode } = useTheme();

    useEffect(() => {
        try {
            const suppliers = JSON.parse(localStorage.getItem("supplierData")) || [];
            const idx = parseInt(index, 10);
            const selectedSupplier = suppliers[idx];  // get employee by index
            if (selectedSupplier) {
                setEmployee(selectedSupplier);
            } else {
                setError("Supplier Data not found.");
            }
        } catch (err) {
            setError("Failed to fetch Supplier data.");
            console.error("LocalStorage Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    }, [index]);


    if (loading) {
        return <div className="text-center mt-5"><p>{t("loading")}</p></div>;
    }

    if (error) {
        return <div className="text-center mt-5 text-danger"><p>{error}</p></div>;
    }

    if (!supplier) {
        return <div className="text-center mt-5"><p>{t("supplier.notFound")}</p></div>;
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-sm p-4 " style={{ backgroundColor: darkMode ? "#3d3d3dff" : "#ffff", color: darkMode ? "#e6eef8" : "#212529" }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="card-title text-center " >{t("supplier.supdetails")}</h4>
                    <div className="text-center">
                        <Link to="/supplier" className="btn btn-primary"><FaBackward /> {t("common.back")}</Link>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className={`table table-bordered table-striped ${darkMode ? "table-dark" : ""}`}>
                        <tbody >
                            <tr>
                                <th style={{ width: "200px" }}>{t("supplier.supname")}</th>
                                <td>{supplier.supplierName}</td>
                                <th style={{ width: "200px" }}>{t("supplier.supid")}</th>
                                <td>{supplier.supplierId}</td>
                            </tr>
                            <tr>
                                <th>{t("supplier.contperson")}</th>
                                <td>{supplier.contactPerson}</td>
                                <th>{t("supplier.emailid")}</th>
                                <td>{supplier.email}</td>
                            </tr>
                            <tr>
                                <th>{t("supplier.mobile")}</th>
                                <td>{supplier.mobile}</td>
                                <th>{t("supplier.state")}</th>
                                <td >{supplier.state}</td>
                            </tr>
                            <tr>
                                <th>{t("supplier.district")}</th>
                                <td >{supplier.district}</td>
                                <th>{t("supplier.telephone")}</th>
                                <td>{supplier.telephone}</td>
                            </tr>
                            <tr>
                                <th>{t("supplier.address")}</th>
                                <td colSpan={4}>{supplier.address}</td>
                               
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SupplierView;