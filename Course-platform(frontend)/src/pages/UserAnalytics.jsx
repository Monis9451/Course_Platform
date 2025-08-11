import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import Header from './Header';
import Footer from './Footer';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';

const UserAnalytics = () => {
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    recentSignups: 0,
    activeUsers: 0,
    monthlyGrowth: 0
  });

  useEffect(() => {
    const fetchUserAnalytics = async () => {
      try {
        setLoading(true);
        const res = await fetch(import.meta.env.VITE_API_URL + '/users/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });
        
        if (!res.ok) {
          const errorText = await res.text();
          console.error('Error response:', errorText);
          throw new Error(`Failed to fetch users: ${res.status} - ${errorText}`);
        }
        
        const response = await res.json();
        const usersData = response.data?.users || [];
        const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
        const filteredUsers = usersData.filter(user => user.email !== adminEmail);
        setUsers(filteredUsers || []);
        
        // Calculate analytics
        if (filteredUsers && Array.isArray(filteredUsers)) {
          const now = new Date();
          const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

          const recentSignups = filteredUsers.filter(user =>
            new Date(user.created_at) >= lastWeek
          ).length;

          const monthlyUsers = filteredUsers.filter(user =>
            new Date(user.created_at) >= lastMonth
          ).length;
          
          setAnalytics({
            totalUsers: filteredUsers.length,
            recentSignups,
            activeUsers: filteredUsers.length,
            monthlyGrowth: monthlyUsers
          });
        }
      } catch (error) {
        console.error('Error fetching user analytics:', error);
        toast.error('Failed to fetch user analytics');
      } finally {
        setLoading(false);
      }
    };

    if (authToken) {
      fetchUserAnalytics();
    }
  }, [authToken]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto bg-cream p-8 shadow-md">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-black font-light">Loading User Analytics...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">User Analytics</h1>
              <p className="text-gray-600">Detailed user statistics and insights</p>
            </div>
            <button 
              onClick={() => navigate('/admin/dashboard')}
              className="bg-primary text-white px-4 py-2 rounded-lg cursor-pointer"
            >
              Back to Dashboard
            </button>
          </div>

          {/* Analytics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-primary p-6 rounded-lg text-white">
              <h3 className="text-lg font-semibold mb-2">Total Users</h3>
              <p className="text-3xl font-bold"><CountUp end={analytics.totalUsers} duration={1} /></p>
              <p className="text-white text-sm mt-2">All registered users</p>
            </div>
            
            <div className="bg-primary p-6 rounded-lg text-white">
              <h3 className="text-lg font-semibold mb-2">Recent Signups</h3>
              <p className="text-3xl font-bold"><CountUp end={analytics.recentSignups} duration={1} /></p>
              <p className="text-green-100 text-sm mt-2">Last 7 days</p>
            </div>
            
            <div className="bg-primary p-6 rounded-lg text-white">
              <h3 className="text-lg font-semibold mb-2">Active Users</h3>
              <p className="text-3xl font-bold"><CountUp end={analytics.activeUsers} duration={1} /></p>
              <p className="text-purple-100 text-sm mt-2">Currently active</p>
            </div>
            
            <div className="bg-primary p-6 rounded-lg text-white">
              <h3 className="text-lg font-semibold mb-2">Monthly Growth</h3>
              <p className="text-3xl font-bold"><CountUp end={analytics.monthlyGrowth} duration={1} />  </p>
              <p className="text-orange-100 text-sm mt-2">Last 30 days</p>
            </div>
          </div>

          {/* User Table */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-semibold text-gray-900">All Users</h2>
              <p className="text-gray-600 mt-1">Complete list of registered users</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                      UID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                      Display Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={user.id || index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.id ? user.id.substring(0, 10) + '...' : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.user_metadata?.display_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.email || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(user.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {user.email_confirmed_at ? 'Active' : 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserAnalytics;
