import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { difficulties } from '../data/difficulties';
import type { DifficultyLevel } from '../data/difficulties';
import type { Category } from '../data/categories';

type Props = {
  category: Category;
  onSelect: (difficulty: DifficultyLevel) => void;
  onBack: () => void;
};

const diffStyles = [
  { border: 'border-emerald-500/40 hover:border-emerald-400', glow: 'rgba(52,211,153,0.3)', text: 'text-emerald-400', label: 'Beginner friendly' },
  { border: 'border-amber-500/40 hover:border-amber-400',   glow: 'rgba(251,191,36,0.3)',  text: 'text-amber-400',   label: 'Getting tricky' },
  { border: 'border-orange-500/40 hover:border-orange-400', glow: 'rgba(249,115,22,0.3)',  text: 'text-orange-400',  label: 'Real challenge' },
  { border: 'border-rose-500/40 hover:border-rose-400',     glow: 'rgba(244,63,94,0.3)',   text: 'text-rose-400',    label: 'Memory master' },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  show:   { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 240, damping: 22 } },
};

export const DifficultySelection: React.FC<Props> = ({ category, onSelect, onBack }) => {
  return (
    <motion.div
      className="flex-1 flex flex-col p-4 max-w-4xl mx-auto w-full relative z-10"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <header className="flex items-center mb-6 mt-2">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.15, x: -4 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 transition-colors mr-4 text-white shadow-lg backdrop-blur-sm"
        >
          <ChevronLeft size={24} />
        </motion.button>
        <div>
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight flex items-center gap-3">
            <span className="text-4xl drop-shadow-md">{category.icon}</span> Select Difficulty
          </h2>
          <p className="text-slate-400 font-medium tracking-wide mt-0.5 text-sm">How good is your memory?</p>
        </div>
      </header>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {difficulties.map((diff, i) => {
          const style = diffStyles[i];
          const pairs = (diff.cols * diff.rows) / 2;
          return (
            <motion.button
              key={diff.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.04,
                y: -4,
                boxShadow: `0 15px 30px ${style.glow}`,
              }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelect(diff)}
              className={`group relative flex flex-col items-center p-6 bg-slate-900/60 backdrop-blur-md rounded-[1.5rem] border-2 ${style.border} text-center overflow-hidden transition-all duration-300`}
            >
              {/* Ambient Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <h3 className={`text-3xl font-black mb-2 ${style.text} tracking-wide drop-shadow-md`}>
                {diff.name}
              </h3>

              <div className="flex items-center justify-center gap-3 text-white/90 font-bold text-base mb-2 bg-white/5 px-5 py-1.5 rounded-full border border-white/10">
                <span>{diff.cols} × {diff.rows}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span>{pairs} Pairs</span>
              </div>

              <p className="text-slate-400 text-[11px] font-semibold tracking-widest uppercase mt-1">
                {style.label}
              </p>
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
};
