import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { isAuthenticated } = useAuth();
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Format price in Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Calculate cart totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.18; // 18% GST
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  // Handle checkout
  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: '/cart', message: 'Please log in to checkout' } });
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
        <h1 className="text-2xl sm:text-3xl font-bold text-accent mb-3 sm:mb-6">Shopping Cart</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg">
            {error}
          </div>
        )}
        
        {cartItems.length === 0 ? (
          <div className="bg-secondary/50 backdrop-blur-md shadow-3d-effect rounded-xl p-6 border border-blue/20 text-center">
            <p className="text-accent mb-4">Your cart is empty</p>
            <Link 
              to="/catalogue" 
              className="inline-block px-6 py-2 bg-blue text-white rounded hover:bg-blue/80 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="bg-secondary/50 backdrop-blur-md shadow-3d-effect rounded-xl p-4 sm:p-6 border border-blue/20">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex flex-col sm:flex-row items-start sm:items-center p-4 border border-blue/10 rounded-lg bg-secondary/30">
                      {/* Product Image */}
                      <div className="w-full sm:w-24 h-24 mb-4 sm:mb-0 sm:mr-4">
                        <img 
                          src={item.imageUrl || 'https://via.placeholder.com/150'} 
                          alt={item.name} 
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-accent truncate">{item.name}</h3>
                        <p className="text-blue font-medium">{formatPrice(item.price)}</p>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center mt-4 sm:mt-0">
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border border-blue/30 rounded-l bg-secondary/80 text-accent"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="w-10 h-8 flex items-center justify-center border-t border-b border-blue/30 bg-secondary/80 text-accent">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-blue/30 rounded-r bg-secondary/80 text-accent"
                        >
                          +
                        </button>
                      </div>
                      
                      {/* Remove Button */}
                      <button 
                        onClick={() => removeFromCart(item._id)}
                        className="mt-4 sm:mt-0 sm:ml-4 text-red-500 hover:text-red-400 transition"
                        aria-label="Remove item"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-secondary/50 backdrop-blur-md shadow-3d-effect rounded-xl p-4 sm:p-6 border border-blue/20">
                <h2 className="text-xl font-bold text-accent mb-4">Order Summary</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-accent">
                    <span>Subtotal</span>
                    <span>{formatPrice(calculateSubtotal())}</span>
                  </div>
                  <div className="flex justify-between text-accent">
                    <span>Tax (18% GST)</span>
                    <span>{formatPrice(calculateTax())}</span>
                  </div>
                  <div className="border-t border-blue/20 pt-2 mt-2"></div>
                  <div className="flex justify-between text-accent font-bold">
                    <span>Total</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full py-2 px-4 bg-blue text-white rounded hover:bg-blue/80 transition"
                >
                  Proceed to Checkout
                </button>
                
                <button 
                  onClick={clearCart}
                  className="w-full py-2 px-4 mt-2 border border-red-500/30 text-red-500 rounded hover:bg-red-500/10 transition"
                >
                  Clear Cart
                </button>
                
                <Link 
                  to="/catalogue" 
                  className="block text-center mt-4 text-blue hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart; 