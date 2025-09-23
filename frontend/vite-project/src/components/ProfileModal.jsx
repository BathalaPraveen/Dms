// src/components/ProfileModal.jsx
import React, { useState, useEffect } from "react";
import { FaSave, FaTimes, FaLock } from "react-icons/fa";

export default function ProfileModal({ show, onClose }) {
  const [tab, setTab] = useState("profile");
  const [user, setUser] = useState({ id: "", name: "", email: "", phone: "" });
  const [pwdForm, setPwdForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [pwdErrors, setPwdErrors] = useState({});
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      const stored = JSON.parse(localStorage.getItem("user")) || {};
      setUser({ ...stored });
      setPwdForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setErrors({});
      setPwdErrors({});
      setMsg(null);
    }
  }, [show]);

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const handlePwdChange = (e) => setPwdForm({ ...pwdForm, [e.target.name]: e.target.value });

  const validateProfile = () => {
    let newErrors = {};
    if (!user.name) newErrors.name = "Name is required";
    if (!user.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(user.email)) newErrors.email = "Enter a valid email";
    if (!user.phone) newErrors.phone = "Phone is required";
    else if (!/^[0-9]{10}$/.test(user.phone)) newErrors.phone = "Phone must be 10 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    let newErrors = {};
    if (!pwdForm.currentPassword) newErrors.currentPassword = "Current password is required";
    if (!pwdForm.newPassword) newErrors.newPassword = "New password is required";
    else if (pwdForm.newPassword.length < 6) newErrors.newPassword = "New password must be at least 6 characters";
    if (pwdForm.newPassword !== pwdForm.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setPwdErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateProfile()) return;
    setLoading(true); setMsg(null);
    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("user", JSON.stringify(data.user || user));
        setMsg("Profile updated successfully.");
      } else {
        localStorage.setItem("user", JSON.stringify(user));
        setMsg("Profile saved locally (server error).");
      }
    } catch {
      localStorage.setItem("user", JSON.stringify(user));
      setMsg("Profile saved locally (offline/demo).");
    } finally { setLoading(false); }
  };

  const handleChangePassword = async () => {
    if (!validatePassword()) return;
    setLoading(true); setMsg(null);
    try {
      const res = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pwdForm),
      });
      if (res.ok) {
        setMsg("Password changed successfully.");
        setPwdForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        const e = await res.json().catch(() => ({ message: "Server error" }));
        setMsg(e.message || "Password change failed.");
      }
    } catch {
      setMsg("Password change failed (offline/demo).");
    } finally { setLoading(false); }
  };

  if (!show) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "60px",
        right: "20px",
        width: "320px",
        zIndex: 1100,
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        padding: "10px"
      }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <strong>My Profile</strong>
        <button className="btn btn-light btn-sm" onClick={onClose}><FaTimes /></button>
      </div>

      {msg && <div style={{ background: "#f0f0f0", padding: "5px", marginBottom: "10px" }}>{msg}</div>}

      {/* Tabs */}
      <div className="d-flex mb-2">
        <button className={`btn btn-sm me-2 ${tab === "profile" ? "btn-primary" : "btn-light"}`} onClick={() => setTab("profile")}>Profile</button>
        <button className={`btn btn-sm ${tab === "password" ? "btn-warning" : "btn-light"}`} onClick={() => setTab("password")}>Change Password</button>
      </div>

      {tab === "profile" ? (
        <div>
          <div className="mb-2">
            <label>Name</label>
            <input className="form-control form-control-sm" value={user.name} name="name" onChange={handleChange} />
            {errors.name && <div style={{ color: "red", fontSize: "12px" }}>{errors.name}</div>}
          </div>
          <div className="mb-2">
            <label>Email</label>
            <input className="form-control form-control-sm" value={user.email} name="email" onChange={handleChange} />
            {errors.email && <div style={{ color: "red", fontSize: "12px" }}>{errors.email}</div>}
          </div>
          <div className="mb-2">
            <label>Phone</label>
            <input className="form-control form-control-sm" value={user.phone} name="phone" onChange={handleChange} />
            {errors.phone && <div style={{ color: "red", fontSize: "12px" }}>{errors.phone}</div>}
          </div>
          <div className="d-flex justify-content-between mt-2">
            <button className="btn btn-secondary btn-sm" onClick={onClose}><FaTimes /> Close</button>
            <button className="btn btn-primary btn-sm" onClick={handleSave}><FaSave /> Save</button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-2">
            <label>Current Password</label>
            <input type="password" className="form-control form-control-sm" value={pwdForm.currentPassword} name="currentPassword" onChange={handlePwdChange} />
            {pwdErrors.currentPassword && <div style={{ color: "red", fontSize: "12px" }}>{pwdErrors.currentPassword}</div>}
          </div>
          <div className="mb-2">
            <label>New Password</label>
            <input type="password" className="form-control form-control-sm" value={pwdForm.newPassword} name="newPassword" onChange={handlePwdChange} />
            {pwdErrors.newPassword && <div style={{ color: "red", fontSize: "12px" }}>{pwdErrors.newPassword}</div>}
          </div>
          <div className="mb-2">
            <label>Confirm Password</label>
            <input type="password" className="form-control form-control-sm" value={pwdForm.confirmPassword} name="confirmPassword" onChange={handlePwdChange} />
            {pwdErrors.confirmPassword && <div style={{ color: "red", fontSize: "12px" }}>{pwdErrors.confirmPassword}</div>}
          </div>
          <div className="d-flex justify-content-between mt-2">
            <button className="btn btn-secondary btn-sm" onClick={onClose}><FaTimes /> Close</button>
            <button className="btn btn-warning btn-sm" onClick={handleChangePassword}><FaLock /> Change</button>
          </div>
        </div>
      )}
    </div>
  );
}
