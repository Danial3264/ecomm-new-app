import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/ProductThunks";
import { addToCart, increaseQuantity, decreaseQuantity } from "../../redux/CartSlice";

const HomeProducts = () => {
  const dispatch = useDispatch();

  // Fetch products when the component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Get products, status, and error from the Redux store
  const { products, status, error } = useSelector((state) => state.products);

  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Handle add to cart action
  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  // Handle increase quantity action
  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  // Handle decrease quantity action
  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  // Check if the product is in the cart and get its quantity
  const getCartItem = (productId) => {
    return cartItems.find((item) => item.id === productId);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-screen-2xl">
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error: {error}</p>}

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-6">
          {products.map((product) => {
            const cartItem = getCartItem(product.id);

            return (
              <div key={product.id} className="group relative border p-2 rounded-lg bg-gray-100">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    alt={product.product_name}
                    src={`../../assets/images/${product.product_image}`}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="mt-4 text-lg text-gray-700 font-bold ">{product.product_name}</h3>
                  <p className="mt-1 text-lg font-medium text-red-300">${product.product_price}</p>

                  {cartItem ? (
                    <div className="flex items-center space-x-4 mt-2">
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded"
                        onClick={() => handleDecreaseQuantity(cartItem.id)}
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold">{cartItem.quantity}</span>
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded"
                        onClick={() => handleIncreaseQuantity(cartItem.id)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 text-lg font-semibold p-2 mt-2 hover:animate-bounce"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  )}
                  <button className="rounded text-lg font-bold p-2 mt-2">View Details</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeProducts;
