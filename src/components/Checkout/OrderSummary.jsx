import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, increaseQuantity } from '../../redux/CartSlice';

const OrderSummary = ({ shippingCost }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const decreaseHandle = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  const increaseHandle = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };

  const subtotal = cart.reduce((acc, product) => acc + product.product_price * product.quantity, 0);

  return (
    <div className="bg-white p-8 shadow-lg rounded-lg max-w-screen mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Order Summary</h1>

      {/* Product Section */}
      {cart.map((item) => (
        <div key={item.id} className="flex items-center space-x-4 mb-6">
          <img
            src={item.image || '../../assets/images/1.jpg'} // Use dynamic image source
            alt={item.product_name}
            className="w-20 h-20 object-cover rounded-lg"
          />

          <div className="flex-grow">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold text-gray-700">{item.product_name}</p>
              <p className="text-lg font-bold text-gray-800">${item.product_price.toFixed(2)}</p>
            </div>
            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>

            {/* Quantity Controls */}
            <div className="flex items-center mt-3 space-x-2">
              <button
                onClick={() => decreaseHandle(item.id)}
                className="bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-gray-700 font-medium">{item.quantity}</span>
              <button
                onClick={() => increaseHandle(item.id)}
                className="bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Summary Breakdown */}
      <div className="border-t border-gray-300 pt-4">
        <div className="flex justify-between text-gray-600 mb-2">
          <p>Subtotal</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-gray-600 mb-4">
          <p>Shipping</p>
          <p>${shippingCost.toFixed(2)}</p>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between text-gray-900 font-bold text-xl border-t border-gray-300 pt-4">
        <p>Total</p>
        <p>${(subtotal + shippingCost).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default OrderSummary;
