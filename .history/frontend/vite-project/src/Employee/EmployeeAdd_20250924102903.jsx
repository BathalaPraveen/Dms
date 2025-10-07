import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import { FaSave, FaTimes } from "react-icons/fa"; // icons
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const EmployeeAdd = () => {
  const initialFormData = {
    userType: "",
    zone: "",
    employeeId: "",
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
    designation: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.userType) newErrors.userType = "User Type is required";
    if (!formData.zone) newErrors.zone = "Zone is required";
    if (!formData.employeeId) newErrors.employeeId = "Employee ID is required";
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.mobile) {
      newErrors.mobile = "Mobile Number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.designation)
      newErrors.designation = "Designation is required";

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

  const handleSave = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

      try {
        // Send employee data to backend
        const response = await axios.post("http://localhost:5000/api/employee/employeestore", formData);

        if (response.data.success) {
        toast.success("Employee added successfully!");
        setFormData(initialFormData);

        setTimeout(() => {
            navigate("/employee"); // go to employee list
        }, 1000);
        }
    } catch (error) {
        console.error(error);
        toast.error("Something went wrong!");
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  return (
    <div className="container mt-3">
      <div className="card mb-2 p-2 d-flex">
        <h4
          className="mb-0 "
          style={{ paddingLeft: "12px", fontSize: "22px", fontWeight: 630 }}
        >
          Add Employee
        </h4>
      </div>
      <div className="card shadow-sm p-4">
        {/* Row 1: User Type, Zone, Employee ID */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label
              className="form-label"
              style={{ fontSize: "15px", fontWeight: 600 }}
            >
              Select User Type <span className="text-danger">*</span>
            </label>
            <Select
              options={userTypeOptions}
              value={
                userTypeOptions.find(
                  (opt) => opt.value === formData.userType
                ) || null
              }
              onChange={(selected) =>
                setFormData({
                  ...formData,
                  userType: selected ? selected.value : "",
                })
              }
              placeholder="Select User Type"
              className={
                errors.userType
                  ? "react-select-container is-invalid"
                  : "react-select-container"
              }
              classNamePrefix="react-select"
            />
            {errors.userType && (
              <div style={{color: "#dc3545",fontSize: "0.750em",fontWeight: 600,marginTop: "4px",}}>
                {errors.userType}
              </div>
            )}
          </div>

          <div className="col-md-4">
            <label
              className="form-label"
              style={{ fontSize: "15px", fontWeight: 600 }}
            >
              Zone <span className="text-danger">*</span>
            </label>
            <Select
              options={zoneOptions}
              value={
                zoneOptions.find((opt) => opt.value === formData.zone) || null
              }
              onChange={(selected) =>
                setFormData({
                  ...formData,
                  zone: selected ? selected.value : "",
                })
              }
              placeholder="Select Zone"
              className={
                errors.zone
                  ? "react-select-container is-invalid"
                  : "react-select-container"
              }
              classNamePrefix="react-select"
            />
            {errors.zone && (
              <div style={{color: "#dc3545",fontSize: "0.750em",fontWeight: 600,marginTop: "4px",}}>
                {errors.zone}
              </div>
            )}
          </div>

          <div
            className="col-md-4"
            style={{ fontSize: "15px", fontWeight: 600 }}
          >
            <label
              className="form-label"
              style={{ fontSize: "15px", fontWeight: 600 }}
            >
              Employee ID <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.employeeId ? "is-invalid" : ""
              }`}
              value={formData.employeeId}
              onChange={(e) =>
                setFormData({ ...formData, employeeId: e.target.value })
              }
            />
            {errors.employeeId && (
              <div className="invalid-feedback" style={{color: "#dc3545",fontSize: "0.750em",fontWeight: 600,marginTop: "4px"}}>{errors.employeeId}</div>
            )}
          </div>
        </div>

        {/* Row 2: First Name, Last Name, Mobile */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label
              className="form-label"
              style={{ fontSize: "15px", fontWeight: 600 }}
            >
              First Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            {errors.firstName && (
              <div className="invalid-feedback" style={{color: "#dc3545",fontSize: "0.750em",fontWeight: 600,marginTop: "4px"}}>{errors.firstName}</div>
            )}
          </div>

          <div className="col-md-4">
            <label
              className="form-label"
              style={{ fontSize: "15px", fontWeight: 600 }}
            >
              Last Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
            {errors.lastName && (
              <div className="invalid-feedback" style={{color: "#dc3545",fontSize: "0.750em",fontWeight: 600,marginTop: "4px",}}>{errors.lastName}</div>
            )}
          </div>

          <div className="col-md-4">
            <label
              className="form-label"
              style={{ fontSize: "15px", fontWeight: 600 }}
            >
              Mobile Number <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
            />
            {errors.mobile && (
              <div className="invalid-feedback" style={{color: "#dc3545",fontSize: "0.750em",fontWeight: 600,marginTop: "4px",}}>{errors.mobile}</div>
            )}
          </div>
        </div>

        {/* Row 3: Email, Password, Designation */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label
              className="form-label"
              style={{ fontSize: "15px", fontWeight: 600 }}
            >
              Email <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <div className="invalid-feedback" style={{color: "#dc3545",fontSize: "0.750em",fontWeight: 600,marginTop: "4px",}}>{errors.email}</div>
            )}
          </div>

          <div className="col-md-4">
            <label
              className="form-label"
              style={{ fontSize: "15px", fontWeight: 600 }}
            >
              Password <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {errors.password && (
              <div className="invalid-feedback" style={{color: "#dc3545",fontSize: "0.750em",fontWeight: 600,marginTop: "4px",}}>{errors.password}</div>
            )}
          </div>

          <div className="col-md-4">
            <label
              className="form-label"
              style={{ fontSize: "15px", fontWeight: 600 }}
            >
              Designation <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.designation ? "is-invalid" : ""
              }`}
              value={formData.designation}
              onChange={(e) =>
                setFormData({ ...formData, designation: e.target.value })
              }
            />
            {errors.designation && (
              <div className="invalid-feedback" style={{color: "#dc3545",fontSize: "0.750em",fontWeight: 600,marginTop: "4px",}}>{errors.designation}</div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex gap-2 mt-3">
          <button className="btn btn-success" onClick={handleSave}>
            <FaSave className="me-1" /> Save
          </button>
          <button className="btn btn-secondary" onClick={handleCancel}>
            <FaTimes className="me-1" /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAdd;
