import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';

/**
 * Custom hook for making authenticated API calls
 * Automatically includes Firebase token in requests
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

    // PUT request with authentication
    put: async (endpoint, data) => {
      return api.put(endpoint, data, user);
    },

    // DELETE request with authentication
    delete: async (endpoint) => {
      return api.delete(endpoint, user);
    },

    // POST with FormData (for file uploads)
    postFormData: async (endpoint, formData) => {
      return api.postFormData(endpoint, formData, user);
    },

    // PUT with FormData (for file uploads)
    putFormData: async (endpoint, formData) => {
      return api.putFormData(endpoint, formData, user);
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
