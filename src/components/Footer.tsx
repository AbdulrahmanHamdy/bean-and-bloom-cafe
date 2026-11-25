import React from 'react';
import { Link } from 'react-router-dom';
import { CAFE_INFO } from '../data/menu';
import { 
  InstagramLogo, 
  FacebookLogo, 
  MapPin, 
  Phone, 
  EnvelopeSimple, 
  Clock, 
  Heart 
} from '@phosphor-icons/react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1F120B] text-[#FDFBF7] pt-16 pb-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Story */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#C88342] text-white flex items-center justify-center shadow-md">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 19h18v2H2v-2zm2-17h13v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V2zm13 2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2V4zm-6 0c1.5 0 2.5 1 2.5 2.5S12.5 9 11 9s-2.5-1-2.5-2.5S9.5 4 11 4z" />
                </svg>
              </div>
              <span className="font-heading font-black text-xl text-[#FDFBF7] tracking-tight">
                Bean &amp; Bloom
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#FDFBF7]/70 leading-relaxed font-light">
              Cairo’s boutique sanctuary for single-origin specialty coffee, molten Belgian chocolate bakes, and peaceful mornings.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={CAFE_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C88342] text-[#FDFBF7] flex items-center justify-center transition-colors duration-300"
              >
                <InstagramLogo size={18} weight="bold" />
              </a>
              <a
                href={CAFE_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C88342] text-[#FDFBF7] flex items-center justify-center transition-colors duration-300"
              >
                <FacebookLogo size={18} weight="bold" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-black text-xs tracking-widest uppercase text-[#C88342] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#FDFBF7]/80">
              <li>
                <Link to="/menu" className="hover:text-white transition-colors">
                  3D Specialty Menu
                </Link>
              </li>
              <li>
                <Link to="/reservations" className="hover:text-white transition-colors">
                  Reserve a Table
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Our Roastery Story
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white transition-colors">
                  Ambiance Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Find Us in Cairo
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-heading font-black text-xs tracking-widest uppercase text-[#C88342] mb-4">
              Hours
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-[#FDFBF7]/80">
              <div className="flex items-start gap-2.5">
                <Clock size={18} className="text-[#C88342] shrink-0 mt-0.5" weight="bold" />
                <div>
                  <p className="font-bold text-[#FDFBF7]">Sunday to Thursday</p>
                  <p className="text-xs text-[#FDFBF7]/60">{CAFE_INFO.hours.weekdays}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock size={18} className="text-[#C88342] shrink-0 mt-0.5" weight="bold" />
                <div>
                  <p className="font-bold text-[#FDFBF7]">Friday &amp; Saturday</p>
                  <p className="text-xs text-[#FDFBF7]/60">{CAFE_INFO.hours.weekends}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Contact */}
          <div>
            <h4 className="font-heading font-black text-xs tracking-widest uppercase text-[#C88342] mb-4">
              Visit Us
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#FDFBF7]/80">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="text-[#C88342] shrink-0 mt-0.5" weight="fill" />
                <span>{CAFE_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-[#C88342] shrink-0" weight="fill" />
                <span>{CAFE_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <EnvelopeSimple size={16} className="text-[#C88342] shrink-0" weight="bold" />
                <span>{CAFE_INFO.email}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FDFBF7]/50">
          <p>© 2026 Bean &amp; Bloom Café. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Crafted with <Heart size={14} className="text-[#C88342]" weight="fill" /> in Zamalek, Cairo.
          </p>
        </div>
      </div>
    </footer>
  );
};
