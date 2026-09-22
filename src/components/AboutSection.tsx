import React from 'react';
import { 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Cpu, 
  Heart, 
  CheckCircle2, 
  Award,
  Globe2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SOLE_ADMIN_EMAIL, SOLE_ADMIN_NAME } from '../types';

interface AboutSectionProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate, onOpenAdmin }) => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-black via-zinc-950 to-black text-white relative border-b border-[#00FF66]/15 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#00FF66]/5 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#00FF66]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66] text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(0,255,102,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#00FF66]" />
            FOUNDER STORY & PRODUCTION PHILOSOPHY
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            ABOUT TECHZONE & <span className="text-[#00FF66] neon-text-glow">{SOLE_ADMIN_NAME.toUpperCase()}</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-3 leading-relaxed">
            Crafting futuristic hardware, uncompromised electronic production, and delivering worldwide across Georgia 🇬🇪 and Palestine 🇵🇸.
          </p>
        </div>

        {/* Top Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Founder Bio Card */}
          <div className="lg:col-span-7 rounded-3xl bg-[#080808]/90 border border-[#00FF66]/30 p-8 sm:p-10 backdrop-blur-xl shadow-[0_0_35px_rgba(0,255,102,0.12)] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#00FF66]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6">
              {/* Founder Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-black border-2 border-[#00FF66] flex items-center justify-center text-[#00FF66] font-black text-2xl shadow-[0_0_20px_rgba(0,255,102,0.4)]">
                    LT
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-black text-white">{SOLE_ADMIN_NAME}</h3>
                      <ShieldCheck className="w-5 h-5 text-[#00FF66]" />
                    </div>
                    <p className="text-xs font-mono font-semibold text-[#00FF66] tracking-wider uppercase mt-0.5">
                      Sole Administrator & Hardware Curator
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black border border-[#00FF66]/40 text-[#00FF66] text-xs font-mono font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
                  ONLINE IN GEORGIA 🇬🇪
                </div>
              </div>

              {/* Founder Narrative */}
              <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Welcome to <strong className="text-white">TechZone</strong>. I founded this store with one uncompromising vision: to bring next-generation, high-performance electronics directly to creators, gamers, and tech enthusiasts without the middlemen, counterfeits, or hyper-inflated retail margins.
                </p>
                <p>
                  As the <span className="text-[#00FF66] font-semibold">Sole Administrator</span>, I personally oversee our product curation, factory testing, and pricing. Every phone, laptop, monitor, and mechanical keyboard in our store is selected for maximum reliability, military-grade thermal endurance, and benchmark-leading speed.
                </p>
                <p className="text-zinc-400 text-sm">
                  Whether you are ordering from <strong className="text-white">Georgia 🇬🇪</strong> or receiving international delivery in <strong className="text-white">Palestine 🇵🇸</strong>, you get factory-sealed gear, full 2-year warranty coverage, and direct access to my support team.
                </p>
              </div>

              {/* Direct Connect Quick Action */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href="tel:+9955717890"
                  className="flex items-center gap-3 p-3 rounded-xl bg-black border border-[#00FF66]/40 hover:border-[#00FF66] hover:bg-zinc-950 transition-all text-white group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#00FF66]/15 text-[#00FF66] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-zinc-400 uppercase block">Georgia Direct Line</span>
                    <span className="text-xs sm:text-sm font-bold font-mono text-[#00FF66] group-hover:underline">
                      +995 571 78 90
                    </span>
                  </div>
                </a>

                <a
                  href={`mailto:${SOLE_ADMIN_EMAIL}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-black border border-[#00FF66]/40 hover:border-[#00FF66] hover:bg-zinc-950 transition-all text-white group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#00FF66]/15 text-[#00FF66] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-zinc-400 uppercase block">Founder Direct Email</span>
                    <span className="text-xs sm:text-sm font-bold font-mono text-zinc-200 group-hover:text-[#00FF66] truncate max-w-[170px] block">
                      {SOLE_ADMIN_EMAIL}
                    </span>
                  </div>
                </a>
              </div>

              {/* Founder Admin Console Direct Launch */}
              {onOpenAdmin && (
                <div className="pt-2">
                  <button
                    onClick={onOpenAdmin}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#00FF66]/10 hover:bg-[#00FF66]/20 border border-[#00FF66] text-[#00FF66] font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,255,102,0.25)] hover:shadow-[0_0_20px_rgba(0,255,102,0.4)] transition-all cursor-pointer group"
                    title="Launch TechZone Founder Terminal"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#00FF66] group-hover:scale-110 transition-transform" />
                    <span>Launch Sole Administrator Console (Luka Tavadze)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Signature */}
            <div className="pt-6 mt-6 border-t border-zinc-900 flex items-center justify-between text-xs text-zinc-400">
              <span className="font-mono text-zinc-500">Authorized TechZone Founder & Director</span>
              <span className="text-[#00FF66] font-mono font-bold">Luka Tavadze</span>
            </div>
          </div>

          {/* Regional Roots & Palestine Solidarity Card */}
          <div className="lg:col-span-5 rounded-3xl bg-[#080808]/90 border border-[#00FF66]/30 p-8 sm:p-10 backdrop-blur-xl shadow-[0_0_35px_rgba(0,255,102,0.12)] flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-[#00FF66]" />
                <h3 className="text-xl font-black text-white uppercase">Regional Hub & Global Reach</h3>
              </div>

              {/* Georgia Hub Banner */}
              <div className="p-5 rounded-2xl bg-black border border-[#00FF66]/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-white text-base">
                    <span className="text-2xl">🇬🇪</span>
                    <span>Georgia Tech Operations</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/40">
                    Primary HQ
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Headquartered in Georgia with rapid distribution channels across Tbilisi, Kutaisi, Batumi, and nationwide delivery.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#00FF66]">
                  <Phone className="w-3.5 h-3.5" />
                  <a href="tel:+9955717890" className="hover:underline font-bold">+995 571 78 90</a>
                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-400">24/7 Direct Call & WhatsApp</span>
                </div>
              </div>

              {/* Palestine Solidarity & Worldwide Delivery Banner */}
              <div className="p-5 rounded-2xl bg-black border border-[#00FF66]/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-white text-base">
                    <span className="text-2xl">🇵🇸</span>
                    <span>Solidarity With Palestine</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-white border border-white/20">
                    Free Palestine
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  We stand proudly with <strong className="text-white">Palestine (فلسطين)</strong>. TechZone ensures direct international tech shipping to Palestine, empowering students, engineers, and creatives with accessible, authentic electronics.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs text-zinc-400 font-mono">
                  <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                  <span>Fair pricing, safe logistics & international dispatch</span>
                </div>
              </div>

              {/* Quality Commitment Pledge */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#00FF66] font-mono uppercase">
                  <Award className="w-4 h-4" />
                  Luka’s Personal Hardware Guarantee
                </div>
                <p className="text-xs text-zinc-400">
                  Zero clone components. Every product ships with verified serial numbers, factory security seals, and direct 2-year warranty support.
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('products')}
              className="w-full py-3.5 px-4 rounded-xl bg-[#00FF66] hover:bg-[#00e65c] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,102,0.3)] transition-all cursor-pointer active:scale-95"
            >
              <span>Explore Luka’s Verified Hardware Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Our Production & Hardware Quality Standards */}
        <div className="rounded-3xl bg-black border border-[#00FF66]/30 p-8 sm:p-10 shadow-[0_0_30px_rgba(0,255,102,0.1)]">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00FF66]">
              ENGINEERING EXCELLENCE
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase mt-1">
              Our Production & Testing Standards
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              How we ensure that every customer receives unthrottled, pristine electronics that last for years.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-[#090909] border border-zinc-800 hover:border-[#00FF66]/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#00FF66]/10 text-[#00FF66] flex items-center justify-center font-bold font-mono mb-3">
                01
              </div>
              <h4 className="text-base font-bold text-white mb-1">Thermal Stress Benchmarks</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Laptops and gaming rigs undergo 60-minute stress tests to confirm zero throttling and peak silicone efficiency.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#090909] border border-zinc-800 hover:border-[#00FF66]/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#00FF66]/10 text-[#00FF66] flex items-center justify-center font-bold font-mono mb-3">
                02
              </div>
              <h4 className="text-base font-bold text-white mb-1">Acoustic & Audio Calibration</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Headphones and speakers are sweep-tested across 20Hz - 40kHz for balanced sound staging and crisp frequency response.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#090909] border border-zinc-800 hover:border-[#00FF66]/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#00FF66]/10 text-[#00FF66] flex items-center justify-center font-bold font-mono mb-3">
                03
              </div>
              <h4 className="text-base font-bold text-white mb-1">Zero Dead-Pixel Guarantee</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                QD-OLED and 4K displays are screened for optical clarity, uniform color fidelity, and HDR 1000 peak brightness.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#090909] border border-zinc-800 hover:border-[#00FF66]/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#00FF66]/10 text-[#00FF66] flex items-center justify-center font-bold font-mono mb-3">
                04
              </div>
              <h4 className="text-base font-bold text-white mb-1">Shock-Proof Safe Packaging</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Double-walled protective packaging and electrostatic isolation ensure items reach Georgia, Palestine, and beyond in factory perfection.
              </p>
            </div>
          </div>

          {/* Quick Production Stats Bar */}
          <div className="mt-10 pt-8 border-t border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-black font-mono text-[#00FF66] neon-text-glow">15,000+</div>
              <p className="text-xs text-zinc-400 mt-1">Units Delivered Worldwide</p>
            </div>
            <div>
              <div className="text-3xl font-black font-mono text-[#00FF66] neon-text-glow">99.8%</div>
              <p className="text-xs text-zinc-400 mt-1">Customer Happiness Rating</p>
            </div>
            <div>
              <div className="text-3xl font-black font-mono text-white">2-YEAR</div>
              <p className="text-xs text-zinc-400 mt-1">Full Factory Warranty</p>
            </div>
            <div>
              <div className="text-3xl font-black font-mono text-white">+995 571 78 90</div>
              <p className="text-xs text-zinc-400 mt-1">Direct Support Hotline (Georgia)</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
