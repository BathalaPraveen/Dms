// src/Employee/EmployeeView.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className="container mt-5">
            <div className="card shadow-sm p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="card-title text-center " style={{ color: "#2d4059" }}>Employee Details</h4>
                    <div className="text-center">
                    <Link to="/employee" className="btn btn-primary">Back</Link>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                    <tbody>
                    <tr>
                        <th style={{ width: "200px" }}>Employee Name</th>
                        <td>{employee.name}</td>
                        <th>Username</th>
                        <td>{employee.username}</td>
                    </tr>
                    
                    <tr>
                        <th>Email</th>
                        <td>{employee.email}</td>
                        <th>Phone</th>
                        <td>{employee.phone}</td>
                    </tr>
                   
                    <tr>
                        <th>Website</th>
                        <td colSpan={4}>{employee.website}</td>
                    </tr>

                
                   
                    <tr>
                        <th>Zip Code</th>
                        <td colSpan={4}>{employee.address.zipcode}</td>
                    </tr>

                 
                    </tbody>
                </table>
                    
                </div>
           
            
            </div>
        </div>
    );
};

export default EmployeeView;