import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../pages/Header'
import { useAuth } from '../context/authContext'
import { getUserCourses } from '../api/userAPI'
import { getAllCourses } from '../api/courseAPI'
import toast from 'react-hot-toast'

const UserCourses = () => {
  const [userCourses, setUserCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { currentUser, authToken, isAdmin } = useAuth()

  useEffect(() => {
    const fetchUserCourses = async () => {
      if (!currentUser || !authToken) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        
        let courses = []
        
        if (isAdmin) {
          // Admin gets access to all courses
          const allCourses = await getAllCourses()
          courses = allCourses.map(course => ({
            ...course,
            enrollmentProgress: 0, // Admin doesn't track progress
            enrolledAt: new Date().toISOString(),
            isAdminAccess: true
          }))
        } else {
          // Regular user gets enrolled courses
          courses = await getUserCourses(authToken)
        }
        
        setUserCourses(courses)
        setError(null)
      } catch (error) {
        console.error('Error fetching user courses:', error)
        setError('Failed to load your courses. Please try again.')
        toast.error('Failed to load your courses')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserCourses()
  }, [currentUser, authToken, isAdmin])

  if (isLoading) {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg font-fitzgerald text-black">Loading your courses...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header />
      {/* Hero section */}
      <section className="bg-cream py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-fitzgerald text-center text-black mb-6">
            {isAdmin ? 'All Courses (Admin)' : 'My Courses'}
          </h1>
          <p className="text-xl font-fitzgerald text-center text-black max-w-3xl mx-auto mb-10">
            {isAdmin 
              ? 'Admin access to all available courses'
              : 'Your purchased courses and learning journey'
            }
          </p>
        </div>
      </section>

      {/* Courses section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <p className="text-red-700 text-center">{error}</p>
            </div>
          )}

          {userCourses.length === 0 && !error ? (
            <div className="text-center py-16">
              <div className="mb-8">
                <svg 
                  className="h-24 w-24 mx-auto text-gray-300 mb-4"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1} 
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-fitzgerald text-black mb-4">No Courses Yet</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {isAdmin 
                  ? 'No courses are available in the system yet.'
                  : 'You haven\'t purchased any courses yet. Explore our available workshops to start your transformation journey.'
                }
              </p>
              {!isAdmin && (
                <Link 
                  to="/courses" 
                  className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors duration-200"
                >
                  Browse All Courses
                </Link>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userCourses.map((course) => (
                <div key={course.courseID} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img 
                      src={course.image_url || '/1.png'} 
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        {course.isAdminAccess ? 'ADMIN ACCESS' : (course.category || 'WORKSHOP')}
                      </span>
                    </div>
                    {!course.isAdminAccess && course.enrollmentProgress && (
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white bg-opacity-90 rounded-lg p-2">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-medium text-gray-700">Progress</span>
                            <span className="text-xs font-medium text-gray-700">{course.enrollmentProgress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1">
                            <div 
                              className="bg-primary h-1 rounded-full transition-all duration-300" 
                              style={{ width: `${course.enrollmentProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-fitzgerald font-semibold text-black mb-3">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {course.isAdminAccess 
                          ? 'Admin Access' 
                          : `Enrolled: ${course.enrolledAt ? new Date(course.enrolledAt).toLocaleDateString() : 'N/A'}`
                        }
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <Link 
                        to={`/course-content/${course.courseID}`}
                        className="w-full bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-dark transition-colors duration-200 block text-center"
                      >
                        {course.isAdminAccess ? 'Access Course' : 'Continue Learning'}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default UserCourses