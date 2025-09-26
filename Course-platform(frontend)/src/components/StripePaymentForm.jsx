import React, { useState } from 'react';
import { 
  useElements, 
  useStripe, 
  CardNumberElement, 
  CardExpiryElement, 
  CardCvcElement 
} from '@stripe/react-stripe-js';
import { FaArrowRight, FaSpinner } from 'react-icons/fa';
import { confirmPayment } from '../api/paymentAPI';

const ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#424770',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
      iconColor: '#9e2146',
    },
  },
};

const StripePaymentForm = ({ 
  clientSecret, 
  courseId, 
  courseTitle, 
  amount, 
  authToken, 
  onSuccess, 
  onError 
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [postalCode, setPostalCode] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    const cardNumberElement = elements.getElement(CardNumberElement);

    try {
      // Confirm the payment
      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardNumberElement,
            billing_details: {
              address: {
                postal_code: postalCode,
              },
            },
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message);
        setIsProcessing(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        // Confirm payment with our backend
        await confirmPayment(paymentIntent.id, authToken);
        onSuccess(paymentIntent);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'An error occurred during payment');
      onError(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
        
        {/* Card Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Number
          </label>
          <div className="bg-white p-3 border border-gray-300 rounded focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
            <CardNumberElement options={ELEMENT_OPTIONS} />
          </div>
        </div>

        {/* Expiry and CVC */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <div className="bg-white p-3 border border-gray-300 rounded focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              <CardExpiryElement options={ELEMENT_OPTIONS} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVC
            </label>
            <div className="bg-white p-3 border border-gray-300 rounded focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              <CardCvcElement options={ELEMENT_OPTIONS} />
            </div>
          </div>
        </div>

        {/* Postal Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Postal Code
          </label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Enter postal code"
            className="w-full p-3 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Test Card Information</h4>
        <p className="text-sm text-blue-700 mb-1">Card Number: 4242 4242 4242 4242</p>
        <p className="text-sm text-blue-700 mb-1">Expiry: Any future date (e.g., 12/25)</p>
        <p className="text-sm text-blue-700">CVC: Any 3 digits (e.g., 123)</p>
      </div> */}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-[#B45B29] text-white cursor-pointer p-4 hover:bg-[#a44d1f] transition flex items-center justify-center gap-4 text-lg font-semibold rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <>
            <FaSpinner className="animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            Pay £{amount}.00
            <FaArrowRight />
          </>
        )}
      </button>

      <div className="text-center text-sm text-gray-600">
        <p>🔒 Secure Payment Processing</p>
        <p className="mt-1">
          By completing your purchase, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </form>
  );
};

export default StripePaymentForm;