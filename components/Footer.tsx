import React from 'react';
import { Button } from './ui/Button';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-[#F0F0F0] pt-24 pb-12 flex flex-col items-center justify-center text-center relative overflow-hidden">

            {/* Decorative Stacked Cards */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 -mt-32 pointer-events-none opacity-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-96 bg-black transform -rotate-12 border-2 border-white"></div>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-64 h-96 bg-[#F26522] transform rotate-12 border-2 border-black"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4">
                <h2 className="text-5xl md:text-8xl font-black mb-8 uppercase tracking-tighter leading-none">
                    Start Your <br /> Portfolio.
                </h2>

                <div className="flex flex-col items-center gap-6">
                    <a href="https://app.unicronx.fun" target="_blank" rel="noopener noreferrer">
                        <Button className="text-xl px-12 py-6 bg-[#F26522] hover:bg-[#ff7b3d] shadow-[8px_8px_0px_0px_#050505]">
                            OPEN FIRST PACK FOR FREE
                        </Button>
                    </a>

                    <a href="https://app.unicronx.fun" target="_blank" rel="noopener noreferrer" className="font-mono font-bold hover:underline hover:text-[#F26522] transition-colors flex items-center gap-2">
                        VIEW LEADERBOARD <span className="text-xl">→</span>
                    </a>
                </div>

                <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 text-left border-t-2 border-black pt-12">
                    <div>
                        <h5 className="font-bold mb-4 uppercase">Platform</h5>
                        <ul className="space-y-2 font-mono text-sm text-gray-600">
                            <li><a href="#" className="hover:text-black">Marketplace</a></li>
                            <li><a href="#" className="hover:text-black">Leagues</a></li>
                            <li><a href="#" className="hover:text-black">Drops</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold mb-4 uppercase">Company</h5>
                        <ul className="space-y-2 font-mono text-sm text-gray-600">
                            <li><a href="#" className="hover:text-black">About Us</a></li>
                            <li><a href="#" className="hover:text-black">Careers</a></li>
                            <li><a href="#" className="hover:text-black">Press</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold mb-4 uppercase">Legal</h5>
                        <ul className="space-y-2 font-mono text-sm text-gray-600">
                            <li><a href="#" className="hover:text-black">Terms</a></li>
                            <li><a href="#" className="hover:text-black">Privacy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold mb-4 uppercase">Social</h5>
                        <div className="flex gap-4">
                            <div className="w-8 h-8 bg-black"></div>
                            <div className="w-8 h-8 bg-[#F26522]"></div>
                            <div className="w-8 h-8 bg-[#CCFF00]"></div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 font-mono text-xs text-gray-400">
                    © 2026 UNICORNX. THIS IS A GAME.
                </div>
            </div>
        </footer>
    );
};