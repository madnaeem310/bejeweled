import { Link } from "react-router";
import { Menu, Search, User, ShoppingCart, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";

export function Header() {
  const { user, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (user) {
      api.getCart().then((cart) => {
        setCartCount(cart.items?.length || 0);
      }).catch(() => setCartCount(0));
    } else {
      setCartCount(0);
    }
  }, [user]);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left Section */}
          <div className="flex items-center gap-4 md:gap-6">
            <button 
              className="hover:opacity-70 transition-opacity"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <button 
              className="hover:opacity-70 transition-opacity"
              aria-label="Search"
            >
              <Search className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Center - Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 
              className="text-2xl md:text-3xl tracking-wider"
              style={{ 
                fontFamily: 'Georgia, serif',
                color: '#4A1942',
                fontWeight: 400,
                letterSpacing: '0.1em'
              }}
            >
              BEJEWELED
            </h1>
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-4 md:gap-6">
            {user ? (
              <>
                <span className="hidden md:inline text-sm" style={{ color: '#4A1942' }}>
                  {user.firstName}
                </span>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="text-xs px-2 py-1 rounded"
                    style={{ backgroundColor: '#E6D5F0', color: '#4A1942' }}
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="hover:opacity-70 transition-opacity"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5 text-gray-700" />
                </button>
              </>
            ) : (
              <Link 
                to="/login"
                className="hover:opacity-70 transition-opacity"
                aria-label="Account"
              >
                <User className="w-6 h-6 text-gray-700" />
              </Link>
            )}
            <Link 
              to="/cart"
              className="relative hover:opacity-70 transition-opacity"
              aria-label="Cart"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartCount > 0 && (
                <span 
                  className="absolute -top-2 -right-2 text-xs w-5 h-5 flex items-center justify-center rounded-full text-white font-medium"
                  style={{ backgroundColor: '#E6D5F0', color: '#4A1942' }}
                >
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}