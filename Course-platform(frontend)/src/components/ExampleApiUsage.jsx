import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useUserService } from '../services/userService';
import { useCourseService } from '../services/courseService';

/**
 * Example component demonstrating how to use Firebase authentication
 * and make authenticated API calls to the backend
 */
const ExampleApiUsage = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const userService = useUserService();
  const courseService = useCourseService();
  
  const [userProfile, setUserProfile] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [error, setError] = useState(null);
  // Fetch user data when authenticated
  useEffect(() => {
    const fetchUserData = async () => {
      setApiLoading(true);
      setError(null);
      
      try {
        // Fetch user profile
        const profile = await userService.getProfile();
        setUserProfile(profile.data);

        // Fetch enrolled courses
        const courses = await userService.getEnrolledCourses();
        setEnrolledCourses(courses.data);
        
      } catch (err) {
        setError(err.message);
        console.error('Error fetching user data:', err);
      } finally {
        setApiLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated, userService]);

  const refreshUserData = async () => {
    setApiLoading(true);
    setError(null);
    
    try {
      // Fetch user profile
      const profile = await userService.getProfile();
      setUserProfile(profile.data);

      // Fetch enrolled courses
      const courses = await userService.getEnrolledCourses();
      setEnrolledCourses(courses.data);
      
    } catch (err) {
      setError(err.message);
      console.error('Error fetching user data:', err);
    } finally {
      setApiLoading(false);
    }
  };
    setApiLoading(true);
    setError(null);
    
    try {
      // Fetch user profile
      const profile = await userService.getProfile();
      setUserProfile(profile.data);

      // Fetch enrolled courses
      const courses = await userService.getEnrolledCourses();
      setEnrolledCourses(courses.data);
      
    } catch (err) {
      setError(err.message);
      console.error('Error fetching user data:', err);
    } finally {
      setApiLoading(false);
    }
  };

  const handleEnrollInCourse = async (courseId) => {
    try {
      await courseService.enrollInCourse(courseId);
      // Refresh enrolled courses
      const courses = await userService.getEnrolledCourses();
      setEnrolledCourses(courses.data);
      alert('Successfully enrolled in course!');
    } catch (err) {
      alert('Error enrolling in course: ' + err.message);
    }
  };

  const handleAddToWishlist = async (courseId) => {
    try {
      await userService.addToWishlist(courseId);
      alert('Added to wishlist!');
    } catch (err) {
      alert('Error adding to wishlist: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">
            Authentication Required
          </h2>
          <p className="text-yellow-700">
            Please log in to access your profile and course data. The Firebase authentication
            is properly integrated with the backend, and all API calls will include your
            authentication token automatically.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Firebase Auth + Backend Integration</h1>
      
      {/* User Info */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold text-green-800 mb-2">
          ✅ Authentication Status
        </h2>
        <div className="space-y-2 text-green-700">
          <p><strong>Status:</strong> Authenticated</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Firebase UID:</strong> {user?.uid}</p>
          <p><strong>Email Verified:</strong> {user?.emailVerified ? 'Yes' : 'No'}</p>
        </div>
      </div>

      {/* API Status */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">
          🔗 Backend API Integration
        </h2>
        <div className="space-y-2 text-blue-700">
          <p>✅ Firebase Admin SDK configured on backend</p>
          <p>✅ Authentication middleware protecting routes</p>
          <p>✅ Token automatically sent with all API requests</p>
          <p>✅ User profile synced between Firebase and database</p>
        </div>
      </div>

      {/* User Profile */}
      {apiLoading && (
        <div className="bg-gray-50 border rounded-lg p-4 mb-6">
          <p>Loading user data...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="text-red-800 font-semibold">API Error:</h3>
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {userProfile && (
        <div className="bg-gray-50 border rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold mb-3">User Profile (from Backend)</h3>
          <div className="space-y-2">
            <p><strong>Name:</strong> {userProfile.name}</p>
            <p><strong>Email:</strong> {userProfile.email}</p>
            <p><strong>Role:</strong> {userProfile.role}</p>
            <p><strong>Verified:</strong> {userProfile.isVerified ? 'Yes' : 'No'}</p>
            <p><strong>Member Since:</strong> {new Date(userProfile.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      )}

      {/* Enrolled Courses */}
      {enrolledCourses.length > 0 && (
        <div className="bg-gray-50 border rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold mb-3">Enrolled Courses</h3>
          <div className="space-y-2">
            {enrolledCourses.map((course) => (
              <div key={course._id} className="bg-white p-3 rounded border">
                <p className="font-medium">{course.title}</p>
                <p className="text-sm text-gray-600">{course.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Test API Actions</h3>        <div className="flex flex-wrap gap-3">
          <button
            onClick={refreshUserData}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Refresh Data
          </button>
          <button
            onClick={() => handleEnrollInCourse('sample-course-id')}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Test Enroll (Sample Course)
          </button>
          <button
            onClick={() => handleAddToWishlist('sample-course-id')}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            Test Add to Wishlist
          </button>
        </div>
      </div>

      {/* Implementation Guide */}
      <div className="mt-8 bg-gray-100 border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">How This Works</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p>1. <strong>Frontend:</strong> User logs in with Firebase Authentication</p>
          <p>2. <strong>Token:</strong> Firebase generates an ID token for the authenticated user</p>
          <p>3. <strong>API Calls:</strong> All API requests automatically include the token in Authorization header</p>
          <p>4. <strong>Backend:</strong> Firebase Admin SDK verifies the token and extracts user info</p>
          <p>5. <strong>Database:</strong> User is created/updated in MongoDB with Firebase UID</p>
          <p>6. <strong>Response:</strong> Protected routes return data specific to the authenticated user</p>
        </div>
      </div>
    </div>
  );
};

export default ExampleApiUsage;
