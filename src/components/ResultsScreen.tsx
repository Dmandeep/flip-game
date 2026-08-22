import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { GameResult } from '../App';
import type { DifficultyLevel } from '../data/difficulties';
import { StorageUtils } from '../utils/storage';
import { SoundFX } from '../utils/sound';

type Props = {
  result: GameResult;
  difficulty: DifficultyLevel;
  onPlayAgain: () => void;
  onHome: () => void;
};

export const ResultsScreen: React.FC<Props> = ({ result, difficulty, onPlayAgain, onHome }) => {
  const [isHighScore] = useState(() => {
    const stats = StorageUtils.getStats();
    return result.score > (stats.bestScore || 0);
  });

  useEffect(() => {
    // Play Erwin's victory speech!
    SoundFX.stopBGM();
    SoundFX.playErwin();

    const stats = StorageUtils.getStats();
    
    const bestScore = stats.bestScore || 0;
    if (result.score > bestScore) {
      stats.bestScore = result.score;
    }

    stats.totalMatches += 1;
    stats.totalMoves += result.moves;
    
    if (result.combo > stats.bestCombo) {
      stats.bestCombo = result.combo;
    }

    if (stats.bestTime === 0 || result.time < stats.bestTime) {
      stats.bestTime = result.time;
    }
    
    StorageUtils.saveStats(stats);

    // Victory haptic
    try { if ('vibrate' in navigator) navigator.vibrate([100, 50, 100, 50, 200]); } catch { /* ignore */ }
  }, [result, difficulty]);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const accuracy = result.moves > 0 ? Math.round((((difficulty.cols * difficulty.rows) / 2) / result.moves) * 100) : 100;

  // AOT Ranks
  let rank = "TRAINEE";
  let rankColor = "text-[#9ca3af]";
  if (accuracy > 80) {
    rank = "COMMANDER";
    rankColor = "text-[#fde047]";
  } else if (accuracy > 50) {
    rank = "SCOUT";
    rankColor = "text-[#4ade80]";
  }

  return (
    <motion.div
      className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 relative z-10 min-h-[100dvh] overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="aot-panel p-6 sm:p-10 max-w-md w-full border border-[#555] text-center relative"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="mb-6 sm:mb-8">
          <span className="font-sans text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] text-[#999] uppercase font-bold">Operation Result</span>
          <h2 className="text-3xl sm:text-5xl cinematic-title mt-2 mb-2">
            MISSION COMPLETE
          </h2>
          
          <div className="mt-4 sm:mt-6 flex flex-col items-center">
            <span className="font-sans text-[10px] sm:text-xs tracking-widest text-[#777] uppercase mb-1">Assigned Rank</span>
            <motion.div 
              className={`font-serif text-3xl sm:text-4xl font-bold tracking-[0.2em] ${rankColor} drop-shadow-[0_0_15px_currentColor]`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, type: 'spring' }}
            >
              {rank}
            </motion.div>
          </div>

          {isHighScore && (
            <motion.div 
              className="mt-4 sm:mt-6 bg-[#7f1d1d] text-white font-sans font-bold uppercase tracking-widest px-4 sm:px-6 py-1.5 sm:py-2 border border-[#fca5a5] shadow-[0_0_20px_rgba(127,29,29,0.8)] inline-block text-sm sm:text-base"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              New Record Set
            </motion.div>
          )}
        </div>

        <div className="bg-black/40 border border-[#333] p-4 sm:p-6 mb-6 sm:mb-10">
          <div className="text-[10px] sm:text-xs font-sans tracking-widest text-[#777] uppercase mb-1">Final Score</div>
          <motion.div 
            className="text-4xl sm:text-6xl font-serif font-bold text-white drop-shadow-lg mb-6 sm:mb-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {result.score}
          </motion.div>
          
          <div className="grid grid-cols-2 gap-y-4 sm:gap-y-6 gap-x-3 sm:gap-x-4 text-left font-sans tracking-wider">
            <div className="flex flex-col border-l-2 border-[#166534] pl-2 sm:pl-3">
              <span className="text-[9px] sm:text-[10px] font-bold text-[#777] uppercase">Time</span>
              <span className="text-lg sm:text-xl font-bold text-[#d1d5db]">{formatTime(result.time)}</span>
            </div>
            <div className="flex flex-col border-l-2 border-[#166534] pl-2 sm:pl-3">
              <span className="text-[9px] sm:text-[10px] font-bold text-[#777] uppercase">Moves</span>
              <span className="text-lg sm:text-xl font-bold text-[#d1d5db]">{result.moves}</span>
            </div>
            <div className="flex flex-col border-l-2 border-[#166534] pl-2 sm:pl-3">
              <span className="text-[9px] sm:text-[10px] font-bold text-[#777] uppercase">Max Combo</span>
              <span className="text-lg sm:text-xl font-bold text-[#d1d5db]">x{result.combo}</span>
            </div>
            <div className="flex flex-col border-l-2 border-[#166534] pl-2 sm:pl-3">
              <span className="text-[9px] sm:text-[10px] font-bold text-[#777] uppercase">Accuracy</span>
              <span className="text-lg sm:text-xl font-bold text-[#d1d5db]">{accuracy}%</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          <button onClick={onPlayAgain} className="w-full py-3 sm:py-4 text-lg sm:text-xl aot-btn active:scale-95 transition-transform">
            Deploy Again
          </button>
          <button onClick={onHome} className="w-full py-3 sm:py-4 text-base sm:text-lg aot-btn bg-[#222] active:scale-95 transition-transform" style={{ background: 'linear-gradient(135deg, #333, #111)'}}>
            Return to Base
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
