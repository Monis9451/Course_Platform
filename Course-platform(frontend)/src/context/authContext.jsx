import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase/supabase';
import { signOutUser } from '../supabase/auth';

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
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUser(session?.user ?? null);
      setAuthToken(session?.access_token ?? null);
      setUserLogin(!!session);
      
      if (session?.access_token) {
        checkAdminStatus(session.access_token);
      }
      
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setCurrentUser(session?.user ?? null);
        setAuthToken(session?.access_token ?? null);
        setUserLogin(!!session);

        if (event === 'SIGNED_IN' && session) {
          await checkAdminStatus(session.access_token);
        } else if (event === 'SIGNED_OUT') {
          setIsAdmin(false);
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Logout function
  const logout = async () => {
    try {
      setIsLoggingOut(true);
      await signOutUser();
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Complete auth flow for login/signup
  const completeAuthFlow = async (user, isNewUser = false, additionalData = {}, onAdminRedirect = null) => {
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