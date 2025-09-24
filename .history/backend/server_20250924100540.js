require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth"); // import your auth.js
const employeeRoutes = require("./routes/employee");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // allows JSON body parsing

// Routes
app.use("/api/auth", authRoutes); // connect auth routes
app.use("/api/employee", employeeRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
