import React from 'react';
import { MenuCarousel3D } from '../components/MenuCarousel3D';
import { MENU_ITEMS } from '../data/menu';
import { CalendarCheck, WhatsappLogo } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { CAFE_INFO } from '../data/menu';

export const Menu: React.FC = () => {
  return (
    <div className="py-10 space-y-16">
      
      {/* 3D Carousel Stage as the main interactive showcase */}
      <MenuCarousel3D initialCategory="all" />

      {/* Tasting Notes & Artisan Breakdown (Clean Editorial List - No generic flat grid) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="border-t border-[#23140E]/10 pt-12 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#C88342] uppercase tracking-wider block">
              Full Tasting Portfolio
            </span>
            <h3 className="text-2xl font-heading font-black text-[#23140E]">
              All Roastery &amp; Patisserie Items
            </h3>
          </div>
          <Link
            to="/reservations"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#173824] text-white text-xs font-bold hover:bg-[#23140E] transition-colors shadow-sm"
          >
            <CalendarCheck size={16} weight="bold" />
            <span>Book Table to Taste</span>
          </Link>
        </div>

        {/* Clean Editorial Menu Rows */}
        <div className="divide-y divide-[#23140E]/10">
          {MENU_ITEMS.map((item) => (
            <div
              key={item.id}
              className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F5EFEB]/50 px-4 rounded-2xl transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm shrink-0 bg-[#2E1A11]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading font-bold text-base text-[#23140E] group-hover:text-[#C88342] transition-colors">
                      {item.name}
                    </h4>
                    {item.tag && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#7B8F71]/20 text-[#58694F]">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#23140E]/70 line-clamp-1 mt-0.5">
                    {item.description}
                  </p>
                  {item.notes && (
                    <span className="text-[11px] text-[#7B8F71] italic block mt-0.5">
                      {item.notes}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                <div className="text-right">
                  <span className="font-heading font-black text-base text-[#23140E]">
                    {item.price}
                  </span>
                  {item.calories && (
                    <span className="text-[10px] text-[#23140E]/50 block">
                      {item.calories}
                    </span>
                  )}
                </div>

                <a
                  href={`${CAFE_INFO.whatsappLink}Item%3A%20${encodeURIComponent(item.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#FDFBF7] border border-[#23140E]/15 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all flex items-center gap-1.5"
                >
                  <WhatsappLogo size={14} weight="fill" />
                  <span>Order</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
