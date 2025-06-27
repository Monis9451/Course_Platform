// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Get the current Firebase ID token
 * @param {User} user - Firebase user object
 * @returns {Promise<string>} Firebase ID token
 */
const getAuthToken = async (user) => {
  if (!user) {
    throw new Error('User not authenticated');
  }
  return await user.getIdToken();
};

/**
 * Make an authenticated API request
 * @param {string} endpoint - API endpoint (without /api prefix)
 * @param {Object} options - Fetch options
 * @param {User} user - Firebase user object
 * @returns {Promise<Response>} Fetch response
 */
const apiRequest = async (endpoint, options = {}, user = null) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add Authorization header if user is provided
  if (user) {
    try {
      const token = await getAuthToken(user);
      headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      console.error('Error getting auth token:', error);
      throw new Error('Authentication failed');
    }
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    
    // Handle non-JSON responses (like for file downloads)
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return response;
    }

    // Parse JSON response
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

/**
 * GET request
 */
export const apiGet = (endpoint, user = null) => {
  return apiRequest(endpoint, { method: 'GET' }, user);
};

/**
 * POST request
 */
export const apiPost = (endpoint, data, user = null) => {
  return apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }, user);
};

/**
 * PUT request
 */
export const apiPut = (endpoint, data, user = null) => {
  return apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, user);
};

/**
 * DELETE request
 */
export const apiDelete = (endpoint, user = null) => {
  return apiRequest(endpoint, { method: 'DELETE' }, user);
};

/**
 * POST request with FormData (for file uploads)
 */
export const apiPostFormData = (endpoint, formData, user = null) => {
  return apiRequest(endpoint, {
    method: 'POST',
    headers: {}, // Let the browser set Content-Type for FormData
    body: formData,
  }, user);
};

/**
 * PUT request with FormData (for file uploads)
 */
export const apiPutFormData = (endpoint, formData, user = null) => {
  return apiRequest(endpoint, {
    method: 'PUT',
    headers: {}, // Let the browser set Content-Type for FormData
    body: formData,
  }, user);
};

export default {
  get: apiGet,
  post: apiPost,
  put: apiPut,
  delete: apiDelete,
  postFormData: apiPostFormData,
  putFormData: apiPutFormData,
};
