import { motion, AnimatePresence } from 'framer-motion';

export type CardData = {
  id: string;
  itemId: string;
  name: string;
  icon: string;
  color?: string;
  isFlipped: boolean;
  isMatched: boolean;
};

type CardProps = {
  card: CardData;
  onClick: (card: CardData) => void;
  disabled: boolean;
  reducedMotion: boolean;
  isMismatched?: boolean;
};

/* ─── Colour palette for cards ────────────────────────────────────────────── */
const CARD_COLORS = [
  { back: 'from-violet-600 to-indigo-700',   front: 'from-violet-400 to-indigo-500',   border: 'border-violet-300/60',  glow: 'shadow-violet-400/60'  },
  { back: 'from-rose-600 to-pink-700',       front: 'from-rose-400 to-pink-500',       border: 'border-rose-300/60',    glow: 'shadow-rose-400/60'    },
  { back: 'from-sky-600 to-blue-700',        front: 'from-sky-400 to-blue-500',        border: 'border-sky-300/60',     glow: 'shadow-sky-400/60'     },
  { back: 'from-emerald-600 to-teal-700',    front: 'from-emerald-400 to-teal-500',    border: 'border-emerald-300/60', glow: 'shadow-emerald-400/60' },
  { back: 'from-amber-500 to-orange-600',    front: 'from-amber-400 to-orange-500',    border: 'border-amber-300/60',   glow: 'shadow-amber-400/60'   },
  { back: 'from-fuchsia-600 to-purple-700',  front: 'from-fuchsia-400 to-purple-500',  border: 'border-fuchsia-300/60', glow: 'shadow-fuchsia-400/60' },
  { back: 'from-teal-600 to-cyan-700',       front: 'from-teal-400 to-cyan-500',       border: 'border-teal-300/60',    glow: 'shadow-teal-400/60'    },
  { back: 'from-red-600 to-rose-700',        front: 'from-red-400 to-rose-500',        border: 'border-red-300/60',     glow: 'shadow-red-400/60'     },
];

function getColor(itemId: string) {
  const idx = itemId.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return CARD_COLORS[idx % CARD_COLORS.length];
}

/* ─── Sparkle burst rendered after a successful match ─────────────────────── */
const SPARKLE_COUNT = 8;
function SparkleRing() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: SPARKLE_COUNT }).map((_, i) => {
        const angle = (360 / SPARKLE_COUNT) * i;
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-yellow-300"
            initial={{ x: '-50%', y: '-50%', scale: 0, opacity: 1 }}
            animate={{
              x: `calc(-50% + ${Math.cos((angle * Math.PI) / 180) * 38}px)`,
              y: `calc(-50% + ${Math.sin((angle * Math.PI) / 180) * 38}px)`,
              scale: [0, 1.4, 0],
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          />
        );
      })}
    </div>
  );
}

