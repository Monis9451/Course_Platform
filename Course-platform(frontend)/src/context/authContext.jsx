import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth';
import { signOutUser } from '../firebase/auth';
import { apiCall } from '../utils/apiUtils';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [userLogin, setUserLogin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [authToken, setAuthToken] = useState(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isCheckingAdmin, setIsCheckingAdmin] = useState(false);

    const initializeUser = async (user) => {
        if (user) {
            setCurrentUser({ ...user });

            try {
                const token = await user.getIdToken();
                setAuthToken(token);
                
                const userData = await getUserFromBackend(user);
                setUserData(userData);
                setUserLogin(true);
                
                // Check if user is admin
                await checkAdminStatus(token);
            } catch (error) {
                console.error('Backend verification failed during initialization:', error);
                
                if (error.message && error.message.includes('user not found')) {
                    console.log('User not found in backend during initialization - likely a new user');
                } else {
                    await signOutUser();
                    setCurrentUser(null);
                    setUserData(null);
                    setUserLogin(false);
                    setAuthToken(null);
                    setIsAdmin(false);
                }
            }
        }
        else {
            setCurrentUser(null);
            setUserData(null);
            setUserLogin(false);
            setAuthToken(null);
            setIsAdmin(false);
        }
        setLoading(false);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return () => {
            unsubscribe();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkAdminStatus = async (token, redirectCallback = null) => {
        if (isCheckingAdmin) return false; // Prevent duplicate admin checks
        
        try {
            setIsCheckingAdmin(true);
            const response = await apiCall(`${import.meta.env.VITE_API_URL}/users/admin/check`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const result = await response.json();
                const isAdminUser = result.isAdmin || false;
                setIsAdmin(isAdminUser);
                
                // If user is admin and we have a redirect callback, call it
                if (isAdminUser && redirectCallback) {
                    redirectCallback('/admin/dashboard');
                }
                
                return isAdminUser;
            } else {
                setIsAdmin(false);
                return false;
            }
        } catch (error) {
            console.error('Error checking admin status:', error);
            setIsAdmin(false);
            return false;
        } finally {
            setIsCheckingAdmin(false);
        }
    };

    const checkIsAdminEmail = (email) => {
        const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
        return email === adminEmail;
    };

    const createUserInBackend = async (firebaseUser, additionalData = {}) => {
        try {
            const token = await firebaseUser.getIdToken();
            const userPayload = {
                userID: firebaseUser.uid,
                username: firebaseUser.displayName || additionalData.name || '',
                email: firebaseUser.email,
                photoURL: firebaseUser.photoURL || null,
                ...additionalData
            };

            const response = await apiCall(`${import.meta.env.VITE_API_URL}/users/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userPayload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || errorData.message || 'Failed to create user in backend');
            }

            const result = await response.json();
            if (!result.success) {
                throw new Error(result.error || 'Failed to create user in backend');
            }

            setUserData(result.user);
            setAuthToken(token);
            return result.user;
        } catch (error) {
            console.error('Error creating user in backend:', error);
            await signOutUser();
            throw new Error(error.message || 'Server error: Failed to create user account');
        }
    };

    const getUserFromBackend = async (firebaseUser) => {
        try {
            const token = await firebaseUser.getIdToken();

            const response = await apiCall(`${import.meta.env.VITE_API_URL}/users/me`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    uid: firebaseUser.uid,
                    displayName: firebaseUser.displayName || '',
                    email: firebaseUser.email
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                
                if (response.status === 404 || errorData.error?.includes('not found')) {
                    throw new Error('user not found');
                }
                
                throw new Error(errorData.error || errorData.message || 'Failed to get user data from backend');
            }

            const result = await response.json();
            if (!result.success) {
                throw new Error(result.error || 'Failed to get user data from backend');
            }

            setUserData(result.userData);
            setAuthToken(token);
            return result.userData;
        } catch (error) {
            console.error('Error getting user from backend:', error);
            
            if (error.message !== 'user not found') {
                await signOutUser();
            }
            
            throw new Error(error.message || 'Server error: Failed to verify user account');
        }
    };

    const completeAuthFlow = async (firebaseUser, isNewUser = false, additionalData = {}, redirectCallback = null) => {
        try {
            let userData;
            const token = await firebaseUser.getIdToken();

            if (isNewUser) {
                try {
                    userData = await getUserFromBackend(firebaseUser);
                    console.log('User already exists in backend, skipping creation');
                } catch (error) {
                    if (error.message === 'user not found') {
                        userData = await createUserInBackend(firebaseUser, additionalData);
                    } else {
                        throw error;
                    }
                }
            } else {
                userData = await getUserFromBackend(firebaseUser);
            }

            setCurrentUser({ ...firebaseUser });
            setUserData(userData);
            setUserLogin(true);
            
            // Check admin status and handle redirect
            await checkAdminStatus(token, redirectCallback);

            return userData;
        } catch (error) {
            setCurrentUser(null);
            setUserData(null);
            setUserLogin(false);
            setAuthToken(null);
            setIsAdmin(false);
            
            throw error;
        }
    };

    const logout = async () => {
        setIsLoggingOut(true);
        try {
            await signOutUser();
            setCurrentUser(null);
            setUserData(null);
            setUserLogin(false);
            setAuthToken(null);
            setIsAdmin(false);
            setIsCheckingAdmin(false);
            setIsLoggingOut(false);
            return { success: true };
        } catch (error) {
            console.error('Error logging out:', error);
            setIsLoggingOut(false);
            return { success: false, error: error.message };
        }
    };

    const value = {
        currentUser,
        userData,
        userLogin,
        loading,
        authToken,
        isLoggingOut,
        isAdmin,
        logout,
        createUserInBackend,
        getUserFromBackend,
        completeAuthFlow,
        checkAdminStatus,
        checkIsAdminEmail,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}  
