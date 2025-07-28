import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";

const AdminProtectedRoute = () => {
  const { currentUser, isAdmin, loading } = useAuth();
  const location = useLocation();
  const hasShownToast = useRef(false);

  useEffect(() => {
    // Reset toast flag when user changes
    if (!currentUser) {
      hasShownToast.current = false;
    }
  }, [currentUser]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    if (!hasShownToast.current) {
      toast.error('Please login to access this page');
      hasShownToast.current = true;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    if (!hasShownToast.current) {
      toast.error('Access denied. Admin privileges required.');
      hasShownToast.current = true;
    }
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
