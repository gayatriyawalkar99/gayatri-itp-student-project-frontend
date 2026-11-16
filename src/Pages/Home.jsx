
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {

  const { user } = useAuth();

  return (
    <div className="home-page">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-lg-7">

              <span className="hero-tag">
                STUDENT ADMINISTRATION PORTAL
              </span>

              <h1>
                Welcome to <span>Student Management System</span>
              </h1>

              <p className="hero-description">
                A centralized platform to manage student information,
                maintain academic records and simplify student
                administration efficiently.
              </p>

              <div className="hero-buttons">

                {user ? (
                  <>
                    <Link to="/show" className="btn btn-primary-custom">
                      View Students
                    </Link>

                    {user.role === 'admin' && (
                      <Link to="/add" className="btn btn-outline-custom">
                        Add New Student
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn btn-primary-custom">
                      Get Started
                    </Link>

                    <Link to="/register" className="btn btn-outline-custom">
                      Create Account
                    </Link>
                  </>
                )}

              </div>
            </div>

            <div className="col-lg-5 text-center mt-5 mt-lg-0">
              <div className="hero-illustration">
                <div className="illustration-icon">🎓</div>
                <h3>Learn. Manage. Grow.</h3>
                <p>Your complete student management solution</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">

          <div className="section-heading text-center">
            <span>OUR SERVICES</span>
            <h2>Everything You Need in One Place</h2>
            <p>Manage student-related activities with ease.</p>
          </div>

          <div className="row g-4">

            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">👨‍🎓</div>
                <h4>Student Records</h4>
                <p>
                  Access and manage student details and
                  maintain organized student records.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">📚</div>
                <h4>Student Management</h4>
                <p>
                  Add, view and update student information
                  through a simple management interface.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">🔐</div>
                <h4>Secure Access</h4>
                <p>
                  Role-based access for administrators and
                  users to keep information protected.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>
          © {new Date().getFullYear()} Student Management System.
          All Rights Reserved.
        </p>
      </footer>

    </div>
  );
};

export default Home;
