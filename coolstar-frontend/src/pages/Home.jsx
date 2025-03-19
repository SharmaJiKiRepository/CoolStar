import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Import the new images from assets
import productImage1 from '../assets/output (1).jpg';
import productImage2 from '../assets/output (2).jpg';
import productImage3 from '../assets/output (3).jpg';

// Create a mock API service for development
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Optimized component with proper error handling and loading states
const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categoryImages, setCategoryImages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroRef = useRef(null);
  const productsRef = useRef(null);
  const testimonialsRef = useRef(null);
  
  // Mock data for development
  const mockProducts = [
    {
      _id: "mock-1",
      name: "Premium Range Cooking Station",
      description: "Professional gas range cooking station with multiple burners",
      price: 249999,
      imageUrl: productImage1,
      category: "Cooking",
      featured: true,
      tag: "Best Seller"
    },
    {
      _id: "mock-2",
      name: "Commercial Refrigeration Unit",
      description: "High-capacity commercial refrigeration for restaurants and cafes",
      price: 329999,
      imageUrl: productImage2,
      category: "Refrigeration",
      featured: true,
      tag: "New Arrival"
    },
    {
      _id: "mock-3",
      name: "Industrial Kitchen Equipment",
      description: "Premium industrial kitchen equipment for professional chefs",
      price: 289999,
      imageUrl: productImage3,
      category: "Equipment",
      featured: true,
      tag: "Popular"
    }
  ];

  // Mock testimonials for development
  const mockTestimonials = [
    {
      _id: "mock-t1",
      name: "John Smith",
      company: "Smith's Cafe",
      content: "The coffee machines from CoolStar have transformed our cafe. The quality is exceptional and the service even better. Highly recommended!",
      rating: 5,
      featured: true
    },
    {
      _id: "mock-t2",
      name: "Sarah Johnson",
      company: "Frosty Delights",
      content: "We've been using CoolStar's freezers for years. They're reliable, energy-efficient, and have helped us reduce operational costs.",
      rating: 5, 
      featured: true
    },
    {
      _id: "mock-t3",
      name: "Robert Chen",
      company: "Premium Bakery",
      content: "The display counters are elegant and functional. Our pastries look even more tempting now! The team was professional from installation to support.",
      rating: 4,
      featured: true
    }
  ];
  
  // Stats for the stats section
  const stats = [
    { value: "1000+", label: "Products Sold" },
    { value: "500+", label: "Happy Clients" },
    { value: "10+", label: "Years Experience" },
    { value: "24/7", label: "Customer Support" }
  ];
  
  // Categories for the categories section
  const categories = [
    {
      id: "display",
      name: "Display Counters",
      description: "Showcase your products with our premium display counters",
      image: "https://images.unsplash.com/photo-1581775231124-4f70b143b85c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      link: "/catalogue?category=Display"
    },
    {
      id: "beverage",
      name: "Beverage Machines",
      description: "Professional coffee machines and water coolers",
      image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      link: "/catalogue?category=Beverage"
    },
    {
      id: "refrigeration",
      name: "Refrigeration",
      description: "Deep freezers, visi coolers, and refrigeration solutions",
      image: "https://images.unsplash.com/photo-1584992236310-6ded1d34e648?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      link: "/catalogue?category=Refrigeration"
    },
    {
      id: "cooking",
      name: "Cooking Equipment",
      description: "Commercial cooking ranges, food warmers, and hot cases",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      link: "/catalogue?category=Cooking"
    }
  ];

  // Fetch featured products - MODIFIED TO DIRECTLY USE IMPORTED IMAGES
  useEffect(() => {
    // Directly use the local images instead of trying to fetch from API
    setFeaturedProducts(mockProducts);
    setLoading(false);
    console.log("Directly loaded mock products with local images");
  }, []);

  // Fetch category images from the API
  useEffect(() => {
    setCategoriesLoading(true);
    axios
      .get(`${API_BASE_URL}/category-images`)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setCategoryImages(res.data);
        } else {
          // Initialize default categories if none exist
          return axios.post(`${API_BASE_URL}/category-images/initialize`)
            .then(() => axios.get(`${API_BASE_URL}/category-images`))
            .then(initRes => {
              setCategoryImages(initRes.data);
            });
        }
      })
      .catch((err) => {
        console.error("Error fetching category images:", err);
        // If error occurred, try to initialize
        axios.post(`${API_BASE_URL}/category-images/initialize`)
          .then(() => axios.get(`${API_BASE_URL}/category-images`))
          .then(initRes => {
            setCategoryImages(initRes.data);
          })
          .catch(initErr => {
            console.error("Error initializing categories:", initErr);
          });
      })
      .finally(() => {
        setCategoriesLoading(false);
      });
  }, []);

  // Fetch testimonials from the API
  useEffect(() => {
    setTestimonialsLoading(true);
    axios
      .get(`${API_BASE_URL}/testimonials`)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setTestimonials(res.data);
        } else {
          // Initialize default testimonials if none exist
          return axios.post(`${API_BASE_URL}/testimonials/initialize`)
            .then(() => axios.get(`${API_BASE_URL}/testimonials`))
            .then(initRes => {
              setTestimonials(initRes.data);
            });
        }
      })
      .catch((err) => {
        console.error("Error fetching testimonials:", err);
        // If error occurred, use mock testimonials
        setTestimonials(mockTestimonials);
      })
      .finally(() => {
        setTestimonialsLoading(false);
      });
  }, []);

  // Animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible) {
          el.classList.add('animate-in');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-advance product carousel - force immediate loading
  useEffect(() => {
    // Force immediate loading of the mock data
    setFeaturedProducts([...mockProducts]);
    
    // Set initial slide
    if (featuredProducts.length > 0) {
      setCurrentSlide(0);
      console.log("Starting carousel with first slide");
      
      // Set up timer with a simpler implementation
      const timer = setInterval(() => {
        setCurrentSlide(current => {
          // Calculate next slide
          const next = (current + 1) % featuredProducts.length;
          console.log(`Carousel advancing from slide ${current} to ${next}`);
          return next;
        });
      }, 4000); // Change every 4 seconds (increased from 2 seconds)
      
      // Force a reset of the carousel
      setCurrentSlide(0);
      
      // Clean up
      return () => {
        clearInterval(timer);
      };
    }
  }, [featuredProducts.length]);
  
  // Confirm slide changes in console
  useEffect(() => {
    console.log(`Current slide changed to: ${currentSlide}`);
  }, [currentSlide]);

  // Helper function to format price in Indian Rupee format
  const formatIndianPrice = (price) => {
    // Convert to string and remove any decimal part
    const priceStr = Math.floor(price).toString();
    
    // For values less than 1000, just return with ₹ symbol
    if (priceStr.length <= 3) {
      return `₹${priceStr}`;
    }
    
    // Format with Indian thousand separator
    let lastThree = priceStr.substring(priceStr.length - 3);
    let remaining = priceStr.substring(0, priceStr.length - 3);
    let formatted = remaining.length > 0 ? remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree : lastThree;
    
    return `₹${formatted}`;
  };

  return (
    <div className="relative">
      {/* Hero Section with Cosmic Theme */}
      <div className="relative py-20 rounded-2xl overflow-hidden min-h-[85vh] flex items-center">
        {/* Dark Background Layer */}
        <div className="absolute inset-0 bg-[#050718] opacity-90 z-0"></div>
        
        {/* Cosmic Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Deep Space Nebula */}
          <div className="absolute inset-0 bg-gradient-radial from-[#0A0F2E] via-[#071538] to-[#050718]"></div>
          
          {/* Animated Stars */}
          {[...Array(40)].map((_, i) => (
            <div 
              key={`hero-star-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 2 + 1 + 'px',
                height: Math.random() * 2 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                opacity: Math.random() * 0.7 + 0.3,
                animation: `twinkling ${Math.random() * 5 + 2}s ease-in-out infinite alternate`,
                animationDelay: `${Math.random() * 8}s`
              }}
            ></div>
          ))}
          
          {/* Orbital Elements */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh]">
            {/* Outer orbit */}
            <div className="absolute inset-0 rounded-full border border-neon-blue/10">
              <div className="absolute w-3 h-3 rounded-full bg-neon-blue/70 shadow-neon-blue animate-orbit" style={{ top: '50%', left: '0%', transform: 'translate(-50%, -50%)' }}></div>
            </div>
            
            {/* Middle orbit */}
            <div className="absolute inset-[15%] rounded-full border border-neon-blue/15">
              <div className="absolute w-5 h-5 rounded-full bg-white/80 shadow-neon-white animate-orbit-reverse" style={{ top: '25%', left: '50%', transform: 'translate(-50%, -50%)', animationDuration: '35s' }}></div>
            </div>
            
            {/* Inner orbit */}
            <div className="absolute inset-[30%] rounded-full border border-neon-blue/20">
              <div className="absolute w-4 h-4 rounded-full bg-neon-blue/80 shadow-neon-blue animate-orbit" style={{ top: '75%', left: '50%', transform: 'translate(-50%, -50%)', animationDuration: '15s' }}></div>
            </div>
          </div>
          
          {/* Shooting stars */}
          <div className="absolute top-1/5 left-1/5 w-[3px] h-[80px] bg-white rotate-[35deg] origin-top opacity-0 animate-shooting-star" style={{ animationDelay: '3s', animationDuration: '4s' }}></div>
          <div className="absolute top-2/3 right-1/4 w-[2px] h-[60px] bg-white rotate-[210deg] origin-top opacity-0 animate-shooting-star" style={{ animationDelay: '8s', animationDuration: '3s' }}></div>
          
          {/* Cosmic Dust Cloud */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-neon-blue/5 filter blur-[80px] animate-float" style={{ animationDuration: '40s' }}></div>
            <div className="absolute bottom-1/3 left-1/3 w-[25vw] h-[25vw] rounded-full bg-blue-500/5 filter blur-[70px] animate-float" style={{ animationDuration: '50s', animationDelay: '10s' }}></div>
          </div>
        </div>
        
        {/* Main Content - Split Layout */}
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 py-8 lg:py-12">
            {/* Left Side - Welcome Text */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold mb-4 sm:mb-6 drop-shadow-white-glow tracking-tight leading-tight">
                <span className="text-white">Welcome to </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-white animate-pulse-slow relative">
                  Cool<span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neon-blue">Star</span>
                  <span className="absolute -inset-1 bg-gradient-to-r from-neon-blue/20 to-white/0 blur-xl opacity-30"></span>
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 drop-shadow-glow leading-relaxed">
                Your premier destination for premium quality restaurant equipment with
                <span className="text-neon-blue font-semibold"> futuristic design </span> 
                and 
                <span className="text-white font-semibold"> cutting-edge </span> 
                performance
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mt-6 sm:mt-10">
                <Link to="/products" className="relative px-6 sm:px-8 py-3 sm:py-4 bg-[#0A1638] text-white rounded-lg font-semibold transform transition-all duration-200 overflow-hidden group hover:shadow-neon-blue border border-neon-blue/30 text-sm sm:text-base">
                  <span className="relative z-10">Explore Products</span>
                  <div className="absolute inset-0 bg-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link to="/contact" className="relative px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white rounded-lg font-semibold transform transition-all duration-200 overflow-hidden group hover:shadow-neon-white border border-white/30 text-sm sm:text-base">
                  <span className="relative z-10">Contact Us</span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>
            </div>
            
            {/* Right Side - Product Carousel with Neon Border */}
            <div className="w-full sm:w-10/12 md:w-8/12 lg:w-5/12 relative mt-8 lg:mt-0">
              {loading ? (
                <div className="h-[250px] sm:h-[300px] md:h-[350px] flex justify-center items-center">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 border-4 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="relative h-[250px] sm:h-[300px] md:h-[350px] rounded-xl overflow-hidden"> 
                  {/* Enhanced Neon Border with animation */}
                  <div className="absolute -inset-[2px] sm:-inset-[3px] bg-gradient-to-r from-neon-blue via-white to-neon-purple rounded-xl opacity-80 animate-pulse-slow z-0 shadow-[0_0_15px_rgba(0,240,255,0.8)]"></div>
                  
                  {/* Inner Content */}
                  <div className="absolute inset-[2px] bg-[#0A1638]/90 backdrop-blur-sm rounded-lg z-10 overflow-hidden">
                    {/* Hard-coded set of images as a fallback */}
                    {[0, 1, 2].map((index) => (
                      <div 
                        key={index}
                        className={`absolute inset-0 ${
                          currentSlide === index 
                            ? 'opacity-100 z-20 animate-[fadeInScale_1200ms_ease-in-out]' 
                            : 'opacity-0 z-0 animate-[fadeOutScale_1200ms_ease-in-out]'
                        } flex items-center justify-center`}
                      >
                        <div className="w-full h-full flex items-center justify-center p-2 sm:p-4">
                          <img 
                            src={[productImage1, productImage2, productImage3][index]} 
                            alt={["Premium cooking equipment", "Commercial refrigeration", "Industrial kitchen equipment"][index]} 
                            className="max-w-full max-h-full object-contain rounded-lg"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Enhanced Floating Light Elements */}
              <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 w-3 sm:w-5 h-3 sm:h-5 rounded-full bg-neon-blue/90 shadow-[0_0_15px_rgba(0,240,255,0.8)] animate-float" style={{ animationDuration: '3s' }}></div>
              <div className="absolute -bottom-3 sm:-bottom-4 -left-3 sm:-left-4 w-2 sm:w-4 h-2 sm:h-4 rounded-full bg-neon-purple/80 shadow-[0_0_15px_rgba(157,0,255,0.8)] animate-float" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 -right-2 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-float" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
            </div>
          </div>
          
          {/* Scroll indicator with orbital effect */}
          <div className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce">
            <div className="flex flex-col items-center group cursor-pointer">
              <span className="text-xs sm:text-sm mb-2 sm:mb-3 font-light tracking-wider group-hover:text-neon-blue transition-colors duration-300">
                Scroll Down
              </span>
              <div className="relative">
                {/* Outer glow */}
                <div className="absolute -inset-1 bg-neon-blue/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {/* Arrow icon */}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 sm:h-6 sm:w-6 text-white/50 group-hover:text-neon-blue transition-colors duration-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
                {/* Animated rings */}
                <div className="absolute -inset-2 border border-white/10 rounded-full animate-ping-slow opacity-0 group-hover:opacity-100"></div>
                <div className="absolute -inset-3 border border-white/5 rounded-full animate-ping-slower opacity-0 group-hover:opacity-100" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Section with Glowing Round Cards */}
      <div className="py-16 sm:py-20 lg:py-24 relative z-10">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-radial from-neon-blue/5 to-transparent opacity-30"></div>
        
        {/* Animated star particles */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={`stat-star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 1.5 + 0.5 + 'px',
              height: Math.random() * 1.5 + 0.5 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkling ${Math.random() * 5 + 2}s ease-in-out infinite alternate`
            }}
          ></div>
        ))}
        
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent mb-4 sm:mb-6 animate-on-scroll relative inline-block">
                <span className="relative z-10">The CoolStar Experience</span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue to-neon-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
              </h2>
              <p className="text-gray-DEFAULT animate-on-scroll text-base sm:text-lg leading-relaxed px-4" style={{ animationDelay: '0.2s' }}>
                Our commitment to excellence is reflected in our numbers
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-center animate-on-scroll px-4" style={{ animationDelay: '0.4s' }}>
              {stats.map((stat, index) => (
                <StatCard key={index} number={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Products */}
      <section className="py-24" ref={productsRef}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-accent mb-6 animate-on-scroll relative inline-block">
              <span className="relative z-10">Featured Products</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue to-neon-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
            </h2>
            <p className="text-gray-DEFAULT max-w-2xl mx-auto animate-on-scroll text-lg leading-relaxed px-4" style={{ animationDelay: '0.2s' }}>
              Discover our premium selection of commercial kitchen equipment designed for performance and reliability
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center my-20">
              <div className="w-16 h-16 border-4 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <p>No featured products available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 px-4 sm:px-6">
              {featuredProducts.map((product, index) => (
                <div 
                  key={product._id} 
                  className="bg-[#0A1638]/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-neon-blue/30 transition-all duration-500 group animate-on-scroll border border-[#1A2647] hover:border-neon-blue/40 flex flex-col"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Product Tag */}
                  {product.tag && (
                    <div className="absolute top-3 right-3 bg-neon-blue/80 text-white text-xs font-bold px-3 py-1 rounded-full z-20 shadow-neon-blue/30">
                      {product.tag}
                    </div>
                  )}
                  
                  <div className="h-48 sm:h-56 overflow-hidden relative">
                    <img 
                      src={product.imageUrl || 'https://via.placeholder.com/500x300?text=Product+Image'} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1638] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                    
                    {/* Quick view button that appears on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <Link 
                        to={`/catalogue?id=${product._id}`}
                        className="px-4 py-2 sm:px-5 sm:py-3 bg-[#0A1638]/80 text-white text-sm sm:text-base rounded-lg transform -translate-y-10 group-hover:translate-y-0 transition-all duration-500 backdrop-blur-sm border border-neon-blue/30 hover:bg-neon-blue/20 cursor-pointer"
                      >
                        Quick View
                      </Link>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-6 flex-grow flex flex-col">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-neon-blue transition-colors duration-300 line-clamp-2">{product.name}</h3>
                      <span className="text-neon-blue font-bold text-lg sm:text-xl whitespace-nowrap">
                        {formatIndianPrice(product.price)}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base line-clamp-2">{product.description}</p>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-[#1A2647] mt-auto">
                      <span className="text-xs sm:text-sm text-white/60">Category: <span className="text-neon-blue">{product.category}</span></span>
                      <Link 
                        to={`/catalogue?id=${product._id}`} 
                        className="flex items-center text-white hover:text-neon-blue transition-colors duration-300 cursor-pointer text-sm sm:text-base"
                      >
                        View Details
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12 sm:mt-16 px-4">
            <Link 
              to="/catalogue" 
              className="relative inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-neon-blue/40 text-white font-medium hover:border-neon-blue group transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <span className="relative z-10 flex items-center justify-center text-sm sm:text-base">
                Browse All Products
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/0 via-neon-blue/20 to-neon-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-dark-light/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Add floating elements for visual interest */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-neon-blue/5 filter blur-[80px] animate-float"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-neon-purple/5 filter blur-[90px] animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-accent mb-4 sm:mb-6 animate-on-scroll relative inline-block">
              <span className="relative z-10">Product Categories</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue to-neon-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
            </h2>
            <p className="text-gray-DEFAULT max-w-2xl mx-auto animate-on-scroll text-base sm:text-lg leading-relaxed px-4" style={{ animationDelay: '0.2s' }}>
              Browse our wide range of commercial appliances for your business needs
            </p>
          </div>
          
          {categoriesLoading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 border-t-transparent border-neon-blue animate-spin"></div>
            </div>
          ) : categoryImages.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-accent/70 text-lg">No categories available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
              {categoryImages.map((category, index) => (
                <Link 
                  key={category._id || index}
                  to={category.link || `/catalogue?category=${category.category}`}
                  className="group relative rounded-xl overflow-hidden h-60 sm:h-72 animate-on-scroll hover:shadow-neon-blue/30 transition-all duration-500 border border-[#1A2647] hover:border-neon-blue/40"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img 
                    src={category.imageUrl} 
                    alt={category.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3 group-hover:text-neon-blue transition-colors duration-300">{category.title}</h3>
                    <p className="text-gray-200 mb-4 sm:mb-5 max-w-xs text-sm sm:text-base leading-relaxed line-clamp-2">{category.description}</p>
                    <span className="inline-flex items-center text-neon-blue font-medium text-sm sm:text-base group-hover:translate-x-2 transition-transform duration-300">
                      Explore Products
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                    
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/0 via-neon-blue/5 to-neon-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden" ref={testimonialsRef}>
        {/* Background Design Elements */}
        <div className="absolute inset-0 bg-gradient-radial from-neon-blue/5 to-transparent opacity-30"></div>
        <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-neon-blue/5 filter blur-[100px] opacity-20 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-neon-purple/5 filter blur-[100px] opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Animated Star Particles */}
        {[...Array(10)].map((_, i) => (
          <div 
            key={`testimonial-star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 1.5 + 0.5 + 'px',
              height: Math.random() * 1.5 + 0.5 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkling ${Math.random() * 5 + 2}s ease-in-out infinite alternate`,
              animationDelay: `${Math.random() * 3}s`
            }}
          ></div>
        ))}
        
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent mb-4 sm:mb-6 animate-on-scroll relative inline-block">
              <span className="relative z-10">Client Testimonials</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue to-neon-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
            </h2>
            <p className="text-gray-DEFAULT max-w-2xl mx-auto animate-on-scroll text-base sm:text-lg leading-relaxed px-4" style={{ animationDelay: '0.2s' }}>
              What our customers say about their experience with CoolStar
            </p>
          </div>
          
          {testimonialsLoading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 border-t-transparent border-neon-blue animate-spin"></div>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-accent/70 text-lg">No testimonials available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial._id || index}
                  className="bg-accent/5 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-lg relative overflow-hidden animate-on-scroll transform hover:-translate-y-2 transition-all duration-500 group"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Glowing Border */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-blue/20 via-neon-purple/20 to-neon-blue/20 rounded-xl opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      {/* Rating Stars */}
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={`star-${testimonial._id || index}-${i}`}
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${i < (testimonial.rating || 5) ? 'text-neon-blue' : 'text-accent/30'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      
                      {/* Quote Icon */}
                      <div className="text-neon-blue opacity-20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
                        </svg>
                      </div>
                    </div>
                    
                    {/* Testimonial Content */}
                    <p className="text-accent mb-6 sm:mb-8 relative z-10 text-sm sm:text-base leading-relaxed line-clamp-4">"{testimonial.content}"</p>
                    
                    {/* Client Info */}
                    <div className="flex items-center mt-auto pt-4 border-t border-accent/10">
                      <div>
                        <h4 className="font-semibold text-white text-base sm:text-lg">{testimonial.name}</h4>
                        <p className="text-accent/60 text-sm sm:text-base">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/0 via-neon-blue/5 to-neon-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-neon-blue/5 filter blur-[100px] opacity-30 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-neon-purple/5 filter blur-[100px] opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Animated Star Particles */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={`cta-star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 1.5 + 0.5 + 'px',
              height: Math.random() * 1.5 + 0.5 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkling ${Math.random() * 5 + 2}s ease-in-out infinite alternate`,
              animationDelay: `${Math.random() * 3}s`
            }}
          ></div>
        ))}
        
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto bg-accent/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-10 lg:p-14 shadow-lg relative overflow-hidden animate-on-scroll transform hover:shadow-neon-blue/20 transition-all duration-500 group">
            {/* Enhanced Glowing Border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-blue/20 via-neon-purple/20 to-neon-blue/20 rounded-xl sm:rounded-2xl opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
            
            {/* Background Glow Effects */}
            <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-neon-blue/10 filter blur-[50px] opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-neon-purple/10 filter blur-[50px] opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-accent mb-4 sm:mb-6 text-center animate-on-scroll">
                Ready to Upgrade Your Business?
              </h2>
              <p className="text-gray-DEFAULT text-center mb-6 sm:mb-8 lg:mb-10 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto animate-on-scroll" style={{ animationDelay: '0.2s' }}>
                Contact our sales team today to get personalized recommendations and exclusive offers for your business needs.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 animate-on-scroll" style={{ animationDelay: '0.4s' }}>
                <Link 
                  to="/contact" 
                  className="relative px-6 sm:px-8 py-3 sm:py-4 bg-[#0A1638] text-white rounded-lg font-semibold transform transition-all duration-300 overflow-hidden group hover:shadow-neon-blue border border-neon-blue/30 text-sm sm:text-base flex items-center justify-center"
                >
                  <span className="relative z-10 flex items-center">
                    Contact Sales
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-neon-blue opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </Link>
                <Link 
                  to="/catalogue" 
                  className="relative px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white rounded-lg font-semibold transform transition-all duration-300 overflow-hidden group hover:shadow-neon-white border border-white/30 text-sm sm:text-base flex items-center justify-center"
                >
                  <span className="relative z-10 flex items-center">
                    Browse Catalogue
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CSS for animations */}
      <style jsx="true">{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes pulse-slow {
          0% { opacity: 0.3; }
          50% { opacity: 0.6; }
          100% { opacity: 0.3; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes fadeOutScale {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(1.05);
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          80%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes ping-slower {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          80%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-ping-slower {
          animation: ping-slower 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

// StatCard Component with Glowing Circular Design
const StatCard = ({ number, label }) => {
  return (
    <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full mb-3 sm:mb-4 overflow-hidden group">
        {/* Inner gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1638] to-[#050B20] border border-neon-blue/20"></div>
        
        {/* Pulsing outer ring */}
        <div className="absolute -inset-0.5 bg-neon-blue opacity-30 rounded-full animate-pulse-slow"></div>
        
        {/* Inner glowing ring */}
        <div className="absolute inset-0 rounded-full border border-neon-blue/40 group-hover:border-neon-blue/60 transition-all duration-500"></div>
        
        {/* Subtle radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-neon-blue/5 to-transparent opacity-70"></div>
        
        {/* Animated particles around the circle */}
        <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '15s' }}>
          <div className="absolute top-0 left-1/2 w-1 h-1 bg-white rounded-full opacity-70"></div>
          <div className="absolute top-1/4 right-0 w-1 h-1 bg-white rounded-full opacity-60"></div>
          <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-white rounded-full opacity-80"></div>
          <div className="absolute top-1/2 left-0 w-1 h-1 bg-white rounded-full opacity-50"></div>
        </div>
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center p-2 sm:p-4 z-10">
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white drop-shadow-glow mb-0.5 sm:mb-1 animate-pulse-slow">
            {number}
          </div>
        </div>
      </div>
      
      {/* Label text */}
      <div className="text-neon-blue text-center font-medium text-sm sm:text-base">
        {label}
      </div>
    </div>
  );
};

export default Home;
