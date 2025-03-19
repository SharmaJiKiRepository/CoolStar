import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">Welcome to CoolStarDesign</h1>
        <p className="text-xl text-gray-300 mb-6">
          Premium commercial appliances engineered for excellence and efficiency.
        </p>
        
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
            <div className="text-blue-400 text-3xl mb-4">❄️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Refrigeration Solutions</h3>
            <p className="text-gray-400">High-quality cooling solutions for commercial kitchens and retail.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
            <div className="text-blue-400 text-3xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">Display Equipment</h3>
            <p className="text-gray-400">Showcase your products with our elegant display units.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
            <div className="text-blue-400 text-3xl mb-4">⚙️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Custom Solutions</h3>
            <p className="text-gray-400">Tailored commercial appliances designed to your specifications.</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 mt-8">
          <Link 
            to="/product-catalogue"
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            View Products
          </Link>
          <Link 
            to="/contact"
            className="px-6 py-3 border border-blue-500 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 