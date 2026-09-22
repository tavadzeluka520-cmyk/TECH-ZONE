import React from 'react';
import { 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  MessageSquare, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { WHY_CHOOSE_US_ITEMS } from '../data/mockData';

export const WhyChooseUs: React.FC = () => {
  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Truck':
        return <Truck className="w-8 h-8 text-[#00FF66] group-hover:scale-110 transition-transform duration-300" />;
      case 'CreditCard':
        return <CreditCard className="w-8 h-8 text-[#00FF66] group-hover:scale-110 transition-transform duration-300" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-8 h-8 text-[#00FF66] group-hover:scale-110 transition-transform duration-300" />;
      case 'MessageSquare':
        return <MessageSquare className="w-8 h-8 text-[#00FF66] group-hover:scale-110 transition-transform duration-300" />;
      default:
        return <Sparkles className="w-8 h-8 text-[#00FF66]" />;
    }
  };

  return (
    <section id="why-choose-us" className="py-20 bg-black text-white relative border-b border-[#00FF66]/15">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00FF66]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66] text-xs font-mono font-bold uppercase tracking-wider mb-3 shadow-[0_0_12px_rgba(0,255,102,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#00FF66]" />
            THE TECHZONE STANDARD
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            Why Choose <span className="text-[#00FF66] neon-text-glow">TechZone?</span>
          </h2>
          <p className="text-zinc-400 text-base mt-2">
            Every device in our inventory is factory sealed, benchmark certified, and backed by comprehensive tech engineering support.
          </p>
        </div>

        {/* Four Dark Glass Cards with Glowing Green Icons as requested:
            1. 🚚 Fast Delivery
            2. 💳 Secure Payment
            3. 🛡️ Official Warranty
            4. 💬 24/7 Support
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US_ITEMS.map((item) => (
            <div
              key={item.id}
              id={`pillar-${item.id}`}
              className="group relative p-7 rounded-2xl bg-[#080808]/80 backdrop-blur-xl border border-[#00FF66]/25 hover:border-[#00FF66] hover:shadow-[0_0_30px_rgba(0,255,102,0.25)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Subtle green ambient glow on hover */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#00FF66]/5 rounded-full blur-2xl group-hover:bg-[#00FF66]/20 transition-all duration-500 pointer-events-none" />

              <div>
                {/* Glowing Green Icon Container */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-black border border-[#00FF66]/40 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,102,0.3)] group-hover:border-[#00FF66] group-hover:shadow-[0_0_30px_rgba(0,255,102,0.5)] transition-all duration-300">
                    {getPillarIcon(item.icon)}
                  </div>
                  <span className="text-xl" title={item.title}>
                    {item.emoji}
                  </span>
                </div>

                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-xl font-black text-white group-hover:text-[#00FF66] transition-colors">
                    {item.title}
                  </h3>
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom assurance marker */}
              <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between text-xs">
                <span className="text-zinc-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF66]" />
                  <span>Verified Standard</span>
                </span>
                <span className="font-mono text-[#00FF66] font-semibold text-[11px] bg-[#00FF66]/10 px-2 py-0.5 rounded border border-[#00FF66]/30">
                  {item.badge}
                </span>
              </div>

              {/* Glowing accent border bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00FF66] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_#00FF66]" />
            </div>
          ))}
        </div>

        {/* Tech Performance Metrics Bar */}
        <div className="mt-14 rounded-2xl bg-[#080808] border border-[#00FF66]/20 p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-[0_0_30px_rgba(0,255,102,0.08)]">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono">99.8%</div>
            <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-semibold">On-Time Dispatch</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#00FF66] font-mono neon-text-glow">100%</div>
            <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-semibold">Authentic Factory Sealed</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono">&lt; 3 Min</div>
            <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-semibold">Live Engineer Response</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#00FF66] font-mono neon-text-glow">2-Year</div>
            <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-semibold">Official Warranty</div>
          </div>
        </div>

      </div>
    </section>
  );
};
