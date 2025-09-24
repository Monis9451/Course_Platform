const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get front page content for a specific course
export const getFrontPageContent = async (courseId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/front-page-content/${courseId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data.frontPageContent;
  } catch (error) {
    console.error('Error fetching front page content:', error);
    throw error;
  }
};

// Get all front page contents
export const getAllFrontPageContents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/front-page-content`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data.frontPageContents;
  } catch (error) {
    console.error('Error fetching all front page contents:', error);
    throw error;
  }
};

// Create front page content (Admin only)
export const createFrontPageContent = async (frontPageData, authToken) => {
  try {
    const response = await fetch(`${API_BASE_URL}/front-page-content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(frontPageData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create front page content');
    }

    const data = await response.json();
    return data.data.frontPageContent;
  } catch (error) {
    console.error('Error creating front page content:', error);
    throw error;
  }
};

// Update front page content (Admin only)
export const updateFrontPageContent = async (courseId, updates, authToken) => {
  try {
    const response = await fetch(`${API_BASE_URL}/front-page-content/${courseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(updates)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update front page content');
    }

    const data = await response.json();
    return data.data.frontPageContent;
  } catch (error) {
    console.error('Error updating front page content:', error);
    throw error;
  }
};

// Delete front page content (Admin only)
export const deleteFrontPageContent = async (courseId, authToken) => {
  try {
    const response = await fetch(`${API_BASE_URL}/front-page-content/${courseId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete front page content');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting front page content:', error);
    throw error;
  }
};