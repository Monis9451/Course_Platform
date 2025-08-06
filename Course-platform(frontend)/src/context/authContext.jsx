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

  // Check admin status
  const checkAdminStatus = async (token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/admin/check`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setIsAdmin(data.isAdmin);
        return data.isAdmin;
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
    return false;
  };

  useEffect(() => {
    // Get initial session with better error handling
    const initializeAuth = async () => {
      try {
        const session = await validateSession();
        setCurrentUser(session?.user ?? null);
        setAuthToken(session?.access_token ?? null);
        setUserLogin(!!session);
        
        if (session?.access_token) {
          checkAdminStatus(session.access_token);
        }
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
        console.log('Auth state change:', event);
        
        setCurrentUser(session?.user ?? null);
        setAuthToken(session?.access_token ?? null);
        setUserLogin(!!session);

        if (event === 'SIGNED_IN' && session) {
          await checkAdminStatus(session.access_token);
        } else if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
          if (!session) {
            setIsAdmin(false);
          }
        }
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

  // Complete auth flow for login/signup
  const completeAuthFlow = async (user, onAdminRedirect = null) => {
    try {
      // Check if user is admin
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
      const isAdminUser = user.email === adminEmail;
      
      setIsAdmin(isAdminUser);
      
      if (isAdminUser && onAdminRedirect) {
        onAdminRedirect('/admin/dashboard');
        return;
      }
      
      return { success: true };
    } catch (error) {
      console.error('Complete auth flow error:', error);
      throw error;
    }
  };

  const value = {
    currentUser,
    authToken,
    userLogin,
    loading,
    isAdmin,
    isLoggingOut,
    logout,
    completeAuthFlow,
    checkAdminStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};