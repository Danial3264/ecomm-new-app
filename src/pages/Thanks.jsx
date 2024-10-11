import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/Home/Hero/Navbar';
import Footer from '../components/Home/Footer';

const Thanks = () => {
  // Retrieve cart items and shipping cost from the Redux state
  const cart = useSelector((state) => state.cart.items);
  const shippingCost = 5.0; // Static shipping cost, can be updated dynamically
  const subtotal = cart.reduce((acc, product) => acc + product.product_price * product.quantity, 0);
  const totalAmount = subtotal + shippingCost;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8">
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
          {/* Thank you message */}
          <div className="text-center">
            <p className="font-extrabold text-3xl text-green-600">Thank You for Your Order!</p>
            <p className="text-gray-600">Your order is being processed. You'll receive confirmation soon.</p>
          </div>

          {/* Tracking information */}
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-bold text-lg">Tracking Number</p>
            <p className="text-gray-500">51547878755545848512</p> {/* Replace with dynamic tracking number */}
          </div>

          {/* Order summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-bold text-lg mb-4">Order Summary</p>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-4 mb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image || '../../assets/images/1.jpg'} // Placeholder image, replace with actual
                    alt={item.product_name}
                    className="w-20 h-20 rounded"
                  />
                  <div>
                    <p className="font-semibold text-gray-700">{item.product_name}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-gray-500">${item.product_price.toFixed(2)}</p>
              </div>
            ))}
            <div className="space-y-2">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p>${shippingCost.toFixed(2)}</p>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <p>Total</p>
                <p>${totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Shipping and Payment info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-bold mb-2">Shipping Address</p>
              <p>Kristin Watson</p> {/* Replace with dynamic data */}
              <p>7363 Cynthia Pass</p>
              <p>Toronto, ON N3Y 4H8</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-bold mb-2">Payment Information</p>
              <p>Cash On Delivery</p> {/* Replace with dynamic payment info */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Thanks;
