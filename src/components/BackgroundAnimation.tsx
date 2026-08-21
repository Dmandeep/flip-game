import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Symbols related to Attack on Titan theme
const SYMBOLS = ['⚔️', '🦅', '💀', '🗡️', '🛡️', '🔥', '🗝️', '🧣'];

type FloatingItem = {
  id: number;
  symbol: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
};

export const BackgroundAnimation = () => {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    // Generate static items to animate
    const newItems = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      left: Math.random() * 100, // random horizontal start 0-100%
      size: Math.random() * 2 + 1.5, // 1.5rem to 3.5rem
      duration: Math.random() * 20 + 20, // 20-40 seconds to float up
      delay: Math.random() * 10,
      rotation: Math.random() * 360,
    }));
    setItems(newItems);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
      {/* Symmetric Wave Flow Overlay */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: 'radial-gradient(circle at center, transparent 0%, var(--background) 100%)',
        }}
      />
      
      {/* Floating Game Elements */}
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-white/10 drop-shadow-sm select-none"
          style={{
            left: `${item.left}%`,
            fontSize: `${item.size}rem`,
            bottom: '-10%',
          }}
          animate={{
            y: [0, -1200], // Float way up off screen
            rotate: [item.rotation, item.rotation + (Math.random() > 0.5 ? 360 : -360)], // slowly spin
            x: [0, Math.sin(item.id) * 100, 0] // sway left/right
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "linear"
          }}
        >
          {/* If it's a card symbol, style it like a little floating card */}
          {item.symbol === '🃏' ? (
            <div className="w-[1.2em] h-[1.6em] border-2 border-white/20 rounded-lg flex items-center justify-center bg-white/5 backdrop-blur-sm shadow-lg">
              ❓
            </div>
          ) : (
            item.symbol
          )}
        </motion.div>
      ))}
    </div>
  );
};
