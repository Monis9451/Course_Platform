import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Header from './Header';
import Footer from './Footer';
import toast from 'react-hot-toast';
import { getAllCourses, deleteCourseCascade } from "../api/courseAPI";

const DeleteCoursesList = () => {
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const coursesData = await getAllCourses();
        setCourses(coursesData || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast.error('Failed to fetch courses');
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course? This action cannot be undone and will also delete all associated modules and lessons.')) {
      return;
    }

    if (!authToken) {
      toast.error('Authentication token is missing');
      return;
    }

    console.log('Deleting course:', courseId, 'with token:', authToken ? 'present' : 'missing');
    setDeleting(courseId);
    try {
      const result = await deleteCourseCascade(courseId, authToken);
      console.log('Delete result:', result);
      setCourses((prev) => prev.filter((c) => c.courseID !== courseId));
      toast.success('Course deleted successfully!');
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error(`Failed to delete course: ${error.message}`);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading courses...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Delete Existing Courses</h1>
                <p className="text-gray-600">⚠️ Warning: Deleting a course will also remove all its modules and lessons permanently</p>
              </div>
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                style={{ cursor: 'pointer' }}
              >
                Back to Dashboard
              </button>
            </div>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses available</h3>
              <p className="text-gray-600 mb-4">There are no courses in the database to delete.</p>
              <button
                onClick={() => navigate('/admin/add-course')}
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg transition-colors"
                style={{ cursor: 'pointer' }}
              >
                Add New Course
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.courseID} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      {course.imageURL && (
                        <img
                          src={course.imageURL}
                          alt={course.title}
                          className="w-12 h-12 object-cover rounded-lg mr-4"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Course ID: {course.courseID}
                        </p>
                      </div>
                    </div>
                    
                    {course.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {course.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        course.completed 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {course.completed ? 'Completed' : 'In Progress'}
                      </span>
                    </div>

                    <button
                      onClick={() => handleDelete(course.courseID)}
                      disabled={deleting === course.courseID}
                      className={`w-full px-4 py-2 rounded-lg transition-colors flex items-center justify-center ${
                        deleting === course.courseID
                          ? 'bg-gray-400 cursor-not-allowed text-white'
                          : 'bg-red-500 hover:bg-red-600 text-white'
                      }`}
                      style={{ cursor: deleting === course.courseID ? 'not-allowed' : 'pointer' }}
                    >
                      {deleting === course.courseID ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Deleting...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete Course
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DeleteCoursesList;
