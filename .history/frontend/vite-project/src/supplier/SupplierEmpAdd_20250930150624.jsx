import React, { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import { FaSave, FaTimes, FaBackward } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";


const EmployeeAdd = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { darkMode } = useTheme();
   const { supplierIndex } = useParams();

  const initialFormData = {
    employeeId: "",
    employeeName: "",
    employeeType: "",
    mobile: "",
    email: "",
    zone: "",
    country: "",
    state: "",
    district: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  // --- Dropdown Options ---
  const employeeTypeOptions = [
    { value: "Driver", label: "Driver" },
    { value: "Engineer", label: "Engineer" },
  ];
  const zoneOptions = [{ value: "East Malaysia", label: "East Malaysia" }];
  const countryOptions = [{ value: "Malaysia", label: "Malaysia" }];
  const stateOptions = {
    Malaysia: [
      { value: "Sabah", label: "Sabah" },
      { value: "Sarawak", label: "Sarawak" },
    ],
  };
  const districtOptions = {
    Sabah: [
      { value: "Kota Kinabalu", label: "Kota Kinabalu" },
      { value: "Sandakan", label: "Sandakan" },
    ],
    Sarawak: [
      { value: "Kuching", label: "Kuching" },
      { value: "Miri", label: "Miri" },
    ],
  };

  // --- Validation ---
const validate = () => {
  const newErrors = {};
  const textRegex = /^[A-Za-z0-9][A-Za-z0-9 ]*$/;

  if (!formData.employeeId)
    newErrors.employeeId = t("supplier.required", { field: t("supplier.supid") });
  else if (!/^(?![\s-])[A-Za-z0-9\s-]+$/.test(formData.employeeId))
    newErrors.employeeId = t("supplier.invalid", { field: t("supplier.supid") });

  if (!formData.employeeName)
    newErrors.employeeName = t("supplier.required", { field: t("employee.employeeName") });
  else if (!/^(?![\s\W]).+$/.test(formData.employeeName))
    newErrors.employeeName = t("supplier.invalid", { field: t("employee.employeeName") });

  if (!formData.mobile) {
    newErrors.mobile = t("supplier.required", { field: t("supplier.mobile") });
  } else {
    const digitsOnly = formData.mobile.replace(/\D/g, "");
    if (digitsOnly.length < 6 || digitsOnly.length > 15) {
      newErrors.mobile = t("employee.mobileInvalid");
    }
  }

  if (!formData.email)
    newErrors.email = t("supplier.required", { field: t("supplier.email") });
  else if (!/\S+@\S+\.\S+/.test(formData.email))
    newErrors.email = t("supplier.invalid", { field: t("supplier.email") });

  if (!formData.employeeType)
    newErrors.employeeType = t("supplier.required", { field: t("employee.employeeType") });
  if (!formData.zone)
    newErrors.zone = t("supplier.required", { field: t("employee.zone") });
  if (!formData.country)
    newErrors.cotry = t("supplier.required", { field: t("employee.country") });
  if (!formData.state)
    newErrors.state = t("supplier.required", { field: t("employee.state") });
  if (!formData.district)
    newErrors.district = t("supplier.required", { field: t("employee.district") });

  return newErrors;
};


  // --- Save Handler ---
const handleSave = () => {
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }
  setErrors({});

  // <-- declare suppliers
  const suppliers = JSON.parse(localStorage.getItem("supplierData")) || [];
  const supplierIndexNum = supplierIndex;

  if (!suppliers[supplierIndexNum]) {
    toast.error(t("employee.supplierNotExist")); // translated
    return;
  }
  const supplier = suppliers[supplierIndexNum];

  if (!supplier.empList) supplier.empList = [];

  supplier.empList.push(formData);
  localStorage.setItem("supplierData", JSON.stringify(suppliers));

  toast.success(t("employee.saveSuccess")); // translated
  setFormData(initialFormData);
  setTimeout(() => navigate(`/supplier/supplieremp/${supplierIndex}`), 1000);
};
  const handleCancel = () => {
    setFormData(initialFormData);
    setErrors({});
  };

return (
  <div className="container mt-3">
    <div
      className="card mb-4"
      style={{
        backgroundColor: darkMode ? "#3d3d3dff" : "#ffff",
        color: darkMode ? "#e6eef8" : "#212529",
      }}
    >
      <div className="card-body d-flex justify-content-between align-items-center">
        <h4 className="card-title mb-0">{t("employee.addemployeetitle")}</h4>
        <Link to={`/supplier/supplieremp/${supplierIndex}`} className="btn btn-primary">
          <FaBackward className="me-1" /> {t("common.back")}
        </Link>
      </div>
    </div>

    <div
      className="card shadow-sm p-4"
      style={{
        backgroundColor: darkMode ? "#3d3d3dff" : "#fff",
        color: darkMode ? "#e6eef8" : "#212529",
      }}
    >
      {/* Row 1: Employee ID, Employee Name, Employee Type */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">
            {t("employee.id")} <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.employeeId ? "is-invalid" : ""}`}
            value={formData.employeeId}
            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
            placeholder={t("employee.employeeIdPlaceholder")}
          />
          {errors.employeeId && <div className="invalid-feedback">{errors.employeeId}</div>}
        </div>

        <div className="col-md-4">
          <label className="form-label">
            {t("employee.employeeName")} <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.employeeName ? "is-invalid" : ""}`}
            value={formData.employeeName}
            onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
            placeholder={t("employee.employeeNamePlaceholder")}
          />
          {errors.employeeName && <div className="invalid-feedback">{errors.employeeName}</div>}
        </div>

        <div className="col-md-4">
          <label className="form-label">
            {t("employee.usertype")} <span className="text-danger">*</span>
          </label>
          <Select
            options={employeeTypeOptions}
            value={employeeTypeOptions.find((opt) => opt.value === formData.employeeType) || null}
            onChange={(selected) => setFormData({ ...formData, employeeType: selected?.value || "" })}
            placeholder={t("employee.selectEmployeeType")}
          />
          {errors.employeeType && <div className="text-danger small">{errors.employeeType}</div>}
        </div>
      </div>

      {/* Row 2: Mobile, Email, Zone */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">
            {t("supplier.mobile")} <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            placeholder={t("employee.mobilePlaceholder")}
          />
          {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
        </div>

        <div className="col-md-4">
          <label className="form-label">
            {t("supplier.email")} <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder={t("employee.emailPlaceholder")}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="col-md-4">
          <label className="form-label">
            {t("employee.zone")} <span className="text-danger">*</span>
          </label>
          <Select
            options={zoneOptions}
            value={zoneOptions.find((opt) => opt.value === formData.zone) || null}
            onChange={(selected) => setFormData({ ...formData, zone: selected?.value || "" })}
            placeholder={t("employee.selectZone")}
          />
          {errors.zone && <div className="text-danger small">{errors.zone}</div>}
        </div>
      </div>

      {/* Row 3: Country, State, District */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">
            {t("employee.country")} <span className="text-danger">*</span>
          </label>
          <Select
            options={countryOptions}
            value={countryOptions.find((opt) => opt.value === formData.country) || null}
            onChange={(selected) => setFormData({ ...formData, country: selected?.value || "" })}
            placeholder={t("employee.selectCountry")}
          />
          {errors.country && <div className="text-danger small">{errors.country}</div>}
        </div>

        <div className="col-md-4">
          <label className="form-label">
            {t("employee.state")} <span className="text-danger">*</span>
          </label>
          <Select
            options={stateOptions[formData.country] || []}
            value={(stateOptions[formData.country] || []).find((opt) => opt.value === formData.state) || null}
            onChange={(selected) => setFormData({ ...formData, state: selected?.value || "" })}
            placeholder={t("employee.selectState")}
          />
          {errors.state && <div className="text-danger small">{errors.state}</div>}
        </div>

        <div className="col-md-4">
          <label className="form-label">
            {t("employee.district")} <span className="text-danger">*</span>
          </label>
          <Select
            options={districtOptions[formData.state] || []}
            value={(districtOptions[formData.state] || []).find((opt) => opt.value === formData.district) || null}
            onChange={(selected) => setFormData({ ...formData, district: selected?.value || "" })}
            placeholder={t("employee.selectDistrict")}
          />
          {errors.district && <div className="text-danger small">{errors.district}</div>}
        </div>
      </div>

      {/* Buttons */}
      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-success" onClick={handleSave}>
          <FaSave /> {t("profile.save")}
        </button>
        <button className="btn btn-secondary" onClick={handleCancel}>
          <FaTimes /> {t("common.cancel")}
        </button>
      </div>
    </div>
  </div>
);

};

export default EmployeeAdd;
