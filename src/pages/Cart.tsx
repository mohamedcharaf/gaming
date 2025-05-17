// src/pages/Cart.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Trash2,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';

interface OrderRow {
  product_id: string;
  name:       string;
  price:      number;
  quantity:   number;
  image_url:  string;
}

const Cart: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalPrice,
    clearCart
  } = useCart();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name:    '',
    phone:   '',
    wilaya:  '',
    address: ''
  });
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [orderSuccess,    setOrderSuccess]     = useState(false);
  const [isSubmitting,    setIsSubmitting]     = useState(false);
  const [error,           setError]            = useState<string | null>(null);
  const [orderId,         setOrderId]          = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // 1) Construire le tableau d'items avec l'URL de l'image
    const items: OrderRow[] = cartItems.map(item => ({
      product_id: item.product.id,
      name:       item.product.name,
      price:      item.product.price,
      quantity:   item.quantity,
      image_url:  item.product.image // ← on prend le champ image ou image_url de votre produit
    }));

    // 2) Préparer les données de la commande
    const orderData = {
      full_name: formData.name,
      phone:     formData.phone,
      wilaya:    formData.wilaya,
      address:   formData.address,
      items,                             // Supabase convertira en JSONB
      subtotal:  totalPrice,
      shipping:  0,
      tax:       +(totalPrice * 0.1).toFixed(2),
      total:     +(totalPrice * 1.1).toFixed(2)
    };

    try {
      // 3) Insert + retourner l'id généré
      const { data, error: sbError } = await supabase
        .from('orders')
        .insert([orderData])
        .select('id');

      if (sbError) throw sbError;
      if (data && data.length > 0) {
        setOrderId(data[0].id);
      }

      setOrderSuccess(true);
      clearCart();
    } catch (err) {
      console.error('Order submission error:', err);
      setError('Une erreur est survenue lors de la commande. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── État panier vide ──────────────────────────────────────────────────────────
  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <div className="pt-24 pb-16 container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center py-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-dark-200 mb-6">
            <ShoppingCart className="text-gray-400 h-10 w-10" />
          </div>
          <h1 className="text-3xl font-heading font-bold mb-4">
            {t('cart.empty')}
          </h1>
          <p className="text-gray-300 mb-8">
            {t('cart.continue_shopping')}
          </p>
          <Link to="/products" className="btn-primary">
            {t('cart.continue_shopping')}
          </Link>
        </motion.div>
      </div>
    );
  }

  // ─── État commande réussie ───────────────────────────────────────────────────
  if (orderSuccess) {
    return (
      <div className="pt-24 pb-16 container-custom">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center py-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-500/20 mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <svg
                className="w-10 h-10 text-primary-500"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
          </div>
          <h1 className="text-3xl font-heading font-bold mb-4">
            {t('cart.order_success')}
          </h1>
          <p className="text-gray-300 mb-4">
            {t('cart.success_message')}
          </p>
          {orderId && (
            <p className="text-gray-400 mb-6">
              Votre numéro de commande : <span className="text-white">{orderId}</span>
            </p>
          )}
          <Link to="/products" className="btn-primary">
            {t('cart.continue_shopping')}
          </Link>
        </motion.div>
      </div>
    );
  }

  // ─── Vue panier + formulaire de commande ─────────────────────────────────────
  return (
    <div className="pt-24 pb-16 container-custom">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-heading font-bold">{t('cart.title')}</h1>
        <p className="text-gray-400 mt-2">
          Vérifiez vos articles et complétez votre commande
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ─── Cart Items */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-dark-200 rounded-lg p-6"
          >
            <div className="flex justify-between items-center pb-6 border-b border-gray-700 mb-6">
              <h2 className="text-xl font-medium">
                Articles ({cartItems.length})
              </h2>
              <button
                onClick={() => setShowConfirmClear(true)}
                className="text-gray-400 hover:text-accent-500 text-sm flex items-center"
              >
                <Trash2 size={16} className="mr-1" />
                Vider le panier
              </button>
            </div>

            <AnimatePresence>
              {cartItems.map(item => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CartItem
                    item={item}
                    onRemove={() => removeFromCart(item.product.id)}
                    onUpdateQuantity={qty =>
                      updateQuantity(item.product.id, qty)
                    }
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="mt-8">
              <Link
                to="/products"
                className="flex items-center text-primary-400 hover:text-primary-300 transition-colors"
              >
                <ArrowLeft size={18} className="mr-2" />
                {t('cart.continue_shopping')}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ─── Order Summary + Formulaire */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-dark-200 rounded-lg p-6 sticky top-24"
          >
            <h2 className="text-xl font-medium mb-6">{t('cart.summary')}</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-300">{t('cart.subtotal')}</span>
                <span className="text-white">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">{t('cart.shipping')}</span>
                <span className="text-white">{t('cart.shipping_free')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">{t('cart.tax')}</span>
                <span className="text-white">
                  ${(totalPrice * 0.1).toFixed(2)}
                </span>
              </div>
              <div className="border-t border-gray-700 pt-4 mt-4"></div>
              <div className="flex justify-between">
                <span className="text-white font-medium">
                  {t('cart.total')}
                </span>
                <span className="text-white font-bold">
                  ${(totalPrice * 1.1).toFixed(2)}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              {/* Nom */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  {t('cart.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input w-full focus:ring-primary-500"
                  required
                />
              </div>
              {/* Téléphone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  {t('cart.phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input w-full focus:ring-primary-500"
                  required
                />
              </div>
              {/* Wilaya */}
              <div>
                <label
                  htmlFor="wilaya"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  {t('cart.wilaya')}
                </label>
                <input
                  type="text"
                  id="wilaya"
                  name="wilaya"
                  value={formData.wilaya}
                  onChange={handleInputChange}
                  className="input w-full focus:ring-primary-500"
                  required
                />
              </div>
              {/* Adresse */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  {t('cart.address')}
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="input w-full focus:ring-primary-500"
                  required
                />
              </div>

              {error && (
                <div className="bg-accent-500/10 border border-accent-500/20 rounded-lg p-4 flex items-start space-x-3">
                  <AlertCircle className="text-accent-400 h-5 w-5 mt-0.5" />
                  <p className="text-sm text-accent-400">{error}</p>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Envoi en cours...
                  </div>
                ) : (
                  t('cart.place_order')
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Confirmation vider le panier */}
      <AnimatePresence>
        {showConfirmClear && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-dark-200 rounded-lg p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-heading font-bold mb-4">
                Vider le panier?
              </h3>
              <p className="text-gray-300 mb-6">
                Êtes-vous sûr de vouloir supprimer tous les articles ?
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    clearCart();
                    setShowConfirmClear(false);
                  }}
                  className="flex-1 btn-accent"
                >
                  Confirmer
                </button>
                <button
                  onClick={() => setShowConfirmClear(false)}
                  className="flex-1 btn-outline"
                >
                  Annuler
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── CartItem ───────────────────────────────────────────────────────────────────
interface CartItemProps {
  item: {
    product: { id: string; name: string; price: number; image: string };
    quantity: number;
  };
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onRemove,
  onUpdateQuantity
}) => {
  const { product, quantity } = item;

  return (
    <motion.div
      layout
      className="flex flex-col sm:flex-row items-start gap-6 pb-6 border-b border-gray-700 mb-6 last:mb-0 last:pb-0 last:border-0"
    >
      <Link
        to={`/products/${product.id}`}
        className="w-full sm:w-24 h-24 bg-dark-100 rounded-lg overflow-hidden flex-shrink-0 group"
      >
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </Link>

      <div className="flex-grow">
        <div className="flex justify-between mb-2">
          <Link
            to={`/products/${product.id}`}
            className="text-white hover:text-primary-400 font-medium transition-colors"
          >
            {product.name}
          </Link>
          <motion.button
            onClick={onRemove}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-accent-500 transition-colors"
            aria-label="Remove item"
          >
            <Trash2 size={18} />
          </motion.button>
        </div>

        <div className="flex flex-wrap items-center justify-between mt-4">
          <div className="flex items-center border border-gray-700 rounded-md overflow-hidden">
            <motion.button
              onClick={() => onUpdateQuantity(quantity - 1)}
              whileTap={{ scale: 0.9 }}
              disabled={quantity <= 1}
              className="w-8 h-8 flex items-center justify-center text-white bg-dark-300 hover:bg-dark-100 transition-colors disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              -
            </motion.button>
            <span className="w-10 h-8 flex items-center justify-center text-white">
              {quantity}
            </span>
            <motion.button
              onClick={() => onUpdateQuantity(quantity + 1)}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 flex items-center justify-center text-white bg-dark-300 hover:bg-dark-100 transition-colors"
              aria-label="Increase quantity"
            >
              +
            </motion.button>
          </div>

          <div className="text-white font-bold">
            ${(product.price * quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
