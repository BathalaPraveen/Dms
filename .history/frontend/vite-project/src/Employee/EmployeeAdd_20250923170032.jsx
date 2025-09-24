import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const EmployeeAdd = () => {
  const [showModal, setShowModal] = useState(false);
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
    a.download = "employee.json"; // new file created
    a.click();
    URL.revokeObjectURL(url);

    setFormData({ name: "", email: "", city: "", company: "" });
    setShowModal(false);
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)}>Add Employee</Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Name"
            className="form-control mb-2"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="form-control mb-2"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="City"
            className="form-control mb-2"
            value={formData.city}
            onChange={e => setFormData({ ...formData, city: e.target.value })}
          />
          <input
            type="text"
            placeholder="Company"
            className="form-control mb-2"
            value={formData.company}
            onChange={e => setFormData({ ...formData, company: e.target.value })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EmployeeAdd;
