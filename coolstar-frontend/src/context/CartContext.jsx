import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, authAxios } = useAuth();

  // Load cart from localStorage on mount or when auth state changes
  useEffect(() => {
    const loadCart = async () => {
      try {
        setLoading(true);
        
        if (isAuthenticated) {
          try {
            // Try to fetch cart from API if user is authenticated
            const response = await authAxios.get('/api/cart');
            if (response.data && response.data.cartItems) {
              setCartItems(response.data.cartItems);
            }
          } catch (err) {
            console.error('Error fetching cart from API:', err);
            // Fall back to localStorage if API fails
            const storedCart = localStorage.getItem('cart');
            if (storedCart) {
              setCartItems(JSON.parse(storedCart));
            }
          }
        } else {
          // Use localStorage for non-authenticated users
          const storedCart = localStorage.getItem('cart');
          if (storedCart) {
            setCartItems(JSON.parse(storedCart));
          }
        }
      } catch (err) {
        console.error('Error loading cart:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [isAuthenticated]);

  // Update cart count and total whenever cartItems changes
  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Update count
    setCartCount(cartItems.reduce((total, item) => total + item.quantity, 0));
    
    // Update total
    setCartTotal(cartItems.reduce((total, item) => total + (item.price * item.quantity), 0));
  }, [cartItems]);

  // Add item to cart
  const addToCart = async (product, quantity = 1) => {
    try {
      // Create a cart item from product
      const cartItem = {
        _id: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl || '',
        quantity
      };

      if (isAuthenticated) {
        try {
          // Try to add to API cart if user is authenticated
          const response = await authAxios.post('/api/cart', { 
            productId: product._id, 
            quantity 
          });
          
          if (response.data && response.data.cartItems) {
            setCartItems(response.data.cartItems);
            toast.success('Item added to cart!');
            return;
          }
        } catch (err) {
          console.error('Error adding to API cart:', err);
          // Fall back to local update if API fails
        }
      }
      
      // Update local cart
      setCartItems(prevItems => {
        // Check if item already exists in cart
        const existingItemIndex = prevItems.findIndex(item => item._id === product._id);
        
        if (existingItemIndex !== -1) {
          // Update quantity of existing item
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex].quantity += quantity;
          toast.success('Item quantity updated in cart!');
          return updatedItems;
        } else {
          // Add new item
          toast.success('Item added to cart!');
          return [...prevItems, cartItem];
        }
      });
    } catch (error) {
      console.error('Error in addToCart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      if (isAuthenticated) {
        try {
          // Try to remove from API cart
          const response = await authAxios.delete(`/api/cart/${productId}`);
          if (response.data && response.data.cartItems) {
            setCartItems(response.data.cartItems);
            toast.success('Item removed from cart');
            return;
          }
        } catch (err) {
          console.error('Error removing from API cart:', err);
          // Fall back to local update if API fails
        }
      }
      
      // Update local cart
      setCartItems(prevItems => {
        toast.success('Item removed from cart');
        return prevItems.filter(item => item._id !== productId);
      });
    } catch (error) {
      console.error('Error in removeFromCart:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  // Update item quantity
  const updateQuantity = async (productId, quantity) => {
    try {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
      
      if (isAuthenticated) {
        try {
          // Try to update quantity in API cart
          const response = await authAxios.put(`/api/cart/${productId}`, { quantity });
          if (response.data && response.data.cartItems) {
            setCartItems(response.data.cartItems);
            return;
          }
        } catch (err) {
          console.error('Error updating API cart:', err);
          // Fall back to local update if API fails
        }
      }
      
      // Update local cart
      setCartItems(prevItems => 
        prevItems.map(item => 
          item._id === productId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error('Error in updateQuantity:', error);
      toast.error('Failed to update item quantity');
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      if (isAuthenticated) {
        try {
          // Try to clear API cart
          await authAxios.delete('/api/cart');
        } catch (err) {
          console.error('Error clearing API cart:', err);
        }
      }
      
      // Clear local cart
      setCartItems([]);
      localStorage.removeItem('cart');
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Error in clearCart:', error);
      toast.error('Failed to clear cart');
    }
  };

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 