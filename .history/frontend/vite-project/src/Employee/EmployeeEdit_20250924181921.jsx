import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import { FaSave, FaTimes, FaBackward } from "react-icons/fa";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const EmployeeEdit = () => {
    const { index } = useParams(); // get index from URL
    const navigate = useNavigate();

    const [formData, setFormData] = useState(null);
    const [errors, setErrors] = useState({});
  const { t } = useTranslation();
    // Load employee by index
    useEffect(() => {
        const employees = JSON.parse(localStorage.getItem("employeeData")) || [];
        const employee = employees[index];
        if (employee) {
            setFormData(employee);
        } else {
            toast.error("Employee not found!");
            navigate("/employee");
        }
    }, [index, navigate]);

    const validate = () => {
        const newErrors = {};
        // User Type & Zone
        if (!formData.userType) newErrors.userType = t("employee.userTypeRequired");
        if (!formData.zone) newErrors.zone = t("employee.zoneRequired");

        // Employee ID
        if (!formData.employeeId) {
        newErrors.employeeId = t("employee.employeeIdRequired");
        } else if (!/^[A-Za-z0-9]+$/.test(formData.employeeId)) {
        newErrors.employeeId = t("employee.employeeIdInvalid");
        }

        // First Name
        if (!formData.firstName) {
        newErrors.firstName = t("employee.firstNameRequired");
        } else if (!/^[A-Za-z]+$/.test(formData.firstName)) {
        newErrors.firstName = t("employee.firstNameInvalid");
        }

        // Last Name
        if (!formData.lastName) {
        newErrors.lastName = t("employee.lastNameRequired");
        } else if (!/^[A-Za-z]+$/.test(formData.lastName)) {
        newErrors.lastName = t("employee.lastNameInvalid");
        }

        // Mobile
        if (!formData.mobile) {
        newErrors.mobile = t("employee.mobileRequired");
        } else {
        const digitsOnly = formData.mobile.replace(/\D/g, "");
        if (digitsOnly.length < 6 || digitsOnly.length > 15) { 
            newErrors.mobile = t("employee.mobileInvalid");
        }
        }

        // Email
        if (!formData.email) {
        newErrors.email = t("employee.emailRequired");
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = t("employee.emailInvalid");
        }

        // Password
        if (!formData.password) {
        newErrors.password = t("employee.passwordRequired");
        } else if (
        !/(?=.*[a-z])/.test(formData.password) ||
        !/(?=.*[A-Z])/.test(formData.password) ||
        !/(?=.*\d)/.test(formData.password) || 
        !/(?=.*[@$!%*?&])/ .test(formData.password) ||
        formData.password.length < 6
        ) {
        newErrors.password = t("employee.passwordInvalid");
        }

        // Designation
if (!formData.designation) {
  newErrors.designation = t("employee.designationRequired");
} else if (!/^[A-Za-z][A-Za-z\s]*$/.test(formData.designation.trim())) {
  newErrors.designation = t("employee.designationInvalid");
}

        return newErrors;
    };

    const userTypeOptions = [
        { value: "Manager", label: "Manager" },
        { value: "HR", label: "HR" },
        { value: "Employee", label: "Employee" },
    ];

    const zoneOptions = [
        { value: "Central", label: "Central" },
        { value: "East", label: "East" },
        { value: "West", label: "West" },
        { value: "North", label: "North" },
        { value: "South", label: "South" },
    ];

    const handleUpdate = () => {
        const validationErrors = validate();
        console.log(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        const employees = JSON.parse(localStorage.getItem("employeeData")) || [];
        employees[index] = formData; // update the record
        localStorage.setItem("employeeData", JSON.stringify(employees));

        toast.success("Employee updated successfully!");
        navigate("/employee");
    };

    const handleCancel = () => navigate("/employee");

    if (!formData) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="container mt-3">
            <div className="card mb-4">
                <div className="card-body d-flex justify-content-between align-items-center">
                    <h4 className="card-title mb-0" style={{ color: "#2d4059" }}>
                        {t("employee.editemployeetitle")}
                    </h4>
                    <Link to="/employee" className="btn btn-primary">
                        <FaBackward className="me-1" /> Back
                    </Link>
                </div>
            </div>

            <div className="card shadow-sm p-4">
                {/* Row 1 */}
                <div className="row mb-3">
                    <div className="col-md-4">
                        <label className="form-label">{t("employee.usertype")}</label>
                        <Select
                            options={userTypeOptions}
                            value={userTypeOptions.find((opt) => opt.value === formData.userType) || null}
                            onChange={(selected) =>
                                setFormData({ ...formData, userType: selected ? selected.value : "" })
                            }
                        />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">{t("employee.zone")}</label>
                        <Select
                            options={zoneOptions}
                            value={zoneOptions.find((opt) => opt.value === formData.zone) || null}
                            onChange={(selected) =>
                                setFormData({ ...formData, zone: selected ? selected.value : "" })
                            }
                        />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">{t("employee.id")}</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.employeeId}
                            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                        />
                        {errors.employeeId && <small className="text-danger">{errors.employeeId}</small>}
                    </div>
                </div>

                {/* Row 2 */}
                <div className="row mb-3">
                    <div className="col-md-4">
                        <label className="form-label">{t("employee.firstname")}</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                        {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">{t("employee.lastname")}</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                        {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">{t("employee.mobile")}</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.mobile}
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        />
                        {errors.mobile && <small className="text-danger">{errors.mobile}</small>}
                    </div>
                </div>

                {/* Row 3 */}
                <div className="row mb-3">
                    <div className="col-md-4">
                        <label className="form-label">{t("employee.email")}</label>
                        <input
                            type="email"
                            className="form-control"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {errors.email && <small className="text-danger">{errors.email}</small>}
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">{t("employee.password")}</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        {errors.password && <small className="text-danger">{errors.password}</small>}
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">{t("employee.designation")}</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.designation}
                            onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        />
                        {errors.designation && <small className="text-danger">{errors.designation}</small>}
                    </div>
                </div>

                {/* Buttons */}
                <div className="d-flex gap-2 mt-3">
                    <button className="btn btn-success" onClick={handleUpdate}>
                        <FaSave className="me-1" /> {t("employee.update")}
                    </button>
                    <button className="btn btn-secondary" onClick={handleCancel}>
                        <FaTimes className="me-1" /> {t("employee.cancel")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeEdit;
