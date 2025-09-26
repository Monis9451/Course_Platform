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

// Get complete course details including front page content
export const getCourseWithFrontPageContent = async (courseId) => {
  try {
    console.log(`Fetching course data for ID: ${courseId}`); // Debug log
    
    // Fetch course basic data
    const courseResponse = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(`Course response status: ${courseResponse.status}`); // Debug log

    if (!courseResponse.ok) {
      console.error(`Course API error: ${courseResponse.status} ${courseResponse.statusText}`);
      throw new Error(`HTTP error! status: ${courseResponse.status}`);
    }

    const courseData = await courseResponse.json();
    console.log('Course API response:', courseData); // Debug log
    const course = courseData.data.course;

    if (!course) {
      console.error('No course found in API response');
      throw new Error('Course not found');
    }

    // Fetch course with details (includes modules)
    console.log(`Fetching course with details for ID: ${courseId}`); // Debug log
    let courseWithDetails = course;
    try {
      const detailsResponse = await fetch(`${API_BASE_URL}/courses/${courseId}/details`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (detailsResponse.ok) {
        const detailsData = await detailsResponse.json();
        console.log('Course details response:', detailsData); // Debug log
        courseWithDetails = detailsData.data.course;
      }
    } catch (detailsError) {
      console.warn('Could not fetch course details:', detailsError.message);
    }

    // Fetch front page content
    console.log(`Fetching front page content for course ID: ${courseId}`); // Debug log
    try {
      const frontPageResponse = await fetch(`${API_BASE_URL}/front-page-content/${courseId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(`Front page response status: ${frontPageResponse.status}`); // Debug log

      if (frontPageResponse.ok) {
        const frontPageData = await frontPageResponse.json();
        console.log('Front page API response:', frontPageData); // Debug log
        const frontPageContent = frontPageData.data.frontPageContent;

        // Combine course and front page data
        const result = {
          ...courseWithDetails,
          frontPageContent: frontPageContent
        };
        console.log('Combined course data:', result); // Debug log
        return result;
      } else {
        console.warn(`Front page content not found: ${frontPageResponse.status}`);
      }
    } catch (frontPageError) {
      console.warn(`No front page content found for course ${courseId}:`, frontPageError.message);
    }

    // Return course data without front page content if not found
    const result = {
      ...courseWithDetails,
      frontPageContent: null
    };
    console.log('Course data without front page content:', result); // Debug log
    return result;
  } catch (error) {
    console.error('Error fetching course with front page content:', error);
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
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting course and related data:', error);
    throw error;
  }
};
