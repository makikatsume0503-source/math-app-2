import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { StampCalendar } from './StampCalendar';
import { useDailyProgress } from '../../hooks/useDailyProgress';

type GameMode = 'addition' | 'subtraction';

interface HomeProps {
    onStartGame: (mode: GameMode, level: 1 | 2 | 3) => void;
}

export const Home: React.FC<HomeProps> = ({ onStartGame }) => {
    const { progress, todayCount, dailyGoal } = useDailyProgress();

    return (
        <div className="max-w-2xl mx-auto p-6 flex flex-col items-center gap-8">
            <div className="grid md:grid-cols-2 gap-6 w-full">
                {/* Addition Section */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white/90 backdrop-blur-sm p-6 rounded-[2rem] shadow-xl border-4 border-app-pink/30 flex flex-col items-center"
                >
                    <div className="w-20 h-20 bg-app-pink rounded-full flex items-center justify-center text-4xl text-white font-black mb-4 shadow-md">
                        +
                    </div>
                    <h2 className="text-3xl font-black text-slate-700 mb-6">たしざん</h2>

                    <div className="flex flex-col gap-3 w-full">
                        <LevelButton level={1} color="bg-app-pink" onClick={() => onStartGame('addition', 1)} label="Lv.1 (10まで)" />
                        <LevelButton level={2} color="bg-app-pink" onClick={() => onStartGame('addition', 2)} label="Lv.2 (20まで)" />
                        <LevelButton level={3} color="bg-app-pink" onClick={() => onStartGame('addition', 3)} label="Lv.3 (50まで)" />
                    </div>
                </motion.div>

                {/* Subtraction Section */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/90 backdrop-blur-sm p-6 rounded-[2rem] shadow-xl border-4 border-app-blue/30 flex flex-col items-center"
                >
                    <div className="w-20 h-20 bg-app-blue rounded-full flex items-center justify-center text-4xl text-white font-black mb-4 shadow-md">
                        -
                    </div>
                    <h2 className="text-3xl font-black text-slate-700 mb-6">ひきざん</h2>

                    <div className="flex flex-col gap-3 w-full">
                        <LevelButton level={1} color="bg-app-blue" onClick={() => onStartGame('subtraction', 1)} label="Lv.1 (くりさがりなし)" />
                        <LevelButton level={2} color="bg-app-blue" onClick={() => onStartGame('subtraction', 2)} label="Lv.2 (くりさがりあり)" />
                        <LevelButton level={3} color="bg-app-blue" onClick={() => onStartGame('subtraction', 3)} label="Lv.3 (すこしおおきなかず)" />
                    </div>
                </motion.div>
            </div>

            {/* Stamp Calendar */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-full flex justify-center"
            >
                <StampCalendar progress={progress} todayCount={todayCount} dailyGoal={dailyGoal} />
            </motion.div>

            <div className="text-slate-400 text-xs mt-8">
                v2026.02.17-1
            </div>
        </div>
    );
};

interface LevelButtonProps {
    level: number;
    color: string;
    onClick: () => void;
    label: string;
}

const LevelButton: React.FC<LevelButtonProps> = ({ level, color, onClick, label }) => {
    return (
        <button
            onClick={onClick}
            className={`w - full py - 3 px - 4 rounded - xl border - b - 4 border - slate - 200 bg - white hover: bg - slate - 50 active: border - b - 0 active: translate - y - 1 transition - all flex items - center justify - between group`}
        >
            <div className="flex items-center gap-3">
                <span className={`w - 8 h - 8 rounded - full ${color} text - white font - black flex items - center justify - center text - lg`}>
                    {level}
                </span>
                <span className="font-bold text-slate-600 text-sm md:text-base text-left">{label}</span>
            </div>
            <ArrowRight size={20} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
        </button>
    );
};
