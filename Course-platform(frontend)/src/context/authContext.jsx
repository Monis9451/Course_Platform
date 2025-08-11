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

  const checkAdminStatus = (user) => {
    if (!user?.email) return false;
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    
    if (!adminEmail) {
      console.error('VITE_ADMIN_EMAIL environment variable is not set');
      return false;
    }
    
    return user.email === adminEmail;
  };

  useEffect(() => {
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

  const logout = async () => {
    try {
      setIsLoggingOut(true);
      
      setCurrentUser(null);
      setAuthToken(null);
      setUserLogin(false);
      setIsAdmin(false);
      
      const result = await signOutUser();
      return { success: true, message: result.message || 'Signed out successfully' };
      
    } catch (error) {
      console.error('Logout error:', error);
      
      if (error.message?.includes('session_not_found') || 
          error.message?.includes('Invalid session') ||
          error.message?.includes('Session not found') ||
          error.message?.includes('No session')) {
        clearLocalSession();
        return { success: true, message: 'Session was already invalid, logged out locally' };
      }
      
      clearLocalSession();
      return { success: true, message: 'Logged out locally' };
    } finally {
      setIsLoggingOut(false);
    }
  };

  const completeAuthFlow = async (user, isNewUser = false, additionalData = {}, onAdminRedirect = null) => {
    try {
      const isUserAdmin = checkAdminStatus(user);
      
      if (isNewUser && additionalData.name) {
        // For now, we'll just log this. In the future, you might want to call a backend API
      }
      
      if (isUserAdmin && onAdminRedirect) {
        onAdminRedirect('/admin/dashboard');
        return;
      }
      
      return { isAdmin: isUserAdmin };
    } catch (error) {
      console.error('Error in completeAuthFlow:', error);
      throw error;
    }
  };

  const handleAuthSuccess = (user, navigate) => {
    const isUserAdmin = checkAdminStatus(user);
    
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