import React from 'react';
import { motion } from 'framer-motion';
import { Shirt, Coins, Ticket } from 'lucide-react';
import { Button } from './ui/Button';

export const RewardsSequence: React.FC = () => {
    return (
        <section className="py-24 bg-[#050505] text-white relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">

                <div className="flex flex-col md:flex-row items-center gap-12">

                    {/* TEXT */}
                    <div className="md:w-1/2">
                        <h2 className="text-6xl font-black mb-6 uppercase text-[#F26522]">Play for Keeps</h2>
                        <p className="text-xl font-mono text-gray-400 mb-8 border-l-4 border-[#CCFF00] pl-6">
                            This isn't just paper gains. Convert your fantasy points into real crypto rewards, limited edition merch, and whitelist spots.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 p-4 border border-gray-800 bg-gray-900 hover:border-[#F26522] transition-colors group">
                                <div className="w-12 h-12 bg-[#F26522] text-black flex items-center justify-center rounded group-hover:scale-110 transition-transform">
                                    <Coins size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">ETH & Stablecoin Payouts</h4>
                                    <p className="text-sm text-gray-500">Weekly prize pools for top performers.</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 border border-gray-800 bg-gray-900 hover:border-[#CCFF00] transition-colors group">
                                <div className="w-12 h-12 bg-[#CCFF00] text-black flex items-center justify-center rounded group-hover:scale-110 transition-transform">
                                    <Shirt size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Exclusive Merch Drops</h4>
                                    <p className="text-sm text-gray-500">Hoodies, hats, and physical cards.</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 border border-gray-800 bg-gray-900 hover:border-white transition-colors group">
                                <div className="w-12 h-12 bg-white text-black flex items-center justify-center rounded group-hover:scale-110 transition-transform">
                                    <Ticket size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Allocation Whitelists</h4>
                                    <p className="text-sm text-gray-500">Get early access to real startup rounds.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CRATE VISUAL */}
                    <div className="md:w-1/2 flex justify-center">
                        <div className="relative w-80 h-80 perspective-1000">
                            <motion.div
                                animate={{ rotateY: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="w-full h-full relative preserve-3d"
                            >
                                {/* Crate simulation using borders and transforms would be complex here, 
                            using a representative image container with 3D styling */}
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black border-4 border-[#F26522] flex items-center justify-center transform translate-z-10 shadow-[0_0_50px_rgba(242,101,34,0.3)]">
                                    <img src="https://picsum.photos/seed/loot/400/400" className="opacity-50 mix-blend-overlay" />
                                    <div className="absolute text-[#F26522] font-black text-6xl opacity-20">LOOT</div>

                                    {/* Floating items */}
                                    <motion.div
                                        animate={{ y: [-10, 10, -10] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                        className="absolute z-20"
                                    >
                                        <img src="https://picsum.photos/seed/gold/150/150" className="rounded-full border-4 border-[#CCFF00]" />
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};