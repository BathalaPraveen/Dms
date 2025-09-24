import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSave, FaTimes } from "react-icons/fa"; // icons

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
        {/* Add your form inputs here */}

        {/* Buttons like your Add button */}
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
