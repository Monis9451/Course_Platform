import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ children, fallback = '/login' }) => {
    const { currentUser, userLogin, loading } = useAuth();
    const location = useLocation();

    // Show loading while auth is being determined
    if (loading) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-black font-fitzgerald">Checking authentication...</p>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!currentUser || !userLogin) {
        toast.error('Please log in to access this page');
        return <Navigate to={fallback} state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
