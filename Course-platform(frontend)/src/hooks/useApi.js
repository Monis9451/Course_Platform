import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';

/**
 * Custom hook for making authenticated API calls
 * Automatically includes Firebase token in requests
 * Only includes methods that are actually being used
 */
export const useApi = () => {
  const { user } = useAuth();

  const apiCall = {
    // GET request with authentication
    get: async (endpoint) => {
      return api.get(endpoint, user);
    },

    // POST request with authentication
    post: async (endpoint, data) => {
      return api.post(endpoint, data, user);
    },

    // Public GET request (no authentication)
    getPublic: async (endpoint) => {
      return api.get(endpoint);
    },

    // Public POST request (no authentication)
    postPublic: async (endpoint, data) => {
      return api.post(endpoint, data);
    },
  };

  return apiCall;
};
