const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getAllCourses = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.courses;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const getCourseById = async (courseId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.course;
  } catch (error) {
    console.error('Error fetching course by ID:', error);
    throw error;
  }
};

export const getCourseWithDetails = async (courseId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}/details`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.course;
  } catch (error) {
    console.error('Error fetching course with details:', error);
    throw error;
  }
};

export const getIncompleteCoursesWithDetails = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/incomplete/details`, {
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
    return data.data.courses;
  } catch (error) {
    console.error('Error fetching incomplete courses with details:', error);
    throw error;
  }
};

export const updateLessonContent = async (lessonId, content, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/lessons/${lessonId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.lesson;
  } catch (error) {
    console.error('Error updating lesson content:', error);
    throw error;
  }
};

// Delete a course and its related modules and lessons
export const deleteCourseCascade = async (courseId, token) => {
  try {
    const url = `${API_BASE_URL}/courses/cascade-delete/${courseId}`;
    console.log('Making DELETE request to:', url);
    console.log('With token:', token ? 'present' : 'missing');
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.log('Error response data:', errorData);
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Success response data:', data);
    return data;
  } catch (error) {
    console.error('Error deleting course and related data:', error);
    throw error;
  }
};
