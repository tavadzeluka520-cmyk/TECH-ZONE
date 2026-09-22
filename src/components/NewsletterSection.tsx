import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, Shield, Send } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <section id="newsletter" className="py-20 bg-black text-white relative overflow-hidden border-t border-[#00FF66]/20">
      {/* Futuristic green ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00FF66]/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#00FF66_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl bg-[#080808]/90 border border-[#00FF66]/30 p-8 sm:p-14 shadow-[0_0_50px_rgba(0,255,102,0.12)] backdrop-blur-xl text-center">
          
          {/* Subtle neon green top accent line */}
          <div className="absolute top-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-[#00FF66] to-transparent shadow-[0_0_15px_#00FF66]" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66] text-xs font-mono font-bold tracking-wider uppercase mb-5 shadow-[0_0_15px_rgba(0,255,102,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#00FF66] animate-pulse" />
            EXCLUSIVE TECHZONE BRIEFING
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            Stay Ahead of <span className="text-[#00FF66] neon-text-glow">Technology</span>
          </h2>

          {/* Subtitle */}
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Subscribe to our weekly dispatch for early access to limited edition drops, exclusive VIP coupons, and deep architectural teardowns of newly announced hardware.
          </p>

          {/* Form */}
          {subscribed ? (
            <div className="mt-8 p-5 rounded-2xl bg-[#00FF66]/10 border border-[#00FF66]/40 max-w-md mx-auto animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-center gap-2 text-[#00FF66] font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-[#00FF66]" />
                You're officially on the VIP tech list!
              </div>
              <p className="text-xs text-zinc-400 mt-1">Check your inbox for a 15% welcome code: <span className="font-mono text-[#00FF66]">WELCOME15</span></p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                <div className="relative flex-1">
                  <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    id="newsletter-email-input"
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#050505] text-sm text-white placeholder-zinc-500 pl-11 pr-4 py-4 rounded-xl border border-[#00FF66]/30 focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] focus:shadow-[0_0_20px_rgba(0,255,102,0.3)] focus:outline-none transition-all"
                  />
                </div>
                <button
                  id="newsletter-subscribe-button"
                  type="submit"
                  className="px-8 py-4 rounded-xl bg-[#00FF66] hover:bg-[#00e65c] text-black font-extrabold text-sm uppercase tracking-wider transition-all duration-200 shadow-[0_0_25px_rgba(0,255,102,0.45)] hover:shadow-[0_0_35px_rgba(0,255,102,0.65)] hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Privacy note */}
          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-zinc-500">
            <Shield className="w-3.5 h-3.5 text-[#00FF66]" />
            <span>Zero spam. Guaranteed privacy. Unsubscribe at any time in 1 click.</span>
          </div>

        </div>
      </div>
    </section>
  );
};
