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
  { back: 'from-blue-500 to-cyan-400',       front: 'from-blue-100 to-blue-300',     border: 'border-blue-300/40',  text: 'text-blue-900'  },
  { back: 'from-violet-500 to-fuchsia-400',  front: 'from-violet-100 to-fuchsia-300', border: 'border-fuchsia-300/40', text: 'text-violet-900'},
  { back: 'from-emerald-500 to-teal-400',    front: 'from-emerald-100 to-teal-300',   border: 'border-teal-300/40',  text: 'text-teal-900'  },
  { back: 'from-rose-500 to-pink-400',       front: 'from-rose-100 to-pink-300',      border: 'border-pink-300/40',  text: 'text-rose-900'  },
  { back: 'from-amber-500 to-orange-400',    front: 'from-amber-100 to-orange-300',   border: 'border-orange-300/40', text: 'text-orange-900' },
  { back: 'from-indigo-500 to-purple-400',   front: 'from-indigo-100 to-purple-300',  border: 'border-purple-300/40', text: 'text-indigo-900' },
  { back: 'from-teal-500 to-cyan-400',       front: 'from-teal-100 to-cyan-300',      border: 'border-cyan-300/40',  text: 'text-teal-900'  },
  { back: 'from-red-500 to-rose-400',        front: 'from-red-100 to-rose-300',       border: 'border-rose-300/40',  text: 'text-red-900'   },
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
            className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            initial={{ x: '-50%', y: '-50%', scale: 0, opacity: 1 }}
            animate={{
              x: `calc(-50% + ${Math.cos((angle * Math.PI) / 180) * 45}px)`,
              y: `calc(-50% + ${Math.sin((angle * Math.PI) / 180) * 45}px)`,
              scale: [0, 1.6, 0],
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
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
    : { type: 'spring' as const, stiffness: 260, damping: 25 };

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
        !disabled && !revealed && !reducedMotion ? { scale: 1.05, y: -4 } : {}
      }
      whileTap={
        !disabled && !revealed && !reducedMotion ? { scale: 0.96 } : {}
      }
    >
      {/* 3-D flip inner wrapper */}
      <motion.div
        className="relative w-full h-full transform-style-3d shadow-xl rounded-2xl"
        animate={{ rotateY: revealed ? 180 : 0 }}
        transition={flipTransition}
        style={{
          boxShadow: card.isMatched
            ? '0 0 20px rgba(255,255,255,0.7)'
            : isMismatched
            ? '0 0 15px rgba(239,68,68,0.6)'
            : '0 8px 24px rgba(0,0,0,0.15)',
        }}
      >
        {/* ── BACK face (face-down) ─────────────────────────────────────── */}
        <div
          className={`absolute inset-0 rounded-2xl border-2 ${color.border} bg-gradient-to-br ${color.back} flex flex-col items-center justify-center overflow-hidden shadow-inner`}
          style={{ 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {/* Detailed subtle repeating texture */}
          <div 
            className="absolute inset-0 opacity-[0.15]" 
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.5) 10px, rgba(255,255,255,0.5) 11px)'
            }}
          />
          
          {/* Glassy overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent backdrop-blur-[1px]" />
          
          {/* Central Crest / Logo */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Outer ring */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/40 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)] bg-white/10 backdrop-blur-sm">
              {/* Inner glowing element */}
              <div className="text-white/90 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
                ❖
              </div>
            </div>
            {/* Small subtle text */}
            <span className="mt-3 text-[9px] md:text-[11px] font-black tracking-[0.3em] text-white/70 uppercase">
              Memory
            </span>
          </div>
        </div>

        {/* ── FRONT face (revealed) ─────────────────────────────────────── */}
        <div
          className={`absolute inset-0 rounded-2xl border-2 ${color.border} bg-gradient-to-br ${color.front} flex flex-col items-center justify-center overflow-hidden ${card.isMatched ? 'ring-4 ring-white/60 ring-offset-2 ring-offset-transparent' : ''}`}
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)' // Fixed the invisible front face issue
          }}
        >
          {/* Inner shine */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/10 to-transparent pointer-events-none" />
          
          {/* Shimmer sweep on match */}
          {card.isMatched && !reducedMotion && (
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%)',
                backgroundSize: '200% 100%',
              }}
              animate={{ backgroundPositionX: ['200%', '-200%'] }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          )}
          
          {/* Emoji - MADE MUCH LARGER */}
          <span
            className="relative z-10 drop-shadow-md leading-none select-none"
            style={{ fontSize: 'clamp(3rem, 10vw, 6.5rem)' }} // Drastically increased size
          >
            {card.icon}
          </span>
          
          {/* Name - Styled to match the new bright theme */}
          <p
            className={`relative z-10 font-extrabold text-center px-2 mt-2 leading-tight ${color.text} tracking-wide uppercase`}
            style={{ fontSize: 'clamp(0.6rem, 2vw, 1rem)' }}
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
