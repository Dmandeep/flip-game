import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, RotateCcw, X } from 'lucide-react';
import type { Category } from '../data/categories';
import type { DifficultyLevel } from '../data/difficulties';
import { Card } from './Card';
import type { CardData } from './Card';
import { shuffleArray } from '../utils/shuffle';
import type { GameResult } from '../App';
import type { GameSettings } from '../utils/storage';
import { SoundFX } from '../utils/sound';

type Props = {
  category: Category;
  difficulty: DifficultyLevel;
  settings: GameSettings;
  onWin: (result: GameResult) => void;
  onQuit: () => void;
};

/** Floating score popup that fades-out upward */
type ScorePopup = { id: number; value: number; x: number; y: number };

/** Combo toast notification */
type ComboToast = { id: number; combo: number };

export const GameScreen: React.FC<Props> = ({ category, difficulty, settings, onWin, onQuit }) => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [mismatchedIds, setMismatchedIds] = useState<string[]>([]); // for shake animation
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [showConfirmRestart, setShowConfirmRestart] = useState(false);
  const [totalPairs, setTotalPairs] = useState(0);
  const [scorePopups, setScorePopups] = useState<ScorePopup[]>([]);
  const [comboToasts, setComboToasts] = useState<ComboToast[]>([]);
  const [cardsReady, setCardsReady] = useState(false); // stagger entry gate
  const [gameSessionId, setGameSessionId] = useState(() => Date.now());

  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const popupIdRef = useRef(0);
  const gridRef = useRef<HTMLDivElement>(null);

  const addTimeout = useCallback((fn: () => void, delay: number) => {
    const id = setTimeout(() => {
      fn();
      timeoutRefs.current = timeoutRefs.current.filter(refId => refId !== id);
    }, delay);
    timeoutRefs.current.push(id);
    return id;
  }, []);

  const clearAllTimeouts = useCallback(() => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  }, []);

  useEffect(() => {
    return clearAllTimeouts;
  }, [clearAllTimeouts]);

  /* ── Initialise / Restart ─────────────────────────────────────────────── */
  const initGame = useCallback(() => {
    clearAllTimeouts();
    setCardsReady(false);

    const pairsCount = (difficulty.cols * difficulty.rows) / 2;
    setTotalPairs(pairsCount);
    const currentSession = Date.now();
    setGameSessionId(currentSession);

    const selectedItems = shuffleArray([...category.items]).slice(0, pairsCount);

    const newCards: CardData[] = [];
    selectedItems.forEach((item, index) => {
      newCards.push({ id: `${currentSession}_a_${index}`, itemId: item.id, name: item.name, icon: item.icon, isFlipped: false, isMatched: false });
      newCards.push({ id: `${currentSession}_b_${index}`, itemId: item.id, name: item.name, icon: item.icon, isFlipped: false, isMatched: false });
    });

    setCards(shuffleArray(newCards));
    setFlippedIds([]);
    setMatchedIds([]);
    setMismatchedIds([]);
    setMoves(0);
    setScore(0);
    setCombo(1);
    setTime(0);
    setIsPaused(false);
    setIsChecking(false);
    setShowConfirmRestart(false);
    setScorePopups([]);
    setComboToasts([]);

    // small delay so cards animate in after state reset
    addTimeout(() => setCardsReady(true), 80);
  }, [category, difficulty, clearAllTimeouts, addTimeout]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  /* ── Timer ────────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (isPaused || (totalPairs > 0 && matchedIds.length === totalPairs * 2) || cards.length === 0) return;
    const interval = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [isPaused, matchedIds.length, totalPairs, cards.length]);

  /* ── Win detection ────────────────────────────────────────────────────── */
  useEffect(() => {
    if (totalPairs > 0 && matchedIds.length === totalPairs * 2) {
      if (settings.soundOn) SoundFX.win();
      addTimeout(() => onWin({ time, moves, score, combo }), 1200);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchedIds.length, totalPairs]);

  /* ── Score popup helper ───────────────────────────────────────────────── */
  const spawnPopup = (pts: number) => {
    const rect = gridRef.current?.getBoundingClientRect();
    const x = rect ? Math.random() * (rect.width * 0.6) + rect.width * 0.2 : 200;
    const y = rect ? Math.random() * (rect.height * 0.4) + rect.height * 0.1 : 100;
    const pid = popupIdRef.current++;
    setScorePopups(p => [...p, { id: pid, value: pts, x, y }]);
    addTimeout(() => setScorePopups(p => p.filter(x => x.id !== pid)), 1200);
  };

  /* ── Card click handler ───────────────────────────────────────────────── */
  const handleCardClick = (card: CardData) => {
    if (isChecking || isPaused || flippedIds.includes(card.id) || matchedIds.includes(card.id)) return;

    if (settings.soundOn) SoundFX.flip();

    setFlippedIds(prev => {
      if (prev.length >= 2) return prev;
      const newFlipped = [...prev, card.id];

      if (newFlipped.length === 2) {
        setIsChecking(true);
        setMoves(m => m + 1);

        const card1 = cards.find(c => c.id === newFlipped[0]);
        const card2 = cards.find(c => c.id === newFlipped[1]);

        if (card1 && card2 && card1.itemId === card2.itemId) {
          /* ✅ Match */
          addTimeout(() => {
            if (settings.soundOn) SoundFX.match();

            setMatchedIds(m => [...m, card1.id, card2.id]);
            setFlippedIds([]);

            setScore(s => {
              const pts = 100 * combo;
              spawnPopup(pts);
              return s + pts;
            });

            // Combo toast when streak ≥ 2
            setCombo(c => {
              const next = c + 1;
              if (next >= 3) {
                const tid = popupIdRef.current++;
                setComboToasts(t => [...t, { id: tid, combo: next }]);
                addTimeout(() => setComboToasts(t => t.filter(x => x.id !== tid)), 1400);
              }
              return next;
            });

            setIsChecking(false);
          }, 500);
        } else {
          /* ❌ Mismatch */
          setMismatchedIds([card1!.id, card2!.id]);
          addTimeout(() => {
            if (settings.soundOn) SoundFX.mismatch();
            setMismatchedIds([]);
            setCombo(1);
            setScore(s => Math.max(0, s - 10));
            setFlippedIds([]);
            setIsChecking(false);
          }, 950);
        }
      }
      return newFlipped;
    });
  };

  /* ── Formatting ───────────────────────────────────────────────────────── */
  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const pairsFraction = totalPairs > 0 ? matchedIds.length / (totalPairs * 2) : 0;

  /* ── Grid sizing — adaptive based on difficulty ───────────────────────── */
  // For larger grids we reduce gap and use a tighter max-width
  const isLarge = difficulty.cols >= 6;
  const gridGap = isLarge ? 'gap-1.5 md:gap-2' : 'gap-2 md:gap-3';
  const gridPad  = isLarge ? 'p-2 md:p-4' : 'p-3 md:p-6';

  const gridStyle = {
    gridTemplateColumns: `repeat(${difficulty.cols}, minmax(0, 1fr))`,
    gridTemplateRows:    `repeat(${difficulty.rows}, minmax(0, 1fr))`,
  };

  /* ─────────────────────────────────────────────────────────────────────── */
  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">

      {/* ── Header ────────────────────────────────────────────────────── */}
      <header className="px-4 py-3 flex items-center justify-between bg-purple-950/70 backdrop-blur-md shadow-lg z-10 border-b border-purple-500/20">
        <div className="flex items-center gap-3 md:gap-5 text-purple-100">
          {/* Timer */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">{category.name}</span>
            <div className="text-lg font-bold tabular-nums">⏱ {formatTime(time)}</div>
          </div>
          <div className="hidden sm:block w-px h-7 bg-purple-500/30" />
          {/* Moves */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Moves</span>
            <div className="text-lg font-bold">🎯 {moves}</div>
          </div>
          <div className="hidden sm:block w-px h-7 bg-purple-500/30" />
          {/* Score */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Score</span>
            <motion.div
              key={score}
              className="text-lg font-bold text-yellow-300"
              initial={{ scale: 1.4 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            >
              ⭐ {score}
            </motion.div>
          </div>
          <div className="hidden sm:block w-px h-7 bg-purple-500/30" />
          {/* Combo */}
          <div className="flex flex-col min-w-[72px]">
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Combo</span>
            <AnimatePresence mode="wait">
              <motion.div
                key={combo}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 20 }}
                className="text-lg font-bold"
                style={{ color: combo > 1 ? '#f97316' : '#c4b5fd' }}
              >
                {combo > 1 ? `🔥 ×${combo}` : '—'}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Pause button */}
        <motion.button
          onClick={() => setIsPaused(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2.5 bg-purple-700/50 hover:bg-purple-600/60 text-purple-200 rounded-xl transition-colors border border-purple-500/30"
        >
          <Pause size={18} />
        </motion.button>
      </header>

      {/* ── Progress bar ──────────────────────────────────────────────── */}
      {totalPairs > 0 && (
        <div className="px-4 py-1.5 bg-purple-950/50">
          <div className="flex items-center gap-2 max-w-4xl mx-auto">
            <span className="text-[11px] text-purple-400 font-bold whitespace-nowrap tabular-nums">
              {matchedIds.length / 2} / {totalPairs}
            </span>
            <div className="flex-1 h-2 bg-purple-900/60 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-400 to-rose-400"
                animate={{ width: `${pairsFraction * 100}%` }}
                transition={{ type: 'spring', stiffness: 100, damping: 22 }}
              />
            </div>
            <span className="text-[11px] text-purple-400 font-bold">{Math.round(pairsFraction * 100)}%</span>
          </div>
        </div>
      )}

      {/* ── Card Grid ─────────────────────────────────────────────────── */}
      <div className={`flex-1 relative flex items-center justify-center ${gridPad} overflow-hidden`}>

        {/* Floating score popups */}
        <div ref={gridRef} className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          <AnimatePresence>
            {scorePopups.map(p => (
              <motion.div
                key={p.id}
                className="absolute font-black text-yellow-300 drop-shadow-lg"
                style={{ left: p.x, top: p.y, fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}
                initial={{ opacity: 1, y: 0, scale: 1 }}
                animate={{ opacity: 0, y: -55, scale: 1.3 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.0, ease: 'easeOut' }}
              >
                +{p.value}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Combo toast */}
          <AnimatePresence>
            {comboToasts.map(t => (
              <motion.div
                key={t.id}
                className="absolute left-1/2 top-6 -translate-x-1/2 bg-orange-500/90 backdrop-blur text-white font-black px-5 py-2 rounded-full shadow-lg text-lg"
                initial={{ opacity: 0, y: -20, scale: 0.7 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 400, damping: 24 }}
              >
                🔥 ×{t.combo} COMBO!
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Cards */}
        <div
          className={`grid ${gridGap} w-full h-full max-h-full mx-auto place-items-center`}
          style={{
            ...gridStyle,
            // Calculate a safe max-width based on the number of columns and rows to maintain roughly 4:5 aspect ratio
            maxWidth: `calc((100vh - 12rem) * (${difficulty.cols} / ${difficulty.rows}) * 0.8)`,
          }}
        >
          <AnimatePresence>
            {cards.map((card, i) => {
              const isFlipped     = flippedIds.includes(card.id);
              const isMatched     = matchedIds.includes(card.id);
              const isMismatched  = mismatchedIds.includes(card.id);

              return (
                <motion.div
                  key={card.id}
                  layout
                  /* stagger entry */
                  initial={cardsReady && !settings.reducedMotion ? { opacity: 0, scale: 0.5, rotateY: -30 } : {}}
                  animate={cardsReady ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                  exit={{ opacity: 0, scale: 0, rotateZ: 10 }}
                  transition={
                    settings.reducedMotion
                      ? { duration: 0 }
                      : {
                          delay: i * 0.025,
                          type: 'spring',
                          stiffness: 220,
                          damping: 22,
                        }
                  }
                  className="w-full h-full"
                >
                  <Card
                    card={{ ...card, isFlipped, isMatched }}
                    onClick={handleCardClick}
                    disabled={isChecking || isPaused}
                    reducedMotion={settings.reducedMotion}
                    isMismatched={isMismatched}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Pause overlay ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-purple-900 to-indigo-900 p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center border border-purple-500/30 m-4"
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            >
              <div className="text-5xl mb-3">⏸</div>
              <h2 className="text-3xl font-black mb-6 text-white">PAUSED</h2>

              {!showConfirmRestart ? (
                <div className="flex flex-col gap-3">
                  <motion.button
                    onClick={() => setIsPaused(false)}
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="w-full py-4 bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-400 hover:to-pink-400 text-white font-bold rounded-xl transition-colors shadow-lg"
                  >
                    ▶ RESUME
                  </motion.button>
                  <motion.button
                    onClick={() => setShowConfirmRestart(true)}
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="w-full py-4 bg-purple-700/50 hover:bg-purple-600/60 text-purple-200 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 border border-purple-500/30"
                  >
                    <RotateCcw size={18} /> RESTART
                  </motion.button>
                  <motion.button
                    onClick={onQuit}
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="w-full py-4 text-red-400 hover:bg-red-500/10 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <X size={18} /> EXIT TO MENU
                  </motion.button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <p className="text-purple-300 mb-2">Your current progress will be lost.</p>
                  <motion.button
                    onClick={initGame}
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors"
                  >
                    CONFIRM RESTART
                  </motion.button>
                  <motion.button
                    onClick={() => setShowConfirmRestart(false)}
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="w-full py-4 bg-purple-700/50 hover:bg-purple-600/60 text-purple-200 font-bold rounded-xl transition-colors border border-purple-500/30"
                  >
                    CANCEL
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
