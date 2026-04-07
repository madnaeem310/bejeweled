import { useState } from "react";
import { useNavigate } from "react-router";
import { Upload, X } from "lucide-react";
import { api } from "../../lib/api";

export function AddProduct() {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    sku: '',
    status: 'active',
    description: '',
    tags: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createProduct({
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock),
        sku: formData.sku,
        isActive: formData.status === 'active',
        description: formData.description,
        tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
        images,
      });
      navigate("/admin/products");
    } catch (err) {
      console.error('Failed to create product:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 
          className="text-3xl mb-2"
          style={{ 
            fontFamily: 'Georgia, serif',
            color: '#4A1942'
          }}
        >
          Add New Product
        </h1>
        <p className="text-gray-600">Create a new product listing</p>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label 
                  className="block text-sm mb-2"
                  style={{ color: '#4A1942' }}
                >
                  Product Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:border-current transition-colors"
                  style={{ borderColor: '#E6D5F0' }}
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label 
                  className="block text-sm mb-2"
                  style={{ color: '#4A1942' }}
                >
                  Category
                </label>
                <select
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:border-current transition-colors"
                  style={{ borderColor: '#E6D5F0', color: '#4A1942' }}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  <option value="">Select category</option>
                  <option value="rings">Rings</option>
                  <option value="necklaces">Necklaces</option>
                  <option value="earrings">Earrings</option>
                  <option value="bracelets">Bracelets</option>
                </select>
              </div>

              <div>
                <label 
                  className="block text-sm mb-2"
                  style={{ color: '#4A1942' }}
                >
                  Price
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:border-current transition-colors"
                  style={{ borderColor: '#E6D5F0' }}
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>

              <div>
                <label 
                  className="block text-sm mb-2"
                  style={{ color: '#4A1942' }}
                >
                  Stock Quantity
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:border-current transition-colors"
                  style={{ borderColor: '#E6D5F0' }}
                  placeholder="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  required
                />
              </div>

              <div>
                <label 
                  className="block text-sm mb-2"
                  style={{ color: '#4A1942' }}
                >
                  SKU
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:border-current transition-colors"
                  style={{ borderColor: '#E6D5F0' }}
                  placeholder="Enter SKU"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                />
              </div>

              <div>
                <label 
                  className="block text-sm mb-2"
                  style={{ color: '#4A1942' }}
                >
                  Status
                </label>
                <select
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:border-current transition-colors"
                  style={{ borderColor: '#E6D5F0', color: '#4A1942' }}
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Image Upload */}
              <div>
                <label 
                  className="block text-sm mb-2"
                  style={{ color: '#4A1942' }}
                >
                  Product Images
                </label>
                <div 
                  className="border-2 border-dashed rounded-lg p-8 text-center transition-colors hover:border-current"
                  style={{ borderColor: '#E6D5F0' }}
                >
                  <input
                    type="file"
                    id="image-upload"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                  <label 
                    htmlFor="image-upload"
                    className="cursor-pointer"
                  >
                    <Upload 
                      className="w-12 h-12 mx-auto mb-4"
                      style={{ color: '#5C3A5E' }}
                    />
                    <p 
                      className="mb-2"
                      style={{ color: '#4A1942' }}
                    >
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG up to 10MB
                    </p>
                  </label>
                </div>

                {/* Image Preview */}
                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label 
                  className="block text-sm mb-2"
                  style={{ color: '#4A1942' }}
                >
                  Description
                </label>
                <textarea
                  rows={8}
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:border-current transition-colors resize-none"
                  style={{ borderColor: '#E6D5F0' }}
                  placeholder="Enter product description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              {/* Tags */}
              <div>
                <label 
                  className="block text-sm mb-2"
                  style={{ color: '#4A1942' }}
                >
                  Tags
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:border-current transition-colors"
                  style={{ borderColor: '#E6D5F0' }}
                  placeholder="luxury, diamond, gold"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate tags with commas
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="px-6 py-2 border rounded-lg transition-colors hover:bg-gray-50"
            style={{ borderColor: '#E6D5F0', color: '#4A1942' }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 text-white rounded-lg transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: '#4A1942' }}
          >
            {submitting ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
