import { useApi } from '../hooks/useApi';

/**
 * User service functions using the authenticated API
 */
export const useUserService = () => {
  const api = useApi();

  return {
    // Get user profile
    getProfile: async () => {
      try {
        return await api.get('/users/profile');
      } catch (error) {
        console.error('Error getting user profile:', error);
        throw error;
      }
    },

    // Update user profile
    updateProfile: async (profileData) => {
      try {
        return await api.put('/users/profile', profileData);
      } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
      }
    },

    // Update user avatar
    updateAvatar: async (avatarFile) => {
      try {
        const formData = new FormData();
        formData.append('avatar', avatarFile);
        return await api.putFormData('/users/avatar', formData);
      } catch (error) {
        console.error('Error updating user avatar:', error);
        throw error;
      }
    },

    // Get enrolled courses
    getEnrolledCourses: async () => {
      try {
        return await api.get('/users/enrolled-courses');
      } catch (error) {
        console.error('Error getting enrolled courses:', error);
        throw error;
      }
    },

    // Get wishlist
    getWishlist: async () => {
      try {
        return await api.get('/users/wishlist');
      } catch (error) {
        console.error('Error getting wishlist:', error);
        throw error;
      }
    },

    // Add to wishlist
    addToWishlist: async (courseId) => {
      try {
        return await api.post(`/users/wishlist/${courseId}`);
      } catch (error) {
        console.error('Error adding to wishlist:', error);
        throw error;
      }
    },

    // Remove from wishlist
    removeFromWishlist: async (courseId) => {
      try {
        return await api.delete(`/users/wishlist/${courseId}`);
      } catch (error) {
        console.error('Error removing from wishlist:', error);
        throw error;
      }
    },

    // Get payment history
    getPaymentHistory: async () => {
      try {
        return await api.get('/users/payment-history');
      } catch (error) {
        console.error('Error getting payment history:', error);
        throw error;
      }
    },

    // Delete account
    deleteAccount: async () => {
      try {
        return await api.delete('/users/account');
      } catch (error) {
        console.error('Error deleting account:', error);
        throw error;
      }
    },
  };
};
