// frontend/src/components/PaymentForm.js
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Load Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51MrOz3DiYUf43Uidu2fCeKTQWuaeqbJLSxVZfKsJF9Icudd12xa6QuVTWl61PdAitTXaX063aWo2GdSyfT4tp6eq001JontVN5'); // Replace with your Stripe Publishable Key

// Options for styling CardElement
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#1a202c', // Dark text color
      fontSize: '16px',
      fontFamily: 'Inter, sans-serif',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: '#a0aec0', // Light gray placeholder text
      },
      padding: '10px',
    },
    invalid: {
      color: '#e53e3e', // Red color for errors
    },
  },
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);

    // Create payment intent on the backend
    const response = await fetch('http://localhost:3300/api/payment/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 1000, currency: 'usd' }), // Adjust the amount and currency as needed
    });

    const { clientSecret } = await response.json();

    // Confirm card payment
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage(`Payment successful! Payment Intent ID: ${paymentIntent.id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Complete Your Payment</h2>

      {/* Card Number Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
        <div className="border border-gray-300 p-3 rounded-lg focus-within:border-blue-500">
          <CardElement options={CARD_ELEMENT_OPTIONS} className="w-full focus:outline-none" />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
        disabled={!stripe}
      >
        Pay
      </button>

      {/* Error Message */}
      {errorMessage && (
        <div className="mt-4 text-center text-red-600 font-medium">{errorMessage}</div>
      )}
    </form>
  );
};

const PaymentForm = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default PaymentForm;