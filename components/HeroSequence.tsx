import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { COLORS, STARTUPS } from '../constants';
import { TrendingUp, Zap, Radio } from 'lucide-react';

export const HeroSequence: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

    // STAGE 1 & 2: PACK SHAKE
    const packScale = useTransform(smoothProgress, [0, 0.2], [1, 1.2]);
    const packRotate = useTransform(smoothProgress, [0, 0.15, 0.2], [0, 5, -5]);
    const packY = useTransform(smoothProgress, [0, 0.2], [0, -50]);
    const packShakeX = useTransform(smoothProgress, [0.1, 0.12, 0.14, 0.16, 0.18], [0, 10, -10, 10, 0]);
    const packOpacity = useTransform(smoothProgress, [0.18, 0.22], [1, 0]);

    // STAGE 3: EXPLOSION
    const cardsScale = useTransform(smoothProgress, [0.2, 0.3], [0, 1]);
    const cardsOpacity = useTransform(smoothProgress, [0.2, 0.25], [0, 1]);
    const explosionFlash = useTransform(smoothProgress, [0.2, 0.22, 0.3], [0, 0.8, 0]);

    // STAGE 4: DATA SYNC
    const bgDarkness = useTransform(smoothProgress, [0.55, 0.65], ["#F0F0F0", "#050505"]);
    const legendaryCardScale = useTransform(smoothProgress, [0.55, 0.7], [1, 1.3]);
    const legendaryCardY = useTransform(smoothProgress, [0.55, 0.7], [0, 0]);
    const otherCardsOpacity = useTransform(smoothProgress, [0.55, 0.6], [1, 0]);
    const newsFeedOpacity = useTransform(smoothProgress, [0.65, 0.7], [0, 1]);
    const newsFeedX = useTransform(smoothProgress, [0.65, 0.75], [100, 0]);
    const newsFeedY = useTransform(smoothProgress, [0.65, 0.75], [50, 0]);

    // Dynamic Values
    const [valuation, setValuation] = useState(10);
    const showValuation = useTransform(smoothProgress, [0.65, 1], [0, 1]);

    useEffect(() => {
        const unsubscribe = showValuation.on("change", (v) => {
            if (v > 0.5) {
                const interval = setInterval(() => {
                    setValuation(prev => prev < 80 ? prev + 2 : 80);
                }, 50);
                return () => clearInterval(interval);
            } else {
                setValuation(10);
            }
        });
        return () => unsubscribe();
    }, [showValuation]);


    return (
        <motion.div
            ref={containerRef}
            className="relative h-[400vh]"
            style={{ backgroundColor: bgDarkness }}
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center perspective-1000">

                {/* BACKGROUND TICKER */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
                    className="absolute inset-0 z-0 flex flex-col justify-center items-center pointer-events-none opacity-10 overflow-hidden"
                >
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="whitespace-nowrap text-[10vw] font-black leading-none text-gray-400">
                            W24 S24 W25 S25 W26 S26
                        </div>
                    ))}
                </motion.div>

                {/* HERO TEXT */}
                <motion.div
                    className="absolute top-16 md:top-20 z-10 text-center px-4"
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-8xl font-black mb-4 tracking-tighter uppercase">
                        Spot the <span className="text-[#F26522]">Unicorns</span>.
                    </h1>
                    <p className="text-lg md:text-2xl font-mono text-gray-600">Own the upside.</p>
                </motion.div>

                {/* BOOSTER PACK */}
                <motion.div
                    style={{
                        scale: packScale,
                        y: packY,
                        rotate: packRotate,
                        x: packShakeX,
                        opacity: packOpacity
                    }}
                    className="relative z-20 w-48 h-72 sm:w-64 sm:h-96 md:w-[320px] md:h-[480px] mt-20 sm:mt-24 md:mt-32"
                >
                    {/* OPENING ANIMATION WRAPPER */}
                    <div className="w-full h-full relative">

                        {/* 1. TOP TEAR STRIP (The part that gets ripped off) */}
                        <motion.div
                            style={{
                                y: useTransform(smoothProgress, [0.18, 0.22], [0, -150]),
                                rotate: useTransform(smoothProgress, [0.18, 0.22], [0, -15]),
                                opacity: useTransform(smoothProgress, [0.22, 0.25], [1, 0])
                            }}
                            className="absolute top-0 left-0 w-full h-[12%] z-30"
                        >
                            <div className="w-full h-full bg-gradient-to-b from-gray-100 to-gray-300 border-x-2 border-t-2 border-gray-400 rounded-t-lg shadow-sm flex flex-col items-center justify-center overflow-hidden">
                                {/* Crimped Texture Top */}
                                <div className="absolute top-0 w-full h-1.5 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#000_2px,#000_4px)] opacity-20"></div>
                                <div className="bg-black text-white px-3 py-0.5 text-[10px] font-mono font-bold tracking-widest uppercase">Series A</div>
                            </div>
                            {/* Torn Edge Visual (Bottom of strip) */}
                            <div className="absolute -bottom-1 w-full h-2 bg-[radial-gradient(circle,transparent_50%,#d1d5db_50%)] bg-[length:10px_10px] rotate-180"></div>
                        </motion.div>


                        {/* 2. PACK BODY (Remains after tear) */}
                        <div className="absolute bottom-0 w-full h-[90%] bg-gradient-to-br from-white via-gray-100 to-gray-200 border-2 border-gray-300 rounded-b-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] flex flex-col items-center relative overflow-hidden">

                            {/* Jagged Edge at Top (Visible when strip leaves) */}
                            <div className="absolute -top-1 w-full h-2 bg-[radial-gradient(circle,transparent_50%,#f3f4f6_50%)] bg-[length:10px_10px]"></div>

                            {/* Main Graphics */}
                            <div className="mt-12 sm:mt-16 text-center space-y-1 z-10">
                                <h1 className="text-3xl sm:text-5xl font-black tracking-tighter text-black leading-[0.85]">
                                    UNICORN<br />
                                    <span className="text-[#F26522]">X</span>
                                </h1>
                                <div className="w-24 sm:w-32 h-1 bg-black mx-auto mt-4 mb-2 rounded-full"></div>
                                <p className="font-mono text-[8px] sm:text-[10px] text-gray-500 font-bold tracking-wider uppercase">Contains 5 Founder Cards</p>
                            </div>

                            {/* Token/Sticker */}
                            <div className="mt-auto mb-8 sm:mb-12">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#CCFF00] border-2 border-black flex items-center justify-center shadow-lg transform rotate-12">
                                    <span className="font-black text-xl sm:text-2xl text-black">?</span>
                                </div>
                            </div>

                            {/* Crimped Texture Bottom */}
                            <div className="absolute bottom-0 w-full h-2 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#000_2px,#000_4px)] opacity-20"></div>

                            {/* Shine Effects */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent pointer-events-none blur-xl"></div>
                            <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-20 bg-gradient-to-r from-transparent via-white to-transparent opacity-60 skew-y-12 mix-blend-overlay"></div>

                        </div>

                        {/* Cards coming out of the open pack */}
                        {/* We use existing cards logic but ensure they spawn from top of body */}
                    </div>
                </motion.div>

                {/* EXPLOSION FLASH */}
                <motion.div
                    style={{ opacity: explosionFlash }}
                    className="fixed inset-0 bg-white z-50 pointer-events-none"
                />

                {/* CARDS CONTAINER */}
                <motion.div
                    style={{ scale: cardsScale, opacity: cardsOpacity }}
                    className="absolute z-30 flex items-center justify-center w-full h-full mt-8 sm:mt-16 md:mt-24"
                >
                    {STARTUPS.map((startup, index) => {
                        // Calculate radial layout — smaller spread on mobile
                        const angle = (index - 2) * 15;
                        const xOffset = (index - 2) * 100; // Reduced from 200

                        const isLegendary = startup.legendary;

                        return (
                            <motion.div
                                key={startup.id}
                                style={{
                                    x: useTransform(smoothProgress,
                                        [0.2, 0.4, 0.55],
                                        [0, xOffset, isLegendary ? 0 : xOffset * 1.5]
                                    ),
                                    y: useTransform(smoothProgress,
                                        [0.2, 0.4, 0.55],
                                        [0, Math.abs(index - 2) * 20, isLegendary ? 0 : 500]
                                    ),
                                    rotate: useTransform(smoothProgress,
                                        [0.2, 0.4, 0.55],
                                        [0, angle, isLegendary ? 0 : angle * 2]
                                    ),
                                    scale: isLegendary ? legendaryCardScale : 1,
                                    zIndex: isLegendary ? 50 : 40 - Math.abs(index - 2),
                                    opacity: isLegendary ? 1 : otherCardsOpacity,
                                }}
                                className="absolute w-40 h-60 sm:w-52 sm:h-80 md:w-64 md:h-96"
                            >
                                {/* CARD UI */}
                                <div className={`w-full h-full bg-white border-2 sm:border-4 border-black rounded-xl flex flex-col relative overflow-hidden transition-shadow duration-300 ${isLegendary ? 'shadow-[0px_0px_30px_rgba(204,255,0,0.6)] md:shadow-[0px_0px_50px_rgba(204,255,0,0.6)]' : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'}`}>
                                    {isLegendary && (
                                        <div className="absolute top-0 left-0 w-full h-1 bg-[#CCFF00] z-20 animate-pulse" />
                                    )}

                                    {/* Card Image */}
                                    <div className="h-1/2 bg-gray-200 border-b-2 sm:border-b-4 border-black relative">
                                        <img
                                            src={`https://picsum.photos/seed/${startup.name}/400/300`}
                                            alt={startup.name}
                                            className="w-full h-full object-cover grayscale contrast-125"
                                        />
                                        <div className="absolute bottom-0 left-0 bg-black text-white px-1.5 py-0.5 sm:px-2 sm:py-1 font-mono text-[10px] sm:text-xs">
                                            {startup.batch}
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-2 sm:p-4 flex flex-col flex-1 justify-between bg-white">
                                        <div>
                                            <div className="flex justify-between items-start mb-1 sm:mb-2">
                                                <h3 className="text-base sm:text-xl md:text-2xl font-black uppercase leading-none">{startup.name}</h3>
                                                <span className="font-mono text-[8px] sm:text-xs border border-black px-0.5 sm:px-1 rounded">{startup.ticker}</span>
                                            </div>
                                            <p className="text-[8px] sm:text-xs text-gray-500 font-mono uppercase">{startup.type}</p>
                                        </div>

                                        <div className="mt-2 sm:mt-4">
                                            <div className="flex justify-between text-[8px] sm:text-xs font-bold mb-1">
                                                <span>VALUATION</span>
                                                <span className={isLegendary ? "text-[#F26522]" : ""}>
                                                    {isLegendary ? `$${valuation}B` : `$${startup.valuation}`}
                                                </span>
                                            </div>
                                            <div className="w-full h-1.5 sm:h-2 bg-gray-200 border border-black relative">
                                                <motion.div
                                                    className="h-full bg-[#CCFF00]"
                                                    style={{ width: isLegendary ? `${valuation}%` : '40%' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}

                    {/* NEWS FEED OVERLAY (Appears in Stage 4) */}
                    <motion.div
                        style={{ opacity: newsFeedOpacity, x: newsFeedX, y: newsFeedY }}
                        className="absolute left-2 right-2 bottom-20 sm:left-auto sm:right-4 sm:bottom-auto md:right-20 md:top-1/2 md:-translate-y-1/2 w-auto sm:w-72 md:w-80 z-50 pointer-events-none"
                    >
                        <div className="bg-black/90 border border-[#CCFF00] p-2.5 sm:p-3 md:p-4 text-[#CCFF00] font-mono text-[10px] sm:text-xs md:text-sm mb-1.5 sm:mb-2 md:mb-4 shadow-[4px_4px_0px_0px_#CCFF00]">
                            <div className="flex items-center gap-2 mb-1.5 sm:mb-2 border-b border-[#CCFF00]/30 pb-1.5 sm:pb-2">
                                <Radio className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse shrink-0" />
                                <span className="font-bold text-[10px] sm:text-xs md:text-sm">LIVE SIGNAL</span>
                            </div>
                            <p className="mb-1.5 sm:mb-2 text-[10px] sm:text-xs md:text-sm">BREAKING: OpenAI announces GPT-5 release date.</p>
                            <div className="flex justify-between text-[8px] sm:text-[10px] md:text-xs text-white/70">
                                <span>2m ago</span>
                                <span className="text-[#CCFF00] font-bold">+15% IMPACT</span>
                            </div>
                        </div>

                        <div className="bg-black/80 border-l-4 border-[#F26522] p-2.5 sm:p-3 md:p-4 text-white font-mono text-[10px] sm:text-xs md:text-sm shadow-lg">
                            <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-[#F26522] shrink-0" />
                                <span className="font-bold text-[#F26522] text-[10px] sm:text-xs md:text-sm">MARKET REACTION</span>
                            </div>
                            <p className="text-[10px] sm:text-xs md:text-sm">Trading volume up 400% in last hour.</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* STAGE INDICATORS (Optional) */}
                <motion.div
                    style={{ opacity: useTransform(smoothProgress, [0.9, 1], [1, 0]) }}
                    className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 text-center"
                >
                    <p className="font-mono text-xs text-gray-500 mb-2">SCROLL TO TRADE</p>
                    <div className="w-0.5 h-8 bg-black/20 mx-auto overflow-hidden">
                        <div className="w-full h-1/2 bg-black animate-slideDown"></div>
                    </div>
                </motion.div>

            </div>
        </motion.div>
    );
};