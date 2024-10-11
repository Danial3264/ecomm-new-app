import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Category = ({ onCategorySelect, activeCategory }) => {
  const [categories, setCategories] = useState([]);  // State to store fetched categories
  const [loading, setLoading] = useState(true);  // State to manage loading

  useEffect(() => {
    // Fetch categories from the server
    axios.get('/categories')
      .then(response => {
        setCategories(response.data);  // Update categories state with fetched data
        setLoading(false);  // Stop loading once data is fetched
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  }, []);  // Empty dependency array means this effect runs only once on component mount

  if (loading) {
    return <div>Loading...</div>;  // Display loading state while categories are being fetched
  }

  return (
    <div className="min-h-screen w-full p-4">
      <h2 className="text-lg font-bold mb-4">Categories</h2>
      <ul className="space-y-2">
        <li 
          key="all"
          className={`cursor-pointer p-4 rounded font-bold text-lg 
            ${activeCategory === null ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          onClick={() => onCategorySelect(null)} // For all products
        >
          All Products
        </li>
        {categories.map((category) => (
          <li 
            key={category.id} 
            className={`cursor-pointer p-4 rounded font-bold text-lg 
              ${activeCategory === category.id ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            onClick={() => onCategorySelect(category.id)} // Pass the selected category id
          >
            {category.category_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
