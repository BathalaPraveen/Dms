// HeaderWithProfileModal.jsx
// src/components/HeaderWithProfileModal.jsx

import React, { useState, useEffect } from "react";
import { FaSave, FaTimes, FaLock } from "react-icons/fa";
import { useState, useEffect } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import profileImg from "../assets/profile.png";

function ProfileModal({ show, onClose }) {
  const [tab, setTab] = useState("profile");
  const [user, setUser] = useState({ id: "", name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [pwdForm, setPwdForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [msg, setMsg] = useState(null);

  const [errors, setErrors] = useState({});
  const [pwdErrors, setPwdErrors] = useState({});

  useEffect(() => {
    if (show) {
      const stored = JSON.parse(localStorage.getItem("user")) || {};
      setUser((prev) => ({ ...prev, ...stored }));
      setMsg(null);
      setErrors({});
      setPwdErrors({});
      setPwdForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    }
  }, [show]);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  // --- Validation ---
  const validateProfile = () => {
    let newErrors = {};
    if (!user.name) newErrors.name = "Name is required";
    if (!user.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(user.email))
      newErrors.email = "Enter a valid email";
    if (!user.phone) newErrors.phone = "Phone is required";
    else if (!/^[0-9]{10}$/.test(user.phone))
      newErrors.phone = "Phone must be 10 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    let newErrors = {};
    if (!pwdForm.currentPassword)
      newErrors.currentPassword = "Current password is required";
    if (!pwdForm.newPassword)
      newErrors.newPassword = "New password is required";
    else if (pwdForm.newPassword.length < 6)
      newErrors.newPassword = "New password must be at least 6 characters";
    if (pwdForm.newPassword !== pwdForm.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setPwdErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Save Profile ---
  const handleSave = async () => {
    if (!validateProfile()) return;

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
        setMsg("Profile saved locally (server error).");
      }
    } catch (err) {
      localStorage.setItem("user", JSON.stringify(user));
      setMsg("Profile saved locally (offline/demo).");
    } finally {
      setLoading(false);
    }
  };

  // --- Change Password ---
  const handleChangePassword = async () => {
    if (!validatePassword()) return;

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
        setPwdForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        const e = await res.json().catch(() => ({ message: "Server error" }));
        setMsg(e.message || "Password change failed.");
      }
    } catch (err) {
      setMsg("Password change failed (offline/demo).");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal-backdrop"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1050,
      }}
    >
      <div className="card" style={{ width: "520px", maxWidth: "95%" }}>
        <div className="card-header d-flex justify-content-between align-items-center">
          <strong>My Profile</strong>
          <button className="btn-close" onClick={onClose}></button>
        </div>
        <div className="card-body">
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <button
                className={`nav-link ${tab === "profile" ? "active" : ""}`}
                onClick={() => setTab("profile")}
              >
                Profile
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${tab === "password" ? "active" : ""}`}
                onClick={() => setTab("password")}
              >
                Change Password
              </button>
            </li>
          </ul>

          {msg && <div className="alert alert-info">{msg}</div>}

          {tab === "profile" ? (
            <div>
              <div className="d-flex mb-3">
                <img
                  src={profileImg}
                  alt="avatar"
                  width="72"
                  height="72"
                  className="rounded-circle me-3"
                />
                <div>
                  <h5>{user.name || "User"}</h5>
                  <small className="text-muted">{user.email}</small>
                </div>
              </div>

              {/* Name */}
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  className="form-control"
                  name="name"
                  value={user.name || ""}
                  onChange={handleChange}
                />
                {errors.name && (
                  <div className="text-danger small">{errors.name}</div>
                )}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  name="email"
                  value={user.email || ""}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="text-danger small">{errors.email}</div>
                )}
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  className="form-control"
                  name="phone"
                  value={user.phone || ""}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <div className="text-danger small">{errors.phone}</div>
                )}
              </div>

              <div className="text-end">
                <button className="btn btn-secondary me-2" onClick={onClose}>
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Current Password */}
              <div className="mb-3">
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={pwdForm.currentPassword}
                  onChange={(e) =>
                    setPwdForm({ ...pwdForm, currentPassword: e.target.value })
                  }
                />
                {pwdErrors.currentPassword && (
                  <div className="text-danger small">
                    {pwdErrors.currentPassword}
                  </div>
                )}
              </div>

              {/* New Password */}
              <div className="mb-3">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={pwdForm.newPassword}
                  onChange={(e) =>
                    setPwdForm({ ...pwdForm, newPassword: e.target.value })
                  }
                />
                {pwdErrors.newPassword && (
                  <div className="text-danger small">
                    {pwdErrors.newPassword}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mb-3">
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={pwdForm.confirmPassword}
                  onChange={(e) =>
                    setPwdForm({ ...pwdForm, confirmPassword: e.target.value })
                  }
                />
                {pwdErrors.confirmPassword && (
                  <div className="text-danger small">
                    {pwdErrors.confirmPassword}
                  </div>
                )}
              </div>

              <div className="text-end">
                <button className="btn btn-secondary me-2" onClick={onClose}>
                  Close
                </button>
                <button
                  className="btn btn-warning"
                  onClick={handleChangePassword}
                  disabled={loading}
                >
                  {loading ? "Please wait..." : "Change Password"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Header({ toggleSidebar, setCollapsed }) {
  const [open, setOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "John Doe",
  };

  const handleSidebarToggle = () => {
    const isMobile = window.innerWidth < 992;
    toggleSidebar();
    if (isMobile) setCollapsed(true);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="d-flex align-items-center">
          <button
            className="btn text-dark ms-3"
            onClick={handleSidebarToggle}
          >
            ☰
          </button>
        </div>

        <div className="ms-auto me-4">
          <div className="dropdown mx-4">
            <button
              className="btn btn-light d-flex align-items-center"
              onClick={() => setOpen(!open)}
            >
              <img
                src={profileImg}
                alt="profile"
                className="rounded-circle me-2"
                width="40"
                height="40"
              />
              <span className="fw-semibold">{user.name}</span>
            </button>

            {open && (
              <ul
                className="dropdown-menu dropdown-menu-end show mt-2 shadow"
                style={{ minWidth: "160px" }}
              >
                <li>
                  <button
                    className="dropdown-item d-flex align-items-center mb-2"
                    onClick={() => {
                      setShowProfile(true);
                      setOpen(false);
                    }}
                  >
                    <FaUser className="me-2" /> My Profile
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item text-danger d-flex align-items-center"
                    onClick={() => {
                      localStorage.clear();
                      window.location.href = "/login";
                    }}
                  >
                    <FaSignOutAlt className="me-2" /> Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>

      <ProfileModal show={showProfile} onClose={() => setShowProfile(false)} />
    </>
  );
}
