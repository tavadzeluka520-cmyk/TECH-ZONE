import React, { useState } from 'react';
import { 
  X, 
  Globe2, 
  Search, 
  Check, 
  Sparkles, 
  Truck, 
  Coins, 
  MapPin, 
  Languages, 
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Country } from '../data/countries';

export const CountryLanguageModal: React.FC = () => {
  const { 
    isCountryModalOpen, 
    closeCountryModal, 
    currentCountry, 
    setCountry, 
    currentLanguage, 
    setLanguage, 
    supportedLanguages, 
    supportedCountries,
    formatPrice,
    t
  } = useLanguage();

  const [activeTab, setActiveTab] = useState<'country' | 'language'>('country');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isCountryModalOpen) return null;

  const filteredCountries = supportedCountries.filter((c) => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.localName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.currency.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectPreset = (countryCode: string, langCode: string) => {
    const foundCountry = supportedCountries.find((c) => c.code === countryCode);
    if (foundCountry) setCountry(foundCountry);
    setLanguage(langCode);
    closeCountryModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="country-language-modal"
        className="w-full max-w-2xl bg-[#080808] border border-[#00FF66]/40 rounded-3xl shadow-[0_0_50px_rgba(0,255,102,0.25)] flex flex-col max-h-[90vh] overflow-hidden relative"
      >
        {/* Top ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-20 bg-[#00FF66]/10 blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md flex items-center justify-between shrink-0 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-black border border-[#00FF66]/50 flex items-center justify-center text-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.3)]">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white font-mono uppercase tracking-wider flex items-center gap-2">
                <span>{t('regionalSettings', 'Regional & Language Settings')}</span>
              </h3>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Current: {currentCountry.flag} {currentCountry.name} ({currentCountry.currency}) • {currentLanguage.flag} {currentLanguage.nativeName}
              </p>
            </div>
          </div>

          <button
            onClick={closeCountryModal}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick 1-Click Regional Presets */}
        <div className="px-6 py-3 bg-black/60 border-b border-zinc-800/60 overflow-x-auto flex items-center gap-2 scrollbar-none shrink-0">
          <span className="text-[10px] font-mono font-bold uppercase text-zinc-500 shrink-0 flex items-center gap-1">
            <Zap className="w-3 h-3 text-[#00FF66]" />
            Quick:
          </span>
          <button
            onClick={() => handleSelectPreset('GE', 'ka')}
            className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-all border cursor-pointer flex items-center gap-1.5 ${
              currentCountry.code === 'GE' && currentLanguage.code === 'ka'
                ? 'bg-[#00FF66]/20 border-[#00FF66] text-[#00FF66]'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-[#00FF66]/50'
            }`}
          >
            <span>🇬🇪</span> საქართველო (GEL ₾)
          </button>

          <button
            onClick={() => handleSelectPreset('PS', 'ar')}
            className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-all border cursor-pointer flex items-center gap-1.5 ${
              currentCountry.code === 'PS' && currentLanguage.code === 'ar'
                ? 'bg-[#00FF66]/20 border-[#00FF66] text-[#00FF66]'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-[#00FF66]/50'
            }`}
          >
            <span>🇵🇸</span> فلسطين (العربية)
          </button>

          <button
            onClick={() => handleSelectPreset('US', 'en')}
            className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-all border cursor-pointer flex items-center gap-1.5 ${
              currentCountry.code === 'US' && currentLanguage.code === 'en'
                ? 'bg-[#00FF66]/20 border-[#00FF66] text-[#00FF66]'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-[#00FF66]/50'
            }`}
          >
            <span>🇺🇸</span> USA / Global (USD $)
          </button>

          <button
            onClick={() => handleSelectPreset('DE', 'de')}
            className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-all border cursor-pointer flex items-center gap-1.5 ${
              currentCountry.code === 'DE' && currentLanguage.code === 'de'
                ? 'bg-[#00FF66]/20 border-[#00FF66] text-[#00FF66]'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-[#00FF66]/50'
            }`}
          >
            <span>🇩🇪</span> Deutschland (EUR €)
          </button>

          <button
            onClick={() => handleSelectPreset('AE', 'ar')}
            className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-all border cursor-pointer flex items-center gap-1.5 ${
              currentCountry.code === 'AE' && currentLanguage.code === 'ar'
                ? 'bg-[#00FF66]/20 border-[#00FF66] text-[#00FF66]'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-[#00FF66]/50'
            }`}
          >
            <span>🇦🇪</span> UAE (AED د.إ)
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-zinc-800 bg-zinc-950 px-6 shrink-0">
          <button
            onClick={() => setActiveTab('country')}
            className={`py-3 px-4 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'country'
                ? 'border-[#00FF66] text-[#00FF66]'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Country & Currency ({currentCountry.code})</span>
          </button>

          <button
            onClick={() => setActiveTab('language')}
            className={`py-3 px-4 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'language'
                ? 'border-[#00FF66] text-[#00FF66]'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Languages className="w-3.5 h-3.5" />
            <span>All Languages ({supportedLanguages.length})</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'country' ? (
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder={t('searchCountry', 'Search country, city, or currency...')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-[#00FF66] text-white text-xs font-mono placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#00FF66]"
                />
              </div>

              {/* Live Preview Card of Currently Selected Destination */}
              <div className="p-4 rounded-2xl bg-zinc-950 border border-[#00FF66]/30 shadow-[0_0_20px_rgba(0,255,102,0.1)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{currentCountry.flag}</span>
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono">
                      {currentCountry.name} ({currentCountry.localName})
                    </h4>
                    <p className="text-xs text-zinc-400 font-mono flex items-center gap-1 mt-0.5">
                      <Truck className="w-3.5 h-3.5 text-[#00FF66]" />
                      <span>{currentCountry.deliveryEstimate}</span>
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right font-mono">
                  <div className="text-xs text-zinc-500">Live Currency Rate</div>
                  <div className="text-sm font-black text-[#00FF66]">
                    $100 USD ≈ {formatPrice(100)}
                  </div>
                </div>
              </div>

              {/* Countries Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {filteredCountries.map((country) => {
                  const isSelected = currentCountry.code === country.code;
                  return (
                    <button
                      key={country.code}
                      onClick={() => setCountry(country)}
                      className={`p-3 rounded-xl border text-left font-mono transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#00FF66]/15 border-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.2)]'
                          : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-xl shrink-0">{country.flag}</span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                            <span>{country.name}</span>
                            {country.code === 'GE' && (
                              <span className="text-[9px] px-1 py-0.2 rounded bg-[#00FF66]/20 text-[#00FF66] font-black">
                                HUB
                              </span>
                            )}
                            {country.code === 'PS' && (
                              <span className="text-[9px] px-1 py-0.2 rounded bg-zinc-800 text-white font-black">
                                🇵🇸 DIRECT
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-zinc-400 truncate">
                            {country.currency} ({country.currencySymbol}) • {country.localName}
                          </div>
                        </div>
                      </div>

                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-[#00FF66] text-black flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <span className="text-xs font-mono text-zinc-500">{country.currency}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-xs text-zinc-400 font-mono">
                Select your preferred language. The TechZone store interface and the TECHZONE AI System will converse with you in this language.
              </div>

              {/* Language Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {supportedLanguages.map((lang) => {
                  const isSelected = currentLanguage.code === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`p-3.5 rounded-2xl border text-left font-mono transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#00FF66]/15 border-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.2)]'
                          : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{lang.flag}</span>
                        <div>
                          <div className="text-sm font-bold text-white flex items-center gap-1.5">
                            <span>{lang.nativeName}</span>
                            {lang.dir === 'rtl' && (
                              <span className="text-[9px] px-1 py-0.2 rounded bg-zinc-800 text-zinc-400">
                                RTL
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-zinc-400">{lang.name}</div>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-[#00FF66] text-black flex items-center justify-center">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between shrink-0 font-mono text-xs">
          <div className="text-zinc-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#00FF66]" />
            <span>Automated real-time pricing & translations</span>
          </div>

          <button
            onClick={closeCountryModal}
            className="px-5 py-2.5 rounded-xl bg-[#00FF66] hover:bg-[#00e65c] text-black font-black uppercase tracking-wider cursor-pointer shadow-[0_0_15px_rgba(0,255,102,0.3)] transition-all active:scale-95"
          >
            {t('savePreferences', 'Save & Close')}
          </button>
        </div>
      </div>
    </div>
  );
};
