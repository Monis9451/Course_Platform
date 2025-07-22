import { apiCall } from '../utils/apiUtils';

export const signupUserAPI = async (userInfo) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;

    const response = await apiCall(`${apiUrl}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify({
        UserID: userInfo.uid,
        username: userInfo.displayName,
        email: userInfo.email,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      let errorMessage;
      
      if (response.status === 500) {
        errorMessage = 'Server error - our servers are experiencing issues. Please try again in a few minutes.';
      } else if (response.status === 401) {
        errorMessage = 'Authentication failed - please check your credentials.';
      } else if (response.status === 403) {
        errorMessage = 'Access denied - you do not have permission to perform this action.';
      } else if (response.status === 409) {
        errorMessage = 'An account with this email already exists.';
      } else if (response.status >= 400 && response.status < 500) {
        errorMessage = errorData?.message || 'Invalid request. Please check your information and try again.';
      } else {
        errorMessage = errorData?.message || `Signup failed with status ${response.status}`;
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log("New user created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error creating new user:", error);
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error - please check your internet connection and try again.');
    }
    
    throw error;
  }
};

export const loginUserAPI = async (userInfo) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;

    const response = await apiCall(`${apiUrl}/users/me`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify({
        uid: userInfo.uid,
        displayName: userInfo.displayName,
        email: userInfo.email,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      let errorMessage;
      
      if (response.status === 500) {
        errorMessage = 'Server error - our servers are experiencing issues. Please try again in a few minutes.';
      } else if (response.status === 401) {
        errorMessage = 'Authentication failed - please check your credentials.';
      } else if (response.status === 403) {
        errorMessage = 'Access denied - you do not have permission to perform this action.';
      } else if (response.status === 404) {
        errorMessage = 'User account not found. Please sign up first.';
      } else if (response.status >= 400 && response.status < 500) {
        errorMessage = errorData?.message || 'Invalid request. Please check your information and try again.';
      } else {
        errorMessage = errorData?.message || `Login failed with status ${response.status}`;
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log("User login successful:", data);
    return data;
  } catch (error) {
    console.error("Error logging in user:", error);
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error - please check your internet connection and try again.');
    }
    
    throw error;
  }
};
