import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const DeliveryMethod = ({ setShippingCost }) => {
  const [selectedMethod, setSelectedMethod] = useState('standard');

  const handleMethodSelect = (method, cost) => {
    setSelectedMethod(method);
    setShippingCost(cost);
  };

  return (
    <div className="bg-white p-8 shadow-md rounded-md mb-6">
      <h1 className="text-2xl font-bold mb-4">Delivery Method</h1>

      <div className="flex space-x-4">
        {/* Standard Shipping */}
        <div
          className={`flex flex-col md:flex-row justify-between items-center w-1/2 p-4 border ${
            selectedMethod === 'standard' ? 'border-green-500' : 'border-gray-300'
          } rounded-md cursor-pointer`}
          onClick={() => handleMethodSelect('standard', 5.0)}
        >
          <div className='text-center'>
            <p className="font-semibold">Standard</p>
            <p className="text-gray-500">4-10 Business Days</p>
          </div>
          <p className='font-bold'>$5.00</p>
        </div>

        {/* Express Shipping */}
        <div
          className={`flex flex-col md:flex-row justify-between items-center w-1/2 p-4 border ${
            selectedMethod === 'express' ? 'border-green-500' : 'border-gray-300'
          } rounded-md cursor-pointer`}
          onClick={() => handleMethodSelect('express', 10.0)}
        >
          <div className='text-center'>
            <p className="font-semibold">Express</p>
            <p className="text-gray-500">2-5 Business Days</p>
          </div>
          <p className='font-bold'>$10.00</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryMethod;
