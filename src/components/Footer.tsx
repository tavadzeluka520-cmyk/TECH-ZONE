import React from 'react';
import { 
  Zap, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  ArrowUp,
  CreditCard,
  Lock,
  Clock,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { GoogleIcon } from './GoogleAuthModal';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAi?: () => void;
  onOpenAdmin?: () => void;
  onOpenAuth?: (mode?: 'register' | 'login') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAi, onOpenAdmin, onOpenAuth }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#050505] text-white border-t border-[#00FF66]/20 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-[#00FF66]/5 blur-[160px] pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* TechZone Branding */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black border border-[#00FF66]/50 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,102,0.35)]">
                <Zap className="w-5 h-5 text-[#00FF66] fill-[#00FF66]" />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-black tracking-tight text-white font-mono">TECH</span>
                <span className="text-2xl font-black tracking-tight text-[#00FF66] font-mono neon-text-glow">ZONE</span>
              </div>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              The premier destination for futuristic, high-performance electronics. Discover cutting-edge smartphones, RTX laptops, pro gaming controllers, and audio gear built for tomorrow.
            </p>

            {/* Social Media Icons */}
            <div className="pt-2">
              <span className="text-xs uppercase font-mono tracking-wider text-zinc-400 font-bold block mb-3">
                Connect With Us
              </span>
              <div className="flex items-center gap-3">
                {/* Twitter / X */}
                <a
                  href="#twitter"
                  className="w-10 h-10 rounded-xl bg-black border border-zinc-800 hover:border-[#00FF66] hover:text-[#00FF66] flex items-center justify-center transition-all shadow-sm hover:shadow-[0_0_15px_rgba(0,255,102,0.3)] text-zinc-400"
                  aria-label="TechZone on X"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                {/* YouTube */}
                <a
                  href="#youtube"
                  className="w-10 h-10 rounded-xl bg-black border border-zinc-800 hover:border-[#00FF66] hover:text-[#00FF66] flex items-center justify-center transition-all shadow-sm hover:shadow-[0_0_15px_rgba(0,255,102,0.3)] text-zinc-400"
                  aria-label="TechZone YouTube Channel"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                {/* Discord / Gaming */}
                <a
                  href="#discord"
                  className="w-10 h-10 rounded-xl bg-black border border-zinc-800 hover:border-[#00FF66] hover:text-[#00FF66] flex items-center justify-center transition-all shadow-sm hover:shadow-[0_0_15px_rgba(0,255,102,0.3)] text-zinc-400"
                  aria-label="TechZone Discord Gaming Community"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </a>
                {/* GitHub */}
                <a
                  href="#github"
                  className="w-10 h-10 rounded-xl bg-black border border-zinc-800 hover:border-[#00FF66] hover:text-[#00FF66] flex items-center justify-center transition-all shadow-sm hover:shadow-[0_0_15px_rgba(0,255,102,0.3)] text-zinc-400"
                  aria-label="TechZone GitHub Organization"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66]" />
              Navigation
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-[#00FF66] transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#00FF66] transition-colors cursor-pointer text-left">
                  About Luka & Production
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-[#00FF66] transition-colors cursor-pointer">
                  Products & Catalog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-[#00FF66] transition-colors cursor-pointer">
                  Hardware Categories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('special-offers')} className="hover:text-[#00FF66] transition-colors cursor-pointer">
                  Special Flash Deals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reviews')} className="hover:text-[#00FF66] transition-colors cursor-pointer">
                  Customer Happiness Reviews
                </button>
              </li>
              {onOpenAi && (
                <li>
                  <button onClick={onOpenAi} className="text-[#00FF66] font-bold hover:underline flex items-center gap-1.5 cursor-pointer">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
                    TECHZONE AI System (Chat)
                  </button>
                </li>
              )}
              {onOpenAdmin && (
                <li>
                  <button 
                    onClick={onOpenAdmin} 
                    className="text-[#00FF66] font-mono font-bold hover:underline flex items-center gap-1.5 cursor-pointer bg-[#00FF66]/10 px-2 py-1 rounded-lg border border-[#00FF66]/40"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#00FF66]" />
                    <span>Admin Panel (Luka Tavadze)</span>
                  </button>
                </li>
              )}
              {onOpenAuth && (
                <li>
                  <button 
                    onClick={() => onOpenAuth('register')} 
                    className="text-white hover:text-[#00FF66] font-medium flex items-center gap-1.5 cursor-pointer"
                  >
                    <GoogleIcon className="w-3.5 h-3.5" />
                    <span>Register with Google (VIP)</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Customer Service Links */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66]" />
              Regional & Global Service
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex items-center gap-2 hover:text-[#00FF66] cursor-pointer transition-colors">
                <span>🇬🇪</span> Georgia Express 24h Courier
              </li>
              <li className="flex items-center gap-2 hover:text-[#00FF66] cursor-pointer transition-colors">
                <span>🇵🇸</span> Palestine Direct International Shipping
              </li>
              <li className="hover:text-[#00FF66] cursor-pointer transition-colors">
                2-Year Official Warranty Claims
              </li>
              <li className="hover:text-[#00FF66] cursor-pointer transition-colors">
                30-Day Hassle-Free Hardware Returns
              </li>
              <li className="hover:text-[#00FF66] cursor-pointer transition-colors">
                Factory Sealed Benchmark Certification
              </li>
              <li className="hover:text-[#00FF66] cursor-pointer transition-colors">
                Direct Contact with Founder Luka Tavadze
              </li>
            </ul>
          </div>

          {/* Contact & Hours Info */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66]" />
              Direct Support
            </h3>
            <div className="space-y-3 text-xs text-zinc-400">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#00FF66] shrink-0 mt-0.5" />
                <a href="tel:+9955717890" className="hover:text-[#00FF66] font-mono font-bold text-white transition-colors">
                  +995 571 78 90 🇬🇪
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#00FF66] shrink-0 mt-0.5" />
                <a href="mailto:tavadzeluka520@gmail.com" className="hover:text-[#00FF66] text-zinc-300 font-mono transition-colors break-all">
                  tavadzeluka520@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#00FF66] shrink-0 mt-0.5" />
                <span>Tbilisi, Georgia 🇬🇪</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#00FF66] shrink-0 mt-0.5" />
                <span>24/7 Hotline Live</span>
              </div>
            </div>

            {/* Palestine Solidarity Badge */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-mono">
                <span>🇵🇸</span>
                <span className="text-white font-bold">Solidarity with Palestine</span>
              </div>
            </div>
          </div>

        </div>

        {/* Security & Payment Badges row */}
        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <Lock className="w-3.5 h-3.5 text-[#00FF66]" /> 256-Bit SSL Encrypted
            </span>
            <span className="flex items-center gap-1.5 text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00FF66]" /> Verified Authentic Hardware
            </span>
            <span className="flex items-center gap-1.5 text-zinc-400">
              <CreditCard className="w-3.5 h-3.5 text-[#00FF66]" /> Apple Pay, Google Pay, Visa & MC
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-[#00FF66] transition-colors cursor-pointer"
            aria-label="Scroll to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Copyright Information */}
        <div className="mt-6 pt-6 border-t border-zinc-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <p>
            © {new Date().getFullYear()} TechZone Electronics, Inc. All rights reserved. Built with electric performance.
          </p>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-[#00FF66] transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-[#00FF66] transition-colors">Terms of Service</a>
            <a href="#compliance" className="hover:text-[#00FF66] transition-colors">Hardware Compliance</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
