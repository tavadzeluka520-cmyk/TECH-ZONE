import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  ShoppingCart, 
  Menu, 
  X, 
  ChevronRight, 
  User, 
  ShieldCheck,
  Bot,
  Globe2
} from 'lucide-react';
import { ProductCategory, UserProfile, SOLE_ADMIN_EMAIL } from '../types';
import { GoogleIcon } from './GoogleAuthModal';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: ProductCategory | 'All') => void;
  onOpenAccount: () => void;
  currentUser: UserProfile | null;
  onOpenAuth: (mode?: 'register' | 'login') => void;
  onOpenAdmin: () => void;
  onOpenAi?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  activeSection,
  onNavigate,
  searchQuery,
  onSearchChange,
  onOpenAccount,
  currentUser,
  onOpenAuth,
  onOpenAdmin,
  onOpenAi,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const { currentLanguage, currentCountry, openCountryModal, t } = useLanguage();

  // Exact links requested by the user, now localized:
  const navLinks = [
    { label: t('home', 'Home'), id: 'hero' },
    { label: t('products', 'Products'), id: 'products' },
    { label: t('categories', 'Categories'), id: 'categories' },
    { label: t('deals', 'Deals'), id: 'special-offers' },
    { label: t('about', 'About'), id: 'about' },
    { label: t('contact', 'Contact'), id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="w-full backdrop-blur-md bg-black/95 border-b border-[#00FF66]/20 text-white transition-all duration-200">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* TechZone Logo: neon green and white */}
          <button 
            id="nav-brand-logo"
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
            aria-label="TechZone Home"
          >
            <div className="w-10 h-10 rounded-xl bg-black border border-[#00FF66]/50 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,102,0.35)] group-hover:shadow-[0_0_30px_rgba(0,255,102,0.6)] group-hover:scale-105 transition-all duration-200">
              <Zap className="w-5 h-5 text-[#00FF66] fill-[#00FF66]" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-black tracking-tight text-white font-mono">TECH</span>
                <span className="text-2xl font-black tracking-tight text-[#00FF66] font-mono neon-text-glow">ZONE</span>
                <span className="w-2 h-2 rounded-full bg-[#00FF66] shadow-[0_0_8px_#00FF66] animate-pulse ml-0.5" />
              </div>
              <p className="text-[10px] tracking-widest uppercase font-semibold text-zinc-400 -mt-1">
                Futuristic Electronics
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-150 cursor-pointer ${
                    isActive 
                      ? 'text-[#00FF66] bg-[#00FF66]/10 border border-[#00FF66]/40 shadow-[0_0_15px_rgba(0,255,102,0.2)]' 
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-900/80'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Search bar & Actions */}
          <div className="flex items-center gap-3">
            {/* Desktop Search Input */}
            <div className="hidden md:flex relative items-center w-64 xl:w-72">
              <Search className="w-4 h-4 absolute left-3 text-zinc-400 pointer-events-none" />
              <input
                id="header-search-input"
                type="text"
                placeholder={t('searchPlaceholder', 'Search laptops, phones, gear...')}
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (activeSection !== 'products') {
                    onNavigate('products');
                  }
                }}
                className="w-full bg-zinc-950 text-sm text-white placeholder-zinc-500 pl-9 pr-8 py-2 rounded-lg border border-[#00FF66]/25 focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] focus:shadow-[0_0_15px_rgba(0,255,102,0.25)] focus:outline-none transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 text-xs text-zinc-400 hover:text-white"
                  title="Clear search"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Mobile Search Button */}
            <button
              id="mobile-search-toggle"
              onClick={() => setShowSearchModal(!showSearchModal)}
              className="md:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-[#00FF66]/30 transition-colors"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* TECHZONE AI System Assistant Button */}
            {onOpenAi && (
              <button
                id="header-ai-system-btn"
                onClick={onOpenAi}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#00FF66]/50 bg-[#00FF66]/10 hover:bg-[#00FF66]/20 text-[#00FF66] text-xs font-mono font-bold shadow-[0_0_15px_rgba(0,255,102,0.25)] hover:shadow-[0_0_20px_rgba(0,255,102,0.45)] transition-all cursor-pointer group active:scale-95"
                title="Launch TECHZONE AI System (Hardware & Support Assistant)"
                aria-label="TECHZONE AI System"
              >
                <Bot className="w-4 h-4 text-[#00FF66] group-hover:rotate-12 transition-transform" />
                <span className="hidden sm:inline">AI System</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
              </button>
            )}

            {/* Admin Console Button (Quick Access for Sole Administrator Luka Tavadze) */}
            <button
              id="header-admin-panel-btn"
              onClick={onOpenAdmin}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer group shadow-[0_0_12px_rgba(0,255,102,0.25)] ${
                currentUser?.email.toLowerCase() === SOLE_ADMIN_EMAIL.toLowerCase() || currentUser?.isAdmin
                  ? 'bg-[#00FF66]/20 border-[#00FF66] text-[#00FF66] shadow-[0_0_18px_rgba(0,255,102,0.5)]'
                  : 'bg-zinc-950 border-[#00FF66]/60 hover:border-[#00FF66] text-[#00FF66]'
              }`}
              title="TechZone Core Administrator Terminal (Luka Tavadze)"
              aria-label="Admin Console"
            >
              <ShieldCheck className="w-4 h-4 text-[#00FF66] group-hover:scale-110 transition-transform shrink-0" />
              <span className="font-extrabold tracking-tight">Admin</span>
              <span className="w-2 h-2 rounded-full bg-[#00FF66] shadow-[0_0_6px_#00FF66] animate-pulse" />
            </button>

            {/* Google Registration / User Account Actions */}
            {currentUser ? (
              <button
                id="header-account-button"
                onClick={onOpenAccount}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-950 border border-[#00FF66]/40 hover:border-[#00FF66] hover:shadow-[0_0_15px_rgba(0,255,102,0.3)] transition-all cursor-pointer group"
                title={`Logged in as ${currentUser.name}`}
                aria-label="User account portal"
              >
                {currentUser.avatar ? (
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-6 h-6 rounded-full object-cover border border-[#00FF66]"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#00FF66]/20 text-[#00FF66] font-bold text-xs flex items-center justify-center">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-xs font-bold text-white group-hover:text-[#00FF66] max-w-[90px] truncate">
                  {currentUser.name.split(' ')[0]}
                </span>
                {currentUser.isGoogleVerified && (
                  <GoogleIcon className="w-3.5 h-3.5 shrink-0 hidden sm:block" />
                )}
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  id="header-google-register-btn"
                  onClick={() => onOpenAuth('register')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-xs shadow-[0_0_15px_rgba(255,255,255,0.25)] hover:shadow-[0_0_20px_rgba(0,255,102,0.4)] transition-all cursor-pointer active:scale-95 group shrink-0"
                  title="Fast Google Registration (+500 VIP Points)"
                >
                  <GoogleIcon className="w-4 h-4 shrink-0" />
                  <span className="font-extrabold tracking-tight">Google</span>
                </button>

                <button
                  id="header-account-button"
                  onClick={() => onOpenAuth('login')}
                  className="p-2 rounded-lg bg-zinc-950 border border-[#00FF66]/30 text-zinc-300 hover:text-[#00FF66] hover:border-[#00FF66] hover:shadow-[0_0_15px_rgba(0,255,102,0.3)] transition-all cursor-pointer"
                  title="Sign In / Portal"
                  aria-label="User sign in"
                >
                  <User className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Country & Language Quick Selector Button */}
            <button
              id="navbar-country-language-btn"
              onClick={openCountryModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-[#00FF66]/50 text-white text-xs font-mono transition-all cursor-pointer group shadow-[0_0_10px_rgba(0,0,0,0.5)] shrink-0"
              title="Change Shipping Country & Language (All Languages Available)"
            >
              <span>{currentCountry.flag}</span>
              <span className="font-bold text-zinc-300 group-hover:text-[#00FF66] hidden sm:inline">
                {currentCountry.currencySymbol}
              </span>
              <span className="text-zinc-600 hidden sm:inline">/</span>
              <span className="font-bold text-zinc-300 group-hover:text-[#00FF66]">
                {currentLanguage.code.toUpperCase()}
              </span>
              <Globe2 className="w-3.5 h-3.5 text-[#00FF66]" />
            </button>

            {/* Shopping Cart Button with Green Notification Badge */}
            <button
              id="header-cart-button"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg bg-black hover:bg-zinc-900 border border-[#00FF66]/40 text-white font-medium text-sm transition-all duration-150 shadow-[0_0_15px_rgba(0,255,102,0.2)] hover:border-[#00FF66] hover:shadow-[0_0_20px_rgba(0,255,102,0.4)] cursor-pointer active:scale-95"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingCart className="w-4 h-4 text-[#00FF66]" />
              <span className="hidden sm:inline">{t('cart', 'Cart')}</span>
              <span 
                id="header-cart-count-badge"
                className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-black bg-[#00FF66] text-black rounded-full shadow-[0_0_10px_#00FF66]"
              >
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              id="mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-900 border border-zinc-800 focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Search Input Drawer (Visible when toggled on mobile) */}
        {showSearchModal && (
          <div className="md:hidden pb-4 pt-1">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
              <input
                id="mobile-search-input"
                type="text"
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  onNavigate('products');
                }}
                className="w-full bg-zinc-950 text-sm text-white placeholder-zinc-500 pl-9 pr-4 py-2.5 rounded-lg border border-[#00FF66]/30 focus:border-[#00FF66] focus:outline-none"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-800 bg-black/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          {/* Mobile Google Register Banner if not logged in */}
          {!currentUser && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-zinc-900 to-black border border-[#00FF66]/40 space-y-2">
              <p className="text-xs text-zinc-300 font-medium">Join TechZone VIP Club</p>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('register');
                }}
                className="w-full py-2.5 px-3 bg-white text-zinc-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                <GoogleIcon className="w-4 h-4" />
                <span>Register with Google (+500 Pts)</span>
              </button>
            </div>
          )}

          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`mobile-nav-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-base font-medium text-left transition-colors ${
                  activeSection === link.id
                    ? 'bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30'
                    : 'text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-zinc-600" />
              </button>
            ))}
          </div>

          {/* Mobile Country & Language Selector */}
          <button
            onClick={() => {
              openCountryModal();
              setMobileMenuOpen(false);
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-[#00FF66]/50 text-white text-xs font-mono font-bold flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-[#00FF66]" />
              <span>{t('regionalSettings', 'Country & Language')} ({currentCountry.name})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>{currentCountry.flag}</span>
              <span className="text-[#00FF66]">{currentLanguage.nativeName}</span>
            </div>
          </button>

          {/* Mobile AI System Button */}
          {onOpenAi && (
            <button
              onClick={() => {
                onOpenAi();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#00FF66]/10 border border-[#00FF66]/50 text-[#00FF66] text-xs font-mono font-bold flex items-center justify-between shadow-[0_0_15px_rgba(0,255,102,0.2)] cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-[#00FF66]" />
                <span>TECHZONE AI System (Hardware Advisor)</span>
              </div>
              <span className="text-[10px] bg-[#00FF66] text-black px-1.5 py-0.5 rounded font-black">
                ONLINE
              </span>
            </button>
          )}

          {/* Mobile Admin Console link */}
          <button
            onClick={() => {
              onOpenAdmin();
              setMobileMenuOpen(false);
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-zinc-950 border border-[#00FF66]/40 hover:border-[#00FF66] text-[#00FF66] text-xs font-mono font-bold flex items-center justify-between shadow-[0_0_15px_rgba(0,255,102,0.15)] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00FF66]" />
              <span>Admin Console (Sole Admin Luka)</span>
            </div>
            <span className="text-[10px] bg-[#00FF66] text-black px-1.5 py-0.5 rounded font-black">
              CORE
            </span>
          </button>

          <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-xs text-zinc-400 px-2">
            {currentUser ? (
              <button
                onClick={() => {
                  onOpenAccount();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-[#00FF66] font-medium"
              >
                <User className="w-4 h-4" />
                <span>{currentUser.name} (Account)</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth('login');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-zinc-300 hover:text-[#00FF66] font-medium"
              >
                <User className="w-4 h-4" />
                <span>Sign In / Member Portal</span>
              </button>
            )}
            <span className="text-[#00FF66] font-mono">TechZone Neon</span>
          </div>
        </div>
      )}

    </nav>
  );
};