/* ─── Main card ────────────────────────────────────────────────────────────── */
export const Card: React.FC<CardProps> = ({
  card,
  onClick,
  disabled,
  reducedMotion,
  isMismatched = false,
}) => {
  const color = getColor(card.itemId);
  const revealed = card.isFlipped || card.isMatched;

  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) onClick(card);
  };

  /* spring used for the Y-axis flip */
  const flipTransition = reducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 300, damping: 28 };

  return (
    <motion.div
      /* container — holds perspective + hover lift */
      className={`relative w-full h-full max-w-full max-h-full aspect-[4/5] perspective-1000 select-none mx-auto ${
        disabled || revealed ? 'cursor-default' : 'cursor-pointer'
      }`}
      style={{ maxHeight: '100%', maxWidth: '100%' }}
      onClick={handleClick}
      /* entry pop */
      initial={reducedMotion ? {} : { scale: 0.6, opacity: 0 }}
      animate={
        reducedMotion
          ? {}
          : isMismatched
          ? { x: [0, -8, 8, -6, 6, -3, 3, 0] }   // shake
          : card.isMatched
          ? { scale: [1, 1.12, 0.95, 1.06, 1] }   // bounce-pop
          : { scale: 1, opacity: 1 }
      }
      transition={
        isMismatched
          ? { duration: 0.45, ease: 'easeInOut' }
          : card.isMatched
          ? { duration: 0.45, ease: 'easeOut' }
          : { type: 'spring', stiffness: 260, damping: 22 }
      }
      whileHover={
        !disabled && !revealed && !reducedMotion ? { scale: 1.06, y: -4 } : {}
      }
      whileTap={
        !disabled && !revealed && !reducedMotion ? { scale: 0.94 } : {}
      }
    >
      {/* 3-D flip inner wrapper */}
      <motion.div
        className="relative w-full h-full transform-style-3d"
        animate={{ rotateY: revealed ? 180 : 0 }}
        transition={flipTransition}
        style={{
          filter: card.isMatched
            ? 'drop-shadow(0 0 14px rgba(250,204,21,0.7))'
            : isMismatched
            ? 'drop-shadow(0 0 10px rgba(239,68,68,0.6))'
            : 'drop-shadow(0 6px 18px rgba(0,0,0,0.35))',
        }}
      >
        {/* ── BACK face (face-down) ─────────────────────────────────────── */}
        <div
          className={`
            absolute inset-0 backface-hidden rounded-2xl border-2 ${color.border}
            bg-gradient-to-br ${color.back}
            flex flex-col items-center justify-center overflow-hidden
          `}
        >
          {/* Subtle inner shine */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20 rounded-2xl pointer-events-none" />
          {/* Pattern dots */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '14px 14px',
            }}
          />
          {/* Anime face */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-0.5">
            <span style={{ fontSize: 'clamp(1.4rem, 4.5vw, 2.4rem)' }}>👑</span>
            <div className="flex gap-1">
              <span style={{ fontSize: 'clamp(1rem, 3.5vw, 1.8rem)' }}>✨</span>
              <span style={{ fontSize: 'clamp(1rem, 3.5vw, 1.8rem)' }}>✨</span>
            </div>
            <span style={{ fontSize: 'clamp(0.9rem, 3vw, 1.5rem)' }}>⌣</span>
            <p className="text-white/70 font-bold tracking-widest uppercase mt-1"
               style={{ fontSize: 'clamp(0.4rem, 1.2vw, 0.65rem)' }}>
              FLIP ME
            </p>
          </div>
        </div>

        {/* ── FRONT face (revealed) ─────────────────────────────────────── */}
        <div
          className={`
            absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border-2 ${color.border}
            bg-gradient-to-br ${color.front}
            flex flex-col items-center justify-center overflow-hidden
            ${card.isMatched ? 'ring-2 ring-yellow-300/80 ring-offset-1 ring-offset-transparent' : ''}
          `}
        >
          {/* Inner shine */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/15 rounded-2xl pointer-events-none" />
          {/* Shimmer sweep on match */}
          {card.isMatched && !reducedMotion && (
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)',
                backgroundSize: '200% 100%',
              }}
              animate={{ backgroundPositionX: ['200%', '-200%'] }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          )}
          {/* Emoji + name */}
          <span
            className="relative z-10 drop-shadow-lg leading-none"
            style={{ fontSize: 'clamp(1.6rem, 5.5vw, 4rem)' }}
          >
            {card.icon}
          </span>
          <p
            className="relative z-10 text-white font-bold text-center px-1 mt-0.5 leading-tight drop-shadow"
            style={{ fontSize: 'clamp(0.42rem, 1.5vw, 0.78rem)' }}
          >
            {card.name}
          </p>
        </div>
      </motion.div>

      {/* Sparkle burst overlay (only on match, non-reduced) */}
      <AnimatePresence>
        {card.isMatched && !reducedMotion && <SparkleRing key="sparkle" />}
      </AnimatePresence>
    </motion.div>
  );
};
