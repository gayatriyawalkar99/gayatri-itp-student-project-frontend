
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../Service/API';
import { useAuth } from '../context/AuthContext';
import './ShowStudents.css';

const ShowStudents = () => {

  const [studentArray, setStudentArray] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { user } = useAuth();

  const isAdmin = user?.role === 'admin';

  // Fetch Students
  async function fetchStudentData() {
    try {
      setLoading(true);
      setError('');

      const response = await API.get('/getAllStudent');
      setStudentArray(response.data);

    } catch (err) {
      console.error(err);
      setError('Unable to load student records. Please try again.');

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudentData();
  }, []);

  // Search Students
  const filteredStudents = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return studentArray.filter(stud =>
      stud.studName?.toLowerCase().includes(searchText) ||
      stud.studEmail?.toLowerCase().includes(searchText) ||
      stud.studCourse?.toLowerCase().includes(searchText)
    );
  }, [studentArray, search]);

  // Delete Student
  async function deleteStudent(id, email) {

    const confirmMsg = window.confirm(
      'Are you sure you want to delete this student?'
    );

    if (!confirmMsg) return;

    try {
      await API.delete(`/students/${id}`);
      await API.delete(`/users/${email}`);

      alert('Student deleted successfully.');
      fetchStudentData();

    } catch (err) {
      console.error(err);
      alert('Unable to delete student.');
    }
  }

  // Update Course using PATCH
  async function updateCoursePatch(id) {

    const newCourse = window.prompt('Enter the new course name:');

    if (!newCourse?.trim()) return;

    try {
      await API.patch(`/students/${id}`, {
        course: newCourse.trim()
      });

      alert('Course updated successfully.');
      fetchStudentData();

    } catch (err) {
      console.error(err);
      alert('Unable to update course.');
    }
  }

  return (
    <div className="students-page">

      <div className="container">

        {/* Page Header */}
        <div className="students-header">

          <div>
            <span className="students-subtitle">
              STUDENT ADMINISTRATION
            </span>

            <h2>Student Directory</h2>

            <p>
              View and manage student information from one place.
            </p>
          </div>

          {isAdmin && (
            <Link to="/add" className="add-student-btn">
              <span>+</span> Add New Student
            </Link>
          )}

        </div>

        {/* Statistics and Search */}
        <div className="students-toolbar">

          <div className="student-count-box">
            <div className="count-icon">👨‍🎓</div>

            <div>
              <span>Total Students</span>
              <h3>{studentArray.length}</h3>
            </div>
          </div>

          <div className="student-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search by name, email or course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

        </div>

        {/* Loading */}
        {loading && (
          <div className="students-message">
            <div className="spinner-border text-primary"></div>
            <p>Loading student records...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="students-message students-error">
            <h4>Something went wrong</h4>
            <p>{error}</p>

            <button
              className="retry-btn"
              onClick={fetchStudentData}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty Records */}
        {!loading && !error && studentArray.length === 0 && (
          <div className="students-message">
            <div className="empty-icon">📚</div>
            <h4>No Students Found</h4>
            <p>There are currently no student records available.</p>

            {isAdmin && (
              <Link to="/add" className="add-student-btn">
                Add First Student
              </Link>
            )}
          </div>
        )}

        {/* No Search Results */}
        {!loading && !error &&
          studentArray.length > 0 &&
          filteredStudents.length === 0 && (
            <div className="students-message">
              <div className="empty-icon">🔍</div>
              <h4>No Matching Students</h4>
              <p>Try searching with a different name, email or course.</p>
            </div>
          )}

        {/* Student Cards */}
        {!loading && !error && filteredStudents.length > 0 && (

          <>
            <div className="students-results-heading">
              Showing <strong>{filteredStudents.length}</strong> of{' '}
              <strong>{studentArray.length}</strong> students
            </div>

            <div className="row g-4">

              {filteredStudents.map((stud) => (

                <div
                  className="col-12 col-md-6 col-xl-4"
                  key={stud.studId}
                >

                  <div className="student-card">

                    {/* Card Header */}
                    <div className="student-card-header">

                      <div className="student-avatar">
                        {stud.studName?.charAt(0).toUpperCase() || 'S'}
                      </div>

                      <span className="student-status">
                        Student
                      </span>

                    </div>

                    {/* Student Information */}
                    <div className="student-card-body">

                      <h4>{stud.studName}</h4>

                      <div className="student-detail">
                        <span className="detail-icon">✉</span>
                        <span>{stud.studEmail}</span>
                      </div>

                      <div className="student-detail">
                        <span className="detail-icon">📚</span>
                        <span>{stud.studCourse}</span>
                      </div>

                    </div>

                    {/* Card Actions */}
                    <div className="student-card-actions">

                      <Link
                        to={`/view/${stud.studId}`}
                        className="view-student-btn"
                      >
                        View Details
                      </Link>

                      {isAdmin && (
                        <>
                          <Link
                            to={`/edit/${stud.studId}`}
                            className="edit-student-btn"
                          >
                            Edit
                          </Link>

                          <button
                            className="delete-student-btn"
                            onClick={() =>
                              deleteStudent(stud.id, stud.studEmail)
                            }
                          >
                            Delete
                          </button>

                          <button
                            className="patch-student-btn"
                            onClick={() => updateCoursePatch(stud.id)}
                          >
                            Update Course
                          </button>
                        </>
                      )}

                    </div>

                  </div>

                </div>

              ))}

            </div>
          </>

        )}

      </div>

    </div>
  );
};

export default ShowStudents;
