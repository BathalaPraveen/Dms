// src/components/Header.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import profileImg from "../assets/profile.png";
import ProfileModal from "./ProfileModal";
import { useTranslation } from "react-i18next"; // <-- import translation hook

export default function Header({ toggleSidebar, setCollapsed }) {
  const [open, setOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const user = JSON.parse(localStorage.getItem("user")) || { name: "John Doe" };
  const dropdownRef = useRef(null);
  const {i18n} = useTranslation(); 

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
    i18n.changeLanguage(e.target.value); // change language globally
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="d-flex align-items-center">
          <button className="btn text-dark ms-3" onClick={handleSidebarToggle}>☰</button>
        </div>

        <div className="ms-auto me-4 d-flex align-items-center gap-3 " ref={dropdownRef}>
          {/* Language selector */}
          <select
            className="form-select form-select-sm"
            style={{ width: "160px" }}
            value={i18n.language} 
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="ms">Bahasa Malaysia</option>
          </select>

          {/* Profile dropdown */}
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

      {showProfile && <ProfileModal show={showProfile} onClose={() => setShowProfile(false)} />}
    </>
  );
}
