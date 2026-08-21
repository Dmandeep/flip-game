import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause } from 'lucide-react';
import type { Category } from '../data/categories';
import type { DifficultyLevel } from '../data/difficulties';
import { Card } from './Card';
import type { GameResult } from '../App';
import type { GameSettings } from '../utils/storage';
import { useGameEngine } from '../hooks/useGameEngine';
import { SoundFX } from '../utils/sound';

type Props = {
  category: Category;
  difficulty: DifficultyLevel;
  settings: GameSettings;
  onWin: (result: GameResult) => void;
  onQuit: () => void;
};

const COMBO_WORDS = ["SCOUT!", "ADVANCE!", "SHINZOU WO!", "SASAGEYO!", "TITAN!"];

const ComboToast = ({ combo }: { combo: number }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1000);
    return () => clearTimeout(t);
  }, [combo]);

  if (!visible || combo <= 1) return null;
  const word = COMBO_WORDS[(combo - 2) % COMBO_WORDS.length];

  return (
    <motion.div
      key={combo}
      className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
      initial={{ opacity: 0, scale: 0.2, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
      transition={{ type: 'spring', damping: 12, stiffness: 200 }}
    >
      <span className="text-7xl md:text-9xl font-black titan-text tracking-widest text-center whitespace-nowrap">
        {word}
      </span>
    </motion.div>
  );
};

export const GameScreen: React.FC<Props> = ({ category, difficulty, settings, onWin, onQuit }) => {
  const {
    gameState,
    cards,
    flippedIds,
    matchedIds,
    mismatchedIds,
    moves,
    score,
    combo,
    time,
    isPaused,
    setIsPaused,
    initGame,
    handleCardClick,
    totalPairs
  } = useGameEngine(category, difficulty, settings.soundOn);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (gameState === 'game_over') {
      if (settings.soundOn) SoundFX.win();
      setTimeout(() => onWin({ time, moves, score, combo }), 1200);
    }
  }, [gameState, onWin, settings.soundOn, time, moves, score, combo]);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const pairsFraction = totalPairs > 0 ? matchedIds.length / (totalPairs * 2) : 0;
  const isLarge = difficulty.cols >= 6;
  const gridGap = isLarge ? 'gap-2 md:gap-3' : 'gap-3 md:gap-5';
  const gridPad  = isLarge ? 'p-4 md:p-6' : 'p-6 md:p-10';

  const gridStyle = {
    gridTemplateColumns: `repeat(${difficulty.cols}, minmax(0, 1fr))`,
    gridTemplateRows:    `repeat(${difficulty.rows}, minmax(0, 1fr))`,
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10 bg-transparent">
      
      {/* ── Header (Tactical Display) ────────────────────────────────── */}
      <header className="flex items-center justify-between px-8 py-3 mx-4 mt-4 aot-panel border-b-4 border-[#166534] z-20">
        <div className="flex items-center gap-8 md:gap-16 w-full justify-center">
          <div className="flex flex-col items-center">
            <span className="font-sans text-[10px] font-bold text-[#999] uppercase tracking-[0.2em]">Elapsed Time</span>
            <div className="font-serif text-2xl font-bold text-white drop-shadow-md">{formatTime(time)}</div>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-sans text-[10px] font-bold text-[#999] uppercase tracking-[0.2em]">Mission Score</span>
            <motion.div 
              key={score}
              initial={{ scale: 1.5, color: '#fde047' }}
              animate={{ scale: 1, color: '#fff' }}
              className="font-serif text-3xl font-bold text-white drop-shadow-md"
            >
              {score}
            </motion.div>
          </div>
          <div className="hidden sm:flex flex-col items-center relative">
            <span className="font-sans text-[10px] font-bold text-[#999] uppercase tracking-[0.2em]">Multiplier</span>
            <motion.div
              key={combo}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              className={`font-serif text-2xl font-bold drop-shadow-lg ${combo > 1 ? 'text-[#fde047]' : 'text-white'}`}
            >
              x{combo}
            </motion.div>
          </div>
        </div>

        <button
          onClick={() => setIsPaused(true)}
          className="absolute right-8 p-3 rounded bg-transparent border border-[#555] hover:bg-[#333] hover:border-white text-white transition-all duration-200 active:scale-95"
        >
          <Pause size={18} />
        </button>
      </header>

      {/* ── Progress bar (Operation Status) ───────────────────────────── */}
      <div className="w-full max-w-lg mx-auto h-2 bg-[#111] mt-6 border border-[#333] relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'4\' height=\'4\' viewBox=\'0 0 4 4\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h1v4H0V0zm2 0h1v4H2V0z\' fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E')] opacity-50 z-10" />
        <motion.div
          className="h-full bg-[#7f1d1d] relative z-0"
          initial={{ width: 0 }}
          animate={{ width: `${pairsFraction * 100}%` }}
          transition={{ ease: 'easeOut', duration: 0.5 }}
        />
      </div>

      {/* ── Floating Combo Toast (Dramatic Manga Text) ──────────────── */}
      <AnimatePresence>
        <ComboToast combo={combo} />
      </AnimatePresence>

      {/* ── Play Area ─────────────────────────────────────────────────── */}
      <div className={`flex-1 relative flex items-center justify-center ${gridPad} overflow-hidden perspective-1000`}>
        <div 
          className={`grid ${gridGap} w-full h-full max-w-5xl mx-auto transform-style-3d`}
          style={gridStyle}
        >
          {cards.map((card, i) => {
            const isFlipped = flippedIds.includes(card.id);
            const isMatched = matchedIds.includes(card.id);
            const isMismatched = mismatchedIds.includes(card.id);

            return (
              <motion.div
                key={card.id}
                className="w-full h-full"
                initial={settings.reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', damping: 20, delay: gameState === 'dealing' ? 0 : i * 0.05 }}
              >
                <Card
                  card={{ ...card, isFlipped, isMatched }}
                  onClick={handleCardClick}
                  disabled={gameState !== 'awaiting_input' || isPaused}
                  reducedMotion={settings.reducedMotion}
                  isMismatched={isMismatched}
                  soundOn={settings.soundOn}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Pause Modal ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {(isPaused) && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="aot-panel p-10 max-w-sm w-full mx-4 border-2 border-[#555] text-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
            >
              <h2 className="text-4xl font-serif text-white tracking-[0.2em] mb-8 uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                Operation Paused
              </h2>

              <div className="flex flex-col gap-4">
                <button onClick={() => setIsPaused(false)} className="w-full py-4 text-xl aot-btn">
                  Resume Mission
                </button>
                <button onClick={initGame} className="w-full py-4 text-xl aot-btn bg-[#222]" style={{ background: 'linear-gradient(135deg, #333, #111)'}}>
                  Restart Mission
                </button>
                <button onClick={onQuit} className="w-full py-4 text-xl aot-btn aot-btn-danger">
                  Abort
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
