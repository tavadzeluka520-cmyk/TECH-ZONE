import React from 'react';
import { Globe2, MapPin, Phone, Sparkles, ChevronDown, Truck, ShieldCheck, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { UserProfile, SOLE_ADMIN_EMAIL } from '../types';
import { GoogleIcon } from './GoogleAuthModal';

interface TopCountryBarProps {
  onOpenAdmin?: () => void;
  onOpenAuth?: (mode?: 'register' | 'login') => void;
  currentUser?: UserProfile | null;
}

export const TopCountryBar: React.FC<TopCountryBarProps> = ({
  onOpenAdmin,
  onOpenAuth,
  currentUser,
}) => {
  const { currentCountry, currentLanguage, openCountryModal, t } = useLanguage();

  return (
    <div className="bg-[#030303] border-b border-zinc-800/80 text-zinc-300 text-[11px] font-mono select-none relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Left: Georgia Hotline & Palestine Solidarity Highlights */}
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] shadow-[0_0_8px_#00FF66] animate-pulse" />
            <span className="text-white font-bold">TECHZONE</span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <a 
              href="tel:+9955717890" 
              className="hover:text-[#00FF66] text-zinc-300 font-bold flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3 text-[#00FF66]" />
              <span>+995 571 78 90 🇬🇪</span>
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-zinc-400 shrink-0">
            <span className="text-zinc-700">|</span>
            <span className="flex items-center gap-1 hover:text-white transition-colors">
              <Truck className="w-3 h-3 text-[#00FF66]" />
              <span>{t('expressDeliveryGE', 'Georgia Express: 18-24h')}</span>
            </span>
            <span className="text-zinc-700">|</span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <span>🇵🇸</span>
              <span>{t('palestineSolidarity', 'Solidarity with Palestine')}</span>
            </span>
          </div>
        </div>

        {/* Right: Quick Admin Access, Google Registration & Country/Language Selectors */}
        <div className="flex items-center gap-1.5 sm:gap-2 ml-auto shrink-0 flex-wrap">
          {/* Prominent Admin Panel Quick Button */}
          {onOpenAdmin && (
            <button
              id="topbar-admin-panel-btn"
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/90 hover:bg-[#00FF66]/20 border border-[#00FF66]/50 hover:border-[#00FF66] text-[#00FF66] font-bold transition-all cursor-pointer shadow-[0_0_10px_rgba(0,255,102,0.2)] active:scale-95 group"
              title="TechZone Core Administrator Terminal (Luka Tavadze)"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#00FF66] group-hover:scale-110 transition-transform" />
              <span>Admin Panel</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-ping" />
            </button>
          )}

          {/* Prominent Google Registration / Sign In Button */}
          {currentUser ? (
            <button
              onClick={() => onOpenAuth?.('login')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200 hover:text-white hover:border-[#00FF66] transition-all cursor-pointer text-[11px]"
              title={`Logged in: ${currentUser.email}`}
            >
              <div className="w-3.5 h-3.5 rounded-full bg-[#00FF66]/20 text-[#00FF66] flex items-center justify-center font-bold text-[9px]">
                {currentUser.name.charAt(0)}
              </div>
              <span className="max-w-[100px] truncate">{currentUser.name.split(' ')[0]}</span>
              {currentUser.isAdmin && (
                <span className="text-[9px] px-1 py-0.2 bg-[#00FF66] text-black font-black rounded">ADMIN</span>
              )}
            </button>
          ) : (
            onOpenAuth && (
              <button
                id="topbar-google-register-btn"
                onClick={() => onOpenAuth('register')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white hover:bg-zinc-100 text-zinc-950 font-bold transition-all cursor-pointer shadow-[0_0_12px_rgba(255,255,255,0.2)] active:scale-95 group"
                title="Register with Google (+500 VIP Points)"
              >
                <GoogleIcon className="w-3.5 h-3.5" />
                <span className="font-extrabold tracking-tight">Google Register</span>
              </button>
            )
          )}

          {/* Country & Currency selector button */}
          <button
            id="topbar-country-selector-btn"
            onClick={openCountryModal}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-850 hover:border-[#00FF66]/60 text-white transition-all cursor-pointer group shadow-[0_0_8px_rgba(0,0,0,0.4)]"
            title="Select Shipping Country & Currency"
          >
            <span className="text-xs">{currentCountry.flag}</span>
            <span className="font-bold text-zinc-200 group-hover:text-[#00FF66]">
              {currentCountry.code} ({currentCountry.currencySymbol})
            </span>
            <ChevronDown className="w-3 h-3 text-zinc-500 group-hover:text-white" />
          </button>

          {/* All Languages selector button */}
          <button
            id="topbar-language-selector-btn"
            onClick={openCountryModal}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-[#00FF66]/30 hover:border-[#00FF66] text-white transition-all cursor-pointer group shadow-[0_0_10px_rgba(0,255,102,0.15)]"
            title="Select Interface Language (All Languages Supported)"
          >
            <Globe2 className="w-3.5 h-3.5 text-[#00FF66] group-hover:rotate-45 transition-transform" />
            <span className="font-bold text-zinc-200 group-hover:text-[#00FF66]">
              {currentLanguage.nativeName}
            </span>
            <span className="hidden xs:inline text-[9px] font-mono px-1 py-0.2 rounded bg-[#00FF66]/20 text-[#00FF66] font-bold">
              ALL
            </span>
            <ChevronDown className="w-3 h-3 text-zinc-500 group-hover:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
