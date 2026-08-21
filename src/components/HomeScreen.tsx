import React from 'react';
import { motion } from 'framer-motion';
import { Play, Settings } from 'lucide-react';

type Props = {
  onPlay: () => void;
  onSettings: () => void;
};

export const HomeScreen: React.FC<Props> = ({ onPlay, onSettings }) => {
  return (
    <motion.div 
      className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-slate-100 dark:to-slate-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle background elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-10 animate-pulse">🍎</div>
        <div className="absolute bottom-20 right-20 text-6xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}>🐶</div>
        <div className="absolute top-1/4 right-1/4 text-6xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}>🚗</div>
        <div className="absolute bottom-1/3 left-1/4 text-6xl opacity-10 animate-pulse" style={{ animationDelay: '0.5s' }}>🍕</div>
      </div>

      <div className="z-10 flex flex-col items-center text-center max-w-lg w-full">
        <motion.div 
          className="mb-12 relative"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
        >
          <div className="absolute inset-0 blur-3xl bg-primary/30 rounded-full"></div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600 drop-shadow-sm mb-4">
            MEMORY<br/>FLIP
          </h1>
          <p className="text-xl md:text-2xl font-medium text-slate-600 dark:text-slate-300">
            Flip. Match. Remember.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4 w-full sm:w-64">
          <button 
            onClick={onPlay}
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-500 text-white text-xl font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <Play fill="currentColor" size={24} />
            PLAY
          </button>
          
          <button 
            onClick={onSettings}
            className="flex items-center justify-center gap-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-lg font-semibold py-3 px-6 rounded-xl shadow border border-slate-200 dark:border-slate-700 transition-all"
          >
            <Settings size={20} />
            Settings
          </button>
        </div>
      </div>
    </motion.div>
  );
};
