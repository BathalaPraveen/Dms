import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeAdd = ({ showModal, setShowModal }) => {
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
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex", justifyContent: "center", alignItems: "center",
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        minWidth: "300px",
        maxWidth: "500px"
      }}>
        <h3>Add Employee</h3>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          style={{ width: "100%", marginBottom: "8px", padding: "6px" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          style={{ width: "100%", marginBottom: "8px", padding: "6px" }}
        />
        <input
          type="text"
          placeholder="City"
          value={formData.city}
          onChange={e => setFormData({ ...formData, city: e.target.value })}
          style={{ width: "100%", marginBottom: "8px", padding: "6px" }}
        />
        <input
          type="text"
          placeholder="Company"
          value={formData.company}
          onChange={e => setFormData({ ...formData, company: e.target.value })}
          style={{ width: "100%", marginBottom: "12px", padding: "6px" }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
          <button onClick={() => setShowModal(false)}>Close</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAdd;