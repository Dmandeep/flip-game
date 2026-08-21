import React, { useEffect, useMemo } from 'react';
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

/* ── Confetti particle config ─────────────────────────────────────────────── */
const CONFETTI_COLORS = ['#facc15','#ef4444','#3b82f6','#10b981','#ec4899','#a855f7','#f97316','#06b6d4'];
const CONFETTI_COUNT = 40;

export const ResultsScreen: React.FC<Props> = ({
  result,
  onPlayAgain,
  onChangeCategory,
  onChangeDifficulty,
  onHome,
}) => {
  const savedRef = React.useRef(false);

  /* ── Save stats once ────────────────────────────────────────────────── */
  useEffect(() => {
    if (savedRef.current) return;
    savedRef.current = true;

    const stats = StorageUtils.getStats();
    StorageUtils.updateStats({
      gamesPlayed: stats.gamesPlayed + 1,
      gamesWon:    stats.gamesWon + 1,
      bestScore:   Math.max(stats.bestScore, result.score),
      bestTime:    Math.min(stats.bestTime,  result.time),
      bestCombo:   Math.max(stats.bestCombo, result.combo),
      totalMatches: stats.totalMatches + result.moves,
      totalMoves:   stats.totalMoves   + result.moves,
    });
  }, [result]);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  /* ── Stat cards config ──────────────────────────────────────────────── */
  const stats = [
    { label: 'TIME',       value: formatTime(result.time), color: 'from-sky-500/20 to-blue-600/20',     border: 'border-sky-500/30',     textCls: 'text-sky-200' },
    { label: 'MOVES',      value: result.moves,            color: 'from-emerald-500/20 to-teal-600/20', border: 'border-emerald-500/30', textCls: 'text-emerald-200' },
    { label: 'SCORE',      value: result.score,            color: 'from-amber-500/20 to-yellow-600/20', border: 'border-amber-500/30',   textCls: 'text-yellow-300' },
    { label: 'BEST COMBO', value: `×${result.combo}`,      color: 'from-orange-500/20 to-red-600/20',   border: 'border-orange-500/30',  textCls: 'text-orange-300' },
  ];

  /* ── Pre-calculate confetti props for React purity ─────────────────── */
  const confettiParticles = useMemo(() => {
    return Array.from({ length: CONFETTI_COUNT }).map(() => ({
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 2.5,
      duration: 2.8 + Math.random() * 2.2,
      bgColor: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      width: `${Math.random() * 7 + 4}px`,
      height: `${Math.random() * 9 + 5}px`,
      endRotate: Math.random() * 720 - 360,
    }));
  }, []);

  return (
    <motion.div
      className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* ── Confetti ────────────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confettiParticles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-sm"
            initial={{
              top: '-8%',
              left: p.left,
              opacity: 1,
              rotate: 0,
            }}
            animate={{
              top: '115%',
              rotate: p.endRotate,
              opacity: [1, 1, 0.6, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'linear',
            }}
            style={{
              backgroundColor: p.bgColor,
              width: p.width,
              height: p.height,
            }}
          />
        ))}
      </div>

      {/* ── Result card ─────────────────────────────────────────────── */}
      <motion.div
        className="z-10 bg-gradient-to-br from-purple-900/85 to-indigo-900/85 backdrop-blur-md rounded-3xl p-8 md:p-10 shadow-2xl max-w-md w-full text-center border border-purple-500/30"
        initial={{ scale: 0.75, y: 60, opacity: 0 }}
        animate={{ scale: 1,    y: 0,  opacity: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 24, delay: 0.05 }}
      >
        {/* Trophy + heading */}
        <motion.div
          className="text-7xl mb-2"
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.2 }}
        >
          🏆
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-black mb-1 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-fuchsia-400">
          YOU WON!
        </h1>
        <p className="text-purple-300 mb-7 font-semibold tracking-widest text-xs">
          ALL PAIRS FOUND ✨
        </p>

        {/* Stat grid */}
        <div className="grid grid-cols-2 gap-3 mb-7">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className={`bg-gradient-to-br ${s.color} p-4 rounded-2xl border ${s.border}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.08, type: 'spring', stiffness: 260, damping: 22 }}
            >
              <p className="text-purple-300 text-[10px] font-black mb-1 uppercase tracking-widest">{s.label}</p>
              <p className={`text-2xl font-black ${s.textCls}`}>{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <motion.button
            onClick={onPlayAgain}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-black py-4 px-6 rounded-xl shadow-lg text-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <RotateCcw size={20} /> Play Again
          </motion.button>

          <motion.div
            className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            <motion.button
              onClick={onChangeDifficulty}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="flex items-center justify-center gap-2 bg-violet-600/50 hover:bg-violet-500/60 text-white font-semibold py-3 px-4 rounded-xl transition-colors border border-violet-500/30 text-sm"
            >
              <Grid size={16} /> Difficulty
            </motion.button>
            <motion.button
              onClick={onChangeCategory}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="flex items-center justify-center gap-2 bg-indigo-600/50 hover:bg-indigo-500/60 text-white font-semibold py-3 px-4 rounded-xl transition-colors border border-indigo-500/30 text-sm"
            >
              <LayoutDashboard size={16} /> Category
            </motion.button>
          </motion.div>

          <motion.button
            onClick={onHome}
            className="flex items-center justify-center gap-2 mt-1 text-purple-300 hover:text-white transition-colors py-2 text-sm font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            whileHover={{ scale: 1.03 }}
          >
            <Home size={16} /> Back to Home
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
