import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Tag, 
  ExternalLink,
  ChevronDown,
  Minimize2,
  Maximize2,
  Copy,
  Check,
  Zap,
  Globe2
} from 'lucide-react';
import { ChatMessage, SOLE_ADMIN_NAME, SOLE_ADMIN_EMAIL } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { GoogleIcon } from './GoogleAuthModal';

interface TechZoneAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (sectionId: string) => void;
  onOpenAdmin?: () => void;
  onOpenAuth?: (mode?: 'register' | 'login') => void;
}

const getInitialGreeting = (langCode: string, adminName: string): ChatMessage => {
  if (langCode === 'ka') {
    return {
      id: 'msg-init-1',
      role: 'model',
      text: `⚡ **TECHZONE AI სისტემა ონლაინ რეჟიმშია**\n\nმოგესალმებით **TechZone**-ში! მე ვარ თქვენი კიბერ ტექნიკური მრჩეველი, რომელიც პირდაპირ კავშირშია დამფუძნებელ **${adminName}**-თან.\n\nშეგიძლიათ მკითხოთ ნებისმიერ ენაზე:\n• 💻 **ლეპტოპები, ტელეფონები, მონიტორები და გეიმინგ აღჭურვილობა**\n• 🇬🇪 **საქართველოს მხარდაჭერა და მიწოდება**: **+995 571 78 90** (18-24 სთ)\n• 🇵🇸 **სოლიდარობა და პირდაპირი მიწოდება პალესტინაში**\n• 🎁 **ფასდაკლების პრომო კოდები** (მაგ. **NEON50**, **TECH20**)\n• 🛡️ **2-წლიანი ოფიციალური ქარხნული გარანტია და 0 მკვდარი პიქსელი**`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'gemini-3.8-flash',
    };
  }

  if (langCode === 'ar') {
    return {
      id: 'msg-init-1',
      role: 'model',
      text: `⚡ **نظام TECHZONE للذكاء الاصطناعي متصل الآن**\n\nأهلاً بك في **TechZone**! أنا مساعدك التقني المتطور، بإشراف المؤسس والمسؤول **${adminName}**.\n\nتفضل بالسؤال حول:\n• 💻 **أحدث الحواسيب المحمولة والهواتف والشاشات**\n• 🇬🇪 **الدعم المباشر**: **90 78 571 995+**\n• 🇵🇸 **الشحن المباشر إلى فلسطين الحبيبة والتضامن الكامل**\n• 🎁 **أكواد الخصم الفعالة**: **NEON50** (خصم $50) أو **TECH20**\n• 🛡️ **ضمان مصنعي رسمي لمدة عامين كاملين**`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'gemini-3.8-flash',
    };
  }

  return {
    id: 'msg-init-1',
    role: 'model',
    text: `⚡ **TECHZONE AI SYSTEM ONLINE**\n\nWelcome to **TechZone**! I am your cyber hardware intelligence advisor, directly synced with founder **${adminName}** and our global hardware catalog.\n\nAsk me anything in any language:\n• 💻 **Hardware Recommendations** (Laptops, Desktops, Phones, Monitors)\n• 🇬🇪 **Georgia Direct Support** (+995 571 78 90)\n• 🇵🇸 **Palestine Shipping & Solidarity**\n• 🎁 **Active Discount Codes** (e.g., NEON50, TECH20)\n• 🛡️ **2-Year Official Factory Warranty & Quality Standards**`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    source: 'gemini-3.8-flash',
  };
};

