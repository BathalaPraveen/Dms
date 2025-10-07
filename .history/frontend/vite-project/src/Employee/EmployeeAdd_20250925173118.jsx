import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import { FaSave, FaTimes ,FaBackward} from "react-icons/fa"; // icons
import axios from "axios";
import { useParams, Link } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
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
  // const handleSave = async () => {
  //   const validationErrors = validate();
  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //     return;
  //   }
  //   setErrors({});
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/employee/employeestore",
  //       formData
  //     );
  //     if (response.data.success) {
  //       toast.success("Employee added successfully!"); 
  //       setFormData(initialFormData);
  //       setTimeout(() => {
  //         navigate("/employee");
  //       }, 1000);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Something went wrong!");
  //   }
  // };
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
    <div
      className="card mb-4"
      style={{
        backgroundColor: darkMode ? "#3d3d3dff" : "#ffff",
        color: darkMode ? "#e6eef8" : "#212529",
      }}
    >
      <div className="card-body d-flex justify-content-between align-items-center">
        <h4 className="card-title mb-0">{t("supplier.addsupplier")}</h4>
        <Link to="/supplier" className="btn btn-primary">
          <FaBackward className="me-1" /> {t("common.back")}
        </Link>
      </div>
    </div>

    <div
      className="card shadow-sm p-4"
      style={{
        backgroundColor: darkMode ? "#3d3d3dff" : "#ffff",
        color: darkMode ? "#e6eef8" : "#212529",
      }}
    >
      {/* Row 1: Supplier Name, Supplier ID, Contact Person */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">{t("supplier.supname")} *</label>
          <input
            type="text"
            className={`form-control ${errors.supplierName ? "is-invalid" : ""}`}
            value={formData.supplierName}
            onChange={(e) =>
              setFormData({ ...formData, supplierName: e.target.value })
            }
          />
          {errors.supplierName && (
            <div className="invalid-feedback">{errors.supplierName}</div>
          )}
        </div>

        <div className="col-md-4">
          <label className="form-label">{t("supplier.supid")} *</label>
          <input
            type="text"
            className={`form-control ${errors.supplierId ? "is-invalid" : ""}`}
            value={formData.supplierId}
            onChange={(e) =>
              setFormData({ ...formData, supplierId: e.target.value })
            }
          />
          {errors.supplierId && (
            <div className="invalid-feedback">{errors.supplierId}</div>
          )}
        </div>

        <div className="col-md-4">
          <label className="form-label">{t("supplier.contactperson")} *</label>
          <input
            type="text"
            className={`form-control ${errors.contactPerson ? "is-invalid" : ""}`}
            value={formData.contactPerson}
            onChange={(e) =>
              setFormData({ ...formData, contactPerson: e.target.value })
            }
          />
          {errors.contactPerson && (
            <div className="invalid-feedback">{errors.contactPerson}</div>
          )}
        </div>
      </div>

      {/* Row 2: Address */}
      <div className="row mb-3">
        <div className="col-md-12">
          <label className="form-label">{t("supplier.address")} *</label>
          <textarea
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
          {errors.address && (
            <div className="invalid-feedback">{errors.address}</div>
          )}
        </div>
      </div>

      {/* Row 3: State & District */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">{t("supplier.state")} *</label>
          <Select
            options={stateOptions}
            value={
              stateOptions.find((opt) => opt.value === formData.state) || null
            }
            onChange={(selected) =>
              setFormData({
                ...formData,
                state: selected ? selected.value : "",
              })
            }
            placeholder={t("supplier.state")}
          />
          {errors.state && (
            <div className="text-danger small">{errors.state}</div>
          )}
        </div>

        <div className="col-md-4">
          <label className="form-label">{t("supplier.district")} *</label>
          <Select
            options={districtOptions[formData.state] || []}
            value={
              (districtOptions[formData.state] || []).find(
                (opt) => opt.value === formData.district
              ) || null
            }
            onChange={(selected) =>
              setFormData({
                ...formData,
                district: selected ? selected.value : "",
              })
            }
            placeholder={t("supplier.district")}
          />
          {errors.district && (
            <div className="text-danger small">{errors.district}</div>
          )}
        </div>

        {/* Row 4: Telephone */}
        <div className="col-md-4">
          <label className="form-label">{t("supplier.telephone")} *</label>
          <input
            type="text"
            className={`form-control ${errors.telephone ? "is-invalid" : ""}`}
            value={formData.telephone}
            onChange={(e) =>
              setFormData({ ...formData, telephone: e.target.value })
            }
          />
          {errors.telephone && (
            <div className="invalid-feedback">{errors.telephone}</div>
          )}
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">{t("supplier.facsimile")}</label>
          <input
            type="text"
            className="form-control"
            value={formData.facsimile}
            onChange={(e) =>
              setFormData({ ...formData, facsimile: e.target.value })
            }
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">{t("supplier.mobile")} *</label>
          <input
            type="text"
            className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
            value={formData.mobile}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value })
            }
          />
          {errors.mobile && (
            <div className="invalid-feedback">{errors.mobile}</div>
          )}
        </div>

        <div className="col-md-4">
          <label className="form-label">{t("supplier.email")} *</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
      </div>

      {/* Row 5: Password */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">{t("supplier.password")} *</label>
          <input
            type="text"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-success" onClick={handleSave}>
          <FaSave className="me-1" /> {t("common.save")}
        </button>
        <button className="btn btn-secondary" onClick={handleCancel}>
          <FaTimes className="me-1" /> {t("common.cancel")}
        </button>
      </div>
    </div>
  </div>
);

};

export default EmployeeAdd;
