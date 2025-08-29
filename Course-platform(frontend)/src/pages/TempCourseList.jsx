import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCourses } from '../api/courseAPI';
import Header from './Header';

const TempCourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const coursesData = await getAllCourses();
        setCourses(coursesData || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-fitzgerald text-black mb-4">Error Loading Courses</h1>
          <p className="text-gray-600 font-fitzgerald mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white font-fitzgerald px-8 py-3 hover:bg-primary-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      {/* Breadcrumbs */}
      <div className="bg-white py-4 border border-gray-300">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm font-fitzgerald">
            <Link to="/" className="text-primary hover:underline">Home</Link>
            <span className="text-gray-400">›</span>
            <span className="text-gray-600">Temporary Course Content</span>
          </nav>
        </div>
      </div>

      {/* Header Section */}
      <section className="bg-cream py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-fitzgerald font-medium mb-6 text-black">
              Course Testing Area
            </h1>
            <p className="text-lg text-warm-gray font-fitzgerald max-w-3xl mx-auto">
              Browse and test the courses that have been created in the database. 
              Click on any course to explore its content and functionality.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {courses.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-fitzgerald text-black mb-4">No Courses Available</h2>
              <p className="text-gray-600 font-fitzgerald mb-8">
                There are currently no courses in the database. 
                Create some courses first to test the functionality.
              </p>
              <Link
                to="/admin/add-course"
                className="bg-primary text-white font-fitzgerald px-8 py-3 hover:bg-primary-dark transition-colors inline-block"
              >
                Create New Course
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div key={course.courseID} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                  {/* Course Image */}
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    {course.imageURL ? (
                      <img
                        src={course.imageURL}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark"
                      style={{ display: course.imageURL ? 'none' : 'flex' }}
                    >
                      <div className="text-center text-white">
                        <div className="text-4xl mb-2">📚</div>
                        <span className="text-lg font-fitzgerald font-medium">
                          {course.title?.split(' ').map(word => word.charAt(0)).join('').slice(0, 3) || 'Course'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-fitzgerald font-medium text-black mb-3">
                      {course.title}
                    </h3>
                    
                    <p className="text-gray-600 font-fitzgerald text-sm mb-4 line-clamp-3">
                      {course.description || 'No description available for this course.'}
                    </p>

                    {/* Course Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500 font-fitzgerald mb-4">
                      <span>
                        {course.moduleNumbers?.length || 0} Module{course.moduleNumbers?.length !== 1 ? 's' : ''}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        course.completed 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {course.completed ? 'Complete' : 'In Progress'}
                      </span>
                    </div>

                    {/* Action Button */}
                    <Link
                      to={`/temp-course-content/${course.courseID}`}
                      className="block w-full bg-primary text-white text-center py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors font-fitzgerald font-medium"
                    >
                      View Course Content
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-fitzgerald font-medium text-black mb-6">
              Testing Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-fitzgerald font-medium text-black mb-3">
                  Course Structure
                </h3>
                <p className="text-gray-600 font-fitzgerald text-sm">
                  Each course includes modules and lessons with dynamic content components 
                  like text, images, audio, videos, and interactive exercises.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-fitzgerald font-medium text-black mb-3">
                  Progress Tracking
                </h3>
                <p className="text-gray-600 font-fitzgerald text-sm">
                  Test the lesson completion system, progress tracking, and sidebar navigation 
                  functionality with real database content.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-fitzgerald font-medium text-black mb-3">
                  Content Rendering
                </h3>
                <p className="text-gray-600 font-fitzgerald text-sm">
                  Verify how different content types are rendered and how lessons flow 
                  together in the complete course experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TempCourseList;
