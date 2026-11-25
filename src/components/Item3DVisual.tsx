import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Cup3DCanvas } from './Cup3DCanvas';
import { Cube } from '@phosphor-icons/react';

interface Item3DVisualProps {
  image: string;
  name: string;
  category: string;
  size?: 'S' | 'M' | 'L';
  isSpotlight?: boolean;
}

export const Item3DVisual: React.FC<Item3DVisualProps> = ({
  image,
  name,
  category,
  size = 'M',
  isSpotlight = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showWebGlCup, setShowWebGlCup] = useState(false);

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for 3D tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [16, -16]), {
    damping: 18,
    stiffness: 150,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), {
    damping: 18,
    stiffness: 150,
  });

  const particleX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-24, 24]), {
    damping: 15,
    stiffness: 120,
  });
  const particleY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-24, 24]), {
    damping: 15,
    stiffness: 120,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const sizeScales = {
    S: 0.9,
    M: 1.05,
    L: 1.18,
  };

  const currentScale = sizeScales[size];

  // Map category to 3D cup colors
  const getCupColor = () => {
    if (category === 'coffee') return '#173824';
    if (category === 'cold-drinks') return '#2A4D34';
    return '#23140E';
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none flex items-center justify-center perspective-1000 ${
        isSpotlight ? 'h-64 sm:h-72 w-full' : 'h-48 w-full'
      }`}
    >
      {/* 3D Back Glow Halo */}
      <motion.div
        animate={{
          scale: isHovered ? [1, 1.15, 1] : 1,
          opacity: isHovered ? 0.35 : 0.2,
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-44 h-44 rounded-full bg-[#C88342] blur-[50px] pointer-events-none"
      />

      {/* Realistic 3D Ground Contact Shadow */}
      <motion.div
        animate={{
          scaleX: size === 'L' ? 1.25 : size === 'S' ? 0.85 : 1.05,
          opacity: isHovered ? 0.6 : 0.45,
          scaleY: isHovered ? 0.7 : 0.5,
        }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-1 w-36 sm:w-44 h-7 rounded-full bg-[#1F120B]/40 blur-[10px] pointer-events-none"
      />

      {/* Toggle Button for 3D WebGL Cup Model in Spotlight */}
      {isSpotlight && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowWebGlCup(!showWebGlCup);
          }}
          className="absolute -top-3 right-0 z-40 px-3 py-1 rounded-full bg-[#1F120B] text-[#FDFBF7] text-[10px] font-black uppercase tracking-wider border border-white/20 shadow-md flex items-center gap-1 hover:bg-[#C88342] transition-colors"
        >
          <Cube size={13} weight="bold" />
          <span>{showWebGlCup ? 'Show Food View' : 'Interactive 3D Cup'}</span>
        </button>
      )}

      {/* IF 3D WEBGL CUP IS TOGGLED */}
      {showWebGlCup && isSpotlight ? (
        <div className="w-full h-full relative z-20 flex items-center justify-center">
          <Cup3DCanvas
            cupColor={getCupColor()}
            size={size}
            className="w-full h-64 sm:h-72"
          />
        </div>
      ) : (
        /* FLOATING 3D ITEM WITH PARTICLES */
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          animate={{
            scale: currentScale,
            y: isHovered ? -12 : -4,
          }}
          transition={{ type: 'spring', damping: 14, stiffness: 120 }}
          className="relative z-20 flex items-center justify-center cursor-grab active:cursor-grabbing"
        >
          {/* Main Floating Beverage/Food Visual */}
          <div
            style={{ transform: 'translateZ(45px)' }}
            className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-3xl overflow-hidden shadow-[0_20px_45px_rgba(31,18,11,0.35)] border-4 border-white/80 bg-[#1F120B] group"
          >
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 pointer-events-none" />
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#C88342]/70 to-transparent" />
          </div>

          {/* Orbiting Particle 1: Roasted Coffee Bean */}
          <motion.div
            style={{
              x: particleX,
              y: particleY,
              transform: 'translateZ(85px)',
            }}
            animate={{
              rotate: [0, 15, -10, 0],
              y: [0, -8, 4, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-3 -left-4 z-30 w-10 h-10 rounded-full bg-[#1F120B] border-2 border-[#C88342]/60 shadow-[0_8px_20px_rgba(0,0,0,0.4)] flex items-center justify-center text-[#E5D7B7] text-xs font-bold pointer-events-none"
          >
            <svg className="w-5 h-5 text-[#C88342]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </motion.div>

          {/* Orbiting Particle 2: Golden Caramel Tag */}
          <motion.div
            style={{
              x: useTransform(particleX, (v) => -v),
              y: useTransform(particleY, (v) => -v),
              transform: 'translateZ(75px)',
            }}
            animate={{
              rotate: [0, -20, 15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-2 -right-3 z-30 px-2.5 py-1 rounded-xl bg-[#C88342] border border-white/40 shadow-[0_8px_18px_rgba(200,131,66,0.4)] text-[10px] font-black uppercase tracking-wider text-white pointer-events-none"
          >
            {category === 'coffee' ? 'Single-Origin' : 'Molten'}
          </motion.div>

          {/* Orbiting Particle 3: Aroma Steam Dot */}
          <motion.div
            style={{ transform: 'translateZ(65px)' }}
            animate={{
              opacity: [0.3, 0.9, 0.3],
              y: [-2, -14, -2],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-6 right-6 w-3 h-3 rounded-full bg-[#E5D7B7] blur-[1px] pointer-events-none"
          />
        </motion.div>
      )}
    </div>
  );
};
