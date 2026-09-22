import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface ContactSectionProps {
  onSuccessToast: (title: string, message: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onSuccessToast }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Product Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onSuccessToast(
        'Message Dispatched!',
        `Thank you ${name}. Our tech team will reply to ${email} within 2 hours.`
      );
      // Reset form after short delay
      setTimeout(() => {
        setSubmitted(false);
        setName('');
        setEmail('');
        setMessage('');
      }, 3500);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-black text-white relative border-b border-[#00FF66]/15">
      {/* Ambient green glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#00FF66]/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66] text-xs font-mono font-bold uppercase tracking-wider mb-3 shadow-[0_0_12px_rgba(0,255,102,0.2)]">
            <MessageSquare className="w-3.5 h-3.5 text-[#00FF66]" />
            DIRECT TECH COMM LINK
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            Contact <span className="text-[#00FF66] neon-text-glow">TechZone</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            Have questions about product specs, esports setups, or official warranty claims? Our hardware specialists are online 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Direct Contact Info & Working Hours */}
          <div className="lg:col-span-5 rounded-3xl bg-[#080808]/90 border border-[#00FF66]/30 p-8 flex flex-col justify-between space-y-8 backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,102,0.1)]">
            <div className="space-y-6">
              <h3 className="text-xl font-black text-white uppercase">Direct Assistance</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Connect directly with certified engineers for custom desktop configurations, gaming peripherals advice, or enterprise volume orders.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-black border border-[#00FF66]/40 flex items-center justify-center shrink-0 text-[#00FF66] shadow-[0_0_12px_rgba(0,255,102,0.25)]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-mono font-bold text-zinc-400">Georgia Hotline & WhatsApp</h4>
                    <a href="tel:+9955717890" className="text-sm font-bold text-white hover:text-[#00FF66] mt-0.5 font-mono block transition-colors">
                      +995 571 78 90 🇬🇪
                    </a>
                    <p className="text-xs text-zinc-500">Available 24/7 for direct calls & WhatsApp inquiries</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-black border border-[#00FF66]/40 flex items-center justify-center shrink-0 text-[#00FF66] shadow-[0_0_12px_rgba(0,255,102,0.25)]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-mono font-bold text-zinc-400">Direct Email</h4>
                    <a href="mailto:tavadzeluka520@gmail.com" className="text-sm font-bold text-[#00FF66] mt-0.5 font-mono block hover:underline">
                      tavadzeluka520@gmail.com
                    </a>
                    <p className="text-xs text-zinc-500">Luka Tavadze (Founder & Sole Admin)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-black border border-[#00FF66]/40 flex items-center justify-center shrink-0 text-[#00FF66] shadow-[0_0_12px_rgba(0,255,102,0.25)]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-mono font-bold text-zinc-400">Headquarters & Express Shipping</h4>
                    <p className="text-sm font-bold text-white mt-0.5">Tbilisi, Georgia 🇬🇪</p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Worldwide shipping network with dedicated delivery to <strong className="text-white">Palestine 🇵🇸</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-black border border-[#00FF66]/40 flex items-center justify-center shrink-0 text-[#00FF66] shadow-[0_0_12px_rgba(0,255,102,0.25)]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-mono font-bold text-zinc-400">Operating Hours</h4>
                    <p className="text-sm font-bold text-white mt-0.5">Monday - Sunday: 24/7</p>
                    <p className="text-xs text-zinc-500">Fast shipments 365 days a year</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800 flex items-center gap-3 text-xs text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-[#00FF66]" />
              <span>All communications protected with TLS 1.3 encryption</span>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 rounded-3xl bg-[#080808]/90 border border-[#00FF66]/30 p-8 backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,102,0.1)]">
            <h3 className="text-xl font-black text-white uppercase mb-2">Send an Instant Message</h3>
            <p className="text-sm text-zinc-400 mb-6">
              Fill out the form below and an engineer will review your hardware requirements immediately.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#00FF66]/10 border border-[#00FF66]/40 text-center space-y-3 animate-in fade-in zoom-in-95">
                <CheckCircle2 className="w-12 h-12 text-[#00FF66] mx-auto" />
                <h4 className="text-lg font-bold text-white">Transmission Successful</h4>
                <p className="text-xs text-zinc-300 max-w-sm mx-auto">
                  Your inquiry has been assigned to ticket <span className="font-mono text-[#00FF66]">#TZ-SUP-2026</span>. We'll be in touch promptly!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      id="contact-form-name"
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="contact-form-email"
                      type="email"
                      required
                      placeholder="alex@cybernet.io"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Topic of Inquiry
                  </label>
                  <select
                    id="contact-form-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Product Inquiry">Product Technical Inquiry</option>
                    <option value="Order Tracking">Shipment & Order Status</option>
                    <option value="Warranty Claim">2-Year Warranty Claim</option>
                    <option value="Corporate Gaming">Custom Gaming Rigs & Bulk Orders</option>
                    <option value="Other">General Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Message Details *
                  </label>
                  <textarea
                    id="contact-form-message"
                    required
                    rows={4}
                    placeholder="Tell us what you're looking for or describe your inquiry..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-black border border-zinc-800 focus:border-[#00FF66] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  id="contact-form-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#00FF66] hover:bg-[#00e65c] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,255,102,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
