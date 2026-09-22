import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  CheckCircle2,
  KeyRound,
  AlertCircle
} from 'lucide-react';
import { UserProfile, SOLE_ADMIN_EMAIL } from '../types';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
  initialMode?: 'register' | 'login';
}

export const GoogleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'register',
}) => {
  const [mode, setMode] = useState<'register' | 'login'>(initialMode);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showGoogleAccountPicker, setShowGoogleAccountPicker] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');

  // Standard form inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Sole Administrator Google Account for instant 1-click verification
  const googleAccounts = [
    {
      name: 'Luka Tavadze',
      email: SOLE_ADMIN_EMAIL,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      roleBadge: 'Founder & Sole Administrator (Root)',
    }
  ];

  const handleGoogleQuickRegister = (selectedAccount: { name: string; email: string; avatar?: string }) => {
    setIsGoogleLoading(true);
    setFormError('');

    setTimeout(() => {
      setIsGoogleLoading(false);
      const isSoleAdmin = selectedAccount.email.toLowerCase() === SOLE_ADMIN_EMAIL.toLowerCase();
      const newUser: UserProfile = {
        id: isSoleAdmin ? 'usr_sole_admin_luka' : `usr_google_${Date.now()}`,
        name: selectedAccount.name,
        email: selectedAccount.email,
        avatar: selectedAccount.avatar,
        provider: 'google',
        isGoogleVerified: true,
        tier: isSoleAdmin ? 'Sole Administrator' : 'VIP Platinum',
        points: isSoleAdmin ? 99999 : 500, // VIP Admin Points
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        isAdmin: isSoleAdmin,
        role: isSoleAdmin ? 'admin' : 'user',
      };
      onSuccess(newUser);
      onClose();
    }, 900);
  };

  const handleCustomGoogleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoogleEmail.trim() || !customGoogleEmail.includes('@')) {
      setFormError('Please enter a valid Google email address');
      return;
    }

    const resolvedName = customGoogleName.trim() || customGoogleEmail.split('@')[0];
    handleGoogleQuickRegister({
      name: resolvedName,
      email: customGoogleEmail.trim(),
    });
  };

  const handleStandardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (mode === 'register' && !fullName.trim()) {
      setFormError('Full name is required');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Valid email address is required');
      return;
    }
    if (!password || password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const isSoleAdmin = email.trim().toLowerCase() === SOLE_ADMIN_EMAIL.toLowerCase();
      const newUser: UserProfile = {
        id: isSoleAdmin ? 'usr_sole_admin_luka' : `usr_email_${Date.now()}`,
        name: mode === 'register' ? fullName.trim() : (fullName.trim() || email.split('@')[0]),
        email: email.trim(),
        provider: 'email',
        isGoogleVerified: false,
        tier: isSoleAdmin ? 'Sole Administrator' : 'Member',
        points: isSoleAdmin ? 99999 : 250,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        isAdmin: isSoleAdmin,
        role: isSoleAdmin ? 'admin' : 'user',
      };
      onSuccess(newUser);
      onClose();
    }, 800);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="google-registration-modal"
        className="relative w-full max-w-md bg-[#0a0a0a] border border-[#00FF66]/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,255,102,0.2)] text-white my-auto backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-auth-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-black hover:bg-zinc-900 text-zinc-400 hover:text-white border border-[#00FF66]/30 hover:border-[#00FF66] transition-colors cursor-pointer"
          aria-label="Close registration dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66] text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#00FF66]" />
            TECHZONE AUTHENTICATION
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            {mode === 'register' ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            {mode === 'register' 
              ? 'Register with Google in 1-click or sign up with your email'
              : 'Sign in to access your orders, warranty & member perks'}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex rounded-xl bg-zinc-950 p-1 border border-zinc-800 mb-6">
          <button
            type="button"
            onClick={() => { setMode('register'); setFormError(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-[#00FF66] text-black shadow-[0_0_10px_rgba(0,255,102,0.4)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Register (New User)
          </button>
          <button
            type="button"
            onClick={() => { setMode('login'); setFormError(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-[#00FF66] text-black shadow-[0_0_10px_rgba(0,255,102,0.4)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
        </div>

        {/* GOOGLE PRIMARY ACTION BUTTON */}
        <div className="space-y-3">
          <button
            id="google-register-primary-btn"
            type="button"
            disabled={isGoogleLoading}
            onClick={() => setShowGoogleAccountPicker(!showGoogleAccountPicker)}
            className="w-full py-3.5 px-4 bg-white hover:bg-zinc-100 text-zinc-900 font-bold text-sm rounded-xl flex items-center justify-center gap-3 transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(0,255,102,0.3)] cursor-pointer disabled:opacity-70 group"
          >
            {isGoogleLoading ? (
              <div className="flex items-center gap-2 text-zinc-800">
                <span className="w-4 h-4 border-2 border-zinc-800 border-t-transparent rounded-full animate-spin" />
                <span>Connecting to Google...</span>
              </div>
            ) : (
              <>
                <GoogleIcon className="w-5 h-5 shrink-0" />
                <span className="text-zinc-900">
                  {mode === 'register' ? 'Register with Google' : 'Sign in with Google'}
                </span>
                <span className="text-[10px] uppercase font-mono font-bold bg-[#00FF66]/20 text-black px-2 py-0.5 rounded border border-[#00FF66]/40 ml-auto">
                  1-Click
                </span>
              </>
            )}
          </button>

          {/* Google Account Selector Drawer (when clicked) */}
          {showGoogleAccountPicker && (
            <div className="p-4 rounded-2xl bg-zinc-950 border border-[#00FF66]/40 space-y-3 animate-in fade-in duration-200 shadow-[0_0_20px_rgba(0,255,102,0.15)]">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-xs">
                <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                  <GoogleIcon className="w-3.5 h-3.5" /> Select Google Account
                </span>
                <span className="text-[10px] text-[#00FF66] font-mono">OAuth 2.0 Secure</span>
              </div>

              {/* Detected Sole Administrator Google account */}
              <div className="space-y-2">
                {googleAccounts.map((acc, idx) => (
                  <button
                    key={idx}
                    id={`google-select-acc-${idx}`}
                    type="button"
                    onClick={() => handleGoogleQuickRegister(acc)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-black hover:bg-zinc-900/90 border border-[#00FF66]/50 hover:border-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.15)] transition-all text-left cursor-pointer group"
                  >
                    <div className="relative">
                      <img 
                        src={acc.avatar} 
                        alt={acc.name} 
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#00FF66]"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#00FF66] border-2 border-black flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-black" />
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-black text-white group-hover:text-[#00FF66]">
                          {acc.name}
                        </span>
                        <span className="text-[10px] font-mono font-black uppercase px-1.5 py-0.2 rounded bg-[#00FF66] text-black">
                          SOLE ADMIN
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-[#00FF66] truncate">{acc.email}</p>
                      <p className="text-[10px] text-zinc-400 font-mono mt-0.5">{acc.roleBadge}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#00FF66] group-hover:translate-x-1 transition-transform shrink-0" />
                  </button>
                ))}
              </div>

              {/* Custom Google Account Input */}
              <div className="pt-2 border-t border-zinc-850">
                <form onSubmit={handleCustomGoogleRegister} className="space-y-2">
                  <span className="text-[11px] text-zinc-400 block">Or use custom Google account:</span>
                  <input
                    type="email"
                    placeholder="your.name@gmail.com"
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    className="w-full bg-black text-xs text-white placeholder-zinc-600 px-3 py-2 rounded-lg border border-zinc-800 focus:border-[#00FF66] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-[#00FF66]/30 hover:border-[#00FF66] text-xs text-white font-bold transition-colors cursor-pointer"
                  >
                    Continue with this Google Account
                  </button>
                </form>
              </div>

              <p className="text-[10px] text-zinc-500 text-center pt-1">
                TechZone will securely receive your Google profile info to create your account.
              </p>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800" />
          </div>
          <span className="relative bg-[#0a0a0a] px-3 text-[11px] uppercase font-mono text-zinc-500">
            Or continue with email
          </span>
        </div>

        {/* Error message */}
        {formError && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* Traditional Form */}
        <form onSubmit={handleStandardSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
                <input
                  id="auth-form-fullname"
                  type="text"
                  placeholder="e.g. Jordan Mercer"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
              <input
                id="auth-form-email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
              <input
                id="auth-form-password"
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div className="flex items-center gap-2 pt-1 text-[11px] text-zinc-400">
              <input 
                id="auth-terms-checkbox" 
                type="checkbox" 
                defaultChecked 
                required 
                className="accent-[#00FF66] w-3.5 h-3.5 cursor-pointer" 
              />
              <label htmlFor="auth-terms-checkbox" className="cursor-pointer">
                I agree to TechZone's <span className="text-[#00FF66] underline">Terms of Service</span> and <span className="text-[#00FF66] underline">Privacy Policy</span>
              </label>
            </div>
          )}

          <button
            id="auth-form-submit-btn"
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-[#00FF66] hover:bg-[#00e65c] text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,255,102,0.35)] hover:shadow-[0_0_30px_rgba(0,255,102,0.5)] cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>{mode === 'register' ? 'Complete Registration' : 'Sign In to TechZone'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Benefits badge */}
        <div className="mt-6 pt-4 border-t border-zinc-850 flex items-center justify-center gap-3 text-[11px] text-zinc-400">
          <span className="flex items-center gap-1 text-[#00FF66]">
            <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-white">
            <Sparkles className="w-3.5 h-3.5 text-[#00FF66]" /> +500 VIP Welcome Pts
          </span>
        </div>

      </div>
    </div>
  );
};
