import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../components/Checkout/PaymentForm';
import ContactInformation from '../components/Checkout/ContactInformation';
import DeliveryMethod from '../components/Checkout/DeliveryMethod';
import OrderSummary from '../components/Checkout/OrderSummary';
import { useSelector } from 'react-redux';
import Navbar from '../components/Home/Hero/Navbar';
import Footer from '../components/Home/Footer';

// Load your Stripe public key
const stripePromise = loadStripe('pk_test_51JLe2MCwwVTngeruUmiKGOOZWMXHr9qHo5YYNfWNMwXSrmPfsfhgA3SB08CxkLqbeco4q5y3QwGWS9GZdSjdppbC00eI5IvWJ1');

const Checkout = () => {
  // Default to Standard Shipping
  const cart = useSelector((state) => state.cart.items);
  const [shippingCost, setShippingCost] = useState(5.0);
  const [customerInfo, setCustomerInfo] = useState({});

  const subtotal = cart.reduce((acc, product) => acc + product.product_price * product.quantity, 0);
  const totalAmount = subtotal + shippingCost;

  // Update customer info from the ContactInformation component
  const handleCustomerInfoChange = (info) => {
    setCustomerInfo(info);
  };

  return (
    
    <Elements stripe={stripePromise}>
      <Navbar />
      <div className="container flex flex-col mx-auto mt-4 lg:flex-row px-6 space-y-4">
        {/* Left Section: Contact Info & Delivery Method */}
        <div className="w-full lg:w-3/5 mr-4">
          <ContactInformation onCustomerInfoChange={handleCustomerInfoChange} />
          <DeliveryMethod setShippingCost={setShippingCost} />
          <h1 className="text-2xl font-bold mb-4 mt-8">Payment</h1>
          <PaymentForm totalAmount={totalAmount} customerInfo={customerInfo} />
        </div>

        {/* Right Section: Order Summary */}
        <div className="w-full lg:w-1/2">
          <OrderSummary shippingCost={shippingCost} />
        </div>
      </div>
      <Footer />
    </Elements>
  );
};

export default Checkout;
