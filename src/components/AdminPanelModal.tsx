import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Sparkles, 
  Plus, 
  Trash2, 
  Edit3, 
  DollarSign, 
  Image as ImageIcon, 
  Upload, 
  Search, 
  Box, 
  Check, 
  AlertTriangle, 
  Lock, 
  Save, 
  RefreshCw,
  Eye,
  Tag,
  CheckCircle2,
  TrendingUp,
  Layers
} from 'lucide-react';
import { Product, ProductCategory, ProductSpec, UserProfile, SOLE_ADMIN_EMAIL, SOLE_ADMIN_NAME } from '../types';
import { GoogleIcon } from './GoogleAuthModal';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onResetProducts: () => void;
  currentUser: UserProfile | null;
  onSetCurrentUser: (user: UserProfile) => void;
  onShowToast: (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => void;
}

// Curated high-res tech imagery presets for quick testing
const TECH_IMAGE_PRESETS = [
  {
    name: 'Cyber Phone',
    url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80',
    category: 'Smartphones' as ProductCategory,
  },
  {
    name: 'RTX Gaming Laptop',
    url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
    category: 'Laptops' as ProductCategory,
  },
  {
    name: 'Esports Wireless Mouse',
    url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    category: 'Gaming' as ProductCategory,
  },
  {
    name: 'Studio ANC Headphones',
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    category: 'Headphones' as ProductCategory,
  },
  {
    name: 'OLED Smartwatch Pro',
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    category: 'Smart Watches' as ProductCategory,
  },
  {
    name: 'Mechanical RGB Keyboard',
    url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    category: 'Accessories' as ProductCategory,
  },
  {
    name: '34" Curved 240Hz Monitor',
    url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    category: 'Monitors' as ProductCategory,
  },
  {
    name: 'Ultra HD 4K Vlog Camera',
    url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    category: 'Cameras' as ProductCategory,
  },
];

