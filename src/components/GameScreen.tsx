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

type Props = {
  category: Category;
  difficulty: DifficultyLevel;
  settings: GameSettings;
  onWin: (result: GameResult) => void;
  onQuit: () => void;
};

export const GameScreen: React.FC<Props> = ({ category, difficulty, settings, onWin, onQuit }) => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [showConfirmRestart, setShowConfirmRestart] = useState(false);
  const [totalPairs, setTotalPairs] = useState(0);

  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  const addTimeout = (fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    timeoutRefs.current.push(id);
    return id;
  };

  const clearAllTimeouts = useCallback(() => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  }, []);

  useEffect(() => {
    return clearAllTimeouts;
  }, [clearAllTimeouts]);

  const initGame = useCallback(() => {
    clearAllTimeouts();
    const pairsCount = (difficulty.cols * difficulty.rows) / 2;
    setTotalPairs(pairsCount);
    
    const selectedItems = shuffleArray([...category.items]).slice(0, pairsCount);
    
    const gradients = [
      'from-red-400 to-orange-400',
      'from-emerald-400 to-teal-400',
      'from-blue-400 to-indigo-400',
      'from-amber-400 to-orange-500',
      'from-fuchsia-500 to-purple-600',
      'from-pink-400 to-rose-500'
    ];

    const newCards: CardData[] = [];
    selectedItems.forEach((item, index) => {
      // Assign a random color for each pair
      const color = gradients[Math.floor(Math.random() * gradients.length)];
      newCards.push({ id: `a_${index}`, itemId: item.id, name: item.name, icon: item.icon, color, isFlipped: false, isMatched: false });
      newCards.push({ id: `b_${index}`, itemId: item.id, name: item.name, icon: item.icon, color, isFlipped: false, isMatched: false });
    });

    setCards(shuffleArray(newCards));
    setFlippedIds([]);
    setMatchedIds([]);
    setMoves(0);
    setScore(0);
    setCombo(1);
    setTime(0);
    setIsPaused(false);
    setIsChecking(false);
    setShowConfirmRestart(false);
  }, [category, difficulty, clearAllTimeouts]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (isPaused || (totalPairs > 0 && matchedIds.length === totalPairs * 2) || cards.length === 0) return;
    const interval = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, matchedIds.length, totalPairs, cards.length]);

  useEffect(() => {
    if (totalPairs > 0 && matchedIds.length === totalPairs * 2) {
      addTimeout(() => {
        onWin({ time, moves, score, combo });
      }, 1000);
    }
  }, [matchedIds.length, totalPairs, onWin, time, moves, score, combo]);

  const handleCardClick = (card: CardData) => {
    if (isChecking || isPaused || flippedIds.includes(card.id) || matchedIds.includes(card.id)) return;

    setFlippedIds(prev => {
      if (prev.length >= 2) return prev;
      const newFlipped = [...prev, card.id];

      if (newFlipped.length === 2) {
        setIsChecking(true);
        setMoves(m => m + 1);
        
        const card1 = cards.find(c => c.id === newFlipped[0]);
        const card2 = cards.find(c => c.id === newFlipped[1]);

        if (card1 && card2 && card1.itemId === card2.itemId) {
          addTimeout(() => {
            setMatchedIds(m => [...m, card1.id, card2.id]);
            setFlippedIds([]);
            
            setScore(s => s + (100 * combo));
            setCombo(c => c + 1);
            
            setIsChecking(false);

            addTimeout(() => {
              setCards(c => c.filter(x => x.id !== card1.id && x.id !== card2.id));
            }, 800);
          }, 600);
        } else {
          addTimeout(() => {
            setCombo(1);
            setScore(s => Math.max(0, s - 10));
            setFlippedIds([]);
            setIsChecking(false);
          }, 1000);
        }
      }
      return newFlipped;
    });
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const gridStyle = {
    gridTemplateColumns: `repeat(${difficulty.cols}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${difficulty.rows}, minmax(0, 1fr))`
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      <header className="p-4 flex items-center justify-between bg-white dark:bg-slate-800 shadow-sm z-10">
        <div className="flex items-center gap-3 md:gap-6">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{category.name}</span>
            <div className="text-xl font-bold flex items-center gap-2">
              ⏱ {formatTime(time)}
            </div>
          </div>
          <div className="hidden sm:block w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Moves</span>
            <div className="text-xl font-bold">🎯 {moves}</div>
          </div>
          <div className="hidden sm:block w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Score</span>
            <div className="text-xl font-bold text-primary">⭐ {score}</div>
          </div>
          <div className="hidden sm:block w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
          <div className="flex flex-col min-w-[80px]">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Combo</span>
            <AnimatePresence mode="wait">
              <motion.div 
                key={combo}
                initial={{ scale: 1.5, color: '#ef4444' }}
                animate={{ scale: 1, color: combo > 1 ? '#f97316' : '' }}
                className="text-xl font-bold"
              >
                {combo > 1 ? `🔥 ×${combo}` : '—'}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsPaused(true)}
            className="p-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl transition-colors"
          >
            <Pause size={20} />
          </button>
        </div>
      </header>

      <div className="flex-1 relative flex items-center justify-center p-4 md:p-8 overflow-hidden">
        <div 
          className="grid gap-2 md:gap-4 w-full h-full max-w-4xl max-h-[80vh] mx-auto"
          style={gridStyle}
        >
          <AnimatePresence>
            {cards.map(card => {
              const isFlipped = flippedIds.includes(card.id);
              const isMatched = matchedIds.includes(card.id);
              
              return (
                <motion.div 
                  key={card.id} 
                  layout 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <Card 
                    card={{ ...card, isFlipped, isMatched }} 
                    onClick={handleCardClick} 
                    disabled={isChecking || isPaused}
                    reducedMotion={settings.reducedMotion}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {isPaused && (
          <motion.div 
            className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center border border-slate-200 dark:border-slate-700 m-4"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <h2 className="text-3xl font-black mb-8">GAME PAUSED</h2>
              
              {!showConfirmRestart ? (
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => setIsPaused(false)}
                    className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-colors"
                  >
                    RESUME
                  </button>
                  <button 
                    onClick={() => setShowConfirmRestart(true)}
                    className="w-full py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={18} /> RESTART
                  </button>
                  <button 
                    onClick={onQuit}
                    className="w-full py-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <X size={18} /> EXIT TO MENU
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <p className="text-slate-500 dark:text-slate-400 mb-4">Your current progress will be lost.</p>
                  <button 
                    onClick={initGame}
                    className="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors"
                  >
                    CONFIRM RESTART
                  </button>
                  <button 
                    onClick={() => setShowConfirmRestart(false)}
                    className="w-full py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 font-bold rounded-xl transition-colors"
                  >
                    CANCEL
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
