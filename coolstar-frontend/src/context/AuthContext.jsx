import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

// Instead of configuring API_BASE_URL, we'll use relative paths
// to work with the Vite proxy configuration

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set up axios instance with auth header
  const authAxios = axios.create();

  // Update axios auth header when token changes
  useEffect(() => {
    if (token) {
      authAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete authAxios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Check if user is logged in on page load
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        // Ensure the token is properly formatted in the header
        authAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        const res = await authAxios.get('/api/users/profile');
        if (res.data) {
          setUser(res.data);
        } else {
          // Clear token if no valid user data returned
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        // Clear invalid token
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  // Register new user
  const register = async (userData) => {
    try {
      setLoading(true);
      const res = await axios.post('/api/users/register', userData);
      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
      }
      setError(null);
      return res.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await axios.post('/api/users/login', { email, password });
      
      // Check if token exists and is properly formatted
      if (res.data && res.data.token) {
        // Store token in localStorage
        localStorage.setItem('token', res.data.token);
        
        // Update state
        setToken(res.data.token);
        setUser(res.data.user);
        
        // Update axios headers immediately
        authAxios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        
        return res.data;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Login failed');
      localStorage.removeItem('token');
      setToken(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Clear token and user from state
    setToken(null);
    setUser(null);
    
    // Remove Authorization header
    delete authAxios.defaults.headers.common['Authorization'];
    
    // Clear any errors
    setError(null);
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      const res = await authAxios.put('/api/users/profile', userData);
      setUser(res.data.user);
      setError(null);
      return res.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Profile update failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
        authAxios,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

 