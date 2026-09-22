/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoriesSection } from './components/CategoriesSection';
import { SpecialOffers } from './components/SpecialOffers';
import { ProductsSection } from './components/ProductsSection';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutSection } from './components/AboutSection';
import { CustomerReviews } from './components/CustomerReviews';
import { NewsletterSection } from './components/NewsletterSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { UserAccountModal } from './components/UserAccountModal';
import { GoogleAuthModal } from './components/GoogleAuthModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { TechZoneAiModal } from './components/TechZoneAiModal';
import { TechZoneAiFloatingTrigger } from './components/TechZoneAiFloatingTrigger';
import { TopCountryBar } from './components/TopCountryBar';
import { CountryLanguageModal } from './components/CountryLanguageModal';
import { LanguageProvider } from './context/LanguageContext';

import { Product, ProductCategory, CartItem, ToastMessage, UserProfile } from './types';
import { PRODUCTS_DATA } from './data/mockData';

export default function App() {
  // Products catalog (persisted so admin additions and price edits survive refresh)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('techzone_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return PRODUCTS_DATA;
  });

  // Authenticated User (supports Google Registration & Login)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('techzone_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'register' | 'login'>('register');

  // Cart state - initialized with 1 item so users can see active counter right away
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('techzone_cart');
      if (savedCart) {
        return JSON.parse(savedCart);
      }
    } catch {
      // fallback
    }
    // Default initial cart item: SonicPro ANC Wireless Headphones
    const defaultProduct = PRODUCTS_DATA.find((p) => p.id === 'prod-4') || PRODUCTS_DATA[0];
    return [{ product: defaultProduct, quantity: 1, selectedColor: 'Midnight Blue' }];
  });

  // Navigation & View states
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);

  // Discount & Coupon
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [couponCode, setCouponCode] = useState<string>('');

  // Notification Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist products catalog
  useEffect(() => {
    try {
      localStorage.setItem('techzone_products', JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('techzone_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Persist current user
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('techzone_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('techzone_user');
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  const handleOpenAuth = (mode: 'register' | 'login' = 'register') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    if (user.provider === 'google') {
      addToast(
        'success',
        'Google Registration Complete',
        `Welcome, ${user.name}! Your Google account has been connected with +500 VIP points.`
      );
    } else {
      addToast('success', 'Account Created', `Welcome to TechZone, ${user.name}!`);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAccountOpen(false);
    addToast('info', 'Signed Out', 'You have successfully signed out of TechZone.');
  };

  const addToast = (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type,
      title,
      message,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Product Catalog CRUD Handlers (Sole Administrator)
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    // Also remove from cart if present
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleResetProducts = () => {
    setProducts(PRODUCTS_DATA);
    try {
      localStorage.setItem('techzone_products', JSON.stringify(PRODUCTS_DATA));
    } catch {
      // ignore
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number = 1, selectedColor?: string) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevItems, { product, quantity, selectedColor }];
      }
    });

    addToast(
      'success',
      'Added to Cart',
      `${quantity}x ${product.name} added to cart.`
    );
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('info', 'Item Removed', 'Product was removed from your cart.');
  };

  const handleClearCart = () => {
    setCartItems([]);
    addToast('info', 'Cart Cleared', 'All items have been removed from your cart.');
  };

  const handleApplyCoupon = (code: string): boolean => {
    const upper = code.trim().toUpperCase();
    if (upper === 'NEON50') {
      setDiscountPercentage(50);
      setCouponCode('NEON50');
      addToast('success', 'Neon Coupon Applied', '50% discount applied to your order!');
      return true;
    }
    if (upper === 'TECH20') {
      setDiscountPercentage(20);
      setCouponCode('TECH20');
      addToast('success', 'Coupon Applied', '20% discount applied to your order!');
      return true;
    }
    return false;
  };

  // Checkout handling
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (orderId: string) => {
    setCartItems([]);
    addToast(
      'success',
      'Order Confirmed!',
      `Order #${orderId} was authorized successfully. Dispatched for express delivery.`
    );
  };

  // Navigation smoothly scroll to target ID
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Categories list extraction
  const categoriesList = useMemo(() => {
    return Array.from(new Set(PRODUCTS_DATA.map((p) => p.category)));
  }, []);

  // Total cart badge count
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Deal product for discount banner
  const dealProduct = products.find((p) => p.id === 'prod-3') || products[2];

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans selection:bg-[#00FF66] selection:text-black">
        {/* Unified Top Sticky Header: Top Country & All Languages Bar + Main Navigation */}
        <header className="sticky top-0 z-40 w-full shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
          <TopCountryBar
            onOpenAdmin={() => setIsAdminOpen(true)}
            onOpenAuth={handleOpenAuth}
            currentUser={currentUser}
          />

          {/* Header / Navbar */}
          <Navbar
            cartCount={cartItemCount}
            onOpenCart={() => setIsCartOpen(true)}
            activeSection={activeSection}
            onNavigate={handleNavigate}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              handleNavigate('products');
            }}
            onOpenAccount={() => setIsAccountOpen(true)}
            currentUser={currentUser}
            onOpenAuth={handleOpenAuth}
            onOpenAdmin={() => setIsAdminOpen(true)}
            onOpenAi={() => setIsAiModalOpen(true)}
          />
        </header>

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onShopNow={() => handleNavigate('products')}
          onViewProducts={() => handleNavigate('products')}
          products={products}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          onOpenAi={() => setIsAiModalOpen(true)}
        />

        {/* Categories Section */}
        <CategoriesSection
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => {
            setSelectedCategory(category);
            handleNavigate('products');
          }}
        />

        {/* Special Deals Banner (Up to 50% OFF) */}
        <SpecialOffers
          dealProduct={dealProduct}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />

        {/* Popular Products & Catalog Grid */}
        <ProductsSection
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          onSelectProduct={(p) => setSelectedProduct(p)}
          categoriesList={categoriesList}
        />

        {/* Why Choose TechZone? 4 Core Pillars */}
        <WhyChooseUs />

        {/* About TechZone & Luka Tavadze (Founder Story & Production Standards) */}
        <AboutSection 
          onNavigate={handleNavigate} 
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Customer Reviews & Ratings */}
        <CustomerReviews />

        {/* Newsletter Section */}
        <NewsletterSection />

        {/* Contact Section */}
        <ContactSection
          onSuccessToast={(title, msg) => addToast('success', title, msg)}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAi={() => setIsAiModalOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenAuth={handleOpenAuth}
      />

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product, qty, color) => {
          handleAddToCart(product, qty, color);
        }}
      />

      {/* Slide-out Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onCheckout={handleProceedToCheckout}
        discountPercentage={discountPercentage}
        onApplyCoupon={handleApplyCoupon}
        couponCode={couponCode}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        discountPercentage={discountPercentage}
        onOrderSuccess={handleOrderSuccess}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
      />

      {/* User Account Modal */}
      <UserAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAuth={handleOpenAuth}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Google Registration & Authentication Modal */}
      <GoogleAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        initialMode={authModalMode}
      />

      {/* Sole Administrator Control Panel Modal */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onResetProducts={handleResetProducts}
        currentUser={currentUser}
        onSetCurrentUser={setCurrentUser}
        onShowToast={addToast}
      />

      {/* TECHZONE AI System Assistant Modal */}
      <TechZoneAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenAuth={handleOpenAuth}
      />

      {/* Persistent Floating AI Cyber Assistant Trigger */}
      <TechZoneAiFloatingTrigger
        isOpen={isAiModalOpen}
        onClick={() => setIsAiModalOpen(true)}
      />

      {/* Country, Currency & Language Modal */}
      <CountryLanguageModal />

      {/* Toast Notification Container */}
      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  </LanguageProvider>
  );
}
