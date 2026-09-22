import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onRemove }) => {
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        onRemove(toasts[0].id);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toasts, onRemove]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-4 rounded-2xl shadow-2xl border flex items-start gap-3 text-white transition-all transform animate-in slide-in-from-bottom duration-200 backdrop-blur-xl ${
            toast.type === 'success'
              ? 'bg-black/95 border-[#00FF66]/50 shadow-[0_0_20px_rgba(0,255,102,0.25)]'
              : toast.type === 'error'
              ? 'bg-black/95 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.25)]'
              : 'bg-black/95 border-[#00FF66]/30 shadow-[0_0_20px_rgba(0,255,102,0.15)]'
          }`}
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-[#00FF66] shrink-0 mt-0.5 shadow-[0_0_8px_#00FF66]" />
          )}
          {toast.type === 'error' && (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          )}
          {(toast.type === 'info' || toast.type === 'warning') && (
            <Info className="w-5 h-5 text-[#00FF66] shrink-0 mt-0.5" />
          )}

          <div className="flex-1 min-w-0">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              {toast.title}
            </h5>
            <p className="text-xs text-zinc-300 mt-0.5 leading-snug">
              {toast.message}
            </p>
          </div>

          <button
            onClick={() => onRemove(toast.id)}
            className="text-zinc-500 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
