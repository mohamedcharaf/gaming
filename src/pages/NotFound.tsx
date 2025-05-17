import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="pt-20 pb-16 container-custom">
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-heading font-bold text-primary-400 neon-text">
            404
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-300 max-w-md mx-auto mb-8">
            The page you're looking for doesn't exist or has been moved. Check the URL or try navigating back to our homepage.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className="btn-primary">
              <Home size={18} className="mr-2" />
              Back to Home
            </Link>
            <Link to="/products" className="btn-outline">
              <Search size={18} className="mr-2" />
              Browse Products
            </Link>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <div className="relative">
            <div className="w-64 h-64 bg-accent-500/10 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
            <div className="w-32 h-32 bg-primary-500/10 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
            <div className="relative font-heading text-xl font-bold text-gray-500">
              GAME OVER
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;