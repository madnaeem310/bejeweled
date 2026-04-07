import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Minus, Plus, X, ChevronLeft } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export function Cart() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    api.getCart()
      .then((cart) => {
        setCartItems(cart.items || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const updateQuantity = async (itemId: string, change: number) => {
    const item = cartItems.find((i) => i._id === itemId);
    if (!item) return;
    const newQty = Math.max(1, item.quantity + change);
    try {
      const cart = await api.updateCartItem(itemId, newQty);
      setCartItems(cart.items || []);
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const cart = await api.removeFromCart(itemId);
      setCartItems(cart.items || []);
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Back Button */}
        <Link 
          to="/products"
          className="inline-flex items-center gap-2 mb-8 hover:opacity-70 transition-opacity"
          style={{ color: '#4A1942' }}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm">Continue Shopping</span>
        </Link>

        {/* Page Title */}
        <h1 
          className="text-3xl md:text-4xl mb-8 md:mb-12"
          style={{ 
            fontFamily: 'Georgia, serif',
            color: '#4A1942'
          }}
        >
          Shopping Cart
        </h1>

        {loading ? (
          <div className="text-center py-16">
            <p style={{ color: '#5C3A5E' }}>Loading...</p>
          </div>
        ) : !user ? (
          <div className="text-center py-16">
            <p className="text-lg mb-6" style={{ color: '#5C3A5E' }}>
              Please sign in to view your cart
            </p>
            <Link 
              to="/login"
              className="inline-block px-8 py-3 text-white"
              style={{ backgroundColor: '#4A1942' }}
            >
              Sign In
            </Link>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg mb-6" style={{ color: '#5C3A5E' }}>
              Your cart is empty
            </p>
            <Link 
              to="/products"
              className="inline-block px-8 py-3 text-white"
              style={{ backgroundColor: '#4A1942' }}
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            {/* Left Side - Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-0">
                {cartItems.map((item, index) => (
                  <div key={item._id}>
                    <div className="py-6 flex gap-4 md:gap-6">
                      {/* Product Image */}
                      <Link 
                        to={`/products/${item.product?._id}`}
                        className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-gray-50 overflow-hidden"
                      >
                        <ImageWithFallback
                          src={item.product?.images?.[0] || ''}
                          alt={item.product?.name || ''}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-4 mb-2">
                            <Link to={`/products/${item.product?._id}`}>
                              <h3 
                                className="text-lg hover:opacity-70 transition-opacity"
                                style={{ 
                                  fontFamily: 'Georgia, serif',
                                  color: '#4A1942'
                                }}
                              >
                                {item.product?.name}
                              </h3>
                            </Link>
                            <button
                              onClick={() => removeItem(item._id)}
                              className="hover:opacity-70 transition-opacity"
                              aria-label="Remove item"
                            >
                              <X className="w-5 h-5" style={{ color: '#5C3A5E' }} />
                            </button>
                          </div>
                          {item.size && (
                            <p className="text-sm mb-1" style={{ color: '#5C3A5E' }}>
                              Size: {item.size}
                            </p>
                          )}
                          {item.color && (
                            <p className="text-sm mb-3" style={{ color: '#5C3A5E' }}>
                              Color: {item.color}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Selector */}
                          <div className="flex items-center gap-3 border" style={{ borderColor: '#E6D5F0' }}>
                            <button
                              onClick={() => updateQuantity(item._id, -1)}
                              className="p-2 hover:bg-opacity-10 transition-colors"
                              style={{ color: '#4A1942' }}
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center" style={{ color: '#4A1942' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item._id, 1)}
                              className="p-2 hover:bg-opacity-10 transition-colors"
                              style={{ color: '#4A1942' }}
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Price */}
                          <p 
                            className="text-lg"
                            style={{ color: '#4A1942' }}
                          >
                            ${((item.product?.price || 0) * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    {index < cartItems.length - 1 && (
                      <div className="border-b" style={{ borderColor: '#E6D5F0' }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Order Summary */}
            <div className="lg:col-span-1">
              <div 
                className="border p-6 md:p-8 sticky top-24"
                style={{ borderColor: '#E6D5F0' }}
              >
                <h2 
                  className="text-xl mb-6"
                  style={{ 
                    fontFamily: 'Georgia, serif',
                    color: '#4A1942'
                  }}
                >
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span style={{ color: '#5C3A5E' }}>Subtotal</span>
                    <span style={{ color: '#4A1942' }}>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#5C3A5E' }}>Shipping</span>
                    <span style={{ color: '#4A1942' }}>
                      {shipping === 0 ? 'Free' : `$${shipping}`}
                    </span>
                  </div>
                  {subtotal <= 1000 && (
                    <p className="text-xs" style={{ color: '#5C3A5E' }}>
                      Free shipping on orders over $1,000
                    </p>
                  )}
                </div>

                <div 
                  className="border-t pt-4 mb-6"
                  style={{ borderColor: '#E6D5F0' }}
                >
                  <div className="flex justify-between text-lg">
                    <span 
                      style={{ 
                        fontFamily: 'Georgia, serif',
                        color: '#4A1942'
                      }}
                    >
                      Total
                    </span>
                    <span 
                      style={{ 
                        fontFamily: 'Georgia, serif',
                        color: '#4A1942'
                      }}
                    >
                      ${total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full py-3 text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#4A1942' }}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
