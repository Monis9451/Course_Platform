import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";

const AdminProtectedRoute = () => {
  const { currentUser, isAdmin, loading, isLoggingOut } = useAuth();
  const location = useLocation();
  const hasShownToast = useRef(false);
  const previousUser = useRef(currentUser);
  const wasLoggingOut = useRef(false);

  useEffect(() => {
    // Track if we were in a logout process
    if (isLoggingOut) {
      wasLoggingOut.current = true;
    }
    
    // Reset toast flag when user changes, but not during logout
    if (previousUser.current !== currentUser && !wasLoggingOut.current) {
      hasShownToast.current = false;
    }
    
    // Clear logout flag after logout is complete and user is null
    if (!currentUser && !isLoggingOut && wasLoggingOut.current) {
      wasLoggingOut.current = false;
      hasShownToast.current = false;
    }
    
    previousUser.current = currentUser;
  }, [currentUser, isLoggingOut]);

  if (loading || isLoggingOut) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {isLoggingOut ? 'Signing out...' : 'Verifying admin access...'}
          </p>
        </div>
      </div>
    );
  }

  // Don't show login error if we just finished logging out
  if (!currentUser) {
    if (!hasShownToast.current && !isLoggingOut && !wasLoggingOut.current) {
      toast.error('Please login to access this page');
      hasShownToast.current = true;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    if (!hasShownToast.current && !wasLoggingOut.current) {
      toast.error('Access denied. Admin privileges required.');
      hasShownToast.current = true;
    }
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
