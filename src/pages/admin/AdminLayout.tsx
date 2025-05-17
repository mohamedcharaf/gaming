import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-6">Admin</h2>
        <nav className="space-y-4">
          <NavLink to="/admin" end className={({ isActive }) =>
            isActive ? 'text-indigo-400' : 'hover:text-white'
          }>
            Dashboard
          </NavLink>
          <NavLink to="orders" className={({ isActive }) =>
            isActive ? 'text-indigo-400' : 'hover:text-white'
          }>
            Commandes
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-900 text-gray-100 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
