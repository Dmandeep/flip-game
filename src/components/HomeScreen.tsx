import { motion } from 'framer-motion';
import { Play, Settings } from 'lucide-react';

type Props = {
  onPlay: () => void;
  onSettings: () => void;
};

/* ── Floating particle emojis ─────────────────────────────────────────────── */
const FLOATERS = [
  { emoji: '🌸', top: '8%',  left: '8%',  size: '4rem', delay: 0,   dur: 4.2 },
  { emoji: '⭐', top: '14%', right: '10%', size: '3.5rem', delay: 1,  dur: 5.1 },
  { emoji: '🌙', bottom: '22%', left: '12%', size: '4rem', delay: 0.5, dur: 6.0 },
  { emoji: '✨', bottom: '14%', right: '8%', size: '3.5rem', delay: 2,  dur: 4.6 },
  { emoji: '🦋', top: '52%', left: '4%',  size: '3rem', delay: 1.5, dur: 5.5 },
  { emoji: '🍃', top: '36%', right: '4%', size: '3rem', delay: 0.8, dur: 4.1 },
  { emoji: '💫', top: '28%', left: '20%', size: '2.5rem', delay: 1.2, dur: 3.8 },
  { emoji: '🎴', bottom: '35%', right: '18%', size: '2.5rem', delay: 2.5, dur: 5.0 },
];

/* ── Demo card strip on the home screen ──────────────────────────────────── */
const DEMO_CARDS = ['🎴', '🃏', '🎴', '🃏'];
const DEMO_COLORS = [
  'from-violet-500 to-indigo-600',
  'from-fuchsia-500 to-pink-600',
  'from-sky-500 to-blue-600',
  'from-emerald-500 to-teal-600',
];

export const HomeScreen: React.FC<Props> = ({ onPlay, onSettings }) => {
  return (
    <motion.div
      className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
    >
      {/* ── Background floating emojis ─────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {FLOATERS.map((f, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20 select-none"
            style={{ fontSize: f.size, top: f.top, left: (f as any).left, right: (f as any).right, bottom: (f as any).bottom }}
            animate={{ y: [0, -14, 0], rotate: [0, i % 2 === 0 ? 10 : -10, 0] }}
            transition={{ duration: f.dur, delay: f.delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            {f.emoji}
          </motion.div>
        ))}
      </div>

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="z-10 flex flex-col items-center text-center max-w-lg w-full gap-10">

        {/* Title */}
        <motion.div
          className="relative"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.05 }}
        >
          {/* Glow blob behind title */}
          <div className="absolute inset-0 blur-[60px] bg-white/10 rounded-full scale-[2] pointer-events-none" />

          <h1 className="relative text-7xl md:text-9xl font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-br from-white via-indigo-200 to-pink-200 drop-shadow-lg mb-4">
            MEMORY
            <br />
            FLIP
          </h1>
          <motion.p
            className="relative text-xl md:text-2xl font-bold text-white/80 tracking-widest uppercase"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            Match &bull; Remember &bull; Win
          </motion.p>
        </motion.div>

        {/* Demo card row */}
        <div className="flex gap-4 justify-center my-4">
          {DEMO_CARDS.map((icon, i) => (
            <motion.div
              key={i}
              className={`w-16 h-20 md:w-20 md:h-24 rounded-2xl bg-gradient-to-br ${DEMO_COLORS[i]} border-2 border-white/40 flex items-center justify-center shadow-2xl`}
              initial={{ opacity: 0, y: 20, rotateY: 180 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 220, damping: 22 }}
              whileHover={{ scale: 1.15, rotateZ: 6, y: -6 }}
              style={{ perspective: '600px', backfaceVisibility: 'hidden' }}
            >
              <span style={{ fontSize: '2.5rem' }}>{icon}</span>
            </motion.div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 w-full sm:w-64">
          <motion.button
            onClick={onPlay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,255,255,0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 bg-white text-slate-900 text-lg md:text-xl font-black py-3 px-8 rounded-full shadow-[0_0_28px_rgba(255,255,255,0.2)] transition-all"
          >
            <Play fill="currentColor" size={22} />
            PLAY NOW
          </motion.button>

          <motion.button
            onClick={onSettings}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 32px rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 bg-slate-800/50 backdrop-blur-md border border-white/20 text-white text-sm md:text-base font-bold py-3 px-6 rounded-full shadow-lg transition-all hover:bg-slate-700/50"
          >
            <Settings size={18} />
            SETTINGS & STATS
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
