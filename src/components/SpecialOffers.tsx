import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Timer, 
  ShoppingCart, 
  ArrowRight, 
  Copy, 
  Check, 
  Zap, 
  Gamepad2,
  ShieldCheck,
  Star
} from 'lucide-react';
import { Product } from '../types';
import { SPECIAL_OFFER_HERO } from '../data/mockData';

interface SpecialOffersProps {
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  dealProduct?: Product;
}

export const SpecialOffers: React.FC<SpecialOffersProps> = ({
  onAddToCart,
  onSelectProduct,
  dealProduct,
}) => {
  // Live countdown state
  const [timeLeft, setTimeLeft] = useState({
    hours: SPECIAL_OFFER_HERO.endsInHours,
    minutes: SPECIAL_OFFER_HERO.endsInMinutes,
    seconds: SPECIAL_OFFER_HERO.endsInSeconds,
  });
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyCoupon = () => {
    navigator.clipboard?.writeText(SPECIAL_OFFER_HERO.couponCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <section id="special-offers" className="py-20 bg-black text-white relative overflow-hidden border-b border-[#00FF66]/20">
      
      {/* Background radial green lighting effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#00FF66]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-[#00FF66]/8 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner Frame with Green Neon Lighting & Thin Green Borders */}
        <div className="relative rounded-3xl bg-[#080808]/90 border border-[#00FF66]/40 p-8 sm:p-12 lg:p-14 shadow-[0_0_50px_rgba(0,255,102,0.18)] overflow-hidden backdrop-blur-xl">
          
          {/* Neon green top edge line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00FF66] to-transparent shadow-[0_0_20px_#00FF66]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Promotion Info, Countdown Timer, & Shop Deals Button */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#00FF66] text-black font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,255,102,0.5)]">
                  <Zap className="w-3.5 h-3.5 fill-black" />
                  GAMING SPECIAL
                </span>

                <span className="inline-flex items-center gap-1 text-xs text-[#00FF66] bg-[#00FF66]/10 px-3 py-1 rounded-full border border-[#00FF66]/30 font-mono font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[#00FF66]" /> LIMITED FLASH DROP
                </span>
              </div>

              {/* Exact Headline as requested: "UP TO 50% OFF" */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase font-sans">
                <span className="text-[#00FF66] neon-text-glow">UP TO 50% OFF</span> <br />
                FLAGSHIP GAMING
              </h2>

              <p className="text-zinc-300 text-base sm:text-lg max-w-xl leading-relaxed">
                Level up your battle station with high-performance gaming hardware. 
                Save up to 50% on pro wireless controllers, mechanical tactile keyboards, 
                and RTX esports laptops with signature green lighting.
              </p>

              {/* Countdown Timer as requested */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#00FF66]">
                  <Timer className="w-4 h-4 text-[#00FF66] animate-pulse" />
                  <span>Flash Sale Countdown Timer</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center justify-center w-18 h-18 sm:w-20 sm:h-20 bg-black rounded-2xl border border-[#00FF66]/40 shadow-[0_0_15px_rgba(0,255,102,0.25)]">
                    <span className="text-2xl sm:text-3xl font-mono font-black text-[#00FF66]">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase font-mono text-zinc-400">Hours</span>
                  </div>
                  <span className="text-2xl font-mono font-bold text-[#00FF66]">:</span>
                  <div className="flex flex-col items-center justify-center w-18 h-18 sm:w-20 sm:h-20 bg-black rounded-2xl border border-[#00FF66]/40 shadow-[0_0_15px_rgba(0,255,102,0.25)]">
                    <span className="text-2xl sm:text-3xl font-mono font-black text-[#00FF66]">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase font-mono text-zinc-400">Minutes</span>
                  </div>
                  <span className="text-2xl font-mono font-bold text-[#00FF66]">:</span>
                  <div className="flex flex-col items-center justify-center w-18 h-18 sm:w-20 sm:h-20 bg-black rounded-2xl border border-[#00FF66]/40 shadow-[0_0_15px_rgba(0,255,102,0.25)]">
                    <span className="text-2xl sm:text-3xl font-mono font-black text-[#00FF66] animate-pulse">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase font-mono text-zinc-400">Seconds</span>
                  </div>
                </div>
              </div>

              {/* Coupon Code Pill */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <span className="text-xs text-zinc-400">Apply coupon at checkout:</span>
                <button
                  id="copy-deal-coupon-btn"
                  onClick={handleCopyCoupon}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black border border-[#00FF66]/40 text-[#00FF66] hover:border-[#00FF66] text-xs font-mono font-bold cursor-pointer transition-all shadow-sm"
                  title="Click to copy coupon code"
                >
                  <span>{SPECIAL_OFFER_HERO.couponCode}</span>
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-[#00FF66]" />}
                </button>
                {copiedCode && (
                  <span className="text-xs text-[#00FF66] font-medium animate-in fade-in">
                    ✓ Coupon code copied!
                  </span>
                )}
              </div>

              {/* Exact “Shop Deals →” Button as requested */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  id="shop-deals-button"
                  onClick={() => {
                    if (dealProduct) {
                      onAddToCart(dealProduct);
                    }
                  }}
                  className="px-8 py-4 rounded-xl bg-[#00FF66] hover:bg-[#00e65c] text-black font-black text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(0,255,102,0.5)] hover:shadow-[0_0_45px_rgba(0,255,102,0.7)] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span>Shop Deals →</span>
                </button>

                {dealProduct && (
                  <button
                    onClick={() => onSelectProduct(dealProduct)}
                    className="px-6 py-4 rounded-xl bg-black hover:bg-zinc-900 border border-[#00FF66]/40 hover:border-[#00FF66] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>View Deal Specs</span>
                    <ArrowRight className="w-4 h-4 text-[#00FF66]" />
                  </button>
                )}
              </div>

            </div>

            {/* Right Column: Gaming Products Showcase Card with Green Neon Lighting */}
            <div className="lg:col-span-5 relative">
              {/* Green Neon lighting halo */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#00FF66] to-[#00e65c] opacity-30 blur-2xl pointer-events-none" />

              <div className="relative rounded-2xl bg-[#050505] border border-[#00FF66]/50 p-6 shadow-[0_0_40px_rgba(0,255,102,0.25)]">
                
                {/* Gaming Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00FF66] bg-[#00FF66]/10 px-3 py-1 rounded-full border border-[#00FF66]/30">
                    <Gamepad2 className="w-3.5 h-3.5" />
                    <span>FEATURED GAMING RIG</span>
                  </div>
                  <span className="text-xs font-mono font-black text-black bg-[#00FF66] px-2.5 py-0.5 rounded-full">
                    50% SAVINGS
                  </span>
                </div>

                {/* Gaming Product Image with Neon Glow */}
                <div className="relative h-60 w-full rounded-xl overflow-hidden bg-black border border-zinc-800 group">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-36 h-36 rounded-full bg-[#00FF66]/20 blur-2xl group-hover:bg-[#00FF66]/35 transition-all duration-500" />
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80"
                    alt="Gaming Deal"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-md px-3 py-1 rounded-lg border border-[#00FF66]/40 text-[#00FF66] text-xs font-bold">
                    Esports Grade Dual Hall-Effect Gamepad
                  </div>
                </div>

                {/* Pricing block */}
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-black text-white">Phantom Elite Pro Controller</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">Low-latency 2.4GHz + Anti-drift joysticks</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black font-mono text-[#00FF66] neon-text-glow">
                      $139
                    </div>
                    <div className="text-xs font-mono text-zinc-500 line-through">
                      $278
                    </div>
                  </div>
                </div>

                {/* Quick Add Button */}
                <button
                  onClick={() => {
                    if (dealProduct) onAddToCart(dealProduct);
                  }}
                  className="mt-5 w-full py-3 rounded-xl bg-[#00FF66] hover:bg-[#00e65c] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,102,0.4)] cursor-pointer active:scale-95 transition-all"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Claim 50% Off Deal</span>
                </button>

                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-zinc-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00FF66]" />
                  <span>Includes 2-Year Direct Replacement Warranty</span>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
