import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track mouse position for interactive elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Generate orbs for background
  const generateOrbs = () => {
    return Array.from({ length: 6 }).map((_, index) => {
      const size = Math.random() * 300 + 100;
      const xPos = Math.random() * 100;
      const yPos = Math.random() * 100;
      const delay = Math.random() * 5;
      
      return (
        <div
          key={index}
          className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-300/20 animate-float"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${xPos}%`,
            top: `${yPos}%`,
            filter: 'blur(60px)',
            animationDelay: `${delay}s`,
            transform: `translate(${(mousePosition.x - window.innerWidth / 2) / 40}px, ${(mousePosition.y - window.innerHeight / 2) / 40}px)`,
            zIndex: 0
          }}
        />
      );
    });
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    }
  };
  
  return (
    <div className="bg-black min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {generateOrbs()}
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="relative mb-12"
          >
            <h1 className="text-[150px] md:text-[200px] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              404
            </h1>
            <div className="absolute top-0 left-0 right-0 bottom-0 text-[150px] md:text-[200px] font-bold leading-none text-blue-500/20 blur-2xl z-[-1]">
              404
            </div>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Page Not Found
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </motion.p>
          
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link 
              to="/"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-4 text-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
            >
              <span className="relative z-10">Back to Home</span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:scale-[2.5] opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl group-hover:blur-xl"></span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-blue-400"></span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-blue-400 group-hover:opacity-0 transition-all duration-500"></span>
            </Link>
            
            <Link 
              to="/product-catalogue"
              className="group relative overflow-hidden rounded-full bg-transparent text-white border border-blue-500 px-8 py-4 text-lg font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
            >
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 group-hover:text-white transition-all duration-300">Browse Products</span>
              <span className="absolute inset-0 w-0 group-hover:w-full h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-500"></span>
            </Link>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-20 mb-12"
          >
            <div className="w-32 h-32 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-300 rounded-full opacity-20 animate-ping" style={{ animationDuration: '3s' }}></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-300 rounded-full opacity-20 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.75s' }}></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-300 rounded-full opacity-20 animate-ping" style={{ animationDuration: '3s', animationDelay: '1.5s' }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-white">
              Looking for something specific?
            </h3>
            <p className="text-gray-400 mb-4">
              Check out these popular categories:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Refrigeration', 'Display', 'Freezers', 'Beverage', 'Food Service'].map((category) => (
                <Link
                  key={category}
                  to={`/product-catalogue?category=${category}`}
                  className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all duration-300"
                >
                  {category}
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Custom animation classes */}
      <style jsx="true">{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
          100% { transform: translateY(0) translateX(0); }
        }
        
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound; 