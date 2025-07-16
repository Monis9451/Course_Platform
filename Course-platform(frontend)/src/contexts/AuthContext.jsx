import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { syncUserWithServer } from '../services/userService';

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
  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          // Sync user data with the server
          const userData = {
            firebaseUid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || '',
          };
          
          const response = await syncUserWithServer(userData, firebaseUser);
          setDbUser(response.data.user);
        } catch (error) {
          console.error('Error syncing user with server:', error);
        }
      } else {
        setDbUser(null);
      }
      
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
    dbUser,
    loading,
    logout,
    getIdToken,
    isAuthenticated: !!user,
    role: dbUser?.role || 'user'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
