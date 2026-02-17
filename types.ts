
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  sold: number;
  stock: number;
  sizes: string[];
  colors: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  paymentMethod: 'cod' | 'card';
}

export enum AppView {
  Home = 'home',
  ProductDetail = 'product-detail',
  Admin = 'admin',
  Cart = 'cart',
  Checkout = 'checkout'
}
