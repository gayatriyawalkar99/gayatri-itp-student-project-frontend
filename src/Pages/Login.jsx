
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';
import API from '../Service/API';

export default function Login() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setError('');
  }


  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await API.post('/userLogin', form);

      console.log(response.data);

      login({name:form.username})
      navigate('/show');

    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Login failed'
      );
    }
  }


  return (
    <div className="login-page">

      <div className="container">

        <div className="login-wrapper">

          <div className="row g-0 login-card">

            {/* Left Welcome Section */}
            <div className="col-lg-5">
              <div className="login-welcome">

                <div className="login-brand-icon">
                  🎓
                </div>

                <h2>Welcome Back!</h2>

                <p>
                  Access your Student Management Portal
                  and stay connected with your academic
                  information.
                </p>

                <div className="login-illustration">
                  <div className="illustration-circle">
                    📚
                  </div>
                  <h4>Learn. Manage. Grow.</h4>
                  <span>
                    Your journey to better academic management starts here.
                  </span>
                </div>

                <div className="welcome-footer">
                  Student Management System
                </div>

              </div>
            </div>

            {/* Right Login Form */}
            <div className="col-lg-7">
              <div className="login-form-section">

                <div className="login-heading">
                  <span>ACCOUNT ACCESS</span>
                  <h2>Login to Your Account</h2>
                  <p>
                    Enter your credentials to continue.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>

                  {/* Error Message */}
                  {error && (
                    <div className="login-error">
                      {error}
                    </div>
                  )}

                  <label htmlFor="username">
                    Username
                  </label>

                  <input
                    id="username"
                    type="text"
                    name="username"
                    className="form-control login-input"
                    placeholder="Enter your username"
                    value={form.username}
                    onChange={handleChange}
                    autoComplete="username"
                    required
                  />

                  {/* Password */}
                  <div className="login-input-group">
                    <label htmlFor="password">
                      Password
                    </label>

                    <div className="password-wrapper">
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        className="form-control login-input"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                      />

                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="login-submit-btn"
                    disabled={loading}
                  >
                    {loading ? 'Signing In...' : 'Login to Portal'}
                  </button>

                </form>

                <div className="login-divider">
                  <span>NEW TO OUR PORTAL?</span>
                </div>

                <p className="register-text">
                  Don't have an account?
                  <Link to="/register"> Create an account</Link>
                </p>

                <div className="login-security-note">
                  🔒 Secure access to your student account
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
