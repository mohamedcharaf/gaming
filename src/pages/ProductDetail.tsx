// src/pages/ProductDetail.tsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Heart,
  ArrowLeft,
  ArrowRight,
  Truck,
  Shield,
  CreditCard,
  Star,
  ChevronRight
} from 'lucide-react';

import { supabase } from '../lib/supabase';
import { useCart } from '../contexts/CartContext';
import ProductCard from '../components/products/ProductCard';

export interface Product {
  id:          string;
  name:        string;
  description: string;
  price:       number;
  oldPrice?:   number;
  category:    string;
  image_url:   string;
  created_at:  string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const [product, setProduct]                   = useState<Product | null>(null);
  const [related, setRelated]                   = useState<Product[]>([]);
  const [loading, setLoading]                   = useState(true);
  const [error, setError]                       = useState<string | null>(null);
  const [quantity, setQuantity]                 = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'description'|'specifications'|'reviews'>('description');

  useEffect(() => {
    if (!id) return;

    (async () => {
      setLoading(true);

      // 1) Récupère le produit
      const { data: prod, error: prodErr } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (prodErr || !prod) {
        setError(prodErr?.message || 'Produit non trouvé');
        setLoading(false);
        return;
      }
      setProduct(prod);

      // 2) Récupère les produits liés
      const { data: rel, error: relErr } = await supabase
        .from('products')
        .select('*')
        .eq('category', prod.category)
        .neq('id', prod.id)
        .limit(4);

      if (!relErr && rel) {
        setRelated(rel);
      }

      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return <div className="pt-24 text-center text-gray-400">Chargement…</div>;
  }

  if (error || !product) {
    return (
      <div className="pt-24 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Link to="/products" className="px-4 py-2 bg-indigo-600 text-white rounded">
          Retour aux produits
        </Link>
      </div>
    );
  }

  const productImages = [
    product.image_url,
    'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg',
    'https://images.pexels.com/photos/3643925/pexels-photo-3643925.jpeg',
  ];

  const handleAdd = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="pt-20 pb-16">
      {/* Breadcrumbs */}
      <div className="bg-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center text-sm text-gray-400">
          <Link to="/" className="hover:text-indigo-400">Home</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link to="/products" className="hover:text-indigo-400">Products</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link to={`/products?category=${product.category}`} className="hover:text-indigo-400">
            {product.category}
          </Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-white truncate">{product.name}</span>
        </div>
      </div>

      {/* Main */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="relative bg-gray-700 rounded-lg overflow-hidden aspect-square mb-4">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImageIndex}
                src={productImages[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
            <button
              onClick={() =>
                setActiveImageIndex(i => (i === 0 ? productImages.length - 1 : i - 1))
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-600/75 hover:bg-indigo-600 text-white p-2 rounded-full"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={() => setActiveImageIndex(i => (i + 1) % productImages.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-600/75 hover:bg-indigo-600 text-white p-2 rounded-full"
            >
              <ArrowRight size={20} />
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto">
            {productImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden ${
                  idx === activeImageIndex
                    ? 'ring-2 ring-indigo-500'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="text-gray-400 mb-2">{product.category}</div>
          <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < 4 ? 'text-indigo-400 fill-indigo-400' : 'text-gray-600'}
                />
              ))}
              <span className="text-white ml-2">4.0</span>
            </div>
            <span className="text-gray-600">|</span>
            <span className="text-gray-600">24 Reviews</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-3xl font-bold text-white">${product.price.toFixed(2)}</span>
            {product.oldPrice != null && (
              <span className="text-gray-600 line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-gray-300 mb-8">{product.description}</p>

          {/* Quantity + Add */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center border border-gray-700 rounded overflow-hidden w-32">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-10 h-10 bg-gray-700 text-white"
              >
                –
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                className="w-12 h-10 bg-gray-800 text-center text-white"
              />
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-10 h-10 bg-gray-700 text-white"
              >
                +
              </button>
            </div>
            <motion.button
              onClick={handleAdd}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded flex-grow"
            >
              <ShoppingCart size={18} className="mr-2" /> Add to Cart
            </motion.button>
            <button className="w-12 h-12 border border-gray-700 rounded text-white hover:text-indigo-400">
              <Heart size={20} />
            </button>
          </div>

          {/* Shipping Info */}
          <div className="space-y-4 border-t border-gray-700 pt-6">
            <div className="flex items-start gap-3">
              <Truck className="text-indigo-400 mt-1" />
              <div>
                <h4 className="text-white font-medium">Free shipping</h4>
                <p className="text-gray-400 text-sm">On orders over $99</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="text-indigo-400 mt-1" />
              <div>
                <h4 className="text-white font-medium">2 Year Warranty</h4>
                <p className="text-gray-400 text-sm">Manufacturing defects only</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CreditCard className="text-indigo-400 mt-1" />
              <div>
                <h4 className="text-white font-medium">Secure payment</h4>
                <p className="text-gray-400 text-sm">100% secure checkout</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-16 col-span-full">
            <div className="border-b border-gray-700 mb-8">
              <div className="flex space-x-4">
                {(['description','specifications','reviews'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-6 text-sm font-medium border-b-2 ${
                      activeTab === tab
                        ? 'border-indigo-500 text-indigo-400'
                        : 'border-transparent text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    {tab === 'reviews' && ' (24)'}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 prose prose-invert max-w-none">
              {activeTab === 'description' && (
                <div>
                  <h3 className="text-xl mb-4">Description</h3>
                  <p>{product.description}</p>
                </div>
              )}
              {activeTab === 'specifications' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    ['Brand', 'Gamers Vault'],
                    ['Model', `GV-${product.id.slice(0,6)}`],
                    ['Connectivity','Wired / Wireless'],
                    ['Warranty','2 Years']
                  ].map(([key, val]) => (
                    <div key={key}>
                      <span className="text-gray-400 text-sm">{key}</span><br/>
                      <span className="text-white">{val}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'reviews' && (
                <div>
                  <button className="mb-6 px-4 py-2 border border-gray-600 rounded text-gray-300 hover:text-white">
                    Write a Review
                  </button>
                  {/* Tes reviews ici… */}
                </div>
              )}
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-16 col-span-full">
              <h2 className="text-2xl font-bold text-white mb-8">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map(r => (
                  <ProductCard
                    key={r.id}
                    product={{
                      id:       r.id,
                      name:     r.name,
                      price:    r.price,
                      oldPrice: r.oldPrice,
                      image:    r.image_url,
                    }}
                    onAddToCart={() => addToCart(r)}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
