import { useApi } from '../hooks/useApi';
import { apiPost } from '../utils/api';

/**
 * Direct API functions for user authentication
 */
export const registerUserWithServer = async (userData) => {
  try {
    // This function is called only during signup to store user data in MongoDB
    console.log('Registering user with server:', userData);
    return await apiPost('/users/register', userData);
  } catch (error) {
    console.error('Error registering user with server:', error);
    throw error;
  }
};

/**
 * User service functions using the authenticated API
 * Only includes endpoints that are actually implemented in the backend
 */
export const useUserService = () => {
  const api = useApi();

  return {
    // Get user profile (implemented in backend)
    getProfile: async () => {
      try {
        return await api.get('/users/profile');
      } catch (error) {
        console.error('Error getting user profile:', error);
        throw error;
      }
    },
  };
};
