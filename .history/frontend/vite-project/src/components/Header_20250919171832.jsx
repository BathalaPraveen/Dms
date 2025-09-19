import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import profile from "../assets/profile.png";

export default function Header({ toggleSidebar }) {
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user")) || { name: "John Doe" };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      {/* Left: Sidebar toggle */}
      <div className="d-flex align-items-center">
        <button
          className="btn text-dark ms-3 "
          onClick={toggleSidebar}
        >
          ☰
        </button>
      </div>
      {/* Right: Profile */}
      <div className="ms-auto me-4">
        <div className="dropdown mx-4">
          <button
            className="btn btn-light d-flex align-items-center"
            onClick={() => setOpen(!open)}
          >
            <img
              src={profile}
              alt="profile"
              className="rounded-circle me-2"
              width="40"
              height="40"
            />
            <span className="fw-semibold">{user.name}</span>
          </button>

          {open && (
            <ul className="dropdown-menu dropdown-menu-end show mt-2 shadow "style={{ minWidth: "120px" }}>
              <li>
                <NavLink className="dropdown-item d-flex align-items-center mb-2" to="/profile">
                  <FaUser className="me-2" /> My Profile
                </NavLink>
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
  );
}
