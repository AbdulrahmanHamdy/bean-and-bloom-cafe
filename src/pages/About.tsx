import React from 'react';
import { Coffee, Plant, Heart, ShieldCheck } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-20 overflow-hidden">
      
      {/* Editorial Story Header */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black bg-[#173824]/10 text-[#173824] uppercase tracking-wider">
            Our Cairo Roots
          </span>
          <h1 className="text-4xl sm:text-5xl font-heading font-black text-[#1F120B] leading-tight">
            A little coffee, a lot of happiness in the heart of Zamalek.
          </h1>
          <p className="text-base text-[#1F120B]/80 leading-relaxed font-light">
            Founded in 2026, Bean &amp; Bloom Café was born from a desire to escape the frantic pulse of the metropolis and create an oasis of slow living. Tucked under the leafy jacaranda trees of El-Gezira Street, our space combines warm Scandinavian minimalism with timeless Egyptian hospitality.
          </p>
          <p className="text-base text-[#1F120B]/80 leading-relaxed font-light">
            Every morning at 6:30 AM, our bakers ignite the stone ovens for freshly laminated brioche knots and molten Valrhona cookies, while our baristas calibrate single-origin beans sourced directly from sustainable high-altitude farms.
          </p>
          <div className="pt-2 flex items-center gap-4">
            <Link
              to="/reservations"
              className="px-6 py-3 rounded-full font-heading font-black text-xs sm:text-sm bg-[#C88342] text-white hover:bg-[#B47132] transition-colors shadow-md"
            >
              Book Your Visit
            </Link>
            <Link
              to="/menu"
              className="px-6 py-3 rounded-full font-heading font-black text-xs sm:text-sm border border-[#1F120B]/20 text-[#1F120B] hover:bg-black/5 transition-colors"
            >
              Discover Our Roasts
            </Link>
          </div>
        </motion.div>

        {/* Visual Composition */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#1F120B]/10">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80"
              alt="Bean & Bloom interior"
              className="w-full h-[440px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F120B]/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs uppercase tracking-widest text-[#C88342] font-black block mb-1">
                Zamalek, Cairo
              </span>
              <p className="font-heading font-bold text-lg text-white">
                Sunlit patio &amp; velvet interior lounge
              </p>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-4 sm:left-6 bg-[#FDFBF7] border border-[#1F120B]/10 rounded-2xl p-4 shadow-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#173824] text-[#E5D7B7] flex items-center justify-center">
              <Coffee size={20} weight="fill" />
            </div>
            <div>
              <p className="font-heading font-black text-sm text-[#1F120B]">Micro-Roasting Daily</p>
              <p className="text-xs text-[#1F120B]/60 font-medium">100% Arabica Microlots</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Pillars & Values */}
      <section className="bg-[#F5ECE0] rounded-3xl p-8 sm:p-14 border border-[#1F120B]/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-xl mx-auto mb-12"
        >
          <span className="text-xs font-black text-[#C88342] tracking-wider uppercase block mb-1">
            Core Values
          </span>
          <h2 className="text-3xl font-heading font-black text-[#1F120B]">
            What We Stand For
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: ShieldCheck,
              bg: 'bg-[#173824]',
              color: 'text-[#E5D7B7]',
              title: 'Uncompromising Quality',
              desc: 'We never cut corners. Our chocolate is genuine Belgian Valrhona, our flour is organic stone-ground, and our dairy comes fresh from local farms.',
            },
            {
              icon: Plant,
              bg: 'bg-[#1E3F2A]',
              color: 'text-white',
              title: 'Community & Eco-Minded',
              desc: 'We use 100% biodegradable take-away cups, compost all spent coffee grounds for urban Cairo gardens, and feature local artists on our walls.',
            },
            {
              icon: Heart,
              bg: 'bg-[#C88342]',
              color: 'text-white',
              title: 'Heartfelt Hospitality',
              desc: 'Whether you stay for ten minutes or five hours with your laptop, you are welcomed like family with radiant energy and sincere care.',
            },
          ].map((val, idx) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#1F120B]/10 space-y-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-10 h-10 rounded-xl ${val.bg} ${val.color} flex items-center justify-center`}>
                  <Icon size={22} weight="fill" />
                </div>
                <h3 className="font-heading font-black text-lg text-[#1F120B]">
                  {val.title}
                </h3>
                <p className="text-sm text-[#1F120B]/70 leading-relaxed font-light">
                  {val.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
