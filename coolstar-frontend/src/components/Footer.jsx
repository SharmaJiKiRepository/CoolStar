import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} CoolStar. All rights reserved. Designed and Developed by Harsh Bhardwaj</p>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <Link to="/product-catalogue" className="hover:text-blue-400 transition-colors">Products</Link>
            <Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 