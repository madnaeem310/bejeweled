import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      enum: ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Watches', 'Brooches'],
    },
    images: [{ type: String }],
    sizes: [{ type: String }],
    colors: [{ type: String }],
    stock: { type: Number, required: true, default: 0, min: 0 },
    sku: { type: String, trim: true },
    tags: [{ type: String }],
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    reviews: [reviewSchema],
    specifications: [
      {
        label: { type: String },
        value: { type: String },
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

productSchema.index({ name: 'text', description: 'text', tags: 'text' });

const Product = mongoose.model('Product', productSchema);
export default Product;
