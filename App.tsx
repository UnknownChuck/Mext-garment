
import React, { useState, useEffect } from 'react';
import { Product, CartItem, Order, AppView } from './types';
import { MOCK_PRODUCTS, CATEGORIES, CURRENCY } from './constants';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import Checkout from './components/Checkout';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.Home);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Admin Authentication
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUsername, setAdminUsername] = useState('admin');
  const [adminPassword, setAdminPassword] = useState('admin');
  const [adminLoginError, setAdminLoginError] = useState('');

  // Navigation handlers
  const navigateToHome = () => {
    setView(AppView.Home);
    setSelectedProduct(null);
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setView(AppView.ProductDetail);
    window.scrollTo(0, 0);
  };

  const navigateToAdmin = () => {
    setView(AppView.Admin);
    setAdminLoginError('');
  };

  const navigateToCheckout = () => {
    setView(AppView.Checkout);
    window.scrollTo(0, 0);
  };

  const handleAdminLogin = (username: string, pass: string) => {
    if (username === adminUsername && pass === adminPassword) {
      setIsAdminAuthenticated(true);
      setAdminLoginError('');
    } else {
      setAdminLoginError('Invalid administrator credentials.');
    }
  };

  const updateCredentials = (u: string, p: string) => {
    setAdminUsername(u);
    setAdminPassword(p);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    navigateToHome();
  };

  // Cart logic
  const addToCart = (product: Product, quantity: number, size?: string, color?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color);
      if (existing) {
        return prev.map(item => 
          (item.product.id === product.id && item.selectedSize === size && item.selectedColor === color)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedSize: size, selectedColor: color }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const placeOrder = (details: { name: string, phone: string, address: string, method: 'cod' | 'card' }) => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 6).toUpperCase(),
      items: [...cart],
      total: cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0),
      status: 'pending',
      date: new Date().toISOString(),
      customerName: details.name,
      phoneNumber: details.phone,
      address: details.address,
      paymentMethod: details.method
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    alert("Order Placed Successfully via Cash on Delivery!");
    navigateToHome();
  };

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onHomeClick={navigateToHome}
        onAdminClick={navigateToAdmin}
      />

      <main className="flex-grow">
        {view === AppView.Home && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Hero Promo */}
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-8 mb-8 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl overflow-hidden relative">
              <div className="z-10 mb-6 md:mb-0">
                <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-block mb-4">Islandwide Delivery</div>
                <h1 className="text-4xl md:text-5xl font-black mb-4 italic tracking-tight text-shadow">Mext Mega Sale</h1>
                <p className="text-xl opacity-90 mb-8 max-w-md italic">Save big on your favorite styles. Limited stock available!</p>
                <button className="bg-white text-orange-600 px-10 py-4 rounded-2xl font-black hover:bg-orange-50 transition-all shadow-xl active:scale-95 uppercase tracking-widest text-xs">
                  Shop Collection
                </button>
              </div>
              <div className="hidden md:block z-10">
                <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=400" alt="Sale" className="rounded-3xl shadow-2xl rotate-6 h-72 object-cover border-4 border-white/30" />
              </div>
            </div>

            {/* Category Bar */}
            <div className="flex overflow-x-auto gap-3 mb-8 pb-2 hide-scrollbar">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-2xl whitespace-nowrap transition-all font-black uppercase text-[10px] tracking-widest border-2 ${
                    selectedCategory === cat 
                      ? 'bg-orange-600 text-white border-orange-600 shadow-xl' 
                      : 'bg-white text-gray-500 border-gray-100 hover:border-orange-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onClick={() => navigateToProduct(product)}
                />
              ))}
            </div>
          </div>
        )}

        {view === AppView.ProductDetail && selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onAddToCart={addToCart}
            onBack={navigateToHome}
          />
        )}

        {view === AppView.Checkout && (
          <Checkout 
            items={cart} 
            onBack={navigateToHome} 
            onPlaceOrder={placeOrder} 
          />
        )}

        {view === AppView.Admin && (
          !isAdminAuthenticated ? (
            <AdminLogin 
              onLogin={handleAdminLogin} 
              onCancel={navigateToHome}
              error={adminLoginError}
            />
          ) : (
            <AdminDashboard 
              products={products}
              onUpdateProducts={setProducts}
              orders={orders}
              onUpdateOrders={setOrders}
              onLogout={handleAdminLogout}
              adminUsername={adminUsername}
              onUpdateCredentials={updateCredentials}
            />
          )
        )}
      </main>

      <Footer onAdminClick={navigateToAdmin} />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
        onCheckout={navigateToCheckout}
      />

      <AIAssistant products={products} onNavigateToProduct={navigateToProduct} />
    </div>
  );
};

export default App;
