import { Link } from "react-router";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribe email:", email);
    setEmail("");
  };

  return (
    <footer 
      className="py-12 md:py-16"
      style={{ backgroundColor: '#E6D5F0' }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Story */}
          <div>
            <h3 
              className="text-lg mb-4 tracking-wide"
              style={{ 
                fontFamily: 'Georgia, serif',
                color: '#4A1942',
                fontWeight: 500
              }}
            >
              Our Story
            </h3>
            <p 
              className="text-sm leading-relaxed"
              style={{ color: '#5C3A5E' }}
            >
              BEJEWELED brings you timeless elegance and contemporary luxury. Each piece is carefully curated to celebrate your unique style and sophistication.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 
              className="text-lg mb-4 tracking-wide"
              style={{ 
                fontFamily: 'Georgia, serif',
                color: '#4A1942',
                fontWeight: 500
              }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/products"
                  className="text-sm hover:opacity-70 transition-opacity"
                  style={{ color: '#5C3A5E' }}
                >
                  Shop All
                </Link>
              </li>
              <li>
                <Link 
                  to="/collections"
                  className="text-sm hover:opacity-70 transition-opacity"
                  style={{ color: '#5C3A5E' }}
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link 
                  to="/about"
                  className="text-sm hover:opacity-70 transition-opacity"
                  style={{ color: '#5C3A5E' }}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact"
                  className="text-sm hover:opacity-70 transition-opacity"
                  style={{ color: '#5C3A5E' }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 
              className="text-lg mb-4 tracking-wide"
              style={{ 
                fontFamily: 'Georgia, serif',
                color: '#4A1942',
                fontWeight: 500
              }}
            >
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/shipping"
                  className="text-sm hover:opacity-70 transition-opacity"
                  style={{ color: '#5C3A5E' }}
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq"
                  className="text-sm hover:opacity-70 transition-opacity"
                  style={{ color: '#5C3A5E' }}
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy"
                  className="text-sm hover:opacity-70 transition-opacity"
                  style={{ color: '#5C3A5E' }}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms"
                  className="text-sm hover:opacity-70 transition-opacity"
                  style={{ color: '#5C3A5E' }}
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 
              className="text-lg mb-4 tracking-wide"
              style={{ 
                fontFamily: 'Georgia, serif',
                color: '#4A1942',
                fontWeight: 500
              }}
            >
              Newsletter
            </h3>
            <p 
              className="text-sm mb-4 leading-relaxed"
              style={{ color: '#5C3A5E' }}
            >
              Subscribe to receive exclusive offers and updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="px-4 py-2 text-sm bg-white border-none rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ 
                  color: '#4A1942',
                  caretColor: '#4A1942'
                }}
              />
              <button
                type="submit"
                className="px-6 py-2 text-sm text-white tracking-wide transition-opacity hover:opacity-90"
                style={{ 
                  backgroundColor: '#4A1942',
                  fontFamily: 'Georgia, serif'
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t text-center" style={{ borderColor: '#D4B8E1' }}>
          <p className="text-sm" style={{ color: '#5C3A5E' }}>
            © 2026 BEJEWELED. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
