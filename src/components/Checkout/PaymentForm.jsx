import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const PaymentForm = ({ totalAmount, customerInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch the client secret from the server
  useEffect(() => {
    if (totalAmount > 0) {
      fetch('/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            console.error('Client secret not returned by the server');
          }
        })
        .catch((error) => console.error('Error fetching client secret:', error));
    }
  }, [totalAmount]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return; // Stripe has not loaded yet

    setIsProcessing(true);
    const cardElement = elements.getElement(CardElement);

    if (!clientSecret) {
      setErrorMessage('Failed to fetch client secret. Please try again.');
      setIsProcessing(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: `${customerInfo.firstName} ${customerInfo.lastName}`,
          email: customerInfo.email,
          address: {
            line1: customerInfo.address,
            city: customerInfo.city,
            postal_code: customerInfo.postalCode,
            country: customerInfo.country,
          },
        },
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
    } else if (paymentIntent) {
      setErrorMessage(null);
      alert('Payment successful!');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-6 bg-white shadow-md rounded-lg">
      <div className="w-full space-y-4">
        <div>
          <CardElement className="p-4 border rounded-md shadow-sm bg-gray-100" />
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-md"
          disabled={isProcessing || !stripe || !elements}
        >
          {isProcessing ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
