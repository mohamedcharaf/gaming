import { Routes, Route } from 'react-router-dom';

// Layout
import Layout from './components/layout/Layout';

// Contexte panier
import { CartProvider } from './contexts/CartContext';

// Pages publiques
import Home          from './pages/Home';
import Products      from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart          from './pages/Cart';
import Blog          from './pages/Blog';
import BlogPost      from './pages/BlogPost';
import Contact       from './pages/Contact';
import Login         from './pages/Login';
import Signup        from './pages/SignUp';
import NotFound      from './pages/NotFound';

// Admin & protection
import Admin          from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import AdminOrders    from './pages/admin/AdminOrders';
import AddProduct     from './pages/AddProduct';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <CartProvider>
        <Routes>
          {/* Toutes les pages passent par Layout */}
          <Route path="/" element={<Layout />}>
            {/* Public */}
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:id" element={<BlogPost />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />

            {/* Espace Admin (protégé) */}
            <Route
              path="admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            >
              <Route path="add-product" element={<AddProduct />} />
              <Route path="orders"      element={<AdminOrders />} />
            </Route>

            {/* Catch-all → 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </CartProvider>
    </div>
  );
}
