import { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); 

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      const toast = Swal.mixin({
          toast: true,
          position: "top-right",   // can try "bottom-right" also
          showConfirmButton: false,
          width: 400,
          showCloseButton: true,
          timer: 3000,
          timerProgressBar: true,
          background: "#fff",       // white clean background
          color: "#333",            // text color
          customClass: {
            popup: "rounded shadow-lg", // bootstrap like rounded toast
          },
          didOpen: (toastEl) => {
            toastEl.addEventListener("mouseenter", Swal.stopTimer);
            toastEl.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

      toast.fire({
        icon: "success",
        title: "You have successfully logged In!",
      });

      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      const toast = Swal.mixin({
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        showCloseButton: true,
        timer: 3000,
        background: "#fff", 
        color: "#333", 
        timerProgressBar: true,
        customClass: {
            popup: "rounded shadow-lg", // bootstrap like rounded toast
          },
        didOpen: (toastEl) => {
          toastEl.addEventListener("mouseenter", Swal.stopTimer);
          toastEl.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      toast.fire({
        icon: "error",
        title: err.response?.data?.msg || "Login failed!",
      });
    }
  };

  return (
    <div className="login-container">
<form className="login-form" onSubmit={handleSubmit}>
  <h2>Login</h2>

  <label htmlFor="email">Email</label>
  <input
    id="email"
    type="email"
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  {errors.email && <p className="error">{errors.email}</p>}

  <label htmlFor="password">Password</label>
  <div className="password-container">
    <input
      id="password"
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <span
      className="eye-icon"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>
  {errors.password && <p className="error">{errors.password}</p>}

  <button type="submit">Login</button>
</form>

    </div>
  );
}
