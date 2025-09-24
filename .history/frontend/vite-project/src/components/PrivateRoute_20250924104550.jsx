import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token"); // check if user is logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Wrap children in fragment to avoid hook issues
  return <>{children}</>;
}
