/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react';
import { Activity, Home, LogIn, FileText, Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Navigation Item Component
const NavItem = ({ icon: Icon, label, path, isActive, onClick, isMobile = false }) => (
  <button
    onClick={() => onClick(path)}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
      isActive
        ? 'bg-white/20 text-white shadow-lg'
        : 'text-white/80 hover:text-white hover:bg-white/10'
    } ${isMobile ? 'w-full justify-start' : ''}`}
  >
    <Icon className="w-5 h-5" />
    {isMobile && <span>{label}</span>}
    {!isMobile && <span className="hidden lg:block">{label}</span>}
  </button>
);

// Logo Component - Improve spacing on smaller screens
const Logo = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 sm:gap-3 text-white hover:text-white/90 transition-colors duration-200"
  >
    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
      <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
    </div>
    <div className="hidden md:block">
      <h1 className="text-lg sm:text-xl font-bold">Daily Tracker</h1>
      <p className="text-xs text-white/70 -mt-1">Build better habits</p>
    </div>
  </button>
);

// Mobile Menu Component
const MobileMenu = ({ isOpen, currentPath, onNavigate, onClose, isAuthenticated }) => {
  // console.log(typeof isAuthenticated, isAuthenticated, "Type of isAuthenticated in Mobile Navbar")
  const navItems = isAuthenticated === true 
    ? [
        { icon: Home, label: 'Home', path: '/home' },
        { icon: FileText, label: 'Add Entry', path: '/form' }
      ]
    : [
        { icon: LogIn, label: 'Login', path: '/' }
      ];

  return (
    <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
      isOpen ? 'visible opacity-100' : 'invisible opacity-0'
    }`}>
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className={`absolute top-0 left-0 h-full w-80 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 shadow-2xl transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-8">
            <Logo onClick={onNavigate} />
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavItem
                key={item.path}
                {...item}
                isActive={currentPath === item.path}
                onClick={(path) => {
                  onNavigate(path);
                  onClose();
                }}
                isMobile
              />
            ))}
          </nav>

          {/* Mobile Footer */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="p-4 bg-white/10 rounded-xl border border-white/20">
              <p className="text-white/80 text-sm text-center">
                Secure • Private • Encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Navbar Component
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;


  const {isAuthenticated} = useContext(AuthContext);
    // console.log("Navbar Auth State:", isAuthenticated);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = isAuthenticated === true
    ? [
        { icon: Home, label: 'Home', path: '/home' },
        { icon: FileText, label: 'Add Entry', path: '/form' }
      ]
    : [
        { icon: LogIn, label: 'Login', path: '/' }
      ];

  const handleNavigate = (path) => {
    navigate(path);
  };

    const handleLogoClick = () => {
    navigate(isAuthenticated ? '/home' : '/');
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="sticky top-0 z-40 bg-gradient-to-r from-slate-900 via-purple-900 to-indigo-900 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo onClick={handleLogoClick} />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => (
                <NavItem
                  isActive={currentPath === item.path}
                  onClick={handleNavigate}
                  key={item.path}
                  {...item}
                />
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        isAuthenticated={isAuthenticated}
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onClose={() => setIsMobileMenuOpen(false)}
      />

    </>
  );
};


export default Navbar;