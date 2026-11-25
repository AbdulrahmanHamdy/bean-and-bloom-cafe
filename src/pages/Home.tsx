import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { MenuCarousel3D } from '../components/MenuCarousel3D';
import { Cup3DCanvas } from '../components/Cup3DCanvas';
import { 
  Sparkle, 
  ArrowRight, 
  Coffee, 
  Cookie, 
  CalendarCheck, 
  MapPin 
} from '@phosphor-icons/react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export const Home: React.FC = () => {
  // Scroll Zoom with Spring Physics
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Smooth springs for buttery scroll tracking
  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 120 });
  const cupScale = useTransform(smoothProgress, [0, 0.6, 1], [1, 1.32, 1.55]);
  const cupY = useTransform(smoothProgress, [0, 1], [0, 50]);
  const headlineOpacity = useTransform(smoothProgress, [0, 0.45], [1, 0.1]);
  const headlineY = useTransform(smoothProgress, [0, 0.5], [0, -30]);
  const contentFade = useTransform(smoothProgress, [0, 0.35], [1, 0.25]);

  const taglineRef = useRef<HTMLDivElement>(null);
  const taglineWords = [
    "A", "little", "coffee,", "a", "lot", "of", "happiness.", 
    "Where", "single-origin", "specialty", "beans", "meet", "molten", 
    "Belgian", "confectionery,", "crafted", "daily", "in", "the", "heart", "of", "Cairo."
  ];

  return (
    <div className="overflow-hidden">
      
      {/* =========================================================================
          HERO SECTION (Featuring Cinematic Scroll-Zoom on 3D Leaning Cup)
      ========================================================================== */}
      <section
        ref={heroRef}
        className="relative bg-[#173824] text-[#FDFBF7] pt-8 pb-20 sm:pb-32 px-4 sm:px-6 overflow-hidden min-h-[90vh]"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#E5D7B7]/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Top Label */}
          <div className="flex items-center justify-between text-xs sm:text-sm font-black text-[#FDFBF7]/75 uppercase tracking-widest pb-4 border-b border-white/10 mb-4">
            <span className="flex items-center gap-1.5">
              <MapPin size={15} className="text-[#C88342]" weight="fill" />
              Zamalek • Cairo
            </span>
            <span className="text-[#E5D7B7] hidden sm:inline">Specialty Micro-Roaster &amp; Patisserie</span>
            <span>Est. 2026</span>
          </div>

          {/* Giant Typography with Parallax Depth */}
          <motion.div
            style={{ opacity: headlineOpacity, y: headlineY }}
            className="text-center relative select-none"
          >
            <motion.h1
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl sm:text-8xl md:text-9xl lg:text-[140px] font-heading font-black tracking-tight uppercase text-[#FDFBF7] leading-none"
              style={{
                letterSpacing: '-0.02em',
                textShadow: '0 14px 45px rgba(0,0,0,0.35)',
              }}
            >
              DRIP &amp; BLOOM
            </motion.h1>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -top-4 left-4 sm:left-16 bg-[#FDFBF7] text-[#173824] px-4 py-1.5 rounded-full text-xs sm:text-sm font-black shadow-2xl border border-white/40 flex items-center gap-1.5"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#C88342] animate-ping" />
              <span>warmth</span>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -top-2 right-4 sm:right-20 bg-[#FDFBF7] text-[#173824] px-4 py-1.5 rounded-full text-xs sm:text-sm font-black shadow-2xl border border-white/40 flex items-center gap-1.5"
            >
              <Sparkle size={15} weight="fill" className="text-[#C88342]" />
              <span>delight</span>
            </motion.div>
          </motion.div>

          {/* 3D LEANING CUP WITH SPRING SCROLL-ZOOM */}
          <motion.div
            style={{
              scale: cupScale,
              y: cupY,
              transformOrigin: '50% 45%',
            }}
            className="relative -mt-8 sm:-mt-14 max-w-xl mx-auto will-change-transform z-20"
          >
            <Cup3DCanvas
              cupColor="#173824"
              sleeveColor="#E8DAC2"
              lidColor="#0F2417"
              size="M"
              className="w-full h-80 sm:h-[420px]"
            />

            <div className="absolute top-4 right-2 sm:right-6 z-30 bg-[#C88342] text-white font-heading font-black text-xs sm:text-sm px-4 py-2 rounded-2xl shadow-xl transform rotate-6 border border-white/20 select-none">
              Taste in Cairo ↗
            </div>
          </motion.div>

          {/* Content & CTAs */}
          <motion.div
            style={{ opacity: contentFade }}
            className="text-center mt-8 space-y-6"
          >
            <p className="text-base sm:text-xl text-[#FDFBF7]/90 max-w-xl mx-auto font-light leading-relaxed">
              Rich, smooth, and freshly roasted coffee crafted from carefully selected Ethiopian &amp; Colombian beans to make every moment more enjoyable.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/reservations"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-heading font-black text-sm bg-[#FDFBF7] text-[#173824] hover:bg-[#E5D7B7] active:scale-95 transition-all shadow-xl"
              >
                <CalendarCheck size={18} weight="bold" />
                <span>Book a Table</span>
              </Link>

              <Link
                to="/menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-heading font-black text-sm bg-white/10 hover:bg-white/20 text-white active:scale-95 transition-all border border-white/20"
              >
                <span>Browse 3D Showcase</span>
                <ArrowRight size={16} weight="bold" />
              </Link>
            </div>

            {/* Retro Stats Bar */}
            <div className="pt-8 max-w-lg mx-auto grid grid-cols-3 gap-4 border-t border-white/15 text-center">
              <div>
                <span className="font-heading font-black text-2xl sm:text-3xl text-[#E5D7B7] block">
                  22+
                </span>
                <span className="text-xs uppercase tracking-wider text-[#FDFBF7]/70 font-semibold">
                  Artisan Flavors
                </span>
              </div>
              <div>
                <span className="font-heading font-black text-2xl sm:text-3xl text-[#E5D7B7] block">
                  12K+
                </span>
                <span className="text-xs uppercase tracking-wider text-[#FDFBF7]/70 font-semibold">
                  Happy Diners
                </span>
              </div>
              <div>
                <span className="font-heading font-black text-2xl sm:text-3xl text-[#E5D7B7] block">
                  4.9★
                </span>
                <span className="text-xs uppercase tracking-wider text-[#FDFBF7]/70 font-semibold">
                  Google Reviews
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* =========================================================================
          TAGLINE REVEAL (Skill B11 - Silky Word-by-Word Scroll Illumination)
      ========================================================================== */}
      <section ref={taglineRef} className="py-24 sm:py-32 bg-[#FDFBF7] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black bg-[#173824]/10 text-[#173824] uppercase tracking-wider mb-4">
            Our Promise to You
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-semibold tracking-tight text-[#1F120B] leading-snug">
            {taglineWords.map((word, idx) => (
              <span
                key={idx}
                className="inline-block mr-2.5 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] text-[#1F120B]/85 hover:text-[#C88342]"
              >
                {word}
              </span>
            ))}
          </h2>
          <div className="mt-8 flex justify-center">
            <span className="w-16 h-1 bg-[#C88342] rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* =========================================================================
          INTERACTIVE 3D MENU STAGE
      ========================================================================== */}
      <section className="bg-[#F5ECE0]/60 py-16 border-y border-[#1F120B]/5">
        <MenuCarousel3D initialCategory="all" />
      </section>

      {/* =========================================================================
          EXPERIENCE HIGHLIGHTS (Staggered Scroll Reveals)
      ========================================================================== */}
      <section className="py-24 bg-[#FDFBF7] px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-xl mx-auto mb-16"
          >
            <span className="text-xs font-black text-[#173824] tracking-wider uppercase block mb-1">
              The Bean &amp; Bloom Difference
            </span>
            <h2 className="text-3xl font-heading font-black text-[#1F120B]">
              Crafted for Your Morning Solitude &amp; Evening Joy
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Coffee,
                bg: 'bg-[#173824]',
                iconColor: 'text-[#E5D7B7]',
                title: 'Ethically Sourced Microlots',
                desc: 'Direct-trade Ethiopian Yirgacheffe and Colombian beans, micro-roasted in small batches to preserve sweet fruit and caramel notes.',
              },
              {
                icon: Cookie,
                bg: 'bg-[#C88342]',
                iconColor: 'text-white',
                title: 'Baked Fresh Every 45 Minutes',
                desc: 'Warm, gooey cookies and flaky laminated pastries pulled fresh from our Cairo ovens all day. Never reheated from yesterday.',
              },
              {
                icon: Sparkle,
                bg: 'bg-[#173824]',
                iconColor: 'text-[#E5D7B7]',
                title: 'Peaceful Zamalek Sanctuary',
                desc: 'High-speed fiber Wi-Fi, sunlit patio seating, velvet armchairs, and acoustic playlists designed for work or deep conversation.',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: idx * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="p-8 rounded-3xl bg-[#F5ECE0] border border-[#1F120B]/10 space-y-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.iconColor} flex items-center justify-center`}>
                    <Icon size={24} weight="fill" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#1F120B]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#1F120B]/75 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FINAL CALL TO ACTION
      ========================================================================== */}
      <section className="py-24 bg-[#173824] text-[#FDFBF7] px-4 sm:px-6 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto text-center relative z-10 space-y-6"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-[#C88342] text-white uppercase tracking-wider">
            Join Us Today
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            Ready for your little coffee and a lot of happiness?
          </h2>
          <p className="text-base text-[#FDFBF7]/80 max-w-lg mx-auto font-light">
            Book your table ahead of time to guarantee your favorite cozy nook, or explore our menu and order via WhatsApp.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/reservations"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full font-heading font-black text-sm bg-[#FDFBF7] text-[#173824] hover:bg-[#E5D7B7] active:scale-95 transition-all shadow-xl"
            >
              Book a Table Now
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full font-heading font-black text-sm bg-white/10 hover:bg-white/20 text-white active:scale-95 transition-all border border-white/20"
            >
              Get Directions to Zamalek
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
};
