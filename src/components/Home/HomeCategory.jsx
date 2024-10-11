import axios from 'axios';
import React, { useEffect, useState } from 'react';

const HomeCategory = () => {
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
    <div className="container mx-auto p-4">
    <div className='grid grid-cols-4'>
        {categories.map((category) => (
        <a href={`/shop?category=${category.id}`} key={category.id}> {/* Updated link */}
            <div className='border p-2 text-center flex flex-col justify-center items-center bg-gray-100 m-2'>
            <img src={`../../assets/images/${category.category_image}`} alt={category.category_name} className='h-full w-full object-cover object-center hover:opacity-75' />
            <p className='font-bold text-2xl'>{category.category_name}</p>
            </div>
        </a>
        ))}
    </div>
    </div>

  );
};

export default HomeCategory;
