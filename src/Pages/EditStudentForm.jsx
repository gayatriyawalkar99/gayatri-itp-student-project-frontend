
import React, { useEffect, useState } from 'react';
import API from '../Service/API';
import { useNavigate, useParams } from 'react-router-dom';
import './EditStudentForm.css';

const EditStudentForm = () => {

    const [student, setStudent] = useState({
        name: "",
        email: "",
        course: "",
        photo: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    async function fetchStudentData() {
        try {
            setLoading(true);
            setError('');

            const response = await API.get(`/students/${id}`);
            setStudent(response.data);

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
            setSaving(true);
            setError('');

            await API.put(`/students/${id}`, student);

            navigate('/show');

        } catch (err) {
            console.log(err);
            setError('Unable to update student details. Please try again.');
        } finally {
            setSaving(false);
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

        if (file.size > 2 * 1024 * 1024) {
            alert("Image size should be less than 2 MB.");
            e.target.value = '';
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            setStudent(prev => ({
                ...prev,
                photo: reader.result
            }));
        };

        reader.readAsDataURL(file);
    }

    function removePhoto() {
        setStudent(prev => ({
            ...prev,
            photo: ""
        }));

        const fileInput = document.getElementById('editStudentPhoto');

        if (fileInput) {
            fileInput.value = '';
        }
    }

    if (loading) {
        return (
            <div className="edit-loading">
                <div className="spinner-border" role="status"></div>
                <p>Loading student details...</p>
            </div>
        );
    }

    if (error && !student.name && !student.email) {
        return (
            <div className="edit-error-page">
                <h4>Unable to load student</h4>
                <p>{error}</p>

                <button onClick={fetchStudentData}>
                    Try Again
                </button>

                <button onClick={() => navigate('/show')}>
                    Back to Students
                </button>
            </div>
        );
    }

    return (
        <div className="edit-student-page">

            <div className="edit-student-container">

                <div className="edit-student-heading">
                    <span className="edit-student-label">
                        STUDENT MANAGEMENT SYSTEM
                    </span>

                    <h2>Edit Student Details</h2>

                    <p>Update the student's profile information</p>
                </div>

                <div className="edit-student-card">

                    <div className="edit-student-card-header">
                        <h4>Update Student Information</h4>
                        <p>Modify the details below and save your changes</p>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="edit-student-form-body">

                            {error && (
                                <div className="edit-error-message">
                                    {error}
                                </div>
                            )}

                            <div className="edit-form-group">
                                <label htmlFor="editName">
                                    Full Name <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    id="editName"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter student name"
                                    value={student.name || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="edit-form-group">
                                <label htmlFor="editEmail">
                                    Email Address <span>*</span>
                                </label>

                                <input
                                    type="email"
                                    id="editEmail"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter email address"
                                    value={student.email || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="edit-form-group">
                                <label htmlFor="editCourse">
                                    Course <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    id="editCourse"
                                    name="course"
                                    className="form-control"
                                    placeholder="Enter course name"
                                    value={student.course || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="edit-form-group">
                                <label>Profile Photo</label>

                                <div className="edit-photo-section">

                                    <div className="edit-photo-preview">
                                        {student.photo ? (
                                            <img
                                                src={student.photo}
                                                alt="Student"
                                            />
                                        ) : (
                                            <div className="edit-photo-placeholder">
                                                <span>👤</span>
                                                <small>No Photo</small>
                                            </div>
                                        )}
                                    </div>

                                    <div className="edit-photo-upload">

                                        <input
                                            type="file"
                                            id="editStudentPhoto"
                                            accept="image/*"
                                            className="form-control"
                                            onChange={handlePhotoChange}
                                        />

                                        <small>
                                            Upload a new JPG, PNG or other image.
                                            Maximum size 2 MB.
                                        </small>

                                        {student.photo && (
                                            <button
                                                type="button"
                                                className="edit-remove-photo-btn"
                                                onClick={removePhoto}
                                            >
                                                Remove Photo
                                            </button>
                                        )}

                                    </div>

                                </div>
                            </div>

                        </div>

                        <div className="edit-student-footer">

                            <button
                                type="button"
                                className="edit-cancel-btn"
                                onClick={() => navigate('/show')}
                                disabled={saving}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="edit-update-btn"
                                disabled={saving}
                            >
                                {saving ? 'Updating...' : 'Update Student'}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default EditStudentForm;
