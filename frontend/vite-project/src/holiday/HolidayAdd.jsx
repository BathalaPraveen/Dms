import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import { FaSave, FaTimes, FaBackward } from "react-icons/fa";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HolidayAdd = () => {
    const initialFormData = {
        state: "",
        holidayDate: null, // will store Date object
        holidayInfo: "",
    };

    const { t } = useTranslation();
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const { darkMode } = useTheme();
    const navigate = useNavigate();

    // Malaysia states
    const stateOptions = [
        { value: "Johor", label: "Johor" },
        { value: "Kedah", label: "Kedah" },
        { value: "Kelantan", label: "Kelantan" },
        { value: "Malacca", label: "Malacca" },
        { value: "Negeri Sembilan", label: "Negeri Sembilan" },
        { value: "Pahang", label: "Pahang" },
        { value: "Penang", label: "Penang" },
        { value: "Perak", label: "Perak" },
        { value: "Perlis", label: "Perlis" },
        { value: "Sabah", label: "Sabah" },
        { value: "Sarawak", label: "Sarawak" },
        { value: "Selangor", label: "Selangor" },
        { value: "Terengganu", label: "Terengganu" },
        { value: "Kuala Lumpur", label: "Kuala Lumpur" },
        { value: "Labuan", label: "Labuan" },
        { value: "Putrajaya", label: "Putrajaya" },
    ];

    const validate = () => {
        const newErrors = {};
        if (!formData.state) newErrors.state = t("holiday.stateRequired");
        if (!formData.holidayDate) newErrors.holidayDate = t("holiday.dateRequired");
        if (!formData.holidayInfo || formData.holidayInfo.trim().length < 3) {
            newErrors.holidayInfo = t("holiday.infoRequired");

        }
        return newErrors;
    };

    const handleSave = () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});

        // Save to localStorage
        const existingHolidays =
            JSON.parse(localStorage.getItem("holidayData")) || [];
        const updatedHolidays = [
            ...existingHolidays,
            { ...formData, holidayDate: formData.holidayDate.toISOString() },
        ];
        localStorage.setItem("holidayData", JSON.stringify(updatedHolidays));

        toast.success("Holiday added successfully!");
        setFormData(initialFormData);

        setTimeout(() => {
            navigate("/holiday");
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
                    backgroundColor: darkMode ? "#3d3d3dff" : "#fff",
                    color: darkMode ? "#e6eef8" : "#212529",
                }}
            >
                <div className="card-body d-flex justify-content-between align-items-center">
                    <h4 className="card-title mb-0">{t("holiday.addhol")}</h4>
                    <Link to="/holiday" className="btn btn-primary">
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
                {/* Row 1: State + Holiday Date */}
                <div className="row g-3 align-items-end">
                    {/* State Dropdown */}
                    <div className="col-md-6">
                        <label className="form-label fw-semibold">
                            {t("holiday.state")} <span className="text-danger">*</span>
                        </label>
                        <Select
                            options={stateOptions}
                            value={stateOptions.find((opt) => opt.value === formData.state) || null}
                            onChange={(selected) =>
                                setFormData({ ...formData, state: selected ? selected.value : "" })
                            }
                            placeholder="Select State"
                            classNamePrefix="react-select"
                        />
                        {errors.state && (
                            <div className="text-danger small mt-1">{errors.state}</div>
                        )}
                    </div>

                    {/* Holiday Date */}
                    <div className="col-md-6">
                        <label className="form-label fw-semibold d-block mb-1">
                            {t("common.date")} <span className="text-danger">*</span>
                        </label>
                        <DatePicker
                            selected={formData.holidayDate}
                            onChange={(date) => setFormData({ ...formData, holidayDate: date })}
                            dateFormat="dd-MM-yyyy"
                            placeholderText="Select Holiday Date"
                            wrapperClassName="w-100"
                            className={`form-control w-100 ${errors.holidayDate ? "is-invalid" : ""}`}
                        />
                        {errors.holidayDate && (
                            <div className="text-danger small mt-1">{errors.holidayDate}</div>
                        )}
                    </div>
                </div>

                {/* Row 2: Holiday Info */}
                <div className="mb-3 mt-3">
                    <label className="form-label" style={{ fontSize: "15px", fontWeight: 600 }}>
                        {t("holiday.info")} <span className="text-danger">*</span>
                    </label>
                    <textarea
                        className={`form-control ${errors.holidayInfo ? "is-invalid" : ""}`}
                        rows="3"
                        value={formData.holidayInfo}
                        onChange={(e) => setFormData({ ...formData, holidayInfo: e.target.value })}
                    />
                    {errors.holidayInfo && (
                        <div className="invalid-feedback">{errors.holidayInfo}</div>
                    )}
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

export default HolidayAdd;
