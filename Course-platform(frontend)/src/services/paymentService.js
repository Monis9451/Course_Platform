import { useApi } from '../hooks/useApi';

/**
 * Payment service functions using the authenticated API
 */
export const usePaymentService = () => {
  const api = useApi();

  return {
    // Create payment intent
    createPaymentIntent: async (paymentData) => {
      try {
        return await api.post('/payments/create-intent', paymentData);
      } catch (error) {
        console.error('Error creating payment intent:', error);
        throw error;
      }
    },

    // Confirm payment
    confirmPayment: async (paymentData) => {
      try {
        return await api.post('/payments/confirm', paymentData);
      } catch (error) {
        console.error('Error confirming payment:', error);
        throw error;
      }
    },

    // Get payment status
    getPaymentStatus: async (paymentId) => {
      try {
        return await api.get(`/payments/status/${paymentId}`);
      } catch (error) {
        console.error('Error getting payment status:', error);
        throw error;
      }
    },

    // Process refund (admin only)
    processRefund: async (refundData) => {
      try {
        return await api.post('/payments/refund', refundData);
      } catch (error) {
        console.error('Error processing refund:', error);
        throw error;
      }
    },
  };
};
