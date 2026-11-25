import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { CAFE_INFO } from '../data/menu';
import { 
  Coffee, 
  WhatsappLogo, 
  List, 
  X, 
  CalendarCheck, 
  Storefront, 
  BookOpen, 
  Images, 
  EnvelopeSimple 
} from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home', icon: Storefront },
    { to: '/menu', label: '3D Menu', icon: BookOpen },
    { to: '/reservations', label: 'Book Table', icon: CalendarCheck },
    { to: '/about', label: 'Our Story', icon: Coffee },
    { to: '/gallery', label: 'Gallery', icon: Images },
    { to: '/contact', label: 'Contact', icon: EnvelopeSimple },
  ];

  return (
    <header className="sticky top-0 z-50 px-4 sm:px-6 py-3 transition-all duration-300">
      {/* Unified Pill Bar from Caffora & Roast & Ritual */}
      <div className="max-w-6xl mx-auto rounded-full bg-[#F5ECE0]/95 backdrop-blur-md border border-[#1F120B]/10 shadow-[0_8px_30px_rgba(31,18,11,0.06)] px-4 sm:px-6 py-2.5 flex items-center justify-between">
        
        {/* Brand Logo with Cup & Leaf */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-full bg-[#1F120B] text-[#FDFBF7] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
            <svg className="w-5 h-5 text-[#C88342]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 19h18v2H2v-2zm2-17h13v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V2zm13 2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2V4zm-6 0c1.5 0 2.5 1 2.5 2.5S12.5 9 11 9s-2.5-1-2.5-2.5S9.5 4 11 4z" />
            </svg>
          </div>
          <div>
            <span className="font-heading font-black text-lg sm:text-xl text-[#1F120B] tracking-tight block leading-tight">
              Bean &amp; Bloom
            </span>
            <span className="text-[10px] font-black text-[#1E3F2A] tracking-widest uppercase block">
              Cairo Patisserie
            </span>
          </div>
        </Link>

        {/* Desktop Navigation (Centered Cream Pill Group) */}
        <nav className="hidden md:flex items-center gap-1 bg-white/60 p-1 rounded-full border border-[#1F120B]/10">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-full text-xs font-heading font-bold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isActive
                    ? 'bg-[#1F120B] text-[#FDFBF7] shadow-sm'
                    : 'text-[#1F120B]/75 hover:text-[#1F120B] hover:bg-black/5'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Action: WhatsApp & Book Table */}
        <div className="flex items-center gap-2.5">
          <a
            href={CAFE_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex items-center gap-1.5 bg-[#25D366] text-white px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black shadow-sm hover:brightness-105 active:scale-95 transition-all"
          >
            <WhatsappLogo size={18} weight="fill" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          <Link
            to="/reservations"
            className="hidden lg:flex items-center gap-1.5 bg-[#C88342] text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-black hover:bg-[#B47132] active:scale-95 transition-all shadow-sm"
          >
            <CalendarCheck size={16} weight="bold" />
            <span>Book Table</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-full text-[#1F120B] hover:bg-black/5 transition-colors"
          >
            {mobileMenuOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden mt-2 max-w-6xl mx-auto bg-[#FDFBF7] border border-[#1F120B]/10 rounded-3xl shadow-2xl p-5 overflow-hidden"
          >
            <nav className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-heading font-bold transition-all ${
                        isActive
                          ? 'bg-[#1F120B] text-[#FDFBF7]'
                          : 'text-[#1F120B]/80 hover:bg-black/5'
                      }`
                    }
                  >
                    <Icon size={18} weight="bold" />
                    {link.label}
                  </NavLink>
                );
              })}
              <div className="pt-2 mt-2 border-t border-[#1F120B]/10">
                <Link
                  to="/reservations"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center block bg-[#C88342] text-white py-3 rounded-2xl text-xs font-black hover:bg-[#B47132] transition-colors"
                >
                  Book a Table
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
