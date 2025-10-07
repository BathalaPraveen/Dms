import React, { useState, useEffect } from "react";
import { FaSave, FaTimes, FaLock } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
export default function ProfileModal({ show, onClose }) {
  const [tab, setTab] = useState("profile");
  const [user, setUser] = useState({ id: "", name: "", email: "", phone: "" });
  const [pwdForm, setPwdForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [pwdErrors, setPwdErrors] = useState({});
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  const { t } = useTranslation();

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
    if (!user.name) newErrors.name = t("profile.namerequired");
    if (!user.email) newErrors.email = t("profile.emailrequired");
    else if (!/\S+@\S+\.\S+/.test(user.email)) newErrors.email = t("profile.validemail");
    if (!user.phone) newErrors.phone = t("profile.phonerequired");
    else if (!/^[0-9]{10}$/.test(user.phone)) newErrors.phone = t("profile.phoneformat");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    let newErrors = {};
    if (!pwdForm.currentPassword) newErrors.currentPassword = t("profile.currentpasswordrequired");
    if (!pwdForm.newPassword) newErrors.newPassword = t("profile.newpasswordrequired");
    else if (pwdForm.newPassword.length < 6) newErrors.newPassword = t("profile.newpasswordminlength");
    if (pwdForm.newPassword !== pwdForm.confirmPassword) newErrors.confirmPassword = t("profile.passwordsmatch");
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
        // Apply dark mode styles here
        background: darkMode ? "#343a40" : "#fff",
        color: darkMode ? "#f8f9fa" : "#212529",
        border: `1px solid ${darkMode ? "#495057" : "#ccc"}`,
        borderRadius: "5px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        padding: "10px"
      }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <strong>{t("profile.myprofile")}</strong>
        {/* Use conditional classes for the Close button */}
        <button className={`btn btn-sm ${darkMode ? "btn-dark text-white" : "btn-light"}`} onClick={onClose}><FaTimes /></button>
      </div>

      {msg && (
        <div style={{
          // Apply dark mode styles for the message box
          background: darkMode ? "#495057" : "#f0f0f0",
          color: darkMode ? "#f8f9fa" : "#212529",
          padding: "5px",
          marginBottom: "10px"
        }}>{msg}</div>
      )}

      {/* Tabs */}
      <div className="d-flex mb-2">
        {/* Conditional classes for the tab buttons */}
        <button className={`btn btn-sm me-2 ${tab === "profile" ? (darkMode ? "btn-info" : "btn-primary") : (darkMode ? "btn-secondary text-white" : "btn-light")}`} onClick={() => setTab("profile")}>{t("profile.profile")}</button>
        <button className={`btn btn-sm ${tab === "password" ? (darkMode ? "btn-warning" : "btn-warning") : (darkMode ? "btn-secondary text-white" : "btn-light")}`} onClick={() => setTab("password")}>{t("profile.changepassword")}</button>
      </div>

      {tab === "profile" ? (
        <div>
          <div className="mb-2">
            <label>{t("profile.name")}</label>
            <input className={`form-control form-control-sm ${darkMode ? "bg-dark text-white border-secondary" : ""}`} value={user.name} name="name" onChange={handleChange} />
            {errors.name && <div style={{ color: "red", fontSize: "12px" }}>{errors.name}</div>}
          </div>
          <div className="mb-2">
            <label>{t("profile.email")}</label>
            <input className={`form-control form-control-sm ${darkMode ? "bg-dark text-white border-secondary" : ""}`} value={user.email} name="email" onChange={handleChange} />
            {errors.email && <div style={{ color: "red", fontSize: "12px" }}>{errors.email}</div>}
          </div>
          <div className="mb-2">
            <label>{t("profile.phone")}</label>
            <input className={`form-control form-control-sm ${darkMode ? "bg-dark text-white border-secondary" : ""}`} value={user.phone} name="phone" onChange={handleChange} />
            {errors.phone && <div style={{ color: "red", fontSize: "12px" }}>{errors.phone}</div>}
          </div>
          <div className="d-flex justify-content-between mt-2">
            <button className={`btn btn-sm ${darkMode ? "btn-dark text-white border-secondary" : "btn-secondary"}`} onClick={onClose}><FaTimes /> {t("profile.close")}</button>
            <button className={`btn btn-sm ${darkMode ? "btn-info" : "btn-primary"}`} onClick={handleSave}><FaSave /> {t("profile.save")}</button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-2">
            <label>{t("profile.currentpassword")}</label>
            <input type="password" className={`form-control form-control-sm ${darkMode ? "bg-dark text-white border-secondary" : ""}`} value={pwdForm.currentPassword} name="currentPassword" onChange={handlePwdChange} />
            {pwdErrors.currentPassword && <div style={{ color: "red", fontSize: "12px" }}>{pwdErrors.currentPassword}</div>}
          </div>
          <div className="mb-2">
            <label>{t("profile.newpassword")}</label>
            <input type="password" className={`form-control form-control-sm ${darkMode ? "bg-dark text-white border-secondary" : ""}`} value={pwdForm.newPassword} name="newPassword" onChange={handlePwdChange} />
            {pwdErrors.newPassword && <div style={{ color: "red", fontSize: "12px" }}>{pwdErrors.newPassword}</div>}
          </div>
          <div className="mb-2">
            <label>{t("profile.confirmpassword")}</label>
            <input type="password" className={`form-control form-control-sm ${darkMode ? "bg-dark text-white border-secondary" : ""}`} value={pwdForm.confirmPassword} name="confirmPassword" onChange={handlePwdChange} />
            {pwdErrors.confirmPassword && <div style={{ color: "red", fontSize: "12px" }}>{pwdErrors.confirmPassword}</div>}
          </div>
          <div className="d-flex justify-content-between mt-2">
            <button className={`btn btn-sm ${darkMode ? "btn-dark text-white border-secondary" : "btn-secondary"}`} onClick={onClose}><FaTimes /> {t("profile.close")}</button>
            <button className={`btn btn-sm ${darkMode ? "btn-warning" : "btn-warning"}`} onClick={handleChangePassword}><FaLock /> {t("profile.change")}</button>
          </div>
        </div>
      )}
    </div>
  );
}