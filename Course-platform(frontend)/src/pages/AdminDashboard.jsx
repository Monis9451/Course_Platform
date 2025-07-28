import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import Header from './Header';
import Footer from './Footer';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { currentUser, authToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchAdminDashboard = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/admin/dashboard`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setAdminData(data);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || 'Failed to access admin dashboard');
        }
      } catch (error) {
        console.error('Error fetching admin dashboard:', error);
        toast.error('Failed to load admin dashboard');
      } finally {
        setLoading(false);
      }
    };

    if (authToken) {
      fetchAdminDashboard();
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
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome, {currentUser?.email}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Admin Status</h3>
              <p className="text-blue-700">✅ Verified Admin User</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-2">User Management</h3>
              <p className="text-green-700">Access to all user data</p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Course Management</h3>
              <p className="text-purple-700">Full course control</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => toast.info('User management feature coming soon')}
              >
                Manage Users
              </button>
              
              <button 
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                onClick={() => toast.info('Course management feature coming soon')}
              >
                Manage Courses
              </button>
              
              <button 
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                onClick={() => toast.info('Analytics feature coming soon')}
              >
                View Analytics
              </button>
              
              <button 
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                onClick={() => toast.info('Settings feature coming soon')}
              >
                System Settings
              </button>
            </div>
          </div>

          {adminData && (
            <div className="mt-6 bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Server Response:</h3>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(adminData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
