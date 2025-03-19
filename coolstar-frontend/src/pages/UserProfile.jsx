import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const UserProfile = () => {
  const { user, logout, updateProfile, authAxios, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'profile');
  const [loading, setLoading] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(location.state?.message || null);
  
  // Profile form data
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    address: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    postalCode: user?.address?.postalCode || '',
    country: user?.address?.country || 'India',
  });
  
  // Orders data
  const [orders, setOrders] = useState([]);
  const [ordersError, setOrdersError] = useState(null);
  
  // Password change data
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Preferences data
  const [preferencesData, setPreferencesData] = useState({
    emailNotifications: true,
    smsNotifications: false,
    weeklyNewsletter: true,
    productUpdates: true
  });
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/profile' } });
    }
  }, [isAuthenticated, navigate]);
  
  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated || activeTab !== 'orders') {
        return;
      }
      
      setOrdersLoading(true);
      try {
        const response = await authAxios.get(`${API_BASE_URL}/orders/myorders`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrdersError('Failed to fetch your orders. Please try again later.');
      } finally {
        setOrdersLoading(false);
      }
    };
    
    fetchOrders();
  }, [activeTab, isAuthenticated, authAxios]);
  
  // Format price in Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };
  
  // Handle form input changes
  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await updateProfile(profileData);
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  
  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };
  
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      setLoading(false);
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }
    
    try {
      await updateProfile({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      setSuccess('Password changed successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };
  
  const handlePreferenceChange = (e) => {
    setPreferencesData({
      ...preferencesData,
      [e.target.name]: e.target.checked
    });
  };
  
  const handlePreferenceSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    // For demo, simulate API call with setTimeout
    setTimeout(() => {
      setLoading(false);
      setSuccess('Preferences updated successfully');
    }, 1000);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  // If user isn't loaded yet or not logged in
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue"></div>
      </div>
    );
  }
  
  return (
    <div className="py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-accent mb-3 sm:mb-6">My Account</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 text-green-500 rounded-lg">
            {success}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          {/* Sidebar - on mobile, make it a horizontal scroll tab menu at the top */}
          <div className="lg:col-span-3">
            {/* Desktop sidebar */}
            <div className="hidden sm:block bg-secondary/50 backdrop-blur-md shadow-3d-effect rounded-xl p-4 sm:p-6 border border-blue/20 mb-6 sm:mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-neon-blue/20 flex items-center justify-center text-accent font-bold text-base sm:text-xl">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-accent">{user?.name || 'User'}</h3>
                  <p className="text-xs sm:text-sm text-gray-dark">{user?.email || 'user@example.com'}</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`block w-full text-left px-3 sm:px-4 py-2 rounded-lg ${
                    activeTab === 'profile'
                      ? 'bg-blue text-white'
                      : 'text-accent hover:bg-blue/10'
                  } transition-colors cursor-pointer text-sm sm:text-base`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`block w-full text-left px-3 sm:px-4 py-2 rounded-lg ${
                    activeTab === 'orders'
                      ? 'bg-blue text-white'
                      : 'text-accent hover:bg-blue/10'
                  } transition-colors cursor-pointer text-sm sm:text-base`}
                >
                  Order History
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`block w-full text-left px-3 sm:px-4 py-2 rounded-lg ${
                    activeTab === 'security'
                      ? 'bg-blue text-white'
                      : 'text-accent hover:bg-blue/10'
                  } transition-colors cursor-pointer text-sm sm:text-base`}
                >
                  Security
                </button>
                <button
                  onClick={() => setActiveTab('preferences')}
                  className={`block w-full text-left px-3 sm:px-4 py-2 rounded-lg ${
                    activeTab === 'preferences'
                      ? 'bg-blue text-white'
                      : 'text-accent hover:bg-blue/10'
                  } transition-colors cursor-pointer text-sm sm:text-base`}
                >
                  Preferences
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 sm:px-4 py-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer text-sm sm:text-base"
                >
                  Logout
                </button>
              </nav>
            </div>
            
            {/* Mobile tab menu */}
            <div className="sm:hidden overflow-x-auto whitespace-nowrap pb-2 mb-4">
              <div className="inline-flex space-x-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === 'profile'
                      ? 'bg-blue text-white'
                      : 'bg-secondary/50 text-accent'
                  } transition-colors`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === 'orders'
                      ? 'bg-blue text-white'
                      : 'bg-secondary/50 text-accent'
                  } transition-colors`}
                >
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === 'security'
                      ? 'bg-blue text-white'
                      : 'bg-secondary/50 text-accent'
                  } transition-colors`}
                >
                  Security
                </button>
                <button
                  onClick={() => setActiveTab('preferences')}
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === 'preferences'
                      ? 'bg-blue text-white'
                      : 'bg-secondary/50 text-accent'
                  } transition-colors`}
                >
                  Preferences
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="lg:col-span-9">
            <div className="bg-secondary/50 backdrop-blur-md shadow-3d-effect rounded-xl p-4 sm:p-6 border border-blue/20">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-bold text-accent mb-4">Profile Information</h2>
                  
                  <form onSubmit={handleProfileSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block mb-1 font-medium text-accent/80">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={profileData.name}
                          onChange={handleProfileChange}
                          className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block mb-1 font-medium text-accent/80">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                          className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                          disabled
                        />
                        <p className="text-xs text-accent/60 mt-1">Email cannot be changed</p>
                      </div>
                      
                      <div>
                        <label htmlFor="phoneNumber" className="block mb-1 font-medium text-accent/80">Phone Number</label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={profileData.phoneNumber}
                          onChange={handleProfileChange}
                          className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block mb-1 font-medium text-accent/80">Address</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={profileData.address}
                          onChange={handleProfileChange}
                          className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="city" className="block mb-1 font-medium text-accent/80">City</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={profileData.city}
                          onChange={handleProfileChange}
                          className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block mb-1 font-medium text-accent/80">State</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={profileData.state}
                          onChange={handleProfileChange}
                          className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="postalCode" className="block mb-1 font-medium text-accent/80">Postal Code</label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={profileData.postalCode}
                          onChange={handleProfileChange}
                          className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="country" className="block mb-1 font-medium text-accent/80">Country</label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={profileData.country}
                          onChange={handleProfileChange}
                          className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={loading}
                        className={`px-6 py-2 bg-blue text-white rounded hover:bg-blue/80 transition ${
                          loading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-bold text-accent mb-4">Order History</h2>
                  
                  {ordersLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-blue"></div>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-accent mb-4">You haven't placed any orders yet</p>
                      <Link 
                        to="/catalogue" 
                        className="inline-block px-6 py-2 bg-blue text-white rounded hover:bg-blue/80 transition"
                      >
                        Browse Products
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order._id} className="border border-blue/20 rounded-lg overflow-hidden">
                          {/* Order Header */}
                          <div className="bg-secondary/70 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                            <div>
                              <p className="text-xs text-accent/60">ORDER PLACED</p>
                              <p className="text-sm text-accent">{formatDate(order.createdAt)}</p>
                            </div>
                            
                            <div className="mt-2 sm:mt-0">
                              <p className="text-xs text-accent/60">TOTAL</p>
                              <p className="text-sm font-medium text-accent">{formatPrice(order.totalPrice)}</p>
                            </div>
                            
                            <div className="mt-2 sm:mt-0">
                              <p className="text-xs text-accent/60">ORDER ID</p>
                              <p className="text-sm text-accent">{order._id}</p>
                            </div>
                            
                            <div className="mt-2 sm:mt-0">
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                order.status === 'Delivered' 
                                  ? 'bg-green-500/10 text-green-500' 
                                  : order.status === 'Cancelled'
                                  ? 'bg-red-500/10 text-red-500'
                                  : order.status === 'Shipped'
                                  ? 'bg-blue/10 text-blue'
                                  : 'bg-yellow-500/10 text-yellow-500'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                          </div>
                          
                          {/* Order Items */}
                          <div className="p-4">
                            <h3 className="font-medium text-accent mb-3">Items</h3>
                            
                            <div className="space-y-3">
                              {order.orderItems.map((item) => (
                                <div key={item._id} className="flex items-center">
                                  <div className="w-16 h-16 flex-shrink-0">
                                    <img 
                                      src={item.image} 
                                      alt={item.name} 
                                      className="w-full h-full object-cover rounded"
                                    />
                                  </div>
                                  
                                  <div className="ml-4 flex-1">
                                    <h4 className="text-accent font-medium">{item.name}</h4>
                                    <p className="text-sm text-accent/70">Qty: {item.quantity}</p>
                                  </div>
                                  
                                  <div className="text-accent font-medium">
                                    {formatPrice(item.price)}
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            {/* Shipping Address */}
                            <div className="mt-4 pt-4 border-t border-blue/10">
                              <h3 className="font-medium text-accent mb-2">Shipping Address</h3>
                              <p className="text-sm text-accent/70">
                                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Security Tab */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-xl font-bold text-accent mb-4">Change Password</h2>
                  
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block mb-1 font-medium text-accent/80">Current Password</label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block mb-1 font-medium text-accent/80">New Password</label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                        required
                        minLength={6}
                      />
                      <p className="text-xs text-accent/60 mt-1">Password must be at least 6 characters long</p>
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block mb-1 font-medium text-accent/80">Confirm New Password</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                        required
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={loading}
                        className={`px-6 py-2 bg-blue text-white rounded hover:bg-blue/80 transition ${
                          loading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {loading ? 'Updating...' : 'Update Password'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div>
                  <h2 className="text-xl font-bold text-accent mb-4">Notification Preferences</h2>
                  
                  <form onSubmit={handlePreferenceSubmit} className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="emailNotifications"
                          name="emailNotifications"
                          checked={preferencesData.emailNotifications}
                          onChange={handlePreferenceChange}
                          className="mr-2"
                        />
                        <label htmlFor="emailNotifications" className="text-accent">Email Notifications</label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="smsNotifications"
                          name="smsNotifications"
                          checked={preferencesData.smsNotifications}
                          onChange={handlePreferenceChange}
                          className="mr-2"
                        />
                        <label htmlFor="smsNotifications" className="text-accent">SMS Notifications</label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="weeklyNewsletter"
                          name="weeklyNewsletter"
                          checked={preferencesData.weeklyNewsletter}
                          onChange={handlePreferenceChange}
                          className="mr-2"
                        />
                        <label htmlFor="weeklyNewsletter" className="text-accent">Weekly Newsletter</label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="productUpdates"
                          name="productUpdates"
                          checked={preferencesData.productUpdates}
                          onChange={handlePreferenceChange}
                          className="mr-2"
                        />
                        <label htmlFor="productUpdates" className="text-accent">Product Updates</label>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={loading}
                        className={`px-6 py-2 bg-blue text-white rounded hover:bg-blue/80 transition ${
                          loading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {loading ? 'Saving...' : 'Save Preferences'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 