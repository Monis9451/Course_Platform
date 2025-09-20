const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get user token from various sources
const getAuthToken = () => {
  // Try to get token from localStorage first (fallback)
  const localToken = localStorage.getItem('authToken');
  if (localToken) return localToken;
  
  // Try to get from Supabase session
  if (typeof window !== 'undefined') {
    const supabaseSession = localStorage.getItem('sb-' + window.location.hostname + '-auth-token');
    if (supabaseSession) {
      try {
        const session = JSON.parse(supabaseSession);
        return session.access_token;
      } catch (error) {
        console.error('Error parsing Supabase session:', error);
      }
    }
  }
  
  return null;
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

// Save or update progress (upsert operation)
export const saveProgress = async (progressData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/progress/save`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(progressData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error saving progress:', error);
    throw error;
  }
};

// Get user's progress for a specific course
export const getUserCourseProgress = async (userId, courseId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/progress/user/${userId}/course/${courseId}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user course progress:', error);
    throw error;
  }
};

// Get all progress for a user
export const getUserProgress = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/progress/user/${userId}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user progress:', error);
    throw error;
  }
};

// Create new progress
export const createProgress = async (progressData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/progress`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(progressData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating progress:', error);
    throw error;
  }
};

// Update existing progress
export const updateProgress = async (progressId, updates) => {
  try {
    const response = await fetch(`${API_BASE_URL}/progress/${progressId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating progress:', error);
    throw error;
  }
};

// Delete progress
export const deleteProgress = async (progressId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/progress/${progressId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting progress:', error);
    throw error;
  }
};

// Get course progress (overall progress and lesson completion)
export const getCourseProgress = async (userId, courseId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/progress/course-progress/${userId}/${courseId}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching course progress:', error);
    throw error;
  }
};

// Save course progress (overall progress and lesson completion)
export const saveCourseProgress = async (progressData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/progress/course-progress/save`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(progressData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error saving course progress:', error);
    throw error;
  }
};
