import React from 'react';
import { ReservationForm } from '../components/ReservationForm';
import { ShieldCheck, Clock, Users, Coffee } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

export const Reservations: React.FC = () => {
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
          Reserve Ahead
        </span>
        <h1 className="text-4xl sm:text-5xl font-heading font-black text-[#1F120B]">
          Reserve Your Table
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#1F120B]/70 leading-relaxed font-light">
          Guarantee your favorite spot in our cozy indoor lounge or sunlit garden patio. No booking charges, instantaneous confirmation.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Form */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <ReservationForm />
        </motion.div>

        {/* Right Atmosphere & Perks */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#1F120B]/10 h-64">
            <img
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80"
              alt="Cozy cafe table setting"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F120B]/85 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C88342]">
                Atmosphere Guarantee
              </span>
              <p className="font-heading font-bold text-base text-white">
                Quiet acoustics, warm lighting, and fresh floral blooms
              </p>
            </div>
          </div>

          <div className="bg-[#F5ECE0] rounded-3xl p-6 border border-[#1F120B]/10 space-y-4">
            <h4 className="font-heading font-black text-xs text-[#1F120B] uppercase tracking-wider">
              Booking Perks
            </h4>

            <ul className="space-y-3 text-xs sm:text-sm text-[#1F120B]/80 font-light">
              <li className="flex items-start gap-2.5">
                <ShieldCheck size={18} weight="fill" className="text-[#173824] shrink-0 mt-0.5" />
                <span><strong className="font-bold text-[#1F120B]">No credit card required.</strong> Book free of charge.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={18} weight="bold" className="text-[#C88342] shrink-0 mt-0.5" />
                <span><strong className="font-bold text-[#1F120B]">Table held for 20 minutes</strong> past your selected time.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Users size={18} weight="bold" className="text-[#1F120B] shrink-0 mt-0.5" />
                <span><strong className="font-bold text-[#1F120B]">Parties of 8 or more</strong> receive a complimentary dessert sampler.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Coffee size={18} weight="fill" className="text-[#C88342] shrink-0 mt-0.5" />
                <span><strong className="font-bold text-[#1F120B]">Complimentary sparkling water</strong> on table arrival.</span>
              </li>
            </ul>
          </div>

        </motion.div>

      </div>

    </div>
  );
};
