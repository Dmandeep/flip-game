import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';
import { SoundFX } from '../utils/sound';

type Props = {
  onPlay: () => void;
  onSettings: () => void;
  musicOn: boolean;
};

// Falling Embers Component
const Embers = () => {
  const [embers] = useState<{ id: number; left: number; size: number; delay: number; duration: number; xOffsets: number[] }[]>(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 6 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 3,
      xOffsets: [0, Math.random() * 50 - 25, Math.random() * 50 - 25],
    }));
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {embers.map((e) => (
        <motion.div
          key={e.id}
          className="ember"
          style={{ left: `${e.left}%`, width: e.size, height: e.size }}
          initial={{ y: '110vh', opacity: 0, x: 0 }}
          animate={{ y: '-10vh', opacity: [0, 1, 0], x: e.xOffsets }}
          transition={{ duration: e.duration, delay: e.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  );
};

export const HomeScreen: React.FC<Props> = ({ onPlay, onSettings, musicOn }) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX / rect.width);
    y.set(e.clientY / rect.height);
  };

  const xOffset = useTransform(x, [0, 1], [-20, 20]);
  const yOffset = useTransform(y, [0, 1], [-20, 20]);
  
  const xOffsetFg = useTransform(x, [0, 1], [10, -10]);
  const yOffsetFg = useTransform(y, [0, 1], [10, -10]);

  const handleCommence = () => {
    if (musicOn) {
      SoundFX.playBGM();
    }
    // Haptic feedback on mobile
    try { if ('vibrate' in navigator) navigator.vibrate(50); } catch { /* ignore */ }
    onPlay();
  };

  return (
    <motion.div
      className="flex-1 w-full flex flex-col items-center justify-center relative z-10 min-h-[100dvh] overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
    >
      {/* ── PARALLAX ANIME SCENE ── */}
      <motion.div 
        className="absolute inset-[-10%] z-0"
        style={{ x: xOffset, y: yOffset }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-70" 
          style={{ backgroundImage: 'url("/home-bg.png")' }}
        />
        
        {/* Dark Vignette to make UI readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
      </motion.div>

      <Embers />

      <motion.div 
        className="flex flex-col items-center justify-center max-w-3xl w-full text-center relative z-20 pointer-events-none px-4"
        style={{ x: xOffsetFg, y: yOffsetFg }}
      >
        {/* Title */}
        <motion.div
          className="mb-10 sm:mb-16 flex flex-col items-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-base sm:text-xl md:text-2xl text-red-600 tracking-[0.3em] sm:tracking-[0.5em] font-sans font-bold mb-3 sm:mb-4 uppercase drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">
            Operation
          </h2>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black cinematic-title text-white">
            SHINGEKI
          </h1>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold cinematic-title text-white/50 mt-1 sm:mt-2">
            NO FLIP
          </h1>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex flex-col gap-3 sm:gap-4 w-full max-w-sm mx-auto pointer-events-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <button
            onClick={handleCommence}
            className="w-full py-4 sm:py-5 text-2xl sm:text-3xl aot-btn active:scale-95 transition-transform"
          >
            COMMENCE
          </button>
          
          <button
            onClick={onSettings}
            className="w-full py-3 sm:py-4 text-lg sm:text-xl aot-btn bg-[#2a2a2a] active:scale-95 transition-transform"
            style={{ background: 'linear-gradient(135deg, #2a2a2a, #111)' }}
          >
            SYSTEM CONFIG
          </button>
        </motion.div>

      </motion.div>
    </motion.div>
  );
};
