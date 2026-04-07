import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Star } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export function Home() {
  const { user } = useAuth();
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProducts({ limit: '4', sort: 'rating' })
      .then((data) => setFeaturedProducts(data.products))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = async (productId: string) => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    try {
      await api.addToCart({ productId });
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-[600px] md:min-h-[700px]">
        <div className="grid md:grid-cols-2 h-full">
          {/* Left Side - Text Content */}
          <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 py-16 md:py-0">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight"
              style={{ 
                fontFamily: 'Georgia, serif',
                color: '#4A1942'
              }}
            >
              Timeless Luxury
            </h1>
            <p className="text-base md:text-lg mb-8 leading-relaxed max-w-md" style={{ color: '#5C3A5E' }}>
              Discover our exquisite collection of handcrafted jewelry. Each piece tells a story of elegance, sophistication, and timeless beauty.
            </p>
            <div>
              <Link 
                to="/products"
                className="inline-block px-8 py-3 text-white tracking-wide transition-opacity hover:opacity-90"
                style={{ 
                  backgroundColor: '#4A1942',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: '15px'
                }}
              >
                Shop Collection
              </Link>
            </div>
          </div>

          {/* Right Side - Hero Image */}
          <div className="relative h-[400px] md:h-full">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1758995115682-1452a1a9e35b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbHJ5JTIwZWxlZ2FudHxlbnwxfHx8fDE3NzI1NTQ2NzF8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Luxury Jewelry Collection"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Heading */}
          <h2 
            className="text-3xl md:text-4xl text-center mb-12 md:mb-16"
            style={{ 
              fontFamily: 'Georgia, serif',
              color: '#4A1942'
            }}
          >
            Best Sellers
          </h2>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {loading ? (
              <p className="col-span-full text-center" style={{ color: '#5C3A5E' }}>Loading...</p>
            ) : featuredProducts.map((product) => (
              <div key={product._id} className="group">
                {/* Product Image */}
                <Link to={`/products/${product._id}`} className="block mb-4">
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={product.images?.[0] || ''}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>

                {/* Product Info */}
                <div className="space-y-2">
                  <Link to={`/products/${product._id}`}>
                    <h3 
                      className="text-base md:text-lg hover:opacity-70 transition-opacity"
                      style={{ 
                        fontFamily: 'Georgia, serif',
                        color: '#4A1942'
                      }}
                    >
                      {product.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(product.rating || 0)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-4 h-4" 
                        style={{ fill: '#4A1942', color: '#4A1942' }}
                      />
                    ))}
                  </div>

                  {/* Price */}
                  <p 
                    className="text-lg"
                    style={{ color: '#5C3A5E' }}
                  >
                    ${product.price?.toLocaleString()}
                  </p>

                  {/* Add to Cart Button */}
                  <button 
                    onClick={() => handleAddToCart(product._id)}
                    className="w-full py-2 text-sm border transition-all hover:bg-opacity-10"
                    style={{ 
                      borderColor: '#4A1942',
                      color: '#4A1942'
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
