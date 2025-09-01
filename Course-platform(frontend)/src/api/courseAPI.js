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
