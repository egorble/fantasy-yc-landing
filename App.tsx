import React from 'react';
import { HeroSequence } from './components/HeroSequence';
import { TradingSequence } from './components/TradingSequence';
import { CompetitionSequence } from './components/CompetitionSequence';
import { RewardsSequence } from './components/RewardsSequence';
import { Marquee } from './components/Marquee';
import { Footer } from './components/Footer';
import { Button } from './components/ui/Button';

const App: React.FC = () => {
  return (
    <main className="w-full bg-[#F0F0F0] min-h-screen">
      {/* Sticky Header / Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center pointer-events-none mix-blend-difference text-white">
        <div className="font-black text-2xl tracking-tighter uppercase font-mono flex items-center gap-2">
            <img src="/unicornx.png" alt="UnicornX" className="w-8 h-8" />
            Unicorn<span className="text-[#F26522]">X</span>
        </div>
      </nav>

      <HeroSequence />
      <Marquee />
      <TradingSequence />
      <CompetitionSequence />
      <RewardsSequence />
      <Footer />
      
      {/* Persistent CTA Bottom Right */}
      <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50">
        <a href="https://app.unicornx.fun/" target="_blank" rel="noopener noreferrer">
          <Button className="text-xs sm:text-sm bg-[#CCFF00] px-3 py-2 sm:px-4 sm:py-2 shadow-[4px_4px_0px_0px_#000] sm:shadow-[6px_6px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] sm:hover:shadow-[8px_8px_0px_0px_#000]">
              START TRADING
          </Button>
        </a>
      </div>
    </main>
  );
};

export default App;