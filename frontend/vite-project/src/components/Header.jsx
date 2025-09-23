import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaSignOutAlt, FaMoon, FaSun } from "react-icons/fa";
import profileImg from "../assets/profile.png";
import ProfileModal from "./ProfileModal";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext"; // Import the custom hook

// The component no longer needs to accept darkMode or toggleTheme as props.
export default function Header({ toggleSidebar, setCollapsed }) {
  // Use the custom hook to access the theme state and toggle function directly
  const { darkMode, toggleTheme } = useTheme(); 

  const [open, setOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const user = JSON.parse(localStorage.getItem("user")) || { name: "John Doe" };
  const dropdownRef = useRef(null);
  const { i18n } = useTranslation();

  const handleSidebarToggle = () => {
    const isMobile = window.innerWidth < 992;
    toggleSidebar();
    if (isMobile) setCollapsed(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Language change handler
  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg shadow-sm sticky-top ${
          darkMode ? "navbar-dark bg-dark" : "navbar-light bg-white"
        }`}
      >
        <div className="d-flex align-items-center">
          <button
            className={`btn ms-3 ${darkMode ? "text-white" : "text-dark"}`}
            onClick={handleSidebarToggle}
          >
            ☰
          </button>
        </div>

        <div
          className="ms-auto me-4 d-flex align-items-center gap-3"
          ref={dropdownRef}
        >
          {/* Theme toggle */}
          <button
            className="btn btn-outline-secondary"
            onClick={toggleTheme} // This function is now from the context
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Language selector */}
          <select
            className={`form-select form-select-sm ${
              darkMode ? "bg-dark text-white border-light" : ""
            }`}
            style={{ width: "160px" }}
            value={i18n.language}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="ms">Bahasa Malaysia</option>
          </select>

          {/* Profile dropdown */}
          <div className="dropdown mx-4">
            <button
              className={`btn d-flex align-items-center ${
                darkMode ? "btn-dark text-white" : "btn-light"
              }`}
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
                className={`dropdown-menu dropdown-menu-end show mt-2 shadow ${
                  darkMode ? "bg-dark text-white" : ""
                }`}
                style={{ minWidth: "160px" }}
              >
                <li>
                  <button
                    className={`dropdown-item d-flex align-items-center mb-2 ${darkMode ? "bg-white text-dark":""}`}
                    onClick={() => {
                      setShowProfile(true);
                      setOpen(false);
                    }}
                  >
                    <FaUser className={`me-2 ${darkMode ? "bg-white text-dark":""}`} /> My Profile
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

      {showProfile && <ProfileModal show={showProfile} onClose={() => setShowProfile(false)} />}
    </>
  );
}