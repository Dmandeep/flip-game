import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Home, Grid, LayoutDashboard } from 'lucide-react';
import type { GameResult } from '../App';
import { StorageUtils } from '../utils/storage';

type Props = {
  result: GameResult;
  onPlayAgain: () => void;
  onChangeCategory: () => void;
  onChangeDifficulty: () => void;
  onHome: () => void;
};

export const ResultsScreen: React.FC<Props> = ({ result, onPlayAgain, onChangeCategory, onChangeDifficulty, onHome }) => {
  
  useEffect(() => {
    // Update stats
    const stats = StorageUtils.getStats();
    StorageUtils.updateStats({
      gamesPlayed: stats.gamesPlayed + 1,
      gamesWon: stats.gamesWon + 1,
      bestScore: Math.max(stats.bestScore, result.score),
      bestTime: Math.min(stats.bestTime, result.time),
      bestCombo: Math.max(stats.bestCombo, result.combo),
      totalMatches: stats.totalMatches + (result.moves), // approximation
      totalMoves: stats.totalMoves + result.moves,
    });
  }, [result]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <motion.div 
      className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-900 text-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Simple confetti effect simulation */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-yellow-400"
            initial={{ 
              top: '-10%', 
              left: `${Math.random() * 100}%`,
              opacity: 1
            }}
            animate={{ 
              top: '110%',
              rotate: Math.random() * 360,
              opacity: [1, 1, 0]
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'linear'
            }}
            style={{
              backgroundColor: ['#facc15', '#ef4444', '#3b82f6', '#10b981'][Math.floor(Math.random() * 4)]
            }}
          />
        ))}
      </div>

      <motion.div 
        className="z-10 bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl max-w-lg w-full text-center border border-slate-700"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', bounce: 0.4 }}
      >
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-4xl md:text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">YOU WON!</h1>
        <p className="text-slate-400 mb-8 font-medium tracking-widest text-sm">ALL PAIRS FOUND</p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-700/50 p-4 rounded-2xl">
            <p className="text-slate-400 text-xs font-bold mb-1">TIME</p>
            <p className="text-2xl font-bold">{formatTime(result.time)}</p>
          </div>
          <div className="bg-slate-700/50 p-4 rounded-2xl">
            <p className="text-slate-400 text-xs font-bold mb-1">MOVES</p>
            <p className="text-2xl font-bold">{result.moves}</p>
          </div>
          <div className="bg-slate-700/50 p-4 rounded-2xl">
            <p className="text-slate-400 text-xs font-bold mb-1">SCORE</p>
            <p className="text-2xl font-bold text-yellow-400">{result.score}</p>
          </div>
          <div className="bg-slate-700/50 p-4 rounded-2xl">
            <p className="text-slate-400 text-xs font-bold mb-1">BEST COMBO</p>
            <p className="text-2xl font-bold text-orange-400">×{result.combo}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button 
            onClick={onPlayAgain}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
          >
            <RotateCcw size={20} /> Play Again
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={onChangeDifficulty}
              className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
            >
              <Grid size={18} /> Difficulty
            </button>
            <button 
              onClick={onChangeCategory}
              className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
            >
              <LayoutDashboard size={18} /> Category
            </button>
          </div>
          
          <button 
            onClick={onHome}
            className="flex items-center justify-center gap-2 mt-2 text-slate-400 hover:text-white transition-colors py-2"
          >
            <Home size={18} /> Back to Home
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
