import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Star, ChevronDown } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export function Products() {
  const { user } = useAuth();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [products, setProducts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params: Record<string, string> = { sort: sortBy };
    if (selectedCategories.length === 1) {
      params.category = selectedCategories[0];
    }

    setLoading(true);
    api.getProducts(params)
      .then((data) => {
        setProducts(data.products);
        setTotal(data.total);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [sortBy, selectedCategories]);

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

  const categories = ["Rings", "Necklaces", "Earrings", "Bracelets", "Watches", "Brooches"];
  const priceRanges = ["Under $1,000", "$1,000 - $2,000", "$2,000 - $3,000", "Over $3,000"];
  const ratings = ["5 Stars", "4 Stars & Up", "3 Stars & Up"];

  const toggleFilter = (value: string, filterType: 'category' | 'price' | 'rating') => {
    if (filterType === 'category') {
      setSelectedCategories(prev =>
        prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
      );
    } else if (filterType === 'price') {
      setSelectedPriceRange(prev =>
        prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
      );
    } else if (filterType === 'rating') {
      setSelectedRatings(prev =>
        prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
      );
    }
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Sidebar - Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <h2 
                className="text-xl mb-6"
                style={{ 
                  fontFamily: 'Georgia, serif',
                  color: '#4A1942'
                }}
              >
                Filters
              </h2>

              <Accordion type="multiple" className="space-y-1">
                {/* Categories */}
                <AccordionItem value="categories" className="border-none">
                  <AccordionTrigger 
                    className="py-3 hover:no-underline"
                    style={{ color: '#4A1942' }}
                  >
                    Categories
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pb-4">
                      {categories.map((category) => (
                        <label 
                          key={category} 
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => toggleFilter(category, 'category')}
                            className="w-4 h-4 accent-current"
                            style={{ accentColor: '#4A1942' }}
                          />
                          <span className="text-sm" style={{ color: '#5C3A5E' }}>
                            {category}
                          </span>
                        </label>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Price Range */}
                <AccordionItem value="price" className="border-none">
                  <AccordionTrigger 
                    className="py-3 hover:no-underline"
                    style={{ color: '#4A1942' }}
                  >
                    Price Range
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pb-4">
                      {priceRanges.map((range) => (
                        <label 
                          key={range} 
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedPriceRange.includes(range)}
                            onChange={() => toggleFilter(range, 'price')}
                            className="w-4 h-4"
                            style={{ accentColor: '#4A1942' }}
                          />
                          <span className="text-sm" style={{ color: '#5C3A5E' }}>
                            {range}
                          </span>
                        </label>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Rating */}
                <AccordionItem value="rating" className="border-none">
                  <AccordionTrigger 
                    className="py-3 hover:no-underline"
                    style={{ color: '#4A1942' }}
                  >
                    Rating
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pb-4">
                      {ratings.map((rating) => (
                        <label 
                          key={rating} 
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedRatings.includes(rating)}
                            onChange={() => toggleFilter(rating, 'rating')}
                            className="w-4 h-4"
                            style={{ accentColor: '#4A1942' }}
                          />
                          <span className="text-sm" style={{ color: '#5C3A5E' }}>
                            {rating}
                          </span>
                        </label>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </aside>

          {/* Right Main Area */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b" style={{ borderColor: '#E6D5F0' }}>
              <p className="text-sm" style={{ color: '#5C3A5E' }}>
                {total} Products
              </p>
              
              <Select defaultValue="featured" onValueChange={(val) => setSortBy(val)}>
                <SelectTrigger 
                  className="w-[180px] border"
                  style={{ 
                    borderColor: '#E6D5F0',
                    color: '#4A1942'
                  }}
                >
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {loading ? (
                <p className="col-span-full text-center" style={{ color: '#5C3A5E' }}>Loading...</p>
              ) : products.map((product) => (
                <div key={product._id} className="group">
                  {/* Product Image */}
                  <Link to={`/products/${product._id}`} className="block mb-4">
                    <div className="aspect-square overflow-hidden bg-gray-50">
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
                        className="text-base hover:opacity-70 transition-opacity"
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
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-4 h-4" 
                          style={{ 
                            fill: i < (product.rating || 0) ? '#4A1942' : 'transparent',
                            color: '#4A1942',
                            opacity: i < (product.rating || 0) ? 1 : 0.3
                          }}
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
                      className="w-full py-2 text-sm border transition-all hover:bg-opacity-10 mt-3"
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
        </div>
      </div>
    </div>
  );
}
