import { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useAuthGuard = (requireAuth = true) => {
    const { currentUser, userLogin, loading, checkAuthStatus } = useAuth();
    const [isValidated, setIsValidated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const validateAuth = async () => {
            if (loading) return;

            if (requireAuth) {
                if (!currentUser || !userLogin) {
                    toast.error('Please log in to access this page');
                    navigate('/login');
                    return;
                }

                // Additional backend validation for critical operations
                const isValid = await checkAuthStatus();
                if (!isValid) {
                    toast.error('Your session has expired. Please log in again.');
                    navigate('/login');
                    return;
                }
            }

            setIsValidated(true);
        };

        validateAuth();
    }, [currentUser, userLogin, loading, requireAuth, navigate, checkAuthStatus]);

    return {
        isAuthenticated: currentUser && userLogin,
        isValidated: isValidated && !loading,
        loading
    };
};
