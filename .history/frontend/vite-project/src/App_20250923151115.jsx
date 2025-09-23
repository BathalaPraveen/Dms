import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Employee from "./Employee/Employee";
import EmployeeView from "./Employee/EmployeeView";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/signup" element={<Layout><Signup /></Layout>} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Layout><Dashboard /></Layout>
          </PrivateRoute>
        } />     
        <Route path="/employee" element={
          <PrivateRoute>
            <Layout><Employee /></Layout>
          </PrivateRoute>
        } />
        <Route path="/employee/employeeview/:id" element={
          <PrivateRoute>
            <Layout><EmployeeView /></Layout>
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
