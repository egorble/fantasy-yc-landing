import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { COLORS } from '../constants';

export const TradingSequence: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Extended height to allow for a longer, smoother animation window
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

    // --- ANIMATION MAPPING ---

    // 1. Phone Entrance (0% - 15%) - Phone stays centered, only scale and opacity animate
    const phoneScale = useTransform(smoothProgress, [0, 0.1], [0.9, 1]);
    const phoneOpacity = useTransform(smoothProgress, [0, 0.05], [0, 1]);

    // 2. First Swipe RIGHT - "Buy" (15% - 35%)
    const card1X = useTransform(smoothProgress, [0.15, 0.35], [0, 300]);
    const card1Rotate = useTransform(smoothProgress, [0.15, 0.35], [0, 25]);
    const card1Opacity = useTransform(smoothProgress, [0.3, 0.38], [1, 0]);
    const buyOverlayOpacity = useTransform(smoothProgress, [0.18, 0.28], [0, 1]);

    // 3. Second Card comes to focus after first swipe (15% - 35%)
    const card2Scale = useTransform(smoothProgress, [0.15, 0.35, 0.55, 0.75], [0.92, 1, 1, 1]);
    const card2Y = useTransform(smoothProgress, [0.15, 0.35], [20, 0]);
    const card2Opacity = useTransform(smoothProgress, [0.15, 0.35, 0.7, 0.78], [0.6, 1, 1, 0]);

    // 4. Second Swipe LEFT - "Pass" (55% - 75%)
    const card2X = useTransform(smoothProgress, [0.55, 0.75], [0, -300]);
    const card2Rotate = useTransform(smoothProgress, [0.55, 0.75], [0, -25]);
    const passOverlayOpacity = useTransform(smoothProgress, [0.58, 0.68], [0, 1]);

    // 5. Third Card appears after second swipe (55% - 75%)
    const card3Scale = useTransform(smoothProgress, [0.55, 0.75], [0.92, 1]);
    const card3Y = useTransform(smoothProgress, [0.55, 0.75], [20, 0]);
    const card3Opacity = useTransform(smoothProgress, [0.55, 0.75], [0.6, 1]);

    // 6. Button Reactions
    // Green button (Buy) - pulses during first swipe
    const checkBtnScale = useTransform(smoothProgress, [0.15, 0.25, 0.38], [1, 1.4, 1]);
    const checkBtnBg = useTransform(smoothProgress, [0.15, 0.25], ["rgba(204, 255, 0, 0.2)", "rgba(204, 255, 0, 1)"]);
    const checkIconColor = useTransform(smoothProgress, [0.15, 0.25], ["#16a34a", "#000000"]);

    // Red button (Pass) - pulses during second swipe
    const passBtnScale = useTransform(smoothProgress, [0.55, 0.65, 0.78], [1, 1.4, 1]);
    const passBtnBg = useTransform(smoothProgress, [0.55, 0.65], ["rgba(255, 255, 255, 1)", "rgba(239, 68, 68, 1)"]);
    const passIconColor = useTransform(smoothProgress, [0.55, 0.65], ["#9ca3af", "#ffffff"]);

    // 7. Background Parallax
    const textY = useTransform(smoothProgress, [0, 1], [0, -200]);

    // Text Opacity Control
    const rightTextOpacity = useTransform(smoothProgress, [0, 0.35, 0.45], [1, 1, 0]);
    const leftTextOpacity = useTransform(smoothProgress, [0.45, 0.55, 1], [0, 1, 1]);

    return (
        <div ref={containerRef} className="h-[250vh] bg-[#F0F0F0] relative">

            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center perspective-1000 bg-[#F0F0F0] overflow-hidden">

                {/* PARALLAX BACKGROUND TEXT - RIGHT SWIPE */}
                <motion.div
                    style={{ y: textY, opacity: rightTextOpacity }}
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0"
                >
                    <h2 className="text-[15vw] md:text-[18vw] font-black text-gray-200 leading-[0.8]">SWIPE</h2>
                    <h2 className="text-[15vw] md:text-[18vw] font-black text-white text-stroke-2 text-stroke-gray-300 leading-[0.8]">RIGHT</h2>
                </motion.div>

                {/* PARALLAX BACKGROUND TEXT - LEFT SWIPE */}
                <motion.div
                    style={{ y: textY, opacity: leftTextOpacity }}
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0"
                >
                    <h2 className="text-[15vw] md:text-[18vw] font-black text-gray-200 leading-[0.8]">SWIPE</h2>
                    <h2 className="text-[15vw] md:text-[18vw] font-black text-white text-stroke-2 text-stroke-gray-300 leading-[0.8]">LEFT</h2>
                </motion.div>

                {/* SIDE TEXT INFO (Desktop Only) */}
                <motion.div
                    style={{ opacity: phoneOpacity }}
                    className="hidden md:block absolute left-[10%] top-1/2 -translate-y-1/2 z-10 w-64"
                >
                    <div className="mb-8">
                        <div className="font-mono text-xs font-bold text-gray-400 mb-2">CURRENT STRATEGY</div>
                        <h3 className="text-4xl font-black uppercase leading-none mb-2">Aggressive<br />Growth</h3>
                        <div className="h-1 w-20 bg-[#F26522]"></div>
                    </div>
                    <p className="text-sm font-mono text-gray-600">
                        Algorithm scanning for pre-seed startups with high GitHub velocity.
                    </p>
                </motion.div>

                {/* PHONE CONTAINER */}
                <motion.div
                    style={{ scale: phoneScale, opacity: phoneOpacity }}
                    className="relative z-20 w-[280px] h-[560px] sm:w-[310px] sm:h-[620px] md:w-[340px] md:h-[680px] bg-black rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[3.5rem] border-[6px] sm:border-8 border-black shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] md:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] p-2 sm:p-3 flex flex-col items-center"
                >
                    {/* Glossy Reflection */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none rounded-r-[2rem] sm:rounded-r-[2.5rem] md:rounded-r-[3rem] z-30"></div>

                    {/* Dynamic Island / Notch */}
                    <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 w-24 sm:w-28 md:w-32 h-6 sm:h-7 md:h-8 bg-black rounded-full z-40 flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    </div>

                    {/* SCREEN */}
                    <div className="w-full h-full bg-[#111111] rounded-[2rem] sm:rounded-[2.4rem] md:rounded-[2.8rem] overflow-hidden relative flex flex-col">

                        {/* STATUS BAR */}
                        <div className="h-12 sm:h-14 px-4 sm:px-6 pt-5 sm:pt-6 flex justify-between items-end pb-1 sm:pb-2 bg-black/60 backdrop-blur-sm z-20">
                            <span className="font-bold text-[10px] sm:text-xs tracking-wide text-white/80">9:41</span>
                            <div className="flex gap-1">
                                <div className="w-3 h-2.5 sm:w-4 sm:h-3 bg-white rounded-sm"></div>
                                <div className="w-0.5 h-2.5 sm:h-3 bg-white/30 rounded-sm"></div>
                            </div>
                        </div>

                        {/* APP HEADER */}
                        <div className="px-4 sm:px-6 py-1.5 sm:py-2 flex justify-between items-center z-20">
                            <span className="font-black text-lg sm:text-xl tracking-tighter text-white">UnicornX</span>
                            <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-[#CCFF00] text-black font-mono text-[10px] sm:text-xs font-bold rounded">
                                420.69 XTZ
                            </div>
                        </div>

                        {/* CARDS AREA */}
                        <div className="flex-1 relative flex items-center justify-center w-full min-h-0 px-3 sm:px-4 py-2 sm:py-3">

                            {/* --- THIRD CARD (Back-most, appears after second swipe) --- */}
                            <motion.div
                                style={{ scale: card3Scale, y: card3Y, opacity: card3Opacity }}
                                className="absolute w-[88%] h-[92%] rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden origin-bottom"
                            >
                                <img src="/4.png" className="w-full h-full object-contain" />
                            </motion.div>

                            {/* --- SECOND CARD (Middle, swipes LEFT) --- */}
                            <motion.div
                                style={{ x: card2X, rotate: card2Rotate, scale: card2Scale, y: card2Y, opacity: card2Opacity }}
                                className="absolute w-[88%] h-[92%] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 origin-bottom-left"
                            >
                                <img src="/3.png" className="w-full h-full object-contain" />

                                {/* "PASS" OVERLAY */}
                                <motion.div
                                    style={{ opacity: passOverlayOpacity }}
                                    className="absolute inset-0 bg-red-500/90 flex items-center justify-center z-20 backdrop-blur-[2px]"
                                >
                                    <div className="border-4 sm:border-[6px] border-white px-4 sm:px-6 py-1.5 sm:py-2 rotate-12 bg-black shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)]">
                                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">PASS</h2>
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* --- FIRST CARD (Foreground, swipes RIGHT) --- */}
                            <motion.div
                                style={{ x: card1X, rotate: card1Rotate, opacity: card1Opacity }}
                                className="absolute w-[88%] h-[92%] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-20 cursor-grab active:cursor-grabbing origin-bottom-right"
                            >
                                <img src="/1.png" className="w-full h-full object-contain" />

                                {/* "BOUGHT" OVERLAY */}
                                <motion.div
                                    style={{ opacity: buyOverlayOpacity }}
                                    className="absolute inset-0 bg-[#CCFF00]/90 flex items-center justify-center z-20 backdrop-blur-[2px]"
                                >
                                    <div className="border-4 sm:border-[6px] border-black px-4 sm:px-6 py-1.5 sm:py-2 -rotate-12 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black uppercase tracking-tighter">BOUGHT</h2>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* APP FOOTER / CONTROLS */}
                        <div className="h-16 sm:h-20 md:h-24 bg-black/40 backdrop-blur-md border-t border-white/10 flex items-center justify-evenly px-6 sm:px-8 pb-2 sm:pb-3 md:pb-4 shrink-0">
                            {/* Pass Button */}
                            <motion.button
                                className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors shadow-sm"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <X size={22} strokeWidth={3} className="sm:hidden" />
                                <X size={28} strokeWidth={3} className="hidden sm:block" />
                            </motion.button>

                            {/* Super Like / Details */}
                            <motion.button
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 text-gray-400 flex items-center justify-center hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
                                whileHover={{ scale: 1.1 }}
                            >
                                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-current rounded-full mx-[1px]"></div>
                                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-current rounded-full mx-[1px]"></div>
                                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-current rounded-full mx-[1px]"></div>
                            </motion.button>

                            {/* Buy Button */}
                            <motion.button
                                style={{ scale: checkBtnScale, backgroundColor: checkBtnBg, color: checkIconColor }}
                                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-[#CCFF00] flex items-center justify-center shadow-lg relative"
                            >
                                <Check size={24} strokeWidth={4} className="sm:hidden" />
                                <Check size={32} strokeWidth={4} className="hidden sm:block" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};