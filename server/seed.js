import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './models/User.js';
import Product from './models/Product.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    // Create admin user
    const adminUser = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@bejeweled.com',
      password: 'admin123',
      role: 'admin',
    });

    // Create sample customer
    await User.create({
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@example.com',
      password: 'password123',
      role: 'customer',
    });

    // Create products
    const products = [
      {
        name: 'Diamond Solitaire Ring',
        description:
          'This exquisite diamond solitaire ring features a brilliant-cut diamond set in premium gold. The timeless design showcases the diamond\'s natural beauty with a classic four-prong setting. Handcrafted by master artisans, each piece is a testament to exceptional quality and elegant simplicity.',
        price: 2499,
        category: 'Rings',
        images: [
          'https://images.unsplash.com/photo-1742240439165-60790db1ee93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwcmluZyUyMGx1eHVyeXxlbnwxfHx8fDE3NzI1MzU1NTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
          'https://images.unsplash.com/photo-1748023593753-4949fdc19045?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwcmluZyUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNzcyNTk2OTAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
          'https://images.unsplash.com/photo-1763120476143-3d8278fb3db3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaW5nJTIwZGV0YWlsJTIwbWFjcm98ZW58MXx8fHwxNzcyNjA0NTA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
          'https://images.unsplash.com/photo-1677316732918-e1acafda522c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByaW5nJTIwc2lkZXxlbnwxfHx8fDE3NzI2MDQ1MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        sizes: ['5', '6', '7', '8', '9'],
        colors: ['White Gold', 'Yellow Gold', 'Rose Gold'],
        stock: 15,
        sku: 'PRD-001',
        tags: ['diamond', 'ring', 'luxury', 'solitaire'],
        rating: 5,
        reviewCount: 3,
        specifications: [
          { label: 'Metal', value: '14K Gold' },
          { label: 'Diamond Weight', value: '1.0 Carat' },
          { label: 'Diamond Cut', value: 'Brilliant Round' },
          { label: 'Diamond Clarity', value: 'VS1' },
          { label: 'Diamond Color', value: 'G' },
          { label: 'Setting Style', value: 'Solitaire Prong' },
        ],
      },
      {
        name: 'Gold Layered Necklace',
        description:
          'An elegantly layered gold necklace that adds sophisticated charm to any outfit. Features three delicate chains of varying lengths, each adorned with subtle gold accents.',
        price: 1899,
        category: 'Necklaces',
        images: [
          'https://images.unsplash.com/photo-1755151606128-7ca2f97e46ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwbmVja2xhY2UlMjBlbGVnYW50fGVufDF8fHx8MTc3MjU5MTI5OHww&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        sizes: ['Standard'],
        colors: ['Yellow Gold', 'Rose Gold'],
        stock: 20,
        sku: 'PRD-002',
        tags: ['gold', 'necklace', 'layered', 'elegant'],
        rating: 5,
        reviewCount: 0,
        specifications: [
          { label: 'Metal', value: '18K Gold' },
          { label: 'Chain Length', value: '16-20 inches' },
          { label: 'Weight', value: '8.5g' },
        ],
      },
      {
        name: 'Pearl Drop Earrings',
        description:
          'Classic pearl drop earrings featuring lustrous freshwater pearls set in polished gold. These timeless earrings add elegance to both casual and formal attire.',
        price: 899,
        category: 'Earrings',
        images: [
          'https://images.unsplash.com/photo-1767210338407-54b9264c326b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFybCUyMGVhcnJpbmdzJTIwbHV4dXJ5fGVufDF8fHx8MTc3MjU3NzI3OHww&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        sizes: ['Standard'],
        colors: ['White Gold', 'Yellow Gold'],
        stock: 30,
        sku: 'PRD-003',
        tags: ['pearl', 'earrings', 'drop', 'classic'],
        rating: 5,
        reviewCount: 0,
        specifications: [
          { label: 'Metal', value: '14K Gold' },
          { label: 'Pearl Type', value: 'Freshwater' },
          { label: 'Pearl Size', value: '8-9mm' },
        ],
      },
      {
        name: 'Rose Gold Bracelet',
        description:
          'A stunning rose gold bracelet with a delicate chain link design. Features a secure clasp and adjustable length for the perfect fit.',
        price: 1299,
        category: 'Bracelets',
        images: [
          'https://images.unsplash.com/photo-1629587424599-ee8806a66127?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBicmFjZWxldCUyMGdvbGR8ZW58MXx8fHwxNzcyNTc5MjA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        sizes: ['Small', 'Medium', 'Large'],
        colors: ['Rose Gold'],
        stock: 18,
        sku: 'PRD-004',
        tags: ['bracelet', 'rose gold', 'luxury'],
        rating: 5,
        reviewCount: 0,
        specifications: [
          { label: 'Metal', value: '14K Rose Gold' },
          { label: 'Length', value: '6.5-7.5 inches' },
          { label: 'Width', value: '3mm' },
        ],
      },
      {
        name: 'Luxury Gold Ring',
        description:
          'A luxurious gold ring featuring an intricate design with exceptional craftsmanship. The perfect statement piece for special occasions.',
        price: 3299,
        category: 'Rings',
        images: [
          'https://images.unsplash.com/photo-1758995116142-c626a962a682?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByaW5nJTIwZ29sZHxlbnwxfHx8fDE3NzI2MDQzNjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        sizes: ['5', '6', '7', '8', '9'],
        colors: ['Yellow Gold', 'White Gold'],
        stock: 10,
        sku: 'PRD-005',
        tags: ['ring', 'gold', 'luxury', 'statement'],
        rating: 5,
        reviewCount: 0,
        specifications: [
          { label: 'Metal', value: '18K Gold' },
          { label: 'Weight', value: '6.2g' },
        ],
      },
      {
        name: 'Elegant Pendant Necklace',
        description:
          'A stunning pendant necklace with an elegant design. Features a beautifully cut gemstone suspended from a delicate gold chain.',
        price: 1599,
        category: 'Necklaces',
        images: [
          'https://images.unsplash.com/photo-1763256614647-14abbc578252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcGVuZGFudCUyMG5lY2tsYWNlfGVufDF8fHx8MTc3MjYwNDM2NXww&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        sizes: ['Standard'],
        colors: ['Yellow Gold', 'White Gold'],
        stock: 22,
        sku: 'PRD-006',
        tags: ['pendant', 'necklace', 'elegant'],
        rating: 4,
        reviewCount: 0,
        specifications: [
          { label: 'Metal', value: '14K Gold' },
          { label: 'Chain Length', value: '18 inches' },
        ],
      },
      {
        name: 'Luxury Timepiece',
        description:
          'An exquisite luxury watch combining precise Swiss movement with stunning jeweled design. The perfect blend of functionality and artistry.',
        price: 4999,
        category: 'Watches',
        images: [
          'https://images.unsplash.com/photo-1723328254549-24bb3deb4a83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMGpld2Vscnl8ZW58MXx8fHwxNzcyNTM1NTU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        sizes: ['Standard'],
        colors: ['Silver', 'Gold'],
        stock: 8,
        sku: 'PRD-007',
        tags: ['watch', 'luxury', 'timepiece'],
        rating: 5,
        reviewCount: 0,
        specifications: [
          { label: 'Movement', value: 'Swiss Automatic' },
          { label: 'Case Size', value: '38mm' },
          { label: 'Water Resistance', value: '50m' },
        ],
      },
      {
        name: 'Diamond Tennis Bracelet',
        description:
          'A classic diamond tennis bracelet featuring a continuous line of individually set diamonds. Each stone is carefully matched for maximum brilliance.',
        price: 2799,
        category: 'Bracelets',
        images: [
          'https://images.unsplash.com/photo-1763029513623-37d488cb97b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwYnJhY2VsZXQlMjBlbGVnYW50fGVufDF8fHx8MTc3MjYwNDM2NXww&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        sizes: ['Small', 'Medium', 'Large'],
        colors: ['White Gold', 'Yellow Gold'],
        stock: 12,
        sku: 'PRD-008',
        tags: ['diamond', 'bracelet', 'tennis', 'luxury'],
        rating: 5,
        reviewCount: 0,
        specifications: [
          { label: 'Metal', value: '14K White Gold' },
          { label: 'Total Diamond Weight', value: '3.0 Carats' },
          { label: 'Diamond Count', value: '45 stones' },
        ],
      },
      {
        name: 'Vintage Brooch',
        description:
          'A vintage-inspired brooch with intricate detailing and sparkling gemstones. A versatile accessory that can be worn on jackets, scarves, or hats.',
        price: 799,
        category: 'Brooches',
        images: [
          'https://images.unsplash.com/photo-1764333327393-3faa32b091a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBicm9vY2glMjBqZXdlbHJ5fGVufDF8fHx8MTc3MjYwNDM2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        sizes: ['Standard'],
        colors: ['Gold', 'Silver'],
        stock: 25,
        sku: 'PRD-009',
        tags: ['brooch', 'vintage', 'gemstone'],
        rating: 4,
        reviewCount: 0,
        specifications: [
          { label: 'Metal', value: 'Gold Plated Sterling Silver' },
          { label: 'Stones', value: 'CZ & Semi-precious' },
          { label: 'Dimensions', value: '2.5 x 3 inches' },
        ],
      },
    ];

    await Product.insertMany(products);

    console.log('Data seeded successfully!');
    console.log(`Admin: admin@bejeweled.com / admin123`);
    console.log(`Customer: sarah@example.com / password123`);
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
