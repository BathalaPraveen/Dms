import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import { FaSave, FaTimes, FaBackward } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";

const SupplierEdit = () => {
  const { t } = useTranslation();
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const { supplierIndex } = useParams(); // supplier index from URL

  const [formData, setFormData] = useState({
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
  });

  const [errors, setErrors] = useState({});

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
  const validate = () => {
    const newErrors = {};
    const textRegex = /^[A-Za-z0-9][A-Za-z0-9 ]*$/;

    if (!formData.supplierName) {
      newErrors.supplierName = t("supplier.required", { field: t("supplier.supname") });
    } else if (!/^(?![\s\W]).+$/.test(formData.supplierName)) {
      newErrors.supplierName = t("supplier.invalid", { field: t("supplier.supname") });
    }

    if (!formData.supplierId) {
      newErrors.supplierId = t("supplier.required", { field: t("supplier.supid") });
    } else if (!/^(?![\s-])[A-Za-z0-9\s-]+$/.test(formData.supplierId)) {
      newErrors.supplierId = t("supplier.invalid", { field: t("supplier.supid") });
    }

    if (!formData.contactPerson) {
      newErrors.contactPerson = t("supplier.required", { field: t("supplier.contperson") });
    } else if (!/^(?![\s.])[A-Za-z\s.]+$/.test(formData.contactPerson)) {
      newErrors.contactPerson = t("supplier.invalid", { field: t("supplier.contperson") });
    }

    if (!formData.address) {
      newErrors.address = t("supplier.required", { field: t("supplier.address") });
    } else if (!textRegex.test(formData.address)) {
      newErrors.address = t("supplier.invalid", { field: t("supplier.address") });
    }

    if (!formData.state) newErrors.state = t("supplier.required", { field: t("supplier.state") });
    if (!formData.district) newErrors.district = t("supplier.required", { field: t("supplier.district") });

    // Telephone validation
    if (!formData.telephone) {
      newErrors.telephone = t("supplier.required", { field: t("supplier.telephone") });
    } else {
      const digitsOnly = formData.telephone.replace(/\D/g, "");
      if (digitsOnly.length < 6 || digitsOnly.length > 15) {
        newErrors.telephone = t("supplier.invalidTel");
      }
    }

    // Mobile validation
    if (!formData.mobile) {
      newErrors.mobile = t("supplier.required", { field: t("supplier.mobile") });
    } else {
      const digitsOnly = formData.mobile.replace(/\D/g, "");
      if (digitsOnly.length < 6 || digitsOnly.length > 15) {
        newErrors.mobile = t("supplier.invalidMob");
      }
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = t("supplier.required", { field: t("supplier.email") });
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("supplier.invalidEmail");
    }

    return newErrors;
  };

  // --- Load supplier data for editing ---
  useEffect(() => {
    const suppliers = JSON.parse(localStorage.getItem("supplierData")) || [];
    console.lo
    if (suppliers[supplierIndex]) {
      setFormData(suppliers[supplierIndex]);
    } else {
      toast.error("Supplier not found!");
      navigate("/supplier");
    }
  }, [supplierIndex, navigate]);

  // --- Save handler ---
  const handleUpdate = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    const suppliers = JSON.parse(localStorage.getItem("supplierData")) || [];
    suppliers[supplierIndex] = formData;
    localStorage.setItem("supplierData", JSON.stringify(suppliers));

    toast.success("Supplier updated successfully!");
    navigate("/supplier");
  };

  const handleCancel = () => {
    navigate("/supplier");
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
          <h4 className="card-title mb-0">{t("supplier.editsupplier")}</h4>
          <Link to="/supplier" className="btn btn-primary">
            <FaBackward className="me-1" /> {t("common.back")}
          </Link>
        </div>
      </div>

      {/* same form fields as Add Supplier */}
      {/* Just reuse SupplierAdd inputs, but value={formData.xxx} is already filled */}
      {/* Example: */}
      <div className="card shadow-sm p-4"
        style={{
          backgroundColor: darkMode ? "#3d3d3dff" : "#ffff",
          color: darkMode ? "#e6eef8" : "#212529",
        }}
      >
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">{t("supplier.supname")}<span className="text-danger">*</span></label>
            <input
              type="text"
              className={`form-control ${errors.supplierName ? "is-invalid" : ""}`}
              value={formData.supplierName}
              onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
            />
            {errors.supplierName && <div className="invalid-feedback">{errors.supplierName}</div>}
          </div>

          <div className="col-md-4">
            <label className="form-label">{t("supplier.supid")}<span className="text-danger">*</span></label>
            <input
              type="text"
              className={`form-control ${errors.supplierId ? "is-invalid" : ""}`}
              value={formData.supplierId}
              onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
            />
            {errors.supplierId && <div className="invalid-feedback">{errors.supplierId}</div>}
          </div>
        </div>

        {/* Add other fields like address, state, district, etc. same as AddSupplier */}

        {/* Buttons */}
        <div className="d-flex gap-2 mt-3">
          <button className="btn btn-success" onClick={handleUpdate}>
            <FaSave className="me-1" /> {t("profile.update")}
          </button>
          <button className="btn btn-secondary" onClick={handleCancel}>
            <FaTimes className="me-1" /> {t("employee.cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierEdit;
