supabase
  .from('orders')
  .select('*')
  .order('created_at', { ascending: false })
// src/pages/AdminOrders.tsx
import React, { useEffect, useState } from 'react';
// ← Remonte de deux dossiers pour atteindre src/lib/supabase.ts
import { supabase } from '../../lib/supabase';
import { ChevronDown, ChevronUp } from 'lucide-react';

type OrderItem = {
  product_id: string;
  name:       string;
  price:      number;
  quantity:   number;
  image_url:  string;
};

type Order = {
  id:          number;
  full_name:   string;
  phone:       string;
  wilaya:      string;
  address:     string;
  items:       OrderItem[];
  subtotal:    number;
  shipping:    number;
  tax:         number;
  total:       number;
  created_at:  string;
};

const AdminOrders: React.FC = () => {
  const [orders, setOrders]           = useState<Order[]>([]);
  const [loading, setLoading]         = useState<boolean>(true);
  const [error, setError]             = useState<string | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
      } else if (data) {
        setOrders(data);
      }
      setLoading(false);
    }
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-400">Chargement des commandes…</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-400 mb-4">Erreur : {error}</p>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 container-custom">
      <h1 className="text-3xl font-heading font-bold mb-8">Tableau de bord – Commandes reçues</h1>

      <div className="overflow-x-auto bg-dark-200 rounded-lg shadow">
        <table className="w-full text-left">
          <thead className="bg-dark-300">
            <tr>
              <th className="px-4 py-3 text-sm text-gray-400">#</th>
              <th className="px-4 py-3 text-sm text-gray-400">Client</th>
              <th className="px-4 py-3 text-sm text-gray-400">Téléphone</th>
              <th className="px-4 py-3 text-sm text-gray-400">Wilaya</th>
              <th className="px-4 py-3 text-sm text-gray-400">Total</th>
              <th className="px-4 py-3 text-sm text-gray-400">Date</th>
              <th className="px-4 py-3 text-sm text-gray-400">Détails</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
              <React.Fragment key={order.id}>
                <tr className="border-b border-dark-400 hover:bg-dark-300">
                  <td className="px-4 py-3 text-white">{order.id}</td>
                  <td className="px-4 py-3 text-white">{order.full_name}</td>
                  <td className="px-4 py-3 text-white">{order.phone}</td>
                  <td className="px-4 py-3 text-white">{order.wilaya}</td>
                  <td className="px-4 py-3 text-white">${order.total.toFixed(2)}</td>
                  <td className="px-4 py-3 text-white">
                    {new Date(order.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-white">
                    <button
                      onClick={() =>
                        setExpandedOrderId(prev => (prev === order.id ? null : order.id))
                      }
                      className="flex items-center space-x-1 text-gray-400 hover:text-primary-400"
                    >
                      {expandedOrderId === order.id ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                      <span className="text-sm">
                        {expandedOrderId === order.id ? 'Cacher' : 'Voir'}
                      </span>
                    </button>
                  </td>
                </tr>

                {expandedOrderId === order.id && (
                  <tr className="bg-dark-300">
                    <td colSpan={7} className="px-4 py-4">
                      {/* Détail des items */}
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-6">
                          {order.items.map((item, i) => (
                            <div
                              key={i}
                              className="flex items-center bg-dark-200 rounded-lg p-3"
                            >
                              <img
                                src={item.image_url}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded mr-4"
                              />
                              <div>
                                <p className="text-white font-medium">{item.name}</p>
                                <p className="text-gray-400 text-sm">
                                  {item.quantity} × ${item.price.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Infos de facturation */}
                        <div className="grid grid-cols-2 gap-6 mt-4">
                          <div>
                            <p className="text-gray-400 text-sm mb-1">Adresse :</p>
                            <p className="text-white">{order.address}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm mb-1">Sous-total :</p>
                            <p className="text-white">${order.subtotal.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm mb-1">Frais livraison :</p>
                            <p className="text-white">${order.shipping.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm mb-1">Taxe :</p>
                            <p className="text-white">${order.tax.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="p-6 text-center text-gray-400">
            Aucune commande reçue pour le moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
