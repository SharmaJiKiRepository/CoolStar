import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900/90 backdrop-blur-sm shadow-lg z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
            CoolStarDesign
          </Link>
          <nav className="flex space-x-6">
            <NavLink 
              to="/" 
              className={({isActive}) => 
                isActive 
                  ? "text-white border-b-2 border-blue-500" 
                  : "text-gray-300 hover:text-white transition-colors"
              }
              end
            >
              Home
            </NavLink>
            <NavLink 
              to="/product-catalogue" 
              className={({isActive}) => 
                isActive 
                  ? "text-white border-b-2 border-blue-500" 
                  : "text-gray-300 hover:text-white transition-colors"
              }
            >
              Products
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({isActive}) => 
                isActive 
                  ? "text-white border-b-2 border-blue-500" 
                  : "text-gray-300 hover:text-white transition-colors"
              }
            >
              Contact
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar; 