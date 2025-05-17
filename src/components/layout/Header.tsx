import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../contexts/CartContext';
import LanguageSwitcher from '../common/LanguageSwitcher';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();
  const { t } = useTranslation();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/products', label: t('nav.products') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/contact', label: t('nav.contact') }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-dark-200/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container-custom py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="font-heading text-xl md:text-2xl font-bold"
            >
              <span className="text-primary-400">GAMERS</span> <span className="text-accent-500">VAULT</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link text-sm font-medium ${
                  location.pathname === link.path ? 'text-primary-400' : 'text-gray-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <LanguageSwitcher />
            <button aria-label="Search" className="text-gray-300 hover:text-primary-400 transition-colors">
              <Search size={20} />
            </button>
            <button aria-label="Account" className="text-gray-300 hover:text-primary-400 transition-colors">
              <User size={20} />
            </button>
            <Link 
              to="/cart" 
              className="cart-btn relative text-gray-300 hover:text-primary-400 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart size={20} className="cart-icon" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-accent-500 text-white text-xs rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center md:hidden space-x-4">
            <LanguageSwitcher />
            <Link 
              to="/cart" 
              className="relative text-gray-300 hover:text-primary-400 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-accent-500 text-white text-xs rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`hamburger ${isMenuOpen ? 'active' : ''} text-white p-2 z-50`}
            >
              <div className="flex flex-col gap-1.5">
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 bg-dark-200/98 z-40 md:hidden"
          >
            <div className="flex flex-col h-full px-6 py-24">
              <div className="flex flex-col space-y-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-xl font-heading ${
                      location.pathname === link.path ? 'text-primary-400' : 'text-gray-200'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              
              <div className="mt-auto pb-8 flex space-x-6">
                <button aria-label="Search" className="text-gray-300 p-2">
                  <Search size={24} />
                </button>
                <button aria-label="Account" className="text-gray-300 p-2">
                  <User size={24} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;