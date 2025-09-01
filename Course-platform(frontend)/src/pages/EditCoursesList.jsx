import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import toast from 'react-hot-toast';
import { getAllCourses } from '../api/courseAPI';

const EditCoursesList = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleEditCourse = (courseId) => {
    navigate(`/admin/edit-course/${courseId}`);
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Existing Courses</h1>
                <p className="text-gray-600">Select a course to edit its lesson content</p>
              </div>
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses available</h3>
              <p className="text-gray-600 mb-4">There are no courses in the database to edit.</p>
              <button
                onClick={() => navigate('/admin/add-course')}
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg transition-colors"
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
                      onClick={() => handleEditCourse(course.courseID)}
                      className="w-full bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Edit Lesson Content
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

export default EditCoursesList;
