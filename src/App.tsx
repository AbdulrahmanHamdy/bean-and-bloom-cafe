import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Reservations } from './pages/Reservations';
import { Gallery } from './pages/Gallery';
import { SplashScreen } from './components/SplashScreen';
import { WhatsappLogo } from '@phosphor-icons/react';
import { CAFE_INFO } from './data/menu';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {/* Luxury Animated Splash Screen */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#23140E]">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />

          {/* Floating WhatsApp Contact Button */}
          <a
            href={CAFE_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Order or chat on WhatsApp"
            className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group"
          >
            <WhatsappLogo size={30} weight="fill" />
            <span className="absolute right-16 px-3 py-1.5 rounded-xl bg-[#23140E] text-white text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-md">
              Chat on WhatsApp
            </span>
          </a>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
