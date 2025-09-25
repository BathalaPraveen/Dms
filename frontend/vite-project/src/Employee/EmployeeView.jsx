import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from "react-i18next";
import{useTheme} from "../contexts/ThemeContext";

import {
  FaBackward,
} from "react-icons/fa";
const EmployeeView = () => {
    const { index } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const{darkMode}=useTheme();
    // useEffect(() => {
    //     const fetchEmployee = async () => {
    //         try {
    //             const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    //             setEmployee(response.data);
    //         } catch (err) {
    //             setError('Failed to fetch employee data.');
    //             console.error('API Fetch Error:', err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchEmployee();
    // }, [id]);

    useEffect(() => {
        try {
            const employees = JSON.parse(localStorage.getItem("employeeData")) || [];
            const idx = parseInt(index, 10);
            const selectedEmployee = employees[idx];  // get employee by index
            if (selectedEmployee) {
                setEmployee(selectedEmployee);
            } else {
                setError("Employee not found.");
            }
        } catch (err) {
            setError("Failed to fetch employee data.");
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

    if (!employee) {
        return <div className="text-center mt-5"><p>{t("employee.notFound")}</p></div>;
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-sm p-4 "style={{backgroundColor: darkMode ? "#3d3d3dff" : "#ffff",color: darkMode ? "#e6eef8" : "#212529"}}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="card-title text-center " >{t("employee.empdetails")}</h4>
                    <div className="text-center">
                    <Link to="/employee" className="btn btn-primary"><FaBackward /> {t("common.back")}</Link>
                    </div>
                </div>
                <div className="table-responsive">
                        <table className={`table table-bordered table-striped ${ darkMode ? "table-dark" : "" }`}>
                        <tbody >
                        <tr>
                            <th style={{ width: "200px" }}>{t("employee.employeeName")}</th>
                            <td>{employee.firstName}</td>
                            <th style={{ width: "200px" }}>{t("employee.id")}</th>
                            <td>{employee.employeeId}</td>
                        </tr>   
                        <tr>
                            <th>{t("employee.designation")}</th>
                            <td>{employee.designation}</td>
                            <th>{t("employee.email")}</th>
                            <td>{employee.email}</td>
                        </tr>
                        <tr>
                            <th>{t("employee.mobile")}</th>
                            <td>{employee.mobile}</td>
                            <th>{t("employee.usertype")}</th>
                            <td colSpan>{employee.userType}</td>
                        </tr>
                        <tr>
                            <th>{t("employee.zone")}</th>
                            <td colSpan={4}>{employee.zone}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmployeeView;