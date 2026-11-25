import React from 'react';
import { ContactForm } from '../components/ContactForm';
import { CAFE_INFO } from '../data/menu';
import { 
  MapPin, 
  Phone, 
  EnvelopeSimple, 
  Clock, 
  WhatsappLogo, 
  NavigationArrow 
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-12 overflow-hidden">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-2xl mx-auto"
      >
        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black bg-[#C88342]/15 text-[#C88342] uppercase tracking-wider mb-2">
          Connect With Us
        </span>
        <h1 className="text-4xl sm:text-5xl font-heading font-black text-[#1F120B]">
          Visit Us in Zamalek
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#1F120B]/70 leading-relaxed font-light">
          Drop by for your morning brew, message us on WhatsApp for fast inquiries, or send our Cairo team a note below.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Contact Info & Hours */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <div className="bg-[#F5ECE0] rounded-3xl p-6 sm:p-8 border border-[#1F120B]/10 space-y-6 shadow-sm">
            <h3 className="font-heading font-black text-xl text-[#1F120B]">
              Café Details
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#173824] text-[#E5D7B7] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <MapPin size={20} weight="fill" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#1F120B]">Our Location</h4>
                  <p className="text-sm text-[#1F120B]/75 font-light">{CAFE_INFO.address}</p>
                  <a
                    href="https://maps.google.com/?q=Zamalek+Cairo+Egypt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#C88342] hover:underline mt-1"
                  >
                    <span>Open in Google Maps</span>
                    <NavigationArrow size={12} weight="bold" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#173824] text-[#E5D7B7] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Clock size={20} weight="bold" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#1F120B]">Opening Hours</h4>
                  <p className="text-xs text-[#1F120B]/75 font-light">Sunday – Thursday: {CAFE_INFO.hours.weekdays}</p>
                  <p className="text-xs text-[#1F120B]/75 font-light">Friday &amp; Saturday: {CAFE_INFO.hours.weekends}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#173824] text-[#E5D7B7] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Phone size={20} weight="fill" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#1F120B]">Direct Phone</h4>
                  <p className="text-sm text-[#1F120B]/75 font-light">{CAFE_INFO.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#173824] text-[#E5D7B7] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <EnvelopeSimple size={20} weight="bold" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#1F120B]">Email Inquiries</h4>
                  <p className="text-sm text-[#1F120B]/75 font-light">{CAFE_INFO.email}</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <WhatsappLogo size={30} weight="fill" className="text-[#25D366]" />
                <div>
                  <p className="font-heading font-bold text-xs text-[#1F120B]">Instant WhatsApp Support</p>
                  <p className="text-[11px] text-[#1F120B]/70 font-light">Fast responses for table hold or catering</p>
                </div>
              </div>
              <a
                href={CAFE_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full text-xs font-black bg-[#25D366] text-white hover:brightness-105 active:scale-95 transition"
              >
                Chat Now
              </a>
            </div>

          </div>

          {/* Embedded Google Map */}
          <div className="rounded-3xl overflow-hidden border border-[#1F120B]/10 shadow-md h-64 bg-[#EBF0E8]">
            <iframe
              title="Bean & Bloom Zamalek Cairo Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13814.28668744005!2d31.218556488390776!3d30.060136279144023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840e60802c639%3A0x6d953187a419eb50!2sZamalek%2C%20Cairo%20Governorate%2C%20Egypt!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <ContactForm />
        </motion.div>

      </div>

    </div>
  );
};
