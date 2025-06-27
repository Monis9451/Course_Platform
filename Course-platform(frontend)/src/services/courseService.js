import { useApi } from '../hooks/useApi';

/**
 * Course service functions using the API
 */
export const useCourseService = () => {
  const api = useApi();

  return {
    // Get all courses (public)
    getAllCourses: async (filters = {}) => {
      try {
        const queryParams = new URLSearchParams(filters).toString();
        const endpoint = queryParams ? `/courses?${queryParams}` : '/courses';
        return await api.getPublic(endpoint);
      } catch (error) {
        console.error('Error getting courses:', error);
        throw error;
      }
    },

    // Get featured courses (public)
    getFeaturedCourses: async () => {
      try {
        return await api.getPublic('/courses/featured');
      } catch (error) {
        console.error('Error getting featured courses:', error);
        throw error;
      }
    },

    // Get course by ID (public with optional auth for personalization)
    getCourseById: async (courseId) => {
      try {
        return await api.get(`/courses/${courseId}`);
      } catch (error) {
        console.error('Error getting course by ID:', error);
        throw error;
      }
    },

    // Search courses (public)
    searchCourses: async (searchQuery, filters = {}) => {
      try {
        const params = { q: searchQuery, ...filters };
        const queryParams = new URLSearchParams(params).toString();
        return await api.getPublic(`/courses/search?${queryParams}`);
      } catch (error) {
        console.error('Error searching courses:', error);
        throw error;
      }
    },

    // Get courses by category (public)
    getCoursesByCategory: async (category) => {
      try {
        return await api.getPublic(`/courses/category/${category}`);
      } catch (error) {
        console.error('Error getting courses by category:', error);
        throw error;
      }
    },

    // Enroll in course (authenticated)
    enrollInCourse: async (courseId) => {
      try {
        return await api.post(`/courses/${courseId}/enroll`);
      } catch (error) {
        console.error('Error enrolling in course:', error);
        throw error;
      }
    },

    // Get course content (authenticated)
    getCourseContent: async (courseId) => {
      try {
        return await api.get(`/courses/${courseId}/content`);
      } catch (error) {
        console.error('Error getting course content:', error);
        throw error;
      }
    },

    // Add review (authenticated)
    addReview: async (courseId, reviewData) => {
      try {
        return await api.post(`/courses/${courseId}/reviews`, reviewData);
      } catch (error) {
        console.error('Error adding review:', error);
        throw error;
      }
    },

    // Get reviews (public)
    getReviews: async (courseId) => {
      try {
        return await api.getPublic(`/courses/${courseId}/reviews`);
      } catch (error) {
        console.error('Error getting reviews:', error);
        throw error;
      }
    },

    // Create course (admin/instructor)
    createCourse: async (courseData) => {
      try {
        const formData = new FormData();
        
        // Append text fields
        Object.keys(courseData).forEach(key => {
          if (key !== 'thumbnail' && key !== 'preview') {
            if (typeof courseData[key] === 'object') {
              formData.append(key, JSON.stringify(courseData[key]));
            } else {
              formData.append(key, courseData[key]);
            }
          }
        });

        // Append file fields
        if (courseData.thumbnail) {
          formData.append('thumbnail', courseData.thumbnail);
        }
        if (courseData.preview) {
          formData.append('preview', courseData.preview);
        }

        return await api.postFormData('/courses', formData);
      } catch (error) {
        console.error('Error creating course:', error);
        throw error;
      }
    },

    // Update course (admin/instructor)
    updateCourse: async (courseId, courseData) => {
      try {
        const formData = new FormData();
        
        // Append text fields
        Object.keys(courseData).forEach(key => {
          if (key !== 'thumbnail' && key !== 'preview') {
            if (typeof courseData[key] === 'object') {
              formData.append(key, JSON.stringify(courseData[key]));
            } else {
              formData.append(key, courseData[key]);
            }
          }
        });

        // Append file fields
        if (courseData.thumbnail) {
          formData.append('thumbnail', courseData.thumbnail);
        }
        if (courseData.preview) {
          formData.append('preview', courseData.preview);
        }

        return await api.putFormData(`/courses/${courseId}`, formData);
      } catch (error) {
        console.error('Error updating course:', error);
        throw error;
      }
    },

    // Delete course (admin/instructor)
    deleteCourse: async (courseId) => {
      try {
        return await api.delete(`/courses/${courseId}`);
      } catch (error) {
        console.error('Error deleting course:', error);
        throw error;
      }
    },
  };
};
