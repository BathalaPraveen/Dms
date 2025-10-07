import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import "./App.css";
import logo from "./assets/logo.png"; 
import Dashboard from "./pages/Dashboard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
function App() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [activeItem, setActiveItem] = useState("");
  
    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    };
  return (
    <Router>
      <Header user={user} />
              <Sidebar
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          handleLogout={handleLogout}
        />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