const getSuggestedQueries = (langCode: string) => {
  if (langCode === 'ka') {
    return [
      { label: '🇬🇪 საქართველოს ცხელი ხაზი და მიწოდება', query: 'რა არის საქართველოს მხარდაჭერის ნომერი და რამდენ ხანში ხდება მიწოდება?' },
      { label: '🔥 საუკეთესო გეიმინგ ლეპტოპი', query: 'რომელია თქვენი საუკეთესო გეიმინგ ლეპტოპი და რა მონაცემები აქვს?' },
      { label: '🎁 აქტიური ფასდაკლების კოდები', query: 'რა პრომო კოდები და ფასდაკლებები გაქვთ ამჟამად?' },
      { label: '📱 ApexPhone 16 Pro Max მახასიათებლები', query: 'მომიყევი ApexPhone 16 Pro Titanium Max-ის კამერებზე და ფასზე.' },
      { label: '🇵🇸 პალესტინაში მიწოდების პირობები', query: 'როგორ აწვდით ტექნიკას პალესტინაში?' },
      { label: '👤 ვინ არის ლუკა თავაძე?', query: 'ვინ არის ლუკა თავაძე და რა როლი აქვს TechZone-ში?' },
      { label: '🛡️ 2-წლიანი ქარხნული გარანტია', query: 'რას ფარავს 2-წლიანი ოფიციალური გარანტია?' },
    ];
  }
  if (langCode === 'ar') {
    return [
      { label: '🇵🇸 الشحن المباشر إلى فلسطين', query: 'هل توفرون الشحن المباشر إلى فلسطين وكيف يتم ذلك؟' },
      { label: '💻 أقوى حاسوب ألعاب محمول', query: 'ما هو أقوى حاسوب محمول للألعاب وما هي مواصفاته؟' },
      { label: '🎁 أكواد الخصم النشطة', query: 'ما هي أكواد الخصم النشطة حالياً مثل NEON50؟' },
      { label: '📱 مواصفات ApexPhone 16 Pro', query: 'ما هي مواصفات وسعر هاتف ApexPhone 16 Pro Max؟' },
      { label: '🇬🇪 الخط الساخن لدعم جورجيا', query: 'ما هو رقم الهاتف المباشر للدعم وخدمة العملاء؟' },
    ];
  }
  return [
    { label: '🔥 Best gaming laptop under $2,500?', query: 'What is your best gaming laptop under $2,500 and what are the specs?' },
    { label: '🇬🇪 Georgia hotline & delivery time', query: 'What is the Georgia support hotline number and how fast is delivery?' },
    { label: '🇵🇸 Shipping to Palestine info', query: 'Do you ship to Palestine and how does delivery work?' },
    { label: '🎁 Any active discount coupons?', query: 'What active promo codes or discounts are available right now?' },
    { label: '📱 ApexPhone 16 Pro Max specs', query: 'Tell me about the ApexPhone 16 Pro Titanium Max features, cameras, and price.' },
    { label: '🛡️ What does the 2-Year Warranty cover?', query: 'Explain TechZone 2-year warranty and return policy.' },
    { label: '👤 Who is Luka Tavadze?', query: 'Who is Luka Tavadze and what is his role at TechZone?' },
  ];
};

