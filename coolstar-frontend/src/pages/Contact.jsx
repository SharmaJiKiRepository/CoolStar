import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post(`${API_BASE_URL}/contact-messages`, formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0 bg-gradient-radial from-neon-blue/5 to-transparent opacity-30"></div>
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-neon-blue/5 filter blur-[100px] opacity-20 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-neon-purple/5 filter blur-[100px] opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            <span className="relative inline-block group">
              Contact Us
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue to-neon-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have questions about our products or services? We're here to help you find the perfect solution for your business.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-[#0A1638]/30 backdrop-blur-sm rounded-xl p-6 border border-neon-blue/20 hover:border-neon-blue/30 transition-all duration-300">
              <h2 className="text-2xl font-semibold text-white mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-neon-blue/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Email</h3>
                    <p className="text-gray-400 mt-1">info@coolstar.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-neon-blue/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Phone</h3>
                    <p className="text-gray-400 mt-1">+91 92554-58690, +91 92556-53086, 80534-28892</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-neon-blue/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Location</h3>
                    <p className="text-gray-400 mt-1">Factory:#112-A, Pragati Vihar, Behind B.D FLoor Mill, Near New Shiv Mandir, Ambala Cantt, Haryana, India  </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-[#0A1638]/30 backdrop-blur-sm rounded-xl p-6 border border-neon-blue/20 hover:border-neon-blue/30 transition-all duration-300">
              <h2 className="text-2xl font-semibold text-white mb-6">Business Hours</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Monday - Saturday</span>
                  <span className="text-neon-blue">10:00 AM - 8:00 PM</span>
                </div>
                {/* <div className="flex justify-between items-center">
                  <span className="text-gray-400">Saturday</span>
                  <span className="text-neon-blue">10:00 AM - :00 PM</span>
                </div> */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Sunday</span>
                  <span className="text-red-400">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#0A1638]/30 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-neon-blue/20 hover:border-neon-blue/30 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-white mb-6">Send us a Message</h2>
            
            {success ? (
              <div className="text-center py-12">
                <div className="h-16 w-16 bg-neon-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Thank You!</h3>
                <p className="text-gray-400">Your message has been sent successfully. We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-neon-blue/30 bg-[#0A1638]/50 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue/50 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-neon-blue/30 bg-[#0A1638]/50 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue/50 transition-all duration-300"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-neon-blue/30 bg-[#0A1638]/50 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue/50 transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-neon-blue/30 bg-[#0A1638]/50 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue/50 transition-all duration-300"
                  ></textarea>
                </div>

                {error && (
                  <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    {error}
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-[#0A1638] text-white rounded-lg font-medium border border-neon-blue/30 hover:border-neon-blue hover:text-neon-blue transition-all duration-300 flex items-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{loading ? 'Sending...' : 'Send Message'}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
