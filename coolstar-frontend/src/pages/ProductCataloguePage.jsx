import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCataloguePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Categories
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'refrigeration', name: 'Refrigeration' },
    { id: 'display', name: 'Display' },
    { id: 'freezers', name: 'Freezers' },
    { id: 'beverage', name: 'Beverage' }
  ];
  
  // Sample products
  const products = [
    {
      id: 1,
      name: 'Commercial Refrigerator',
      category: 'Refrigeration',
      price: 1299,
      image: '❄️',
      description: 'Energy-efficient commercial refrigerator with digital temperature control.'
    },
    {
      id: 2,
      name: 'Display Cooler',
      category: 'Display',
      price: 1499,
      image: '🔍',
      description: 'Glass door display cooler for beverages and perishable items.'
    },
    {
      id: 3,
      name: 'Deep Freezer',
      category: 'Freezers',
      price: 1899,
      image: '🧊',
      description: 'Large capacity deep freezer for commercial storage needs.'
    },
    {
      id: 4,
      name: 'Beverage Dispenser',
      category: 'Beverage',
      price: 999,
      image: '🥤',
      description: 'Multi-tank beverage dispenser for restaurants and cafes.'
    },
    {
      id: 5,
      name: 'Glass Door Merchandiser',
      category: 'Display',
      price: 1799,
      image: '🔍',
      description: 'Merchandiser with LED lighting for product display.'
    },
    {
      id: 6,
      name: 'Under Counter Freezer',
      category: 'Freezers',
      price: 1599,
      image: '🧊',
      description: 'Space-saving under counter freezer for kitchen use.'
    }
  ];
  
  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);
  
  return (
    <div className="min-h-screen bg-black pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">Product Catalogue</h1>
        <p className="text-xl text-gray-300 mb-6">
          Browse our selection of premium commercial appliances.
        </p>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-full transition-colors cursor-pointer ${
                selectedCategory === category.name
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:border-blue-500 transition-colors"
            >
              <div className="h-48 bg-gray-700 flex items-center justify-center">
                <span className="text-5xl">{product.image}</span>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                  <span className="bg-blue-600/20 text-blue-400 text-xs px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-400 font-bold">₹{product.price.toLocaleString()}</span>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm cursor-pointer">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-400 text-lg">No products found in this category.</p>
          </div>
        )}
        
        <div className="mt-8">
          <Link 
            to="/"
            className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCataloguePage; 