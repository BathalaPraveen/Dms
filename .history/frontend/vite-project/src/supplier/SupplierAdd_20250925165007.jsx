import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import { FaSave, FaTimes ,FaBackward} from "react-icons/fa"; // icons
import { useParams, Link } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
const SupplierAdd = () => {
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
  const { t } = useTranslation();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { darkMode } = useTheme();
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
    } else if (!/^[A-Za-z][A-Za-z\s]*$/.test(formData.firstName.trim())) {
      newErrors.firstName = t("employee.firstNameInvalid");
    }

    // Last Name
    if (!formData.lastName) {
      newErrors.lastName = t("employee.lastNameRequired");
    } else if (!/^[A-Za-z][A-Za-z\s]*$/.test(formData.lastName.trim())) {
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

  const handleSave = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    // Read existing employees or empty array
    const existingEmployees = JSON.parse(localStorage.getItem("employeeData")) || [];
    const updatedEmployees = [...existingEmployees, formData];
    localStorage.setItem("employeeData", JSON.stringify(updatedEmployees));

    toast.success("Employee added successfully!");
    setFormData(initialFormData);

    setTimeout(() => {
      navigate("/employee"); // go to employee list
    }, 1000);
  };
  const handleCancel = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  return (
    <div className="container mt-3 p-0 ml-0 mr-0">   
     <div className="card mb-4" style={{backgroundColor: darkMode ? "#3d3d3dff" : "#ffff",color: darkMode ? "#e6eef8" : "#212529"}}>
      <div className="card-body d-flex justify-content-between align-items-center">
        <h4 className="card-title mb-0">
          {t("supname.addemployeetitle")}
        </h4>
        <Link to="/employee" className="btn btn-primary">
          <FaBackward className="me-1" /> {t("common.back")}
        </Link>
      </div>
    </div>

      <div className="card shadow-sm p-4"style={{backgroundColor: darkMode ? "#3d3d3dff" : "#ffff",color: darkMode ? "#e6eef8" : "#212529"}}>
        {/* Row 1: User Type, Zone, Employee ID */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label
              className="form-label"
              style={{ fontSize: "15px", fontWeight: 600 }}
            >
              {t("employee.usertype")} <span className="text-danger">*</span>
            </label>
            <Select
              options={userTypeOptions}
              value={userTypeOptions.find(opt => opt.value === formData.userType) || null}
              onChange={(selected) =>
                setFormData({ ...formData, userType: selected ? selected.value : "" })
              }
              placeholder="Select User Type"
              classNamePrefix="react-select"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: darkMode ? "#3d3d3dff" : "#fff",
                  color: darkMode ? "#fff" : "#212529",
                  borderColor: errors.userType ? "#dc3545" : base.borderColor,
                }),
                singleValue: (base) => ({
                  ...base,
                  color: darkMode ? "#fff" : "#212529",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: darkMode ? "#3d3d3dff" : "#fff",
                  color: darkMode ? "#fff" : "#212529",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused
                    ? darkMode
                      ? "#555"
                      : "#eee"
                    : darkMode
                      ? "#3d3d3dff"
                      : "#fff",
                  color: darkMode ? "#fff" : "#212529",
                  cursor: "pointer",
                }),
              }}
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
              {t("employee.zone")} <span className="text-danger">*</span>
            </label>
            <Select
              options={zoneOptions}
              value={zoneOptions.find((opt) => opt.value === formData.zone) || null}
              onChange={(selected) =>
                setFormData({
                  ...formData,
                  zone: selected ? selected.value : "",
                })
              }
              placeholder="Select Zone"
              classNamePrefix="react-select"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: darkMode ? "#3d3d3dff" : "#fff",
                  color: darkMode ? "#fff" : "#212529",
                  borderColor: errors.zone ? "#dc3545" : base.borderColor,
                }),
                singleValue: (base) => ({
                  ...base,
                  color: darkMode ? "#fff" : "#212529",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: darkMode ? "#3d3d3dff" : "#fff",
                  color: darkMode ? "#fff" : "#212529",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused
                    ? darkMode
                      ? "#555"
                      : "#eee"
                    : darkMode
                      ? "#3d3d3dff"
                      : "#fff",
                  color: darkMode ? "#fff" : "#212529",
                  cursor: "pointer",
                }),
              }}
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
              {t("employee.id")} <span className="text-danger">*</span>
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
              {t("employee.firstname")} <span className="text-danger">*</span>
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
              {t("employee.lastname")} <span className="text-danger">*</span>
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
              {t("employee.mobile")} <span className="text-danger">*</span>
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
              {t("employee.email")} <span className="text-danger">*</span>
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
              {t("employee.password")} <span className="text-danger">*</span>
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
              {t("employee.designation")} <span className="text-danger">*</span>
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
            <FaSave className="me-1" /> {t("profile.save")}
          </button>
          <button className="btn btn-secondary" onClick={handleCancel}>
            <FaTimes className="me-1" /> {t("employee.cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierAdd;
