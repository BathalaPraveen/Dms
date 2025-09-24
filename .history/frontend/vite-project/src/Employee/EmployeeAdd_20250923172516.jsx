import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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
    if (!formData.designation) newErrors.designation = "Designation is required";

    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    const jsonStr = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "employee.json";
    a.click();
    URL.revokeObjectURL(url);

    setFormData(initialFormData);
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  return (
    <div className="container mt-3">
      <h4 className="mb-3">Add Employee</h4>
      <div className="card shadow-sm p-4">
        {/* User Type */}
        <label className="form-label">Select User Type <span className="text-danger">*</span></label>
        <select
          className={`form-select mb-2 ${errors.userType ? "is-invalid" : ""}`}
          value={formData.userType}
          onChange={e => setFormData({ ...formData, userType: e.target.value })}
        >
          <option value="">Select Type</option>
          <option value="Manager">Manager</option>
          <option value="HR">HR</option>
          <option value="Employee">Employee</option>
        </select>
        {errors.userType && <div className="invalid-feedback">{errors.userType}</div>}

        {/* Zone */}
        <label className="form-label">Zone <span className="text-danger">*</span></label>
        <select
          className={`form-select mb-2 ${errors.zone ? "is-invalid" : ""}`}
          value={formData.zone}
          onChange={e => setFormData({ ...formData, zone: e.target.value })}
        >
          <option value="">Select Zone</option>
          <option value="Central">Central</option>
          <option value="East">East</option>
          <option value="West">West</option>
          <option value="North">North</option>
          <option value="South">South</option>
        </select>
        {errors.zone && <div className="invalid-feedback">{errors.zone}</div>}

        {/* Employee ID */}
        <label className="form-label">Employee ID <span className="text-danger">*</span></label>
        <input
          type="text"
          className={`form-control mb-2 ${errors.employeeId ? "is-invalid" : ""}`}
          value={formData.employeeId}
          onChange={e => setFormData({ ...formData, employeeId: e.target.value })}
        />
        {errors.employeeId && <div className="invalid-feedback">{errors.employeeId}</div>}

        {/* First Name */}
        <label className="form-label">First Name <span className="text-danger">*</span></label>
        <input
          type="text"
          className={`form-control mb-2 ${errors.firstName ? "is-invalid" : ""}`}
          value={formData.firstName}
          onChange={e => setFormData({ ...formData, firstName: e.target.value })}
        />
        {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}

        {/* Last Name */}
        <label className="form-label">Last Name <span className="text-danger">*</span></label>
        <input
          type="text"
          className={`form-control mb-2 ${errors.lastName ? "is-invalid" : ""}`}
          value={formData.lastName}
          onChange={e => setFormData({ ...formData, lastName: e.target.value })}
        />
        {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}

        {/* Mobile Number */}
        <label className="form-label">Mobile Number <span className="text-danger">*</span></label>
        <input
          type="text"
          className={`form-control mb-2 ${errors.mobile ? "is-invalid" : ""}`}
          value={formData.mobile}
          onChange={e => setFormData({ ...formData, mobile: e.target.value })}
        />
        {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}

        {/* Email */}
        <label className="form-label">Email <span className="text-danger">*</span></label>
        <input
          type="email"
          className={`form-control mb-2 ${errors.email ? "is-invalid" : ""}`}
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}

        {/* Password */}
        <label className="form-label">Password <span className="text-danger">*</span></label>
        <input
          type="password"
          className={`form-control mb-2 ${errors.password ? "is-invalid" : ""}`}
          value={formData.password}
          onChange={e => setFormData({ ...formData, password: e.target.value })}
        />
        {errors.password && <div className="invalid-feedback">{errors.password}</div>}

        {/* Designation */}
        <label className="form-label">Designation <span className="text-danger">*</span></label>
        <input
          type="text"
          className={`form-control mb-3 ${errors.designation ? "is-invalid" : ""}`}
          value={formData.designation}
          onChange={e => setFormData({ ...formData, designation: e.target.value })}
        />
        {errors.designation && <div className="invalid-feedback">{errors.designation}</div>}

        {/* Buttons */}
        <div className="d-flex gap-2">
          <button className="btn btn-success" onClick={handleSave}>Save</button>
          <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAdd;
