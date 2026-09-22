import React from 'react';
import { Star, ShieldCheck, Sparkles, Quote, ThumbsUp, Heart } from 'lucide-react';
import { CUSTOMER_REVIEWS_DATA } from '../data/mockData';

export const CustomerReviews: React.FC = () => {
  const reviews = CUSTOMER_REVIEWS_DATA;

  return (
    <section id="reviews" className="py-20 bg-black text-white relative border-b border-[#00FF66]/15">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[300px] bg-[#00FF66]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: People Happy About Our Production */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66] text-xs font-mono font-bold uppercase tracking-wider mb-3 shadow-[0_0_12px_rgba(0,255,102,0.2)]">
            <ThumbsUp className="w-3.5 h-3.5 text-[#00FF66]" />
            PEOPLE HAPPY ABOUT OUR PRODUCTION
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            Customer <span className="text-[#00FF66] neon-text-glow">Happiness</span> & Feedback
          </h2>
          <p className="text-zinc-400 text-base mt-2">
            Read what verified buyers across Georgia 🇬🇪, Palestine 🇵🇸, and worldwide say about our hardware production standards and customer care.
          </p>

          {/* Key Production Happiness Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 pt-4 border-t border-zinc-900 text-xs font-mono text-zinc-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00FF66]" />
              <strong className="text-white">99.8%</strong> Customer Happiness Rate
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00FF66]" />
              <strong className="text-white">100%</strong> Factory Inspected Production
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00FF66]" />
              <strong className="text-white">Georgia 🇬🇪 & Palestine 🇵🇸</strong> Express Delivery
            </span>
          </div>
        </div>

        {/* Dark Glass Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              id={`review-card-${rev.id}`}
              className="group relative p-6 rounded-2xl bg-[#080808]/80 backdrop-blur-xl border border-[#00FF66]/25 hover:border-[#00FF66] hover:shadow-[0_0_30px_rgba(0,255,102,0.25)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Row: Star Rating & Quote Icon */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'text-[#00FF66] fill-[#00FF66]'
                            : 'text-zinc-700'
                        }`}
                      />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#00FF66]/30 group-hover:text-[#00FF66]/60 transition-colors" />
                </div>

                <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wide text-zinc-200 mb-2 line-clamp-1">
                  "{rev.title}"
                </h4>

                {/* Testimonial */}
                <p className="text-xs text-zinc-300 leading-relaxed italic line-clamp-4">
                  "{rev.comment}"
                </p>
              </div>

              {/* Bottom Row: Customer Name & Verified Info */}
              <div className="mt-5 pt-4 border-t border-zinc-900 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-9 h-9 rounded-full object-cover border border-[#00FF66]/40 shadow-[0_0_8px_rgba(0,255,102,0.2)] shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white group-hover:text-[#00FF66] transition-colors truncate">
                    {rev.author}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-zinc-400 mt-0.5 truncate">
                    <ShieldCheck className="w-3 h-3 text-[#00FF66] shrink-0" />
                    <span className="truncate">{rev.productName}</span>
                  </div>
                </div>
              </div>

              {/* Bottom green accent indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00FF66] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_#00FF66]" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
