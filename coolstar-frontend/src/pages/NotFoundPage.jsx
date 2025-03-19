import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-black pt-20 px-4 flex flex-col items-center justify-center">
      <div className="text-center max-w-lg">
        <div className="text-blue-500 text-9xl font-bold mb-4 relative">
          404
          <div className="absolute inset-0 blur-xl opacity-50 text-blue-500">404</div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-6">Page Not Found</h1>
        <p className="text-xl text-gray-400 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
          <Link 
            to="/product-catalogue"
            className="px-6 py-3 border border-blue-500 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage; 