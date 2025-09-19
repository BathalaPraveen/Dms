const mysql = require("mysql2/promise"); // package name should be a string
require("dotenv").config();              // dotenv also needs quotes

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

module.exports = pool;
