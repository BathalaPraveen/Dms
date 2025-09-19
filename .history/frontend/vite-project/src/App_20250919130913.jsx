import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import Login from "./pages/Login";
import "./App.css";
import logo from "./assets/logo.png"; 
import Dashboard from "./pages/Dashboard";
function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Router>
      <Header user={user} />
      
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
