import { NavLink, Outlet } from 'react-router-dom';

export default function Admin() {
  /** 🔑  IMPORTANT
   *  SANS slash au début → chemin RELATIF à /admin
   *  => /admin/add-product, /admin/orders, … */
  const linkBase =
    'block px-4 py-2 rounded-md transition-colors text-sm font-medium';

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6">
        <h2 className="text-3xl font-bold mb-8">Dashboard</h2>

        <nav className="space-y-3">
          <NavLink
            to="add-product"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`
            }
          >
            Products
          </NavLink>

          <NavLink
            to="orders"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`
            }
          >
            Orders
          </NavLink>

          {/* Exemples d’autres liens à venir */}
          <NavLink
            to="customers"
            className={linkBase + ' text-gray-500 cursor-not-allowed opacity-40'}
          >
            Customers
          </NavLink>
          <NavLink
            to="income"
            className={linkBase + ' text-gray-500 cursor-not-allowed opacity-40'}
          >
            Income
          </NavLink>
          <NavLink
            to="promote"
            className={linkBase + ' text-gray-500 cursor-not-allowed opacity-40'}
          >
            Promote
          </NavLink>
          <NavLink
            to="help"
            className={linkBase + ' text-gray-500 cursor-not-allowed opacity-40'}
          >
            Help
          </NavLink>
        </nav>
      </aside>

      {/* Contenu central */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
