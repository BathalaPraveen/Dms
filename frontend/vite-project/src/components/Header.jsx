import React, { useState, useRef } from "react";
import { FaUser, FaSignOutAlt, FaMoon, FaSun, FaBars,FaTh  } from "react-icons/fa";
import profileImg from "../assets/profile.png";
import ProfileModal from "./ProfileModal";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import Clock from "../contexts/Clock";

export default function Header({ toggleSidebar, setCollapsed }) {
  const { darkMode, toggleTheme } = useTheme();
  const [showProfile, setShowProfile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const { t, i18n } = useTranslation();
  const user = JSON.parse(localStorage.getItem("user")) || { name: "John Doe" };
  const dropdownRef = useRef(null);

  const handleLanguageChange = (e) => i18n.changeLanguage(e.target.value);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <>
      <nav
        className={`navbar shadow-sm sticky-top ${
          darkMode ? "navbar-dark bg-dark" : "navbar-light bg-white"
        }`}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between">
          {/* Sidebar / Hamburger toggle */}
          <div className="d-flex align-items-center gap-2">
            <button
              className={`btn ${darkMode ? "text-white" : "text-dark"}`}
              onClick={toggleSidebar}
            >
                <FaBars />
            </button>

            {/* Mobile Hamburger for offcanvas menu */}
            <button
              className="btn d-lg-none"
              onClick={() => setShowOffcanvas(true)}
            >
               <FaTh  size={20} /> 
            </button>
          </div>

          {/* Desktop items */}
          <div className="d-none d-lg-flex align-items-center gap-2">
            <button
              className="btn btn-outline-secondary"
              onClick={toggleTheme}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            <select
              className={`form-select form-select-sm ${
                darkMode ? "bg-dark text-white border-light" : ""
              }`}
              style={{ width: "140px" }}
              value={i18n.language}
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="ms">Bahasa Malaysia</option>
            </select>

            <Clock darkMode={darkMode} />

            {/* Profile dropdown */}
            <div className="dropdown" ref={dropdownRef}>
              <button
                className={`btn d-flex align-items-center ${
                  darkMode ? "btn-dark text-white" : "btn-light"
                }`}
                onClick={() => setOpenDropdown(!openDropdown)}
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
              {openDropdown && (
                <ul
                  className={`dropdown-menu dropdown-menu-end show mt-2 shadow ${
                    darkMode ? "bg-dark text-white" : ""
                  }`}
                  style={{ minWidth: "160px" }}
                >
                  <li>
                    <button
                      className={`dropdown-item d-flex align-items-center mb-2`}
                      onClick={() => {
                        setShowProfile(true);
                        setOpenDropdown(false);
                      }}
                    >
                      <FaUser className="me-2" /> {t("profile.myprofile")}
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger d-flex align-items-center"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className="me-2" /> {t("profile.logout")}
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Offcanvas Menu */}
      {showOffcanvas && (
        <div
          className={`offcanvas offcanvas-start show ${darkMode ? "bg-dark text-white" : ""}`}
          style={{ width: "250px", zIndex: 1050 }}
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Menu</h5>
            <button
              type="button"
              className="btn-close text-reset"
              onClick={() => setShowOffcanvas(false)}
            ></button>
          </div>
          <div className="offcanvas-body d-flex flex-column gap-3">
            <button
              className="btn btn-outline-secondary"
              onClick={toggleTheme}
            >
              {darkMode ? <FaSun /> : <FaMoon />} Theme
            </button>

            <select
              className={`form-select ${darkMode ? "bg-dark text-white border-light" : ""}`}
              value={i18n.language}
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="ms">Bahasa Malaysia</option>
            </select>

            <Clock darkMode={darkMode} />

            {/* Mobile Profile */}
            <div className="dropdown" ref={dropdownRef}>
              <button
                className={`btn d-flex align-items-center ${
                  darkMode ? "btn-dark text-white" : "btn-light"
                }`}
                onClick={() => setOpenDropdown(!openDropdown)}
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
              {openDropdown && (
                <ul
                  className={`dropdown-menu show mt-2 shadow ${
                    darkMode ? "bg-dark text-white" : ""
                  }`}
                  style={{ minWidth: "160px" }}
                >
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center mb-2"
                      onClick={() => {
                        setShowProfile(true);
                        setOpenDropdown(false);
                        setShowOffcanvas(false);
                      }}
                    >
                      <FaUser className="me-2" /> {t("profile.myprofile")}
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger d-flex align-items-center"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className="me-2" /> {t("profile.logout")}
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {showProfile && <ProfileModal show={showProfile} onClose={() => setShowProfile(false)} />}
    </>
  );
}
