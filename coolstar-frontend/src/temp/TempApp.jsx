import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Simple Home component
const Home = () => (
  <div className="min-h-screen bg-black pt-20 px-4">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-400 mb-6">Welcome to CoolStarDesign</h1>
      <p className="text-xl text-gray-300 mb-6">
        Premium commercial appliances engineered for excellence and efficiency.
      </p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="bg-black text-white min-h-screen">
        {/* Simple Header */}
        <header className="fixed top-0 left-0 right-0 bg-gray-900 shadow-lg z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-xl font-bold text-blue-400">CoolStarDesign</Link>
            </div>
          </div>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 