import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase/supabase';
import { signOutUser, clearLocalSession, validateSession } from '../supabase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Check admin status client-side using environment variable
  const checkAdminStatus = (user) => {
    if (!user?.email) return false;
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    
    // Add validation for admin email
    if (!adminEmail) {
      console.error('VITE_ADMIN_EMAIL environment variable is not set');
      return false;
    }
    
    return user.email === adminEmail;
  };

  useEffect(() => {
    // Get initial session with better error handling
    const initializeAuth = async () => {
      try {
        const session = await validateSession();
        const user = session?.user ?? null;
        
        setCurrentUser(user);
        setAuthToken(session?.access_token ?? null);
        setUserLogin(!!session);
        setIsAdmin(checkAdminStatus(user));
      } catch (error) {
        console.warn('Auth initialization error:', error);
        // Clear potentially corrupted session data
        clearLocalSession();
        setCurrentUser(null);
        setAuthToken(null);
        setUserLogin(false);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const user = session?.user ?? null;
        setCurrentUser(user);
        setAuthToken(session?.access_token ?? null);
        setUserLogin(!!session);
        setIsAdmin(checkAdminStatus(user));
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Logout function with enhanced error handling
  const logout = async () => {
    try {
      setIsLoggingOut(true);
      
      // Clear local state first to ensure UI updates immediately
      setCurrentUser(null);
      setAuthToken(null);
      setUserLogin(false);
      setIsAdmin(false);
      
      // Attempt to sign out from Supabase
      const result = await signOutUser();
      return { success: true, message: result.message || 'Signed out successfully' };
      
    } catch (error) {
      console.error('Logout error:', error);
      
      // Even if Supabase signout fails, we've cleared local state
      // This ensures the user appears logged out in the UI
      if (error.message?.includes('session_not_found') || 
          error.message?.includes('Invalid session') ||
          error.message?.includes('Session not found') ||
          error.message?.includes('No session')) {
        // Clear any corrupted session data
        clearLocalSession();
        return { success: true, message: 'Session was already invalid, logged out locally' };
      }
      
      // For other errors, still return success since local state is cleared
      // This prevents the user from being stuck in a logged-in state
      clearLocalSession();
      return { success: true, message: 'Logged out locally' };
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Complete auth flow with backend integration
  const completeAuthFlow = async (user, isNewUser = false, additionalData = {}, onAdminRedirect = null) => {
    try {
      const isUserAdmin = checkAdminStatus(user);
      
      // If it's a new user, we might want to store additional data in the future
      if (isNewUser && additionalData.name) {
        // For now, we'll just log this. In the future, you might want to call a backend API
      }
      
      // Handle admin redirect
      if (isUserAdmin && onAdminRedirect) {
        onAdminRedirect('/admin/dashboard');
        return;
      }
      
      // For non-admin users or when no admin redirect callback is provided
      return { isAdmin: isUserAdmin };
    } catch (error) {
      console.error('Error in completeAuthFlow:', error);
      throw error;
    }
  };

  // Simple auth completion - handle redirects in components
  const handleAuthSuccess = (user, navigate) => {
    const isUserAdmin = checkAdminStatus(user);
    
    // Add a small delay to ensure state is properly updated
    setTimeout(() => {
      if (isUserAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    }, 100);
  };

  const value = {
    currentUser,
    authToken,
    userLogin,
    loading,
    isAdmin,
    isLoggingOut,
    logout,
    handleAuthSuccess,
    completeAuthFlow
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};