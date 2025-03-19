import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Simple pages without lazy loading for now
const Home = () => (
  <div className="min-h-screen bg-black pt-20 px-4">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-400 mb-6">Welcome to CoolStarDesign</h1>
      <p className="text-xl text-gray-300 mb-6">
        Premium commercial appliances engineered for excellence and efficiency.
      </p>
      <div className="flex gap-4 mt-8">
        <Link 
          to="/product-catalogue"
          className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          View Products
        </Link>
        <Link 
          to="/contact"
          className="px-6 py-3 border border-blue-500 text-blue-400 rounded-full hover:bg-blue-900/20 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  </div>
);

const ProductCatalogue = () => (
  <div className="min-h-screen bg-black pt-20 px-4">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-400 mb-6">Product Catalogue</h1>
      <p className="text-xl text-gray-300 mb-6">
        Browse our selection of premium commercial appliances.
      </p>
      <Link 
        to="/"
        className="text-blue-400 hover:text-blue-300 transition-colors"
      >
        &larr; Back to Home
      </Link>
    </div>
  </div>
);

const Contact = () => (
  <div className="min-h-screen bg-black pt-20 px-4">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-400 mb-6">Contact Us</h1>
      <p className="text-xl text-gray-300 mb-6">
        Get in touch with our team for any inquiries.
      </p>
      <Link 
        to="/"
        className="text-blue-400 hover:text-blue-300 transition-colors"
      >
        &larr; Back to Home
      </Link>
    </div>
  </div>
);

const NotFound = () => (
  <div className="min-h-screen bg-black pt-20 px-4 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-blue-400 mb-6">404</h1>
      <p className="text-2xl text-gray-300 mb-6">Page not found</p>
      <Link 
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
      >
        Go Home
      </Link>
    </div>
  </div>
);

function SimpleApp() {
  return (
    <Router>
      <div className="bg-black text-white min-h-screen">
        {/* Simple Header */}
        <header className="fixed top-0 left-0 right-0 bg-gray-900 shadow-lg z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-xl font-bold text-blue-400">CoolStarDesign</Link>
              <nav className="flex space-x-6">
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
                <Link to="/product-catalogue" className="text-gray-300 hover:text-white transition-colors">Products</Link>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product-catalogue" element={<ProductCatalogue />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default SimpleApp; 