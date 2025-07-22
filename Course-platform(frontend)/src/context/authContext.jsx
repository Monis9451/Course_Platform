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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return () => {
            unsubscribe();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function initializeUser(user) {
        if (user) {
            // Only set the Firebase user initially
            setCurrentUser({ ...user });
            
            // Try to get/verify user from backend
            try {
                const token = await user.getIdToken();
                setAuthToken(token);
                
                // Try to get user from backend first
                const userData = await getUserFromBackend(user);
                setUserData(userData);
                setUserLogin(true);
            } catch (error) {
                console.error('Backend verification failed during initialization:', error);
                
                // If this is during a login flow (completeAuthFlow will handle backend operations)
                // Don't sign out the user immediately, let the login flow handle it
                if (error.message && error.message.includes('user not found')) {
                    // User doesn't exist in backend yet, this is normal for new users
                    console.log('User not found in backend during initialization - likely a new user');
                } else {
                    // For other backend errors, sign out the user
                    await signOutUser();
                    setCurrentUser(null);
                    setUserData(null);
                    setUserLogin(false);
                    setAuthToken(null);
                }
            }
        }
        else {
            setCurrentUser(null);
            setUserData(null);
            setUserLogin(false);
            setAuthToken(null);
        }
        setLoading(false);
    }

    // Function to create new user in backend
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
            // Sign out the user from Firebase if backend fails
            await signOutUser();
            throw new Error(error.message || 'Server error: Failed to create user account');
        }
    };

    // Function to get user data from backend
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
                
                // If user not found, throw a specific error
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
            
            // Don't sign out for "user not found" errors during initialization
            if (error.message !== 'user not found') {
                // Sign out the user from Firebase if backend fails
                await signOutUser();
            }
            
            throw new Error(error.message || 'Server error: Failed to verify user account');
        }
    };

    // Function to handle complete authentication flow
    const completeAuthFlow = async (firebaseUser, isNewUser = false, additionalData = {}) => {
        try {
            let userData;

            if (isNewUser) {
                // First try to get user in case they already exist (race condition)
                try {
                    userData = await getUserFromBackend(firebaseUser);
                    console.log('User already exists in backend, skipping creation');
                } catch (error) {
                    if (error.message === 'user not found') {
                        // User doesn't exist, create them
                        userData = await createUserInBackend(firebaseUser, additionalData);
                    } else {
                        // Other error, re-throw
                        throw error;
                    }
                }
            } else {
                userData = await getUserFromBackend(firebaseUser);
            }

            // Only set user as logged in if backend operation succeeds
            setCurrentUser({ ...firebaseUser });
            setUserData(userData);
            setUserLogin(true);

            return userData;
        } catch (error) {
            // Reset all auth states if backend fails
            setCurrentUser(null);
            setUserData(null);
            setUserLogin(false);
            setAuthToken(null);
            
            // Re-throw the error so the login component can handle it
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
        logout,
        createUserInBackend,
        getUserFromBackend,
        completeAuthFlow,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}  
