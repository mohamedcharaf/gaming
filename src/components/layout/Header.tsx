// src/components/layout/Header.tsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useTranslation } from 'react-i18next';
import { useCart } from '../../contexts/CartContext';
import LanguageSwitcher from '../common/LanguageSwitcher';

interface HeaderProps {
  /** true ⇢ on a scrollé de quelques pixels (prop que tu passes déjà depuis App) */
  isScrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ isScrolled }) => {
  const { t }            = useTranslation();
  const location         = useLocation();
  const { cartItems }    = useCart();

  const [menuOpen,   setMenuOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  /* ----- compte articles panier ----------------------------------------- */
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  /* ----- lock scroll quand un overlay est ouvert ------------------------ */
  useEffect(() => {
    const lock = menuOpen || searchOpen;
    document.documentElement.classList.toggle('overflow-hidden', lock);
  }, [menuOpen, searchOpen]);

  /* ----- helpers -------------------------------------------------------- */
  const isActive = (path: string) => location.pathname === path;
  const navLinks = [
    { path: '/',          label: t('nav.home') },
    { path: '/products',  label: t('nav.products') },
    { path: '/blog',      label: t('nav.blog') },
    { path: '/contact',   label: t('nav.contact') },
  ];

  /* ---------------------------------------------------------------------- */
  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300
                 ${isScrolled ? 'bg-dark-200/90 backdrop-blur shadow'
                               : 'bg-transparent'}`}
    >
      {/* Barre principale -------------------------------------------------- */}
      <div className="container-custom flex h-14 items-center justify-between">

        {/* Logo */}
        <Link to="/" className="font-heading text-xl font-bold">
          <span className="text-primary-400">GAMERS</span>{' '}
          <span className="text-accent-500">VAULT</span>
        </Link>

        {/* Nav desktop (lg+) */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              aria-current={isActive(path) ? 'page' : undefined}
              className={`hover:text-primary-400 transition-colors
                          ${isActive(path) ? 'text-primary-400' : 'text-gray-300'}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions communes */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher/>

          {/* Recherche */}
          <button
            onClick={() => setSearchOpen(o => !o)}
            aria-label={t('nav.search')}
            className="text-gray-300 hover:text-primary-400 transition-colors"
          >
            <Search size={22} />
          </button>

          {/* Panier */}
          <Link
            to="/cart"
            aria-label={t('nav.cart')}
            className="relative text-gray-300 hover:text-primary-400"
          >
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span
                aria-live="polite"
                className="absolute -top-2 -right-2 flex h-5 w-5
                           items-center justify-center rounded-full bg-accent-500
                           text-[10px] text-white"
              >
                {totalItems}
              </span>
            )}
          </Link>

          {/* Burger (mobile) */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? t('nav.close') : t('nav.open')}
            aria-expanded={menuOpen}
            className="lg:hidden text-gray-300 hover:text-primary-400 transition-colors"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ----------------- Mobile menu déroulant plein-écran ----------------- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-dark-200/95 backdrop-blur-sm"
          >
            <nav className="container-custom flex flex-col py-6 space-y-4 text-lg font-heading">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive(path) ? 'page' : undefined}
                  className={`py-2 ${isActive(path) ? 'text-primary-400' : 'text-gray-100'}`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------- Overlay recherche plein-écran --------------------- */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            key="searchOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-dark-900/90"
          >
            <div className="w-full max-w-xl px-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('search.placeholder', 'Recherche…')}
                  autoFocus
                  className="w-full bg-white py-4 pl-5 pr-12 text-lg
                             focus:outline-none"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  aria-label={t('nav.close')}
                  className="absolute right-4 top-1/2 -translate-y-1/2
                             text-gray-400 hover:text-gray-200 transition-colors"
                >
                  <X size={24} />
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
