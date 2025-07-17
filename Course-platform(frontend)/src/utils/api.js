const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthToken = async (user) => {
  if (!user) {
    throw new Error('User not authenticated');
  }
  return await user.getIdToken();
};

const apiRequest = async (endpoint, options = {}, user = null) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

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
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return response;
    }
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

export const apiGet = (endpoint, user = null) => {
  return apiRequest(endpoint, { method: 'GET' }, user);
};

export const apiPost = (endpoint, data, user = null) => {
  return apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }, user);
};

export default {
  get: apiGet,
  post: apiPost,
};
