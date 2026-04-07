import { Link, Outlet, useLocation } from "react-router";
import { LayoutDashboard, Package, ShoppingBag, Users, Search, Bell } from "lucide-react";

export function AdminLayout() {
  const location = useLocation();

  const navItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/products", icon: Package, label: "Products" },
    { path: "/admin/orders", icon: ShoppingBag, label: "Orders" },
    { path: "/admin/customers", icon: Users, label: "Customers" },
  ];

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar */}
      <aside 
        className="w-64 flex-shrink-0 flex flex-col"
        style={{ backgroundColor: '#4A1942' }}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-center border-b border-white border-opacity-10">
          <h1 
            className="text-2xl text-white tracking-widest"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            BEJEWELED
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-3 px-4 py-3 rounded transition-colors"
                    style={{
                      backgroundColor: active ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      color: 'white'
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Admin Info */}
        <div className="p-4 border-t border-white border-opacity-10">
          <p className="text-white text-sm">Admin Panel</p>
          <p className="text-white text-xs opacity-70">v1.0.0</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          {/* Search */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-current transition-colors"
                style={{ borderColor: '#E6D5F0' }}
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button 
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span 
                className="absolute top-1 right-1 w-2 h-2 rounded-full"
                style={{ backgroundColor: '#4A1942' }}
              />
            </button>

            {/* Admin Avatar */}
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: '#4A1942' }}
              >
                <span className="text-sm">AD</span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm" style={{ color: '#4A1942' }}>
                  Admin User
                </p>
                <p className="text-xs text-gray-500">
                  admin@bejeweled.com
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main 
          className="flex-1 overflow-auto"
          style={{ backgroundColor: '#F5F5F5' }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
