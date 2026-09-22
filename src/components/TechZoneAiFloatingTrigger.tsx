import React from 'react';
import { Bot, Sparkles, MessageSquare } from 'lucide-react';

interface TechZoneAiFloatingTriggerProps {
  onClick: () => void;
  isOpen: boolean;
}

export const TechZoneAiFloatingTrigger: React.FC<TechZoneAiFloatingTriggerProps> = ({
  onClick,
  isOpen,
}) => {
  if (isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center">
      <button
        id="techzone-ai-floating-trigger"
        onClick={onClick}
        className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-black/90 backdrop-blur-xl border-2 border-[#00FF66] shadow-[0_0_25px_rgba(0,255,102,0.4)] hover:shadow-[0_0_35px_rgba(0,255,102,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="Open TechZone AI Assistant"
      >
        {/* Pulsing halo ring */}
        <span className="absolute -inset-0.5 rounded-full bg-[#00FF66]/30 blur-sm group-hover:bg-[#00FF66]/50 transition-all pointer-events-none animate-pulse" />

        {/* Bot Icon with glowing badge */}
        <div className="relative w-8 h-8 rounded-full bg-zinc-950 border border-[#00FF66] flex items-center justify-center text-[#00FF66] shadow-[0_0_10px_rgba(0,255,102,0.5)]">
          <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#00FF66] border-2 border-black" />
        </div>

        {/* Text Details */}
        <div className="flex flex-col items-start pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black font-mono tracking-wider text-white uppercase group-hover:text-[#00FF66] transition-colors">
              TECHZONE AI
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-ping" />
          </div>
          <span className="text-[10px] font-mono text-[#00FF66] uppercase font-bold tracking-tight">
            Ask AI Assistant
          </span>
        </div>
      </button>
    </div>
  );
};
