import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { increaseQuantity, decreaseQuantity, deleteItem } from "../../redux/CartSlice";

const Cart = ({ isOpen, onClose }) => {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  // Calculate subtotal
  const subtotal = cart.reduce((acc, product) => acc + product.product_price * product.quantity, 0);

  // Handle increase quantity
  const handleIncrease = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  // Handle decrease quantity
  const handleDecrease = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  // Handle delete item from cart
  const handleDelete = (productId) => {
    dispatch(deleteItem(productId));
  };
  

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={onClose} 
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  {/* Cart content here */}
                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {cart.map((product) => (
                          <li key={product.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                alt={product.product_name}
                                src={`../../assets/images/${product.product_image}`}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href={product.href}>{product.product_name}</a>
                                </h3>
                                <p className="ml-4">{product.product_price} BDT</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">Quantity: {product.quantity}</p>

                              {/* Increase, Decrease, and Delete buttons */}
                              <div className="flex mt-4">
                                <button
                                  onClick={() => handleDecrease(product.id)}
                                  className="bg-gray-200 p-2 rounded-l-lg hover:bg-gray-300"
                                >
                                  -
                                </button>
                                <button
                                  onClick={() => handleIncrease(product.id)}
                                  className="bg-gray-200 p-2 rounded-r-lg hover:bg-gray-300"
                                >
                                  +
                                </button>
                                <button
                                  onClick={() => handleDelete(product.id)}
                                  className="ml-4 bg-red-500 p-2 rounded hover:bg-red-600 text-white"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>{subtotal} BDT</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                    <a
                      href="/checkout"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Checkout
                    </a>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{' '}
                      <button
                        type="button"
                        onClick={onClose}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Cart;
