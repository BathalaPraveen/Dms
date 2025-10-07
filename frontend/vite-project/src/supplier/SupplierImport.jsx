import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useNavigate, Link } from "react-router-dom";
import { FaBackward } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SupplierImport = () => {
    const [file, setFile] = useState(null); // store selected file
    const navigate = useNavigate();
    const { darkMode } = useTheme();
    const { t } = useTranslation();

    // Required and optional columns
    const requiredColumns = ["supplierId", "supplierName", "contactPerson", "email", "address", "district", "state", "mobile", "telephone", "password"];
    const optionalColumns = ["facsimile"];

    // Handle file selection
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile) return;

        if (!selectedFile.name.match(/\.(xlsx|xls|csv)$/i)) {
            toast.error("Only Excel or CSV files are allowed");
            return;
        }

        setFile(selectedFile);
    };

    // Handle submit
    const handleSubmit = () => {
        if (!file) {
            toast.error("Please select a file first");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const parsedData = XLSX.utils.sheet_to_json(sheet);

                if (parsedData.length === 0) {
                    toast.error("No data found in the file");
                    return;
                }

                const missingColumns = requiredColumns.filter(col => !(col in parsedData[0]));
                if (missingColumns.length > 0) {
                    toast.error(`Missing columns: ${missingColumns.join(", ")}`);
                    return;
                }

                const stored = JSON.parse(localStorage.getItem("supplierData")) || [];
                const existingIds = new Set(stored.map(u => u.supplierId));

                const newRows = parsedData
                    .filter(u => !existingIds.has(u.supplierId))
                    .map(u => {
                        optionalColumns.forEach(col => {
                            if (!(col in u)) u[col] = "";
                        });
                        return u;
                    });

                if (newRows.length === 0) {
                    toast.info("No new suppliers to import. All data already exists.");
                    return;
                }

                const merged = [...stored, ...newRows];
                localStorage.setItem("supplierData", JSON.stringify(merged));
                toast.success(`${newRows.length} supplier(s) imported successfully!`);
                setTimeout(() => {
                    navigate("/supplier");
                }, 1500); // wait 1.5 seconds before redirect


            } catch (err) {
                console.error("Import error:", err);
                toast.error("Failed to import file. Please check the format.");
            }
        };

        reader.readAsArrayBuffer(file);
    };

    // Generate sample Excel file
    const handleDownloadSample = () => {
        const sampleData = [
            {
                supplierId: "S001",
                supplierName: "Sample Supplier",
                contactPerson: "John Doe",
                email: "sample@example.com",
                address: "123 Sample Street",
                district: "Trivandrum",
                state: "Kerala",
                mobile: "9876543210",
                telephone: "0471-1234567",
                password: "Pass@123",
                facsimile: ""
            }
        ];

        const ws = XLSX.utils.json_to_sheet(sampleData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Suppliers");
        XLSX.writeFile(wb, "SupplierSample.xlsx");
    };

    return (
        <div className="container mt-5">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            {/* Header: Title + Buttons */}
            <div
                className="card mb-4"
                style={{
                    backgroundColor: darkMode ? "#3d3d3dff" : "#ffffff",
                    color: darkMode ? "#e6eef8" : "#212529",
                }}
            >
                <div className="card-body d-flex justify-content-between align-items-center">
                    <h4 className="card-title mb-0">{t("supplier.supimport")}</h4>
                    <div className="d-flex gap-2">
                        <button className="btn btn-info" onClick={handleDownloadSample}>
                            {t("common.downsampfile")}
                        </button>
                        <Link to="/supplier" className="btn btn-primary">
                            <FaBackward className="me-1" /> {t("common.back")}
                        </Link>
                    </div>
                </div>
            </div>

            {/* File Upload Card */}
            <div className="card p-4 shadow" style={{
                backgroundColor: darkMode ? "#3d3d3dff" : "#ffffff",
                color: darkMode ? "#e6eef8" : "#212529",
            }}>
                <input
                    type="file"
                    accept=".xlsx, .xls, .csv"
                    onChange={handleFileChange}
                    className={`form-control mb-3 ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}
                />
                <div className="d-flex gap-2">
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        {t("common.submit")}
                    </button>
                    <button className="btn btn-secondary" onClick={() => navigate("/supplier")}>
                        {t("common.cancel")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SupplierImport;
