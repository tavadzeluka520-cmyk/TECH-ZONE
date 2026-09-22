import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Zap, 
  Cpu, 
  Eye, 
  CheckCircle2,
  ShoppingCart,
  Gamepad2,
  Laptop,
  Smartphone,
  Watch,
  Headphones,
  Bot
} from 'lucide-react';
import { Product } from '../types';

interface HeroSectionProps {
  onShopNow: () => void;
  onViewProducts: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenAi?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopNow,
  onViewProducts,
  products,
  onSelectProduct,
  onAddToCart,
  onOpenAi,
}) => {
  // Find the 5 premium products requested:
  // 1. Gaming laptop
  // 2. Smartphone
  // 3. Gaming controller
  // 4. Smartwatch
  // 5. Wireless earbuds
  const gamingLaptop = products.find(p => p.category === 'Laptops') || products[1];
  const smartphone = products.find(p => p.category === 'Smartphones') || products[0];
  const controller = products.find(p => p.id === 'prod-7' || p.category === 'Gaming') || products[5];
  const smartwatch = products.find(p => p.category === 'Smart Watches') || products[4];
  const earbuds = products.find(p => p.id === 'prod-11' || p.category === 'Headphones') || products[3];

  const showcaseProducts = [
    { type: 'Gaming Laptop', product: gamingLaptop, icon: Laptop },
    { type: 'Smartphone', product: smartphone, icon: Smartphone },
    { type: 'Gaming Controller', product: controller, icon: Gamepad2 },
    { type: 'Smartwatch', product: smartwatch, icon: Watch },
    { type: 'Wireless Earbuds', product: earbuds, icon: Headphones },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const currentItem = showcaseProducts[activeIndex];
  const currentProduct = currentItem?.product;

  return (
    <section id="hero" className="relative overflow-hidden bg-black text-white pt-8 pb-20 lg:pt-16 lg:pb-28 border-b border-[#00FF66]/20">
      
      {/* Futuristic Deep Black & Neon Green Lighting Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#00FF66_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#00FF66]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 right-10 w-[450px] h-[450px] bg-[#00FF66]/15 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#00FF66]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline and Call-to-Actions */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            
            {/* Futuristic Tech Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66] text-xs font-mono font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(0,255,102,0.25)]">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#00FF66]" />
              <span>NEXT-GEN FLAGSHIP HARDWARE 2026</span>
            </div>

            {/* Headline as specifically requested */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight uppercase font-sans">
              THE FUTURE OF <br />
              <span className="text-[#00FF66] neon-text-glow">TECHNOLOGY</span>
            </h1>

            {/* Subtitle as specifically requested */}
            <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Discover the latest devices, powerful performance and innovative technology — all in one place.
            </p>

            {/* Two Action Buttons:
                1. Shop Now → (bright neon green)
                2. Explore Products (black/transparent with green border)
            */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-shop-now-button"
                onClick={onShopNow}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#00FF66] hover:bg-[#00e65c] text-black font-extrabold text-base shadow-[0_0_30px_rgba(0,255,102,0.5)] hover:shadow-[0_0_45px_rgba(0,255,102,0.7)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer uppercase tracking-wider"
              >
                <span>Shop Now →</span>
              </button>

              <button
                id="hero-explore-products-button"
                onClick={onViewProducts}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-black/80 hover:bg-[#00FF66]/10 text-white border border-[#00FF66]/60 hover:border-[#00FF66] hover:shadow-[0_0_20px_rgba(0,255,102,0.3)] font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-[#00FF66]" />
                <span>Explore Products</span>
              </button>

              {onOpenAi && (
                <button
                  id="hero-ask-ai-button"
                  onClick={onOpenAi}
                  className="w-full sm:w-auto px-5 py-4 rounded-xl bg-zinc-950 hover:bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/40 hover:border-[#00FF66] font-mono font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,255,102,0.2)]"
                  title="Ask TECHZONE AI System about specs, pricing, and orders"
                >
                  <Bot className="w-4 h-4 text-[#00FF66] animate-pulse" />
                  <span>Ask AI System</span>
                </button>
              )}
            </div>

            {/* Trust Markers Bar */}
            <div className="pt-6 border-t border-zinc-900 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-center gap-2.5">
                <Truck className="w-5 h-5 text-[#00FF66] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">Fast Delivery</div>
                  <p className="text-xs text-zinc-400">Within 24-48 Hours</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#00FF66] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">Official Warranty</div>
                  <p className="text-xs text-zinc-400">2-Year Guarantee</p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2.5">
                <Cpu className="w-5 h-5 text-[#00FF66] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">Certified Tech</div>
                  <p className="text-xs text-zinc-400">100% Genuine Seals</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Technology Products Showcase with Neon Lighting */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Green Neon Aura Lighting Glow around the product frame */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#00FF66] to-[#00e65c] opacity-30 blur-2xl transition duration-700 pointer-events-none shadow-[0_0_60px_rgba(0,255,102,0.4)]" />
              
              {/* Main Showcase Glassmorphic Card */}
              <div className="relative rounded-2xl bg-[#080808]/90 border border-[#00FF66]/40 p-6 sm:p-7 shadow-[0_0_35px_rgba(0,255,102,0.2)] backdrop-blur-xl">
                
                {/* 5 Product Selector Tabs as requested: Gaming laptop, Smartphone, Gaming controller, Smartwatch, Wireless earbuds */}
                <div className="flex items-center justify-between gap-1 mb-5 p-1 bg-black/80 rounded-xl border border-zinc-800/80 overflow-x-auto">
                  {showcaseProducts.map((item, idx) => {
                    const isCurrent = activeIndex === idx;
                    const IconComp = item.icon;
                    return (
                      <button
                        key={item.type}
                        onClick={() => setActiveIndex(idx)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                          isCurrent
                            ? 'bg-[#00FF66] text-black font-extrabold shadow-[0_0_15px_rgba(0,255,102,0.5)]'
                            : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                        }`}
                        title={item.type}
                      >
                        <IconComp className={`w-3.5 h-3.5 ${isCurrent ? 'text-black' : 'text-[#00FF66]'}`} />
                        <span className="hidden sm:inline">{item.type}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Product Showcase Body */}
                {currentProduct && (
                  <div>
                    {/* Top Meta info */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#00FF66] bg-[#00FF66]/10 border border-[#00FF66]/30 px-2.5 py-0.5 rounded-full font-bold">
                        {currentItem.type}
                      </span>
                      {currentProduct.discountPercentage && (
                        <span className="text-xs font-bold text-black bg-[#00FF66] px-2 py-0.5 rounded-full shadow-[0_0_8px_#00FF66]">
                          SAVE {currentProduct.discountPercentage}%
                        </span>
                      )}
                    </div>

                    {/* Image with neon green glow ring */}
                    <div 
                      onClick={() => onSelectProduct(currentProduct)}
                      className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden bg-black/60 border border-zinc-800/80 group cursor-pointer"
                    >
                      {/* Green neon radial behind product image */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-48 h-48 rounded-full bg-[#00FF66]/15 blur-2xl group-hover:bg-[#00FF66]/30 transition-all duration-500" />
                      </div>

                      <img
                        src={currentProduct.image}
                        alt={currentProduct.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />

                      <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md border border-[#00FF66]/40 text-[#00FF66] text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg group-hover:border-[#00FF66] transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick Specs</span>
                      </div>
                    </div>

                    {/* Product Title and Pricing */}
                    <div className="mt-4 flex items-start justify-between gap-4">
                      <div>
                        <h2 
                          onClick={() => onSelectProduct(currentProduct)}
                          className="text-lg font-bold text-white hover:text-[#00FF66] transition-colors cursor-pointer line-clamp-1"
                        >
                          {currentProduct.name}
                        </h2>
                        <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
                          {currentProduct.features?.[0] || currentProduct.description}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xl font-black font-mono text-[#00FF66] neon-text-glow">
                          ${currentProduct.price.toLocaleString()}
                        </div>
                        {currentProduct.oldPrice && (
                          <div className="text-xs text-zinc-500 line-through">
                            ${currentProduct.oldPrice.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons for current showcase product */}
                    <div className="mt-4 grid grid-cols-2 gap-3 pt-3 border-t border-zinc-800">
                      <button
                        id="hero-showcase-add-cart-btn"
                        onClick={() => onAddToCart(currentProduct)}
                        className="px-4 py-2.5 rounded-xl bg-[#00FF66] hover:bg-[#00e65c] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,255,102,0.4)] cursor-pointer active:scale-95"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>

                      <button
                        onClick={() => onSelectProduct(currentProduct)}
                        className="px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-white border border-[#00FF66]/30 hover:border-[#00FF66] font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#00FF66]" />
                      </button>
                    </div>

                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
