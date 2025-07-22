import React, { useContext, useState, useEffect, useCallback } from 'react';
import { auth } from '../firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth';
import { signOutUser } from '../firebase/auth';
import { signupUserAPI, loginUserAPI } from '../api/authAPI';
import toast from 'react-hot-toast';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLogin, setUserLogin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isNewUser, setIsNewUser] = useState(false);
    const [authError, setAuthError] = useState(null);

    const initializeUser = useCallback(async (user) => {
        if (user) {
            const userInfo = {
                userID: user.uid,
                username: user.displayName,
                email: user.email,
                token: await user.getIdToken(),
                uid: user.uid,
                displayName: user.displayName
            };

            try {
                let backendResponse;
                if (isNewUser) {
                    toast.loading('Creating your account...', { id: 'auth-loading' });
                    backendResponse = await signupUserAPI(userInfo);
                    setIsNewUser(false);
                    toast.success('Account created successfully!', { id: 'auth-loading' });
                } else {
                    toast.loading('Signing you in...', { id: 'auth-loading' });
                    backendResponse = await loginUserAPI(userInfo);
                    toast.success('Welcome back!', { id: 'auth-loading' });
                }

                // Only set user as logged in if backend succeeds
                setCurrentUser(userInfo);
                setUserLogin(true);
                setAuthError(null);
                setLoading(false);
            } catch (error) {
                console.error('Failed to sync user with backend:', error);
                
                // Critical: Clear all auth states first
                setCurrentUser(null);
                setUserLogin(false);
                setAuthError(error.message);
                setLoading(false);
                
                // Sign out from Firebase since backend failed - do this after setting states
                try {
                    await signOutUser();
                } catch (signOutError) {
                    console.error('Error signing out after backend failure:', signOutError);
                }

                // Show appropriate error messages with toasters
                if (error.message.includes('500')) {
                    toast.error('Server is currently unavailable. Please try again later.', { 
                        id: 'auth-loading',
                        duration: 6000 
                    });
                } else if (error.message.includes('401') || error.message.includes('403')) {
                    toast.error('Authentication failed. Please check your credentials and try again.', { 
                        id: 'auth-loading',
                        duration: 6000 
                    });
                } else if (error.message.includes('404')) {
                    toast.error('User account not found. Please contact support.', { 
                        id: 'auth-loading',
                        duration: 6000 
                    });
                } else if (error.message.includes('network') || error.message.includes('fetch')) {
                    toast.error('Network error. Please check your connection and try again.', { 
                        id: 'auth-loading',
                        duration: 6000 
                    });
                } else {
                    toast.error('Login failed. Please try again or contact support if the issue persists.', { 
                        id: 'auth-loading',
                        duration: 6000 
                    });
                }
                
                // Ensure we don't proceed with login
                return;
            }
        }
        else {
            setCurrentUser(null);
            setUserLogin(false);
            setAuthError(null);
            setLoading(false);
        }
    }, [isNewUser]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return () => {
            unsubscribe();
        };
    }, [initializeUser])

    const logout = async () => {
        try {
            toast.loading('Signing out...', { id: 'logout-loading' });
            await signOutUser();
            setCurrentUser(null);
            setUserLogin(false);
            setIsNewUser(false);
            setAuthError(null);
            toast.success('Signed out successfully!', { id: 'logout-loading' });
        } catch (error) {
            console.error('Error logging out:', error);
            toast.error('Error signing out. Please try again.', { id: 'logout-loading' });
        }
    };

    const markAsNewUser = () => {
        setIsNewUser(true);
    };

    const clearAuthError = () => {
        setAuthError(null);
    };

    const checkAuthStatus = async () => {
        if (!currentUser) return false;
        
        try {
            const userInfo = {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                email: currentUser.email,
                token: await auth.currentUser?.getIdToken()
            };
            
            await loginUserAPI(userInfo);
            return true;
        } catch (error) {
            console.error('Auth status check failed:', error);
            // If backend check fails, sign out
            await logout();
            return false;
        }
    };

    const value = {
        currentUser,
        userLogin,
        loading,
        authError,
        logout,
        markAsNewUser,
        clearAuthError,
        checkAuthStatus,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}  
