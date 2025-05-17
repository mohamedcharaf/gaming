// src/pages/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, Search, Users, ShoppingCart, DollarSign,
  ChevronDown, ChevronUp, X
} from 'lucide-react';

type OrderItem = {
  product_id: string;
  name:       string;
  price:      number;
  quantity:   number;
  image_url:  string;
};

type RawOrder = {
  id:          number;
  full_name:   string;
  phone:       string;
  wilaya:      string;
  address:     string;
  subtotal:    number;
  shipping:    number;
  tax:         number;
  total:       number;
  created_at:  string;
  // Supabase renvoie ici les items dans cette clé
  order_items: OrderItem[];
};

type Order = Omit<RawOrder, 'order_items'> & {
  items: OrderItem[];
};

export default function AdminDashboard() {
  const [orders, setOrders]       = useState<Order[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string|null>(null);
  const [expanded, setExpanded]   = useState<number|null>(null);
  const [sidebarOpen, setSidebar] = useState(false);
  const [search, setSearch]       = useState('');
  const [zoomImg, setZoomImg]     = useState<string|null>(null);

  // 1️⃣ Fetch orders + items
  useEffect(() => {
    async function load() {
      setLoading(true);

      // On sélectionne * et on inclut la table order_items liée
      const { data, error: err } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            product_id,
            name,
            price,
            quantity,
            image_url
          )
        `)
        .order('created_at', { ascending: false });

      if (err) {
        setError(err.message);
      } else if (data) {
        // On renomme order_items ➔ items
        const withItems: Order[] = data.map(o => ({
          id:         o.id,
          full_name:  o.full_name,
          phone:      o.phone,
          wilaya:     o.wilaya,
          address:    o.address,
          subtotal:   o.subtotal,
          shipping:   o.shipping,
          tax:        o.tax,
          total:      o.total,
          created_at:o.created_at,
          items:      o.order_items
        }));
        setOrders(withItems);
      }

      setLoading(false);
    }
    load();
  }, []);

  // 2️⃣ Metrics
  const totalOrders    = orders.length;
  const totalRevenue   = orders.reduce((s,o) => s + o.total, 0);
  const totalCustomers = new Set(orders.map(o => o.full_name)).size;

  // 3️⃣ Filtered list
  const visible = orders.filter(o =>
    o.full_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-dark-900 text-white overflow-hidden">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-dark-800 shadow-lg
        transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 transition-transform z-30
      `}>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8">Mon Admin</h2>
          <nav className="space-y-4">
            {['Dashboard','Produits','Commandes','Clients','Paramètres'].map(i => (
              <a
                key={i}
                href="#"
                className="block px-4 py-2 rounded-lg hover:bg-dark-700 transition"
              >{i}</a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col md:pl-64">
        {/* Header */}
        <header className="flex items-center justify-between bg-dark-800 px-6 py-4">
          <button
            onClick={() => setSidebar(o=>!o)}
            className="md:hidden p-2 rounded hover:bg-dark-700"
          >
            <Menu />
          </button>
          <div className="relative w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un client…"
              className="w-full pl-10 pr-4 py-2 rounded bg-dark-700 border border-dark-600 focus:outline-none"
              value={search}
              onChange={e=>setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <span>Admin</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <ShoppingCart className="text-primary-400"/>, label:'Commandes', value: totalOrders },
              { icon: <DollarSign    className="text-green-400"/>, label:'CA total',  value: totalRevenue.toFixed(2) },
              { icon: <Users         className="text-red-400"/>,   label:'Clients',   value: totalCustomers }
            ].map((c,i)=>((
              <motion.div
                key={i}
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay:i*0.1 }}
                className="flex items-center bg-dark-800 p-6 rounded-lg shadow-lg"
              >
                <div className="p-3 bg-dark-700 rounded-full mr-4">{c.icon}</div>
                <div>
                  <p className="text-gray-400 text-sm">{c.label}</p>
                  <p className="text-2xl font-semibold">{c.value}</p>
                </div>
              </motion.div>
            )))}
          </div>

          {/* Orders Table */}
          <div className="bg-dark-800 rounded-lg shadow-lg overflow-auto">
            <table className="min-w-full">
              <thead className="bg-dark-700">
                <tr>
                  {['#','Client','Tél','Wilaya','Total','Date','Détails'].map(h=>(
                    <th key={h} className="px-4 py-3 text-left text-gray-400 text-sm">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr><td colSpan={7} className="p-4 text-center">Chargement…</td></tr>
                )}
                {error && (
                  <tr><td colSpan={7} className="p-4 text-center text-red-500">{error}</td></tr>
                )}
                {!loading && visible.length===0 && (
                  <tr><td colSpan={7} className="p-4 text-center text-gray-500">
                    Aucune commande trouvée
                  </td></tr>
                )}
                {visible.map(o=>(
                  <React.Fragment key={o.id}>
                    <tr className="border-b border-dark-700 hover:bg-dark-700 transition">
                      <td className="px-4 py-3">{o.id}</td>
                      <td className="px-4 py-3">{o.full_name}</td>
                      <td className="px-4 py-3">{o.phone}</td>
                      <td className="px-4 py-3">{o.wilaya}</td>
                      <td className="px-4 py-3">${o.total.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm">
                        {new Date(o.created_at).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={()=>setExpanded(e=>e===o.id?null:o.id)}
                          className="flex items-center text-primary-400 hover:underline"
                        >
                          {expanded===o.id ? <ChevronUp/> : <ChevronDown/>}
                        </button>
                      </td>
                    </tr>

                    <AnimatePresence>
                      {expanded===o.id && (
                        <motion.tr
                          initial={{ opacity:0, height:0 }}
                          animate={{ opacity:1, height:'auto' }}
                          exit={{ opacity:0, height:0 }}
                        >
                          <td colSpan={7} className="p-4 bg-dark-700">
                            {/* Détails */}
                            <div className="space-y-4">
                              <div className="flex flex-wrap gap-4">
                                {o.items.map((it,i)=>(
                                  <div
                                    key={i}
                                    className="bg-dark-600 p-3 rounded-lg flex items-center shadow"
                                  >
                                    <motion.img
                                      src={it.image_url}
                                      alt={it.name}
                                      className="w-16 h-16 object-cover rounded mr-3 cursor-zoom-in"
                                      whileHover={{ scale:1.1 }}
                                      onClick={()=>setZoomImg(it.image_url)}
                                    />
                                    <div>
                                      <p className="font-medium">{it.name}</p>
                                      <p className="text-gray-400 text-sm">
                                        {it.quantity}× ${it.price.toFixed(2)}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-gray-300">
                                <div>
                                  <span className="font-medium">Adresse :</span>
                                  <p>{o.address}</p>
                                </div>
                                <div>
                                  <span className="font-medium">Sous-total :</span>
                                  <p>${o.subtotal.toFixed(2)}</p>
                                </div>
                                <div>
                                  <span className="font-medium">Livraison :</span>
                                  <p>${o.shipping.toFixed(2)}</p>
                                </div>
                                <div>
                                  <span className="font-medium">Taxe :</span>
                                  <p>${o.tax.toFixed(2)}</p>
                                </div>
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Modal Zoom */}
      <AnimatePresence>
        {zoomImg && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
          >
            <motion.div
              className="relative"
              initial={{ scale:0.8 }}
              animate={{ scale:1 }}
              exit={{ scale:0.8 }}
            >
              <img src={zoomImg} className="max-w-full max-h-screen rounded-lg" />
              <button
                onClick={()=>setZoomImg(null)}
                className="absolute top-2 right-2 p-2 bg-dark-900 rounded-full hover:bg-dark-800"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
