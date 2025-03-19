import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

// Sample product data for commercial appliances
const products = [
  {
    name: 'Premium Glass Display Counter - Curved',
    description: 'Modern curved glass display counter with LED lighting, perfect for bakeries, cafes, and retail stores. Features temperature control and elegant design.',
    price: 1299.99,
    imageUrl: 'https://images.unsplash.com/photo-1581365411503-54cc8db9a4d1?q=80&w=800&auto=format&fit=crop',
    category: 'Display',
    featured: true,
    specifications: {
      dimensions: '150 x 80 x 120 cm',
      weight: '90 kg',
      powerConsumption: '220V, 350W',
      capacity: '0.6 cubic meters',
      warranty: '2 years',
      material: 'Tempered glass and stainless steel'
    },
    tags: ['Display Counter', 'Glass Counter', 'LED', 'Bakery Equipment']
  },
  {
    name: 'Straight Glass Display Cabinet',
    description: 'Straight glass display cabinet with adjustable shelves, ideal for displaying pastries, cakes, and other food items with style.',
    price: 999.99,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop',
    category: 'Display',
    featured: false,
    specifications: {
      dimensions: '120 x 60 x 120 cm',
      weight: '75 kg',
      powerConsumption: '220V, 300W',
      capacity: '0.4 cubic meters',
      warranty: '2 years',
      material: 'Tempered glass and stainless steel'
    },
    tags: ['Display Counter', 'Glass Cabinet', 'Refrigerated Display']
  },
  {
    name: 'Commercial Coffee Machine - Pro Series',
    description: 'High-capacity professional coffee machine with built-in bean grinder, milk steamer, and multiple brewing options. Perfect for cafes and restaurants.',
    price: 2499.99,
    imageUrl: 'https://images.unsplash.com/photo-1516224398969-17022f9a955e?q=80&w=800&auto=format&fit=crop',
    category: 'Beverage',
    featured: true,
    specifications: {
      dimensions: '80 x 60 x 70 cm',
      weight: '35 kg',
      powerConsumption: '220V, 2200W',
      capacity: 'Up to 200 cups per day',
      warranty: '3 years',
      material: 'Stainless steel and ABS plastic'
    },
    tags: ['Coffee Machine', 'Espresso Maker', 'Commercial Coffee', 'Barista']
  },
  {
    name: 'Water Cooler & Dispenser - Office Pro',
    description: 'Modern water cooler and dispenser with hot and cold settings, suitable for offices, waiting rooms, and commercial spaces.',
    price: 599.99,
    imageUrl: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?q=80&w=800&auto=format&fit=crop',
    category: 'Beverage',
    featured: false,
    specifications: {
      dimensions: '40 x 40 x 110 cm',
      weight: '22 kg',
      powerConsumption: '220V, 550W',
      capacity: '20-liter bottle compatible',
      warranty: '1 year',
      material: 'ABS plastic and stainless steel'
    },
    tags: ['Water Cooler', 'Dispenser', 'Office Equipment']
  },
  {
    name: 'Commercial Food Warmer - Buffet Master',
    description: 'Professional food warmer with multiple compartments and temperature control, ideal for buffets, restaurants, and catering services.',
    price: 849.99,
    imageUrl: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=800&auto=format&fit=crop',
    category: 'Warming',
    featured: false,
    specifications: {
      dimensions: '140 x 60 x 40 cm',
      weight: '28 kg',
      powerConsumption: '220V, 1500W',
      capacity: '4 sections, 8L each',
      warranty: '1 year',
      material: 'Stainless steel'
    },
    tags: ['Food Warmer', 'Buffet Equipment', 'Catering Supplies']
  },
  {
    name: 'Premium Ice Cream Machine - Gelato Pro',
    description: 'Commercial-grade ice cream machine for producing premium gelato, sorbet, and ice cream. Features multiple settings and fast freeze technology.',
    price: 3299.99,
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=800&auto=format&fit=crop',
    category: 'IceCream',
    featured: true,
    specifications: {
      dimensions: '60 x 70 x 140 cm',
      weight: '95 kg',
      powerConsumption: '220V, 2800W',
      capacity: 'Up to 20L per hour',
      warranty: '2 years',
      material: 'Stainless steel'
    },
    tags: ['Ice Cream Machine', 'Gelato Maker', 'Frozen Dessert', 'Commercial']
  },
  {
    name: 'Visi Cooler - Retail Display',
    description: 'Transparent display refrigerator for beverages and packaged foods, ideal for retail stores, supermarkets, and convenience shops.',
    price: 1199.99,
    imageUrl: 'https://images.unsplash.com/photo-1553830591-2f39e38a013c?q=80&w=800&auto=format&fit=crop',
    category: 'Refrigeration',
    featured: false,
    specifications: {
      dimensions: '70 x 65 x 190 cm',
      weight: '85 kg',
      powerConsumption: '220V, 380W',
      capacity: '350 liters',
      warranty: '2 years',
      material: 'Glass and steel'
    },
    tags: ['Visi Cooler', 'Beverage Display', 'Refrigeration', 'Retail Equipment']
  },
  {
    name: 'Industrial Deep Freezer - Cold Storage',
    description: 'High-capacity commercial deep freezer with energy-efficient operation, ideal for restaurants, hotels, and food businesses requiring bulk storage.',
    price: 1899.99,
    imageUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=800&auto=format&fit=crop',
    category: 'Refrigeration',
    featured: true,
    specifications: {
      dimensions: '120 x 70 x 85 cm',
      weight: '110 kg',
      powerConsumption: '220V, 420W',
      capacity: '450 liters',
      warranty: '3 years',
      material: 'Stainless steel'
    },
    tags: ['Deep Freezer', 'Commercial Freezer', 'Cold Storage', 'Restaurant Equipment']
  },
  {
    name: 'Three Burner Cooking Range - Chef Pro',
    description: 'Professional three burner cooking range with high-efficiency burners and precise temperature control, suitable for commercial kitchens and restaurants.',
    price: 1499.99,
    imageUrl: 'https://images.unsplash.com/photo-1556911220-bda906717210?q=80&w=800&auto=format&fit=crop',
    category: 'Cooking',
    featured: false,
    specifications: {
      dimensions: '120 x 70 x 85 cm',
      weight: '65 kg',
      powerConsumption: 'Gas operated',
      capacity: '3 burners',
      warranty: '2 years',
      material: 'Stainless steel'
    },
    tags: ['Cooking Range', 'Commercial Stove', 'Kitchen Equipment', 'Restaurant Supplies']
  },
  {
    name: 'Hot Display Case - Deluxe',
    description: 'Hot display case for maintaining optimal food temperature while showcasing prepared dishes, ideal for cafeterias, delis, and food courts.',
    price: 1299.99,
    imageUrl: 'https://images.unsplash.com/photo-1621241441637-ea2d3f59db26?q=80&w=800&auto=format&fit=crop',
    category: 'Warming',
    featured: false,
    specifications: {
      dimensions: '110 x 60 x 70 cm',
      weight: '50 kg',
      powerConsumption: '220V, 1800W',
      capacity: '3 shelves',
      warranty: '1 year',
      material: 'Stainless steel and tempered glass'
    },
    tags: ['Hot Case', 'Food Display', 'Warming Equipment', 'Commercial Kitchen']
  }
];

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('MongoDB connected for seeding data');
    
    try {
      // Clear existing products
      await Product.deleteMany({});
      console.log('Previous products deleted');
      
      // Insert new products
      await Product.insertMany(products);
      console.log(`${products.length} products seeded successfully`);
      
      mongoose.disconnect();
      console.log('MongoDB disconnected');
    } catch (error) {
      console.error('Error seeding data:', error);
      mongoose.disconnect();
    }
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// To run this script: node seedData.js 