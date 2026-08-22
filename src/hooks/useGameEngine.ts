import { useState, useEffect, useCallback, useRef } from 'react';
import type { CardData } from '../components/Card';
import type { DifficultyLevel } from '../data/difficulties';
import type { Category } from '../data/categories';
import { shuffleArray } from '../utils/shuffle';
import { SoundFX } from '../utils/sound';

export type GameState = 'idle' | 'dealing' | 'pre_game' | 'awaiting_input' | 'flipping' | 'evaluating' | 'game_over';

export const useGameEngine = (category: Category, difficulty: DifficultyLevel, soundOn: boolean) => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [mismatchedIds, setMismatchedIds] = useState<string[]>([]);
  
  const [gameState, setGameState] = useState<GameState>('idle');
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalPairs = (difficulty.cols * difficulty.rows) / 2;
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

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

  const initGame = useCallback(() => {
    clearAllTimeouts();
    setGameState('dealing');
    
    const currentSession = Date.now();
    const selectedItems = shuffleArray([...category.items]).slice(0, totalPairs);

    const newCards: CardData[] = [];
    selectedItems.forEach((item, index) => {
      // @ts-ignore
      newCards.push({ id: `${currentSession}_a_${index}`, itemId: item.id, name: item.name, icon: item.icon, image: item.image, isFlipped: false, isMatched: false });
      // @ts-ignore
      newCards.push({ id: `${currentSession}_b_${index}`, itemId: item.id, name: item.name, icon: item.icon, image: item.image, isFlipped: false, isMatched: false });
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

    // Staggered deal delay
    addTimeout(() => setGameState('pre_game'), 100);
  }, [category, totalPairs, clearAllTimeouts, addTimeout]);

  const startPlay = useCallback(() => {
    setGameState('awaiting_input');
  }, []);

  // Timer loop (simplified for now, full rAF could go here)
  useEffect(() => {
    if (isPaused || gameState === 'game_over' || gameState === 'dealing' || gameState === 'idle' || gameState === 'pre_game') return;
    const interval = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [isPaused, gameState]);

  const handleCardClick = useCallback((card: CardData) => {
    // Only accept input if strictly awaiting input
    if (gameState !== 'awaiting_input' || isPaused) return;
    if (flippedIds.includes(card.id) || matchedIds.includes(card.id)) return;

    // We will let the component handle the sound flip via Framer Motion callbacks for perfect sync.
    // Here we just manage state.

    setFlippedIds(prev => {
      const newFlipped = [...prev, card.id];

      if (newFlipped.length === 2) {
        setGameState('evaluating');
        setMoves(m => m + 1);

        const card1 = cards.find(c => c.id === newFlipped[0]);
        const card2 = cards.find(c => c.id === newFlipped[1]);

        if (!card1 || !card2) return;

        if (card1.itemId === card2.itemId) {
          // Match
          addTimeout(() => {
            if (soundOn) {
              SoundFX.slash();
              setTimeout(() => SoundFX.vaporize(), 200);
            }
            setMatchedIds(m => {
              const newMatched = [...m, card1.id, card2.id];
              if (newMatched.length === totalPairs * 2) {
                setGameState('game_over');
              } else {
                setGameState('awaiting_input');
              }
              return newMatched;
            });
            setFlippedIds([]);
            setScore(s => s + (100 * combo));
            setCombo(c => c + 1);
          }, 600); // Wait for flip physics to settle
        } else {
          // Mismatch
          setMismatchedIds([card1.id, card2.id]);
          addTimeout(() => {
            if (soundOn) SoundFX.mismatch();
            setMismatchedIds([]);
            setCombo(1);
            setScore(s => Math.max(0, s - 10));
            setFlippedIds([]);
            setGameState('awaiting_input');
          }, 1000);
        }
      }
      return newFlipped;
    });
  }, [gameState, isPaused, flippedIds, matchedIds, cards, combo, soundOn, addTimeout, totalPairs]);

  return {
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
    startPlay,
    handleCardClick,
    totalPairs
  };
};
