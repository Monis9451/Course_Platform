import { useApi } from '../hooks/useApi';
import { apiPost } from '../utils/api';

export const registerUserWithServer = async (userData) => {
  try {
    console.log('Registering user with server:', userData);
    return await apiPost('/users/register', userData);
  } catch (error) {
    console.error('Error registering user with server:', error);
    throw error;
  }
};

export const useUserService = () => {
  const api = useApi();

  return {
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
