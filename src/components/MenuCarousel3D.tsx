import React, { useState } from 'react';
import { MENU_ITEMS } from '../data/menu';
import { Item3DVisual } from './Item3DVisual';
import { 
  CaretLeft, 
  CaretRight, 
  Sparkle, 
  CalendarCheck, 
  Heart,
  Fire
} from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface MenuCarousel3DProps {
  initialCategory?: 'all' | 'coffee' | 'cold-drinks' | 'confectionery' | 'breakfast';
}

export const MenuCarousel3D: React.FC<MenuCarousel3DProps> = ({ initialCategory = 'all' }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L'>('M');
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'All Signature' },
    { id: 'confectionery', label: 'Confectionery & Bakes' },
    { id: 'coffee', label: 'Artisan Coffee' },
    { id: 'cold-drinks', label: 'Cold Frappes & Brews' },
    { id: 'breakfast', label: 'Breakfast' },
  ];

  const items = selectedCategory === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter((i) => i.category === selectedCategory);

  const safeIndex = items.length === 0 ? 0 : (currentIndex % items.length + items.length) % items.length;
  const currentItem = items[safeIndex] || MENU_ITEMS[0];

  const prevIndex = (safeIndex - 1 + items.length) % items.length;
  const nextIndex = (safeIndex + 1) % items.length;
  const prevItem = items[prevIndex];
  const nextItem = items[nextIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const getCalculatedPrice = (base: number) => {
    if (selectedSize === 'S') return Math.round(base * 0.85);
    if (selectedSize === 'L') return Math.round(base * 1.25);
    return base;
  };

  return (
    <section className="relative py-12 px-4 sm:px-6 overflow-hidden">
      
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-8">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black bg-[#C88342]/15 text-[#C88342] uppercase tracking-wider mb-3">
          3D Interactive Showcase
        </span>
        <h2 className="text-3xl sm:text-5xl font-heading font-black text-[#1F120B] uppercase tracking-tight">
          A Little Different. <span className="text-[#C88342]">Deliciously So.</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#1F120B]/70 max-w-xl mx-auto font-light">
          Experience our creations floating in interactive 3D space. Move your cursor to tilt the item, choose your portion size, and book your table.
        </p>

        {/* Category Pill Bar (Unifying with the Header / Hero cream pill styling) */}
        <div className="mt-6 inline-flex flex-wrap items-center justify-center p-1.5 bg-[#F5ECE0] rounded-full border border-[#1F120B]/10 shadow-sm gap-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id as any);
                setCurrentIndex(0);
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-heading font-bold transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-[#1F120B] text-[#FDFBF7] shadow-md scale-102'
                  : 'text-[#1F120B]/70 hover:text-[#1F120B] hover:bg-white/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================================
          3D STAGE CAROUSEL DECK
      ========================================================================== */}
      <div className="max-w-5xl mx-auto relative pt-12 pb-6">
        
        <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8 relative min-h-[500px]">
          
          {/* Left Flanking Preview Card */}
          {items.length > 1 && (
            <motion.div
              onClick={handlePrev}
              whileHover={{ scale: 0.95 }}
              className="hidden md:flex flex-col items-center w-56 lg:w-64 opacity-50 hover:opacity-85 transition-opacity cursor-pointer transform -translate-x-4 scale-90 select-none"
            >
              <div className="w-full">
                <Item3DVisual
                  image={prevItem.image}
                  name={prevItem.name}
                  category={prevItem.category}
                  size="S"
                />
              </div>
              <div className="w-full bg-[#F5ECE0] rounded-2xl p-4 text-center border border-[#1F120B]/10 shadow-sm mt-[-10px]">
                <h4 className="font-heading font-bold text-xs text-[#1F120B] line-clamp-1">
                  {prevItem.name}
                </h4>
                <p className="text-xs text-[#C88342] font-black mt-1">
                  {prevItem.price}
                </p>
              </div>
            </motion.div>
          )}

          {/* =====================================================================
              CENTER 3D BREAKOUT PODIUM CARD
          ====================================================================== */}
          <div className="relative w-full max-w-sm sm:max-w-md z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, scale: 0.93, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: -15 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-[#F5ECE0] rounded-3xl p-6 sm:p-8 border-2 border-[#1F120B]/10 shadow-[0_25px_60px_rgba(31,18,11,0.15)]"
              >
                {/* 3D Item Visual breaking out of the card */}
                <div className="relative -mt-16 sm:-mt-20 mb-3 flex justify-center">
                  <Item3DVisual
                    image={currentItem.image}
                    name={currentItem.name}
                    category={currentItem.category}
                    size={selectedSize}
                    isSpotlight={true}
                  />

                  {/* Top-Right Wishlist Heart */}
                  <button
                    onClick={() => setLiked({ ...liked, [currentItem.id]: !liked[currentItem.id] })}
                    aria-label="Add to favorites"
                    className="absolute top-8 right-2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md shadow-md text-[#1F120B] flex items-center justify-center hover:bg-white active:scale-90 transition"
                  >
                    <Heart
                      size={18}
                      className={liked[currentItem.id] ? 'fill-red-500 text-red-500' : 'text-[#1F120B]'}
                    />
                  </button>
                </div>

                {/* Information */}
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F120B] text-[#FDFBF7] text-[11px] font-black uppercase tracking-wider">
                    <Sparkle size={12} className="text-[#C88342] fill-[#C88342]" />
                    <span>{currentItem.tag || currentItem.category}</span>
                  </div>
                  <h3 className="text-2xl font-heading font-black text-[#1F120B] leading-tight">
                    {currentItem.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1F120B]/75 line-clamp-2 px-1 font-light leading-relaxed">
                    {currentItem.description}
                  </p>
                </div>

                {/* Interactive Size Selector (S, M, L) */}
                <div className="my-5 pt-4 border-t border-[#1F120B]/10">
                  <div className="flex items-center justify-between mb-2 px-1 text-xs font-semibold">
                    <span className="text-[#1F120B]/70">Portion Size:</span>
                    {currentItem.calories && (
                      <span className="text-[#1E3F2A] font-bold flex items-center gap-1">
                        <Fire size={13} className="text-[#C88342] fill-[#C88342]" />
                        {currentItem.calories}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {(['S', 'M', 'L'] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 rounded-xl text-xs font-heading font-black transition-all duration-200 ${
                          selectedSize === size
                            ? 'bg-[#1F120B] text-[#FDFBF7] shadow-md scale-102'
                            : 'bg-white/80 border border-[#1F120B]/10 text-[#1F120B] hover:bg-white'
                        }`}
                      >
                        {size === 'S' && 'Small (8oz)'}
                        {size === 'M' && 'Regular (12oz)'}
                        {size === 'L' && 'Grand (16oz)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price & Action Row */}
                <div className="flex items-center justify-between gap-3 pt-3">
                  <div>
                    <span className="text-[10px] uppercase font-black text-[#1F120B]/50 block">
                      Starting At
                    </span>
                    <span className="font-heading font-black text-2xl sm:text-3xl text-[#1F120B]">
                      {getCalculatedPrice(currentItem.numericPrice)} EGP
                    </span>
                  </div>

                  <Link
                    to="/reservations"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-heading font-black text-xs sm:text-sm bg-[#C88342] text-white hover:bg-[#B47132] active:scale-95 transition-all shadow-lg shadow-[#C88342]/25"
                  >
                    <CalendarCheck size={16} />
                    <span>Reserve to Taste</span>
                  </Link>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Previous & Next Control Arrows */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={handlePrev}
                aria-label="Previous Creation"
                className="w-12 h-12 rounded-full bg-white border border-[#1F120B]/15 text-[#1F120B] flex items-center justify-center hover:bg-[#1F120B] hover:text-white active:scale-90 transition-all shadow-md"
              >
                <CaretLeft size={22} />
              </button>

              <span className="text-xs font-black text-[#1F120B]/70 tracking-widest px-2">
                {safeIndex + 1} / {items.length}
              </span>

              <button
                onClick={handleNext}
                aria-label="Next Creation"
                className="w-12 h-12 rounded-full bg-white border border-[#1F120B]/15 text-[#1F120B] flex items-center justify-center hover:bg-[#1F120B] hover:text-white active:scale-90 transition-all shadow-md"
              >
                <CaretRight size={22} />
              </button>
            </div>

          </div>

          {/* Right Flanking Preview Card */}
          {items.length > 1 && (
            <motion.div
              onClick={handleNext}
              whileHover={{ scale: 0.95 }}
              className="hidden md:flex flex-col items-center w-56 lg:w-64 opacity-50 hover:opacity-85 transition-opacity cursor-pointer transform translate-x-4 scale-90 select-none"
            >
              <div className="w-full">
                <Item3DVisual
                  image={nextItem.image}
                  name={nextItem.name}
                  category={nextItem.category}
                  size="S"
                />
              </div>
              <div className="w-full bg-[#F5ECE0] rounded-2xl p-4 text-center border border-[#1F120B]/10 shadow-sm mt-[-10px]">
                <h4 className="font-heading font-bold text-xs text-[#1F120B] line-clamp-1">
                  {nextItem.name}
                </h4>
                <p className="text-xs text-[#C88342] font-black mt-1">
                  {nextItem.price}
                </p>
              </div>
            </motion.div>
          )}

        </div>

      </div>

      {/* Unified Retro Checkerboard Border */}
      <div className="max-w-5xl mx-auto my-6 h-3.5 w-full rounded-full overflow-hidden opacity-20 flex">
        {Array.from({ length: 48 }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-full ${i % 2 === 0 ? 'bg-[#1F120B]' : 'bg-transparent'}`}
          />
        ))}
      </div>

    </section>
  );
};
