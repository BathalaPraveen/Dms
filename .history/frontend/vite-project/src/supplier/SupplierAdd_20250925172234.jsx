import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import { FaSave, FaTimes, FaBackward } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";

const SupplierAdd = () => {
  const initialFormData = {
    supplierName: "",
    supplierId: "",
    address: "",
    state: "",
    district: "",
    contactPerson: "",
    telephone: "",
    facsimile: "",
    mobile: "",
    email: "",
    password: "",
  };

  const { t } = useTranslation();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  // --- Dropdown options ---
  const stateOptions = [
    { value: "Tamil Nadu", label: "Tamil Nadu" },
    { value: "Kerala", label: "Kerala" },
    { value: "Karnataka", label: "Karnataka" },
  ];

  const districtOptions = {
    "Tamil Nadu": [
      { value: "Chennai", label: "Chennai" },
      { value: "Coimbatore", label: "Coimbatore" },
      { value: "Madurai", label: "Madurai" },
    ],
    Kerala: [
      { value: "Kochi", label: "Kochi" },
      { value: "Trivandrum", label: "Trivandrum" },
    ],
    Karnataka: [
      { value: "Bangalore", label: "Bangalore" },
      { value: "Mysore", label: "Mysore" },
    ],
  };

  // --- Validation ---
  // --- Validation ---
const validate = () => {
  const newErrors = {};

  // Common regex for text fields (no starting space/special char, allow letters, numbers, spaces)
  const textRegex = /^[A-Za-z0-9][A-Za-z0-9 ]*$/;

  if (!formData.supplierName) {
    newErrors.supplierName = "Supplier Name is required";
  } else if (!textRegex.test(formData.supplierName)) {
    newErrors.supplierName = "Invalid Supplier Name";
  }

  if (!formData.supplierId) {
    newErrors.supplierId = "Supplier ID is required";
  } else if (!textRegex.test(formData.supplierId)) {
    newErrors.supplierId = "Invalid Supplier ID";
  }

  if (!formData.contactPerson) {
    newErrors.contactPerson = "Contact Person is required";
  } else if (!textRegex.test(formData.contactPerson)) {
    newErrors.contactPerson = "Invalid Contact Person";
  }

  if (!formData.address) {
    newErrors.address = "Address is required";
  } else if (!textRegex.test(formData.address)) {
    newErrors.address = "Invalid Address";
  }

  if (!formData.state) newErrors.state = "State is required";
  if (!formData.district) newErrors.district = "District is required";

  // Telephone validation (allow numbers and dash)
  if (!formData.telephone) {
    newErrors.telephone = "Telephone is required";
  } else {
    const digitsOnly = formData.telephone.replace(/\D/g, ""); // remove all non-digits
    if (digitsOnly.length < 6 || digitsOnly.length > 15) {
      newErrors.telephone = "Invalid Telephone number";
    } else if (!/^[0-9-]+$/.test(formData.telephone)) {
      newErrors.telephone = "Telephone can only contain numbers and dashes";
    }
  }
  // Mobile validation (allow numbers and dash)
  if (!formData.mobile) {
    newErrors.mobile = "Mobile is required";
  } else {
    const digitsOnly = formData.mobile.replace(/\D/g, "");
    if (digitsOnly.length < 6 || digitsOnly.length > 15) {
      newErrors.mobile = "Invalid Mobile number";
    }
  }

  // Email validation
  if (!formData.email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Invalid Email";
  }

  // Password validation
  if (!formData.password) {
    newErrors.password = "Password is required";
  } else if (
    !/(?=.*[a-z])/.test(formData.password) ||
    !/(?=.*[A-Z])/.test(formData.password) ||
    !/(?=.*\d)/.test(formData.password) ||
    !/(?=.*[@$!%*?&])/.test(formData.password) ||
    formData.password.length < 6
  ) {
    newErrors.password =
      "Password must contain at least 6 characters, including uppercase, lowercase, number, and special character";
  }

  return newErrors;
};


  // --- Save handler ---
  const handleSave = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    const existingSuppliers =
      JSON.parse(localStorage.getItem("supplierData")) || [];
    const updatedSuppliers = [...existingSuppliers, formData];
    localStorage.setItem("supplierData", JSON.stringify(updatedSuppliers));

    toast.success("Supplier added successfully!");
    setFormData(initialFormData);

    setTimeout(() => {
      navigate("/supplier"); // navigate to supplier list page
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
          <h4 className="card-title mb-0">Add Supplier</h4>
          <Link to="/supplier" className="btn btn-primary">
            <FaBackward className="me-1" /> Back
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
            <label className="form-label">Supplier Name *</label>
            <input
              type="text"
              className={`form-control ${
                errors.supplierName ? "is-invalid" : ""
              }`}
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
            <label className="form-label">Supplier ID *</label>
            <input
              type="text"
              className={`form-control ${
                errors.supplierId ? "is-invalid" : ""
              }`}
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
            <label className="form-label">Contact Person *</label>
            <input
              type="text"
              className={`form-control ${
                errors.contactPerson ? "is-invalid" : ""
              }`}
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
            <label className="form-label">Address *</label>
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
            <label className="form-label">State *</label>
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
              placeholder="Select State"
            />
            {errors.state && (
              <div className="text-danger small">{errors.state}</div>
            )}
          </div>

          <div className="col-md-4">
            <label className="form-label">District *</label>
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
              placeholder="Select District"
            />
            {errors.district && (
              <div className="text-danger small">{errors.district}</div>
            )}
          </div>

          {/* Row 4: Telephone, Facsimile, Mobile */}
          <div className="col-md-4">
            <label className="form-label">Telephone *</label>
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
            <label className="form-label">Facsimile</label>
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
            <label className="form-label">Mobile *</label>
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

          {/* Row 5: Email, Password */}

          <div className="col-md-4">
            <label className="form-label">Email *</label>
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
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Password *</label>
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

export default SupplierAdd;
