import { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext, useAuth } from './context/AuthContext'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Products = lazy(() => import('./pages/Products'))
const ProductCatalogue = lazy(() => import('./pages/ProductCatalogue'))
const ProductCataloguePage = lazy(() => import('./pages/ProductCataloguePage'))
const Admin = lazy(() => import('./pages/Admin'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const UserProfile = lazy(() => import('./pages/UserProfile'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))

// Loading component for suspense fallback
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-4 border-blue border-t-transparent rounded-full animate-spin"></div>
  </div>
)

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  
  // Show loading indicator while checking authentication
  if (loading) {
    return <Loading />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
        <div className="min-h-screen bg-secondary text-accent relative overflow-hidden">
          {/* Galactic Background with Stars and Nebulae */}
          <div className="absolute inset-0 bg-[#050718] z-0">
            {/* Deep space gradient */}
            <div className="absolute inset-0 bg-gradient-radial from-[#0A0F2E] to-[#050718]"></div>
            
            {/* Animated stars layer */}
            <div className="absolute inset-0 z-0">
              {/* Twinkling stars - small */}
              {[...Array(80)].map((_, i) => (
                <div 
                  key={`small-star-${i}`}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: Math.random() * 2 + 1 + 'px',
                    height: Math.random() * 2 + 1 + 'px',
                    top: Math.random() * 100 + '%',
                    left: Math.random() * 100 + '%',
                    opacity: Math.random() * 0.7 + 0.3,
                    animation: `twinkling ${Math.random() * 5 + 2}s ease-in-out infinite alternate`,
                    animationDelay: `${Math.random() * 10}s`
                  }}
                ></div>
              ))}
              
              {/* Medium stars with glow */}
              {[...Array(15)].map((_, i) => (
                <div 
                  key={`medium-star-${i}`}
                  className="absolute rounded-full bg-white shadow-sm shadow-neon-blue"
                  style={{
                    width: Math.random() * 3 + 2 + 'px',
                    height: Math.random() * 3 + 2 + 'px',
                    top: Math.random() * 100 + '%',
                    left: Math.random() * 100 + '%',
                    opacity: Math.random() * 0.9 + 0.1,
                    animation: `twinkling ${Math.random() * 7 + 3}s ease-in-out infinite alternate`,
                    animationDelay: `${Math.random() * 7}s`
                  }}
                ></div>
              ))}
              
              {/* Larger bright stars with strong glow */}
              {[...Array(5)].map((_, i) => (
                <div 
                  key={`large-star-${i}`}
                  className="absolute rounded-full bg-white shadow-neon-white z-0"
                  style={{
                    width: Math.random() * 2 + 3 + 'px',
                    height: Math.random() * 2 + 3 + 'px',
                    top: Math.random() * 100 + '%',
                    left: Math.random() * 100 + '%',
                    boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)',
                    animation: `pulse ${Math.random() * 10 + 5}s ease-in-out infinite alternate`,
                    animationDelay: `${Math.random() * 5}s`
                  }}
                ></div>
              ))}
            </div>
            
            {/* Shooting stars */}
            <div className="absolute top-1/4 left-1/4 w-[2px] h-[60px] bg-white rotate-[35deg] origin-top opacity-0 animate-shooting-star" style={{ animationDelay: '3s', animationDuration: '4s' }}></div>
            <div className="absolute top-1/2 right-1/3 w-[2px] h-[80px] bg-white rotate-[145deg] origin-top opacity-0 animate-shooting-star" style={{ animationDelay: '7s', animationDuration: '3s' }}></div>
            <div className="absolute bottom-1/3 left-1/2 w-[1px] h-[40px] bg-white rotate-[215deg] origin-top opacity-0 animate-shooting-star" style={{ animationDelay: '15s', animationDuration: '5s' }}></div>
            
            {/* Nebula clouds - blue tones */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-neon-blue/5 filter blur-[100px] mix-blend-screen animate-float" style={{ animationDuration: '50s' }}></div>
              <div className="absolute bottom-0 left-0 w-[35vw] h-[35vw] rounded-full bg-blue-500/5 filter blur-[120px] mix-blend-screen animate-float" style={{ animationDuration: '60s', animationDelay: '10s' }}></div>
              <div className="absolute top-1/2 right-1/4 w-[25vw] h-[25vw] rounded-full bg-neon-blue/5 filter blur-[80px] mix-blend-screen animate-float" style={{ animationDuration: '40s', animationDelay: '5s' }}></div>
              <div className="absolute bottom-1/4 left-1/2 w-[20vw] h-[30vw] rounded-full bg-blue-400/5 filter blur-[90px] mix-blend-screen animate-float" style={{ animationDuration: '45s', animationDelay: '15s' }}></div>
            </div>
            
            {/* Animated cosmic dust particles */}
            {[...Array(15)].map((_, i) => (
              <div 
                key={`dust-${i}`}
                className="absolute rounded-full bg-white/30"
                style={{
                  width: Math.random() * 3 + 1 + 'px',
                  height: Math.random() * 3 + 1 + 'px',
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                  opacity: Math.random() * 0.3 + 0.1,
                  animation: `float ${Math.random() * 20 + 30}s linear infinite`,
                  animationDelay: `${Math.random() * 15}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Subtle grid overlay for tech feel - very light */}
          <div className="absolute inset-0 bg-cyber-grid opacity-10 z-0"></div>
          
          {/* Content Container */}
          <div className="relative z-10">
            {/* Animated Orbs */}
            <div className="fixed top-1/4 right-1/4 w-96 h-96 rounded-full bg-blue/5 filter blur-[100px] opacity-30 animate-pulse-slow"></div>
            <div className="fixed bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-blue-light/5 filter blur-[100px] opacity-30 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
            
            {/* Neon Accent Lines */}
            <div className="fixed top-0 inset-x-0 h-px bg-blue-black-gradient shadow-neon-blue"></div>
            <div className="fixed bottom-0 inset-x-0 h-px bg-blue-black-gradient shadow-neon-blue"></div>
            
            {/* Header */}
            <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-secondary/90 backdrop-blur-md shadow-neon-blue' : 'bg-transparent'}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                  {/* Logo */}
                  <Link to="/" className="flex items-center">
                    <img 
                      src="/coolstar-logo.svg" 
                      alt="CoolStarDesign" 
                      className="h-8 sm:h-10 w-auto transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                  
                  {/* Desktop Navigation */}
                  <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/catalogue">Products</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                  </nav>
                  
                  {/* Auth Buttons */}
                  <HeaderAuthButtons setIsMenuOpen={setIsMenuOpen} />
                  
                  {/* Mobile Menu Button */}
                  <button 
                    className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-lg border border-neon-blue/30 bg-secondary/80 hover:bg-white/5 hover:border-neon-blue/50 hover:shadow-neon-blue transition-all duration-300"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                  >
                    <div className="relative flex flex-col justify-between items-center w-5 h-4">
                      <div className="w-5 h-4 relative">
                        <span className={`absolute left-0 w-5 h-0.5 bg-neon-blue shadow-neon-blue transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
                        <span className={`absolute left-0 w-5 h-0.5 bg-neon-blue shadow-neon-blue transform transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'translate-y-[7px]'}`}></span>
                        <span className={`absolute left-0 w-5 h-0.5 bg-neon-blue shadow-neon-blue transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 translate-y-[7px]' : 'translate-y-[14px]'}`}></span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </header>

            {/* Render the MobileMenu component */}
            <MobileMenu isOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

            {/* Main Content */}
            <main className="pt-20">
              <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
              <Route path="/catalogue" element={<Products />} />
              <Route path="/catalogue/:category" element={<ProductCatalogue />} />
              <Route path="/catalogue/:category/:subcategory" element={<ProductCataloguePage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } />
                  <Route path="/admin" element={
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  } />
          </Routes>
              </Suspense>
        </main>

        {/* Footer */}
        <footer className="py-12 px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 border-t border-neon-blue/10 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <img 
                  src="/coolstar-logo.svg" 
                  alt="CoolStarDesign" 
                  className="h-10 w-auto mb-4"
                />
                <p className="text-sm text-gray-dark mb-4 max-w-md">
                  Elevating commercial kitchen experiences with innovative designs and premium equipment for professional chefs and food businesses.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-dark hover:text-blue-light transition-colors">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-dark hover:text-blue-light transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-dark hover:text-blue-light transition-colors">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
                  </div>
                  <div>
                <h3 className="text-base font-semibold text-accent">Company</h3>
                <ul className="mt-4 space-y-2">
                  <FooterLink to="/about">About Us</FooterLink>
                  <FooterLink to="/about">Our Team</FooterLink>
                  <FooterLink to="/about">Careers</FooterLink>
                  <FooterLink to="/contact">Contact</FooterLink>
                    </ul>
                  </div>
                  <div>
                <h3 className="text-base font-semibold text-accent">Legal</h3>
                <ul className="mt-4 space-y-2">
                  <FooterLink to="/privacy">Privacy Policy</FooterLink>
                  <FooterLink to="/terms">Terms of Service</FooterLink>
                  <FooterLink to="/shipping">Shipping Policy</FooterLink>
                  <FooterLink to="/returns">Returns & Warranty</FooterLink>
                </ul>
                  </div>
                </div>
            <div className="mt-8 pt-6 border-t border-neon-blue/10 flex flex-col sm:flex-row justify-between items-center">
              <p className="text-xs text-gray-dark">© {new Date().getFullYear()} CoolStar Design. All rights reserved.</p>
              <p className="text-xs text-gray-dark mt-2 sm:mt-0">Made with precision for the culinary masters</p>
                </div>
              </div>
        </footer>
          </div>
      </div>
  );
}

// Header auth buttons component
const HeaderAuthButtons = ({ setIsMenuOpen }) => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
      {isAuthenticated ? (
        <>
          <Link
            to="/cart"
            className="px-3 lg:px-4 py-2 rounded-lg bg-blue/10 text-blue hover:bg-blue/20 transition-colors cursor-pointer text-sm lg:text-base"
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              Cart
            </span>
          </Link>
          {user && user.isAdmin && (
            <Link 
              to="/admin" 
              className="px-3 lg:px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors cursor-pointer text-sm lg:text-base"
            >
              Admin Panel
            </Link>
          )}
          <Link
            to="/profile"
            className="px-3 lg:px-4 py-2 rounded-lg bg-neon-blue/10 text-neon-blue hover:bg-neon-blue/20 transition-colors cursor-pointer text-sm lg:text-base"
          >
            My Profile
          </Link>
          <button 
            onClick={handleLogout}
            className="px-3 lg:px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors cursor-pointer text-sm lg:text-base"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link 
            to="/login" 
            className="px-3 lg:px-4 py-2 rounded-lg bg-blue/10 text-blue hover:bg-blue/20 transition-colors cursor-pointer text-sm lg:text-base"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="px-3 lg:px-4 py-2 rounded-lg border border-blue/30 text-accent hover:bg-blue/10 transition-colors cursor-pointer text-sm lg:text-base"
          >
            Register
          </Link>
        </>
      )}
    </div>
  );
};

const NavLink = ({ to, children }) => (
  <Link 
    to={to} 
    className="text-accent/90 font-medium hover:text-blue-light relative group"
  >
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-light transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
  </Link>
);

const FooterLink = ({ to, children }) => (
  <li>
    <Link 
      to={to} 
      className="text-gray-DEFAULT hover:text-blue-light transition-colors duration-300"
    >
      {children}
    </Link>
  </li>
);

// MobileMenu component
const MobileMenu = ({ isOpen, setIsMenuOpen }) => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-40">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
      
      {/* Menu Content */}
      <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-secondary/95 backdrop-blur-md shadow-lg border-l border-neon-blue/20">
        <div className="flex flex-col h-full">
          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-8 px-6">
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="text-lg font-medium text-accent hover:text-neon-blue transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/catalogue" 
                className="text-lg font-medium text-accent hover:text-neon-blue transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/about" 
                className="text-lg font-medium text-accent hover:text-neon-blue transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-lg font-medium text-accent hover:text-neon-blue transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>

            {/* Auth Section */}
            <div className="mt-8 pt-8 border-t border-white/10">
              {isAuthenticated ? (
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/cart"
                    className="w-full text-left py-3 px-4 rounded-lg bg-blue/10 text-blue hover:bg-blue/20 transition-colors"
                  >
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                      Cart
                    </span>
                  </Link>
                  {user && user.isAdmin && (
                    <Link
                      to="/admin"
                      className="w-full text-left py-3 px-4 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="w-full text-left py-3 px-4 rounded-lg bg-neon-blue/10 text-neon-blue hover:bg-neon-blue/20 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left py-3 px-4 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link 
                    to="/login" 
                    className="w-full py-3 px-4 rounded-lg bg-blue text-white hover:bg-blue-600 transition-colors text-center font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="w-full py-3 px-4 rounded-lg border border-blue/50 text-blue hover:bg-blue/10 transition-colors text-center font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
