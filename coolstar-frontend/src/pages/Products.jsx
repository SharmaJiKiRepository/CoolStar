import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Products = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productIdFromUrl = queryParams.get("id");
  const categoryFromUrl = queryParams.get("category");

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || "");
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    message: "",
    productId: ""
  });
  
  const { addToCart } = useCart();
  
  // Get the selected product on mount if ID is in URL
  useEffect(() => {
    if (productIdFromUrl) {
      setLoading(true);
      axios.get(`${API_BASE_URL}/products/${productIdFromUrl}`)
        .then(res => {
          setSelectedProduct(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching product details:", err);
          setError("Failed to load product details. Please try again later.");
          setLoading(false);
        });
    }
  }, [productIdFromUrl]);

  // Set selected category from URL if present
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  // Fetch all products
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/products`)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(res.data.map(product => product.category))];
        setCategories(uniqueCategories);
        
        // Handle if we got no products
        if (res.data.length === 0) {
          // Mock data for when backend isn't available
          const mockProducts = [
            {
              _id: '1',
              name: 'Premium Glass Display Counter - Curved',
              description: 'Modern curved glass display counter with LED lighting, perfect for bakeries, cafes, and retail stores. Features temperature control and elegant design.',
              price: 1299.99,
              imageUrl: 'https://images.unsplash.com/photo-1581365411503-54cc8db9a4d1?q=80&w=800&auto=format&fit=crop',
              category: 'Display',
              specifications: {
                dimensions: '150 x 80 x 120 cm',
                weight: '90 kg',
                powerConsumption: '220V, 350W',
                capacity: '0.6 cubic meters',
                warranty: '2 years',
                material: 'Tempered glass and stainless steel'
              }
            },
            {
              _id: '2',
              name: 'Commercial Coffee Machine - Pro Series',
              description: 'High-capacity professional coffee machine with built-in bean grinder, milk steamer, and multiple brewing options. Perfect for cafes and restaurants.',
              price: 2499.99,
              imageUrl: 'https://images.unsplash.com/photo-1516224398969-17022f9a955e?q=80&w=800&auto=format&fit=crop',
              category: 'Beverage',
              specifications: {
                dimensions: '80 x 60 x 70 cm',
                weight: '35 kg',
                powerConsumption: '220V, 2200W',
                capacity: 'Up to 200 cups per day',
                warranty: '3 years',
                material: 'Stainless steel and ABS plastic'
              }
            },
            {
              _id: '3',
              name: 'Water Cooler & Dispenser - Office Pro',
              description: 'Modern water cooler and dispenser with hot and cold settings, suitable for offices, waiting rooms, and commercial spaces.',
              price: 599.99,
              imageUrl: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?q=80&w=800&auto=format&fit=crop',
              category: 'Beverage',
              specifications: {
                dimensions: '40 x 40 x 110 cm',
                weight: '22 kg',
                powerConsumption: '220V, 550W',
                capacity: '20-liter bottle compatible',
                warranty: '1 year',
                material: 'ABS plastic and stainless steel'
              }
            },
            {
              _id: '4',
              name: 'Industrial Deep Freezer - Cold Storage',
              description: 'High-capacity commercial deep freezer with energy-efficient operation, ideal for restaurants, hotels, and food businesses requiring bulk storage.',
              price: 1899.99,
              imageUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=800&auto=format&fit=crop',
              category: 'Refrigeration',
              specifications: {
                dimensions: '120 x 70 x 85 cm',
                weight: '110 kg',
                powerConsumption: '220V, 420W',
                capacity: '450 liters',
                warranty: '3 years',
                material: 'Stainless steel'
              }
            },
            {
              _id: '5',
              name: 'Three Burner Cooking Range - Chef Pro',
              description: 'Professional three burner cooking range with high-efficiency burners and precise temperature control, suitable for commercial kitchens and restaurants.',
              price: 1499.99,
              imageUrl: 'https://images.unsplash.com/photo-1556911220-bda906717210?q=80&w=800&auto=format&fit=crop',
              category: 'Cooking',
              specifications: {
                dimensions: '120 x 70 x 85 cm',
                weight: '65 kg',
                powerConsumption: 'Gas operated',
                capacity: '3 burners',
                warranty: '2 years',
                material: 'Stainless steel'
              }
            },
            {
              _id: '6',
              name: 'Hot Display Case - Deluxe',
              description: 'Hot display case for maintaining optimal food temperature while showcasing prepared dishes, ideal for cafeterias, delis, and food courts.',
              price: 1299.99,
              imageUrl: 'https://images.unsplash.com/photo-1621241441637-ea2d3f59db26?q=80&w=800&auto=format&fit=crop',
              category: 'Warming',
              specifications: {
                dimensions: '110 x 60 x 70 cm',
                weight: '50 kg',
                powerConsumption: '220V, 1800W',
                capacity: '3 shelves',
                warranty: '1 year',
                material: 'Stainless steel and tempered glass'
              }
            }
          ];

          setProducts(mockProducts);
          const uniqueCategories = [...new Set(mockProducts.map(product => product.category))];
          setCategories(uniqueCategories);
        }
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Using sample data instead.");
        setProducts(mockProducts);
        const uniqueMockCategories = [...new Set(mockProducts.map(product => product.category))];
        setCategories(uniqueMockCategories);
        setLoading(false);
      });
  }, []);
  
  // Filter and sort products based on search term, category, price range, and sort type
  useEffect(() => {
    if (products.length > 0) {
      let filtered = [...products];

      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Filter by category
      if (selectedCategory) {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }

      // Filter by price range
      filtered = filtered.filter(product => 
        product.price >= priceRange.min && product.price <= priceRange.max
      );

      // Sort products
      switch (sortType) {
        case "price-asc":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "name-asc":
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "name-desc":
          filtered.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          // Default sort is by id or whatever default ordering comes from the API
          break;
      }

      setFilteredProducts(filtered);
    }
  }, [products, searchTerm, selectedCategory, priceRange, sortType]);
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };
  
  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value) || 0;
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };
  
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    
    // Update URL to reflect category change
    const params = new URLSearchParams(location.search);
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`);
  };
  
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    
    // Update URL to reflect selected product
    const params = new URLSearchParams(location.search);
    params.set('id', product._id);
    window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`);
    
    // Reset inquiry success flag
    setInquirySuccess(false);
  };
  
  const closeProductDetail = () => {
    setSelectedProduct(null);
    setInquirySuccess(false);
    
    // Remove the id parameter from URL
    const params = new URLSearchParams(location.search);
    params.delete('id');
    window.history.replaceState(
      {}, 
      '', 
      params.toString() ? `${location.pathname}?${params.toString()}` : location.pathname
    );
  };

  // Calculate maximum price for range input
  const maxPrice = products.length > 0 
    ? Math.max(...products.map(product => product.price)) 
    : 10000;

  const handleInquiryChange = (e) => {
    setInquiryForm({
      ...inquiryForm,
      [e.target.name]: e.target.value,
      productId: selectedProduct?._id
    });
  };
  
  const handleInquiry = (e) => {
    e.preventDefault();
    setLoading(true);
    
    axios
      .post(`${API_BASE_URL}/contact-messages`, {
        ...inquiryForm,
        subject: `Product Inquiry: ${selectedProduct?.name || 'Unknown Product'}`
      })
      .then(res => {
        setInquirySuccess(true);
        setInquiryForm({
          name: "",
          email: "",
          message: "",
          productId: ""
        });
      })
      .catch(err => {
        console.error("Error submitting inquiry:", err);
        setError(err.response?.data?.message || "Failed to send inquiry. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="space-y-8">
      {/* Products Header with enhanced design */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-neon-blue/5 to-transparent opacity-30"></div>
        <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-neon-blue/5 filter blur-[100px] opacity-20 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-neon-purple/5 filter blur-[100px] opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative z-10 py-12 sm:py-16 px-4 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent mb-4 sm:mb-6 animate-on-scroll">
            <span className="relative">
              Our Commercial Appliances
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue to-neon-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-DEFAULT max-w-3xl mx-auto animate-on-scroll" style={{ animationDelay: '0.2s' }}>
            Browse our premium selection of high-quality commercial equipment
          </p>
        </div>
      </div>

      {/* Main Container with improved grid layout */}
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Enhanced Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6 bg-[#0A1638]/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-neon-blue/20 hover:border-neon-blue/30 transition-colors duration-300 shadow-lg">
              {/* Search Input */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Search</h3>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search products..."
                    className="w-full px-4 py-2 rounded-lg border border-neon-blue/30 bg-[#0A1638]/50 text-white placeholder-gray-400 focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue/50 transition-all duration-300"
                  />
                  <svg
                    className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              
              {/* Category Select */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Category</h3>
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="w-full px-4 py-2 rounded-lg border border-neon-blue/30 bg-[#0A1638]/50 text-white focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue/50 transition-all duration-300"
                >
                  <option value="">All Categories</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category} className="bg-[#0A1638]">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Price Range */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Price Range</h3>
                <div className="flex items-center space-x-4 mb-3">
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange(e, "min")}
                    placeholder="Min"
                    min="0"
                    className="w-1/2 px-3 py-2 rounded-lg border border-neon-blue/30 bg-[#0A1638]/50 text-white placeholder-gray-400 focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue/50 transition-all duration-300"
                  />
                  <span className="text-white">to</span>
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange(e, "max")}
                    placeholder="Max"
                    min="0"
                    className="w-1/2 px-3 py-2 rounded-lg border border-neon-blue/30 bg-[#0A1638]/50 text-white placeholder-gray-400 focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue/50 transition-all duration-300"
                  />
                </div>
                <div className="relative pt-1">
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange(e, "max")}
                    className="w-full h-2 bg-neon-blue/20 rounded-lg appearance-none cursor-pointer accent-neon-blue"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>₹0</span>
                    <span>₹{maxPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Sort Select */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Sort By</h3>
                <select
                  value={sortType}
                  onChange={handleSortChange}
                  className="w-full px-4 py-2 rounded-lg border border-neon-blue/30 bg-[#0A1638]/50 text-white focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue/50 transition-all duration-300"
                >
                  <option value="default" className="bg-[#0A1638]">Default</option>
                  <option value="price-asc" className="bg-[#0A1638]">Price: Low to High</option>
                  <option value="price-desc" className="bg-[#0A1638]">Price: High to Low</option>
                  <option value="name-asc" className="bg-[#0A1638]">Name: A to Z</option>
                  <option value="name-desc" className="bg-[#0A1638]">Name: Z to A</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid with enhanced styling */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="w-12 h-12 rounded-full border-2 border-t-transparent border-neon-blue animate-spin"></div>
              </div>
            ) : error ? (
              <div className="text-center p-8 bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-xl">
                <p className="text-red-400">{error}</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center p-8 bg-[#0A1638]/30 backdrop-blur-sm rounded-xl border border-neon-blue/20">
                <p className="text-gray-400">No products found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => handleProductClick(product)}
                    className="group bg-[#0A1638]/30 backdrop-blur-sm rounded-xl border border-neon-blue/20 overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-neon-blue/20 hover:-translate-y-1 hover:border-neon-blue/40"
                  >
                    <div className="relative pt-[75%] overflow-hidden">
                      <img 
                        src={product.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"}
                        alt={product.name} 
                        className="absolute inset-0 w-full h-full object-contain bg-[#070d1f] p-2 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1638] via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                    </div>
                    <div className="p-4 sm:p-5">
                      <h3 className="text-lg font-semibold text-white group-hover:text-neon-blue transition-colors duration-300 mb-2 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-3 group-hover:text-gray-300 transition-colors duration-300">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-neon-blue font-medium">₹{product.price.toLocaleString()}</span>
                        <span className="inline-flex items-center rounded-full bg-neon-blue/10 px-2.5 py-1 text-xs font-medium text-neon-blue">
                          {product.category}
                        </span>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProductClick(product);
                          }}
                          className="flex-1 px-4 py-2 bg-[#0A1638] text-white rounded-lg font-medium transform transition-all duration-300 flex items-center justify-center space-x-2 border border-neon-blue/30 hover:border-neon-blue group"
                        >
                          <span className="group-hover:text-neon-blue transition-colors duration-300">View Details</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          className="px-4 py-2 bg-[#0A1638] text-white rounded-lg font-medium transform transition-all duration-300 flex items-center justify-center space-x-2 border border-neon-blue/30 hover:border-neon-blue group"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:text-neon-blue transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-[#0A1638] bg-opacity-90 backdrop-blur-sm transition-opacity" onClick={closeProductDetail}></div>

            <div className="inline-block align-bottom bg-[#0A1638]/80 rounded-2xl border border-neon-blue/20 text-left overflow-hidden shadow-neon-blue/20 transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl w-full relative">
              {/* Decorative Elements */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-72 h-72 bg-neon-blue/5 rounded-full filter blur-[100px] animate-float"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-neon-purple/5 rounded-full filter blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>
              </div>

              <div className="relative">
                <button
                  onClick={closeProductDetail}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#0A1638]/80 backdrop-blur-sm text-white hover:text-neon-blue transition-colors cursor-pointer group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Product Image */}
                  <div className="relative h-96 md:h-[600px] overflow-hidden bg-[#070d1f]">
                    <img 
                      src={selectedProduct.imageUrl || "https://via.placeholder.com/600x400?text=No+Image"} 
                      alt={selectedProduct.name}
                      className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-700 hover:scale-105" 
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0A1638] to-transparent"></div>
                  </div>

                  {/* Product Details */}
                  <div className="p-6 sm:p-8 overflow-y-auto max-h-[80vh] relative">
                    {inquirySuccess ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-6">
                        <div className="h-16 w-16 bg-neon-blue/10 rounded-full flex items-center justify-center mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                        <p className="text-gray-400 mb-6">
                          Your inquiry has been submitted successfully. Our team will get back to you shortly.
                        </p>
                        <button
                          onClick={closeProductDetail}
                          className="px-6 py-2 bg-[#0A1638] text-white rounded-lg border border-neon-blue/30 hover:border-neon-blue hover:text-neon-blue transition-all duration-300"
                        >
                          Close
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="mb-8">
                          <h2 className="text-2xl font-bold text-white mb-2 group">
                            {selectedProduct.name}
                            <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-neon-blue to-neon-purple transition-all duration-500"></div>
                          </h2>
                          <div className="flex items-center mb-4">
                            <span className="text-neon-blue text-xl font-semibold mr-4">
                              ₹{selectedProduct.price.toLocaleString()}
                            </span>
                            <span className="inline-flex items-center rounded-full bg-neon-blue/10 px-2.5 py-1 text-xs font-medium text-neon-blue">
                              {selectedProduct.category}
                            </span>
                            
                            <button
                              onClick={() => addToCart(selectedProduct)}
                              className="ml-auto px-4 py-2 bg-[#0A1638] text-white rounded-lg font-medium border border-neon-blue/30 hover:border-neon-blue hover:text-neon-blue transition-all duration-300 flex items-center space-x-2 group"
                            >
                              <span>Add to Cart</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            </button>
                          </div>
                          <p className="text-gray-400">{selectedProduct.description}</p>
                        </div>

                        {/* Product Specifications */}
                        {selectedProduct.specifications && Object.keys(selectedProduct.specifications).length > 0 && (
                          <div className="mb-8">
                            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-neon-blue/20">Specifications</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                              {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                                <div key={key} className="flex items-center space-x-2 group">
                                  <span className="text-neon-blue text-sm">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                                  <span className="text-gray-400 text-sm group-hover:text-white transition-colors">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Inquiry Form */}
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-neon-blue/20">Request Information</h3>
                          <form onSubmit={handleInquiry} className="space-y-4">
                            <div>
                              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                                Name
                              </label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={inquiryForm.name}
                                onChange={handleInquiryChange}
                                className="w-full px-4 py-2 rounded-lg border border-neon-blue/30 bg-[#0A1638]/50 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue/50 transition-all duration-300"
                              />
                            </div>
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                                Email
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={inquiryForm.email}
                                onChange={handleInquiryChange}
                                className="w-full px-4 py-2 rounded-lg border border-neon-blue/30 bg-[#0A1638]/50 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue/50 transition-all duration-300"
                              />
                            </div>
                            <div>
                              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                                Message
                              </label>
                              <textarea
                                id="message"
                                name="message"
                                rows="3"
                                required
                                value={inquiryForm.message}
                                onChange={handleInquiryChange}
                                className="w-full px-4 py-2 rounded-lg border border-neon-blue/30 bg-[#0A1638]/50 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue/50 transition-all duration-300"
                                placeholder="I'm interested in this product and would like more information..."
                              ></textarea>
                            </div>
                            <div className="flex justify-end pt-2">
                              <button 
                                type="submit"
                                className="px-6 py-2 bg-[#0A1638] text-white rounded-lg font-medium border border-neon-blue/30 hover:border-neon-blue hover:text-neon-blue transition-all duration-300 flex items-center space-x-2 group"
                              >
                                <span>Submit Inquiry</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </button>
                            </div>
                          </form>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
