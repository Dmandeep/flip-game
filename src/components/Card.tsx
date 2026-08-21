import React from 'react';
import { motion } from 'framer-motion';

export type CardData = {
  id: string; // Unique instance ID
  itemId: string; // The ID of the category item it represents
  name: string;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
};

type CardProps = {
  card: CardData;
  onClick: (card: CardData) => void;
  disabled: boolean;
  reducedMotion: boolean;
};

export const Card: React.FC<CardProps> = ({ card, onClick, disabled, reducedMotion }) => {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onClick(card);
    }
  };

  const springConfig = reducedMotion ? { duration: 0 } : { type: 'spring' as const, stiffness: 260, damping: 20 };

  // Match animation states
  const variants = {
    initial: { scale: 1, opacity: 1 },
    matched: {
      scale: [1, 1.1, 0.9, 1.2, 0],
      opacity: [1, 1, 1, 0.5, 0],
      rotate: [0, -5, 5, -10, 10, 0],
      transition: { duration: 0.8, times: [0, 0.2, 0.4, 0.6, 1] }
    }
  };

  return (
    <motion.div
      className={`relative w-full h-full cursor-pointer perspective-1000 ${
        (disabled || card.isFlipped || card.isMatched) ? 'cursor-default' : 'hover:scale-105 transition-transform'
      }`}
      onClick={handleClick}
      variants={reducedMotion ? {} : variants}
      initial="initial"
      animate={card.isMatched ? "matched" : "initial"}
    >
      <motion.div
        className="w-full h-full relative transform-style-3d transition-transform duration-500 rounded-xl shadow-md"
        animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
        transition={springConfig}
      >
        {/* Front of card (shown when flipped) */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center border-2 border-primary/20">
          <span className="text-4xl md:text-5xl lg:text-6xl drop-shadow-sm">{card.icon}</span>
        </div>

        {/* Back of card (shown when face down) */}
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-primary to-indigo-600 rounded-xl border-2 border-white/10 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-white/20 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-white/20"></div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
