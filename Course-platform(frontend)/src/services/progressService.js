import { useApi } from '../hooks/useApi';

/**
 * Progress service functions using the authenticated API
 */
export const useProgressService = () => {
  const api = useApi();

  return {
    // Get course progress
    getCourseProgress: async (courseId) => {
      try {
        return await api.get(`/progress/${courseId}`);
      } catch (error) {
        console.error('Error getting course progress:', error);
        throw error;
      }
    },

    // Update lesson progress
    updateLessonProgress: async (courseId, progressData) => {
      try {
        return await api.put(`/progress/${courseId}/lesson`, progressData);
      } catch (error) {
        console.error('Error updating lesson progress:', error);
        throw error;
      }
    },

    // Mark lesson as completed
    markLessonCompleted: async (courseId, lessonData) => {
      try {
        return await api.post(`/progress/${courseId}/complete`, lessonData);
      } catch (error) {
        console.error('Error marking lesson as completed:', error);
        throw error;
      }
    },

    // Submit quiz result
    submitQuizResult: async (courseId, quizData) => {
      try {
        return await api.post(`/progress/${courseId}/quiz`, quizData);
      } catch (error) {
        console.error('Error submitting quiz result:', error);
        throw error;
      }
    },

    // Get certificate
    getCertificate: async (courseId) => {
      try {
        return await api.get(`/progress/${courseId}/certificate`);
      } catch (error) {
        console.error('Error getting certificate:', error);
        throw error;
      }
    },

    // Generate certificate
    generateCertificate: async (courseId) => {
      try {
        return await api.post(`/progress/${courseId}/certificate`);
      } catch (error) {
        console.error('Error generating certificate:', error);
        throw error;
      }
    },
  };
};
