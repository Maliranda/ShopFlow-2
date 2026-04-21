// src/data/mockData.ts
// Static mock data for categories and products.

import { Category, Product } from '../types';

export const CATEGORIES: Category[] = [
  { id: 'shoes',       name: 'Shoes',       emoji: '👟', productCount: 4, color: '#E6F1FB' },
  { id: 'apparel',     name: 'Apparel',     emoji: '👕', productCount: 4, color: '#E1F5EE' },
  { id: 'electronics', name: 'Electronics', emoji: '🎧', productCount: 4, color: '#FAEEDA' },
  { id: 'accessories', name: 'Accessories', emoji: '⌚', productCount: 4, color: '#FAECE7' },
  { id: 'sports',      name: 'Sports',      emoji: '🏃', productCount: 4, color: '#EEEDFE' },
];

export const PRODUCTS: Product[] = [
  // Shoes
  {
    id: 'shoes-1', categoryId: 'shoes', name: 'Air Runner Pro',
    price: 129.99, rating: 4.7, reviewCount: 312,
    emoji: '👟', tags: ['Running', 'Comfort'],
    description: 'Lightweight daily trainers with responsive foam midsole. Perfect for runs up to 15km.',
  },
  {
    id: 'shoes-2', categoryId: 'shoes', name: 'Canvas Classic',
    price: 64.99, rating: 4.5, reviewCount: 891,
    emoji: '👞', tags: ['Casual', 'Classic'],
    description: 'The timeless canvas sneaker. Goes with everything, lasts for years.',
  },
  {
    id: 'shoes-3', categoryId: 'shoes', name: 'Trail Blazer X',
    price: 149.99, rating: 4.8, reviewCount: 204,
    emoji: '🥾', tags: ['Hiking', 'Waterproof'],
    description: 'Waterproof leather upper with aggressive grip outsole for technical trails.',
  },
  {
    id: 'shoes-4', categoryId: 'shoes', name: 'City Slip-On',
    price: 79.99, rating: 4.3, reviewCount: 567,
    emoji: '🪄', tags: ['Casual', 'Easy'],
    description: 'Elastic gore panels for an effortless on/off. Memory foam insole included.',
  },

  // Apparel
  {
    id: 'apparel-1', categoryId: 'apparel', name: 'Essential Tee',
    price: 29.99, rating: 4.6, reviewCount: 1203,
    emoji: '👕', tags: ['Cotton', 'Everyday'],
    description: '100% ring-spun cotton. Pre-shrunk. Available in 12 colors.',
  },
  {
    id: 'apparel-2', categoryId: 'apparel', name: 'Fleece Hoodie',
    price: 74.99, rating: 4.8, reviewCount: 678,
    emoji: '🧥', tags: ['Warm', 'Cozy'],
    description: '300g fleece with kangaroo pocket and adjustable drawstring hood.',
  },
  {
    id: 'apparel-3', categoryId: 'apparel', name: 'Slim Chinos',
    price: 59.99, rating: 4.4, reviewCount: 445,
    emoji: '👖', tags: ['Smart-casual', 'Stretch'],
    description: '2% elastane blend for comfort without losing shape. Machine washable.',
  },
  {
    id: 'apparel-4', categoryId: 'apparel', name: 'Puffer Vest',
    price: 89.99, rating: 4.5, reviewCount: 289,
    emoji: '🦺', tags: ['Outdoor', 'Layering'],
    description: 'Recycled fill insulation with wind-resistant outer shell.',
  },

  // Electronics
  {
    id: 'elec-1', categoryId: 'electronics', name: 'BassWave ANC Headphones',
    price: 199.99, rating: 4.9, reviewCount: 2341,
    emoji: '🎧', tags: ['ANC', 'Wireless', 'Hi-Fi'],
    description: 'Active noise cancellation with 30-hour battery. Studio-grade sound.',
  },
  {
    id: 'elec-2', categoryId: 'electronics', name: 'SmartCharge 65W GaN',
    price: 49.99, rating: 4.7, reviewCount: 876,
    emoji: '🔌', tags: ['Fast Charge', 'Compact'],
    description: 'GaN technology in a pocket-sized package. Charges 3 devices simultaneously.',
  },
  {
    id: 'elec-3', categoryId: 'electronics', name: 'Wireless Earbuds Pro',
    price: 149.99, rating: 4.6, reviewCount: 1540,
    emoji: '🎵', tags: ['TWS', 'IPX5'],
    description: 'IPX5 water-resistant with 8-hour playback and 32-hour charging case.',
  },
  {
    id: 'elec-4', categoryId: 'electronics', name: 'Mechanical Keyboard',
    price: 119.99, rating: 4.8, reviewCount: 987,
    emoji: '⌨️', tags: ['RGB', 'Tactile'],
    description: 'Tactile brown switches, per-key RGB, aluminium frame. Wired and wireless.',
  },

  // Accessories
  {
    id: 'acc-1', categoryId: 'accessories', name: 'Minimalist Watch',
    price: 159.99, rating: 4.7, reviewCount: 432,
    emoji: '⌚', tags: ['Leather', 'Quartz'],
    description: 'Swiss quartz movement with genuine leather strap. 5ATM water resistance.',
  },
  {
    id: 'acc-2', categoryId: 'accessories', name: 'Canvas Backpack 25L',
    price: 94.99, rating: 4.5, reviewCount: 721,
    emoji: '🎒', tags: ['Laptop Sleeve', 'Durable'],
    description: 'Waxed canvas exterior with padded 15" laptop compartment.',
  },
  {
    id: 'acc-3', categoryId: 'accessories', name: 'Leather Card Wallet',
    price: 39.99, rating: 4.6, reviewCount: 1089,
    emoji: '👛', tags: ['Slim', 'RFID'],
    description: 'RFID-blocking full-grain leather. Holds 6 cards + cash. Gets better with age.',
  },
  {
    id: 'acc-4', categoryId: 'accessories', name: 'Polarised Sunglasses',
    price: 79.99, rating: 4.4, reviewCount: 356,
    emoji: '🕶️', tags: ['UV400', 'Polarised'],
    description: 'TAC polarised lenses with UV400 protection. TR90 flexible frame.',
  },

  // Sports
  {
    id: 'sport-1', categoryId: 'sports', name: 'Resistance Band Set',
    price: 29.99, rating: 4.7, reviewCount: 2108,
    emoji: '🏋️', tags: ['Home Gym', '5 Levels'],
    description: 'Set of 5 latex bands from 10–40 lbs. Includes carry bag and guide.',
  },
  {
    id: 'sport-2', categoryId: 'sports', name: 'Yoga Mat Pro 6mm',
    price: 44.99, rating: 4.8, reviewCount: 1543,
    emoji: '🧘', tags: ['Non-slip', 'Extra Wide'],
    description: 'Natural tree rubber with printed alignment lines. 183×68cm.',
  },
  {
    id: 'sport-3', categoryId: 'sports', name: 'Foam Roller Deep',
    price: 34.99, rating: 4.5, reviewCount: 876,
    emoji: '🔵', tags: ['Recovery', 'Firm'],
    description: 'High-density EVA foam with ridged texture for trigger-point release.',
  },
  {
    id: 'sport-4', categoryId: 'sports', name: 'Running Belt',
    price: 24.99, rating: 4.3, reviewCount: 634,
    emoji: '🏃', tags: ['Water Resistant', 'Bounce-free'],
    description: 'Stretch neoprene with phone pocket and two zip pouches. One size fits all.',
  },
];

/** Returns all products for a given categoryId */
export function getProductsByCategory(categoryId: string): Product[] {
  return PRODUCTS.filter((p) => p.categoryId === categoryId);
}

/** Returns a single product by id */
export function getProductById(productId: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === productId);
}
