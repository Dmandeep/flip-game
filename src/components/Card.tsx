import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { SoundFX } from '../utils/sound';
import { svgIconMap } from '../data/svgIcons';

export type CardData = {
  id: string;
  itemId: string;
  name: string;
  icon: string;
  image?: string;
  isFlipped: boolean;
  isMatched: boolean;
};

type CardProps = {
  card: CardData;
  onClick: (card: CardData) => void;
  disabled: boolean;
  reducedMotion: boolean;
  isMismatched?: boolean;
  soundOn: boolean;
};

export const CardComponent: React.FC<CardProps> = ({
  card,
  onClick,
  disabled,
  reducedMotion,
  isMismatched = false,
  soundOn,
}) => {
  const revealed = card.isFlipped || card.isMatched;
  
  const hasPlayedFlipSound = useRef(false);

  useEffect(() => {
    if (revealed && !hasPlayedFlipSound.current) {
      if (soundOn) SoundFX.flip();
      hasPlayedFlipSound.current = true;
    } else if (!revealed) {
      hasPlayedFlipSound.current = false;
    }
  }, [revealed, soundOn]);

  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) onClick(card);
  };

  const flipTransition = reducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 500, damping: 25, mass: 1.5 };

  return (
    <div className="relative w-full h-full aspect-[3/4] perspective-1000 select-none mx-auto group" style={{ perspective: '1200px' }}>
      {/* ── TITAN LIGHTNING FLASH ───────────────────────────────────── */}
      <AnimatePresence>
        {card.isMatched && !reducedMotion && (
          <motion.div
            className="absolute inset-[-50%] bg-[#fde047] rounded-full mix-blend-overlay z-50 pointer-events-none blur-2xl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [1, 0.8, 0], scale: [1, 1.5, 2] }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className={`relative w-full h-full transform-style-3d ${disabled || revealed ? 'cursor-default' : 'cursor-pointer'}`}
        style={{ transformStyle: 'preserve-3d' }}
        onClick={handleClick}
        initial={{ opacity: 1, scale: 1, y: 0, rotateZ: 0, filter: "blur(0px)" }}
        whileHover={(!disabled && !revealed && !reducedMotion) ? { scale: 1.05 } : {}}
        whileTap={(!disabled && !revealed && !reducedMotion) ? { scale: 0.95 } : {}}
        animate={
          reducedMotion
            ? {}
            : isMismatched
            ? { x: [0, -10, 10, -5, 5, 0] }
            : card.isMatched
            ? { 
                filter: "drop-shadow(0 0 10px rgba(255,0,0,0.8))"
              }
            : { scale: 1, y: 0, rotateZ: 0, filter: "blur(0px)" }
        }
        transition={
          isMismatched
            ? { duration: 0.3, ease: 'linear' }
            : { type: 'spring', stiffness: 400, damping: 30 }
        }
      >
        <motion.div
          className="relative w-full h-full shadow-2xl"
          animate={{ rotateY: revealed ? 180 : 0 }}
          transition={flipTransition}
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: card.isMatched
              ? '0 0 50px rgba(253, 224, 71, 0.8)'
              : '0 10px 20px rgba(0,0,0,0.5)',
          }}
        >
          {/* Hover Titan Sparks */}
          {!revealed && !reducedMotion && (
            <div className="titan-sparks" />
          )}

          {/* Blood Slash on Mismatch */}
          {!reducedMotion && (
            <motion.div 
              className="blood-slash rounded-lg"
              animate={{ opacity: isMismatched ? [0, 1, 0] : 0 }}
              transition={{ duration: 0.4 }}
            />
          )}

          {/* ── BACK FACE (Survey Corps Leather & Logo) ─────────────────────────────────────── */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden texture-leather bg-[#3e2723]"
            style={{ 
              backfaceVisibility: 'hidden', 
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            {/* The user's downloaded original logo */}
            <img 
              src="./logo.jpg" 
              alt="Survey Corps Logo" 
              className="w-full h-full object-cover opacity-90 mix-blend-multiply"
              onError={(e) => {
                // Fallback to SVG if logo.jpg is missing
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling!.classList.remove('hidden');
              }}
            />
            
            {/* Fallback SVG just in case */}
            <div className="hidden w-3/4 h-3/4 opacity-80 flex items-center justify-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] filter grayscale contrast-125 brightness-110 sepia-[0.3]">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor">
                {/* Shield */}
                <path d="M10,20 L50,5 L90,20 L90,60 C90,80 50,95 50,95 C50,95 10,80 10,60 Z" stroke="#333" strokeWidth="4" fill="#222" />
                {/* Cross Wings */}
                <path d="M20,40 L45,60 L50,80 L35,50 Z" fill="#fff" />
                <path d="M80,30 L55,50 L50,70 L65,40 Z" fill="#3b82f6" />
                <path d="M15,50 L40,70 L50,90 L30,60 Z" fill="#fff" />
                <path d="M85,40 L60,60 L50,80 L70,50 Z" fill="#3b82f6" />
                <path d="M25,30 L45,50 L50,70 L40,40 Z" fill="#fff" />
                <path d="M75,20 L55,40 L50,60 L60,30 Z" fill="#3b82f6" />
              </svg>
            </div>
          </div>

          {/* ── FRONT FACE (Revealed Target) ─────────────────────────────────────── */}
          {/* ── FRONT FACE (Revealed Target) ─────────────────────────────────────── */}
          <div
            className={`absolute inset-0 ${!card.isMatched || reducedMotion ? 'texture-parchment' : ''}`}
            style={{ 
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              borderRadius: '6px'
            }}
          >
            {/* Main Un-sliced Image (Always rendered, but fades out instantly on match) */}
            <motion.div 
              className="absolute inset-0 flex flex-col items-center justify-center p-1"
              animate={{ opacity: card.isMatched && !reducedMotion ? 0 : 1 }}
              transition={{ duration: 0 }}
            >
              {card.image ? (
                <img src={card.image} alt={card.name} className="w-full h-full object-cover rounded shadow-inner" referrerPolicy="no-referrer" />
              ) : svgIconMap[card.icon] ? (
                <div className="relative z-10 select-none drop-shadow-md" style={{ width: 'clamp(2.5rem, 6vw, 4rem)', height: 'clamp(2.5rem, 6vw, 4rem)' }}>
                  {svgIconMap[card.icon]}
                </div>
              ) : (
                <span className="relative z-10 select-none drop-shadow-md" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
                  {card.icon}
                </span>
              )}
              <div className="absolute bottom-0 w-full bg-black/70 p-1 backdrop-blur-sm rounded-b">
                <p className="font-sans font-bold text-white text-[10px] uppercase tracking-widest text-center truncate">
                  {card.name}
                </p>
              </div>
            </motion.div>

            {/* Sword Slash Line */}
            {!reducedMotion && (
              <motion.div
                className="absolute top-1/2 left-[-25%] w-[150%] h-[6px] bg-white z-50 origin-left pointer-events-none"
                initial={{ scaleX: 0, rotate: 45, opacity: 0 }}
                animate={card.isMatched ? { scaleX: [0, 1, 1], opacity: [1, 1, 0] } : { opacity: 0 }}
                transition={card.isMatched ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
                style={{ boxShadow: '0 0 20px #fff, 0 0 40px #f00' }}
              />
            )}

            {/* Top-Left Half */}
            {!reducedMotion && (
              <motion.div
                className="absolute inset-0 z-40 texture-parchment flex flex-col items-center justify-center p-1 pointer-events-none"
                style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)', borderRadius: '6px' }}
                initial={{ x: 0, y: 0, opacity: 0, rotate: 0 }}
                animate={card.isMatched ? { x: -40, y: -40, opacity: [1, 1, 0], rotate: -15, scale: [1, 1, 1.2], filter: ["blur(0px) brightness(1)", "blur(0px) brightness(1)", "blur(15px) brightness(2) grayscale(1)"] } : { opacity: 0 }}
                transition={card.isMatched ? { delay: 0.2, duration: 1.0, ease: "easeOut" } : { duration: 0 }}
              >
                {card.image ? (
                  <img src={card.image} alt={card.name} className="w-full h-full object-cover rounded shadow-inner" referrerPolicy="no-referrer" />
                ) : svgIconMap[card.icon] ? (
                  <div className="relative z-10 select-none" style={{ width: 'clamp(2.5rem, 6vw, 4rem)', height: 'clamp(2.5rem, 6vw, 4rem)' }}>
                    {svgIconMap[card.icon]}
                  </div>
                ) : (
                  <span className="relative z-10 select-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>{card.icon}</span>
                )}
                <div className="absolute bottom-0 w-full bg-black/70 p-1 backdrop-blur-sm rounded-b">
                  <p className="font-sans font-bold text-white text-[10px] uppercase text-center">{card.name}</p>
                </div>
              </motion.div>
            )}

            {/* Bottom-Right Half */}
            {!reducedMotion && (
              <motion.div
                className="absolute inset-0 z-40 texture-parchment flex flex-col items-center justify-center p-1 pointer-events-none"
                style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)', borderRadius: '6px' }}
                initial={{ x: 0, y: 0, opacity: 0, rotate: 0 }}
                animate={card.isMatched ? { x: 40, y: 40, opacity: [1, 1, 0], rotate: 15, scale: [1, 1, 1.2], filter: ["blur(0px) brightness(1)", "blur(0px) brightness(1)", "blur(15px) brightness(2) grayscale(1)"] } : { opacity: 0 }}
                transition={card.isMatched ? { delay: 0.2, duration: 1.0, ease: "easeOut" } : { duration: 0 }}
              >
                {card.image ? (
                  <img src={card.image} alt={card.name} className="w-full h-full object-cover rounded shadow-inner" referrerPolicy="no-referrer" />
                ) : svgIconMap[card.icon] ? (
                  <div className="relative z-10 select-none" style={{ width: 'clamp(2.5rem, 6vw, 4rem)', height: 'clamp(2.5rem, 6vw, 4rem)' }}>
                    {svgIconMap[card.icon]}
                  </div>
                ) : (
                  <span className="relative z-10 select-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>{card.icon}</span>
                )}
                <div className="absolute bottom-0 w-full bg-black/70 p-1 backdrop-blur-sm rounded-b">
                  <p className="font-sans font-bold text-white text-[10px] uppercase text-center">{card.name}</p>
                </div>
              </motion.div>
            )}

            {/* Titan Steam/Smoke Effect */}
            {!reducedMotion && (
              <motion.div
                className="absolute inset-[-50%] bg-white rounded-full z-40 mix-blend-screen pointer-events-none blur-xl"
                initial={{ opacity: 0, scale: 0.5, y: 0 }}
                animate={card.isMatched ? { opacity: [0, 0.8, 0], scale: [0.5, 1.5, 2.5], y: [0, -40, -100] } : { opacity: 0 }}
                transition={card.isMatched ? { delay: 0.4, duration: 1.2, ease: "easeOut" } : { duration: 0 }}
              />
            )}
            {!reducedMotion && (
              <motion.div
                className="absolute inset-[-50%] bg-gray-300 rounded-full z-40 mix-blend-overlay pointer-events-none blur-2xl"
                initial={{ opacity: 0, scale: 0.5, y: 0 }}
                animate={card.isMatched ? { opacity: [0, 0.9, 0], scale: [0.5, 2, 3], y: [0, -20, -80] } : { opacity: 0 }}
                transition={card.isMatched ? { delay: 0.5, duration: 1.5, ease: "easeOut" } : { duration: 0 }}
              />
            )}

            {/* Impact Flash */}
            {!reducedMotion && (
              <motion.div
                className="absolute inset-0 bg-red-500 z-50 mix-blend-overlay pointer-events-none rounded-lg"
                initial={{ opacity: 0 }}
                animate={card.isMatched ? { opacity: [0, 1, 0] } : { opacity: 0 }}
                transition={card.isMatched ? { duration: 0.2 } : { duration: 0 }}
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Card = React.memo(CardComponent, (prev, next) => {
  return (
    prev.card.id === next.card.id &&
    prev.card.isFlipped === next.card.isFlipped &&
    prev.card.isMatched === next.card.isMatched &&
    prev.disabled === next.disabled &&
    prev.reducedMotion === next.reducedMotion &&
    prev.isMismatched === next.isMismatched &&
    prev.soundOn === next.soundOn
  );
});
