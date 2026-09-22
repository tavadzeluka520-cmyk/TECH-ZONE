import React, { useState } from 'react';
import { 
  User, 
  X, 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Zap, 
  Clock,
  CheckCircle2,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { UserProfile, SOLE_ADMIN_EMAIL } from '../types';
import { GoogleIcon } from './GoogleAuthModal';

interface UserAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLogout: () => void;
  onOpenAuth: (mode?: 'register' | 'login') => void;
  onOpenAdmin?: () => void;
}

export const UserAccountModal: React.FC<UserAccountModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogout,
  onOpenAuth,
  onOpenAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'settings'>('profile');

  if (!isOpen) return null;

  // If not logged in, show registration & sign-in gate
  if (!currentUser) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
          onClick={onClose}
        />
        <div 
          id="user-account-unauthenticated-modal"
          className="relative w-full max-w-md bg-[#0a0a0a] border border-[#00FF66]/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,255,102,0.15)] text-white overflow-hidden z-10 text-center space-y-6"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-black hover:bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-[#00FF66]/10 border border-[#00FF66]/40 flex items-center justify-center text-[#00FF66] mx-auto shadow-[0_0_20px_rgba(0,255,102,0.3)]">
            <User className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">
              TechZone Portal
            </h3>
            <p className="text-xs text-zinc-400 mt-2 max-w-xs mx-auto">
              Register or sign in with your Google account to unlock member discounts, order tracking, and 2-year warranty management.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              id="unauth-google-register-btn"
              onClick={() => {
                onClose();
                onOpenAuth('register');
              }}
              className="w-full py-3.5 px-4 bg-white hover:bg-zinc-100 text-zinc-900 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(0,255,102,0.3)] transition-all cursor-pointer"
            >
              <GoogleIcon className="w-5 h-5" />
              <span>Register with Google</span>
            </button>

            <button
              id="unauth-email-signin-btn"
              onClick={() => {
                onClose();
                onOpenAuth('login');
              }}
              className="w-full py-3.5 px-4 bg-zinc-900 hover:bg-zinc-800 border border-[#00FF66]/40 text-[#00FF66] font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
            >
              Sign In to Existing Account
            </button>
          </div>

          <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-zinc-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00FF66]" /> Official Warranty
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#00FF66]" /> +500 VIP Points
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div 
        id="user-account-modal"
        className="relative w-full max-w-2xl bg-[#0a0a0a] border border-[#00FF66]/30 rounded-2xl shadow-[0_0_50px_rgba(0,255,102,0.15)] text-white overflow-hidden z-10 transition-all transform animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#00FF66]/20 bg-black/60">
          <div className="flex items-center gap-3">
            {currentUser.avatar ? (
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-11 h-11 rounded-xl object-cover border-2 border-[#00FF66]/60 shadow-[0_0_15px_rgba(0,255,102,0.3)]"
              />
            ) : (
              <div className="w-11 h-11 rounded-xl bg-[#00FF66]/10 border border-[#00FF66]/40 flex items-center justify-center text-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.3)] font-bold text-base">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                {currentUser.name}
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/40">
                  {currentUser.tier}
                </span>
                {currentUser.isGoogleVerified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-white text-zinc-900 px-2 py-0.5 rounded-full" title="Registered & Verified via Google">
                    <GoogleIcon className="w-3 h-3" /> Google Verified
                  </span>
                )}
              </h3>
              <p className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
                <span>{currentUser.email}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-[#00FF66] font-mono">ID: #{currentUser.id.substring(0, 10)}</span>
              </p>
            </div>
          </div>

          <button
            id="close-account-modal-btn"
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
            aria-label="Close user modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-zinc-800/80 bg-zinc-950/40">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-3 text-sm font-medium transition-all relative cursor-pointer ${
              activeTab === 'profile'
                ? 'text-[#00FF66]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Account Overview
            {activeTab === 'profile' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00FF66] shadow-[0_0_8px_#00FF66]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-3 text-sm font-medium transition-all relative cursor-pointer ${
              activeTab === 'orders'
                ? 'text-[#00FF66]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Order History (2)
            {activeTab === 'orders' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00FF66] shadow-[0_0_8px_#00FF66]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 px-3 text-sm font-medium transition-all relative cursor-pointer ${
              activeTab === 'settings'
                ? 'text-[#00FF66]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Security & Google Sync
            {activeTab === 'settings' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00FF66] shadow-[0_0_8px_#00FF66]" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {activeTab === 'profile' && (
            <div className="space-y-5">
              {/* Member Tier Card */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-zinc-900 to-black border border-[#00FF66]/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF66]/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase font-mono tracking-wider text-[#00FF66] font-semibold">Tier Status</span>
                    <h4 className="text-2xl font-black text-white mt-0.5">{currentUser.tier}</h4>
                    <p className="text-xs text-zinc-400 mt-1">
                      Member since {currentUser.joinedDate} • Google Account Active
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-zinc-400">Reward Balance</span>
                    <div className="text-3xl font-mono font-black text-[#00FF66] neon-text-glow">
                      {currentUser.points.toLocaleString()} PTS
                    </div>
                  </div>
                </div>

                <div className="w-full bg-zinc-800 h-2 rounded-full mt-4 overflow-hidden">
                  <div className="bg-[#00FF66] h-full rounded-full w-4/5 shadow-[0_0_10px_#00FF66]" />
                </div>
              </div>

              {/* Exclusive Sole Administrator Banner */}
              {(currentUser.email.toLowerCase() === SOLE_ADMIN_EMAIL.toLowerCase() || currentUser.isAdmin) && (
                <div className="p-4 rounded-xl bg-black border border-[#00FF66] shadow-[0_0_20px_rgba(0,255,102,0.25)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#00FF66]/20 border border-[#00FF66] flex items-center justify-center text-[#00FF66] shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-mono font-bold text-[#00FF66] flex items-center gap-1.5">
                        SOLE ADMINISTRATOR PRIVILEGES ACTIVE
                      </p>
                      <p className="text-[11px] text-zinc-300">
                        Full control: Post hardware, upload images, manage pricing ($), and update inventory.
                      </p>
                      <p className="text-[11px] text-[#00FF66] font-mono mt-0.5">
                        🇬🇪 Georgia Hotline: +995 571 78 90
                      </p>
                    </div>
                  </div>
                  {onOpenAdmin && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenAdmin();
                      }}
                      className="px-4 py-2 bg-[#00FF66] hover:bg-[#00e65c] text-black font-extrabold text-xs rounded-xl shadow-[0_0_15px_rgba(0,255,102,0.4)] cursor-pointer whitespace-nowrap self-stretch sm:self-auto text-center"
                    >
                      Launch Admin Panel
                    </button>
                  )}
                </div>
              )}

              {/* Quick Perks */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="flex items-center gap-2 text-[#00FF66] text-xs font-semibold">
                    <Sparkles className="w-4 h-4" /> Free Express Shipping
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1">Automated priority dispatch</p>
                </div>
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="flex items-center gap-2 text-[#00FF66] text-xs font-semibold">
                    <ShieldCheck className="w-4 h-4" /> 2-Yr Direct Warranty
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1">Factory authorized swaps</p>
                </div>
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="flex items-center gap-2 text-[#00FF66] text-xs font-semibold">
                    <Zap className="w-4 h-4" /> 24/7 Priority Tech Support
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1">Direct engineer channel</p>
                </div>
              </div>

              {/* Account Details */}
              <div className="space-y-3 pt-2">
                <h5 className="text-xs uppercase font-mono tracking-wider text-zinc-400 font-bold">Saved Delivery Destination</h5>
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#00FF66] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-semibold text-white">Default Primary Delivery</span>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {currentUser.address || '742 Cyber Avenue, Suite 400'}
                      </p>
                      <p className="text-xs text-zinc-500 mt-0.5">Linked to {currentUser.email}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#00FF66] font-semibold">VERIFIED</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              {/* Order 1 */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-[#00FF66]/40 transition-colors">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800/60">
                  <div>
                    <span className="font-mono text-xs font-bold text-white">ORDER #TZ-9821</span>
                    <p className="text-[11px] text-zinc-400">Placed on Sep 18, 2026 • 2 items</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/40 flex items-center gap-1.5">
                    <Clock className="w-3 h-3" /> In Transit (Dispatched)
                  </span>
                </div>
                <div className="pt-3 flex items-center justify-between text-sm">
                  <div className="text-xs text-zinc-300">
                    <p className="font-semibold text-white">ApexPhone 16 Pro Titanium Max + Phantom Elite Controller</p>
                    <p className="text-zinc-500 mt-0.5">Tracking Number: <span className="font-mono text-zinc-400">TZ-EXP-88491029</span></p>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-white">$1,338.00</div>
                    <span className="text-xs text-[#00FF66] font-semibold mt-1 inline-block">GPS Tracking Live</span>
                  </div>
                </div>
              </div>

              {/* Order 2 */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-[#00FF66]/40 transition-colors">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800/60">
                  <div>
                    <span className="font-mono text-xs font-bold text-white">ORDER #TZ-9402</span>
                    <p className="text-[11px] text-zinc-400">Placed on Aug 28, 2026 • 1 item</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-zinc-800 text-zinc-300 border border-zinc-700 flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-[#00FF66]" /> Delivered
                  </span>
                </div>
                <div className="pt-3 flex items-center justify-between text-sm">
                  <div className="text-xs text-zinc-300">
                    <p className="font-semibold text-white">OmniView 34" Curved QD-OLED 240Hz Monitor</p>
                    <p className="text-zinc-500 mt-0.5">Delivered via Express Courier</p>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-white">$799.00</div>
                    <span className="text-xs text-[#00FF66] font-semibold mt-1 inline-block">Warranty Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              {/* Google Provider Status */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white shrink-0">
                      <GoogleIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-white flex items-center gap-1.5">
                        Google Registration Status
                        <CheckCircle2 className="w-4 h-4 text-[#00FF66]" />
                      </h5>
                      <p className="text-xs text-zinc-400">
                        Connected via <span className="text-white font-medium">{currentUser.email}</span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenAuth('register')}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold text-zinc-300 hover:text-white cursor-pointer"
                  >
                    Switch Account
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-semibold text-white">Two-Factor Security Authentication</h5>
                    <p className="text-xs text-zinc-400">Google OAuth token security enforced</p>
                  </div>
                  <span className="text-xs font-mono text-[#00FF66] font-bold">ACTIVE</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                  <div>
                    <h5 className="text-sm font-semibold text-white">New Tech Drop Notifications</h5>
                    <p className="text-xs text-zinc-400">Alerts sent to {currentUser.email}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="accent-[#00FF66] w-4 h-4 cursor-pointer" />
                </div>
              </div>

              {/* Sign Out Action */}
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/40 flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-semibold text-red-300">Sign Out of TechZone</h5>
                  <p className="text-xs text-red-400/80">Terminates active Google session</p>
                </div>
                <button 
                  id="account-signout-btn"
                  onClick={onLogout}
                  className="px-3 py-1.5 rounded-lg bg-red-900/30 hover:bg-red-900/50 text-red-300 border border-red-700/50 text-xs font-semibold cursor-pointer flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-zinc-800/80 bg-black/60 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
            <span>TechZone Core Cloud Sync: Connected</span>
          </div>
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
