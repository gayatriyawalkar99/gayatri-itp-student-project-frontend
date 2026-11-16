
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import API from '../Service/API';

// const API = 'http://localhost:3000';

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: '',
    roles: []
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [availableRoles, setAvailableRoles] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  async function fetchRoles() {
    try {
      const response = await API.get('/getAllRoles');
      setAvailableRoles(response.data);
    } catch (error) {
      console.error(error);
      setError('Unable to load roles from server.');
    }
  }

  function handleRoleChange(roleId) {

    setForm(prev => ({
      ...prev,
      roles: prev.roles.includes(roleId)
        ? prev.roles.filter(id => id !== roleId)
        : [...prev.roles, roleId]
    }));

    setError('');
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setError('');
    setSuccess('');
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError('');
    setSuccess('');
    setLoading(true);

    try {
     

      // Create user account

      await API.post("/registerUser", form);

      

      setSuccess('Registration successful! You can now login to your account.');

      setForm({
        username: '',
        password: '',
        roles: []
      });

    } catch (error) {
      console.error(error);
      setError('Registration failed. Please check whether JSON Server is running.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-page">

      <div className="container">

        <div className="register-wrapper">

          <div className="row g-0 register-card">

            {/* Left Welcome Section */}
            <div className="col-lg-5">
              <div className="register-welcome">

                <div className="register-brand-icon">
                  🎓
                </div>

                <h2>Join Our Student Portal!</h2>

                <p>
                  Create your account and become a part
                  of our academic community. Manage your
                  student information easily.
                </p>

                <div className="register-illustration">
                  <div className="register-illustration-circle">
                    📖
                  </div>

                  <h4>Start Your Journey</h4>

                  <span>
                    One platform to manage your academic
                    information and student records.
                  </span>
                </div>

                <div className="register-welcome-footer">
                  Student Management System
                </div>

              </div>
            </div>

            {/* Right Registration Form */}
            <div className="col-lg-7">
              <div className="register-form-section">

                <div className="register-heading">
                  <span>NEW STUDENT ACCOUNT</span>

                  <h2>Create Your Account</h2>

                  <p>
                    Fill in the details below to register.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>

                  {/* Error Message */}
                  {error && (
                    <div className="register-error">
                      {error}
                    </div>
                  )}

                  {/* Success Message */}
                  {success && (
                    <div className="register-success">
                      {success}
                      <div className="mt-2">
                        <Link to="/login">
                          Login to your account
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Name */}
                  <div className="register-input-group">
                    <label htmlFor="name">
                      Username
                    </label>

                    <input
                      id="name"
                      type="text"
                      name="username"
                      className="form-control register-input"
                      placeholder="Enter Username"
                      value={form.username}
                      onChange={handleChange}
                      autoComplete="username"
                      required
                    />
                  </div>



                  {/* Password */}
                  <div className="register-input-group">
                    <label htmlFor="password">
                      Password
                    </label>

                    <div className="register-password-wrapper">
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        className="form-control register-input"
                        placeholder="Create a password"
                        value={form.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        minLength={6}
                        required
                      />

                      <button
                        type="button"
                        className="register-password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>

                    <small className="register-hint">
                      Password must contain at least 6 characters.
                    </small>
                  </div>

                  <div className="register-input-group">

                    <label>Select Roles</label>

                    <div className="register-roles">

                      {availableRoles.map(role => (
                        <div className="form-check" key={role.id}>

                          <input
                            type="checkbox"
                            id={`role-${role.id}`}
                            className="form-check-input"
                            checked={form.roles.includes(role.id)}
                            onChange={() => handleRoleChange(role.id)}
                          />

                          <label
                            className="form-check-label"
                            htmlFor={`role-${role.id}`}
                          >
                            {role.name}
                          </label>

                        </div>
                      ))}

                    </div>
                  </div>





                  {/* Register Button */}
                  <button
                    type="submit"
                    className="register-submit-btn"
                    disabled={loading}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>

                </form>

                {/* Login Link */}
                <div className="register-divider">
                  <span>ALREADY REGISTERED?</span>
                </div>

                <p className="register-login-text">
                  Already have an account?
                  <Link to="/login"> Login here</Link>
                </p>

                <div className="register-security-note">
                  🔒 Your account is protected with secure access.
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
