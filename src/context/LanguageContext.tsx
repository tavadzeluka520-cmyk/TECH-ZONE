import React, { createContext, useContext, useState, useEffect } from 'react';
import { COUNTRIES_DATA, Country, DEFAULT_COUNTRY } from '../data/countries';
import { SUPPORTED_LANGUAGES, LanguageOption, TRANSLATIONS } from '../data/translations';

interface LanguageContextType {
  currentLanguage: LanguageOption;
  setLanguage: (code: string) => void;
  currentCountry: Country;
  setCountry: (country: Country) => void;
  formatPrice: (priceInUSD: number) => string;
  t: (key: string, defaultVal?: string) => string;
  isCountryModalOpen: boolean;
  openCountryModal: () => void;
  closeCountryModal: () => void;
  supportedLanguages: LanguageOption[];
  supportedCountries: Country[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize language from localStorage or default to Georgian (or English)
  const [currentLanguage, setCurrentLanguageState] = useState<LanguageOption>(() => {
    try {
      const savedCode = localStorage.getItem('techzone_language');
      if (savedCode) {
        const found = SUPPORTED_LANGUAGES.find((l) => l.code === savedCode);
        if (found) return found;
      }
    } catch {
      // fallback
    }
    // Default to Georgian ('ka') or English ('en')
    return SUPPORTED_LANGUAGES[0]; // Georgian 🇬🇪
  });

  // Initialize country from localStorage or default to Georgia
  const [currentCountry, setCurrentCountryState] = useState<Country>(() => {
    try {
      const savedCode = localStorage.getItem('techzone_country');
      if (savedCode) {
        const found = COUNTRIES_DATA.find((c) => c.code === savedCode);
        if (found) return found;
      }
    } catch {
      // fallback
    }
    return DEFAULT_COUNTRY; // Georgia 🇬🇪
  });

  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);

  const setLanguage = (code: string) => {
    const found = SUPPORTED_LANGUAGES.find((l) => l.code === code);
    if (found) {
      setCurrentLanguageState(found);
      try {
        localStorage.setItem('techzone_language', found.code);
      } catch {
        // ignore
      }
    }
  };

  const setCountry = (country: Country) => {
    setCurrentCountryState(country);
    try {
      localStorage.setItem('techzone_country', country.code);
    } catch {
      // ignore
    }
  };

  // Keep HTML lang & direction in sync (e.g., RTL for Arabic)
  useEffect(() => {
    document.documentElement.lang = currentLanguage.code;
    document.documentElement.dir = currentLanguage.dir || 'ltr';
  }, [currentLanguage]);

  // Format price using currently selected country currency and exchange rate
  const formatPrice = (priceInUSD: number): string => {
    const converted = priceInUSD * currentCountry.rateToUSD;
    const rounded = Math.round(converted);
    const formattedNum = rounded.toLocaleString();

    // Specific symbol placements
    if (currentCountry.currency === 'GEL') {
      return `${formattedNum} ₾`;
    }
    if (currentCountry.currency === 'USD') {
      return `$${formattedNum}`;
    }
    if (currentCountry.currency === 'EUR') {
      return `€${formattedNum}`;
    }
    if (currentCountry.currency === 'GBP') {
      return `£${formattedNum}`;
    }
    if (currentCountry.currency === 'TRY') {
      return `${formattedNum} ₺`;
    }
    if (currentCountry.currency === 'UAH') {
      return `${formattedNum} ₴`;
    }
    if (currentCountry.currency === 'AED') {
      return `${formattedNum} د.إ`;
    }
    if (currentCountry.currency === 'JPY') {
      return `¥${formattedNum}`;
    }
    return `${currentCountry.currencySymbol}${formattedNum}`;
  };

  // Translation lookup with fallback to English then defaultVal then key
  const t = (key: string, defaultVal?: string): string => {
    const langDictionary = TRANSLATIONS[currentLanguage.code];
    if (langDictionary && langDictionary[key]) {
      return langDictionary[key];
    }
    const enDictionary = TRANSLATIONS['en'];
    if (enDictionary && enDictionary[key]) {
      return enDictionary[key];
    }
    return defaultVal || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        currentCountry,
        setCountry,
        formatPrice,
        t,
        isCountryModalOpen,
        openCountryModal: () => setIsCountryModalOpen(true),
        closeCountryModal: () => setIsCountryModalOpen(false),
        supportedLanguages: SUPPORTED_LANGUAGES,
        supportedCountries: COUNTRIES_DATA,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
