import React, { useState, useEffect, useCallback, memo } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

// If toast import fails, provide a fallback implementation
const showToast = toast || {
  success: (message) => console.log('Success:', message),
  error: (message) => console.error('Error:', message)
};

// Create a mock API service for development
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create reusable API service
const apiService = {
  get: async (endpoint) => {
    try {
      // For development, return mock data if no backend
      if (!API_BASE_URL.startsWith("http")) {
        return getMockData(endpoint);
      }
      const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      // Return mock data as fallback
      return getMockData(endpoint);
    }
  },
  post: async (endpoint, data) => {
    try {
      if (!API_BASE_URL.startsWith("http")) {
        return { ...data, _id: `mock-${Date.now()}` };
      }
      const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error posting to ${endpoint}:`, error);
      return { ...data, _id: `mock-${Date.now()}` };
    }
  },
  put: async (endpoint, data) => {
    try {
      if (!API_BASE_URL.startsWith("http")) {
        return data;
      }
      const response = await axios.put(`${API_BASE_URL}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating ${endpoint}:`, error);
      return data;
    }
  },
  delete: async (endpoint) => {
    try {
      if (!API_BASE_URL.startsWith("http")) {
        return { success: true };
      }
      const response = await axios.delete(`${API_BASE_URL}/${endpoint}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting ${endpoint}:`, error);
      return { success: true };
    }
  },
  uploadImage: async (file) => {
    try {
      // In a real app, this would upload to a server/cloud storage
      // For demo, we'll create a local URL
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({ url: reader.result });
        };
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },
  uploadVideo: async (file) => {
    try {
      // In a real app, this would upload to a server/cloud storage
      // For demo, we'll create a local URL
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({ url: reader.result });
        };
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error('Error uploading video:', error);
      throw error;
    }
  }
};

// Mock data for development
const getMockData = (endpoint) => {
  const mockData = {
    "products": [
      {
        _id: "mock-1",
        name: "Display Counter",
        description: "Premium display counter for showcasing products",
        price: 129999,
        imageUrl: "https://images.unsplash.com/photo-1581775231124-4f70b143b85c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        videoUrl: "https://www.youtube.com/watch?v=bTqVqk7FSmY",
        category: "Display",
        featured: true,
        specifications: {
          dimensions: "120x60x90 cm",
          powerConsumption: "220V, 500W",
          warranty: "2 Years",
          features: ["LED Lighting", "Adjustable Shelves", "Temperature Control"]
        }
      },
      {
        _id: "mock-2",
        name: "Coffee Machine",
        description: "Professional coffee machine for cafes and restaurants",
        price: 249999,
        imageUrl: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Beverage",
        featured: true,
        specifications: {
          dimensions: "45x30x40 cm",
          powerConsumption: "220V, 1500W",
          warranty: "1 Year",
          features: ["Multiple Brew Options", "Milk Frother", "Water Filter"]
        }
      },
      {
        _id: "mock-3",
        name: "Deep Freezer",
        description: "Commercial deep freezer with large capacity",
        price: 189999,
        imageUrl: "https://images.unsplash.com/photo-1584992236310-6ded1d34e648?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Refrigeration",
        featured: false,
        specifications: {
          dimensions: "150x70x85 cm",
          powerConsumption: "220V, 800W",
          warranty: "3 Years",
          features: ["Digital Temperature Control", "Energy Efficient", "Large Storage"]
        }
      }
    ],
    "testimonials": [
      {
        _id: "mock-t1",
        name: "John Smith",
        company: "Smith's Cafe",
        content: "The coffee machines from CoolStarDesign have transformed our cafe. Excellent quality and service!"
      },
      {
        _id: "mock-t2",
        name: "Sarah Johnson",
        company: "Frosty Delights",
        content: "We've been using their freezers for years. Reliable and energy-efficient. Highly recommended!"
      }
    ],
    "contact-messages": [
      {
        _id: "mock-msg-1",
        name: "John Doe",
        email: "john@example.com",
        subject: "Product Inquiry",
        message: "I'm interested in your display counters",
        createdAt: new Date().toISOString(),
        read: false
      },
      {
        _id: "mock-msg-2",
        name: "Jane Smith",
        email: "jane@example.com",
        subject: "Support Request",
        message: "Need help with my recent purchase",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        read: true
      }
    ]
  };
  
  const path = endpoint.split("/")[0];
  return mockData[path] || [];
};

// Memoized components for better performance
const TabButton = memo(({ active, onClick, children }) => (
  <button
    className={`py-2 px-4 ${active ? 'border-b-2 border-primary text-primary' : 'text-gray-600'} cursor-pointer`}
    onClick={onClick}
  >
    {children}
  </button>
));

const ProductItem = memo(({ product, onDelete, onToggleFeatured, onEdit }) => (
  <div className="bg-secondary/50 backdrop-blur-md shadow-3d-effect rounded-xl p-4 border border-blue/20 mb-4">
    <div className="flex flex-col sm:flex-row justify-between">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="text-lg font-semibold text-accent">{product.name}</h4>
          {product.videoUrl && (
            <span className="bg-red-500/20 text-red-500 text-xs px-2 py-0.5 rounded-full">
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
                <span>Video</span>
              </div>
            </span>
          )}
        </div>
        <p className="text-sm text-gray-dark">₹{product.price.toLocaleString('en-IN')} - {product.category}</p>
        <p className="mt-1 text-sm text-accent/80">{product.description.substring(0, 100)}...</p>
        
        {product.specifications && (
          <div className="mt-2">
            <p className="text-xs text-gray-dark">
              <span className="font-medium">Dimensions:</span> {product.specifications.dimensions}
            </p>
            {product.specifications.features && product.specifications.features.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {product.specifications.features.map((feature, idx) => (
                  <span key={idx} className="text-xs bg-blue/10 text-blue px-1.5 py-0.5 rounded">
                    {feature}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex mt-2 sm:mt-0 sm:ml-4">
        <button
          onClick={() => onEdit(product)}
          className="bg-blue text-white text-xs px-2 py-1 rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => onToggleFeatured(product)}
          className={`${
            product.featured
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-dark hover:bg-gray-600"
          } text-white text-xs px-2 py-1 rounded mr-2`}
        >
          {product.featured ? "Featured" : "Not Featured"}
        </button>
        <button
          onClick={() => onDelete(product._id)}
          className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
    
    {/* Video Preview (if available) */}
    {product.videoUrl && (
      <div className="mt-4 border border-blue/20 rounded overflow-hidden">
        <div className="aspect-w-16 aspect-h-9 h-40 sm:h-56">
          {product.videoUrl.includes('youtube.com') || product.videoUrl.includes('youtu.be') ? (
            <iframe
              src={`https://www.youtube.com/embed/${product.videoUrl.split('v=')[1]?.split('&')[0] || product.videoUrl.split('youtu.be/')[1]?.split('?')[0]}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          ) : product.videoUrl.includes('vimeo.com') ? (
            <iframe
              src={`https://player.vimeo.com/video/${product.videoUrl.split('vimeo.com/')[1]?.split('?')[0]}`}
              title="Vimeo video player"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          ) : product.videoUrl.startsWith('data:video/') ? (
            <video controls className="w-full h-full">
              <source src={product.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="flex items-center justify-center bg-blue/10 text-accent/60 h-full">
              Video preview not available
            </div>
          )}
        </div>
      </div>
    )}
  </div>
));

