const API_BASE_URL = import.meta.env.VITE_API_URL;

export const sendFeedbackEmail = async (feedbackData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/email/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending feedback email:', error);
    throw error;
  }
};

export const testEmailConfig = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/email/test-config`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error testing email configuration:', error);
    throw error;
  }
};
