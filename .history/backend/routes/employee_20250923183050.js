const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// JSON file path
const filePath = path.join(__dirname, "employees.json");

// Route to get all employees
app.get("/employees", (req, res) => {
  if (!fs.existsSync(filePath)) {
    return res.json([]);
  }
  const data = fs.readFileSync(filePath);
  res.json(JSON.parse(data));
});

// Route to add a new employee
app.post("/employeestore", (req, res) => {
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

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