const CATEGORIES: ProductCategory[] = [
  'Smartphones',
  'Laptops',
  'Gaming',
  'Headphones',
  'Smart Watches',
  'Accessories',
  'Monitors',
  'Cameras',
  'Computer Accessories',
];

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetProducts,
  currentUser,
  onSetCurrentUser,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'create' | 'manage' | 'analytics' | 'adminProfile'>('manage');
  
  // Security check: is the current user Luka Tavadze or authenticated as admin?
  const isSoleAdmin = currentUser?.email.toLowerCase() === SOLE_ADMIN_EMAIL.toLowerCase() || currentUser?.isAdmin === true;
  const [adminPasskey, setAdminPasskey] = useState('');
  const [securityError, setSecurityError] = useState('');

  // Automatically activate Luka Tavadze's root administrator privileges whenever the console is open
  useEffect(() => {
    if (isOpen && (!currentUser || currentUser.email.toLowerCase() !== SOLE_ADMIN_EMAIL.toLowerCase() || !currentUser.isAdmin)) {
      const adminUser: UserProfile = {
        id: 'usr_sole_admin_luka',
        name: SOLE_ADMIN_NAME,
        email: SOLE_ADMIN_EMAIL,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
        provider: 'google',
        isGoogleVerified: true,
        tier: 'Sole Administrator (Root)',
        points: 99999,
        joinedDate: 'Jan 2026',
        isAdmin: true,
        role: 'admin',
      };
      onSetCurrentUser(adminUser);
    }
  }, [isOpen, currentUser]);

  // Manage tab states
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogCategory, setCatalogCategory] = useState<string>('All');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Inline price edit helper
  const [inlinePriceMap, setInlinePriceMap] = useState<Record<string, number>>({});

  // File upload input ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  // New Product Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ProductCategory>('Smartphones');
  const [newBrand, setNewBrand] = useState('TechZone Prime');
  const [newPrice, setNewPrice] = useState<string>('');
  const [newOldPrice, setNewOldPrice] = useState<string>('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newStock, setNewStock] = useState<string>('25');
  const [newInStock, setNewInStock] = useState<boolean>(true);
  const [newIsPopular, setNewIsPopular] = useState<boolean>(true);
  const [newIsSpecialOffer, setNewIsSpecialOffer] = useState<boolean>(false);
  const [newDescription, setNewDescription] = useState('');
  const [newFeatures, setNewFeatures] = useState<string[]>([
    'Aerospace-grade titanium alloy build',
    'Next-gen AI neural engine processing',
    'Ultra-fast charging with wireless power share'
  ]);
  const [newSpecs, setNewSpecs] = useState<ProductSpec[]>([
    { label: 'Processor', value: 'Octa-Core 3.4GHz' },
    { label: 'Display', value: '120Hz Fluid AMOLED' },
    { label: 'Warranty', value: '2 Years Official' }
  ]);
  const [newAdditionalImages, setNewAdditionalImages] = useState<string[]>([]);

  if (!isOpen) return null;

  // Handler to grant Luka Tavadze sole administrator access
  const handleClaimAdmin = () => {
    const adminUser: UserProfile = {
      id: 'usr_sole_admin_luka',
      name: SOLE_ADMIN_NAME,
      email: SOLE_ADMIN_EMAIL,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      provider: 'google',
      isGoogleVerified: true,
      tier: 'Sole Administrator (Root)',
      points: 99999,
      joinedDate: 'Jan 2026',
      isAdmin: true,
      role: 'admin',
    };
    onSetCurrentUser(adminUser);
    setSecurityError('');
    onShowToast('success', 'Sole Administrator Authenticated', `Welcome, Luka Tavadze! Full root admin privileges active.`);
  };

  const handleVerifyPasskey = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasskey.trim().toLowerCase() === 'admin' || adminPasskey.trim().toLowerCase() === 'admin2026') {
      handleClaimAdmin();
    } else {
      setSecurityError('Invalid Security Key. Only the authorized administrator may access this terminal.');
    }
  };

  // Image Upload handler via FileReader (Data URL)
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isEditing = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 4MB)
    if (file.size > 4 * 1024 * 1024) {
      onShowToast('warning', 'Image Too Large', 'Please select an image smaller than 4MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      if (isEditing && editingProduct) {
        setEditingProduct({
          ...editingProduct,
          image: dataUrl,
        });
      } else {
        setNewImageUrl(dataUrl);
      }
      onShowToast('success', 'Image Uploaded', 'Product image has been loaded successfully.');
    };
    reader.readAsDataURL(file);
  };

  // Feature list helpers
  const handleAddFeature = () => {
    setNewFeatures([...newFeatures, '']);
  };
  const handleFeatureChange = (index: number, val: string) => {
    const updated = [...newFeatures];
    updated[index] = val;
    setNewFeatures(updated);
  };
  const handleRemoveFeature = (index: number) => {
    setNewFeatures(newFeatures.filter((_, i) => i !== index));
  };

  // Spec list helpers
  const handleAddSpec = () => {
    setNewSpecs([...newSpecs, { label: '', value: '' }]);
  };
  const handleSpecChange = (index: number, field: 'label' | 'value', val: string) => {
    const updated = [...newSpecs];
    updated[index][field] = val;
    setNewSpecs(updated);
  };
  const handleRemoveSpec = (index: number) => {
    setNewSpecs(newSpecs.filter((_, i) => i !== index));
  };

  // Create Product Submission
  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTitle.trim()) {
      onShowToast('warning', 'Missing Title', 'Please enter a product title.');
      return;
    }
    const priceNum = parseFloat(newPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      onShowToast('warning', 'Invalid Price', 'Please enter a valid monetary price ($).');
      return;
    }

    const imgToUse = newImageUrl.trim() || TECH_IMAGE_PRESETS[0].url;
    const oldPriceNum = newOldPrice.trim() ? parseFloat(newOldPrice) : undefined;
    const stockNum = parseInt(newStock) || 10;

    // Calculate discount if old price is higher
    let discountPct: number | undefined;
    if (oldPriceNum && oldPriceNum > priceNum) {
      discountPct = Math.round(((oldPriceNum - priceNum) / oldPriceNum) * 100);
    }

    const createdProduct: Product = {
      id: `prod-admin-${Date.now()}`,
      name: newTitle.trim(),
      category: newCategory,
      brand: newBrand.trim() || 'TechZone',
      price: priceNum,
      oldPrice: oldPriceNum,
      discountPercentage: discountPct,
      rating: 5.0,
      reviewsCount: 1,
      image: imgToUse,
      additionalImages: newAdditionalImages.length > 0 ? newAdditionalImages : [imgToUse],
      description: newDescription.trim() || `${newTitle} engineered with high-grade components, modern aesthetics, and official manufacturer warranty.`,
      features: newFeatures.filter((f) => f.trim().length > 0),
      specs: newSpecs.filter((s) => s.label.trim().length > 0 && s.value.trim().length > 0),
      inStock: newInStock,
      stockCount: stockNum,
      isPopular: newIsPopular,
      isSpecialOffer: newIsSpecialOffer,
    };

    onAddProduct(createdProduct);
    onShowToast('success', 'Product Published!', `${createdProduct.name} ($${createdProduct.price}) is now live in the store.`);

    // Reset Form
    setNewTitle('');
    setNewPrice('');
    setNewOldPrice('');
    setNewImageUrl('');
    setNewDescription('');
    setActiveTab('manage');
  };

  // Quick Inline Price update
  const handleSaveInlinePrice = (product: Product) => {
    const updatedPrice = inlinePriceMap[product.id];
    if (updatedPrice !== undefined && updatedPrice > 0) {
      const updated: Product = {
        ...product,
        price: updatedPrice,
      };
      onUpdateProduct(updated);
      onShowToast('success', 'Price Updated', `${product.name} price changed to $${updatedPrice}`);
    }
  };

  // Full Edit Product Submission
  const handleSaveEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    onUpdateProduct(editingProduct);
    setEditingProduct(null);
    onShowToast('success', 'Product Updated', `${editingProduct.name} changes saved.`);
  };

  // Filtered catalog list for manage tab
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(catalogSearch.toLowerCase()) || 
                          p.brand.toLowerCase().includes(catalogSearch.toLowerCase());
    const matchesCat = catalogCategory === 'All' || p.category === catalogCategory;
    return matchesSearch && matchesCat;
  });

  // Analytics
  const totalValue = products.reduce((acc, p) => acc + (p.price * (p.stockCount || 1)), 0);
  const lowStockCount = products.filter((p) => p.stockCount <= 5).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/90 backdrop-blur-xl transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Main Admin Console Container */}
      <div 
        id="admin-panel-modal"
        className="relative w-full max-w-5xl bg-[#080808] border border-[#00FF66]/50 rounded-3xl shadow-[0_0_80px_rgba(0,255,102,0.25)] text-white overflow-hidden z-10 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-[#00FF66]/30 bg-black/80 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00FF66]/10 border border-[#00FF66] flex items-center justify-center text-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.4)]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white uppercase tracking-wider font-mono">
                  TECHZONE CORE // ADMIN CONSOLE
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black uppercase bg-[#00FF66] text-black shadow-[0_0_10px_#00FF66]">
                  ROOT
                </span>
              </div>
              <p className="text-xs text-zinc-400 flex items-center gap-2">
                <span>Sole Administrator:</span>
                <span className="text-[#00FF66] font-bold font-mono">{SOLE_ADMIN_NAME}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400">{SOLE_ADMIN_EMAIL}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00FF66]/15 border border-[#00FF66]/40 text-[#00FF66] text-xs font-mono font-bold shadow-[0_0_10px_rgba(0,255,102,0.2)]">
              <CheckCircle2 className="w-3.5 h-3.5" /> Sole Admin Active
            </div>

            <button
              id="close-admin-panel-btn"
              onClick={onClose}
              className="p-2 rounded-xl bg-black hover:bg-zinc-900 border border-zinc-800 hover:border-[#00FF66] text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close admin console"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Administrator Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 px-6 pt-3 border-b border-zinc-800/80 bg-zinc-950/60">
              <button
                onClick={() => { setActiveTab('create'); setEditingProduct(null); }}
                className={`pb-3 px-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all relative cursor-pointer flex items-center gap-2 ${
                  activeTab === 'create'
                    ? 'text-[#00FF66]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>Post Product & Images</span>
                {activeTab === 'create' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00FF66] shadow-[0_0_10px_#00FF66]" />
                )}
              </button>

              <button
                onClick={() => { setActiveTab('manage'); setEditingProduct(null); }}
                className={`pb-3 px-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all relative cursor-pointer flex items-center gap-2 ${
                  activeTab === 'manage'
                    ? 'text-[#00FF66]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Box className="w-4 h-4" />
                <span>Manage & Pricing ({products.length})</span>
                {activeTab === 'manage' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00FF66] shadow-[0_0_10px_#00FF66]" />
                )}
              </button>

              <button
                onClick={() => { setActiveTab('analytics'); setEditingProduct(null); }}
                className={`pb-3 px-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all relative cursor-pointer flex items-center gap-2 ${
                  activeTab === 'analytics'
                    ? 'text-[#00FF66]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Inventory & Money Stats</span>
                {activeTab === 'analytics' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00FF66] shadow-[0_0_10px_#00FF66]" />
                )}
              </button>

              <button
                onClick={() => { setActiveTab('adminProfile'); setEditingProduct(null); }}
                className={`pb-3 px-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all relative cursor-pointer flex items-center gap-2 ${
                  activeTab === 'adminProfile'
                    ? 'text-[#00FF66]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Sole Admin Profile</span>
                {activeTab === 'adminProfile' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00FF66] shadow-[0_0_10px_#00FF66]" />
                )}
              </button>
            </div>

            {/* Tab Contents Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

              {/* TAB 1: POST NEW PRODUCT (Images, Pricing / Money, Specs) */}
              {activeTab === 'create' && (
                <form onSubmit={handleCreateProductSubmit} className="space-y-6 max-w-4xl mx-auto">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-zinc-800">
                    <div>
                      <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                        <Plus className="w-5 h-5 text-[#00FF66]" /> Post New Hardware Product
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Add images, set price & currency, configure specifications, and publish instantly to TechZone.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-[#00FF66] bg-[#00FF66]/10 px-2.5 py-1 rounded-full border border-[#00FF66]/30 self-start sm:self-auto">
                      LIVE CATALOG SYNC
                    </span>
                  </div>

                  {/* Section 1: Basic Info & Money / Price */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-2xl bg-zinc-950 border border-zinc-850">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-1.5">
                        Product Name / Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. CyberViper RTX 5090 Ultra 24GB"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-1.5">
                        Category *
                      </label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as ProductCategory)}
                        className="w-full bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none cursor-pointer"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat} className="bg-black text-white">
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-1.5">
                        Brand Manufacturer
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. ApexGear, CyberTech, Sony"
                        value={newBrand}
                        onChange={(e) => setNewBrand(e.target.value)}
                        className="w-full bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none"
                      />
                    </div>

                    {/* Price / Money Inputs */}
                    <div className="p-4 rounded-xl bg-black border border-[#00FF66]/30 space-y-1">
                      <label className="block text-xs font-mono font-bold uppercase text-[#00FF66] flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5" /> Price / Money ($ USD) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-sm font-mono text-[#00FF66] font-bold">$</span>
                        <input
                          type="number"
                          step="0.01"
                          required
                          placeholder="999.00"
                          value={newPrice}
                          onChange={(e) => setNewPrice(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#00FF66] rounded-xl pl-8 pr-3 py-2 text-sm font-mono font-bold text-white placeholder-zinc-600 focus:outline-none"
                        />
                      </div>
                      <span className="text-[10px] text-zinc-500">The actual active selling price</span>
                    </div>

                    <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-1">
                      <label className="block text-xs font-mono font-bold uppercase text-zinc-400 flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" /> Strikethrough Original Price ($ USD)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-sm font-mono text-zinc-500">$</span>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="1299.00 (optional)"
                          value={newOldPrice}
                          onChange={(e) => setNewOldPrice(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#00FF66] rounded-xl pl-8 pr-3 py-2 text-sm font-mono text-zinc-300 placeholder-zinc-600 focus:outline-none"
                        />
                      </div>
                      <span className="text-[10px] text-zinc-500">Shows discount badge if higher than price</span>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-1.5">
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={newStock}
                        onChange={(e) => setNewStock(e.target.value)}
                        className="w-full bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300 font-medium">
                        <input
                          type="checkbox"
                          checked={newInStock}
                          onChange={(e) => setNewInStock(e.target.checked)}
                          className="accent-[#00FF66] w-4 h-4 cursor-pointer"
                        />
                        <span>In Stock</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300 font-medium">
                        <input
                          type="checkbox"
                          checked={newIsPopular}
                          onChange={(e) => setNewIsPopular(e.target.checked)}
                          className="accent-[#00FF66] w-4 h-4 cursor-pointer"
                        />
                        <span>Featured / Popular</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300 font-medium">
                        <input
                          type="checkbox"
                          checked={newIsSpecialOffer}
                          onChange={(e) => setNewIsSpecialOffer(e.target.checked)}
                          className="accent-[#00FF66] w-4 h-4 cursor-pointer"
                        />
                        <span>Special Deal</span>
                      </label>
                    </div>
                  </div>

                  {/* Section 2: Product Image & Image Uploading ("images post") */}
                  <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-850 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                      <h4 className="text-xs font-mono font-bold uppercase text-[#00FF66] flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" /> Product Image & Gallery Management
                      </h4>
                      <span className="text-[10px] text-zinc-400">Upload or URL or 1-Click Preset</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                      {/* Left: Input Options */}
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-zinc-300 mb-1">
                            Direct Image Web URL:
                          </label>
                          <input
                            type="url"
                            placeholder="https://images.unsplash.com/photo-..."
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                            className="w-full bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none"
                          />
                        </div>

                        {/* File Upload Button from local device */}
                        <div>
                          <span className="block text-xs font-medium text-zinc-300 mb-1">
                            Or Upload from Your Device:
                          </span>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageFileUpload(e, false)}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-dashed border-[#00FF66]/50 hover:border-[#00FF66] text-xs font-semibold text-[#00FF66] flex items-center justify-center gap-2 cursor-pointer transition-colors"
                          >
                            <Upload className="w-4 h-4" />
                            <span>Select Image File from Computer / Mobile</span>
                          </button>
                        </div>

                        {/* Presets */}
                        <div>
                          <span className="block text-[11px] font-mono text-zinc-400 mb-1.5 uppercase">
                            Instant High-Res Tech Presets:
                          </span>
                          <div className="grid grid-cols-4 gap-2">
                            {TECH_IMAGE_PRESETS.slice(0, 8).map((preset, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                  setNewImageUrl(preset.url);
                                  setNewCategory(preset.category);
                                }}
                                className="relative rounded-lg overflow-hidden border border-zinc-800 hover:border-[#00FF66] group cursor-pointer transition-all aspect-video"
                                title={`Use ${preset.name}`}
                              >
                                <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                                <span className="absolute inset-0 bg-black/60 flex items-center justify-center text-[9px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity p-0.5 text-center">
                                  {preset.name}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: Live Image Preview Box */}
                      <div className="p-4 rounded-xl bg-black border border-zinc-800 flex flex-col items-center justify-center min-h-[200px] text-center">
                        {newImageUrl ? (
                          <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-[#00FF66]/40 shadow-[0_0_20px_rgba(0,255,102,0.2)]">
                            <img
                              src={newImageUrl}
                              alt="New Product Preview"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = TECH_IMAGE_PRESETS[0].url;
                              }}
                            />
                            <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-[#00FF66] border border-[#00FF66]/40">
                              Preview Active
                            </span>
                          </div>
                        ) : (
                          <div className="text-zinc-600 space-y-2">
                            <ImageIcon className="w-10 h-10 mx-auto text-zinc-700" />
                            <p className="text-xs">No image selected yet</p>
                            <p className="text-[10px] text-zinc-600">Enter URL, upload file, or select a preset above</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Description, Features & Specs */}
                  <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-850 space-y-4">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-1.5">
                        Product Description
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Detailed hardware overview, material construction, performance highlights..."
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className="w-full bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl p-3 text-xs text-white placeholder-zinc-600 focus:outline-none"
                      />
                    </div>

                    {/* Features list */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-mono font-bold uppercase text-zinc-300">
                          Bullet Point Features
                        </label>
                        <button
                          type="button"
                          onClick={handleAddFeature}
                          className="text-[11px] text-[#00FF66] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" /> Add Feature
                        </button>
                      </div>
                      <div className="space-y-2">
                        {newFeatures.map((feat, idx) => (
                          <div key={idx} className="flex gap-2">
                            <input
                              type="text"
                              value={feat}
                              onChange={(e) => handleFeatureChange(idx, e.target.value)}
                              placeholder={`Feature #${idx + 1}`}
                              className="flex-1 bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                            />
                            {newFeatures.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveFeature(idx)}
                                className="p-2 text-zinc-500 hover:text-red-400 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Specs list */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-mono font-bold uppercase text-zinc-300">
                          Key Technical Specifications
                        </label>
                        <button
                          type="button"
                          onClick={handleAddSpec}
                          className="text-[11px] text-[#00FF66] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" /> Add Specification
                        </button>
                      </div>
                      <div className="space-y-2">
                        {newSpecs.map((spec, idx) => (
                          <div key={idx} className="flex gap-2">
                            <input
                              type="text"
                              value={spec.label}
                              onChange={(e) => handleSpecChange(idx, 'label', e.target.value)}
                              placeholder="Spec Name (e.g. Battery)"
                              className="w-1/3 bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                            />
                            <input
                              type="text"
                              value={spec.value}
                              onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                              placeholder="Spec Value (e.g. 5,000 mAh)"
                              className="flex-1 bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                            />
                            {newSpecs.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveSpec(idx)}
                                className="p-2 text-zinc-500 hover:text-red-400 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2">
                    <button
                      id="publish-new-product-btn"
                      type="submit"
                      className="w-full py-4 rounded-2xl bg-[#00FF66] hover:bg-[#00e65c] text-black font-black text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(0,255,102,0.4)] hover:shadow-[0_0_40px_rgba(0,255,102,0.6)] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Plus className="w-5 h-5 stroke-[3]" />
                      <span>Publish Hardware Product to Store</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: MANAGE & PRICING / MONEY ("prise meonye", edit, delete) */}
              {activeTab === 'manage' && (
                <div className="space-y-4">
                  {/* Search and Category Filter Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-zinc-950 border border-zinc-850">
                    <div className="relative w-full sm:w-72">
                      <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
                      <input
                        type="text"
                        placeholder="Search catalog products..."
                        value={catalogSearch}
                        onChange={(e) => setCatalogSearch(e.target.value)}
                        className="w-full bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                      <select
                        value={catalogCategory}
                        onChange={(e) => setCatalogCategory(e.target.value)}
                        className="bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl px-3 py-2 text-xs text-white focus:outline-none cursor-pointer"
                      >
                        <option value="All">All Categories</option>
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() => setActiveTab('create')}
                        className="px-3.5 py-2 rounded-xl bg-[#00FF66] hover:bg-[#00e65c] text-black font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,255,102,0.3)] cursor-pointer whitespace-nowrap"
                      >
                        <Plus className="w-3.5 h-3.5" /> Post New
                      </button>
                    </div>
                  </div>

                  {/* Products Table */}
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-black text-zinc-400 font-mono text-[11px] uppercase border-b border-zinc-800">
                          <tr>
                            <th className="p-3.5">Product & Image</th>
                            <th className="p-3.5">Category</th>
                            <th className="p-3.5">Price (Money)</th>
                            <th className="p-3.5">Stock</th>
                            <th className="p-3.5">Status</th>
                            <th className="p-3.5 text-right">Admin Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-850">
                          {filteredProducts.map((p) => {
                            const currentInlinePrice = inlinePriceMap[p.id] ?? p.price;
                            const isPriceModified = inlinePriceMap[p.id] !== undefined && inlinePriceMap[p.id] !== p.price;

                            return (
                              <tr key={p.id} className="hover:bg-zinc-900/50 transition-colors">
                                <td className="p-3.5">
                                  <div className="flex items-center gap-3">
                                    <img
                                      src={p.image}
                                      alt={p.name}
                                      className="w-12 h-12 rounded-xl object-cover border border-zinc-800 bg-black shrink-0"
                                    />
                                    <div className="min-w-0 max-w-xs">
                                      <p className="font-bold text-white truncate">{p.name}</p>
                                      <p className="text-[11px] text-zinc-500">{p.brand}</p>
                                    </div>
                                  </div>
                                </td>

                                <td className="p-3.5">
                                  <span className="px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px]">
                                    {p.category}
                                  </span>
                                </td>

                                {/* Inline Price / Money Input */}
                                <td className="p-3.5">
                                  <div className="flex items-center gap-1.5">
                                    <div className="relative w-24">
                                      <span className="absolute left-2.5 top-2 text-[#00FF66] font-mono font-bold">$</span>
                                      <input
                                        type="number"
                                        step="0.01"
                                        value={currentInlinePrice}
                                        onChange={(e) => {
                                          const val = parseFloat(e.target.value) || 0;
                                          setInlinePriceMap({
                                            ...inlinePriceMap,
                                            [p.id]: val,
                                          });
                                        }}
                                        className="w-full bg-black border border-zinc-800 focus:border-[#00FF66] rounded-lg pl-6 pr-2 py-1.5 font-mono text-xs font-bold text-white focus:outline-none"
                                      />
                                    </div>
                                    {isPriceModified && (
                                      <button
                                        onClick={() => handleSaveInlinePrice(p)}
                                        className="p-1.5 rounded-lg bg-[#00FF66] text-black font-bold hover:bg-[#00e65c] cursor-pointer shadow-[0_0_8px_#00FF66]"
                                        title="Save new price"
                                      >
                                        <Check className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                  </div>
                                </td>

                                {/* Stock edit */}
                                <td className="p-3.5 font-mono">
                                  <span className={`font-bold ${p.stockCount <= 5 ? 'text-amber-400' : 'text-zinc-300'}`}>
                                    {p.stockCount || 0} pcs
                                  </span>
                                </td>

                                {/* Stock status */}
                                <td className="p-3.5">
                                  <button
                                    onClick={() => {
                                      const updated: Product = { ...p, inStock: !p.inStock };
                                      onUpdateProduct(updated);
                                      onShowToast('info', 'Stock Toggled', `${p.name} marked as ${!p.inStock ? 'In Stock' : 'Out of Stock'}`);
                                    }}
                                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold cursor-pointer border ${
                                      p.inStock 
                                        ? 'bg-[#00FF66]/10 text-[#00FF66] border-[#00FF66]/30' 
                                        : 'bg-red-950/40 text-red-400 border-red-800/40'
                                    }`}
                                  >
                                    {p.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
                                  </button>
                                </td>

                                {/* Actions */}
                                <td className="p-3.5 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      onClick={() => setEditingProduct(p)}
                                      className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 hover:border-[#00FF66] cursor-pointer"
                                      title="Edit Product Details"
                                    >
                                      <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (confirm(`Are you sure you want to delete ${p.name} from the store?`)) {
                                          onDeleteProduct(p.id);
                                          onShowToast('info', 'Product Deleted', `${p.name} was removed from the store.`);
                                        }
                                      }}
                                      className="p-2 rounded-lg bg-red-950/30 hover:bg-red-900/60 text-red-400 hover:text-red-200 border border-red-900/40 cursor-pointer"
                                      title="Delete Product"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Edit Product Modal Overlay if editing */}
                  {editingProduct && (
                    <div className="p-5 rounded-2xl bg-zinc-950 border border-[#00FF66]/60 shadow-[0_0_30px_rgba(0,255,102,0.2)] space-y-4 animate-in fade-in">
                      <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                        <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
                          <Edit3 className="w-4 h-4 text-[#00FF66]" /> Edit Hardware: {editingProduct.name}
                        </h4>
                        <button
                          onClick={() => setEditingProduct(null)}
                          className="p-1 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <form onSubmit={handleSaveEditProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-mono text-zinc-400 mb-1">Product Title</label>
                          <input
                            type="text"
                            value={editingProduct.name}
                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                            className="w-full bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-zinc-400 mb-1">Price ($ USD)</label>
                          <input
                            type="number"
                            step="0.01"
                            value={editingProduct.price}
                            onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                            className="w-full bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-zinc-400 mb-1">Old Strikethrough Price ($)</label>
                          <input
                            type="number"
                            step="0.01"
                            value={editingProduct.oldPrice || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, oldPrice: parseFloat(e.target.value) || undefined })}
                            className="w-full bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-mono text-zinc-400 mb-1">Image URL</label>
                          <div className="flex gap-2">
                            <input
                              type="url"
                              value={editingProduct.image}
                              onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                              className="flex-1 bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                            />
                            <input
                              ref={editFileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageFileUpload(e, true)}
                              className="hidden"
                            />
                            <button
                              type="button"
                              onClick={() => editFileInputRef.current?.click()}
                              className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-xl text-xs text-[#00FF66] flex items-center gap-1.5 cursor-pointer"
                            >
                              <Upload className="w-3.5 h-3.5" /> Upload File
                            </button>
                          </div>
                        </div>

                        <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setEditingProduct(null)}
                            className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white text-xs font-bold cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-[#00FF66] hover:bg-[#00e65c] text-black font-extrabold text-xs shadow-[0_0_15px_rgba(0,255,102,0.4)] cursor-pointer"
                          >
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: INVENTORY & MONEY STATS */}
              {activeTab === 'analytics' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl bg-zinc-950 border border-[#00FF66]/30 relative overflow-hidden">
                      <div className="text-xs font-mono text-[#00FF66] uppercase font-semibold">
                        Total Catalog Value
                      </div>
                      <div className="text-3xl font-mono font-black text-white mt-1">
                        ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1">Sum of retail price × stock volume</p>
                    </div>

                    <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
                      <div className="text-xs font-mono text-zinc-400 uppercase font-semibold">
                        Active Products Listed
                      </div>
                      <div className="text-3xl font-mono font-black text-[#00FF66] mt-1">
                        {products.length} Items
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1">Across 8 technology categories</p>
                    </div>

                    <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
                      <div className="text-xs font-mono text-amber-400 uppercase font-semibold">
                        Low Stock Alerts
                      </div>
                      <div className="text-3xl font-mono font-black text-amber-400 mt-1">
                        {lowStockCount} Items
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1">≤ 5 units remaining in warehouse</p>
                    </div>
                  </div>

                  {/* Reset Catalog button */}
                  <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 text-[#00FF66]" /> Factory Catalog Reset
                      </h4>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        Reset catalog back to the original default flagship lineup.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm('Reset store catalog to initial defaults?')) {
                          onResetProducts();
                          onShowToast('info', 'Catalog Reset', 'Products catalog restored to defaults.');
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 text-xs font-bold cursor-pointer transition-colors"
                    >
                      Reset Store Catalog
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 4: SOLE ADMINISTRATOR PROFILE (Luka Tavadze) */}
              {activeTab === 'adminProfile' && (
                <div className="space-y-5 max-w-3xl mx-auto">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 via-black to-zinc-950 border border-[#00FF66]/40 relative overflow-hidden shadow-[0_0_40px_rgba(0,255,102,0.15)]">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#00FF66]/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                      <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80"
                        alt={SOLE_ADMIN_NAME}
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-[#00FF66] shadow-[0_0_20px_rgba(0,255,102,0.4)]"
                      />

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-2xl font-black text-white">{SOLE_ADMIN_NAME}</h3>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-[#00FF66] text-black">
                            SOLE ADMINISTRATOR
                          </span>
                        </div>
                        <p className="text-sm font-mono text-[#00FF66] flex items-center gap-2">
                          <GoogleIcon className="w-4 h-4" />
                          <span>{SOLE_ADMIN_EMAIL}</span>
                        </p>
                        <p className="text-xs text-zinc-400">
                          Sole Administrator with exclusive system access: Catalog Publishing, Pricing, Inventory & Financial Reports.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                      <span className="text-xs font-mono text-zinc-400 uppercase">Security Clearance</span>
                      <p className="text-sm font-bold text-white flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#00FF66]" /> Root Level 0 (Master)
                      </p>
                      <p className="text-xs text-zinc-500">Unrestricted catalog & pricing write authority</p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                      <span className="text-xs font-mono text-zinc-400 uppercase">Authentication Mode</span>
                      <p className="text-sm font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#00FF66]" /> Google OAuth 2.0 Direct
                      </p>
                      <p className="text-xs text-zinc-500">Linked to tavadzeluka520@gmail.com</p>
                    </div>
                  </div>
                </div>
              )}

            </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-zinc-850 bg-black/90 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] shadow-[0_0_8px_#00FF66] animate-pulse" />
            <span className="font-mono text-[11px] text-zinc-300">
              TechZone Kernel: ONLINE • Administrator: {SOLE_ADMIN_NAME}
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-medium cursor-pointer"
          >
            Close Terminal
          </button>
        </div>
      </div>
    </div>
  );
};
