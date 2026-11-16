
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import API from '../Service/API';
import './ViewStudentForm.css';

const ViewStudentForm = () => {
    const [stud, setStud] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { id } = useParams();

    async function fetchStudentData() {
        try {
            setLoading(true);
            setError('');

            const response = await API.get(`/getSingleStudent/${id}`);
            setStud(response.data);

        } catch (err) {
            console.log(err);
            setError('Unable to load student details. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchStudentData();
    }, [id]);

    if (loading) {
        return (
            <div className="view-loading">
                <div className="spinner-border" role="status"></div>
                <p>Loading student details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="view-error">
                <h4>Something went wrong</h4>
                <p>{error}</p>
                <button className="view-retry-btn" onClick={fetchStudentData}>
                    Try Again
                </button>
                <Link to="/show" className="view-back-link">
                    Back to Students
                </Link>
            </div>
        );
    }

    return (
        <div className="view-student-page">

            <div className="view-student-container">

                <div className="view-student-heading">
                    <span className="view-label">STUDENT MANAGEMENT SYSTEM</span>
                    <h2>Student Profile</h2>
                    <p>View complete student information</p>
                </div>

                <div className="view-student-card">

                    <div className="view-profile-header">
                        <div className="view-photo-wrapper">
                            {stud.studPhoto ? (
                                <img
                                    src={stud.studPhoto}
                                    alt={stud.studName || 'Student'}
                                    className="view-student-photo"
                                />
                            ) : (
                                <div className="view-photo-placeholder">
                                    {stud.studName?.charAt(0)?.toUpperCase() || 'S'}
                                </div>
                            )}
                        </div>

                        <h3>{stud.studName || 'Student Name'}</h3>
                        <span className="view-profile-badge">Student</span>
                    </div>

                    <div className="view-details-section">

                        <div className="view-detail-item">
                            <div className="view-detail-icon">👤</div>
                            <div>
                                <span>Full Name</span>
                                <h5>{stud.studName || 'Not available'}</h5>
                            </div>
                        </div>

                        <div className="view-detail-item">
                            <div className="view-detail-icon">✉</div>
                            <div>
                                <span>Email Address</span>
                                <h5>{stud.studEmail || 'Not available'}</h5>
                            </div>
                        </div>

                        <div className="view-detail-item">
                            <div className="view-detail-icon">📚</div>
                            <div>
                                <span>Course</span>
                                <h5>{stud.studCourse || 'Not available'}</h5>
                            </div>
                        </div>

                    </div>

                    <div className="view-card-footer">
                        <Link to="/show" className="view-back-btn">
                            ← Back to All Students
                        </Link>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default ViewStudentForm;
