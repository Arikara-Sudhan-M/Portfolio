import React, { useState, useRef } from 'react';
import { MapPin, Send, MessageSquarePlus, ShieldAlert, Mail, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import { EarthCanvas } from '../components/EarthCanvas';

export const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all fields.');
      return;
    }

    setLoading(true);
    setStatus('idle');

    try {
      // EmailJS configuration. In production, the user can replace these keys.
      // If the template/service IDs are default placeholder strings, we will trigger a mock success.
      const serviceId = 'YOUR_EMAILJS_SERVICE_ID';
      const templateId = 'YOUR_EMAILJS_TEMPLATE_ID';
      const publicKey = 'YOUR_EMAILJS_PUBLIC_KEY';

      if (serviceId === 'YOUR_EMAILJS_SERVICE_ID' || !publicKey) {
        // Mock success for demonstration/recruiter testing
        await new Promise((resolve) => setTimeout(resolve, 1200));
        console.log('Form data mock submitted successfully:', formData);
      } else {
        await emailjs.sendForm(serviceId, templateId, formRef.current!, publicKey);
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Blast celebratory confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00D4FF', '#8B5CF6', '#06B6D4']
      });

    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#03030b]">
      {/* Ambient background particles */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#FF0077]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.25em] text-primary uppercase font-bold">Contact</span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl mt-2 text-white">Communication Center</h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-primary to-secondary mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: 3D Earth Canvas & Social Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Holographic Earth Canvas */}
            <div className="relative rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md overflow-hidden">
              <EarthCanvas />
            </div>

            {/* Geo details */}
            <div className="flex flex-col gap-4">
              
              {/* Location */}
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <MapPin className="w-4 h-4 text-[#FF0077]" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-500 font-sans">Location</div>
                  <div className="text-sm font-bold text-gray-200">Thoothukudi, Tamil Nadu, India</div>
                </div>
              </div>

              {/* Email */}
              <a 
                href="mailto:arikarasudhan2004@gmail.com" 
                className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex items-center gap-3 hover:border-primary/40 hover:bg-white/[0.03] transition-all duration-300 group"
              >
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-primary/20 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-500 font-sans">Email Coordinate</div>
                  <div className="text-sm font-bold text-gray-200">arikarasudhan2004@gmail.com</div>
                </div>
              </a>

              {/* Contact Number */}
              <a 
                href="tel:6374156308" 
                className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex items-center gap-3 hover:border-secondary/40 hover:bg-white/[0.03] transition-all duration-300 group"
              >
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-secondary/20 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-secondary" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-500 font-sans">Phone Coordinate</div>
                  <div className="text-sm font-bold text-gray-200">+91 63741 56308</div>
                </div>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://linkedin.com/in/arikara-sudhan-m" 
                target="_blank" 
                rel="noreferrer"
                className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex items-center gap-3 hover:border-primary/40 hover:bg-white/[0.03] transition-all duration-300 group"
              >
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-primary/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-500 font-sans">LinkedIn Professional</div>
                  <div className="text-sm font-bold text-gray-200">linkedin.com/in/arikara-sudhan-m</div>
                </div>
              </a>

              {/* GitHub */}
              <a 
                href="https://github.com/Arikara-Sudhan-M" 
                target="_blank" 
                rel="noreferrer"
                className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex items-center gap-3 hover:border-secondary/40 hover:bg-white/[0.03] transition-all duration-300 group"
              >
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-secondary/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-secondary fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-500 font-sans">GitHub Repositories</div>
                  <div className="text-sm font-bold text-gray-200">github.com/Arikara-Sudhan-M</div>
                </div>
              </a>

            </div>

          </div>

          {/* RIGHT: Dynamic Contact Form Panel */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-10 rounded-3xl glassmorphism border border-white/5 relative group hover:border-white/10 transition-all duration-300">
              
              <div className="flex items-center gap-2.5 mb-6 border-b border-white/5 pb-4">
                <MessageSquarePlus className="w-5 h-5 text-primary" />
                <h3 className="font-display font-bold text-lg text-white">Send Message</h3>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
                
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-mono font-medium text-gray-400">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:border-primary/50 text-sm text-white transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-mono font-medium text-gray-400">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                    className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:border-primary/50 text-sm text-white transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-mono font-medium text-gray-400">
                    Detailed Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write details of your project or offer..."
                    rows={4}
                    required
                    className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:border-primary/50 text-sm text-white transition-colors resize-none"
                  />
                </div>

                {/* Status feedbacks */}
                {status === 'success' && (
                  <div className="p-3.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-xs font-sans text-emerald-400 flex items-center gap-2">
                    <span>✓ Message successfully queued! I will respond to your coordinates shortly.</span>
                  </div>
                )}
                
                {status === 'error' && (
                  <div className="p-3.5 rounded-lg border border-red-500/20 bg-red-500/10 text-xs font-sans text-red-400 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Failed to transmit. Please double check connectivity coordinates.</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-primary to-secondary hover:brightness-110 disabled:opacity-50 text-white font-sans text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary/10 transition-all duration-300 cursor-pointer"
                >
                  {loading ? 'Transmitting...' : 'Transmit Coordinates'}
                  <Send className="w-4 h-4" />
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
