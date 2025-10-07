// src/Employee/EmployeeView.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  FaBackward,
} from "react-icons/fa";
const EmployeeView = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
                setEmployee(response.data);
            } catch (err) {
                setError('Failed to fetch employee data.');
                console.error('API Fetch Error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployee();
    }, [id]);

    if (loading) {
        return <div className="text-center mt-5"><p>Loading...</p></div>;
    }

    if (error) {
        return <div className="text-center mt-5 text-danger"><p>{error}</p></div>;
    }

    if (!employee) {
        return <div className="text-center mt-5"><p>Employee not found.</p></div>;
    }

    return (
        <<h4 className="card-title text-center " style={{ color: "#2d4059" }}>Employee Details</h4>
    );
};

export default EmployeeView;