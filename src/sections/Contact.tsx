import { Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — will be wired to Supabase
  };

  return (
    <section id="contact" className="py-28 bg-[#1e2d6b]">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        {/* Left info */}
        <div>
          <p
            className="text-xs tracking-[0.3em] text-white/40 uppercase mb-4"
            style={{ fontFamily: 'Commissioner, sans-serif' }}
          >
            Contact
          </p>
          <h2
            className="text-4xl md:text-5xl font-normal text-white leading-tight mb-10"
            style={{ fontFamily: 'Coconat, Georgia, serif' }}
          >
            Parlons de votre projet
          </h2>
          <div className="w-12 h-px bg-white/20 mb-10" />

          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <MapPin size={18} strokeWidth={1} className="text-white/40 mt-0.5 flex-shrink-0" />
              <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: 'Commissioner, sans-serif' }}>
                Paris, France
              </p>
            </div>
            <div className="flex items-start gap-4">
              <Mail size={18} strokeWidth={1} className="text-white/40 mt-0.5 flex-shrink-0" />
              <p className="text-white/60 text-sm" style={{ fontFamily: 'Commissioner, sans-serif' }}>
                contact@sedic.org
              </p>
            </div>
            <div className="flex items-start gap-4">
              <Phone size={18} strokeWidth={1} className="text-white/40 mt-0.5 flex-shrink-0" />
              <p className="text-white/60 text-sm" style={{ fontFamily: 'Commissioner, sans-serif' }}>
                +33 (0)1 00 00 00 00
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label
              className="block text-[10px] tracking-[0.25em] text-white/40 uppercase mb-2"
              style={{ fontFamily: 'Commissioner, sans-serif' }}
            >
              Nom complet
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-white/20 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/60 transition-colors duration-200"
              style={{ fontFamily: 'Commissioner, sans-serif' }}
              placeholder="Votre nom"
            />
          </div>

          <div>
            <label
              className="block text-[10px] tracking-[0.25em] text-white/40 uppercase mb-2"
              style={{ fontFamily: 'Commissioner, sans-serif' }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-white/20 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/60 transition-colors duration-200"
              style={{ fontFamily: 'Commissioner, sans-serif' }}
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label
              className="block text-[10px] tracking-[0.25em] text-white/40 uppercase mb-2"
              style={{ fontFamily: 'Commissioner, sans-serif' }}
            >
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full bg-transparent border-b border-white/20 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/60 transition-colors duration-200 resize-none"
              style={{ fontFamily: 'Commissioner, sans-serif' }}
              placeholder="Décrivez votre projet..."
            />
          </div>

          <button
            type="submit"
            className="mt-4 self-start px-10 py-3.5 border border-white text-white text-xs tracking-[0.2em] font-medium hover:bg-white hover:text-[#1e2d6b] transition-all duration-300"
            style={{ fontFamily: 'Commissioner, sans-serif' }}
          >
            ENVOYER
          </button>
        </form>
      </div>
    </section>
  );
}
