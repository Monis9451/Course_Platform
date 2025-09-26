const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const createPaymentIntent = async (amount, currency, description, authToken, metadata = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/payments/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ 
        amount, 
        currency, 
        description, 
        metadata 
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create payment intent');
    }

    return data;
  } catch (error) {
    console.error('Payment intent creation error:', error);
    throw error;
  }
};

export const confirmPayment = async (paymentIntentId, authToken) => {
  try {
    const response = await fetch(`${API_BASE_URL}/payments/confirm-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ paymentIntentId })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to confirm payment');
    }

    return data;
  } catch (error) {
    console.error('Payment confirmation error:', error);
    throw error;
  }
};

export const checkCourseAccess = async (courseId, authToken) => {
  console.log('=== FRONTEND API CALL ===');
  console.log('Checking access for course:', courseId);
  console.log('Auth token exists:', !!authToken);
  console.log('API URL:', `${API_BASE_URL}/payments/check-access/${courseId}`);
  
  try {
    const response = await fetch(`${API_BASE_URL}/payments/check-access/${courseId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    const data = await response.json();
    console.log('Response data:', data);
    
    if (!response.ok) {
      console.error('API Error:', data);
      throw new Error(data.message || 'Failed to check course access');
    }

    return data;
  } catch (error) {
    console.error('Course access check error:', error);
    throw error;
  }
};