import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeAdd = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    company: ""
  });

  const handleSave = () => {
    const jsonStr = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "employee.json";
    a.click();
    URL.revokeObjectURL(url);

    setFormData({ name: "", email: "", city: "", company: "" });
  };

  return (
    <div className="container">
      <div className="card mb-2 p-3">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
          <h4 className="mb-2 mb-md-0">{t("table.employeeList")}</h4>
          </div
            <div className="card shadow-sm p-4">
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
        className="form-control mb-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
        className="form-control mb-2"
      />
      <input
        type="text"
        placeholder="City"
        value={formData.city}
        onChange={e => setFormData({ ...formData, city: e.target.value })}
        className="form-control mb-2"
      />
      <input
        type="text"
        placeholder="Company"
        value={formData.company}
        onChange={e => setFormData({ ...formData, company: e.target.value })}
        className="form-control mb-2"
      />
      <button className="btn btn-success" onClick={handleSave}>Save</button>
    </div>
    </div>
  );
};

export default EmployeeAdd;
