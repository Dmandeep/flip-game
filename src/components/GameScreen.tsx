import React, { useState, useEffect, useCallback } from 'react';
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

  // Initialize game
  const initGame = useCallback(() => {
    const pairsCount = (difficulty.cols * difficulty.rows) / 2;
    
    // Select items
    const selectedItems = shuffleArray([...category.items]).slice(0, pairsCount);
    
    // Duplicate and create cards
    const newCards: CardData[] = [];
    selectedItems.forEach((item, index) => {
      newCards.push({ id: `a_${index}`, itemId: item.id, name: item.name, icon: item.icon, isFlipped: false, isMatched: false });
      newCards.push({ id: `b_${index}`, itemId: item.id, name: item.name, icon: item.icon, isFlipped: false, isMatched: false });
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
  }, [category, difficulty]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // Timer
  useEffect(() => {
    if (isPaused || matchedIds.length === cards.length || cards.length === 0) return;
    const interval = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, matchedIds.length, cards.length]);

  // Check Win
  useEffect(() => {
    if (cards.length > 0 && matchedIds.length === cards.length) {
      setTimeout(() => {
        onWin({ time, moves, score, combo });
      }, 1000);
    }
  }, [matchedIds.length, cards.length, onWin, time, moves, score, combo]);

  const handleCardClick = (card: CardData) => {
    if (isChecking || isPaused || flippedIds.includes(card.id) || matchedIds.includes(card.id)) return;
    
    // Play flip sound here if configured

    const newFlipped = [...flippedIds, card.id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setIsChecking(true);
      setMoves(m => m + 1);
      
      const card1 = cards.find(c => c.id === newFlipped[0]);
      const card2 = cards.find(c => c.id === newFlipped[1]);

      if (card1 && card2 && card1.itemId === card2.itemId) {
        // MATCH
        setTimeout(() => {
          setMatchedIds(prev => [...prev, card1.id, card2.id]);
          setFlippedIds([]);
          
          // Calculate score
          const points = 100 * combo;
          setScore(s => s + points);
          setCombo(c => c + 1);
          
          setIsChecking(false);
        }, 600); // Wait for flip animation
      } else {
        // NO MATCH
        setTimeout(() => {
          // Break combo
          setCombo(1);
          setScore(s => Math.max(0, s - 10)); // Penalize
          setFlippedIds([]);
          setIsChecking(false);
        }, 1000); // Show wrong match briefly
      }
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Create a grid layout based on difficulty
  const gridStyle = {
    gridTemplateColumns: `repeat(${difficulty.cols}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${difficulty.rows}, minmax(0, 1fr))`
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* HUD */}
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

      {/* Game Board */}
      <div className="flex-1 relative flex items-center justify-center p-4 md:p-8 overflow-hidden">
        <div 
          className="grid gap-2 md:gap-4 w-full h-full max-w-4xl max-h-[80vh] mx-auto"
          style={gridStyle}
        >
          {cards.map(card => {
            const isFlipped = flippedIds.includes(card.id);
            const isMatched = matchedIds.includes(card.id);
            
            return (
              <div key={card.id} className="w-full h-full flex items-center justify-center">
                {(!isMatched || isChecking) && ( // keep in DOM briefly for animation
                  <Card 
                    card={{ ...card, isFlipped, isMatched }} 
                    onClick={handleCardClick} 
                    disabled={isChecking || isPaused}
                    reducedMotion={settings.reducedMotion}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
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
