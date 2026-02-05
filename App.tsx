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
        <div className="font-black text-2xl tracking-tighter uppercase font-mono">
            Fantasy<span className="text-[#F26522]">YC</span>
        </div>
        <div className="pointer-events-auto">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black shadow-none">
                Connect Wallet
            </Button>
        </div>
      </nav>

      <HeroSequence />
      <Marquee />
      <TradingSequence />
      <CompetitionSequence />
      <RewardsSequence />
      <Footer />
      
      {/* Persistent CTA Bottom Right */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button className="hidden md:block bg-[#CCFF00] shadow-[6px_6px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#000]">
            START TRADING
        </Button>
      </div>
    </main>
  );
};

export default App;