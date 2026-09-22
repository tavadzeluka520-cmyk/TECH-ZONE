import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  ArrowRight, 
  Tag, 
  Check, 
  ShieldCheck, 
  Truck,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
  discountPercentage: number;
  onApplyCoupon: (code: string) => boolean;
  couponCode: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
  discountPercentage,
  onApplyCoupon,
  couponCode,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  // Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 
    0
  );

  const discountAmount = (subtotal * discountPercentage) / 100;
  // Free shipping threshold: $150
  const freeShippingThreshold = 150;
  const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 15;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const success = onApplyCoupon(couponInput.trim().toUpperCase());
    if (success) {
      setCouponSuccess('50% Discount applied successfully!');
      setCouponError('');
    } else {
      setCouponError('Invalid coupon. Try using "NEON50"');
      setCouponSuccess('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          id="cart-slide-drawer"
          className="w-screen max-w-md bg-[#080808] border-l border-[#00FF66]/30 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col text-white animate-in slide-in-from-right duration-300"
        >
          {/* Header */}
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-black/50">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-[#00FF66]/10 border border-[#00FF66]/40 text-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.25)]">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  Shopping Cart
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#00FF66] text-black">
                    {totalItemsCount}
                  </span>
                </h2>
                <p className="text-xs text-zinc-400">
                  {totalItemsCount === 1 ? '1 item ready for checkout' : `${totalItemsCount} items ready for checkout`}
                </p>
              </div>
            </div>

            <button
              id="cart-close-button"
              onClick={onClose}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-zinc-950/80 border-b border-zinc-800/80 text-xs">
            {isFreeShipping && subtotal > 0 ? (
              <div className="flex items-center gap-1.5 text-[#00FF66] font-semibold">
                <Check className="w-4 h-4 text-[#00FF66]" />
                <span>You unlocked Free 24h Express Delivery!</span>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex justify-between text-zinc-300">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#00FF66]" />
                    <span>Add ${(freeShippingThreshold - subtotal).toFixed(2)} for Free Shipping</span>
                  </span>
                  <span className="font-mono text-[#00FF66] font-bold">
                    {Math.round((subtotal / freeShippingThreshold) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#00FF66] h-full rounded-full transition-all duration-300 shadow-[0_0_8px_#00FF66]"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-600">
                  <ShoppingCart className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Your cart is empty</h3>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
                    Explore our futuristic smartphones, laptops, gaming gear, and accessories!
                  </p>
                </div>
                <button
                  id="empty-cart-shop-now-btn"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-[#00FF66] hover:bg-[#00e65c] text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,255,102,0.35)] cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs pb-1">
                  <span className="text-zinc-400 uppercase tracking-wider font-semibold">Selected Devices</span>
                  <button
                    id="cart-clear-all-btn"
                    onClick={onClearCart}
                    className="text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer text-xs"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Clear Cart</span>
                  </button>
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    id={`cart-item-${item.product.id}`}
                    className="flex gap-4 p-3.5 rounded-2xl bg-zinc-950/90 border border-zinc-800/80 hover:border-[#00FF66]/40 transition-colors items-center justify-between"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-xl bg-black border border-zinc-800 overflow-hidden shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 pr-2">
                      <h4 className="text-xs font-bold text-white truncate">
                        {item.product.name}
                      </h4>
                      {item.selectedColor && (
                        <p className="text-[10px] text-zinc-400">Color: {item.selectedColor}</p>
                      )}
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-sm font-mono font-bold text-[#00FF66]">
                          ${item.product.price}
                        </span>
                        <span className="text-[10px] text-zinc-500">each</span>
                      </div>
                    </div>

                    {/* Quantity controls & Remove */}
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center border border-zinc-700 bg-black rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:text-[#00FF66] text-zinc-400 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-mono text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:text-[#00FF66] text-zinc-400 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-zinc-500 hover:text-red-400 transition-colors p-1 cursor-pointer"
                        title="Remove product"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer & Checkout Calculations */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-zinc-800 bg-black/80 space-y-4">
              
              {/* Coupon input */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-400" />
                    <input
                      id="cart-coupon-input"
                      type="text"
                      placeholder="Discount code (e.g. NEON50)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full bg-zinc-950 text-white placeholder-zinc-500 text-xs pl-8 pr-3 py-2 rounded-xl border border-zinc-700 focus:border-[#00FF66] focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white border border-[#00FF66]/30 hover:border-[#00FF66] text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-red-400">{couponError}</p>}
                {couponSuccess && <p className="text-[11px] text-[#00FF66]">{couponSuccess}</p>}
                {discountPercentage > 0 && !couponSuccess && (
                  <p className="text-[11px] text-[#00FF66] flex items-center gap-1">
                    <Check className="w-3 h-3 text-[#00FF66]" /> Coupon applied: {couponCode || 'NEON50'} ({discountPercentage}% OFF)
                  </p>
                )}
              </form>

              {/* Price Calculation Breakdown */}
              <div className="space-y-2 text-xs border-t border-zinc-800 pt-3">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-white font-medium">${subtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#00FF66]">
                    <span>Discount ({discountPercentage}%)</span>
                    <span className="font-mono font-medium">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-400">
                  <span>Estimated Shipping</span>
                  <span className="font-mono text-white">
                    {shippingFee === 0 ? (
                      <span className="text-[#00FF66] font-semibold">FREE</span>
                    ) : (
                      `$${shippingFee.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-zinc-800">
                  <span>Total Due</span>
                  <span className="font-mono text-2xl text-[#00FF66] neon-text-glow font-black">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                id="cart-proceed-checkout-btn"
                onClick={onCheckout}
                className="w-full py-4 rounded-xl bg-[#00FF66] hover:bg-[#00e65c] text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,255,102,0.4)] hover:shadow-[0_0_35px_rgba(0,255,102,0.6)] transition-all cursor-pointer active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-zinc-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00FF66]" /> 256-Bit SSL Encrypted
                </span>
                <span>•</span>
                <span>2-Yr Official Warranty</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
