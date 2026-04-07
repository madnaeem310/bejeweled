import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { Star, Heart, ChevronLeft } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export function ProductDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.getProductById(id)
      .then((data) => setProduct(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    if (!product) return;
    try {
      await api.addToCart({
        productId: product._id,
        size: selectedSize,
        color: selectedColor,
      });
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <p style={{ color: '#5C3A5E' }}>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <p style={{ color: '#5C3A5E' }}>Product not found</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Back Button */}
        <Link 
          to="/products"
          className="inline-flex items-center gap-2 mb-8 hover:opacity-70 transition-opacity"
          style={{ color: '#4A1942' }}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm">Back to Products</span>
        </Link>

        {/* Main Product Section */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 mb-16">
          {/* Left Side - Images */}
          <div>
            {/* Main Image */}
            <div className="aspect-square bg-gray-50 mb-4 overflow-hidden">
              <ImageWithFallback
                src={product.images?.[selectedImage] || ''}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-50 overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-current' : 'border-transparent'
                  }`}
                  style={{ borderColor: selectedImage === index ? '#4A1942' : 'transparent' }}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div>
            {/* Product Title */}
            <h1 
              className="text-3xl md:text-4xl mb-4"
              style={{ 
                fontFamily: 'Georgia, serif',
                color: '#4A1942'
              }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(product.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5" 
                    style={{ fill: '#4A1942', color: '#4A1942' }}
                  />
                ))}
              </div>
              <span className="text-sm" style={{ color: '#5C3A5E' }}>
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <p 
              className="text-3xl mb-8"
              style={{ color: '#4A1942' }}
            >
              ${product.price?.toLocaleString()}
            </p>

            {/* Size Selection */}
            <div className="mb-6">
              <label 
                className="block text-sm mb-3"
                style={{ color: '#4A1942' }}
              >
                Size
              </label>
              <div className="flex flex-wrap gap-2">
                {(product.sizes || []).map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border text-sm transition-all ${
                      selectedSize === size 
                        ? 'border-current bg-current text-white' 
                        : 'border-gray-300 hover:border-current'
                    }`}
                    style={{
                      borderColor: selectedSize === size ? '#4A1942' : undefined,
                      backgroundColor: selectedSize === size ? '#4A1942' : undefined,
                      color: selectedSize === size ? 'white' : '#4A1942'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-8">
              <label 
                className="block text-sm mb-3"
                style={{ color: '#4A1942' }}
              >
                Color
              </label>
              <div className="flex flex-wrap gap-2">
                {(product.colors || []).map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border text-sm transition-all ${
                      selectedColor === color 
                        ? 'border-current bg-current text-white' 
                        : 'border-gray-300 hover:border-current'
                    }`}
                    style={{
                      borderColor: selectedColor === color ? '#4A1942' : undefined,
                      backgroundColor: selectedColor === color ? '#4A1942' : undefined,
                      color: selectedColor === color ? 'white' : '#4A1942'
                    }}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <button 
                onClick={handleAddToCart}
                className="flex-1 py-3 text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#4A1942' }}
              >
                Add to Cart
              </button>
              <button 
                className="px-6 py-3 border transition-all hover:bg-opacity-10"
                style={{ 
                  borderColor: '#4A1942',
                  color: '#4A1942'
                }}
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-6 space-y-3" style={{ borderColor: '#E6D5F0' }}>
              <p className="text-sm" style={{ color: '#5C3A5E' }}>
                ✓ Free shipping on orders over $1,000
              </p>
              <p className="text-sm" style={{ color: '#5C3A5E' }}>
                ✓ 30-day return policy
              </p>
              <p className="text-sm" style={{ color: '#5C3A5E' }}>
                ✓ Lifetime warranty included
              </p>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="max-w-5xl mx-auto">
          <TabsList 
            className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent"
            style={{ borderColor: '#E6D5F0' }}
          >
            <TabsTrigger 
              value="description"
              className="rounded-none pb-3 px-6 data-[state=active]:shadow-none data-[state=active]:bg-transparent border-b-2 border-transparent data-[state=active]:border-current"
              style={{ 
                color: '#5C3A5E',
                '--tab-active-color': '#4A1942'
              } as React.CSSProperties}
              data-active-color="#4A1942"
            >
              Description
            </TabsTrigger>
            <TabsTrigger 
              value="specifications"
              className="rounded-none pb-3 px-6 data-[state=active]:shadow-none data-[state=active]:bg-transparent border-b-2 border-transparent data-[state=active]:border-current"
              style={{ 
                color: '#5C3A5E'
              }}
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger 
              value="reviews"
              className="rounded-none pb-3 px-6 data-[state=active]:shadow-none data-[state=active]:bg-transparent border-b-2 border-transparent data-[state=active]:border-current"
              style={{ 
                color: '#5C3A5E'
              }}
            >
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="py-8">
            <p 
              className="text-base leading-relaxed max-w-3xl"
              style={{ color: '#5C3A5E' }}
            >
              {product.description}
            </p>
          </TabsContent>

          <TabsContent value="specifications" className="py-8">
            <div className="max-w-2xl space-y-4">
              {(product.specifications || []).map((spec: any, index: number) => (
                <div 
                  key={index}
                  className="flex justify-between py-3 border-b"
                  style={{ borderColor: '#E6D5F0' }}
                >
                  <span 
                    className="font-medium"
                    style={{ color: '#4A1942' }}
                  >
                    {spec.label}
                  </span>
                  <span style={{ color: '#5C3A5E' }}>
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="py-8">
            <div className="space-y-6 max-w-3xl">
              {(product.reviews || []).map((review: any) => (
                <div 
                  key={review._id}
                  className="pb-6 border-b"
                  style={{ borderColor: '#E6D5F0' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p 
                        className="font-medium mb-1"
                        style={{ color: '#4A1942' }}
                      >
                        {review.user?.firstName || 'Anonymous'} {review.user?.lastName?.[0] || ''}.
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star 
                              key={i} 
                              className="w-4 h-4" 
                              style={{ fill: '#4A1942', color: '#4A1942' }}
                            />
                          ))}
                        </div>
                        <span className="text-sm" style={{ color: '#5C3A5E' }}>
                          {new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ color: '#5C3A5E' }}
                  >
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
