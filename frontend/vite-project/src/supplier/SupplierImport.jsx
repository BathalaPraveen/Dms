import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

const SupplierImport = () => {
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null); // store selected file
    const navigate = useNavigate();

    // Handle file selection
    const handleFileChange = (event) => {
        setError(null); // clear previous errors
        const selectedFile = event.target.files[0];
        if (!selectedFile) return;

        if (!selectedFile.name.match(/\.(xlsx|xls|csv)$/i)) {
            setError("Only Excel or CSV files are allowed");
            return;
        }

        setFile(selectedFile);
    };

    // Handle submit
    const handleSubmit = () => {
        if (!file) {
            setError("Please select a file first");
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
                    setError("No data found in the file");
                    return;
                }

                const requiredColumns = ["supplierId", "supplierName", "contactPerson", "email"];
                const missingColumns = requiredColumns.filter(col => !(col in parsedData[0]));

                if (missingColumns.length > 0) {
                    setError(`Missing columns: ${missingColumns.join(", ")}`);
                    return;
                }

                // Merge with existing
                const stored = JSON.parse(localStorage.getItem("supplierData")) || [];
                const existingIds = new Set(stored.map(u => u.supplierId));
                const merged = [
                    ...stored,
                    ...parsedData.filter(u => !existingIds.has(u.supplierId)),
                ];

                localStorage.setItem("supplierData", JSON.stringify(merged));
                alert("Suppliers imported successfully!");
                navigate("/supplier");
            } catch (err) {
                console.error("Import error:", err);
                setError("Failed to import file. Please check the format.");
            }
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow">
                <h4 className="mb-3">Import Suppliers</h4>
                {error && <div className="alert alert-danger">{error}</div>}
                <input
                    type="file"
                    accept=".xlsx, .xls, .csv"
                    onChange={handleFileChange}
                    className="form-control mb-3"
                />
                <div className="d-flex gap-2">
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Submit
                    </button>
                    <button className="btn btn-secondary" onClick={() => navigate("/supplier")}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SupplierImport;