const TestimonialItem = memo(({ testimonial, onDelete, onEdit }) => (
  <div className="bg-accent text-secondary p-4 rounded shadow mb-4">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="font-semibold">{testimonial.name}</h4>
        <p className="text-sm text-gray-600">{testimonial.company}</p>
        <p className="mt-2">{testimonial.content}</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(testimonial)}
          className="text-blue-500 hover:text-blue-700 cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(testimonial._id)}
          className="text-red-500 hover:text-red-700 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
));

const MessageItem = memo(({ message, onDelete }) => (
  <div className="bg-accent text-secondary p-4 rounded shadow mb-4">
    <div className="flex justify-between items-start">
      <div>
        <div className="flex items-center gap-2">
          <h4 className="font-semibold">{message.name}</h4>
          <span className="text-sm text-gray-600">({message.email})</span>
        </div>
        <p className="text-sm text-gray-600">{new Date(message.createdAt).toLocaleString()}</p>
        <p className="mt-2">{message.message}</p>
      </div>
      <button
        onClick={() => onDelete(message._id)}
        className="text-red-500 hover:text-red-700 cursor-pointer"
      >
        Delete
      </button>
    </div>
  </div>
));

const EditProductForm = memo(({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    ...product,
    specifications: {
      ...product.specifications,
      features: [...(product.specifications?.features || [])]
    }
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(product.imageUrl);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setLoading(true);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
        
        const { url } = await apiService.uploadImage(file);
        setFormData(prev => ({
          ...prev,
          imageUrl: url
        }));
      } catch (err) {
        console.error("Error handling image:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setLoading(true);
        
        // Check if file size is too large (e.g., 100MB limit)
        if (file.size > 100 * 1024 * 1024) {
          showToast.error("Video file is too large. Maximum size is 100MB.");
          return;
        }
        
        // Check if file type is supported
        if (!file.type.startsWith('video/')) {
          showToast.error("Please select a valid video file.");
          return;
        }
        
        // Preview the video
        const videoURL = URL.createObjectURL(file);
        setVideoPreview(videoURL);
        
        setSelectedVideo(file);
        
        // Upload the video
        const { url } = await apiService.uploadVideo(file);
        setFormData(prev => ({
          ...prev,
          videoUrl: url
        }));
        showToast.success("Video uploaded successfully");
      } catch (err) {
        console.error("Error handling video:", err);
        showToast.error("Failed to upload video");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFeatureAdd = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          features: [...(prev.specifications?.features || []), e.target.value]
        }
      }));
      e.target.value = '';
    }
  };

  const handleFeatureRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        features: prev.specifications.features.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-secondary bg-opacity-80 backdrop-blur-sm transition-opacity" onClick={onCancel}></div>

        <div className="inline-block align-bottom bg-secondary rounded-2xl border border-blue/20 text-left overflow-hidden shadow-blue-glow transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-accent">Edit Product</h3>
              <button onClick={onCancel} className="text-gray-dark hover:text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block mb-1 font-medium text-accent/80">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="price" className="block mb-1 font-medium text-accent/80">Price</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block mb-1 font-medium text-accent/80">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block mb-1 font-medium text-accent/80">Product Image</label>
                <div className="flex items-start space-x-4">
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Supported formats: JPG, PNG, GIF (max 5MB)
                    </p>
                  </div>
                  {imagePreview && (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedImage(null);
                          setImagePreview(null);
                          setFormData(prev => ({ ...prev, imageUrl: "" }));
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium text-accent/80">Product Video</label>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                        className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                      />
                      <p className="mt-1 text-xs text-gray-dark">
                        Supported formats: MP4, WebM (max 100MB)
                      </p>
                    </div>
                    
                    <div className="flex items-center my-2">
                      <div className="flex-grow h-px bg-blue/20"></div>
                      <span className="px-3 text-xs text-gray-dark">OR</span>
                      <div className="flex-grow h-px bg-blue/20"></div>
                    </div>
                    
                    <div className="space-y-2">
                      <input
                        type="text"
                        id="videoUrl"
                        name="videoUrl"
                        value={formData.videoUrl || ""}
                        onChange={handleChange}
                        placeholder="e.g., https://www.youtube.com/watch?v=abcdefgh123"
                        className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                      />
                      <p className="mt-1 text-xs text-gray-dark">Supported formats: YouTube or Vimeo URLs</p>
                    </div>
                  </div>
                  
                  {/* Video Preview */}
                  {(videoPreview || formData.videoUrl) && (
                    <div className="mt-2 border border-blue/30 rounded bg-secondary/70 p-2">
                      <div className="aspect-w-16 aspect-h-9 h-48">
                        {videoPreview ? (
                          <div className="relative">
                            <video controls className="w-full h-full rounded">
                              <source src={videoPreview} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                            <button
                              type="button"
                              onClick={() => {
                                URL.revokeObjectURL(videoPreview);
                                setSelectedVideo(null);
                                setVideoPreview(null);
                                setFormData(prev => ({ ...prev, videoUrl: "" }));
                              }}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ) : formData.videoUrl ? (
                          formData.videoUrl.includes('youtube.com') || formData.videoUrl.includes('youtu.be') ? (
                            <iframe
                              src={`https://www.youtube.com/embed/${formData.videoUrl.split('v=')[1]?.split('&')[0] || formData.videoUrl.split('youtu.be/')[1]?.split('?')[0]}`}
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full rounded"
                            ></iframe>
                          ) : formData.videoUrl.includes('vimeo.com') ? (
                            <iframe
                              src={`https://player.vimeo.com/video/${formData.videoUrl.split('vimeo.com/')[1]?.split('?')[0]}`}
                              title="Vimeo video player"
                              frameBorder="0"
                              allow="autoplay; fullscreen; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full rounded"
                            ></iframe>
                          ) : formData.videoUrl.startsWith('data:video/') ? (
                            <div className="relative">
                              <video controls className="w-full h-full rounded">
                                <source src={formData.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                              <button
                                type="button"
                                onClick={() => {
                                  setFormData(prev => ({ ...prev, videoUrl: "" }));
                                }}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                              >
                                ×
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center bg-blue/10 text-accent/60 rounded h-full">
                              Video preview not available for this URL
                            </div>
                          )
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="category" className="block mb-1 font-medium text-accent/80">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                >
                  <option value="Display">Display Counters</option>
                  <option value="Beverage">Beverage Machines</option>
                  <option value="Refrigeration">Refrigeration</option>
                  <option value="Cooking">Cooking Equipment</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="featured" className="text-accent/80">Featured Product</label>
              </div>

              <div className="space-y-2">
                <label className="block mb-1 font-medium text-accent/80">Specifications</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="specifications.dimensions"
                    placeholder="Dimensions"
                    value={formData.specifications?.dimensions || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                  />
                  <input
                    type="text"
                    name="specifications.powerConsumption"
                    placeholder="Power Consumption"
                    value={formData.specifications?.powerConsumption || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                  />
                  <input
                    type="text"
                    name="specifications.warranty"
                    placeholder="Warranty"
                    value={formData.specifications?.warranty || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-accent/80">Features</label>
                  <input
                    type="text"
                    placeholder="Type a feature and press Enter"
                    onKeyPress={handleFeatureAdd}
                    className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent mb-2"
                  />
                  <div className="flex flex-wrap gap-2">
                    {formData.specifications?.features?.map((feature, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center">
                        {feature}
                        <button
                          type="button"
                          onClick={() => handleFeatureRemove(index)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 border border-blue/30 text-accent rounded hover:bg-blue/10 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue text-white rounded hover:bg-blue-600 cursor-pointer"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});

const TestimonialForm = memo(({ testimonial, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: testimonial?.name || '',
    company: testimonial?.company || '',
    content: testimonial?.content || ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      setFormData({ name: '', company: '', content: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-accent text-secondary p-6 rounded-lg shadow-md ${testimonial ? 'fixed inset-0 z-50 flex items-center justify-center bg-secondary/80 backdrop-blur-sm' : 'mb-8'}`}>
      {testimonial && (
        <div className="absolute inset-0" onClick={onCancel}></div>
      )}
      <div className={`${testimonial ? 'relative bg-accent rounded-xl p-6 max-w-2xl w-full mx-4' : 'w-full'}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            {testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
          </h3>
          {testimonial && (
            <button onClick={onCancel} className="text-gray-dark hover:text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium text-accent/80">Client Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
              required
            />
          </div>

          <div>
            <label htmlFor="company" className="block mb-1 font-medium text-accent/80">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block mb-1 font-medium text-accent/80">Testimonial</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
              required
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3">
            {testimonial && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-blue/30 text-accent rounded hover:bg-blue/10 cursor-pointer"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue text-white rounded hover:bg-blue-600 cursor-pointer"
              disabled={loading}
            >
              {loading ? 'Saving...' : testimonial ? 'Save Changes' : 'Add Testimonial'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

const Admin = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [categoryImages, setCategoryImages] = useState({});
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [editingCategoryImage, setEditingCategoryImage] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: "", type: "info" });
  const [categoryImageForm, setCategoryImageForm] = useState({
    image: null,
    imagePreview: "",
    category: "",
  });
  const [selectedCategoryImage, setSelectedCategoryImage] = useState(null);
  const [categoryImagePreview, setCategoryImagePreview] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    videoUrl: "",
    category: "Display",
    featured: false,
    specifications: {
      dimensions: "",
      powerConsumption: "",
      warranty: "",
      features: []
    }
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchProducts(),
        fetchTestimonials(),
        fetchMessages(),
        fetchCategoryImages()
      ]);
    } catch (err) {
      showNotification("Failed to fetch data", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await apiService.get("products");
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products. Please try again.");
    }
  };

  const fetchTestimonials = async () => {
    try {
      const data = await apiService.get("testimonials");
      setTestimonials(data);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
    }
  };

  const fetchMessages = async () => {
    try {
      const data = await apiService.get("contact-messages");
      setMessages(data);
    } catch (err) {
      console.error("Error fetching messages:", err);
      showNotification("Failed to fetch messages", "error");
    }
  };

  const fetchCategoryImages = async () => {
    try {
      const data = await apiService.get("category-images");
      setCategoryImages(data);
    } catch (err) {
      console.error("Error fetching category images:", err);
      showNotification("Failed to fetch category images", "error");
    }
  };

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      // Handle nested properties (e.g., specifications.dimensions)
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      // Handle top-level properties
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  }, []);

  const handleLoginChange = useCallback((e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleLogin = useCallback((e) => {
    e.preventDefault();
    // In a real app, this would validate against your backend
    if (loginData.username === "admin" && loginData.password === "password") {
      setIsLoggedIn(true);
      setError("");
      showNotification("Login successful", "success");
    } else {
      setError("Invalid username or password");
    }
  }, [loginData]);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setLoginData({ username: "", password: "" });
    showNotification("Logged out successfully", "success");
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setLoading(true);
        
        // Check if file size is too large (e.g., 100MB limit)
        if (file.size > 100 * 1024 * 1024) {
          showNotification("Image file is too large. Maximum size is 100MB.", "error");
          return;
        }
        
        // Check if file type is supported
        if (!file.type.startsWith('image/')) {
          showNotification("Please select a valid image file.", "error");
          return;
        }
        
        // Preview the image
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
        
        setSelectedImage(file);
        
        // Upload the image
        const { url } = await apiService.uploadImage(file);
        setFormData(prev => ({
          ...prev,
          imageUrl: url
        }));
        showNotification("Image uploaded successfully", "success");
      } catch (err) {
        console.error("Error handling image:", err);
        showNotification("Failed to upload image", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setLoading(true);
        
        // Check if file size is too large (e.g., 100MB limit)
        if (file.size > 100 * 1024 * 1024) {
          showToast.error("Video file is too large. Maximum size is 100MB.");
          return;
        }
        
        // Check if file type is supported
        if (!file.type.startsWith('video/')) {
          showToast.error("Please select a valid video file.");
          return;
        }
        
        // Preview the video
        const videoURL = URL.createObjectURL(file);
        setVideoPreview(videoURL);
        
        setSelectedVideo(file);
        
        // Upload the video
        const { url } = await apiService.uploadVideo(file);
        setFormData(prev => ({
          ...prev,
          videoUrl: url
        }));
        showToast.success("Video uploaded successfully");
      } catch (err) {
        console.error("Error handling video:", err);
        showToast.error("Failed to upload video");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validate form
      if (!formData.name || !formData.description || !formData.price) {
        setError("Please fill in all required fields");
        return;
      }
      
      const productData = {
        ...formData,
        price: parseFloat(formData.price)
      };
      
      const newProduct = await apiService.post("products", productData);
      setProducts(prev => [...prev, newProduct]);
      
      // Reset form and image/video preview
      setFormData({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        videoUrl: "",
        category: "Display",
        featured: false,
        specifications: {
          dimensions: "",
          powerConsumption: "",
          warranty: "",
          features: []
        }
      });
      setSelectedImage(null);
      setImagePreview(null);
      setSelectedVideo(null);
      setVideoPreview(null);
      
      showNotification("Product added successfully", "success");
    } catch (err) {
      console.error("Error adding product:", err);
      setError("Failed to add product. Please try again.");
      showNotification("Failed to add product", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await apiService.delete(`products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
      showNotification("Product deleted successfully", "success");
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product. Please try again.");
      showNotification("Failed to delete product", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFeatured = async (product) => {
    setLoading(true);
    try {
      const updatedProduct = { ...product, featured: !product.featured };
      await apiService.put(`products/${product._id}`, updatedProduct);
      setProducts(prev => prev.map(p => p._id === product._id ? updatedProduct : p));
      showNotification(`Product ${updatedProduct.featured ? 'featured' : 'unfeatured'} successfully`, "success");
    } catch (err) {
      console.error("Error updating product:", err);
      setError("Failed to update product. Please try again.");
      showNotification("Failed to update product", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTestimonial = async (id) => {
    setLoading(true);
    try {
      await apiService.delete(`testimonials/${id}`);
      setTestimonials(prev => prev.filter(t => t._id !== id));
      showNotification("Testimonial deleted successfully", "success");
    } catch (err) {
      console.error("Error deleting testimonial:", err);
      showNotification("Failed to delete testimonial", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (id) => {
    setLoading(true);
    try {
      await apiService.delete(`contact-messages/${id}`);
      setMessages(prev => prev.filter(m => m._id !== id));
      showNotification("Message deleted successfully", "success");
    } catch (err) {
      console.error("Error deleting message:", err);
      showNotification("Failed to delete message", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleFeatureAdd = useCallback((e) => {
    if (e.key === 'Enter' && e.target.value) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          features: [...prev.specifications.features, e.target.value]
        }
      }));
      e.target.value = '';
    }
  }, []);

  const handleFeatureRemove = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        features: prev.specifications.features.filter((_, i) => i !== index)
      }
    }));
  }, []);

  const showNotification = (message, type = "info") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  // Handle saving edited product
  const handleSaveEdit = async (updatedProduct) => {
    setLoading(true);
    try {
      // In a real app, this would make an API call
      const updatedProductResponse = await apiService.put(`products/${updatedProduct._id}`, updatedProduct);
      
      // Update products list
      setProducts(prevProducts => 
        prevProducts.map(p => p._id === updatedProduct._id ? updatedProductResponse : p)
      );
      
      // Clear editing state
      setEditingProduct(null);
      
      // Show success notification
      showToast.success("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      showToast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTestimonial = async (formData) => {
    setLoading(true);
    try {
      const response = await apiService.post('testimonials', formData);
      setTestimonials(prev => [...prev, response]);
      showNotification("Testimonial added successfully", "success");
    } catch (err) {
      console.error("Error adding testimonial:", err);
      showNotification("Failed to add testimonial", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditTestimonial = (testimonial) => {
    setEditingTestimonial(testimonial);
  };

  const handleSaveTestimonial = async (formData) => {
    setLoading(true);
    try {
      const response = await apiService.put(`testimonials/${editingTestimonial._id}`, formData);
      setTestimonials(prev => prev.map(t => t._id === editingTestimonial._id ? response : t));
      setEditingTestimonial(null);
      showNotification("Testimonial updated successfully", "success");
    } catch (err) {
      console.error("Error updating testimonial:", err);
      showNotification("Failed to update testimonial", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategoryImage = (categoryImage) => {
    setEditingCategoryImage(categoryImage);
    setCategoryImageForm({
      category: categoryImage.category,
      title: categoryImage.title,
      description: categoryImage.description,
      imageUrl: categoryImage.imageUrl
    });
    setCategoryImagePreview(null);
    setSelectedCategoryImage(null);
  };

  const handleCategoryImageChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file' && files && files[0]) {
      const file = files[0];
      // Check if the file is an image
      if (!file.type.match('image.*')) {
        showNotification("Please select an image file", "error");
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showNotification("Image file size should be less than 5MB", "error");
        return;
      }
      
      setSelectedCategoryImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategoryImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setCategoryImageForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSaveCategoryImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let imageUrl = categoryImageForm.imageUrl;
      
      // Upload image if a new file was selected
      if (selectedCategoryImage) {
        const formData = new FormData();
        formData.append('image', selectedCategoryImage);
        
        try {
          // Use the new upload endpoint
          const uploadResponse = await axios.post(`${API_BASE_URL}/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          
          if (uploadResponse.data && uploadResponse.data.url) {
            imageUrl = uploadResponse.data.url;
          } else {
            // Fallback to base64 encoding if the upload endpoint doesn't return a URL
            const reader = new FileReader();
            const imageDataPromise = new Promise((resolve) => {
              reader.onloadend = () => resolve(reader.result);
              reader.readAsDataURL(selectedCategoryImage);
            });
            
            imageUrl = await imageDataPromise;
          }
        } catch (uploadErr) {
          console.error("Error uploading image:", uploadErr);
          showNotification("Failed to upload image", "error");
          
          // Create a data URL as a fallback
          const reader = new FileReader();
          const imageDataPromise = new Promise((resolve) => {
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(selectedCategoryImage);
          });
          
          imageUrl = await imageDataPromise;
        }
      }
      
      // Prepare data with the image URL (either the original URL or the new uploaded one)
      const categoryData = {
        ...categoryImageForm,
        imageUrl: imageUrl
      };
      
      if (editingCategoryImage) {
        // Update existing category image
        const response = await apiService.put(`category-images/${editingCategoryImage.category}`, categoryData);
        setCategoryImages(prev => prev.map(c => c._id === editingCategoryImage._id ? response : c));
        showNotification("Category image updated successfully", "success");
      } else {
        // Add new category image
        const response = await apiService.post('category-images', categoryData);
        setCategoryImages(prev => [...prev, response]);
        showNotification("Category image added successfully", "success");
      }
      
      // Reset form
      setCategoryImageForm({
        category: "Display Counters",
        title: "",
        description: "",
        imageUrl: ""
      });
      setEditingCategoryImage(null);
      setSelectedCategoryImage(null);
      setCategoryImagePreview(null);
    } catch (err) {
      console.error("Error saving category image:", err);
      showNotification("Failed to save category image", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategoryImage = async (category) => {
    setLoading(true);
    try {
      await apiService.delete(`category-images/${category}`);
      setCategoryImages(prev => prev.filter(c => c.category !== category));
      showNotification("Category image deleted successfully", "success");
    } catch (err) {
      console.error("Error deleting category image:", err);
      showNotification("Failed to delete category image", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle edit product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsAddingProduct(false);
  };
  
  // Render the product form with proper cancel button
  const renderProductForm = () => (
    <div className="bg-secondary/50 backdrop-blur-md shadow-3d-effect rounded-xl p-6 border border-blue/20 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-accent">Add New Product</h3>
        <button 
          onClick={() => setIsAddingProduct(false)} 
          className="text-gray-dark hover:text-accent"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">Product Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded border text-gray-800"
              required
            />
          </div>
          
          <div>
            <label htmlFor="price" className="block mb-1 font-medium">Price (₹) <span className="text-red-500">*</span></label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 rounded border text-gray-800"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className="block mb-1 font-medium">Description <span className="text-red-500">*</span></label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 rounded border text-gray-800"
            required
          ></textarea>
        </div>
        
        <div className="space-y-2">
          <label className="block mb-1 font-medium">Product Image</label>
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 rounded border text-gray-800"
              />
              <p className="text-sm text-gray-500 mt-1">
                Supported formats: JPG, PNG, GIF (max 5MB)
              </p>
            </div>
            {imagePreview && (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedImage(null);
                    setImagePreview(null);
                    setFormData(prev => ({ ...prev, imageUrl: "" }));
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block mb-1 font-medium">Product Video</label>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <div className="space-y-2">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                />
                <p className="mt-1 text-xs text-gray-dark">
                  Supported formats: MP4, WebM (max 100MB)
                </p>
              </div>
              
              <div className="flex items-center my-2">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="px-3 text-sm text-gray-500">OR</span>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="videoUrl" className="block mb-1 font-medium">Video URL</label>
                <input
                  type="text"
                  id="videoUrl"
                  name="videoUrl"
                  value={formData.videoUrl || ""}
                  onChange={handleChange}
                  placeholder="e.g., https://www.youtube.com/watch?v=abcdefgh123"
                  className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                />
                <p className="text-sm text-gray-500">
                  Supported formats: YouTube or Vimeo URLs
                </p>
              </div>
            </div>
            
            {/* Video Preview */}
            {(videoPreview || formData.videoUrl) && (
              <div className="mt-2 p-2 border rounded bg-gray-50">
                <div className="aspect-w-16 aspect-h-9 h-48">
                  {videoPreview ? (
                    <div className="relative">
                      <video controls className="w-full h-full rounded">
                        <source src={videoPreview} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <button
                        type="button"
                        onClick={() => {
                          URL.revokeObjectURL(videoPreview);
                          setSelectedVideo(null);
                          setVideoPreview(null);
                          setFormData(prev => ({ ...prev, videoUrl: "" }));
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ) : formData.videoUrl ? (
                    formData.videoUrl.includes('youtube.com') || formData.videoUrl.includes('youtu.be') ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${formData.videoUrl.split('v=')[1]?.split('&')[0] || formData.videoUrl.split('youtu.be/')[1]?.split('?')[0]}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded"
                      ></iframe>
                    ) : formData.videoUrl.includes('vimeo.com') ? (
                      <iframe
                        src={`https://player.vimeo.com/video/${formData.videoUrl.split('vimeo.com/')[1]?.split('?')[0]}`}
                        title="Vimeo video player"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded"
                      ></iframe>
                    ) : formData.videoUrl.startsWith('data:video/') ? (
                      <div className="relative">
                        <video controls className="w-full h-full rounded">
                          <source src={formData.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, videoUrl: "" }));
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center bg-gray-200 text-gray-600 rounded h-full">
                        Video preview not available for this URL
                      </div>
                    )
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block mb-1 font-medium">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 rounded border text-gray-800"
            >
              <option value="Display">Display Counters</option>
              <option value="Beverage">Beverage Machines</option>
              <option value="Refrigeration">Refrigeration</option>
              <option value="Cooking">Cooking Equipment</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="featured">Featured Product</label>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="dimensions" className="block mb-1 font-medium">Dimensions</label>
            <input
              type="text"
              id="dimensions"
              name="specifications.dimensions"
              placeholder="e.g., 60x40x80 cm"
              value={formData.specifications.dimensions}
              onChange={handleChange}
              className="w-full p-2 rounded border text-gray-800"
            />
          </div>
          
          <div>
            <label htmlFor="powerConsumption" className="block mb-1 font-medium">Power Consumption</label>
            <input
              type="text"
              id="powerConsumption"
              name="specifications.powerConsumption"
              placeholder="e.g., 220V, 1500W"
              value={formData.specifications.powerConsumption}
              onChange={handleChange}
              className="w-full p-2 rounded border text-gray-800"
            />
          </div>
        </div>

        <div>
          <label htmlFor="warranty" className="block mb-1 font-medium">Warranty</label>
          <input
            type="text"
            id="warranty"
            name="specifications.warranty"
            placeholder="e.g., 1 Year Limited Warranty"
            value={formData.specifications.warranty}
            onChange={handleChange}
            className="w-full p-2 rounded border text-gray-800"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Features</label>
          <input
            type="text"
            placeholder="Type a feature and press Enter"
            onKeyPress={handleFeatureAdd}
            className="w-full p-2 rounded border text-gray-800 mb-2"
          />
          <div className="flex flex-wrap gap-2">
            {formData.specifications.features.map((feature, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center">
                {feature}
                <button
                  type="button"
                  onClick={() => handleFeatureRemove(index)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
        
        <button 
          type="submit" 
          className="px-4 py-2 bg-primary text-accent rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );

  const renderProductList = () => (
    <div>
      <h3 className="text-xl font-semibold mb-4">Manage Products</h3>
      {products.length === 0 ? (
        <p className="text-gray-500">No products found. Add your first product above.</p>
      ) : (
        <div className="space-y-4">
          {products.map(product => (
            <ProductItem 
              key={product._id} 
              product={product} 
              onDelete={handleDelete} 
              onToggleFeatured={handleToggleFeatured}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
      {editingProduct && (
        <EditProductForm
          product={editingProduct}
          onSave={handleSaveEdit}
          onCancel={() => setEditingProduct(null)}
        />
      )}
    </div>
  );

  const renderTestimonials = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Client Testimonials</h3>
      
      <TestimonialForm onSave={handleAddTestimonial} />
      
      {testimonials.length === 0 ? (
        <p className="text-gray-500">No testimonials found.</p>
      ) : (
        testimonials.map(testimonial => (
          <TestimonialItem 
            key={testimonial._id} 
            testimonial={testimonial} 
            onDelete={handleDeleteTestimonial}
            onEdit={handleEditTestimonial}
          />
        ))
      )}
      
      {editingTestimonial && (
        <TestimonialForm
          testimonial={editingTestimonial}
          onSave={handleSaveTestimonial}
          onCancel={() => setEditingTestimonial(null)}
        />
      )}
    </div>
  );

  const renderCategoryImages = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Product Category Images</h3>
      
      <div className="bg-accent text-secondary p-6 rounded-lg shadow-md mb-8">
        <h4 className="text-lg font-semibold mb-4">
          {editingCategoryImage ? 'Edit Category Image' : 'Add New Category Image'}
        </h4>
        <form onSubmit={handleSaveCategoryImage} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block mb-1 font-medium">Category <span className="text-red-500">*</span></label>
              <select
                id="category"
                name="category"
                value={categoryImageForm.category}
                onChange={handleCategoryImageChange}
                className="w-full p-2 rounded border text-gray-800 bg-white"
                required
              >
                <option value="Display Counters">Display Counters</option>
                <option value="Beverage Machines">Beverage Machines</option>
                <option value="Refrigeration">Refrigeration</option>
                <option value="Cooking Equipment">Cooking Equipment</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="title" className="block mb-1 font-medium">Title <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="title"
                name="title"
                value={categoryImageForm.title}
                onChange={handleCategoryImageChange}
                className="w-full p-2 rounded border text-gray-800"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block mb-1 font-medium">Description <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="description"
              name="description"
              value={categoryImageForm.description}
              onChange={handleCategoryImageChange}
              className="w-full p-2 rounded border text-gray-800"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1 font-medium">Category Image <span className="text-red-500">*</span></label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="border border-blue/30 rounded p-2 bg-secondary/30">
                  <input
                    type="file"
                    id="categoryImage"
                    name="categoryImage"
                    accept="image/*"
                    onChange={handleCategoryImageChange}
                    className="w-full text-accent"
                  />
                  <p className="mt-1 text-sm text-accent/60">Or provide URL below:</p>
                </div>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={categoryImageForm.imageUrl}
                  onChange={handleCategoryImageChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full mt-2 p-2 rounded border text-gray-800"
                />
              </div>
              
              <div className="flex items-center justify-center">
                {categoryImagePreview ? (
                  <div className="relative w-full h-32 border border-blue/30 rounded overflow-hidden">
                    <img 
                      src={categoryImagePreview} 
                      alt="Category Preview" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategoryImage(null);
                        setCategoryImagePreview(null);
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ) : categoryImageForm.imageUrl ? (
                  <div className="relative w-full h-32 border border-blue/30 rounded overflow-hidden">
                    <img 
                      src={categoryImageForm.imageUrl} 
                      alt="Category Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300x200?text=Invalid+Image+URL';
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-full h-32 border border-blue/30 rounded flex items-center justify-center text-accent/50">
                    Image Preview
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            {editingCategoryImage && (
              <button
                type="button"
                onClick={() => {
                  setEditingCategoryImage(null);
                  setCategoryImageForm({
                    category: "Display Counters",
                    title: "",
                    description: "",
                    imageUrl: ""
                  });
                  setSelectedCategoryImage(null);
                  setCategoryImagePreview(null);
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded cursor-pointer"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue text-white rounded cursor-pointer"
              disabled={loading}
            >
              {loading ? 'Saving...' : editingCategoryImage ? 'Update Category Image' : 'Add Category Image'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {categoryImages.map(categoryImage => (
          <div key={categoryImage._id} className="border border-blue/30 rounded-lg overflow-hidden shadow">
            <div className="h-40 overflow-hidden">
              <img 
                src={categoryImage.imageUrl} 
                alt={categoryImage.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                }}
              />
            </div>
            <div className="p-4 bg-accent text-secondary">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{categoryImage.title}</h3>
                  <p className="text-sm text-white/60 mb-2">{categoryImage.category}</p>
                  <p className="text-sm">{categoryImage.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditCategoryImage(categoryImage)}
                    className="text-blue-light hover:text-blue cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategoryImage(categoryImage.category)}
                    className="text-red-400 hover:text-red-500 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Contact Messages</h3>
      {messages.length === 0 ? (
        <p className="text-gray-500">No messages found.</p>
      ) : (
        messages.map(message => (
          <MessageItem 
            key={message._id} 
            message={message} 
            onDelete={handleDeleteMessage} 
          />
        ))
      )}
    </div>
  );

  // If not logged in, show login form
  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto p-6 bg-accent text-secondary rounded-lg shadow-md mt-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Admin Login</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={loginData.username}
              onChange={handleLoginChange}
              className="w-full p-2 rounded border text-gray-800"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              className="w-full p-2 rounded border text-gray-800"
              required
            />
          </div>
          
          <button type="submit" className="w-full px-4 py-2 bg-primary text-accent rounded cursor-pointer">
            Login
          </button>
        </form>
        
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>For demo purposes, use:</p>
          <p>Username: <strong>admin</strong> | Password: <strong>password</strong></p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient">
      {/* Toast notifications */}
      <Toaster position="top-right" />
      
      {/* Header remains the same */}
      
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-4xl font-bold text-accent mb-8">Admin Panel</h1>
        
        {/* Action buttons */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => {
              setIsAddingProduct(true);
              setEditingProduct(null);
              setActiveTab("products");
            }}
            className="bg-blue text-white px-3 py-2 rounded-md hover:bg-blue/80 mr-3"
          >
            Add Product
          </button>
          <button
            onClick={() => {
              setIsAddingTestimonial(true);
              setEditingTestimonial(null);
              setActiveTab("testimonials");
            }}
            className="bg-purple-500 text-white px-3 py-2 rounded-md hover:bg-purple-600 mr-3"
          >
            Add Testimonial
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-blue/30 mb-6">
          <div className="flex">
            <TabButton 
              active={activeTab === "products"} 
              onClick={() => {
                setActiveTab("products");
                setIsAddingProduct(false);
                setEditingProduct(null);
              }}
            >
              Products
            </TabButton>
            <TabButton 
              active={activeTab === "testimonials"} 
              onClick={() => {
                setActiveTab("testimonials");
                setIsAddingTestimonial(false);
                setEditingTestimonial(null);
              }}
            >
              Testimonials
            </TabButton>
            <TabButton 
              active={activeTab === "categories"} 
              onClick={() => {
                setActiveTab("categories");
                setEditingCategoryImage(null);
              }}
            >
              Categories
            </TabButton>
            <TabButton 
              active={activeTab === "messages"} 
              onClick={() => setActiveTab("messages")}
            >
              Messages
            </TabButton>
          </div>
        </div>
        
        {/* Content area */}
        <div>
          {/* Products tab content */}
          {activeTab === "products" && (
            <>
              {isAddingProduct ? (
                renderProductForm()
              ) : editingProduct ? (
                <EditProductForm 
                  product={editingProduct} 
                  onSave={handleSaveEdit} 
                  onCancel={() => setEditingProduct(null)} 
                />
              ) : (
                <div>
                  <h2 className="text-2xl font-semibold text-accent mb-6">Manage Products</h2>
                  <div className="space-y-4">
                    {products.map(product => (
                      <ProductItem
                        key={product._id}
                        product={product}
                        onDelete={handleDelete}
                        onToggleFeatured={handleToggleFeatured}
                        onEdit={handleEditProduct}
                      />
                    ))}
                    {products.length === 0 && !loading && (
                      <p className="text-center text-accent/60 py-8">No products found. Add your first product.</p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
          
          {/* Testimonials tab content */}
          {activeTab === "testimonials" && renderTestimonials()}
          
          {/* Category Images tab content */}
          {activeTab === "categories" && renderCategoryImages()}
          
          {/* Messages tab content */}
          {activeTab === "messages" && renderMessages()}
        </div>
      </div>
      
      {/* Notifications and other UI elements remain the same */}
    </div>
  );
};

export default Admin;
