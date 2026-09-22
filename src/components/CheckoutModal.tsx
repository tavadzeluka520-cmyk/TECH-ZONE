import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle, 
  CreditCard, 
  ShieldCheck, 
  Truck, 
  Lock,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { CartItem, CheckoutFormData, UserProfile } from '../types';
import { GoogleIcon } from './GoogleAuthModal';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  discountPercentage: number;
  onOrderSuccess: (orderId: string) => void;
  currentUser?: UserProfile | null;
  onOpenAuth?: (mode?: 'register' | 'login') => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  discountPercentage,
  onOrderSuccess,
  currentUser,
  onOpenAuth,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    city: currentUser?.city || '',
    postalCode: currentUser?.postalCode || '',
    country: 'United States',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    notes: '',
  });

  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || currentUser.name,
        email: prev.email || currentUser.email,
        phone: prev.phone || currentUser.phone || '',
        address: prev.address || currentUser.address || '',
        city: prev.city || currentUser.city || '',
        postalCode: prev.postalCode || currentUser.postalCode || '',
      }));
    }
  }, [currentUser]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    date: string;
    total: number;
    items: CartItem[];
  } | null>(null);

  // Price calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 
    0
  );
  const discountAmount = (subtotal * discountPercentage) / 100;
  const isFreeShipping = subtotal >= 150 || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 15;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid email is required';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.postalCode.trim()) errs.postalCode = 'Postal code is required';

    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 15) {
        errs.cardNumber = 'Valid 16-digit card number required';
      }
      if (!formData.cardExpiry || !formData.cardExpiry.includes('/')) {
        errs.cardExpiry = 'MM/YY required';
      }
      if (!formData.cardCvc || formData.cardCvc.length < 3) {
        errs.cardCvc = '3-4 digit CVC required';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate payment gateway tokenization & processing
    setTimeout(() => {
      const generatedOrderId = `TZ-${Math.floor(100000 + Math.random() * 900000)}`;
      setIsSubmitting(false);
      setCompletedOrder({
        orderId: generatedOrderId,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        total: total,
        items: [...cartItems],
      });
      onOrderSuccess(generatedOrderId);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        id="checkout-modal-card"
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0a0a0a] border border-[#00FF66]/40 p-6 sm:p-10 shadow-[0_0_50px_rgba(0,255,102,0.18)] text-white my-auto backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        {!completedOrder && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-black hover:bg-zinc-900 text-zinc-400 hover:text-white border border-[#00FF66]/30 hover:border-[#00FF66] transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* ORDER CONFIRMATION VIEW */}
        {completedOrder ? (
          <div className="text-center py-6 space-y-6">
            <div className="w-20 h-20 rounded-full bg-[#00FF66]/20 border border-[#00FF66]/40 flex items-center justify-center mx-auto text-[#00FF66] shadow-[0_0_25px_rgba(0,255,102,0.4)]">
              <CheckCircle className="w-10 h-10 animate-bounce" />
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#00FF66]/15 text-[#00FF66] border border-[#00FF66]/30 text-xs font-mono font-bold mb-2">
                ORDER ID: #{completedOrder.orderId}
              </span>
              <h2 className="text-3xl font-black text-white uppercase tracking-tight">Payment Confirmed!</h2>
              <p className="text-zinc-300 text-sm mt-1 max-w-md mx-auto">
                Thank you, <strong className="text-white">{formData.fullName}</strong>. Your hardware is being prepared for immediate express shipment with GPS tracking.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="max-w-xl mx-auto rounded-2xl bg-black border border-[#00FF66]/30 p-5 text-left space-y-4 shadow-[0_0_20px_rgba(0,255,102,0.1)]">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 text-xs text-zinc-400">
                <span>Date: <strong className="text-white">{completedOrder.date}</strong></span>
                <span>Payment: <strong className="text-white uppercase">{formData.paymentMethod}</strong></span>
                <span>Status: <strong className="text-[#00FF66]">Verified & Dispatched</strong></span>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {completedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <span className="text-zinc-300">
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="font-mono text-white font-semibold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-800 pt-3 flex justify-between items-center text-sm font-bold">
                <span className="text-zinc-300">Total Charged:</span>
                <span className="text-2xl font-mono font-black text-[#00FF66] neon-text-glow">${completedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <button
                id="checkout-finish-btn"
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#00FF66] hover:bg-[#00e65c] text-black font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,255,102,0.4)] transition-all cursor-pointer"
              >
                Back to TechZone Store
              </button>
            </div>
          </div>
        ) : (
          /* CHECKOUT FORM VIEW */
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#00FF66] uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4 text-[#00FF66]" />
                <span>256-Bit Encrypted Secure Checkout</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Complete Your Order</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Please provide your delivery destination and select a secure payment method.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Contact & Address */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Contact Information */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#00FF66] text-black text-xs flex items-center justify-center font-mono font-bold">1</span>
                      Customer & Shipping Details
                    </h3>
                  </div>

                  {/* Google Status / One-Click Registration Banner */}
                  {currentUser ? (
                    <div className="mb-4 p-3 rounded-xl bg-zinc-950 border border-[#00FF66]/40 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-white shrink-0">
                          <GoogleIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white flex items-center gap-1.5">
                            Auto-filled from Google ({currentUser.name})
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF66]" />
                          </p>
                          <p className="text-[11px] text-zinc-400">{currentUser.email} • VIP Member</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[#00FF66] bg-[#00FF66]/10 px-2 py-0.5 rounded border border-[#00FF66]/30">
                        VERIFIED
                      </span>
                    </div>
                  ) : onOpenAuth ? (
                    <div className="mb-4 p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs text-zinc-300">
                        <GoogleIcon className="w-4 h-4 shrink-0" />
                        <span>Have a Google Account? Autofill in 1 click</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onOpenAuth('register')}
                        className="px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-zinc-900 font-bold text-xs cursor-pointer shrink-0 transition-colors"
                      >
                        Register with Google
                      </button>
                    </div>
                  ) : null}

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Full Name *</label>
                      <input
                        id="checkout-fullname"
                        type="text"
                        placeholder="e.g. Jordan Miller"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors"
                      />
                      {errors.fullName && <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1">Email Address *</label>
                        <input
                          id="checkout-email"
                          type="email"
                          placeholder="jordan@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors"
                        />
                        {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1">Phone Number *</label>
                        <input
                          id="checkout-phone"
                          type="tel"
                          placeholder="+1 (555) 234-5678"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors"
                        />
                        {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Delivery Address *</label>
                      <input
                        id="checkout-address"
                        type="text"
                        placeholder="742 Cyber Avenue, Suite 400"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors"
                      />
                      {errors.address && <p className="text-[11px] text-red-400 mt-1">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1">City *</label>
                        <input
                          id="checkout-city"
                          type="text"
                          placeholder="Seattle"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors"
                        />
                        {errors.city && <p className="text-[11px] text-red-400 mt-1">{errors.city}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1">Postal Code *</label>
                        <input
                          id="checkout-postal"
                          type="text"
                          placeholder="98101"
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                          className="w-full bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors"
                        />
                        {errors.postalCode && <p className="text-[11px] text-red-400 mt-1">{errors.postalCode}</p>}
                      </div>

                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs font-medium text-zinc-300 mb-1">Country</label>
                        <select
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="w-full bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Germany">Germany</option>
                          <option value="Japan">Japan</option>
                        </select>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Payment Method Selector */}
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#00FF66] text-black text-xs flex items-center justify-center font-mono font-bold">2</span>
                    Payment Method
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        formData.paymentMethod === 'card'
                          ? 'bg-black border-[#00FF66] text-white shadow-[0_0_10px_rgba(0,255,102,0.3)]'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-[#00FF66]" />
                      <span>Credit Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'apple_pay' })}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        formData.paymentMethod === 'apple_pay'
                          ? 'bg-black border-[#00FF66] text-white shadow-[0_0_10px_rgba(0,255,102,0.3)]'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span className="text-base font-bold"> Pay</span>
                      <span>Apple Pay</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'google_pay' })}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        formData.paymentMethod === 'google_pay'
                          ? 'bg-black border-[#00FF66] text-white shadow-[0_0_10px_rgba(0,255,102,0.3)]'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span className="text-base font-bold">G Pay</span>
                      <span>Google Pay</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'cash_on_delivery' })}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        formData.paymentMethod === 'cash_on_delivery'
                          ? 'bg-black border-[#00FF66] text-white shadow-[0_0_10px_rgba(0,255,102,0.3)]'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Truck className="w-5 h-5 text-[#00FF66]" />
                      <span>Cash on Delivery</span>
                    </button>
                  </div>

                  {/* Credit Card Input Fields */}
                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-3 p-4 rounded-2xl bg-black border border-zinc-800">
                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1">Card Number *</label>
                        <input
                          id="checkout-cardnumber"
                          type="text"
                          placeholder="4532 •••• •••• 8921"
                          maxLength={19}
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                          className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#00FF66] rounded-xl px-3.5 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none font-mono"
                        />
                        {errors.cardNumber && <p className="text-[11px] text-red-400 mt-1">{errors.cardNumber}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-zinc-300 mb-1">Expiry Date *</label>
                          <input
                            id="checkout-cardexpiry"
                            type="text"
                            placeholder="MM/YY"
                            maxLength={5}
                            value={formData.cardExpiry}
                            onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#00FF66] rounded-xl px-3.5 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none font-mono"
                          />
                          {errors.cardExpiry && <p className="text-[11px] text-red-400 mt-1">{errors.cardExpiry}</p>}
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-zinc-300 mb-1">Security Code (CVC) *</label>
                          <input
                            id="checkout-cardcvc"
                            type="password"
                            placeholder="123"
                            maxLength={4}
                            value={formData.cardCvc}
                            onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#00FF66] rounded-xl px-3.5 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none font-mono"
                          />
                          {errors.cardCvc && <p className="text-[11px] text-red-400 mt-1">{errors.cardCvc}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                </div>

              </div>

              {/* Right Column: Order Review & Submit */}
              <div className="lg:col-span-5 space-y-5">
                <div className="p-5 rounded-2xl bg-black border border-[#00FF66]/30 shadow-[0_0_20px_rgba(0,255,102,0.1)] space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-3 flex items-center justify-between">
                    <span>Order Summary</span>
                    <span className="text-xs text-[#00FF66] font-mono">{cartItems.length} Devices</span>
                  </h3>

                  <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="flex gap-3 items-center justify-between text-xs">
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-10 h-10 rounded-lg object-cover bg-zinc-900 shrink-0 border border-zinc-800"
                          />
                          <div className="truncate">
                            <p className="font-semibold text-white truncate">{item.product.name}</p>
                            <p className="text-[10px] text-zinc-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-mono text-white font-medium shrink-0">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-zinc-800 pt-3 space-y-2 text-xs">
                    <div className="flex justify-between text-zinc-400">
                      <span>Subtotal</span>
                      <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-[#00FF66]">
                        <span>Discount ({discountPercentage}%)</span>
                        <span className="font-mono font-medium">-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-zinc-400">
                      <span>Shipping</span>
                      <span className="font-mono text-white">
                        {shippingFee === 0 ? <span className="text-[#00FF66] font-semibold">FREE</span> : `$${shippingFee.toFixed(2)}`}
                      </span>
                    </div>

                    <div className="border-t border-zinc-800 pt-2 flex justify-between items-baseline text-base font-bold text-white">
                      <span>Total Amount</span>
                      <span className="font-mono text-2xl text-[#00FF66] neon-text-glow font-black">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <button
                    id="submit-order-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-[#00FF66] hover:bg-[#00e65c] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,102,0.4)] transition-all cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span>Processing Transaction...</span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Authorize & Place Order</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00FF66]" />
                    <span>Includes 2-Year Official Warranty Guarantee</span>
                  </div>

                </div>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
