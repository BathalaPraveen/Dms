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
  const { index } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();

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

  const [formData, setFormData] = useState(initialFormData);
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

  // Load supplier data
  useEffect(() => {
    const suppliers = JSON.parse(localStorage.getItem("supplierData")) || [];
    const supplier = suppliers[index];
    if (supplier) {
      setFormData(supplier);
    } else {
      toast.error("Supplier not found!");
      navigate("/supplier");
    }
  }, [index, navigate]);

  // --- Validation (same as add) ---
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

    if (!formData.telephone) {
      newErrors.telephone = t("supplier.required", { field: t("supplier.telephone") });
    }

    if (!formData.mobile) {
      newErrors.mobile = t("supplier.required", { field: t("supplier.mobile") });
    }

    if (!formData.email) {
      newErrors.email = t("supplier.required", { field: t("supplier.email") });
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("supplier.invalidEmail");
    }

    if (!formData.password) {
      newErrors.password = t("supplier.required", { field: t("supplier.password") });
    }

    return newErrors;
  };

  // --- Update handler ---
  const handleUpdate = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    const suppliers = JSON.parse(localStorage.getItem("supplierData")) || [];
    suppliers[index] = formData;
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

      <div
        className="card shadow-sm p-4"
        style={{
          backgroundColor: darkMode ? "#3d3d3dff" : "#ffff",
          color: darkMode ? "#e6eef8" : "#212529",
        }}
      >
        {/* Form fields – same as Add, pre-filled with formData */}
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

          <div className="col-md-4">
            <label className="form-label">{t("supplier.contperson")}<span className="text-danger">*</span></label>
            <input
              type="text"
              className={`form-control ${errors.contactPerson ? "is-invalid" : ""}`}
              value={formData.contactPerson}
              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
            />
            {errors.contactPerson && <div className="invalid-feedback">{errors.contactPerson}</div>}
          </div>
        </div>

        {/* Address */}
        <div className="row mb-3">
          <div className="col-md-12">
            <label className="form-label">{t("supplier.address")}<span className="text-danger">*</span></label>
            <textarea
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
          </div>
        </div>

        {/* State & District */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">{t("supplier.state")}<span className="text-danger">*</span></label>
            <Select
              options={stateOptions}
              value={stateOptions.find((opt) => opt.value === formData.state) || null}
              onChange={(selected) => setFormData({ ...formData, state: selected ? selected.value : "" })}
              placeholder={t("supplier.state")}
            />
            {errors.state && <div className="text-danger small">{errors.state}</div>}
          </div>

          <div className="col-md-4">
            <label className="form-label">{t("supplier.district")}<span className="text-danger">*</span></label>
            <Select
              options={districtOptions[formData.state] || []}
              value={(districtOptions[formData.state] || []).find((opt) => opt.value === formData.district) || null}
              onChange={(selected) => setFormData({ ...formData, district: selected ? selected.value : "" })}
              placeholder={t("supplier.district")}
            />
            {errors.district && <div className="text-danger small">{errors.district}</div>}
          </div>

          <div className="col-md-4">
            <label className="form-label">{t("supplier.telephone")}<span className="text-danger">*</span></label>
            <input
              type="text"
              className={`form-control ${errors.telephone ? "is-invalid" : ""}`}
              value={formData.telephone}
              onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
            />
            {errors.telephone && <div className="invalid-feedback">{errors.telephone}</div>}
          </div>
        </div>

        {/* Facsimile, Mobile, Email */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">{t("supplier.facsimile")}</label>
            <input
              type="text"
              className="form-control"
              value={formData.facsimile}
              onChange={(e) => setFormData({ ...formData, facsimile: e.target.value })}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">{t("supplier.mobile")}<span className="text-danger">*</span></label>
            <input
              type="text"
              className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            />
            {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
          </div>

          <div className="col-md-4">
            <label className="form-label">{t("supplier.email")}<span className="text-danger">*</span></label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
        </div>

        {/* Password */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">{t("supplier.password")}<span className="text-danger">*</span></label>
            <input
              type="text"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
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

export default SupplierEdit;
