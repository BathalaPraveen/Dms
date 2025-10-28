import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import { format } from "date-fns";
import {
    FaBackward,
} from "react-icons/fa";
const HolidayView = () => {
    const { index } = useParams();
    const [holiday, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const { darkMode } = useTheme();
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
            const holidays = JSON.parse(localStorage.getItem("holidayData")) || [];
            const idx = parseInt(index, 10);
            const selectedEmployee = holidays[idx];  // get employee by index
            if (selectedEmployee) {
                setEmployee(selectedEmployee);
            } else {
                setError("Holiday not found.");
            }
        } catch (err) {
            setError("Failed to fetch Holiday data.");
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

    if (!holiday) {
        return <div className="text-center mt-5"><p>{t("employee.notFound")}</p></div>;
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-sm p-4 " style={{ backgroundColor: darkMode ? "#3d3d3dff" : "#ffff", color: darkMode ? "#e6eef8" : "#212529" }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="card-title text-center " >{t("holiday.holidaydetails")}</h4>
                    <div className="text-center">
                        <Link to="/holiday" className="btn btn-primary"><FaBackward /> {t("common.back")}</Link>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className={`table table-bordered table-striped ${darkMode ? "table-dark" : ""}`}>
                        <tbody >
                            <tr>
                                <th style={{ width: "200px" }}>{t("holiday.state")}</th>
                                <td>{holiday.state}</td>
                                <th style={{ width: "200px" }}>{t("common.date")}</th>
                                <td>
                                    {holiday.holidayDate
                                        ? format(new Date(holiday.holidayDate), "dd-MM-yyyy")
                                        : ""}
                                </td>
                            </tr>
                            <tr>
                                <th>{t("holiday.info")}</th>
                                <td colSpan={4}>{holiday.holidayInfo}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HolidayView;