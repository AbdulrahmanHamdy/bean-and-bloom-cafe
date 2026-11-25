import React, { useRef, useState } from 'react';
import type { MenuItem } from '../types';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkle, Fire, ArrowRight, Heart } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

interface MenuCard3DProps {
  item: MenuItem;
  onSelect?: (item: MenuItem) => void;
}

export const MenuCard3D: React.FC<MenuCard3DProps> = ({ item, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [liked, setLiked] = useState(false);

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid weighted motion
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    damping: 20,
    stiffness: 160,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    damping: 20,
    stiffness: 160,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 h-full"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileTap={{ scale: 0.98 }}
        className="relative h-full flex flex-col rounded-2xl bg-[#FDFBF7] border border-[#23140E]/10 shadow-[0_10px_30px_rgba(35,20,14,0.06)] hover:shadow-[0_20px_40px_rgba(35,20,14,0.14)] transition-shadow duration-500 overflow-hidden group"
      >
        {/* Dynamic Specular Sheen Effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              'radial-gradient(circle at 50% 0%, rgba(200, 131, 66, 0.15), transparent 70%)',
          }}
        />

        {/* Top Image Frame with 3D Depth */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#2E1A11]">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            loading="lazy"
          />

          {/* Chocolate Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#23140E]/80 via-[#23140E]/20 to-transparent" />

          {/* Badges / Drips */}
          <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
            {item.badge && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#FDFBF7] text-[#23140E] shadow-sm tracking-wide">
                <Sparkle size={13} weight="fill" className="text-[#C88342]" />
                {item.badge}
              </span>
            )}
            {item.tag && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#7B8F71] text-white shadow-sm">
                {item.tag}
              </span>
            )}
          </div>

          {/* Wishlist / Like Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
            aria-label="Add to favorites"
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-[#23140E]/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#23140E] active:scale-90 transition-all duration-200"
          >
            <Heart
              size={18}
              weight={liked ? 'fill' : 'regular'}
              className={liked ? 'text-[#E05A47]' : 'text-white'}
            />
          </button>

          {/* Price Tag in 3D Layer */}
          <div
            style={{ transform: 'translateZ(30px)' }}
            className="absolute bottom-3 right-3 px-3.5 py-1 rounded-full bg-[#C88342] text-white font-heading font-semibold text-sm shadow-md"
          >
            {item.price}
          </div>

          {item.calories && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs text-[#FDFBF7]/80 font-medium">
              <Fire size={14} weight="fill" className="text-[#C88342]" />
              <span>{item.calories}</span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div
          style={{ transform: 'translateZ(20px)' }}
          className="p-5 flex-1 flex flex-col justify-between"
        >
          <div>
            <h3 className="font-heading font-semibold text-lg text-[#23140E] group-hover:text-[#C88342] transition-colors duration-300 leading-snug">
              {item.name}
            </h3>
            <p className="mt-2 text-sm text-[#23140E]/70 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>

          {item.notes && (
            <div className="mt-3 text-[11px] font-medium text-[#7B8F71] italic">
              • {item.notes}
            </div>
          )}

          {/* Action Row */}
          <div className="mt-5 pt-4 border-t border-[#23140E]/10 flex items-center justify-between">
            <Link
              to="/reservations"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#23140E] hover:text-[#C88342] transition-colors"
            >
              <span>Taste at Café</span>
              <ArrowRight size={13} weight="bold" />
            </Link>

            <button
              onClick={() => onSelect && onSelect(item)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#23140E] text-[#FDFBF7] hover:bg-[#C88342] active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              Quick Details
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
