import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import toast from 'react-hot-toast';


const AdminDashboard = () => {
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const [loading] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL + '/users/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });
        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }
        const response = await res.json();
        const users = response.users;
        const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
        const filteredUsers = users.filter(user => user.email !== adminEmail);
        setTotalUsers(Array.isArray(filteredUsers) ? filteredUsers.length : 0);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users');
      }
    };
    if (authToken) {
      fetchUsers();
    }
  }, [authToken]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome, Admin</p>
          </div>

          {/* User Analysis Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">User Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 p-6 rounded-lg border border-primary">
                <h3 className="text-lg font-semibold text-primary mb-2">Total Users</h3>
                <p className="text-3xl font-bold text-primary">{totalUsers}</p>
                <p className="text-sm text-primary mt-2">Registered users</p>
              </div>
              
              <div className="bg-gray-100 p-6 rounded-lg border border-primary">
                <h3 className="text-lg font-semibold text-primary mb-2">Course Enrollments</h3>
                <p className="text-3xl font-bold text-primary">0</p>
                <p className="text-sm text-primary mt-2">Total enrollments</p>
              </div>
            </div>
            
            <div className="mt-6">
              <button 
                className="bg-primary text-white px-6 py-3 rounded-lg cursor-pointer transition-colors"
                onClick={() => navigate('/admin/analytics')}
              >
                View Detailed Analytics
              </button>
            </div>
          </div>

          {/* Course Management Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Course Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-100 p-6 rounded-lg border border-primary">
                <h3 className="text-lg font-semibold text-primary mb-2">Total Courses</h3>
                <p className="text-3xl font-bold text-primary">1</p>
                <p className="text-sm text-primary mt-2">Published courses</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                className="bg-primary text-white px-6 py-3 rounded-lg cursor-pointer"
                onClick={() => toast.info('Add course feature coming soon')}
              >
                Add New Course
              </button>
              
              <button 
                className="bg-primary text-white px-6 py-3 rounded-lg cursor-pointer"
                onClick={() => toast.info('Manage courses feature coming soon')}
              >
                Manage Existing Courses
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
