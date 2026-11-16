import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) =>
    `nav-link px-3 ${isActive ? 'active fw-semibold' : ''}`;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark main-navbar sticky-top">
      <div className="container">

        {/* Logo and Brand */}
        <Link className="navbar-brand d-flex align-items-center gap-2"
          to="/">
          <div className="brand-logo">S</div>
          <div>
            <span className="brand-name">Student Portal</span>
            <small className="brand-subtitle d-block">
              Management System
            </small>
          </div>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#studentNavbar"
          aria-controls="studentNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="studentNavbar">

          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">

            <li className="nav-item">
              <NavLink to="/" end className={navLinkClass}>
                Home
              </NavLink>
            </li>

            {user && (
              <li className="nav-item">
                <NavLink to="/show" className={navLinkClass}>
                  Students
                </NavLink>
              </li>
            )}

            {user?.role === 'admin' && (
              <li className="nav-item">
                <NavLink to="/add" className={navLinkClass}>
                  Add Student
                </NavLink>
              </li>
            )}

            {!user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className={navLinkClass}>
                    Login
                  </NavLink>
                </li>

                <li className="nav-item ms-lg-2">
                  <Link to="/register" className="btn btn-register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="user-info">
                    <span className="user-avatar">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                    <span>
                      {user.name}
                      <small className="d-block user-role">
                        {user.role}
                      </small>
                    </span>
                  </span>
                </li>

                <li className="nav-item ms-lg-2">
                  <button
                    className="btn btn-logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
