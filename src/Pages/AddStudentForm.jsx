
import React, { useState } from 'react';
import API from '../Service/API';
import { useNavigate } from 'react-router-dom';
import './AddStudentForm.css';

const AddStudentForm = () => {

    const [student, setStudent] = useState({
        studName: "",
        studEmail: "",
        studCourse: "",
        studPhoto: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;

        setStudent(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setLoading(true);
            setError('');

            await API.post("/saveStudent", student);

            navigate('/show');

        } catch (err) {
            console.log(err);
            setError('Unable to save student details. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    function handlePhotoChange(e) {
        const file = e.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image file.");
            e.target.value = '';
            return;
        }

        // Optional size limit: 2 MB
        if (file.size > 2 * 1024 * 1024) {
            alert("Image size should be less than 2 MB.");
            e.target.value = '';
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            setStudent(prev => ({
                ...prev,
                studPhoto: reader.result
            }));
        };

        reader.readAsDataURL(file);
    }

    function removePhoto() {
        setStudent(prev => ({
            ...prev,
            studPhoto: ""
        }));

        const fileInput = document.getElementById('studentPhoto');
        if (fileInput) fileInput.value = '';
    }

    return (
        <div className="add-student-page">

            <div className="add-student-container">

                <div className="add-student-heading">
                    <span className="add-student-label">
                        STUDENT MANAGEMENT SYSTEM
                    </span>

                    <h2>Add New Student</h2>

                    <p>Enter student information to create a new profile</p>
                </div>

                <div className="add-student-card">

                    <div className="add-student-card-header">
                        <h4>Student Information</h4>
                        <p>Fill in the details below</p>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="add-student-form-body">

                            {error && (
                                <div className="add-student-error">
                                    {error}
                                </div>
                            )}

                            <div className="add-form-group">
                                <label htmlFor="studName">
                                    Full Name <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    id="studName"
                                    name="studName"
                                    className="form-control"
                                    placeholder="Enter student name"
                                    value={student.studName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="add-form-group">
                                <label htmlFor="studEmail">
                                    Email Address <span>*</span>
                                </label>

                                <input
                                    type="email"
                                    id="studEmail"
                                    name="studEmail"
                                    className="form-control"
                                    placeholder="Enter email address"
                                    value={student.studEmail}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="add-form-group">
                                <label htmlFor="studCourse">
                                    Course <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    id="studCourse"
                                    name="studCourse"
                                    className="form-control"
                                    placeholder="Enter course name"
                                    value={student.studCourse}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="add-form-group">
                                <label>Profile Photo</label>

                                <div className="add-photo-section">

                                    <div className="add-photo-preview">
                                        {student.studPhoto ? (
                                            <img
                                                src={student.studPhoto}
                                                alt="Student preview"
                                            />
                                        ) : (
                                            <div className="add-photo-placeholder">
                                                <span>👤</span>
                                                <small>No Photo</small>
                                            </div>
                                        )}
                                    </div>

                                    <div className="add-photo-upload">
                                        <input
                                            type="file"
                                            id="studentPhoto"
                                            accept="image/*"
                                            className="form-control"
                                            onChange={handlePhotoChange}
                                        />

                                        <small>
                                            JPG, PNG or other image formats. Maximum 2 MB.
                                        </small>

                                        {student.studPhoto && (
                                            <button
                                                type="button"
                                                className="remove-photo-btn"
                                                onClick={removePhoto}
                                            >
                                                Remove Photo
                                            </button>
                                        )}
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div className="add-student-footer">

                            <button
                                type="button"
                                className="add-cancel-btn"
                                onClick={() => navigate('/show')}
                                disabled={loading}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="add-submit-btn"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Save Student'}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default AddStudentForm;