export const TechZoneAiModal: React.FC<TechZoneAiModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenAdmin,
  onOpenAuth,
}) => {
  const { currentLanguage, currentCountry, openCountryModal, t } = useLanguage();

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('techzone_ai_messages');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return [getInitialGreeting(currentLanguage.code, SOLE_ADMIN_NAME)];
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  // Persist messages
  useEffect(() => {
    try {
      localStorage.setItem('techzone_ai_messages', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2000);
  };

  const handleClearHistory = () => {
    setMessages([getInitialGreeting(currentLanguage.code, SOLE_ADMIN_NAME)]);
    try {
      localStorage.removeItem('techzone_ai_messages');
    } catch {
      // ignore
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Send message to server-side Gemini endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          userLanguage: currentLanguage.code,
          userLanguageName: currentLanguage.name,
          userCountry: currentCountry.name,
          userCountryCode: currentCountry.code,
          userCurrency: currentCountry.currency,
          history: newMessages.slice(-6).map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.reply || 'Hardware computing error. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source || 'gemini-3.8-flash',
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      // Fallback assistant response
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: `⚡ **TECHZONE AI SYSTEM**\n\nI encountered a transient network connection event, but I am still here to help! \n\n• For immediate orders in Georgia, dial **+995 571 78 90** 🇬🇪\n• For founder inquiries, email **${SOLE_ADMIN_EMAIL}** (Luka Tavadze)\n• Use discount code **NEON50** for $50 OFF any order over $300!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'techzone-expert-engine',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Helper to render formatted text (bold, bullet points, highlighted keywords)
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');

    return lines.map((line, lineIdx) => {
      // Empty line
      if (!line.trim()) {
        return <div key={lineIdx} className="h-2" />;
      }

      // Check if bullet point
      const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-') || /^\d+\./.test(line.trim());

      // Parse bold **text** within the line
      const parts = line.split(/(\*\*.*?\*\*)/g);

      return (
        <div key={lineIdx} className={`${isBullet ? 'pl-3 relative my-0.5' : 'my-0.5'}`}>
          {isBullet && (
            <span className="text-[#00FF66] font-mono mr-1.5 select-none">•</span>
          )}
          {parts.map((part, partIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              const inner = part.slice(2, -2);
              return (
                <strong key={partIdx} className="text-[#00FF66] font-bold">
                  {inner}
                </strong>
              );
            }
            return <span key={partIdx}>{part.replace(/^[•\-]\s*/, '')}</span>;
          })}
        </div>
      );
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300">
      <div 
        id="techzone-ai-modal"
        className={`w-full ${
          isExpanded ? 'sm:max-w-4xl sm:h-[90vh]' : 'sm:max-w-2xl sm:h-[650px]'
        } h-[92vh] sm:rounded-3xl bg-[#060606] border border-[#00FF66]/40 shadow-[0_0_50px_rgba(0,255,102,0.25)] flex flex-col overflow-hidden relative transition-all duration-300`}
      >
        {/* Top ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-[#00FF66]/10 blur-3xl pointer-events-none" />

        {/* AI System Header */}
        <div className="px-5 py-4 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md flex items-center justify-between shrink-0 relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-black border-2 border-[#00FF66] flex items-center justify-center text-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.4)]">
                <Bot className="w-6 h-6 animate-pulse" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#00FF66] border-2 border-black flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white font-mono uppercase tracking-wider">
                  TECHZONE <span className="text-[#00FF66] neon-text-glow">AI SYSTEM</span>
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/40">
                  ONLINE
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono mt-0.5 flex items-center gap-1.5">
                <span>Gemini 3.8 Flash Engine</span>
                <span className="text-zinc-600">•</span>
                <span>Direct Store Support</span>
              </p>
            </div>
          </div>

          {/* Top Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Direct Country & Language switcher button inside AI modal */}
            <button
              onClick={openCountryModal}
              title="Change Country & Language"
              className="px-2.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-[#00FF66]/50 text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono"
            >
              <span>{currentCountry.flag}</span>
              <span className="hidden sm:inline text-zinc-300 font-bold">{currentLanguage.nativeName}</span>
              <Globe2 className="w-3.5 h-3.5 text-[#00FF66]" />
            </button>

            <button
              onClick={handleClearHistory}
              title="Clear conversation"
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? 'Restore size' : 'Expand window'}
              className="hidden sm:flex p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              title="Close AI Assistant"
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-red-500/50 hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips Bar */}
        <div className="px-4 py-2.5 bg-black/60 border-b border-zinc-800/60 overflow-x-auto flex items-center gap-2 scrollbar-none shrink-0 z-10">
          <span className="text-[10px] font-mono font-bold uppercase text-zinc-500 shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#00FF66]" />
            {t('suggestions', 'Suggestions')}:
          </span>

          {/* Quick Direct Admin Panel Launch */}
          {onOpenAdmin && (
            <button
              onClick={() => {
                onClose();
                onOpenAdmin();
              }}
              className="px-3 py-1 rounded-full bg-[#00FF66]/15 hover:bg-[#00FF66]/25 border border-[#00FF66] text-[#00FF66] text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,255,102,0.2)]"
              title="Open Admin Console for Luka Tavadze"
            >
              <ShieldCheck className="w-3 h-3 text-[#00FF66]" />
              <span>Admin Panel</span>
            </button>
          )}

          {/* Quick Direct Google Register Launch */}
          {onOpenAuth && (
            <button
              onClick={() => {
                onClose();
                onOpenAuth('register');
              }}
              className="px-3 py-1 rounded-full bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-mono font-extrabold whitespace-nowrap transition-all cursor-pointer shrink-0 flex items-center gap-1.5 shadow-[0_0_10px_rgba(255,255,255,0.2)]"
              title="Register with Google"
            >
              <GoogleIcon className="w-3 h-3" />
              <span>Google Register</span>
            </button>
          )}

          {getSuggestedQueries(currentLanguage.code).map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(item.query)}
              disabled={isLoading}
              className="px-3 py-1 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-[#00FF66]/50 text-zinc-300 hover:text-[#00FF66] text-xs font-mono whitespace-nowrap transition-all cursor-pointer shrink-0 disabled:opacity-50"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              {/* Sender Name & Timestamp */}
              <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] font-mono text-zinc-500">
                {msg.role === 'user' ? (
                  <>
                    <span>{msg.timestamp}</span>
                    <span className="text-zinc-400 font-bold">You</span>
                  </>
                ) : (
                  <>
                    <span className="text-[#00FF66] font-bold flex items-center gap-1">
                      <Zap className="w-3 h-3" /> TECHZONE AI
                    </span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </>
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#00FF66]/15 border border-[#00FF66]/40 text-white rounded-tr-sm shadow-[0_0_20px_rgba(0,255,102,0.1)]'
                    : 'bg-[#0d0d0d] border border-zinc-800/90 text-zinc-200 rounded-tl-sm shadow-[0_0_25px_rgba(0,0,0,0.6)]'
                }`}
              >
                {renderFormattedText(msg.text)}

                {/* Interactive Action Shortcuts if message references coupons or hotline */}
                {msg.role === 'model' && (
                  <div className="mt-3 pt-3 border-t border-zinc-800/80 flex flex-wrap gap-2 text-xs">
                    {msg.text.includes('NEON50') && (
                      <button
                        onClick={() => handleCopyCoupon('NEON50')}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black border border-[#00FF66]/40 hover:border-[#00FF66] text-[#00FF66] font-mono text-[11px] font-bold cursor-pointer"
                      >
                        {copiedCoupon === 'NEON50' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        Copy Coupon: NEON50 ($50 OFF)
                      </button>
                    )}

                    {msg.text.includes('+995 571 78 90') && (
                      <a
                        href="tel:+9955717890"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black border border-[#00FF66]/40 hover:border-[#00FF66] text-[#00FF66] font-mono text-[11px] font-bold"
                      >
                        <Phone className="w-3 h-3" />
                        Call Georgia Direct (+995 571 78 90)
                      </a>
                    )}

                    {msg.text.includes('Palestine') && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-300 font-mono text-[11px]">
                        <span>🇵🇸</span> Worldwide & Palestine Shipping
                      </span>
                    )}

                    {onNavigate && (
                      <button
                        onClick={() => {
                          onNavigate('products');
                          onClose();
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white font-mono text-[11px] cursor-pointer"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Browse Catalog
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Loading Typing Indicator */}
          {isLoading && (
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] font-mono text-[#00FF66]">
                <Zap className="w-3 h-3 animate-spin" />
                <span>TECHZONE AI COMPUTING...</span>
              </div>
              <div className="rounded-2xl rounded-tl-sm p-4 bg-[#0d0d0d] border border-[#00FF66]/30 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-xs font-mono text-zinc-400 ml-1">
                  Querying hardware neural engine...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar & Actions */}
        <div className="p-3 sm:p-4 bg-zinc-950 border-t border-zinc-800 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask TechZone AI about specs, pricing, Georgia hotline, Palestine shipping..."
                disabled={isLoading}
                className="w-full py-3 pl-4 pr-10 rounded-2xl bg-black border border-zinc-800 focus:border-[#00FF66] focus:outline-none focus:ring-1 focus:ring-[#00FF66] text-white text-xs sm:text-sm placeholder-zinc-500 font-mono transition-all disabled:opacity-50"
              />
              {inputMessage && (
                <button
                  type="button"
                  onClick={() => setInputMessage('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="py-3 px-5 rounded-2xl bg-[#00FF66] hover:bg-[#00e65c] text-black font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(0,255,102,0.3)] transition-all cursor-pointer active:scale-95 disabled:opacity-40 disabled:pointer-events-none shrink-0"
            >
              <span>SEND</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Footer Hotline & Info Note */}
          <div className="mt-2.5 flex flex-wrap items-center justify-between text-[11px] font-mono text-zinc-500 px-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00FF66]" />
              Official TechZone Neural Assistant
            </span>
            <span className="flex items-center gap-1.5">
              <span>Georgia Hotline:</span>
              <a href="tel:+9955717890" className="text-[#00FF66] font-bold hover:underline">
                +995 571 78 90 🇬🇪
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
