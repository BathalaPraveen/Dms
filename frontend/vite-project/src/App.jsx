import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "./App.css";
import logo from "./assets/logo.png"; 
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <Router>
      {/* <header className="navbar">
       <div className="nav-logo">
          <img src={logo} alt="MyApp Logo" />
        </div>
        <nav className="nav-links">
          <NavLink to="/signup" className="nav-link">
            Signup
          </NavLink>
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        </nav>
      </header> */}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
