import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Check, X, Smartphone, Zap } from 'lucide-react';
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
    const card1X = useTransform(smoothProgress, [0.15, 0.35], [0, 500]);
    const card1Rotate = useTransform(smoothProgress, [0.15, 0.35], [0, 25]);
    const card1Opacity = useTransform(smoothProgress, [0.3, 0.38], [1, 0]);
    const buyOverlayOpacity = useTransform(smoothProgress, [0.18, 0.28], [0, 1]);

    // 3. Second Card comes to focus after first swipe (15% - 35%)
    const card2Scale = useTransform(smoothProgress, [0.15, 0.35, 0.55, 0.75], [0.92, 1, 1, 1]);
    const card2Y = useTransform(smoothProgress, [0.15, 0.35], [20, 0]);
    const card2Opacity = useTransform(smoothProgress, [0.15, 0.35, 0.7, 0.78], [0.6, 1, 1, 0]);

    // 4. Second Swipe LEFT - "Pass" (55% - 75%)
    const card2X = useTransform(smoothProgress, [0.55, 0.75], [0, -500]);
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
                    <h2 className="text-[18vw] font-black text-gray-200 leading-[0.8]">SWIPE</h2>
                    <h2 className="text-[18vw] font-black text-white text-stroke-2 text-stroke-gray-300 leading-[0.8]">RIGHT</h2>
                </motion.div>

                {/* PARALLAX BACKGROUND TEXT - LEFT SWIPE */}
                <motion.div
                    style={{ y: textY, opacity: leftTextOpacity }}
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0"
                >
                    <h2 className="text-[18vw] font-black text-gray-200 leading-[0.8]">SWIPE</h2>
                    <h2 className="text-[18vw] font-black text-white text-stroke-2 text-stroke-gray-300 leading-[0.8]">LEFT</h2>
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
                    className="relative z-20 w-[340px] h-[680px] bg-black rounded-[3.5rem] border-8 border-black shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] p-3 flex flex-col items-center"
                >
                    {/* Glossy Reflection */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none rounded-r-[3rem] z-30"></div>

                    {/* Dynamic Island / Notch */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-black rounded-full z-40 flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    </div>

                    {/* SCREEN */}
                    <div className="w-full h-full bg-gray-50 rounded-[2.8rem] overflow-hidden relative flex flex-col">

                        {/* STATUS BAR */}
                        <div className="h-14 px-6 pt-6 flex justify-between items-end pb-2 bg-white/80 backdrop-blur-sm z-20">
                            <span className="font-bold text-xs tracking-wide">9:41</span>
                            <div className="flex gap-1">
                                <div className="w-4 h-3 bg-black rounded-sm"></div>
                                <div className="w-0.5 h-3 bg-black/20 rounded-sm"></div>
                            </div>
                        </div>

                        {/* APP HEADER */}
                        <div className="px-6 py-2 flex justify-between items-center z-20">
                            <span className="font-black text-xl tracking-tighter">FantasyYC</span>
                            <div className="px-2 py-1 bg-black text-[#CCFF00] font-mono text-xs font-bold rounded">
                                420.69 PTS
                            </div>
                        </div>

                        {/* CARDS AREA */}
                        <div className="flex-1 relative flex items-center justify-center w-full min-h-[400px]">

                            {/* --- THIRD CARD (Back-most, appears after second swipe) --- */}
                            <motion.div
                                style={{ scale: card3Scale, y: card3Y, opacity: card3Opacity }}
                                className="absolute w-[90%] h-[85%] bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden flex flex-col origin-bottom"
                            >
                                <div className="h-3/5 bg-gray-100 relative">
                                    <img src="https://picsum.photos/seed/startup789/300/400" className="w-full h-full object-cover" />
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">SEED</span>
                                        <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded border border-white/20">FINTECH</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-white flex-1">
                                    <h3 className="text-2xl font-black uppercase leading-none mb-1">PayFlow</h3>
                                    <p className="text-gray-500 text-sm font-medium">Austin • S25</p>
                                </div>
                            </motion.div>

                            {/* --- SECOND CARD (Middle, swipes LEFT) --- */}
                            <motion.div
                                style={{ x: card2X, rotate: card2Rotate, scale: card2Scale, y: card2Y, opacity: card2Opacity }}
                                className="absolute w-[90%] h-[85%] bg-white rounded-2xl border-2 border-black shadow-2xl overflow-hidden flex flex-col z-10 origin-bottom-left"
                            >
                                <div className="h-3/5 bg-gray-800 relative">
                                    <img src="https://picsum.photos/seed/startup456/400/500" className="w-full h-full object-cover" />
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">PRE-SEED</span>
                                        <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded border border-white/20">CRYPTO</span>
                                    </div>

                                    {/* "PASS" OVERLAY */}
                                    <motion.div
                                        style={{ opacity: passOverlayOpacity }}
                                        className="absolute inset-0 bg-red-500/90 flex items-center justify-center z-20 backdrop-blur-[2px]"
                                    >
                                        <div className="border-[6px] border-white px-6 py-2 rotate-12 bg-black shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)]">
                                            <h2 className="text-5xl font-black text-white uppercase tracking-tighter">PASS</h2>
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="p-5 flex-1 flex flex-col justify-between bg-white relative">
                                    <div>
                                        <h3 className="text-3xl font-black uppercase leading-none mb-1">ChainVault</h3>
                                        <p className="text-gray-500 text-sm font-medium">Miami • W25</p>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-400 font-bold text-xs tracking-wider">VALUATION</span>
                                            <span className="font-mono font-bold">$8M</span>
                                        </div>
                                        <div className="flex items-end gap-1 h-8 w-full opacity-50">
                                            {[30, 45, 35, 50, 40, 55, 45].map((h, i) => (
                                                <div key={i} style={{ height: `${h}%` }} className="flex-1 rounded-sm bg-gray-300"></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* --- FIRST CARD (Foreground, swipes RIGHT) --- */}
                            <motion.div
                                style={{ x: card1X, rotate: card1Rotate, opacity: card1Opacity }}
                                className="absolute w-[90%] h-[85%] bg-white rounded-2xl border-2 border-black shadow-2xl overflow-hidden flex flex-col z-20 cursor-grab active:cursor-grabbing origin-bottom-right"
                            >
                                {/* Image Section */}
                                <div className="h-3/5 bg-gray-800 relative group">
                                    <img src="https://picsum.photos/seed/startup123/400/500" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                                    {/* Tags */}
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        <span className="bg-[#F26522] text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">SERIES A</span>
                                        <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded border border-white/20">AI/ML</span>
                                    </div>

                                    {/* "BOUGHT" OVERLAY */}
                                    <motion.div
                                        style={{ opacity: buyOverlayOpacity }}
                                        className="absolute inset-0 bg-[#CCFF00]/90 flex items-center justify-center z-20 backdrop-blur-[2px]"
                                    >
                                        <div className="border-[6px] border-black px-6 py-2 -rotate-12 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                            <h2 className="text-5xl font-black text-black uppercase tracking-tighter">BOUGHT</h2>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Info Section */}
                                <div className="p-5 flex-1 flex flex-col justify-between bg-white relative">
                                    <div>
                                        <h3 className="text-3xl font-black uppercase leading-none mb-1">Nexus AI</h3>
                                        <p className="text-gray-500 text-sm font-medium">San Francisco • W24</p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-400 font-bold text-xs tracking-wider">VALUATION</span>
                                            <span className="font-mono font-bold">$125M</span>
                                        </div>

                                        {/* Mini Chart */}
                                        <div className="flex items-end gap-1 h-8 w-full opacity-50">
                                            {[40, 65, 45, 80, 55, 90, 100].map((h, i) => (
                                                <div key={i} style={{ height: `${h}%` }} className={`flex-1 rounded-sm ${i === 6 ? 'bg-[#F26522]' : 'bg-gray-300'}`}></div>
                                            ))}
                                        </div>

                                        <div className="flex justify-between items-end pt-2 border-t border-gray-100">
                                            <div className="flex items-center gap-1 text-[#F26522] font-bold text-xs">
                                                <Zap size={14} fill="currentColor" />
                                                <span>TRENDING</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-bold text-black bg-[#CCFF00] px-1.5 py-0.5 rounded shadow-[2px_2px_0px_0px_#000]">+24% APY</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* APP FOOTER / CONTROLS */}
                        <div className="h-24 bg-white/50 backdrop-blur-md border-t border-gray-200 flex items-center justify-evenly px-8 pb-4">
                            {/* Pass Button */}
                            <motion.button
                                className="w-14 h-14 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors shadow-sm"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <X size={28} strokeWidth={3} />
                            </motion.button>

                            {/* Super Like / Details */}
                            <motion.button
                                className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center hover:bg-blue-100 hover:text-blue-500 transition-colors"
                                whileHover={{ scale: 1.1 }}
                            >
                                <div className="w-1.5 h-1.5 bg-current rounded-full mx-[1px]"></div>
                                <div className="w-1.5 h-1.5 bg-current rounded-full mx-[1px]"></div>
                                <div className="w-1.5 h-1.5 bg-current rounded-full mx-[1px]"></div>
                            </motion.button>

                            {/* Buy Button */}
                            <motion.button
                                style={{ scale: checkBtnScale, backgroundColor: checkBtnBg, color: checkIconColor }}
                                className="w-16 h-16 rounded-full border-2 border-[#CCFF00] flex items-center justify-center shadow-lg relative"
                            >
                                <Check size={32} strokeWidth={4} />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};