import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductCatalogue = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define dummy products data
  const dummyProducts = [
    {
      _id: '1',
      name: 'Premium Glass Display Counter',
      description: 'Round & straight glass display counter with LED lighting and temperature control. Perfect for bakeries, cafes, and retail stores.',
      price: 1299.99,
      imageUrl: 'https://images.unsplash.com/photo-1581365411503-54cc8db9a4d1?q=80&w=800&auto=format&fit=crop',
      category: 'Display',
      features: ['Adjustable Shelves', 'LED Lighting', 'Temperature Control', 'Front Glass Display'],
      dimensions: '120cm x 60cm x 90cm',
      inStock: true
    },
    {
      _id: '2',
      name: 'Commercial Coffee Machine',
      description: 'High-capacity professional coffee machine with bean grinder and milk steamer. Ideal for cafes, restaurants and hotels.',
      price: 2499.99,
      imageUrl: 'https://images.unsplash.com/photo-1516224398969-17022f9a955e?q=80&w=800&auto=format&fit=crop',
      category: 'Beverage',
      features: ['Bean Grinder', 'Milk Steamer', 'Dual Dispensers', 'Hot Water Tap'],
      dimensions: '75cm x 55cm x 60cm',
      inStock: true
    },
    {
      _id: '3',
      name: 'Industrial Deep Freezer',
      description: 'Energy-efficient deep freezer with adjustable temperature and large storage capacity. Perfect for food storage and ice cream parlors.',
      price: 1899.99,
      imageUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=800&auto=format&fit=crop',
      category: 'Refrigeration',
      features: ['Digital Temperature Control', 'Energy Efficient', 'Lockable Lid', 'Fast Freezing Technology'],
      dimensions: '140cm x 80cm x 85cm',
      inStock: true
    },
    {
      _id: '4',
      name: 'Food Warmer Display',
      description: 'Commercial food warmer with glass display for maintaining food at optimal temperature. Great for buffets and food service.',
      price: 899.99,
      imageUrl: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=800&auto=format&fit=crop',
      category: 'Warming',
      features: ['Adjustable Temperature', 'Humidity Control', 'Sliding Doors', 'Interior Lighting'],
      dimensions: '110cm x 50cm x 60cm',
      inStock: true
    },
    {
      _id: '5',
      name: 'Ice Cream Display Freezer',
      description: 'Curved glass freezer display specifically designed for ice cream shops and gelaterias with optimal visibility.',
      price: 1699.99,
      imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=800&auto=format&fit=crop',
      category: 'IceCream',
      features: ['Curved Glass Display', 'Digital Temperature Control', 'Night Cover', 'Anti-Condensation System'],
      dimensions: '130cm x 70cm x 120cm',
      inStock: true
    },
    {
      _id: '6',
      name: 'Water Dispenser Cooler',
      description: 'Commercial grade water cooler with hot and cold dispensers. Perfect for offices and public spaces.',
      price: 799.99,
      imageUrl: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?q=80&w=800&auto=format&fit=crop',
      category: 'Beverage',
      features: ['Hot & Cold Water', 'Cabinet Storage', 'Child Safety Lock', 'Energy Saving Mode'],
      dimensions: '40cm x 40cm x 110cm',
      inStock: true
    },
    {
      _id: '7',
      name: 'Three Burner Cooking Range',
      description: 'Professional stainless steel cooking range with three high-efficiency burners. Ideal for commercial kitchens.',
      price: 1299.99,
      imageUrl: 'https://images.unsplash.com/photo-1556911220-bda906717210?q=80&w=800&auto=format&fit=crop',
      category: 'Cooking',
      features: ['High-Efficiency Burners', 'Stainless Steel Construction', 'Safety Flame Control', 'Easy Clean Surface'],
      dimensions: '90cm x 70cm x 85cm',
      inStock: true
    },
    {
      _id: '8',
      name: 'Visi Cooler Refrigerator',
      description: 'Double door visi cooler with energy efficient cooling for beverages and perishable items. Perfect for retail displays.',
      price: 1599.99,
      imageUrl: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=800&auto=format&fit=crop',
      category: 'Refrigeration',
      features: ['Double Glass Door', 'LED Interior Lighting', 'Dynamic Cooling', 'Digital Thermostat'],
      dimensions: '120cm x 65cm x 190cm',
      inStock: true
    },
    {
      _id: '9',
      name: 'Professional Kitchen Hot Case',
      description: 'Stainless steel hot case for keeping prepared food at serving temperature with humidity control.',
      price: 999.99,
      imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=800&auto=format&fit=crop',
      category: 'Warming',
      features: ['Precise Temperature Control', 'Steam Function', 'Multiple Shelves', 'Toughened Glass Front'],
      dimensions: '100cm x 60cm x 70cm',
      inStock: true
    },
    {
      _id: '10',
      name: 'Commercial Juice Dispenser',
      description: 'Multi-tank juice dispenser with cooling function. Perfect for buffets, breakfast services, and events.',
      price: 699.99,
      imageUrl: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?q=80&w=800&auto=format&fit=crop',
      category: 'Beverage',
      features: ['Triple Tank Design', 'Capacity: 12L per Tank', 'Built-in Cooling', 'Easy to Clean'],
      dimensions: '45cm x 40cm x 65cm per tank',
      inStock: true
    },
    {
      _id: '11',
      name: 'Gelato Display Case',
      description: 'Premium gelato display case with 12 pan capacity. Features elegant design and optimal temperature control.',
      price: 2299.99,
      imageUrl: 'https://images.unsplash.com/photo-1529688530647-93a6e1916f5f?q=80&w=800&auto=format&fit=crop',
      category: 'IceCream',
      features: ['12 Pan Capacity', 'Double Curved Glass', 'Digital Controller', 'Ventilated Refrigeration'],
      dimensions: '170cm x 75cm x 120cm',
      inStock: true
    },
    {
      _id: '12',
      name: 'Pasta Cooker Station',
      description: 'Commercial electric pasta cooker with multiple baskets. Essential for Italian restaurants and food services.',
      price: 1199.99,
      imageUrl: 'https://images.unsplash.com/photo-1633352615955-f0c99e8b8b5a?q=80&w=800&auto=format&fit=crop',
      category: 'Cooking',
      features: ['4 Basket Design', 'Stainless Steel Construction', 'Timer Function', 'Easy Water Drainage'],
      dimensions: '60cm x 60cm x 85cm',
      inStock: true
    }
  ];

  useEffect(() => {
    // Try to fetch products from API
    setLoading(true);
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(res.data.map(product => product.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        // Use dummy data on error
        setProducts(dummyProducts);
        setFilteredProducts(dummyProducts);
        
        // Extract unique categories from dummy data
        const uniqueCategories = [...new Set(dummyProducts.map(product => product.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      });
  }, []);

  // Filter products by category and search term
  useEffect(() => {
    let filtered = products;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, products]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="py-16 min-h-screen">
      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 rounded-full border border-blue-light/30 bg-blue/5 text-blue-light text-sm font-medium mb-4">
            Our Products
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-accent mb-4">
            Product <span className="text-blue-light">Catalogue</span>
          </h1>
          <p className="text-gray-DEFAULT max-w-2xl mx-auto">
            Browse our extensive collection of premium commercial appliances, designed for professional use with cutting-edge technology
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-dark-light/60 backdrop-blur-md rounded-xl p-6 mb-10 border border-blue/10">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full py-3 px-5 pl-12 bg-dark-lighter border border-blue/20 rounded-lg text-accent focus:border-blue-light focus:outline-none focus:ring-1 focus:ring-blue-light transition-colors"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <svg className="w-5 h-5 text-gray-DEFAULT absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="md:w-auto">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`px-4 py-3 rounded-lg transition-all duration-300 text-sm cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-blue text-white shadow-neon-blue'
                      : 'bg-dark-lighter text-gray-DEFAULT border border-blue/20 hover:border-blue-light'
                  }`}
                >
                  All Products
                </button>
                
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-3 rounded-lg transition-all duration-300 text-sm cursor-pointer ${
                      selectedCategory === category
                        ? 'bg-blue text-white shadow-neon-blue'
                        : 'bg-dark-lighter text-gray-DEFAULT border border-blue/20 hover:border-blue-light'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-2 border-blue/10 animate-pulse-slow"></div>
              <div className="absolute inset-0 rounded-full border-t-2 border-blue-light animate-spin"></div>
            </div>
            <span className="ml-4 text-accent">Loading products...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-blue/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-medium text-accent mb-2">No products found</h3>
            <p className="text-gray-DEFAULT">
              We couldn't find any products matching your criteria. Try adjusting your filters or search term.
            </p>
            <button 
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
              }}
              className="mt-6 px-6 py-3 rounded-full bg-blue text-white hover:shadow-neon-blue transition-all duration-300 cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product._id}
                className="group bg-dark-light/60 backdrop-blur-md border border-blue/10 rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-neon-blue hover:-translate-y-1"
              >
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent opacity-90"></div>
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-blue/10 backdrop-blur-md px-3 py-1 rounded-full text-blue-light font-medium text-sm border border-blue-light/20 shadow-neon-blue">
                    ₹{product.price.toLocaleString()}
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-secondary/80 backdrop-blur-md px-2 py-1 rounded-full text-gray-DEFAULT text-xs border border-blue/10">
                    {product.category}
                  </div>
                  
                  {/* View Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link 
                      to={`/products?id=${product._id}`}
                      className="px-4 py-2 rounded-full bg-blue text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-neon-blue"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-medium text-accent group-hover:text-blue-light transition-colors duration-300 mb-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-DEFAULT text-sm line-clamp-2 mb-4">
                    {product.description}
                  </p>
                  
                  {/* Features */}
                  {product.features && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {product.features.slice(0, 3).map((feature, idx) => (
                          <span 
                            key={idx} 
                            className="inline-block px-2 py-1 bg-blue/5 text-blue-light text-xs rounded-md border border-blue/10"
                          >
                            {feature}
                          </span>
                        ))}
                        {product.features.length > 3 && (
                          <span className="inline-block px-2 py-1 bg-blue/5 text-blue-light text-xs rounded-md border border-blue/10">
                            +{product.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    
                    <Link 
                      to={`/products?id=${product._id}`} 
                      className="flex items-center text-blue-light text-sm hover:text-blue-light font-medium"
                    >
                      Details
                      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Contact CTA */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-accent mb-4">Need a custom solution?</h2>
          <p className="text-gray-DEFAULT mb-8">
            Contact our team for personalized recommendations or custom configurations tailored to your business needs.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 rounded-full bg-blue text-white shadow-neon-blue hover:shadow-neon-blue-strong transform hover:-translate-y-1 transition-all duration-300"
          >
            Contact Our Team
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalogue; 