// HeaderWithProfileModal.jsx
// Place this file in src/components/
// NOTE: adjust the `profileImg` import path to match your project assets.

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import profileImg from "../assets/profile.png";

/*
  This single-file component contains:
  - ProfileModal: A lightweight modal that shows user profile info and a Change Password tab
  - Header (default export): your header that opens the Profile modal when "My Profile" is clicked

  Behavior:
  - Reads `user` from localStorage (key: "user") and pre-fills profile fields.
  - Tries to POST to /api/user/update and /api/user/change-password; if those endpoints are not present, it will fallback to localStorage updates for demo only.
  - IMPORTANT: Do NOT store plaintext passwords in localStorage in real apps. The fallback behavior is only for quick local testing.
*/

function ProfileModal({ show, onClose }) {
  const [tab, setTab] = useState("profile");
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [pwdForm, setPwdForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (show) {
      const stored = JSON.parse(localStorage.getItem("user")) || {};
      setUser(prev => ({ ...prev, ...stored }));
      setMsg(null);
      setPwdForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    }
  }, [show]);

  const handleChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setLoading(true);
    setMsg(null);
    try {
      // Try server update first (change URL to your real endpoint and add auth headers if needed)
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        const data = await res.json();
        // assume server returns updated user object in data.user
        localStorage.setItem("user", JSON.stringify(data.user || user));
        setMsg("Profile updated successfully.");
      } else {
        // if server returns non-OK, fallback to localStorage for demo
        localStorage.setItem("user", JSON.stringify(user));
        setMsg("Profile saved locally (server return non-OK).");
      }
    } catch (err) {
      // no server available -> fallback to localStorage (demo use only)
      localStorage.setItem("user", JSON.stringify(user));
      setMsg("Profile saved locally (offline/demo).");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    // simple client-side validation
    if (pwdForm.newPassword.length < 6) {
      setMsg("New password must be at least 6 characters.");
      return;
    }
    if (pwdForm.newPassword !== pwdForm.confirmPassword) {
      setMsg("New password and confirm password do not match.");
      return;
    }

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
      // fallback demo behavior (only for local testing): check localStorage stored password
      const stored = JSON.parse(localStorage.getItem("user")) || {};
      if (stored.password && stored.password === pwdForm.currentPassword) {
        stored.password = pwdForm.newPassword; // insecure demo only
        localStorage.setItem("user", JSON.stringify(stored));
        setMsg("Password changed locally (demo only).");
        setPwdForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setMsg("Password change failed (no server). Ensure current password is correct.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal-backdrop"
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1050 }}
    >
      <div className="card" style={{ width: "520px", maxWidth: "95%" }}>
        <div className="card-header d-flex justify-content-between align-items-center">
          <strong>My Profile</strong>
          <button className="btn-close" onClick={onClose}></button>
        </div>
        <div className="card-body">
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <button className={`nav-link ${tab === "profile" ? "active" : ""}`} onClick={() => setTab("profile")}>Profile</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${tab === "password" ? "active" : ""}`} onClick={() => setTab("password")}>Change Password</button>
            </li>
          </ul>

          {msg && <div className="alert alert-info">{msg}</div>}

          {tab === "profile" ? (
            <div>
              <div className="d-flex mb-3">
                <img src={profileImg} alt="avatar" width="72" height="72" className="rounded-circle me-3" />
                <div>
                  <h5>{user.name || "User"}</h5>
                  <small className="text-muted">{user.email}</small>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Name</label>
                <input className="form-control" name="name" value={user.name || ""} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input className="form-control" name="email" value={user.email || ""} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input className="form-control" name="phone" value={user.phone || ""} onChange={handleChange} />
              </div>

              <div className="text-end">
                <button className="btn btn-secondary me-2" onClick={onClose}>Close</button>
                <button className="btn btn-primary" onClick={handleSave} disabled={loading}>{loading ? "Saving..." : "Save Changes"}</button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-3">
                <label className="form-label">Current Password</label>
                <input type="password" className="form-control" value={pwdForm.currentPassword} onChange={e => setPwdForm({ ...pwdForm, currentPassword: e.target.value })} />
              </div>

              <div className="mb-3">
                <label className="form-label">New Password</label>
                <input type="password" className="form-control" value={pwdForm.newPassword} onChange={e => setPwdForm({ ...pwdForm, newPassword: e.target.value })} />
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm New Password</label>
                <input type="password" className="form-control" value={pwdForm.confirmPassword} onChange={e => setPwdForm({ ...pwdForm, confirmPassword: e.target.value })} />
              </div>

              <div className="text-end">
                <button className="btn btn-secondary me-2" onClick={onClose}>Close</button>
                <button className="btn btn-warning" onClick={handleChangePassword} disabled={loading}>{loading ? "Please wait..." : "Change Password"}</button>
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
  const user = JSON.parse(localStorage.getItem("user")) || { name: "John Doe" };

  const handleSidebarToggle = () => {
    const isMobile = window.innerWidth < 992;
    toggleSidebar();
    if (isMobile) setCollapsed(true);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="d-flex align-items-center">
          <button className="btn text-dark ms-3" onClick={handleSidebarToggle}>☰</button>
        </div>

        <div className="ms-auto me-4">
          <div className="dropdown mx-4">
            <button className="btn btn-light d-flex align-items-center" onClick={() => setOpen(!open)}>
              <img src={profileImg} alt="profile" className="rounded-circle me-2" width="40" height="40" />
              <span className="fw-semibold">{user.name}</span>
            </button>

            {open && (
              <ul className="dropdown-menu dropdown-menu-end show mt-2 shadow" style={{ minWidth: "160px" }}>
                <li>
                  <button className="dropdown-item d-flex align-items-center mb-2" onClick={() => { setShowProfile(true); setOpen(false); }}>
                    <FaUser className="me-2" /> My Profile
                  </button>
                </li>
                <li>
                  <button className="dropdown-item text-danger d-flex align-items-center" onClick={() => { localStorage.clear(); window.location.href = "/login"; }}>
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
