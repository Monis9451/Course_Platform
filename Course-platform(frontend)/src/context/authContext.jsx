import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth';
import { signOutUser } from '../firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLogin, setUserLogin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return () => {
            unsubscribe();
        };
    }, [])

    async function initializeUser(user) {
        if(user){
            setCurrentUser({...user});
            setUserLogin(true);
        }
        else {
            setCurrentUser(null);
            setUserLogin(false);
        }
        setLoading(false);
    }

    const logout = async () => {
        try {
            await signOutUser();
            setCurrentUser(null);
            setUserLogin(false);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const value = {
        currentUser,
        userLogin,
        loading,
        logout,
    };

    return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
    );
}  
