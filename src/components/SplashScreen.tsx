import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cup3DCanvas } from './Cup3DCanvas';
import { ArrowRight, Sparkle } from '@phosphor-icons/react';

interface SplashScreenProps {
  onFinish?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Keep splash screen visible for 2.6 seconds then smoothly curtain-slide out
    const timer = setTimeout(() => {
      handleClose();
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    if (onFinish) onFinish();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%', 
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#13281B] text-[#FDFBF7] select-none overflow-hidden"
        >
          {/* Ambient radial halo behind 3D cup */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-[#C88342]/15 blur-[120px] pointer-events-none" />

          {/* Steaming paths above the 3D cup */}
          <div className="relative z-10 flex flex-col items-center">
            
            {/* Animated Rising Steam Particles */}
            <div className="flex gap-3 mb-[-15px] z-20">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15, scaleY: 0.5 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    y: [-4, -34],
                    scaleY: [0.5, 1.3, 0.6],
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'easeInOut',
                  }}
                  className="w-1.5 h-8 rounded-full bg-[#E5D7B7]/50 blur-[0.8px]"
                />
              ))}
            </div>

            {/* REAL 3D WEBGL CUP (Interactive in Splash Screen) */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-64 h-64 sm:w-72 sm:h-72"
            >
              <Cup3DCanvas
                cupColor="#173824"
                sleeveColor="#E7D8C0"
                lidColor="#102719"
                size="S"
                className="w-full h-full"
              />

              {/* Glowing Pulse Ring under cup */}
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0, 0.35] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-x-8 bottom-6 h-10 rounded-full border border-[#C88342] pointer-events-none"
              />
            </motion.div>

            {/* Brand Title & Tagline Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mt-2 text-center space-y-1 z-20"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-[#E5D7B7] text-[11px] font-black uppercase tracking-widest mb-1 border border-white/15">
                <Sparkle size={12} weight="fill" className="text-[#C88342]" />
                <span>Cairo Roastery &amp; Patisserie</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-[#FDFBF7]">
                Bean &amp; Bloom
              </h1>
              <p className="text-xs tracking-widest uppercase font-semibold text-[#C88342]">
                A little coffee, a lot of happiness
              </p>
            </motion.div>

            {/* Loading progress bar */}
            <div className="mt-6 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.4, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-[#C88342] to-[#E5D7B7]"
              />
            </div>

            {/* Quick Skip Intro Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={handleClose}
              className="mt-5 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-[11px] font-black tracking-wider uppercase transition-all duration-200 border border-white/15"
            >
              <span>Enter Café</span>
              <ArrowRight size={12} weight="bold" />
            </motion.button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
