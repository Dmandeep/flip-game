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

const diffColors = [
  { grad: 'from-green-400 to-emerald-600',    glow: 'rgba(52,211,153,0.35)', label: 'Beginner friendly' },
  { grad: 'from-yellow-400 to-amber-600',     glow: 'rgba(251,191,36,0.35)', label: 'Getting tricky' },
  { grad: 'from-orange-400 to-red-500',       glow: 'rgba(249,115,22,0.35)', label: 'Real challenge' },
  { grad: 'from-red-500 to-rose-700',         glow: 'rgba(244,63,94,0.35)',  label: 'Memory master' },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 24 },
  show:   { opacity: 1, scale: 1,    y: 0, transition: { type: 'spring', stiffness: 280, damping: 24 } },
};

export const DifficultySelection: React.FC<Props> = ({ category, onSelect, onBack }) => {
  return (
    <motion.div
      className="flex-1 flex flex-col p-6 max-w-4xl mx-auto w-full relative z-10"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.28 }}
    >
      <header className="flex items-center mb-8 mt-4">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.12, x: -3 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full hover:bg-white/10 transition-colors mr-4 text-purple-200"
        >
          <ChevronLeft size={28} />
        </motion.button>
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3 text-white">
            <span className="text-4xl">{category.icon}</span> Select Difficulty
          </h2>
          <p className="text-purple-300/70">How good is your memory?</p>
        </div>
      </header>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {difficulties.map((diff, i) => {
          const dc = diffColors[i];
          const pairs = (diff.cols * diff.rows) / 2;
          return (
            <motion.button
              key={diff.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                y: -6,
                boxShadow: `0 18px 44px ${dc.glow}`,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(diff)}
              className={`group relative flex flex-col items-center p-8 bg-gradient-to-br ${dc.grad} rounded-3xl shadow-lg border border-white/20 text-center overflow-hidden transition-shadow duration-300`}
            >
              {/* Hover sheen */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 rounded-3xl" />

              <h3 className="text-3xl font-black mb-2 text-white drop-shadow">{diff.name}</h3>

              <div className="flex items-center gap-3 text-white/85 font-semibold text-lg mb-2">
                <span>{diff.cols} × {diff.rows}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                <span>{pairs} Pairs</span>
              </div>

              <p className="text-white/60 text-sm font-medium">{dc.label}</p>
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
};
