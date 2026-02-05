import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Crown, Medal } from 'lucide-react';

const WinnerBlock = ({ rank, height, color, name, profit, delay }: { rank: number, height: string, color: string, name: string, profit: string, delay: number }) => (
    <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay, duration: 0.6, type: "spring" }}
        className={`flex flex-col items-center justify-end ${height} relative`}
    >
        {/* Avatar */}
        <div className="mb-4 relative">
            <div className="w-20 h-20 bg-black rounded-full border-4 border-white overflow-hidden relative z-10">
                <img src={`https://picsum.photos/seed/avatar${rank}/100/100`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            {rank === 1 && <Crown className="absolute -top-6 left-1/2 -translate-x-1/2 text-[#F26522] w-8 h-8 fill-current" />}

            {/* Float Stat */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute -top-8 -right-8 bg-black text-[#CCFF00] font-mono text-xs px-2 py-1 border border-[#CCFF00]"
            >
                {profit}
            </motion.div>
        </div>

        {/* Podium Block */}
        <div className={`w-24 md:w-32 ${color} border-4 border-black flex items-start justify-center pt-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] h-full`}>
            <span className="text-4xl font-black opacity-50">{rank}</span>
        </div>

        <div className="mt-4 text-center">
            <h4 className="font-bold uppercase bg-black text-white px-2 inline-block transform -skew-x-12 text-sm">{name}</h4>
        </div>
    </motion.div>
);

export const CompetitionSequence: React.FC = () => {
    return (
        <section className="min-h-screen bg-[#CCFF00] border-t-8 border-black flex flex-col items-center justify-center py-20 overflow-hidden relative">

            {/* Background Grid */}
            <div className="absolute inset-0 z-0 opacity-10"
                style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter">
                        Dominate the <br /><span className="text-white text-stroke-black">Leagues</span>
                    </h2>
                    <p className="text-xl font-bold font-mono max-w-2xl mx-auto border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_#000]">
                        Compete against other investors. Top 10 portfolios win ETH and exclusive drops every week.
                    </p>
                </div>

                <div className="flex items-end justify-center gap-4 h-[400px]">
                    <WinnerBlock rank={2} height="h-[60%]" color="bg-gray-300" name="@cryptoking" profit="+320%" delay={0.2} />
                    <WinnerBlock rank={1} height="h-[80%]" color="bg-[#F26522]" name="@vc_killer" profit="+580%" delay={0.4} />
                    <WinnerBlock rank={3} height="h-[40%]" color="bg-[#D28C49]" name="@early_bird" profit="+150%" delay={0.6} />
                </div>

            </div>
        </section>
    );
};