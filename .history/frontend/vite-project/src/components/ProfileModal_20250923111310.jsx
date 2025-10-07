import { useState, useEffect } from "react";
import { FaSave, FaTimes, FaLock } from "react-icons/fa";

export default function ProfileModal({ show, onClose }) {
  const [user, setUser] = useState({ id: "", name: "", email: "", phone: "" });
  const [pwdForm, setPwdForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user")) || {};
    setUser(prev => ({ ...prev, ...stored }));
  }, [show]);

  const validateProfile = () => {
    let errs = {};
    if (!user.name) errs.name = "Name is required";
    if (!user.email) errs.email = "Email is required";
    if (!user.phone) errs.phone = "Phone is required";
    return errs;
  };

  const validatePassword = () => {
    let errs = {};
    if (!pwdForm.currentPassword) errs.currentPassword = "Current password is required";
    if (!pwdForm.newPassword) errs.newPassword = "New password is required";
    else if (pwdForm.newPassword.length < 6) errs.newPassword = "Must be at least 6 characters";
    if (pwdForm.newPassword !== pwdForm.confirmPassword) errs.confirmPassword = "Passwords do not match";
    return errs;
  };

  const handleChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  const handlePwdChange = e => setPwdForm({ ...pwdForm, [e.target.name]: e.target.value });

  const handleSave = async () => {
    const errs = validateProfile();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    setMsg(null);
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
        setMsg("Profile saved locally (server returned non-OK).");
      }
    } catch (err) {
      localStorage.setItem("user", JSON.stringify(user));
      setMsg("Profile saved locally (offline/demo).");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    const errs = validatePassword();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    setMsg(null);
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
    } catch (err) {
      setMsg("Password change failed (no server).");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.4)", zIndex: 1050 }}>
      <div className="card" style={{ width: "500px", padding: "15px", fontSize: "14px" }}>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <strong>My Profile</strong>
          <button className="btn btn-light btn-sm" onClick={onClose}><FaTimes /> Close</button>
        </div>

        {/* Alert */}
        {msg && <div style={{ background: "#f0f0f0", padding: "5px 10px", marginBottom: "10px" }}>{msg}</div>}

        {/* Profile Form */}
        <div className="mb-3">
          <label>Name</label>
          <input className="form-control form-control-sm" value={user.name} name="name" onChange={handleChange} />
          {errors.name && <div style={{ color: "red", fontSize: "12px" }}>{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input className="form-control form-control-sm" value={user.email} name="email" onChange={handleChange} />
          {errors.email && <div style={{ color: "red", fontSize: "12px" }}>{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label>Phone</label>
          <input className="form-control form-control-sm" value={user.phone} name="phone" onChange={handleChange} />
          {errors.phone && <div style={{ color: "red", fontSize: "12px" }}>{errors.phone}</div>}
        </div>

        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-primary btn-sm" onClick={handleSave}><FaSave /> Save Changes</button>
          <button className="btn btn-warning btn-sm" onClick={handleChangePassword}><FaLock /> Change Password</button>
        </div>

        {/* Password Form */}
        <div className="mb-3">
          <label>Current Password</label>
          <input type="password" className="form-control form-control-sm" value={pwdForm.currentPassword} name="currentPassword" onChange={handlePwdChange} />
          {errors.currentPassword && <div style={{ color: "red", fontSize: "12px" }}>{errors.currentPassword}</div>}
        </div>
        <div className="mb-3">
          <label>New Password</label>
          <input type="password" className="form-control form-control-sm" value={pwdForm.newPassword} name="newPassword" onChange={handlePwdChange} />
          {errors.newPassword && <div style={{ color: "red", fontSize: "12px" }}>{errors.newPassword}</div>}
        </div>
        <div className="mb-3">
          <label>Confirm Password</label>
          <input type="password" className="form-control form-control-sm" value={pwdForm.confirmPassword} name="confirmPassword" onChange={handlePwdChange} />
          {errors.confirmPassword && <div style={{ color: "red", fontSize: "12px" }}>{errors.confirmPassword}</div>}
        </div>
      </div>
    </div>
  );
}
