const API_BASE_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

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
      } catch (e) {
        console.warn('Error parsing Supabase session:', e);
      }
    }
  }
  
  return null;
};

// Create headers with auth token
const getHeaders = (token = null) => {
  const authToken = token || getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(authToken && { 'Authorization': `Bearer ${authToken}` })
  };
};

// Handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || `API Error: ${response.status}`);
  }
  
  return data;
};

// Get all user responses
export const getAllUserResponses = async (token = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user-responses`, {
      method: 'GET',
      headers: getHeaders(token),
    });
    
    const data = await handleResponse(response);
    return data.data; // Returns object structured as { lessonId: { componentId: responseData } }
  } catch (error) {
    console.error('Error fetching all user responses:', error);
    throw error;
  }
};

// Get user responses for a specific lesson
export const getUserResponsesByLesson = async (lessonId, token = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user-responses/lesson/${lessonId}`, {
      method: 'GET',
      headers: getHeaders(token),
    });
    
    const data = await handleResponse(response);
    return data.data; // Returns object structured as { componentId: responseData }
  } catch (error) {
    console.error('Error fetching user responses for lesson:', error);
    throw error;
  }
};

// Save or update user response for a specific component
export const saveUserResponse = async (lessonId, componentId, componentType, responseData, token = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user-responses/lesson/${lessonId}/component/${componentId}`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify({
        componentType,
        responseData
      }),
    });
    
    const data = await handleResponse(response);
    return data.data;
  } catch (error) {
    console.error('Error saving user response:', error);
    throw error;
  }
};

// Delete user response for a specific component
export const deleteUserResponse = async (lessonId, componentId, token = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user-responses/lesson/${lessonId}/component/${componentId}`, {
      method: 'DELETE',
      headers: getHeaders(token),
    });
    
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error('Error deleting user response:', error);
    throw error;
  }
};

// Batch save multiple responses for a lesson
export const batchSaveUserResponses = async (lessonId, responses, token = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user-responses/lesson/${lessonId}/batch`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify({
        responses // Array of { componentId, componentType, responseData }
      }),
    });
    
    const data = await handleResponse(response);
    return data.data;
  } catch (error) {
    console.error('Error batch saving user responses:', error);
    throw error;
  }
};

export default {
  getAllUserResponses,
  getUserResponsesByLesson,
  saveUserResponse,
  deleteUserResponse,
  batchSaveUserResponses
};
