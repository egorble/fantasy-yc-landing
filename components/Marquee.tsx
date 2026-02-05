import React from 'react';
import { motion } from 'framer-motion';

export const Marquee: React.FC = () => {
  return (
    <div className="py-12 bg-white border-y-8 border-black overflow-hidden flex">
      <motion.div
        className="flex whitespace-nowrap text-6xl font-black uppercase text-transparent stroke-black text-stroke-2"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        style={{ WebkitTextStroke: "2px black" }}
      >
        <span className="mx-8 text-black">Trusted by Founders</span> •
        <span className="mx-8 text-[#F26522]">Backed by Data</span> •
        <span className="mx-8 text-black">10,000+ Decks Built</span> •
        <span className="mx-8 text-[#CCFF00] bg-black px-4">Join the Revolution</span> •
        <span className="mx-8 text-black">Trusted by Founders</span> •
        <span className="mx-8 text-[#F26522]">Backed by Data</span> •
        <span className="mx-8 text-black">10,000+ Decks Built</span> •
        <span className="mx-8 text-[#CCFF00] bg-black px-4">Join the Revolution</span> •
      </motion.div>
    </div>
  );
};