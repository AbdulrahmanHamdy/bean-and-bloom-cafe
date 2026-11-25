import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowsOutSimple } from '@phosphor-icons/react';

const GALLERY_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1000&q=80',
    title: 'Molten Caramel Chocolate Chunk Cookie',
    category: 'Confectionery',
  },
  {
    src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
    title: 'Spanish Cortado Pour',
    category: 'Specialty Coffee',
  },
  {
    src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
    title: 'Zamalek Outdoor Sun Patio',
    category: 'Ambiance',
  },
  {
    src: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=80',
    title: 'Valrhona Triple Fudge Tart',
    category: 'Confectionery',
  },
  {
    src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80',
    title: 'Warm Velvet Study Corner',
    category: 'Ambiance',
  },
  {
    src: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=1000&q=80',
    title: 'Salted Caramel Cold Brew',
    category: 'Specialty Coffee',
  },
  {
    src: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=80',
    title: 'Avocado & Dukkah Sourdough',
    category: 'Breakfast',
  },
  {
    src: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1000&q=80',
    title: 'V60 Pour Over Extraction',
    category: 'Specialty Coffee',
  },
  {
    src: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1000&q=80',
    title: 'Burnt Basque Honey Cheesecake',
    category: 'Confectionery',
  },
];

export const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [activeImage, setActiveImage] = useState<{ src: string; title: string; category: string } | null>(null);

  const categories = ['All', 'Confectionery', 'Specialty Coffee', 'Breakfast', 'Ambiance'];

  const filtered = filter === 'All' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter((img) => img.category === filter);

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-10 overflow-hidden">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-2xl mx-auto"
      >
        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black bg-[#173824]/10 text-[#173824] uppercase tracking-wider mb-2">
          Visual Memories
        </span>
        <h1 className="text-4xl sm:text-5xl font-heading font-black text-[#1F120B]">
          Ambiance &amp; Creations
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#1F120B]/70 leading-relaxed font-light">
          Glimpses into our daily roasting, bakery creations, and peaceful corner in Zamalek, Cairo.
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-heading font-bold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              filter === cat
                ? 'bg-[#1F120B] text-[#FDFBF7] shadow-md scale-105'
                : 'bg-white border border-[#1F120B]/15 text-[#1F120B]/75 hover:bg-black/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid with Smooth Spring Layout */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filtered.map((item) => (
            <motion.div
              layout
              key={item.title}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setActiveImage(item)}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="relative h-72 rounded-3xl overflow-hidden cursor-pointer shadow-md group border border-[#1F120B]/10 bg-[#1F120B]"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F120B]/85 via-[#1F120B]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#C88342] px-2.5 py-0.5 rounded-full inline-block mb-1">
                  {item.category}
                </span>
                <p className="font-heading font-bold text-sm line-clamp-1">
                  {item.title}
                </p>
              </div>

              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowsOutSimple size={16} weight="bold" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeImage.src}
                alt={activeImage.title}
                className="w-full h-auto max-h-[75vh] object-contain bg-black"
              />
              <button
                onClick={() => setActiveImage(null)}
                aria-label="Close lightbox"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
              >
                <X size={20} weight="bold" />
              </button>
              <div className="p-4 bg-[#1F120B] text-white flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#C88342] uppercase font-bold">
                    {activeImage.category}
                  </span>
                  <p className="font-heading font-bold text-base">{activeImage.title}</p>
                </div>
                <button
                  onClick={() => setActiveImage(null)}
                  className="px-4 py-1.5 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
