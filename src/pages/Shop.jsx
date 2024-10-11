import React, { useState, useEffect } from 'react';
import Category from '../components/Shop/Category';
import Navbar from '../components/Home/Hero/Navbar';
import Footer from '../components/Home/Footer';
import AllProducts from '../components/Shop/AllProducts';
import CartIcon from '../components/Home/CartIcon';
import axios from 'axios';

const Shop = () => {
  const [animate, setAnimate] = useState(false); // Animation trigger for sidebar
  const [selectedCategory, setSelectedCategory] = useState(null); // State for the selected category
  const [products, setProducts] = useState([]); // State to hold products based on category
  const [loading, setLoading] = useState(false); // Loading state
  const [showProducts, setShowProducts] = useState(false); // New state to trigger product section animation

  useEffect(() => {
    setAnimate(true);
    setShowProducts(false);

    const timeout = setTimeout(() => {
      // Fetch products after the animation delay
      if (selectedCategory === null) {
        fetchAllProducts();
      } else {
        fetchProductsByCategory(selectedCategory);
      }
    }, 500); // Adjust delay to match animation duration (in ms)

    return () => clearTimeout(timeout);
  }, [selectedCategory]);

  // Fetch all products from the backend
  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/products'); // Fetch all products
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
    setShowProducts(true); // Show products after loading
  };

  // Fetch products based on the selected category
  const fetchProductsByCategory = async (category_id) => {
    setLoading(true);
    try {
      const response = await axios.get(`/products/category/${category_id}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products by category:', error);
    }
    setLoading(false);
    setShowProducts(true); // Show products after loading
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Fixed Navbar */}
      <div>
        <Navbar />
      </div>

      <CartIcon />

      {/* Main Content */}
      <div className="container mx-auto flex flex-col md:flex-row items-start pt-10 md:pt-20">
        
        {/* Category Sidebar */}
        <div 
          className={`hidden md:block basis-1/4 transform transition-all duration-700 ease-out ${animate ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}
        >
          {/* Pass the category selection handler and active category */}
          <Category 
            onCategorySelect={setSelectedCategory} 
            activeCategory={selectedCategory} // Pass the active category to highlight it
          />
        </div>

        {/* Products Section with Animation */}
        <div 
          className={`basis-3/4 transform transition-all duration-700 ease-out ${showProducts ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
        >
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AllProducts products={products} />
          )}
        </div>
      </div>

      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Shop;
