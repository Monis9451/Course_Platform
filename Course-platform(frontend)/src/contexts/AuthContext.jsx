import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
// Remove syncUserWithServer import as we don't need it in the context anymore

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      // We're not syncing with the server on auth state change anymore
      // Users are only registered with the server during signup
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // Get the current user's ID token
  const getIdToken = async () => {
    if (!user) {
      throw new Error('No user logged in');
    }
    return await user.getIdToken();
  };

  const value = {
    user,
    loading,
    logout,
    getIdToken,
    isAuthenticated: !!user,
    role: user?.role || 'user' // Default role, can be enhanced later if needed
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
