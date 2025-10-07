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
import SupplierList from "./supplier/SupplierList";
import SupplierView from "./supplier/SupplierView";
import SupplierImport from "./supplier/SupplierImport";
import SupplierEdit from "./supplier/SupplierEdit";
import SupplierEmp from "./supplier/SupplierEmp";
import SupplierEmpAdd from "./supplier/SupplierEmpAdd";
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
              <Layout><SupplierList /></Layout>
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
          <Route path="/supplier/supplierview/:index" element={
            <PrivateRoute>
              <Layout><SupplierView /></Layout>
            </PrivateRoute>
          } />
          <Route path="/supplier/import" element={
            <PrivateRoute>
              <Layout><SupplierImport /></Layout>
            </PrivateRoute>
          } />
          <Route path="/supplier/supplieredit/:index" element={
            <PrivateRoute>
              <Layout><SupplierEdit /></Layout>
            </PrivateRoute>
          } />
          <Route path="/supplier/supplieremp/:index" element={
            <PrivateRoute>
              <Layout><SupplierEmp /></Layout>
            </PrivateRoute>
          } />
          <Route path="/supplier/supplieremp/supempadd/:supplierIndex" element={
            <PrivateRoute>
              <Layout><SupplierEmpAdd /></Layout>
            </PrivateRoute>
          } />
          <Route path="/supplier/supplieremp/supempedit/:supplierIndex" element={
            <PrivateRoute>
              <Layout><SupplierEmpAdd /></Layout>
            </PrivateRoute>
          } />
      </Routes>
      </Router>
      </ThemeProvider>
  );
}

export default App;
