const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// JSON file path
const filePath = path.join(__dirname, "../employees.json");

// Get all employees
router.get("/employees", (req, res) => {
  if (!fs.existsSync(filePath)) {
    return res.json([]);
  }
  const data = fs.readFileSync(filePath);
  res.json(JSON.parse(data));
});

// Add new employee
router.post("/employeestore", (req, res) => {
  const newEmployee = req.body;

  let employees = [];
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    employees = JSON.parse(data);
  }
  employees.push(newEmployee);

  fs.writeFileSync(filePath, JSON.stringify(employees, null, 2));

  res.json({ success: true, message: "Employee added successfully" });
});

module.exports = router;
