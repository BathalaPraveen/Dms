// src/api.js
import axios from "axios";

// Base URL for your backend API
// In future, change this to your Java backend URL
const API_BASE_URL = "http://localhost:5000"; 

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
