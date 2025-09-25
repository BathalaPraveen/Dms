import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Employee from "./employee/Employee";
import EmployeeView from "./employee/EmployeeView";
import EmployeeEdit from "./employee/EmployeeEdit";
import EmployeeAdd from "./employee/EmployeeAdd";
import SupplierAdd from "./supplier/SupplierAdd";
import SupplierAdd from "./supplier/SupplierAdd";

import "./i18n";
import PrivateRoute from "./components/PrivateRoute";
import { ThemeProvider } from "./contexts/ThemeContext";
function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Default redirect to login */}
        <Route path="/" element={<Login />} />
        
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
          <Route path="/employee/employeeview/:index" element={
          <PrivateRoute>
            <Layout><EmployeeView /></Layout>
          </PrivateRoute>
        } />

          <Route path="/employee/employeeedit/:index" element={
          <PrivateRoute>
            <Layout><EmployeeEdit /></Layout>
          </PrivateRoute>
        } />
        <Route
          path="/employee/employeeadd"
          element={
            <PrivateRoute>
              <Layout><EmployeeAdd /></Layout>
            </PrivateRoute>
          }
          />

          {/* Supplier routes */}
          <Route path="/supplier" element={
            <PrivateRoute>
              <Layout><SuplierList /></Layout>
            </PrivateRoute>
          } />
          <Route
          path="/supplier/supplieradd"
          element={
            <PrivateRoute>
              <Layout><SupplierAdd /></Layout>
            </PrivateRoute>
          }
          />
      </Routes>
      </Router>
      </ThemeProvider>
  );
}

export default App;
