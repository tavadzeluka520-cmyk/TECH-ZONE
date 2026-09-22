import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingCart, 
  Check, 
  ShieldCheck, 
  Truck, 
  Plus, 
  Minus,
  Sparkles,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, selectedColor?: string) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0] : ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'features'>('specs');

  // All images array
  const allImages = [product.image, ...(product.additionalImages || [])];

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="product-details-modal"
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0a0a0a] border border-[#00FF66]/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,255,102,0.18)] text-white my-auto backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="product-modal-close-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-black/80 hover:bg-zinc-900 text-zinc-400 hover:text-white border border-[#00FF66]/30 hover:border-[#00FF66] transition-colors z-20 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 space-y-4">
            
            {/* Primary Main Image Container with Neon Glow */}
            <div className="relative aspect-square w-full rounded-2xl bg-black border border-zinc-800 overflow-hidden flex items-center justify-center group">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-48 rounded-full bg-[#00FF66]/15 blur-2xl group-hover:bg-[#00FF66]/25 transition-all duration-500" />
              </div>
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              
              {product.discountPercentage && (
                <div className="absolute top-3 left-3 bg-[#00FF66] text-black font-black text-xs px-3 py-1 rounded-lg shadow-[0_0_12px_rgba(0,255,102,0.5)]">
                  -{product.discountPercentage}% OFF
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {allImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      activeImage === imgUrl 
                        ? 'border-[#00FF66] shadow-[0_0_10px_#00FF66]' 
                        : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 pt-3">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black border border-zinc-800 text-xs">
                <ShieldCheck className="w-4 h-4 text-[#00FF66] shrink-0" />
                <span className="text-zinc-300">2-Year Official Warranty</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black border border-zinc-800 text-xs">
                <Truck className="w-4 h-4 text-[#00FF66] shrink-0" />
                <span className="text-zinc-300">Fast Express Delivery</span>
              </div>
            </div>

          </div>

          {/* Right Column: Information & Purchase Actions */}
          <div className="md:col-span-6 space-y-6">
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-[#00FF66] uppercase tracking-wider bg-[#00FF66]/10 px-2.5 py-0.5 rounded border border-[#00FF66]/30 font-mono">
                  {product.category}
                </span>
                <span className="text-xs text-zinc-400 font-medium font-mono">Brand: {product.brand}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#00FF66] text-[#00FF66]'
                          : 'text-zinc-700'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-white font-mono">{product.rating}</span>
                <span className="text-xs text-zinc-400">({product.reviewsCount} customer reviews)</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 p-4 rounded-xl bg-black/90 border border-[#00FF66]/30">
              <span className="text-3xl font-black text-[#00FF66] font-mono neon-text-glow">
                ${product.price.toLocaleString()}
              </span>
              {product.oldPrice && (
                <span className="text-base text-zinc-500 line-through font-mono">
                  ${product.oldPrice.toLocaleString()}
                </span>
              )}
              {product.discountPercentage && (
                <span className="text-xs font-bold text-black bg-[#00FF66] px-2 py-0.5 rounded font-mono shadow-[0_0_8px_#00FF66]">
                  Save ${product.oldPrice ? product.oldPrice - product.price : 0} ({product.discountPercentage}%)
                </span>
              )}
            </div>

            {/* Product Summary */}
            <p className="text-sm text-zinc-300 leading-relaxed">
              {product.description}
            </p>

            {/* Color Variant Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300">
                  Color Option: <span className="text-[#00FF66] font-bold">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        selectedColor === color
                          ? 'bg-[#00FF66] text-black border-[#00FF66] shadow-[0_0_10px_rgba(0,255,102,0.4)]'
                          : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-[#00FF66]/40'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart Row */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                
                {/* Quantity Controls */}
                <div className="flex items-center border border-zinc-800 bg-black rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-bold font-mono text-sm text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  id="modal-add-to-cart-button"
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all duration-200 cursor-pointer active:scale-95 ${
                    added
                      ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.6)]'
                      : 'bg-[#00FF66] hover:bg-[#00e65c] text-black shadow-[0_0_20px_rgba(0,255,102,0.4)] hover:shadow-[0_0_30px_rgba(0,255,102,0.6)]'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Added {quantity} to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart (${(product.price * quantity).toLocaleString()})</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                <span className="flex items-center gap-1.5 text-[#00FF66]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  In Stock ({product.stockCount} units remaining)
                </span>
                <span>Ships within 24 hours</span>
              </div>
            </div>

            {/* Technical Specifications Tabs */}
            <div className="pt-4 border-t border-zinc-800">
              <div className="flex border-b border-zinc-800 text-xs">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 px-3 font-semibold transition-colors cursor-pointer ${
                    activeTab === 'specs' 
                      ? 'text-[#00FF66] border-b-2 border-[#00FF66]' 
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Tech Specs
                </button>
                <button
                  onClick={() => setActiveTab('features')}
                  className={`pb-2 px-3 font-semibold transition-colors cursor-pointer ${
                    activeTab === 'features' 
                      ? 'text-[#00FF66] border-b-2 border-[#00FF66]' 
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Key Highlights
                </button>
              </div>

              <div className="pt-3">
                {activeTab === 'specs' && (
                  <div className="space-y-2">
                    {product.specs.map((spec, i) => (
                      <div key={i} className="flex justify-between py-1.5 text-xs border-b border-zinc-900">
                        <span className="text-zinc-400">{spec.label}</span>
                        <span className="text-white font-mono font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'features' && (
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] mt-1.5 shrink-0 shadow-[0_0_5px_#00FF66]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
