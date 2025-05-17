import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Product } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const { id, name, price, image } = product;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart();
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="product-card group"
    >
      <Link to={`/products/${id}`} className="block">
        <div className="relative overflow-hidden pt-[100%]">
          {/* Product image */}
          <img 
            src={image} 
            alt={name} 
            className="absolute inset-0 w-full h-full object-cover image-zoom" 
          />
          
          {/* Quick actions */}
          <div className="absolute top-4 right-4">
            <button 
              aria-label="Add to wishlist"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-dark-100/80 backdrop-blur-sm text-white hover:text-accent-500 transition-colors"
            >
              <Heart size={18} />
            </button>
          </div>
          
          {/* Rating */}
          <div className="absolute top-4 left-4 px-2 py-1 bg-dark-100/80 backdrop-blur-sm rounded flex items-center space-x-1">
            <Star size={14} className="text-primary-400 fill-primary-400" />
            <span className="text-white text-xs">4.8</span>
          </div>
          
          {/* Add to cart button */}
          <div className="absolute left-0 right-0 bottom-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <button 
              onClick={handleAddToCart}
              className="w-full py-2 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-md flex items-center justify-center space-x-2 transition-colors"
            >
              <ShoppingCart size={16} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
        
        {/* Product info */}
        <div className="p-4">
          <div className="mb-2 text-sm text-gray-400">{product.category}</div>
          <h3 className="text-white font-medium mb-2 line-clamp-2">{name}</h3>
          <div className="price-tag">
            <span className="text-white font-bold">${price.toFixed(2)}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;