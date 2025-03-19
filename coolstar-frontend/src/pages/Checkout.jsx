import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Checkout = () => {
  const { user, isAuthenticated, authAxios } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [cart, setCart] = useState({ cartItems: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [processingOrder, setProcessingOrder] = useState(false);
  
  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phoneNumber || '',
    address: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    postalCode: user?.address?.postalCode || '',
    country: user?.address?.country || 'India'
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  
  // Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        
        if (!isAuthenticated) {
          navigate('/login', { state: { from: '/checkout', message: 'Please log in to checkout' } });
          return;
        }
        
        const response = await authAxios.get(`${API_BASE_URL}/cart`);
        setCart(response.data);
        
        if (response.data.cartItems.length === 0) {
          navigate('/cart', { state: { message: 'Your cart is empty' } });
        }
      } catch (err) {
        console.error('Error fetching cart:', err);
        setError('Failed to load your cart. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCart();
  }, [isAuthenticated, authAxios, navigate]);
  
  // Handle form input changes
  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };
  
  // Calculate order totals
  const calculateSubtotal = () => {
    return cart.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const calculateTax = () => {
    return calculateSubtotal() * 0.18; // 18% GST
  };
  
  const calculateShipping = () => {
    // Free shipping for orders over ₹50,000
    return calculateSubtotal() > 50000 ? 0 : 1000;
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };
  
  // Format price in Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };
  
  // Place order
  const placeOrder = async (e) => {
    e.preventDefault();
    
    // Validate form
    const requiredFields = ['name', 'email', 'phone', 'address', 'city', 'state', 'postalCode', 'country'];
    const missingFields = requiredFields.filter(field => !shippingInfo[field]);
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }
    
    try {
      setProcessingOrder(true);
      setError(null);
      
      // Create order object
      const orderData = {
        orderItems: cart.cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          image: item.image,
          price: item.price,
          product: item.product._id || item.product
        })),
        shippingAddress: {
          address: shippingInfo.address,
          city: shippingInfo.city,
          postalCode: shippingInfo.postalCode,
          country: shippingInfo.country
        },
        paymentMethod,
        taxPrice: calculateTax(),
        shippingPrice: calculateShipping(),
        totalPrice: calculateTotal()
      };
      
      // Send order to API
      const response = await authAxios.post(`${API_BASE_URL}/orders`, orderData);
      
      // Clear cart after successful order
      await authAxios.delete(`${API_BASE_URL}/cart`);
      
      setSuccess('Order placed successfully!');
      
      // Redirect to order confirmation page after a delay
      setTimeout(() => {
        navigate('/profile', { state: { message: 'Order placed successfully!', tab: 'orders' } });
      }, 2000);
      
    } catch (err) {
      console.error('Error placing order:', err);
      setError('Failed to place your order. Please try again.');
    } finally {
      setProcessingOrder(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue"></div>
      </div>
    );
  }
  
  return (
    <div className="py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-accent mb-3 sm:mb-6">Checkout</h1>
        
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
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Checkout Form */}
          <div className="lg:col-span-8">
            <form onSubmit={placeOrder}>
              {/* Shipping Information */}
              <div className="bg-secondary/50 backdrop-blur-md shadow-3d-effect rounded-xl p-4 sm:p-6 border border-blue/20 mb-6">
                <h2 className="text-xl font-bold text-accent mb-4">Shipping Information</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block mb-1 font-medium text-accent/80">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={shippingInfo.name}
                      onChange={handleShippingChange}
                      className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-1 font-medium text-accent/80">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleShippingChange}
                      className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block mb-1 font-medium text-accent/80">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingChange}
                      className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block mb-1 font-medium text-accent/80">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block mb-1 font-medium text-accent/80">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block mb-1 font-medium text-accent/80">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingChange}
                      className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="postalCode" className="block mb-1 font-medium text-accent/80">Postal Code</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={handleShippingChange}
                      className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block mb-1 font-medium text-accent/80">Country</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleShippingChange}
                      className="w-full px-3 py-2 bg-secondary border border-blue/30 rounded text-accent"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="bg-secondary/50 backdrop-blur-md shadow-3d-effect rounded-xl p-4 sm:p-6 border border-blue/20 mb-6">
                <h2 className="text-xl font-bold text-accent mb-4">Payment Method</h2>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mr-2"
                    />
                    <label htmlFor="cod" className="text-accent">Cash on Delivery</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="bank"
                      name="paymentMethod"
                      value="bank"
                      checked={paymentMethod === 'bank'}
                      onChange={() => setPaymentMethod('bank')}
                      className="mr-2"
                    />
                    <label htmlFor="bank" className="text-accent">Bank Transfer</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="razorpay"
                      name="paymentMethod"
                      value="razorpay"
                      checked={paymentMethod === 'razorpay'}
                      onChange={() => setPaymentMethod('razorpay')}
                      className="mr-2"
                    />
                    <label htmlFor="razorpay" className="text-accent">Razorpay (Credit/Debit Card, UPI)</label>
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={processingOrder}
                className={`w-full py-3 px-4 bg-blue text-white rounded hover:bg-blue/80 transition ${processingOrder ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {processingOrder ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-secondary/50 backdrop-blur-md shadow-3d-effect rounded-xl p-4 sm:p-6 border border-blue/20">
              <h2 className="text-xl font-bold text-accent mb-4">Order Summary</h2>
              
              <div className="mb-4">
                <h3 className="font-medium text-accent mb-2">Items ({cart.cartItems.length})</h3>
                <div className="space-y-2">
                  {cart.cartItems.map((item) => (
                    <div key={item._id} className="flex justify-between text-sm">
                      <span className="text-accent">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="text-accent font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-accent">
                  <span>Subtotal</span>
                  <span>{formatPrice(calculateSubtotal())}</span>
                </div>
                <div className="flex justify-between text-accent">
                  <span>Tax (18% GST)</span>
                  <span>{formatPrice(calculateTax())}</span>
                </div>
                <div className="flex justify-between text-accent">
                  <span>Shipping</span>
                  <span>{calculateShipping() === 0 ? 'Free' : formatPrice(calculateShipping())}</span>
                </div>
                <div className="border-t border-blue/20 pt-2 mt-2"></div>
                <div className="flex justify-between text-accent font-bold">
                  <span>Total</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
              </div>
              
              <div className="text-xs text-accent/70">
                <p>By placing your order, you agree to our terms and conditions.</p>
                <p className="mt-1">For Cash on Delivery orders, a representative will contact you to confirm the order.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 