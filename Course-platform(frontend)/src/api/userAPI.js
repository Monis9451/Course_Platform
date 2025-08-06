const API_BASE_URL = import.meta.env.VITE_API_URL;

export const checkAdminStatus = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/admin/check`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      isAdmin: data.isAdmin,
      email: data.email,
      message: data.message
    };
  } catch (error) {
    console.error('Error checking admin status:', error);
    throw error;
  }
};

export const getUserProfile = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.user;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const getAllUsers = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/all`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.users;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};
