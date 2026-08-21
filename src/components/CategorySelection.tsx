import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { categories } from '../data/categories';
import type { Category } from '../data/categories';

type Props = {
  onSelect: (category: Category) => void;
  onBack: () => void;
};

const categoryGlows: Record<string, string> = {
  all:      'shadow-[0_0_30px_rgba(192,38,211,0.3)] border-fuchsia-500/40 hover:border-fuchsia-400',
  fruits:   'shadow-[0_0_30px_rgba(244,63,94,0.3)] border-rose-500/40 hover:border-rose-400',
  animals:  'shadow-[0_0_30px_rgba(16,185,129,0.3)] border-emerald-500/40 hover:border-emerald-400',
  vehicles: 'shadow-[0_0_30px_rgba(59,130,246,0.3)] border-blue-500/40 hover:border-blue-400',
  food:     'shadow-[0_0_30px_rgba(245,158,11,0.3)] border-amber-500/40 hover:border-amber-400',
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { type: 'spring', stiffness: 240, damping: 22 } },
  exit:   { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } },
};

export const CategorySelection: React.FC<Props> = ({ onSelect, onBack }) => {
  return (
    <motion.div
      className="flex-1 flex flex-col p-4 max-w-5xl mx-auto w-full relative z-10"
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
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight">Select Theme</h2>
          <p className="text-slate-400 font-medium tracking-wide mt-0.5 text-sm">What would you like to match today?</p>
        </div>
      </header>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        {categories.map(cat => {
          const glowClass = categoryGlows[cat.id] || 'border-white/20 hover:border-white/40';
          return (
            <motion.button
              key={cat.id}
              variants={cardVariants}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelect(cat)}
              className={`group relative flex flex-col items-center text-center p-5 bg-slate-900/60 backdrop-blur-md rounded-[1.5rem] border-2 ${glowClass} overflow-hidden transition-all duration-300`}
            >
              {/* Inner ambient glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon Container */}
              <div className="relative mb-3">
                <div className="absolute inset-0 bg-white/10 blur-xl rounded-full scale-150 group-hover:bg-white/20 transition-colors duration-300" />
                <motion.div
                  className="relative text-5xl drop-shadow-xl z-10"
                  whileHover={{ rotate: [0, -10, 10, -5, 5, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {cat.icon}
                </motion.div>
              </div>
              
              <h3 className="text-xl font-black mb-1 text-white z-10 tracking-wide">{cat.name}</h3>
              <p className="text-xs font-medium text-slate-400 z-10">{cat.description}</p>
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
};
