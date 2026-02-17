
import { Product } from './types';

export const CATEGORIES = [
  "All", "New Arrivals", "Dresses", "Tops", "Bottoms", "Outerwear", "Shoes", "Accessories"
];

export const CURRENCY = "Rs.";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Elegant Summer Floral Dress',
    price: 7500.00,
    originalPrice: 12500.00,
    description: 'A breathable, stylish floral dress perfect for summer outings. Made with premium silk-blend fabric.',
    image: 'https://images.unsplash.com/photo-1572804013307-f9615c1272a6?q=80&w=600&auto=format&fit=crop',
    category: 'Dresses',
    rating: 4.8,
    reviews: 1250,
    sold: 5000,
    stock: 100,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Pink', 'Blue', 'White']
  },
  {
    id: '2',
    name: 'Classic Urban Denim Jacket',
    price: 11900.00,
    originalPrice: 24000.00,
    description: 'A timeless denim jacket that goes with everything. Durable and comfortably fitted.',
    image: 'https://images.unsplash.com/photo-1527010159945-6627dddf33e9?q=80&w=600&auto=format&fit=crop',
    category: 'Outerwear',
    rating: 4.6,
    reviews: 840,
    sold: 2100,
    stock: 50,
    sizes: ['M', 'L', 'XL'],
    colors: ['Classic Blue', 'Black']
  },
  {
    id: '3',
    name: 'Breathable Cotton T-Shirt Pack',
    price: 4500.50,
    originalPrice: 7500.00,
    description: 'Set of 3 high-quality basic t-shirts. 100% organic cotton for ultimate comfort.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop',
    category: 'Tops',
    rating: 4.9,
    reviews: 3200,
    sold: 12000,
    stock: 500,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Mixed Pack']
  },
  {
    id: '4',
    name: 'Modern Slim-Fit Chinos',
    price: 8900.00,
    originalPrice: 16500.00,
    description: 'Versatile chinos for work and play. Tapered fit with a slight stretch for comfort.',
    image: 'https://images.unsplash.com/photo-1473966968600-fa804b868630?q=80&w=600&auto=format&fit=crop',
    category: 'Bottoms',
    rating: 4.5,
    reviews: 610,
    sold: 1500,
    stock: 80,
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Khaki', 'Navy', 'Olive']
  },
  {
    id: '5',
    name: 'Aero-Max Sport Sneakers',
    price: 14999.00,
    originalPrice: 36000.00,
    description: 'Lightweight performance running shoes with breathable mesh and cushioned sole.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
    category: 'Shoes',
    rating: 4.7,
    reviews: 430,
    sold: 800,
    stock: 30,
    sizes: ['8', '9', '10', '11', '12'],
    colors: ['Red', 'Black', 'Blue']
  }
];
