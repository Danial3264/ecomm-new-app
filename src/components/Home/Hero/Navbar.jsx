import React, { useState } from 'react';
import { FaShoppingCart, FaSearch } from 'react-icons/fa'; // Icons for cart and search
import Search from './Search';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSearch, setOpenSearch] = useState(false);

  const handleSearch = ()=>{
    setOpenSearch(!isOpenSearch)
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const categories = ['Electronics', 'Fashion', 'Books', 'Home & Garden', 'Beauty', 'Toys', 'Sports'];

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center space-x-2">
        {/* Logo */}
        <div className="text-white font-bold text-xl">
          LOGO
        </div>

        {/* Middle Menu Links */}
        <div className="hidden md:flex space-x-8">
          <a href="/" className="text-gray-300 hover:text-white">Home</a>
          <a href="/shop" className="text-gray-300 hover:text-white">Shop</a>
          <a href="/kids" className="text-gray-300 hover:text-white">Kids</a>
          <a href="/women" className="text-gray-300 hover:text-white">Women</a>
        </div>

        {/* Cart and Search Icons */}
        <div className="flex items-center space-x-4 text-white">
          <FaSearch onClick={handleSearch} className="cursor-pointer" />

          {isOpenSearch ? <Search /> : ''}
          
          <FaShoppingCart className="cursor-pointer" />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-700 p-4 space-y-2">
          {categories.map((category)=>(
            <a href="/" className="block text-gray-300 hover:text-white">{category}</a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
