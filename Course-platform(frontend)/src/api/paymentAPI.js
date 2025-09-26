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
  try {
    const response = await fetch(`${API_BASE_URL}/payments/check-access/${courseId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to check course access');
    }

    return data;
  } catch (error) {
    console.error('Course access check error:', error);
    throw error;
  }
};