import { useState, useEffect } from "react";
import { FaSave, FaTimes, FaLock } from "react-icons/fa";

export default function ProfileModal({ show, onClose }) {
  const [user, setUser] = useState({ id: "", name: "", email: "", phone: "" });
  const [pwdForm, setPwdForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  // Load user from localStorage
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
        setMsg("✅ Profile updated successfully.");
      } else {
        localStorage.setItem("user", JSON.stringify(user));
        setMsg("⚠️ Profile saved locally (server returned non-OK).");
      }
    } catch (err) {
      localStorage.setItem("user", JSON.stringify(user));
      setMsg("⚠️ Profile saved locally (offline/demo).");
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
        setMsg("✅ Password changed successfully.");
        setPwdForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        const e = await res.json().catch(() => ({ message: "Server error" }));
        setMsg("⚠️ " + (e.message || "Password change failed."));
      }
    } catch (err) {
      setMsg("⚠️ Password change failed (no server).");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">My Profile</h5>
            <button className="btn btn-light d-flex align-items-center" onClick={onClose}>
              <FaTimes className="me-2" /> Close
            </button>
          </div>

          {/* Body */}
          <div className="modal-body">
            {msg && <div className="alert alert-info">{msg}</div>}

            {/* Profile Form */}
            <h6 className="fw-bold">Update Profile</h6>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                name="name"
                value={user.name}
                onChange={handleChange}
                className="form-control"
              />
              {errors.name && <div className="text-danger small">{errors.name}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                name="email"
                value={user.email}
                onChange={handleChange}
                className="form-control"
              />
              {errors.email && <div className="text-danger small">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="form-control"
              />
              {errors.phone && <div className="text-danger small">{errors.phone}</div>}
            </div>
            <button
              className="btn btn-primary d-flex align-items-center"
              onClick={handleSave}
              disabled={loading}
            >
              <FaSave className="me-2" /> Save Changes
            </button>

            <hr />

            {/* Password Form */}
            <h6 className="fw-bold">Change Password</h6>
            <div className="mb-3">
              <label className="form-label">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={pwdForm.currentPassword}
                onChange={handlePwdChange}
                className="form-control"
              />
              {errors.currentPassword && <div className="text-danger small">{errors.currentPassword}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={pwdForm.newPassword}
                onChange={handlePwdChange}
                className="form-control"
              />
              {errors.newPassword && <div className="text-danger small">{errors.newPassword}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={pwdForm.confirmPassword}
                onChange={handlePwdChange}
                className="form-control"
              />
              {errors.confirmPassword && <div className="text-danger small">{errors.confirmPassword}</div>}
            </div>
            <button
              className="btn btn-warning text-dark d-flex align-items-center"
              onClick={handleChangePassword}
              disabled={loading}
            >
              <FaLock className="me-2" /> Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
